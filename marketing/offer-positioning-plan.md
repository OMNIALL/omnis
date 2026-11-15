# OMNIS FOCUS — Offer & positioning plan

Built on the $100M Offer / cold-friendly offer framework (desire · value stack · risk & proof) and N.T.P.M.A iteration.
Every action respects CLAUDE.md: no medical/anxiety claims, no promised results, no invented reviews, numbers, logos or scarcity.

---

## 1. Positioning (the one sentence everything hangs on)

> **Pour ceux qui ont une journée qui compte : l'énergie d'un café, la tête claire, sans le crash de 14h.
> Formule transparente, fabriquée en Tunisie, payée à la livraison.**

| Venn zone | OMNIS |
|---|---|
| **Winning zone** (what they want × what we do best) | Steady energy without jitters/crash · exact mg on the label (no "proprietary blend") · Tunisian-made, priced in DT · COD + WhatsApp · speaks Darija |
| **Dumb zone** (we do it, nobody cares) | Ingredient chemistry for its own sake, "nootropic" jargon |
| **Losing zone** (competitor wins) | "More energy" vs coffee / energy drinks (cheaper, everywhere) · medical/anxiety angle (pharmacies — and forbidden for us) |

**Enemy:** not coffee — *the third coffee*. We sit next to the first one, we replace the ones that make you nervous.

---

## 2. Gaps → fixes

### Gap 1 — Desire: we describe the problem, not the person they become
Mass-market desire: **health/pain avoidance** (the crash) + **status** (being the one who delivers).

| Action | Where | Priority |
|---|---|---|
| Add identity lines per segment: *"Celui qui finit ses fiches avant 18h."* / *"Tu sors de la réunion avec encore de l'énergie."* | Moments cards, ads hooks | P1 |
| Hero sub-line names the segment + outcome, not the formula (formula moves to eyebrow — already there) | `Hero.tsx` (via A/B test B variant) | P1 |
| Every creative opens on the **before** in 3 s (the 14h crash), closes on the **after** | creatives / `omnis-scripts` skill | P1 |

### Gap 2 — Value stack: it's "a bottle at a price", not a complete solution
Goal: the price feels small next to what they get — **without inventing fake "valued at" numbers.**

| Action | What it is | Cost | Priority |
|---|---|---|---|
| **Guide offert « Protocole Focus 30 jours »** (PDF, FR + Darija) | When to take it, caffeine budget per day, the 14h trap, sleep cut-off, exam-week routine. Sent on WhatsApp after delivery | ~0 DT (we write it) | P1 |
| **WhatsApp routine follow-up** | Day 1 "comment la prendre", day 7 check-in, day 25 "il te reste 5 gélules" | ops time | P1 |
| **Reframe packs as routines** | 1 = Découverte (test it) · 2 = Routine 60 jours (+ guide + free delivery) · 3 = **Session complète 90 jours** (a full exam period / quarter) | copy only | P1 |
| **Seasonal pack « Session de janvier »** | 2–3 bottles + exam-week plan, sold Dec → Jan exams (bac blanc, fac session) | copy + landing block | P2 |
| Show the daily cost: *"1,10 DT/jour en pack 3 — moins qu’un café en terrasse."* | Buy box, bundle cards | P1 |

### Gap 3 — Risk reversal: COD removes payment risk, not "what if it doesn't work for me"
Current returns page says opened boxes can't be returned — fine for hygiene, but it gives cold traffic no safety net.

**Recommended guarantee (fits hygiene rules + pushes the 2-pack):**
> **« Teste le premier flacon. Pas convaincu ? Renvoie le second, encore scellé : on te le rembourse. »**
> First order only, one per phone number, within 15 days of delivery. Refund by D17 / virement.

- Max cost per claim ≈ one bottle's price + return shipping, only on 2/3-packs → capped and predictable.
- Alternative (stronger, costlier): *"Satisfait ou remboursé sur le 1er flacon, même entamé"* — only if margins allow; decide after measuring refund rate on the recommended version.
- Must update: `/returns` page, FAQ, buy box reassurance, OrderSuccess, ads.

Other risk removers (already there, make them louder): courier calls before passing · pay only on delivery · WhatsApp answer · exact label photo.

### Gap 4 — Proof: no customer reviews yet (biggest cold-traffic weakness)
We will **not** invent any. We will manufacture real ones fast.

