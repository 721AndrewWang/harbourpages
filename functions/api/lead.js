// POST /api/lead — audit-form submissions.
// The lead is written to Supabase first (source of truth); the email
// notification is best-effort and must never fail the request.

const MAX_LEN = 300;

export async function onRequestPost({ request, env }) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    return json({ ok: false, error: "Server not configured." }, 500);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: bots fill every field. Pretend success, store nothing.
  if (data.company) return json({ ok: true });

  const businessName = clean(data.business_name);
  const website = clean(data.website);
  if (!businessName || !website) {
    return json({ ok: false, error: "Please fill in both fields." }, 400);
  }

  // Cloudflare Turnstile — enforced only once the secret is configured.
  if (env.TURNSTILE_SECRET_KEY) {
    const human = await verifyTurnstile(env, data.turnstile_token, request);
    if (!human) return json({ ok: false, error: "Verification failed — please try again." }, 403);
  }

  const lead = {
    business_name: businessName,
    website,
    source: clean(data.source) || "landing-audit",
    user_agent: request.headers.get("user-agent"),
  };

  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      ...supabaseAuthHeaders(env.SUPABASE_ANON_KEY),
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    console.log("supabase insert failed:", res.status, await res.text());
    return json({ ok: false, error: "Something went wrong — please email us instead." }, 502);
  }

  if (env.RESEND_API_KEY) {
    try {
      await notify(env, lead);
    } catch (err) {
      console.log("notify failed:", err);
    }
  }

  return json({ ok: true });
}

// Legacy anon keys are JWTs and also go in the Authorization header;
// new sb_publishable_* keys are NOT JWTs and must only be sent as apikey.
function supabaseAuthHeaders(key) {
  const headers = { apikey: key };
  if (key.startsWith("eyJ")) headers.authorization = `Bearer ${key}`;
  return headers;
}

function clean(value) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_LEN);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function verifyTurnstile(env, token, request) {
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get("cf-connecting-ip"),
    }),
  });
  const out = await res.json();
  return out.success === true;
}

async function notify(env, lead) {
  const to = env.NOTIFY_TO || "hello@harbourpages.com";
  const from = env.NOTIFY_FROM || "HarbourPages Leads <leads@harbourpages.com>";
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New audit request: ${lead.business_name}`,
      text: [
        `Business: ${lead.business_name}`,
        `Website:  ${lead.website}`,
        `Source:   ${lead.source}`,
        "",
        "Full record is in the Supabase leads table.",
      ].join("\n"),
    }),
  });
}
