/**
 * OMNIS Design Tokens
 * Direction C — Pop Énergie
 * Visual Identity: Loud, Young, Sticker-Style
 */

export const colors = {
  // Brand Primary Palette
  harissa: "#E8432A", // Primary red, punchy & energetic
  sun: "#FFC83D",     // Vibrant warm yellow
  ink: "#14110F",     // Deep near-black outline & text
  cream: "#FFF4E3",   // Warm paper-like background
  sky: "#8CC4FF",     // Soft blue accent (use sparingly)

  // Functional mappings
  background: "#FFF4E3",
  foreground: "#14110F",
  border: "#14110F",
} as const;

export const typography = {
  fonts: {
    heading: "'Unbounded', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  weights: {
    heading: {
      heavy: 800,
      black: 900,
    },
    body: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  letterSpacing: {
    tight: "-0.02em",
    normal: "0em",
    wide: "0.08em",
    widest: "0.15em",
  },
} as const;

export const shadows = {
  sticker: "6px 6px 0 #14110F",
  stickerSm: "4px 4px 0 #14110F",
  stickerLg: "8px 8px 0 #14110F",
  stickerNone: "none",
} as const;

export const borders = {
  thick: "3px solid #14110F",
  medium: "2px solid #14110F",
  thin: "1.5px solid #14110F",
} as const;

export const radii = {
  pill: "9999px",
  card: "24px",
  section: "32px",
  bubble: "28px",
} as const;

export const tokens = {
  colors,
  typography,
  shadows,
  borders,
  radii,
} as const;

export default tokens;
