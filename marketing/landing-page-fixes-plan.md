# OMNIS — landing page fixes plan (based on the "Landing Page Masterclass" guide)

_Audit of the current site against the guide's 12 modules, 2026-11-13. Checked: code, production build
(`next build` ✅ passes), mobile 375px, desktop 1280px._

The guide is written for a **service** (lead form → email). OMNIS is **e-commerce with cash on delivery**, so the
"conversion action" = **an order on the product page**, and "lead capture" = the COD order form. Everything below
is translated to that.

Legend: ✅ done · ⚠️ partial · ❌ missing · **P1** = do first (conversion/trust/legal) · **P2** = next · **P3** = later

---

## Scorecard by module

| Module | What the guide asks | OMNIS today | Status |
|---|---|---|---|
| 0 — Offer brief | Positioning, pains, objections, gaps (guarantee, anchor, scarcity) | Lives in the script skill (`context.md`, `research.md`), not in the project | ⚠️ |
| 1 — Brand brief + `CLAUDE.md` | ONE promise, primary CTA, 3–5 outcome benefits, #1 proof, top-3 objections, target keyword, project rules | No `CLAUDE.md`, no `brand-brief.md`, no target keyword | ❌ |
| 2 — Project rules | `.gitignore` for `.env.local`/.next/.vercel; secrets only in env | ✅ `.env*` ignored, `.env.example` exists; `.vercel` not listed | ⚠️ |
| 3 — Style guide + UI primitives | `style-guide.md`; `Container`, `Section`, `Button` components; max width ~1140px | Tokens in `globals.css`, but no written guide, no primitives (each section re-declares padding/width); max width 1280px | ⚠️ |
| 4 — Hero | Promise headline, specific subhead "for whom", primary CTA + secondary link, **trust strip under CTA**, visual; **CTA visible on phone without scrolling**; 3 headline variants | Headline ✅, CTA ✅, visual ✅. **CTA below the fold on mobile (836px / 812px)** ❌, no "for whom", no proof stat, no variants | ⚠️ **P1** |
| 5 — Section stack | Problem → Solution → Benefits → How it works → Social proof → Offer → Objections → FAQ → **Final CTA** | No Problem section, no How-it-works (ordering steps), no real social proof, **no final CTA** (page ends on "Rejoins le club"), redundant product block | ⚠️ **P1** |
| 6 — Copywriting pass | PAS for hero/problem, "so that…" benefits, value-led CTAs, "you" not "we", `copy-variants.md` | Benefits read as features ("Doses précises"); CTAs generic ("Commander", "Choisir"); some "we" lines in story | ⚠️ **P2** |
| 7 — Polish & mobile | Spacing rhythm, hierarchy, subtle motion w/ reduced-motion, next/image, no layout shift | ✅ mostly done (Phase 1 redesign). Hero order on mobile wrong; lifestyle section hidden (image labels) | ⚠️ |
| 8 — Lead capture + thank-you | Validation ✅, **honeypot + rate limit**, **email notification per lead**, `/thank-you` page with next step + conversion event | Validation ✅, inline success ✅, WhatsApp confirm ✅. **No anti-spam** (fake COD orders cost delivery fees), **no new-order alert**, no `/merci` URL (pixels/Google Ads prefer a URL) | ⚠️ **P1** |
| 9 — SEO, share, performance | Title/description for a keyword, OG + **Twitter card**, favicon, **robots.txt**, **sitemap.xml**, one h1, alt text, AA contrast, keyboard focus, build passes | Title/description ✅, OG image ✅, one h1 ✅, alt ✅, build ✅. **No robots/sitemap/Twitter card/Product schema**, favicon only SVG (no iPhone icon) | ⚠️ **P2** |
| 10 — Deploy + analytics | Git → GitHub → Vercel, env vars, domain, analytics, conversion event | GitHub remote set (`OMNIALL/omnis`) but **57 files uncommitted**; pixels ready (IDs missing); no traffic analytics; env vars to set on host | ⚠️ **P1** |
| 11 — Iterate | Weekly numbers, A/B test headline/CTA | Not started (needs traffic) | ❌ **P3** |

Bug found during the audit: **`/products/energie`, `/sommeil`, `/immunite` render a full order page** for products
that aren't on sale (the server rejects the order, so customers hit an error). → **P1**.

---

## The fix plan (in order)

### Sprint 1 — conversion & trust (P1) · ~1 day of my work
1. **Hero mobile fold fix** — on phones show headline → subhead → CTA first, photo after (or a short 16:9
   photo). Add a "for whom" line: _« Pour les révisions, le boulot et le sport. »_ Add a one-line trust strip
   under the CTA: _Fabriqué en Tunisie · Paiement à la livraison · Livraison 24–48h_. Test: CTA fully visible at 375×812.
2. **Restructure the home page to the guide's story order**:
   Hero → **Problem** (the coffee trap: spike, nerves, 14h crash — the energy curve becomes this section) →
   **Solution** (formula + composition) → **Benefits** (rewrite WhyOmnis as outcomes) → **How it works**
   (3 steps: choose your pack → order in 30 s, pay on delivery → confirm on WhatsApp, receive in 24–48h) →
   **Social proof** (honest version until reviews exist) → **Offer** (bundles) → **Objections** (caffeine
   safety, "is it legit", "what if it doesn't suit me") → **FAQ** → **Final CTA** (big closing block:
   promise + pack choice + "Je commande, je paie à la livraison"). Remove the duplicate product block; move
   the WhatsApp club below the footer CTA or into the footer.
