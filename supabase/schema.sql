-- HarbourPages leads table. Run once in the Supabase SQL editor.

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  business_name text not null,
  website       text not null,
  source        text not null default 'landing-audit',
  user_agent    text
);

alter table public.leads enable row level security;

-- Explicit grants so this works with "Automatically expose new tables"
-- disabled. SELECT is granted only so /api/health can run its probe query —
-- RLS has no select policy, so the anon key still sees zero rows.
grant usage on schema public to anon;
grant insert, select on public.leads to anon;

-- Anonymous visitors may only INSERT. With no select/update/delete
-- policies, the anon key cannot read leads back even if it leaks.
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);
