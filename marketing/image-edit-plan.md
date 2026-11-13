# OMNIS FOCUS — image edit plan (all 11 images)

_Audit done at 100% zoom on the originals in `images/`, 2026-11-13. Method: TOUCH (task first, one change at a time,
uphold the real, check the seams, hand off with rights)._

## The finding that drives everything

**The AI invented a slightly different label in every image.** The scenes, light and hands are good, but the
small label text is unreliable — and on 4 images the **dosages are wrong**, which turns a nice photo into a
**false product claim** (e.g. "500 mg L-théanine"). A product photo must show the product customers receive.

| # | Image | Doses on label | Text errors found | Status on site |
|---|---|---|---|---|
| 1 | `focus-bottle` | ✅ 180 / 100 / 1,4 / 2,5 | "DÉSERVE AUX ADULTES", Arabic badge gibberish, "مقمل غذائي" | in use (gallery, bundle cards) |
| 2 | `focus-34` | ✅ | "30 **CÉLLUES**", badge gibberish, "عقمل غذائي" | **removed** (replaced by #3) |
| 3 | `focus-34-alt` | ✅ | "ALIMENTAICE", badge "RÉSERVE AEU ARUG(TEE)", Arabic wrong | in use (**hero**, gallery, share image) |
| 4 | `focus-capsule-macro` | — (no label) | none | in use (gallery) |
| 5 | `focus-ingredients` | ❌ "1,5 mg", "Pétrique en Truiois", gibberish | rotated label garbled | **cropped**: bottle removed → `focus-ingredients-nobottle.webp` |
| 6 | `lifestyle-study` | ❌ **120 mg**, 7,6 mg, "50 ESSULES" | most text gibberish | **removed** |
| 7 | `lifestyle-office` | ❌ **150 mg / 196 mg**, "30 NCEAMS" | most text gibberish | **removed** |
| 8 | `bundle-2` | ✅ | "NÉSERVE AUX APALTES", "Fabrique" (no accent) | in use (gallery) |
| 9 | `lifestyle-gym` | ❌ **500 mg / 106 mg**, "10 CÉLULES" | everything gibberish | **removed** |
| 10 | `hand-bottle` | ✅ | "NÉSERVE 6DE AADLTES", "PAR OÉLULE", "ALIMENTVIRE" | in use (gallery) |
| 11 | `bg-texture` | — | none | not used yet |

The "Au quotidien" lifestyle section on the home page is **hidden** until #6, #7, #9 are fixed
(one line to re-enable in `src/app/page.tsx`).

Side panels on every bottle are AI pseudo-text. That's unreadable at web size and acceptable for mood shots,
but never use a close-up where it's legible.

---

## T — Task first: what each image needs

The task is **not** "fix typos with AI" — text through a generator gets re-mangled (you've seen 9 different
labels already). The task is **label replacement with the real artwork**. Route accordingly:

| Route | When | Fidelity |
|---|---|---|
| **A. Reshoot the real bottle** (best) | Once printed bottles exist — 1 hour with a phone, window light, cream fabric | 100% real — use for pack shot + hero |
| **B. Label replacement in Photoshop** (recommended now) | You have the label artwork (PDF/PNG from your designer) | Exact text — no AI on the label |
| **C. Nano Banana edit, one zone at a time** (fallback) | No artwork yet; minor badge fixes only | Must be checked at 100% every time |

Images #6, #7, #9 have the whole label wrong → **Route B** (or regenerate the scene with the corrected
#1 as reference and then Route B). Don't try to repair 10+ text errors with prompts.

### Route B — Photoshop label replacement (per image, ~10 min each)
1. Open the original JPEG from `images/` (never the web copy).
2. **Place** your flat label artwork as a Smart Object over the bottle.
3. **Edit → Transform → Warp → Cylinder** (or Arc) to wrap it around the bottle; match the label edges.
4. Match the light: duplicate the original bottle layer → set to **Multiply** above the label at 30–60% →
   this carries the real shadows/reflections onto the new label. Add a slight Gaussian blur (0.3–0.6 px)
   on the label so it matches the photo's sharpness.
5. Mask the fingers back over the label on `hand-bottle` (#10).
6. Export a **PNG master** to `images/masters/<name>.png`.
7. Check at 100% (QA card below), then re-export web copies (step H).

### Route C — Nano Banana edit prompts (one change per pass, verify after each)
Upload the image + a close photo/PDF of the correct label, then one prompt at a time:

- **Badge (all bottles):**
  *"Keep everything identical. Only change the black badge on the label: its text must read exactly
  'RÉSERVÉ AUX ADULTES' on two lines in white bold sans-serif, and below it in Arabic 'للكبار فقط'.
  Do not change anything else on the label or in the image."*
- **Arabic line (#1, #2, #3):**
  *"Keep everything identical. In the 'COMPLÉMENT ALIMENTAIRE' box, the Arabic text must read exactly
  'مكمل غذائي'. Change nothing else."*
- **Count box (#2 only, if you still want it):**
  *"Keep everything identical. The small box on the left of the label must read exactly '30' and below it
  'GÉLULES'. Change nothing else."*
- **Accent (#8):** *"…the line must read exactly 'Fabriqué en Tunisie / صنع في تونس'. Change nothing else."*

After every pass: zoom to 100% on the whole label — Nano Banana sometimes "fixes" one word and breaks
another (dosages included). If the doses change, discard that output.

---

## O — One change at a time: the chain per image

| Image | Chain |
|---|---|
| #1 focus-bottle | B (label) → background cut-out to transparent PNG (Photoshop "Remove background" / remove.bg) → master PNG |
| #3 focus-34-alt (hero) | B (label) → master. Optional: Generative Expand to 16:9 on the left for a wide desktop hero |
| #2 focus-34 | Optional (spare). B or C(count box + badge) |
| #5 focus-ingredients | Either keep the no-bottle crop (done), or B on the rotated bottle (harder warp) |
| #6 lifestyle-study | Reshoot/regenerate scene → B → master |
| #7 lifestyle-office | Regenerate scene → B → master |
| #9 lifestyle-gym | Regenerate scene → B → master |
| #8 bundle-2 | B on both bottles (same artwork twice) or C(badge, accent) |
| #10 hand-bottle | B (+ mask fingers back) or C(badge) |
| #4, #11 | No edit needed |

Canonical order for any image: **repairs (label) → other edits (expand/cleanup) → upscale (only if needed,
faithful mode e.g. Topaz-class — never a "creative" upscaler, it invents label detail) → PNG master →
web/ad derivatives.**

## U — Uphold the real
- Doses, count (30 gélules), claims and "Fabriqué en Tunisie" must match the **real printed label**.
- Don't show capsule colors/sizes that differ from your real capsules.
- These are AI images: keep the SynthID watermark/provenance intact; tick **"Made with AI"** on Meta/TikTok ads.
- Once real photos exist (Route A), use them for the pack shot and hero; keep AI for mood/lifestyle.

## C — Check the seams (QA card — do this at 100% zoom for every output)
- [ ] Label reads exactly: OMNI(S) · FOCUS · Allume ton focus. · L-théanine + Caféine + B6 + B12 · 30 GÉLULES ·
      COMPLÉMENT ALIMENTAIRE · مكمل غذائي · RÉSERVÉ AUX ADULTES · Fabriqué en Tunisie / صنع في تونس
- [ ] Dosage table: L-THÉANINE 180 mg · CAFÉINE 100 mg · VITAMINE B6 1,4 mg (100% VNR) · VITAMINE B12 2,5 µg (100% VNR)
- [ ] Label edges follow the bottle curve; no halo, no flat "sticker" look
- [ ] Light direction and shadows on the label match the scene
- [ ] Hands: 5 fingers, natural nails, fingers in front of the label where they should be
- [ ] Same label across the whole set (batch consistency)

## H — Hand off
1. Masters → `images/masters/` (PNG, kept out of git — the `images/` folder is ignored).
2. Web copies: send me the masters and I'll regenerate `public/images/*.webp` (≈1800 px, ~80 quality),
   re-enable the lifestyle section, and rebuild `og.jpg`.
3. Ad crops (after fixes only): 1:1 (1080×1080), 4:5 (1080×1350), 9:16 (1080×1920) — I can cut these
   faithfully from the masters (no AI), centered on the product.
4. Rights: Gemini/Nano Banana outputs are yours to use commercially under Google's terms; they're AI-generated,
   so disclose where platforms require it.
