# OMNIS FOCUS: Nano Banana product photo prompts

For the website (hero, product page, bundles) and ads. Model: **Nano Banana Pro** (Gemini 3 Pro Image) for finals;
the Flash model is fine for quick drafts. Iterate at 1K, export the final at 2K/4K.

## Read first (this decides whether the photos look real)

1. **Use your real bottle as the reference image.** Take 2–3 phone photos of the actual OMNIS FOCUS bottle
   (front, 3/4 angle, label close-up) in daylight on a plain background, or use the label artwork PDF from your designer.
   Upload them with every prompt. Nano Banana is best at **keeping a product consistent from a reference**. Without one,
   it will invent a label: wrong text, wrong logo.
2. **Check every image against the real product:** label text (OMNIS, FOCUS, dosages), cap, capsule color, count.
   An ad or product page that shows something different from what customers receive breaks trust (and ad rules).
3. **AI disclosure:** images carry Google's SynthID watermark. Don't strip it, and mark "Made with AI" where Meta and TikTok ask.
   Use AI images for lifestyle and mood; a real photo of the product is still best for the main pack shot.
4. **No real people's faces / no other brands** (no visible logos on laptops, cans, cups, gym gear).
5. Capsule color: the prompts assume **clear vegan capsules with light beige powder** (guarana extract). Change this
   to match your real capsules.

## Locked style block (paste at the end of every prompt for a consistent set)

```
Style: premium, calm, editorial product photography for a Tunisian supplement brand.
Warm natural daylight, soft shadows, shallow depth of field, true-to-life colors.
Palette: warm cream (#FFF4E3) and off-white surfaces, deep ink (#14110F) accents, one touch of harissa red (#E8432A);
sun yellow (#FFC83D) only as a tiny accent if any. Clean, uncluttered, lots of negative space.
No text other than the product label. No other brand logos. No people's faces.
Keep the bottle and label exactly as in the reference images.
```

---

## 1. Hero pack shot (website main image, transparent-friendly)
**File:** `public/images/focus-bottle.png` · **Ratio:** 4:5 · **Use:** hero, product page, product card
```
Using the attached reference photos of the OMNIS FOCUS bottle, create a studio pack shot:
the white 120 ml supplement bottle with white cap, front label facing camera, standing on a seamless
warm cream background (#FFF4E3). Camera at label height, 85mm lens look, bottle centered with generous space above.
Soft large window light from the left, gentle contact shadow under the bottle, subtle reflection on the cap ridges.
Label perfectly sharp and readable, exactly as in the reference.
[Style block]
```
Then ask: *"Same image, remove the background to pure white"* (or cut it out in remove.bg / Photoshop) to get a transparent PNG.
When the PNG is ready, set `FOCUS_BOTTLE_IMAGE = "/images/focus-bottle.png"` in `src/components/brand/BottleVisual.tsx`.
The site then uses the photo everywhere instead of the illustration.

## 2. 3/4 angle with capsules
**File:** `public/images/focus-34.jpg` · **Ratio:** 1:1
```
Same OMNIS FOCUS bottle from the reference, turned at a 3/4 angle on a warm cream linen surface.
Cap removed and lying beside it; five clear vegan capsules filled with light beige powder spilled casually in front.
Soft daylight from the right, shallow depth of field (capsules in front slightly soft, label sharp).
[Style block]
```

## 3. Capsule macro
**File:** `public/images/focus-capsule-macro.jpg` · **Ratio:** 16:9 (also crop 1:1)
```
Extreme macro photograph of a single clear vegan hypromellose capsule filled with light beige powder,
resting on smooth off-white stone. A glass of still water slightly out of focus behind it.
Crisp detail on the capsule seam, soft daylight, calm and clinical but warm.
[Style block]
```

