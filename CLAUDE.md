# OMNIS — project rules

OMNIS is a Tunisian food-supplement brand. The site (Next.js 16 App Router, TypeScript, Tailwind v4) sells
**OMNIS FOCUS** by **cash on delivery** across Tunisia. Read `brand-brief.md` before writing any copy.

## Primary conversion
One action: **order FOCUS on the product page** (`ORDER_HREF` in `src/config/site.ts` → `/products/focus#order-form`).
Every order CTA must use `ORDER_HREF` / `orderHref(pack)`. Success → `/merci` (fires the Purchase event once).

## Product facts (lab-confirmed — never contradict)
- 30 vegan capsules (hypromellose) per bottle · 1 capsule/day, 2 max
- Per capsule: L-théanine 180 mg · caféine naturelle (guarana) 100 mg · vitamine B6 1,4 mg (100% VNR) · vitamine B12 2,5 µg (100% VNR)
- Not for children, pregnant/breastfeeding women, caffeine-sensitive people
- Price: 39 DT · packs 72 DT (2) / 99 DT (3) · delivery 7 DT, free from 2 bottles · 24–48h · paiement à la livraison
- Pricing lives in `src/lib/pricing.ts` only — never hard-code prices elsewhere in logic.

## Copy rules
- Benefit-led, "tu", calm and confident. No hype, no "we"-centric lines.
- **Claims rulebook**: no anxiety/stress/ADHD/immunity/medical claims, no "garantit", "neutralise", "sans palpitations",
  no promise of grades. B6/B12 only with the authorized wording ("contribuent à réduire la fatigue", "au fonctionnement normal du système nerveux").
- **Never invent reviews, ratings, testimonials, logos, lab names or numbers.** Use honest trust blocks until real ones exist.
- Arabic UI copy: native Tunisian Darija for conversion/ads; vocabulary list in `.claude/skills/omnis-scripts/SKILL.md`.
- Every user-facing string exists in FR and AR (`isAr ? … : …` or `LanguageContext`).

## Design rules
See `style-guide.md`. Cream/ink base, harissa = the one accent, Fraunces headings in sentence case, lucide icons
(no emoji), soft shadows only, flat pill buttons, `next/image` for every image.

## Engineering rules
- Secrets only in `.env.local` / host env vars (see `.env.example`). Never hard-code keys.
- Orders: validated + priced server-side (`src/app/api/orders/route.ts`), anti-spam in `src/lib/antiSpam.ts`,
  storage in `src/lib/orderStore.ts` (Google Sheets in prod, JSON file in dev). Admin is behind Basic Auth (`src/proxy.ts`).
- Never commit customer data (`src/data/orders.json` content, exports) or the original photos (`images/`).
- Before finishing a change: `npx tsc --noEmit`, `npx eslint src`, and `npx next build` for route/metadata changes.
- Show a diff and ask before destructive commands; work on a branch, not `main`.
