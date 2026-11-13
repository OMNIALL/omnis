# OMNIS — weekly review (30 minutes, every Monday)

_Landing Page Masterclass, module 11: the people who win review their numbers every week and change one thing at a time._

## 1. Collect the numbers (last 7 days)

| Funnel step | Where to read it | This week | Last week |
|---|---|---|---|
| Visitors | Vercel → Analytics (enable Web Analytics on the project) | | |
| Product page views | Meta Events Manager → `ViewContent` (or Vercel → `/products/focus`) | | |
| **Form starts** | Meta → `InitiateCheckout` (fires on first touch of the order form, or on /checkout) | | |
| Orders placed | Google Sheet "Commandes" (rows) / Meta → `Purchase` | | |
| WhatsApp contacts | Meta → `Contact` | | |
| **Confirmed on WhatsApp** | Your WhatsApp / Sheet status | | |
| **Delivered & paid** | Sheet status = "Livré" | | |
| Refused at the door | Sheet status = "Annulé" after shipping | | |

Ratios to compute:
- Product view → form start (interest): target > 15%
- Form start → order (form friction): target > 40%
- Order → delivered (COD quality): target > 80% — **this is the real conversion rate for a COD shop**
- Ad spend ÷ delivered orders = cost per delivered order (compare to your margin per order)

Break orders down by `utm_content` (creative) and `abVariant` columns in the Sheet.

## 2. Diagnose (pick the weakest step)

| Symptom | Likely cause | First thing to try |
|---|---|---|
| Low view → form start | Offer or price not convincing above the fold | Test the pack/price block, headline variant B, add first real reviews |
| Low form start → order | Form friction / trust | Shorter address field, clearer COD reassurance, WhatsApp order option visible |
| Many orders, low delivered | Fake/impulse orders, bad phones | WhatsApp confirmation before shipping, call before dispatch, tighten anti-spam |
| Many WhatsApp contacts, few orders | Questions not answered on the page | Add the repeated questions to the FAQ |
| One creative brings orders that get refused | Mismatch between ad promise and product | Pause it; check the ad claims vs the page |

## 3. Change ONE thing, write it down

| Week | Change | Why | Result next week |
|---|---|---|---|
| | | | |

## A/B test rules (hero headline)
- Turn on: `HERO_AB_ACTIVE = true` in `src/lib/abTest.ts` (variant B = « Ton 3ème café ne marche plus ? Passe à une gélule. »).
- 50/50 split, sticky per visitor; variant saved on every order (`abVariant` column) and every pixel event.
- **Decide only after ~100 orders per variant** and at least 2 full weeks (weekday/weekend patterns).
- Compare **delivered orders per visitor**, not raw orders.
- Then ship the winner as variant A, and test the next idea from `copy-variants.md`.
