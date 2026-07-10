# HarbourPages — Deploy & Lead Pipeline

Static site on **Cloudflare Pages** (free) + leads in **Supabase** (free) +
optional email notification via **Resend** (free). No servers to babysit —
the same promise we make to clients.

## Architecture

```
Visitor submits audit form (index.html)
  → POST /api/lead            (functions/api/lead.js, Cloudflare Pages Function)
      → INSERT into Supabase  public.leads   ← source of truth, never lost
      → Resend email to hello@harbourpages.com   ← best-effort notification
GET /api/health               (functions/api/health.js)
  → touches Supabase so the free tier never pauses
  → pinged twice daily by .github/workflows/keepalive.yml
```

Spam defence: hidden honeypot field (bots that fill it get a fake success and
nothing is stored). If real spam gets through later, set `TURNSTILE_SECRET_KEY`
and add the Turnstile widget — the server side is already wired.

## One-time setup

1. **Supabase** — create a free project (region: `eu-west-1` Ireland), open the
   SQL editor, run `supabase/schema.sql`. Copy Project URL + anon key from
   Settings → API.
2. **GitHub** — push this repo.
3. **Cloudflare Pages** — Workers & Pages → Create → Pages → connect the repo.
   Build command: *(none)*, output directory: `/`. Then Settings →
   Environment variables:
   | Name | Required | Value |
   |---|---|---|
   | `SUPABASE_URL` | yes | `https://xxxx.supabase.co` |
   | `SUPABASE_ANON_KEY` | yes | anon key |
   | `RESEND_API_KEY` | no | enables email notification |
   | `NOTIFY_TO` | no | default `hello@harbourpages.com` |
   | `NOTIFY_FROM` | no | default `HarbourPages Leads <leads@harbourpages.com>` |
   | `TURNSTILE_SECRET_KEY` | no | enables Turnstile check |
4. **Domain** — Pages → Custom domains → add `harbourpages.com` (+ `www`).
5. **Resend** (optional but recommended) — add domain `harbourpages.com`,
   set the DNS records it gives you (SPF/DKIM — also helps future cold-email
   domain reputation), create an API key.

## Reading your leads

- Supabase dashboard → Table editor → `leads` (or SQL editor / CSV export).
- Exported CSV feeds straight into `H:\ireland-sites` `audit_sites.py`:
  submit → audit score → reply with the audit attached.
- The anon key is insert-only (RLS, no select policy) — even if it leaks,
  nobody can read the leads with it.

## Local development

```bash
cp .dev.vars.example .dev.vars   # fill in real or test values
npx wrangler pages dev . --port 8788
# site on http://127.0.0.1:8788, functions under /api/*
```

## Smoke test after deploy

```bash
curl -s https://harbourpages.com/api/health
# → {"ok":true}
curl -s -X POST https://harbourpages.com/api/lead \
  -H "content-type: application/json" \
  -d '{"business_name":"Smoke Test Cafe","website":"https://example.ie"}'
# → {"ok":true}, row visible in Supabase, email in inbox
```
