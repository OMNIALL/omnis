# OMNIS — style guide ("clinical warmth")

Pharmacy-grade precision, made in Tunisia — warm, calm, credible. Not candy, not a template.
Tokens live in `src/app/globals.css`; primitives in `src/components/ui/`.

## Color
| Token | Hex | Use |
|---|---|---|
| `--cream` | `#FFF4E3` | Page background |
| `--paper` | `#FFFBF4` | Cards, alternating sections |
| `--ink` | `#14110F` | Text, dark sections, selected states |
| `--muted` | `#5E5750` | Secondary text (6.6:1 on cream — AA) |
| `--harissa` | `#E8432A` | **The one accent**: primary buttons, key words, icons |
| `--harissa-deep` | `#C7341E` | Primary button hover |
| `--sun` | `#FFC83D` | Price/highlights only, eyebrows on dark sections |
| `--sky` | `#8CC4FF` | Reserved for the future SOMMEIL line |
| `--line` | ink @ 12% | Hairline borders |

Rule: ~90% cream/paper/ink, harissa for emphasis only. Never rainbow card grids. Text under 16px ≥ `--muted` contrast.

## Typography
- **Headings**: Fraunces 600, sentence case, tight tracking (`.heading-xl`, `.heading-lg`). Italic harissa for one emphasized phrase.
- **Body**: DM Sans 16px, line-height 1.55.
- **Arabic**: IBM Plex Sans Arabic (automatic fallback in every font stack).
- **Logo / one display word**: Unbounded (`font-display-keep`). Nowhere else.
- **Eyebrow**: `.eyebrow` — 12px, caps, tracked, harissa (sun on dark).
- Scale: h1 2.35rem mobile → 4.5rem desktop · h2 1.875 → 3rem · h3 1.25rem.

## Layout
- Content width `max-w-7xl` via `<Container>`; gutters 16/24/32px.
- Sections via `<Section tone="cream|paper|ink" eyebrow title intro>` — `py-16 sm:py-24`, alternate tones for rhythm.
- Grids: 1 col mobile → 3–4 cols desktop, `gap-5…8`.

## Shape & depth
- Radius: cards 20px, hero/feature panels 28px, buttons/pills full.
- Shadows: `--shadow-card` (soft) and `--shadow-raised` (hover). **No hard offset shadows.**
- Borders: 1px `--line`; selected state = 2px ink.

## Buttons (`<Button variant>`)
- `primary`: harissa fill, white text — one per screen, the order action.
- `secondary`: paper + hairline border.
- `outline`: transparent + ink border (secondary links like « Comment ça marche »).
- Flat pills, ≥48px tall, focus ring = 3px sun outline. CTA text is value-led (« Je commande · 39 DT »).

## Icons
lucide-react, 1.5–1.75 stroke, harissa or ink. **No emoji** in UI. Tunisian flag = `<TunisiaFlag />` SVG.

## Imagery
- Real product photography first; `next/image` with `sizes`; white-background pack shots use `mix-blend-multiply` on cream.
- Warm daylight, cream/linen surfaces, no other brands, no faces needed.
- AI images: label text must be verified (see `marketing/image-edit-plan.md`).

## Motion
Subtle fade/translate on scroll (`whileInView`, once), ≤0.6s. No wobble, bounce, marquee, cursor effects.
`prefers-reduced-motion` disables animations globally.
