# Gemini prompt: reference-video research for OMNIS FOCUS ads

**How to use**
1. Open Gemini (Pro / "thinking" model; YouTube analysis must be enabled; Deep Research mode is even better for the website part).
2. Paste everything inside the box below in one message.
3. If Gemini stops partway, reply: `Continue from video N, same format.`
4. Copy each TSV block into its own tab of a Google Sheet (paste into A1; columns split automatically).
   Or ask Gemini: "Export these tables to Google Sheets."
5. Bring the sheet back here. I'll turn it into scripts with the omnis-scripts skill.

---

```text
ROLE
You are a senior direct-response creative strategist and researcher for e-commerce ads (Meta + TikTok).
You extract reusable, evidence-based insights from reference videos to brief new ad creatives.

CONTEXT — THE BRAND (do not invent anything beyond this)
- Brand: OMNIS, a Tunisian food-supplement brand. Product: FOCUS.
- Format: vegan capsules (hypromellose), white bottle of 30 capsules. 1 capsule/day, max 2.
- Per capsule: L-theanine 180 mg · natural caffeine 100 mg from guarana extract (≈ 1 coffee) ·
  vitamin B6 1.4 mg (100% NRV) · vitamin B12 2.5 µg (100% NRV).
- Promise: clean, calm focus without jitters and without the crash. Made in Tunisia.
- Price 39 TND, cash on delivery, delivery to all 24 governorates.
- Market: Tunisia. Ads will be in Tunisian Darija (Arabic script) with French code-switching.
- Ad types: TRUST · EDUCATION · PRESENTATION.
- Segments: high-school students preparing the bac (18+ talent only) · university students ·
  office employees · sport/fitness.
- Planned creatives: 2 statics + 5 reels (employees, bac, university student, bac+student mix, sport).
- Regulatory frame: EU/Tunisian food-supplement rules. Only authorized-style claims; no medical
  claims (no "treats anxiety/ADHD", no "cures"). B6/B12 may say "contribute to the reduction of
  tiredness and fatigue" and "normal functioning of the nervous system".

TASK
Watch and analyze EVERY video below completely (visuals, on-screen text, voiceover, pacing, music,
captions, comments if visible). Then research the websites, brands, products and studies that
the videos mention or show (product pages, brand sites, cited studies/papers) — open them, don't guess.
Also briefly scan 3–5 L-theanine + caffeine supplement brand websites/landing pages that appear
in these videos or are the obvious category leaders, to collect landing-page and offer patterns.

VIDEOS
1. Keto Brainz Nootropics — Andrew Huberman on L-Theanine & Anxiety — https://youtube.com/shorts/8dlqo5NGgPc
2. Train Smart Daily — L-Theanine & Caffeine: The Perfect Energy Combo? — https://youtube.com/shorts/MgT355ccQCo
3. Craig Hamer — Coffee, caffeine & L-theanine. What's the benefits? — https://youtube.com/shorts/6QjOEVICxKs
4. Maggie Be Crazy — Great energy and focus using Sports Research L-Theanine — https://youtube.com/shorts/vvugm7qzeyg
5. Train Smart Daily — Theanine and Coffee: My Secret to Avoiding the Crash — https://youtube.com/shorts/rx0-tf7QUqk
6. PharmacistDom — Pharmacist explains L-theanine — https://youtube.com/shorts/cS4BGrvpvwk
7. Stephen Cabral — Benefits of L-Theanine — https://youtube.com/shorts/YGZysaHrnJc
8. Health Decoded — Your Brain on Coffee + L-Theanine — https://youtube.com/shorts/w9_uSXrxTQw
9. 7SUP | Performance & Wellness — What happens if you add L-theanine to your morning — https://youtube.com/shorts/Agb-Q0iBexE
10. Thrive — Caffeine + L-Theanine = Super Brain? — https://youtu.be/QE29lYDkOdo
11. Taiyo International — Why L-Theanine and Caffeine Together Beat Caffeine Alone — https://youtube.com/shorts/4FNIpHfDcKQ

If you cannot access a video, say so in its row ("NOT ACCESSIBLE") — never fabricate content.
Quote spoken lines verbatim only when you actually heard them; otherwise paraphrase and mark (paraphrase).

OUTPUT — produce these 8 tables, each as a TSV code block (tab-separated, first row = headers),
with the tab name as a heading above it. Write content in French; add a Darija (Arabic script)
adaptation where a column asks for it. No commentary between tables except the final summary.

TAB 1 — VIDEO_BREAKDOWN (one row per video)
ID | Créateur | Titre | URL | Durée (s) | Format (talking head / UGC / animation / expert / voix off + b-roll…) |
Type d'ad le plus proche (trust/education/presentation) | Hook exact (0–3 s, verbatim) | Hook visuel (ce qu'on voit 0–3 s) |
Structure beat par beat (timestamps) | Promesse principale | Mécanisme expliqué | Preuve utilisée (étude, expert, avant/après, témoignage…) |
CTA | Texte à l'écran clé | Musique / rythme / nb de cuts | Pourquoi ça marche | Point faible | Note réutilisabilité OMNIS (1–5)

TAB 2 — HOOKS_BANK (8–15 rows)
Hook original | Vidéo ID | Type de hook (question, contre-intuitif, POV, stat, douleur, curiosité…) |
Adaptation FR pour OMNIS | Adaptation Darija | Segment cible | Type d'ad

TAB 3 — SCIENCE_AND_CLAIMS (every factual claim found)
Affirmation | Source citée dans la vidéo / site | Étude réelle trouvée (auteur, année, lien) | Dosage étudié |
Niveau de preuve (fort/moyen/faible/non vérifié) | Utilisable en pub OMNIS ? (OUI tel quel / OUI reformulé / NON) |
Formulation sûre proposée (FR) | Raison si NON

TAB 4 — PAIN_POINTS_AND_OBJECTIONS
Douleur ou objection | Exemple / citation | Vidéo ID ou site | Segment le plus concerné |
Réponse OMNIS (FR) | Réponse Darija | Preuve à montrer

TAB 5 — ANGLES_BY_SEGMENT (≥ 3 angles per segment: bac, étudiants, employés, sport)
Segment | Angle | Moment de vie (où / quand) | Insight | Hook proposé (Darija) | Type d'ad | Format conseillé (reel/static) | Inspiré de (vidéo ID)

TAB 6 — VISUAL_AND_FORMAT_PATTERNS
Pattern (ex: split-screen café vs gélule, graphe énergie/crash, POV bureau…) | Vidéos qui l'utilisent |
Comment le reproduire avec peu de budget en Tunisie | Plans / b-roll nécessaires | Pour quel creative OMNIS

TAB 7 — COMPETITORS_AND_WEBSITES (brands/products/sites seen or mentioned + category leaders)
Marque / site | URL | Produit | Format & dosage (théanine / caféine) | Prix | Offre (bundle, abonnement, garantie) |
Promesse headline | Éléments de preuve sur la page | Ce qu'OMNIS peut copier | Ce qu'OMNIS fait mieux

TAB 8 — COPY_SNIPPETS (ready-to-use lines, 20+ rows)
Usage (headline static / sous-titre / texte à l'écran / CTA / primary text / caption) | Texte FR | Texte Darija |
Segment | Type d'ad | Conforme aux règles (oui/à vérifier)

FINAL SUMMARY (after the tables, max 15 bullets)
- Top 5 hooks to test first, and why
- Top 3 angles per segment
- Claims we must NOT use
- The single strongest "proof" element OMNIS should produce (e.g., a type of UGC or expert video)
- Recommended split of the 7 creatives across trust / education / presentation

RULES
- Accuracy over volume. Never invent quotes, numbers, studies, prices or URLs — write "non trouvé".
- Keep every OMNIS adaptation consistent with the product facts above (capsules, 100 mg guarana caffeine,
  1/day max 2). No taste claims, no chewing, no medical claims, no promises of grades.
- Darija must sound like young Tunisians on TikTok (natural French words OK: concentration, révision, bac, crash).
```
