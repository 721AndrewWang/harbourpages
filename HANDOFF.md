# HarbourPages — Frontend Handoff

Handoff package for the HarbourPages website (final design **2a** + linked secondary pages **3a**, **3b**). Written so another AI model or developer can take over immediately.

## What HarbourPages is

Booking-ready websites for Ireland's **independent restaurants, cafés and guesthouses** (tourist towns: Killarney, Dingle, Westport, Kinsale). Core pitch: escape Booking.com / OTA commissions — take **direct bookings** on your own site. Voice: calm, honest, editorial; Irish warmth. **Never** cold SaaS/startup styling.

## Files in this package

| File | What it is |
|---|---|
| `Harbourpages Landing.dc.html` | Full design source. One HTML file containing ALL pages/options as sections. **The definitive markup + copy reference** — every element carries inline styles; data lists live in the `class Component` script at the bottom. |
| `assets/harbour-hero.png` | Hero photo — Irish harbour + lighthouse at dawn (wide) |
| `assets/odysseus.png` | Ink-wash Odysseus portrait on cream (use with `mix-blend-mode: multiply`) |
| `assets/harbour-cinematic.mp4` + `harbour-cinematic-poster.jpg` | Cinematic harbour video (currently unused in final 2a; kept for future) |

In the source file, image paths are `uploads/public/...` — remap to `assets/...`.

### Which sections to build (and which to ignore)

The source file contains historical explorations. **Build only:**
- `id="2a"` → **the landing page** (final, approved)
- `id="3a"` → **demo site: The Harbour Cafe** (template for client demo sites)
- `id="3b"` → **owner dashboard** (client-facing admin)

Ignore sections `1a`, `1b`, `1c` (superseded explorations).

## Design system

**Fonts** (Google Fonts): `Cormorant Garamond` (display serif — headlines, prices, roman numerals, italic accents) + `Figtree` (all UI/body text). No other fonts.

**Palette (light/cream pages — 2a, 3a, and 3b content):**
- Page background: `#F7F2E9` · Alt band / sidebar: `#F1E9D8` · Card: `#FDFBF5`
- Ink headline: `#1C2B3A` · Body: `#22303F` · Secondary: `#5A5142` · Muted: `#8A7E68`
- Hairline borders: `#DDD2BC` (inner rules `#EDE4D0` / `#F1E9D8`)
- Accent (CTAs, links, numerals): terracotta `#B4552A`, hover `#8E3F1D`

**Dark bands (footers, booking band, dashboard top bar):** bg `#1C2B3A` (footer `#15212D`), text `#F7F2E9`, secondary `#B9C2CC`/`#8FA0B0`, gold accent `#D9A05B`.

**Details:** buttons are near-square (`border-radius: 2px`); section paddings ~72–96px vertical, 64px horizontal (page width 1440); kickers are 11–12px uppercase letterspaced (0.2em+) Figtree; list numbering uses italic Cormorant roman numerals (`i.`, `II`); thin 1px hairlines separate everything; motion should stay subtle (~4/10: hover states, gentle reveals only). Default link color `#B4552A`, hover `#8E3F1D`.

## Page 1 — Landing (`2a`), section order

