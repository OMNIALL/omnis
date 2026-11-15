/**
 * The offer around the product (marketing/offer-positioning-plan.md).
 * Each element has an on/off flag — turn one off and it disappears from every page that shows it.
 * Commercial promises only: nothing here is a health claim.
 */

/** « Teste le premier flacon. Pas convaincu ? Renvoie le second, encore scellé : on te le rembourse. » */
export const GUARANTEE_ACTIVE = true;
export const GUARANTEE_DAYS = 15;

export const GUARANTEE = {
  short: { fr: "Garantie flacon scellé", ar: "ضمان العلبة المسكّرة" },
  line: {
    fr: "Teste le premier flacon. Pas convaincu ? Renvoie le second, encore scellé : on te le rembourse.",
    ar: "جرّب العلبة الأولى. ما عجبتكش؟ رجّعلنا الثانية مسكّرة، و نرجّعولك فلوسها.",
  },
  /** For places where a single bottle may be in the buyer's mind (hero, how it works). */
  packLine: {
    fr: "Packs 2 et 3 : teste le premier flacon. Pas convaincu ? On te rembourse le second, encore scellé.",
    ar: "في پاك 2 و 3: جرّب العلبة الأولى. ما عجبتكش؟ نرجّعولك فلوس الثانية المسكّرة.",
  },
  terms: {
    fr: `Valable sur la première commande d'un pack de 2 ou 3 flacons, une fois par numéro de téléphone, dans les ${GUARANTEE_DAYS} jours suivant la livraison. Le flacon renvoyé doit être scellé. Remboursement par D17 ou virement.`,
    ar: `صالحة على أوّل كوموند متاع پاك 2 ولا 3 علب، مرّة وحدة لكل نومرو تليفون، في ${GUARANTEE_DAYS} يوم بعد التوصيل. العلبة اللي ترجّعها لازم تكون مسكّرة. نرجّعو الفلوس بـ D17 ولا ڤيرمون.`,
  },
} as const;

/** Free « Protocole Focus 30 jours » guide (marketing/protocole-focus-30-jours.md), sent on WhatsApp after delivery. */
export const GUIDE_ACTIVE = true;

export const GUIDE = {
  short: { fr: "Guide « Protocole Focus 30 jours » offert", ar: "ڤيد « 30 يوم فوكوس » هدية" },
  line: {
    fr: "Quand la prendre, ton budget caféine, le piège de 14h, la routine semaine d'examens. Envoyé sur WhatsApp après la livraison.",
    ar: "وقتاش تاخوها، قدّاش كافيين في النهار، فخ الوحدة و نص، و روتين جمعة الامتحانات. يوصلك على الواتساب بعد التوصيل.",
  },
  /** Chapter titles shown in the buy box — must match marketing/protocole-focus-30-jours.md. */
  chapters: {
    fr: ["Comment et quand la prendre", "Ton budget caféine", "Le piège de 14h", "Ta journée type", "La semaine d'examens", "Ton suivi 30 jours"],
    ar: ["كيفاش و وقتاش تاخوها", "قدّاش كافيين في النهار", "فخ الوحدة و نص", "نهارك", "جمعة الامتحانات", "30 يوم"],
  },
} as const;