| Action | Detail | Priority |
|---|---|---|
| **Programme testeurs** (30–50 people) | Students, young pros, gym-goers. Free bottle → honest review + photo/short video after 14 days. Shown with first name, city, "produit offert" mention | P0 |
| **Review collection on every order** | WhatsApp at day 14: 1–5 rating + one sentence + optional photo. Stored in the Google Sheet | P1 |
| **Site review block** | `SocialProof.tsx` switches from "trust cards" to real reviews once ≥ 10 exist; gifted reviews labelled | P2 (when data exists) |
| **Authority** | Show the real lab analysis certificate and any registration number **once you have the documents** (no lab name until confirmed). Founder story with a real face if you agree | P1 |
| **Proof we already own** | 9 PubMed studies + Examine.com links → keep, add one plain line in ads: *"La combinaison caféine + L-théanine est étudiée depuis 2008."* | done / ads P1 |

### Gap 5 — Scarcity & urgency: must be real
| Today | Fix |
|---|---|
| "Premier lot limité" badge | Keep **only** with the real number (*"Premier lot : X flacons"*). Otherwise remove |
| "Le plus choisi" tag on the 2-pack | Not true before sales → replace with **"Recommandé"** until order data supports it |
| No reason to buy now | Real calendar urgency: **exam sessions** (January, May–June, bac). *"Commande avant le 20 décembre, livré avant les révisions."* |
| Launch price | Only if you really plan a price change, with the real end date |

### Gap 6 — Certainty
Already strong: 24–48h, COD, courier calls. Add: *"Tu sais exactement ce que tu prends : 180 mg L-théanine, 100 mg caféine, B6, B12."* next to the label photo; expected feeling timeline (*"tu la sens en 30–45 min"*) only if the pharmacist validates the wording.

---

## 3. Roadmap

### Phase 0 — before spending on ads (this week)
1. Your decisions (section 5).
2. Site: remove/replace unverifiable tags, reframe packs, daily-cost line, guarantee everywhere, `/returns` rewrite.
3. Write the « Protocole Focus 30 jours » guide (FR + Darija).
4. Launch the tester programme (bottles out this week → reviews in ~14 days).

### Phase 1 — launch (weeks 1–2)
- Ads: 3 angles × segments from the creatives brief, all opening on the 14h crash. Small budget, learn CVR & CPA.
- WhatsApp follow-up sequence live (day 1 / 7 / 14 review / 25 reorder).
- Track: order confirmation rate, **delivery acceptance rate** (COD refusals), AOV, pack mix.

### Phase 2 — proof (weeks 3–6)
- First real reviews on the site and in ads (UGC from testers).
- « Session de janvier » pack live from mid-December.
- Weekly review (`marketing/weekly-review.md`): which variable limits growth now?

### Phase 3 — ongoing N.T.P.M.A iteration (one variable at a time)
| Variable | First test to run |
|---|---|
| **Niche** | Students vs young professionals — which converts cheaper? Shift creative mix toward the winner |
| **Transformation** | "Sans le crash" vs "La tête claire jusqu'au soir" as the hero promise (A/B test is already wired) |
| **Price** | Default-select 2-pack vs 3-pack; guarantee on/off by period |
| **Mechanism** | Later: a gélule format variant or a "FOCUS Nuit"-style range only if customers ask |
| **Access channel** | Meta first → TikTok organic (Darija scripts already written) to cut CPA |

---

## 4. KPIs to watch weekly
CVR (product page) · AOV / % 2–3 packs · CPA · WhatsApp confirmation rate · **delivery acceptance rate** · refund/guarantee claims · reviews collected · repeat orders at day 25–35.

---

## 5. Decisions needed from you
1. **Guarantee:** recommended version (refund the sealed 2nd bottle) or the stronger "même entamé"? Depends on your unit cost.
2. **First batch size** — real number, or we drop the "limité" badge.
3. **Tester budget:** how many free bottles (30? 50?).
4. **Lab certificate / registration number** — do you have the documents to show?
5. **Founder face & story** on the site — yes or no?
6. **January exam pack** — yes (go live mid-December)?

---

## 6. Self-audit after the plan
| Question | Answer after Phase 2 |
|---|---|
| Mass-market desire? | Avoid the crash + be the one who delivers |
| Transformation before/after? | 3 coffees & a 14h crash → one capsule, clear head until the evening |
| Value vs price? | Product + 30-day protocol + WhatsApp follow-up + free delivery, 1,10–1,30 DT/day |
| Complete solution? | A routine (product + guide + follow-up), not a bottle |
| Biggest risk & removal? | "What if it doesn't work for me?" → sealed-bottle guarantee + COD |
| Proof? | Real tester reviews, lab certificate, published studies |
| Understood in 5 s? | "L'énergie d'un café, sans le crash." |