## 4. Ingredient still life (for the "Composition" section)
**File:** `public/images/focus-ingredients.jpg` · **Ratio:** 3:2
```
Overhead flat-lay still life on a warm cream plaster surface: a small heap of dark guarana seeds,
a few fresh green tea leaves, a small ceramic dish of light beige capsule powder, and three clear capsules.
The OMNIS FOCUS bottle from the reference lies on its side at the right edge, label readable.
Arranged with lots of negative space, soft top light, subtle shadows. Editorial, scientific, natural.
[Style block]
```

## 5. Lifestyle: révisions (bac & étudiants)
**File:** `public/images/lifestyle-study.jpg` · **Ratio:** 4:5 (ads) and 16:9 (site)
```
Late-afternoon study desk in a Tunisian home: handwritten revision sheets in French, an open notebook,
a pen held by a young adult's hand (hand and forearm only, no face), a glass of water, and the OMNIS FOCUS bottle
from the reference standing on the desk with one capsule next to it. Warm golden window light,
a hint of a white wall and a blue wooden shutter in the soft background. No laptop logos.
Calm, focused mood, not messy.
[Style block]
```

## 6. Lifestyle: bureau / open space
**File:** `public/images/lifestyle-office.jpg` · **Ratio:** 16:9 and 4:5
```
Modern office desk in Tunis, early afternoon: a closed laptop with no logo, a notebook, a ceramic coffee cup
pushed slightly aside, and the OMNIS FOCUS bottle from the reference in the foreground with a glass of water.
A person's hand reaches for the bottle (no face). Soft daylight from a large window, city blur outside.
Clean, professional, warm.
[Style block]
```

## 7. Lifestyle: sport
**File:** `public/images/lifestyle-gym.jpg` · **Ratio:** 4:5
```
Inside a minimalist gym locker area: a plain black gym bag (no logos) on a wooden bench, a water bottle,
chalk dust, and the OMNIS FOCUS bottle from the reference standing on the bench, label facing camera.
Soft directional light, slightly darker moody tones but warm, shallow depth of field. No people's faces, no brand logos.
[Style block]
```

## 8. Bundle shots (pack selector + "Pack & économise" section)
**Files:** `public/images/bundle-2.png`, `public/images/bundle-3.png` · **Ratio:** 1:1
```
Two identical OMNIS FOCUS bottles from the reference, standing side by side, slightly overlapping,
on a seamless warm cream background (#FFF4E3). Front labels facing camera, both sharp and identical.
Soft studio light from the left, gentle shadows. Centered with space around.
[Style block]
```
For 3 bottles: *"Same image, now three identical bottles in a gentle V arrangement, the middle one slightly forward."*

## 9. Hand + bottle (trust / "real product" feel)
**File:** `public/images/hand-bottle.jpg` · **Ratio:** 4:5
```
A hand holding the OMNIS FOCUS bottle from the reference toward the camera, label clearly readable,
against a soft warm cream wall. Natural skin tones, short clean nails, no jewelry branding, no face.
Daylight, slight shallow depth of field, authentic and simple.
[Style block]
```

## 10. Brand texture background (section backgrounds, no product)
**File:** `public/images/bg-texture.jpg` · **Ratio:** 16:9
```
Abstract close-up of warm cream lime plaster wall texture with very soft daylight gradient,
subtle and minimal, suitable as a website section background. No objects, no text.
[Style block]
```

---

## Editing prompts (fix variants without regenerating)
- *"Keep everything identical, but make the label text perfectly sharp and match the reference exactly."*
- *"Same scene, switch to morning light, cooler and brighter."*
- *"Same image, extend the canvas to 16:9 on the left with more empty cream background (for headline text)."*
- *"Remove the pen and notebook, keep only the bottle, capsule and water glass."*

## Delivery checklist
- [ ] Label text correct on every image (OMNIS · FOCUS · CAFÉINE NATURELLE · L-THÉANINE · 30 GÉLULES)
- [ ] Capsule color/count match the real product
- [ ] No faces, no third-party logos
- [ ] Export WebP (site, ~2000px long side) + JPG/PNG (ads); pack shot also as transparent PNG
- [ ] File names as above, placed in `public/images/`
- [ ] "Made with AI" toggled on when used in Meta/TikTok ads