3. **One conversion action everywhere** — every CTA on the home page goes to `/products/focus#order-form`
   (bundle cards keep `?pack=`). Audit links so no CTA points to `#ingredients` or the cart.
4. **Anti-spam on orders** (COD fake orders = lost delivery fees): hidden honeypot field + rate limit
   (e.g. max 3 orders / phone / 24 h and 10 / IP / hour) + reject obviously fake names. Server-side in
   `/api/orders`.
5. **New-order alert** — email (Resend, free tier) and/or WhatsApp message to you for every order, with
   name, phone, governorate, pack, total. Needs: `RESEND_API_KEY` + `ORDERS_NOTIFY_EMAIL` in `.env.local`.
   Fallback: logs only (orders still saved).
6. **`/merci` thank-you page** — after ordering, redirect to `/merci?order=TN-xxxxxx`: recap, WhatsApp
   confirmation button, "next steps" (call from the courier, 24–48h), share/follow. Fires the Purchase pixel
   once. Gives Meta/TikTok/Google a clean conversion URL.
7. **Coming-soon product pages** — `/products/energie|sommeil|immunite` show a "Bientôt" page with
   "Préviens-moi sur WhatsApp" instead of an order form (or 404 + redirect to FOCUS).
8. **Commit & push** the current work (57 files) so Vercel can deploy it; set env vars on Vercel:
   `ADMIN_USER`, `ADMIN_PASSWORD`, `ORDERS_SHEET_URL`, `ORDERS_SHEET_SECRET`, pixel IDs, Resend vars.

### Sprint 2 — copy & SEO (P2) · ~½ day
9. **`CLAUDE.md` + `brand-brief.md`** — project rules (no fake reviews, claims rulebook, secrets in env,
   show diffs) + the ONE promise, primary CTA, benefits, proof, objections, **target keyword**
   (proposal: « complément concentration Tunisie » / « caféine L-théanine Tunisie »), palette, fonts.
   Move the key facts from the script skill so the site and ads share one source of truth.
10. **Copywriting pass (PAS)** — rewrite every section with "so that…" benefits and value-led CTAs, e.g.
    « Commander » → « Je commande — je paie à la livraison »; « Choisir » → « Prendre le pack 60 jours ».
    Before/after diff for your approval. FR + Tunisian Darija versions.
11. **`copy-variants.md`** — 3 headlines + 3 CTAs with their angle (outcome / ease / authority / FOMO-honest
    "premier lot limité").
12. **SEO essentials** — `robots.ts`, `sitemap.ts`, Twitter card tags, PNG app icons (180×180 Apple, 512×512),
    **Product structured data** (name, image, price 39 TND, availability, brand) so Google can show price,
    per-page titles/descriptions for /faq, /ingredients, /about.
13. **`style-guide.md` + UI primitives** — document the "clinical warmth" system; extract `Container`,
    `Section`, `Button` into `src/components/ui/` and use them everywhere (consistent widths/padding,
    content width ~1140px as the guide suggests).

### Sprint 3 — measure & iterate (P3) · after launch
14. **Traffic analytics** — Vercel Analytics (free, privacy-friendly) + the Meta/TikTok pixels you already have.
    Add a `Lead`/`Contact` event on WhatsApp clicks.
15. **Weekly review** (guide Module 11): visits → product page views → form starts → orders → confirmed →
    delivered. I'll add a "form started" event so you can see where people drop.
16. **A/B test** the hero headline / CTA from `copy-variants.md` (50/50 split stored in a cookie, variant
    saved with each order). Rule of thumb: wait for ~100 orders per variant before deciding.

---

## Blockers only you can unblock
| Item | Needed for |
|---|---|
| Real WhatsApp number, phone, email (`src/config/site.ts`) | Every CTA, confirmation, alerts |
| Google Sheet connected (`docs/google-sheets-orders.md`) | Orders saved in production |
| Resend account (or choose WhatsApp-only alerts) | New-order alert (fix 5) |
| Meta & TikTok pixel IDs | Ads optimization, `/merci` conversion |
| Corrected product photos (`marketing/image-edit-plan.md`) | Lifestyle section, ads |
| First real customer reviews (WhatsApp screenshots, with permission) | Social proof section |
| Domain name | Launch (Module 10) |
| Confirm guarantee/returns policy wording (e.g. replacement if damaged) | Objection-handling section |

## Definition of done (the guide's tests, adapted)
- [ ] At 375×812 the hero CTA is visible without scrolling; in 5 seconds it's clear what FOCUS is, for whom, and what to click.
- [ ] Scrolling tells one story: problem → solution → benefits → how it works → proof → offer → objections → FAQ → final CTA.
- [ ] Every CTA leads to the same order form.
- [ ] A test order lands in the Google Sheet **and** triggers your alert; fake/bot submissions are blocked.
- [ ] `/merci` fires the Purchase event exactly once.
- [ ] `npm run build` passes; link preview on WhatsApp shows title, description and image.
- [ ] Tab through the page with the keyboard: every button and field is reachable and visibly focused.
