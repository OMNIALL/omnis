# OMNIS: premium brand review

_Design critique of the live site (home, /products/focus, checkout) at 1280px and 375px, 2026-11-13.
Goal: look like a serious, premium Tunisian supplement brand, not a generated template._

## Overall impression

The site has a real asset: the **OMNI(S) logo, the harissa red and the warm cream paper** feel ownable and Tunisian.
But almost everything around them is a recognizable **"neo-brutalist sticker" template**: every block has a thick black
border and a hard offset shadow, every heading is heavy all-caps, there are rainbow card grids, emoji used as icons, and floating
circles instead of a product. That combination reads "candy / kids' app / AI-generated", the opposite of what a
**caffeine supplement** needs to sell: _trust, precision, calm_. The single biggest gap is that **the product is never shown**,
only a yellow circle with the word FOCUS in it.

---

## Why it reads as "AI slop" (the specific tells)

| # | Tell | Where | Why it hurts |
|---|---|---|---|
| 1 | **No product photography**: the "product" is a yellow circle with FOCUS written in it, plus floating circles | Hero, product page, product cards, About | People buy what they can see. A supplement with no bottle shot looks like it doesn't exist yet |
| 2 | **Emoji as icons**: 168 emoji across 23 files (⚡🍬🔬💵🚚…) | Everywhere: cards, pills, buttons, FAQ | The #1 marker of generated UIs. Emoji also render differently per phone |
| 3 | **🇹🇳 renders as "TN" on Windows** | "TN MADE IN TN", "TN Fabriqué en Tunisie" | Looks broken on every Windows desktop |
| 4 | **Rainbow card grids**: 3–4 cards, each a different saturated color (red/yellow/blue/cream), icon + title + 2 lines | "Tout-en-un", "Pourquoi nous faire confiance", "Comment ça marche", product range | The most common generated-landing-page layout; repeated 4+ times, so the page feels assembled, not designed |
| 5 | **Everything is shouting**: 62 hard offset shadows, 3px black borders on every box, 104 `uppercase` uses, Unbounded 900 on every H2 | Whole site | With no hierarchy, nothing is premium. Luxury = restraint; here every element has max emphasis |
| 6 | **Gimmicks**: scrolling marquee bar, custom cursor, branded loader, wobbling hover rotations | Global | Signals "template with effects"; costs speed on 4G phones |
| 7 | **Generic stock copy patterns**: "Tout-en-un. Zéro blabla.", "Pas de poudre de perlimpinpin", "Juste ce qui marche", emoji at the ends of lines | Home, About | Sounds like a startup template, not a brand with a point of view |
| 8 | **Visible scaffolding**: "🔒 Espace Admin" link in the public footer; social icons pointing to instagram.com / tiktok.com / facebook.com roots | Footer | Unfinished-site signals; customers notice |

---

## Usability

