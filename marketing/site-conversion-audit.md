# OMNIS site: conversion audit

_Inspected 2026-11-13 on localhost (mobile 375px + desktop), code + live pages._
Goal: turn paid-ad traffic (Meta / TikTok, mostly mobile, Tunisia, COD) into confirmed orders.

**The 3 things that matter most before spending on ads:**
1. Orders can silently disappear (see P0-1/P0-2). Fix first: every lost order is lost money.
2. There is no tracking pixel, so ads can't optimize for purchases and you can't measure ROAS.
3. There are no real product photos anywhere on the site. Ad viewers land on drawings, not the product.

---

## P0: blockers (fix before running ads)

| # | Problem | Where | Why it hurts | Fix |
|---|---|---|---|---|
| 1 | Orders are saved to a JSON file on the server disk | `src/app/api/orders/route.ts` | On Vercel and most hosts the disk is read-only or wiped, so orders are lost in production | Store orders in a real DB (Supabase / Firebase / Google Sheet via API) and send a WhatsApp/email alert per order |
| 2 | Checkout shows "Commande confirmée" even when saving fails | `src/app/checkout/page.tsx` (`finally` block) | Customer thinks they ordered; you never see it | Show success only if the API returned OK; otherwise show an error + "commander via WhatsApp" fallback |
| 3 | Submitting with an empty cart creates a fake FOCUS order with "Client Test / 99 000 000" defaults | `checkout/page.tsx` | Junk orders in admin | Block submit when cart is empty; remove the fallback values |
| 4 | No Meta Pixel / Conversions API, no TikTok Pixel, no GA4 | whole site | Ads can't optimize to purchases; no ROAS | Add Meta Pixel + CAPI and TikTok Pixel: `ViewContent`, `AddToCart`, `InitiateCheckout`, `Purchase` (value 39/46 TND) |
| 5 | WhatsApp / phone `+216 98 456 789` and `hello@omnis.tn` look like placeholders | contact, FAQ, returns, track, legal | Customers message a dead or wrong number | Replace with real numbers everywhere |
| 6 | `/admin` and `GET/PATCH/DELETE /api/orders` have no password | admin + API | Anyone can read customer names, phones and addresses, or delete orders | Add auth (at minimum a server-checked password / basic auth) |
| 7 | No phone validation | checkout | Wrong numbers mean undeliverable COD and lost delivery fees | Enforce 8 digits starting 2/4/5/9 and normalize to +216 |

## P1: conversion (biggest uplift)

**Product page (the ad landing page)**
- **No product photo.** The hero is a sticker circle saying "FOCUS". Add real photos: bottle front, bottle in hand, capsule close-up, the label/back (dosages), and someone using it at a desk or in a revision session. Short looping video if possible.
- **Price and "Ajouter au panier" sit below the fold on mobile** (price at ~941px, button at ~1029px on an 812px screen). Move price + CTA above the fold and add a **sticky bottom bar** ("Commander · 39 TND · Paiement à la livraison").
- **The flow is too long**: product → add to cart → drawer → checkout page → form. Tunisian COD buyers convert best with an **inline order form on the product page** (Nom, Téléphone, Gouvernorat, Adresse, quantity, one button "Commander, je paie à la livraison").
- **Add bundles to raise basket size**: 1 flacon 39 TND · 2 flacons (60 jours), e.g. 72 TND · 3 flacons, e.g. 99 TND + **livraison gratuite**. Pre-select the 2-pack ("Le plus choisi").
- **Fake-looking proof**: "4.9/5 (128 avis vérifiés)" and the 4 testimonials are placeholders. Replace with real reviews (WhatsApp screenshots, short UGC videos) or remove. Fake ratings hurt trust and can break ad/consumer rules.
- **Add a risk reverser**: "Paie seulement à la réception", "Ouvre et vérifie avant de payer" (if your delivery company allows it), and a clear WhatsApp button "Une question ? Écris-nous".
- **Speak to the segments from the ads** with one block each: "Bac / étudiants: révisions sans nuits de café", "Employés: le coup de barre de 14h", "Sport: focus mental avant la séance". Match the ad's message to the landing.
- **Explain the mechanism in 3 visual steps**: Caféine de guarana (énergie) + L-théanine (calme) = focus net, sans crash. Plus a short "vs café / energy drink" comparison table.
- **Urgency that's true**: the first batch is 200–300 bottles, so "Premier lot limité" / stock counter is honest and effective.

**Homepage**
- Hero (mobile): no price, no product image, no proof above the fold. Add a product photo, "39 TND · Paiement à la livraison" (+ "Livraison offerte dès 2 flacons" if you adopt bundles) and one line of proof.
- ÉNERGIE / SOMMEIL / IMMUNITÉ "Bientôt" cards distract from the only product on sale. Move them lower or turn them into a "Rejoins la liste d'attente" block.
- The Newsletter asks for an email. In Tunisia, collect **WhatsApp numbers** instead.

**Checkout**
- **Not translated**: in Arabic mode the layout flips to RTL but all text stays French. Translate it or force LTR for FR.
- Drop or make optional: "Ville / Délégation" can merge into "Adresse". Fewer fields means more orders.
- Show the trust strip next to the button: COD, livraison, WhatsApp support, "on vous appelle pour confirmer".
- After the order: a thank-you page with a **WhatsApp "Confirme ta commande" button** (cuts COD refusals) and fire the `Purchase` event.

## P2: consistency & trust

- **Delivery time conflict**: banner/checkout say 24–48h, product FAQ said 2–5 jours. Pick one.
- **"Made in Tunisia" + lab**: add a line on the lab/production standard (and the authorization number once you have it). Strong trust for supplements.
- **Claims to soften**: FAQ "Il y a des effets secondaires ? → Non…" with 100 mg caffeine is risky. Say "formulé pour limiter la nervosité" and keep the warnings (enceintes, enfants, sensibles à la caféine, max 2/jour).
- **Social links** in the footer point to tiktok.com / instagram.com root. Link the real accounts.
- **Speed**: framer-motion and a custom cursor and loader on every page. Check Lighthouse on 4G; ad traffic bounces if the page takes more than 3 s. Disable the custom cursor on mobile.

## Tracking checklist (for the ads)

- Meta Pixel + CAPI events: `PageView`, `ViewContent` (product), `AddToCart`, `InitiateCheckout`, `Purchase` (value, currency TND, order id for dedup).
- TikTok Pixel: same events.
- UTMs on every ad link (`utm_source`, `utm_campaign`, `utm_content` = creative name like `reel_bac_trust`) and save them with each order so the admin shows which creative sold.
- Track the **COD confirmation rate** and **delivered rate** per creative, not just orders.
