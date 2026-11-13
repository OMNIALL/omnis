# OMNIS FOCUS — copy variants for A/B testing

_Test one thing at a time (headline OR CTA), 50/50 split, and wait for ~100 orders per variant before deciding
(below that, differences are mostly noise). Current live version = A._

## Hero headlines

| # | FR | Tunisian | Angle | Why it might win |
|---|---|---|---|---|
| **A (live)** | L'énergie d'un café. **Sans le crash.** | الإينرجي متاع قهوة. من غير الطيحة. | Outcome | States the whole promise in 7 words; contrast with coffee everyone knows |
| B | Ton 3ème café ne marche plus ? **Passe à une gélule.** | ثالث قهوة ما عادش تنفع؟ بدّلها بكاشية. | Problem-led | Names a moment the reader lives every day; strongest for ad traffic from the "3 cafés" creatives |
| C | Une gélule le matin. **Concentré jusqu'au soir.** | كاشية الصباح. مركّز حتى للعشية. | Ease | Lowest effort framing; good for office workers |
| D | Le focus, **fabriqué en Tunisie.** | التركيز، مصنوع في تونس. | Authority / local pride | Trust-first; may win with cold traffic that doesn't know the brand |

_Check before testing B/C: keep claims experiential (no "guaranteed", no medical wording)._

## Primary CTA

| # | FR | Tunisian | Angle |
|---|---|---|---|
| **A (live)** | Je commande · 39 DT | كوموندي · 39 DT | Clarity + price |
| B | Je commande, je paie à la livraison | كوموندي، و خلّص كي توصلك | Risk reversal (COD) |
| C | Je prends le pack 60 jours · 72 DT | نكوموندي الپاك 60 يوم · 72 DT | Anchors the best-value pack (raises basket size) |

## Final CTA section headline
- A (live): « Laisse tomber le 3ème café. Prends une gélule. »
- B: « 30 jours pour sentir la différence avec ton café. » _(experience framing — no promise of result)_

## What to measure per variant
Product-page visits → form starts → orders → **confirmed on WhatsApp** → **delivered** (COD refusals matter more than raw orders).
UTM `utm_content` + the variant id should be saved with each order (Sprint 3).