1. **Nav**: HarbourPages wordmark (serif, italic terracotta "Pages") + "EST. IRELAND" · links Demos / Process / Pricing · terracotta "Free Audit" button. "Demos" links to the demo site.
2. **Hero** (2-col): kicker "Websites for independent Irish hospitality"; H1 *A safe **harbour** for your business online.* (italic terracotta "harbour"); **keep verbatim the corrective subtitle**: "Booking-ready websites for Ireland's independent restaurants, cafés and guesthouses."; support para about OTA commission staying in the till; CTAs "Get my 5-minute audit" + "See live demos ↓". Right: framed photo (`harbour-hero.png`) with etching-style caption "Plate I. — The harbour at first light. / CO. KERRY".
3. **Demo strip** (demo-first requirement): "See what your site could become" — 3 cards: The Harbour Cafe / Seaview Guesthouse / O'Malley's Pub, each with screenshot slot + "View demo →" linking to the demo page (3a). Replace striped placeholders with real screenshots when available.
4. **Odyssey quote band** (alt cream): `odysseus.png` (blend multiply) + "Tell me, O Muse, of that ingenious hero who travelled far and wide…" — HOMER, THE ODYSSEY + drift narrative para + link "Chart your course home →".
5. **Common leaks we fix**: intro column + 8 items in 2-col hairline list (No website / Facebook only / PDF menus / No direct booking / No online ordering / Outdated hours / Broken SSL / Hard to contact — each with one-line consequence).
6. **Process** (alt cream): "From drifting online to booking-ready", subtitle "Dock → Inspect → Repair → Refuel → Set sail", 5 columns with roman numerals I–V.
7. **Pricing** (card-white band) — **this is the approved pricing model, do not reintroduce packages or ROI numbers**:
   - H2 "Simple pricing, built to stay simple"
   - Big italic serif: **from €700** (quote adjusted to complexity, agreed up front; no retainers, no surprises)
   - Three hairline columns:
     - *The build — One-off delivery*: complete static website delivered once; **two rounds of revisions included**; quote agreed up front, adjusted only if scope grows.
     - *Low maintenance by design — Nothing to babysit*: static-first (no servers/plugins to break); bookings & availability on **Sanity or Supabase generous free tiers**; foolproof admin (owner updates menus/hours/rooms themselves).
     - *After launch — 3-month warranty*: anything broken in first 3 months fixed free; after warranty, fixes **billed by the hour** (most are small jobs); no retainers, no monthly fees.
   - Links: "Start with a free audit" + "See the owner dashboard →" (→ 3b).
8. **Audit CTA** (alt cream, centred): "FREE · NO OBLIGATION" / "Get your 5-minute website audit" / inline row: business name + website/Facebook inputs + terracotta "Get my audit".
9. **Footer** (dark): wordmark · "A safe harbour for Irish hospitality online." · hello@harbourpages.com (gold).

Removed by client decision (do NOT re-add): cinematic video band; €144/€1,728 ROI section; 3-package pricing.

## Page 2 — Demo site: The Harbour Cafe (`3a`)

Same design system, re-skinned for a cafe client. Nav (The Harbour Cafe · KILLARNEY, CO. KERRY · Menu/Hours/Find us · "Book a table") → hero "Good coffee, honest food, harbour views." + photo slot → **Menu** band (6 dishes with € prices, hairline rows, note "Updated this morning — no PDFs here") → Hours / Find us / map slot (3-col) → dark **Book a table** band (date/time/guests + Reserve; copy stresses direct, commission-free) → footer credit "Site by HarbourPages — take direct bookings →" linking back to the landing.

## Page 3 — Owner dashboard (`3b`)

Client-facing admin proving "foolproof backend". Dark top bar (Dashboard · The Harbour Cafe · "View my site →" → 3a · avatar "MK"). Left sidebar: Overview (active, terracotta left bar), Bookings (badge 3), Menu, Opening hours, Photos, Messages (badge 1); pinned note "Running on the free tier. €0 / month hosting." Main: greeting "Good morning, Mary." + reassurance "Everything you change here goes live in about a minute. There's no save button to forget — we save as you type."; **Today's bookings** card (rows: time / name / party / Confirm+Decline buttons); two quick-edit cards: **Today's hours** (time inputs + "Closed today") and **Menu** (inline dish rows with price + Edit, "+ Add a dish"); support footnote (free within warranty, hourly after).

Intended stack per business model: static-first frontend; content + availability on Sanity or Supabase free tier; this dashboard is the owner UI over that data.

## Business rules to preserve in any copy rewrite

- Direct bookings / anti-OTA-commission framing is the core narrative.
- Demo-first: live demos surface immediately after the hero.
- Pricing: from €700, complexity-adjusted; 2 revision rounds; 3-month warranty; hourly after; free-tier infra; no monthly fees. (Founder's base was £600 ≈ $800; site displays euros for the Irish market.)
- All prices/currency on-site in **EUR**.
- English copy throughout.
