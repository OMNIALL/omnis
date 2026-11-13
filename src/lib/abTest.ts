/**
 * Hero headline A/B test (Landing Page Masterclass, module 11).
 *
 * How it works — no flicker, page stays static:
 *  - An inline script in <head> (AB_BOOT_SCRIPT) picks the variant once per visitor (50/50),
 *    stores it in localStorage, and sets <html data-hero="A|B"> before the page paints.
 *  - The hero renders BOTH headlines; CSS shows only the one matching data-hero.
 *  - The variant is sent with every order and every pixel event.
 *
 * Turn it on by setting HERO_AB_ACTIVE = true (variant B copy lives in Hero.tsx).
 * Rule of thumb: wait for ~100 orders per variant before deciding (see marketing/weekly-review.md).
 */
export const HERO_AB_ACTIVE = false;
export const AB_STORAGE_KEY = "omnis_ab_hero";
export type HeroVariant = "A" | "B";

export const AB_BOOT_SCRIPT = `(function(){try{var on=${HERO_AB_ACTIVE};var k='${AB_STORAGE_KEY}';var v=on?localStorage.getItem(k):'A';if(on&&v!=='A'&&v!=='B'){v=Math.random()<0.5?'A':'B';localStorage.setItem(k,v);}document.documentElement.setAttribute('data-hero',v||'A');}catch(e){document.documentElement.setAttribute('data-hero','A');}})();`;

/** Current visitor's variant ("A" when the test is off or storage is blocked). */
export function getHeroVariant(): HeroVariant {
  if (typeof document === "undefined") return "A";
  return document.documentElement.getAttribute("data-hero") === "B" ? "B" : "A";
}