| Finding | Severity | Recommendation |
|---|---|---|
| No real product image anywhere (incl. ad landing page) | 🔴 Critical | Pack shot + capsule macro + lifestyle (see shoot brief below) |
| 🇹🇳 flag emoji shows as "TN" on Windows | 🟡 Moderate | Replace with an inline SVG flag or plain text "Fabriqué en Tunisie" |
| Admin link public in footer | 🟡 Moderate | Remove; admins use /admin directly (it's password-protected now) |
| Social links go to platform home pages | 🟡 Moderate | Real account URLs, or hide until accounts exist |
| Coming-soon products (ÉNERGIE/SOMMEIL/IMMUNITÉ) get full-size colorful cards on desktop | 🟢 Minor | One quiet "Bientôt" line under FOCUS (already done on mobile) |
| Marquee + custom cursor + loader | 🟢 Minor | Remove: speed and focus over effects |

## Visual hierarchy

- **What draws the eye first:** on the home page, the big yellow FOCUS circle and the white floating circles. **Wrong.** It should be the product (bottle) and the headline.
- **Reading flow:** headline → circles → CTA → pills → caption. The decorative circles break the path to the CTA.
- **Emphasis:** price, CTA, section titles, badges, cards and pills all have the same weight (black border + shadow + caps), so the **"Commander" button doesn't win**. Reserve the strongest treatment for one action per screen.
- **Whitespace:** sections are dense, with boxes inside boxes (product page: red block, inner circles, pills, tabs inside a bordered card). Premium layouts use fewer containers and more air.

## Consistency

| Element | Issue | Recommendation |
|---|---|---|
| Color | 4 saturated colors used at equal weight (harissa, sun, sky, cream) → candy palette | **Cream + ink as the base (90%)**, **harissa as the single brand accent**, sun only for price/highlights, sky reserved for the future SOMMEIL line |
| Type | Unbounded 900 uppercase for logo, H1, every H2, badges, buttons; 10px tracked labels | Keep **Unbounded only for the logo and one hero word**. Headings in a refined grotesk (e.g. _Inter Tight_ / _Manrope_ 600) in **sentence case**; body 16px |
| Icons | Emoji mixed with a few SVGs | One line-icon set (1.5px stroke, ink color), e.g. Lucide/Phosphor style |
| Shadows & borders | Hard 4–8px offset shadow + 3px border on nearly every block | Keep the sticker shadow **only** on primary buttons (brand signature). Cards: 1px hairline border or soft shadow, no offset |
| Radius | 24–32px rounded everything + circles | One radius (e.g. 16px cards, pill buttons) |
| Language | Formal Arabic on old pages, Tunisian Darija on new conversion parts, FR slang ("de ouf", "perlimpinpin") | Write a short voice guide: confident, warm, precise. Darija for the ads and order flow, clean French/Arabic for science and legal |

## Accessibility

- **Color contrast:** body text at `text-ink/60` on cream ≈ 4.8:1 ✅. But `text-ink/50` (≈ 3.5:1) and `/40` **fail AA** for small text, and they're used for captions, prices per bottle and labels. Use ≥ 70% ink for any text under 16px.
- **Cream text on harissa red** (hero subtitle, captions at reduced opacity) is borderline; keep it ≥ 16px and full opacity.
- **Touch targets:** main buttons OK (≥ 44px). Quantity steppers in checkout (28px) and the language switch are small → 40–44px.
- **Text size:** many 10–12px labels (`text-[0.65rem]`, `text-xs`) on mobile; raise to 13–14px minimum.
- **Images:** no real images = no alt-text issue today. Add meaningful alt text when photos arrive.

## What works well

- **The OMNI(S) logo**, with the S in a circle: simple, ownable, works as a capsule metaphor. Keep it.
- **Harissa red + cream**: distinctive, warm, Tunisian. Better than the usual supplement navy/white.
- **The offer is clear**: price, cash on delivery, free delivery from 2 bottles, bilingual.
- **Formula transparency** (exact mg) is a genuine premium signal; it just needs a more serious presentation.

---

## Premium direction: "Clinical warmth"

Keep the soul (red, cream, the S), drop the toy box. Think _pharmacy-grade precision made in Tunisia_, not _energy candy_.

1. **Photography first.** Every key screen leads with a real image of the bottle or capsule.
2. **One accent.** Cream/ink base, harissa used sparingly (CTA, logo, key numbers). Color then means something again.
3. **Quiet type, one loud moment.** Sentence-case headings and generous spacing; Unbounded only for the logo/hero word.
4. **Show the science like a label, not like cards.** A real **"Supplement Facts / Composition" panel** (table: ingredient · per gélule · %VNR), a simple mechanism diagram, the lab and regulatory info.
5. **Proof over adjectives.** Lab/manufacturer name, your authorization or registration number once you have it, batch and expiry info, real customer reviews, founder name and face.
6. **Calm motion.** Subtle fades only, no wobble, cursor, marquee or loader.

## Roadmap

### Phase 1: code changes I can make now (~1 day, no new assets needed)
1. Replace all emoji icons with one consistent SVG line-icon set; fix the 🇹🇳 → SVG flag.
2. New palette rules: cream/ink base, harissa accent, sun only for price; remove the rainbow card colors.
3. Typography: add a refined heading font, sentence case, 16px body, min 13px labels; Unbounded only for logo + hero.
4. Remove hard shadows/thick borders except primary buttons; one radius scale; more whitespace; fewer nested boxes.
5. Remove the marquee bar, custom cursor, loader and hover wobble.
6. Replace "Comment ça marche" emoji cards with a **Composition panel** (supplement-facts table) + a clean 3-step diagram.
7. Footer: remove "Espace Admin", hide the social links until the real ones exist, add the legal entity name.
8. Copy pass: remove the slang/template lines ("perlimpinpin", "Zéro blabla" variants, end-of-line emoji) for a calm, confident voice.
9. Contrast and size fixes from the accessibility section.

### Phase 2: assets you need to produce
- **Photography shoot (half day):**
  1. Pack shot: white bottle on seamless cream, front plus a 3/4 angle, soft daylight, with a subtle shadow.
  2. Macro: one capsule plus a glass of water; capsules spilled on linen or stone.
  3. Ingredient still life: green tea leaves + guarana seeds (for the composition panel).
  4. Lifestyle (Tunisian context): desk with notes and the bottle; office; gym bag; hands only is fine.
  5. Founder or lab portrait (trust).
  Export as WebP, ~2000px, with transparent-background PNG versions for the bottle.
- **Label/packaging**: make sure the bottle label uses the same fonts and colors as the new site.
- **Regulatory and lab info**: manufacturer name, authorization/registration number, batch format.
- **Real reviews**: first customers' WhatsApp feedback (with permission), 3–5 short UGC videos.

### Phase 3: brand system
A one-page brand guide covering logo usage, palette rules, type scale, icon style, photo style, and voice (FR / AR / Darija), so the ads, packaging, site and social look like one brand.
