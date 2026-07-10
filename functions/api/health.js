// GET /api/health — liveness probe that also touches Supabase so the
// free-tier project never pauses for inactivity. The anon key has no
// select policy, so the query legitimately returns an empty list.

export async function onRequestGet({ env }) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    return json({ ok: false, error: "Server not configured." }, 500);
  }

  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/leads?select=id&limit=1`, {
    headers: supabaseAuthHeaders(env.SUPABASE_ANON_KEY),
  });

  if (!res.ok) return json({ ok: false, supabase: res.status }, 502);
  return json({ ok: true });
}

// Legacy anon keys are JWTs and also go in the Authorization header;
// new sb_publishable_* keys are NOT JWTs and must only be sent as apikey.
function supabaseAuthHeaders(key) {
  const headers = { apikey: key };
  if (key.startsWith("eyJ")) headers.authorization = `Bearer ${key}`;
  return headers;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
