"use client";

import { useLanguage } from "@/context/LanguageContext";
import { DELIVERY_TIME } from "@/lib/pricing";

/** Objections + FAQ (guide modules 5.7 + 5.8). Accessible <details> accordion. */
export default function FAQ() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const items = isAr
    ? [
        { q: "الكافيين كل نهار، مشكل؟", a: "كاشية فيها 100 ملغ كافيين، يعني قدّ قهوة. كاشية في النهار، ما تزيدش على زوز. ممنوع على الصغار، المرا الحاملة ولا اللي ترضع، و اللي حساسين للكافيين." },
        { q: "نجّم نشربها مع القهوة؟", a: "خير لا: FOCUS يعوّض قهوة. ما تخلطوش مع برشا قهوة ولا مشروبات فيها كافيين." },
        { q: "الرقاد يتلخبط؟", a: "كيف القهوة: خوذها الصباح ولا قبل الخدمة/المراجعة، موش في الليل." },
        { q: "شكون يصنعها؟", a: "مصنوعة في مخبر تونسي. التركيبة كاملة مكتوبة على العلبة و على السيت بالملغ." },
        { q: "و كان الكوليه يوصل مكسّر؟", a: "كلّمنا في 48 ساعة على الواتساب مع تصويرة، و نبعثولك علبة أخرى." },
        { q: "التوصيل قدّاش و وقتاش؟", a: `لكل الولايات في ${DELIVERY_TIME.ar}. 7 DT، و مجاني من علبتين. تخلّص كي توصلك.` },
        { q: "علبة تكفي قدّاش؟", a: "30 كاشية = 30 يوم بكاشية في النهار." },
      ]
    : [
        { q: "Prendre de la caféine tous les jours, c'est sûr ?", a: "Une gélule contient 100 mg de caféine, l'équivalent d'un café. 1 gélule par jour, 2 maximum. Déconseillé aux enfants, aux femmes enceintes ou allaitantes et aux personnes sensibles à la caféine." },
        { q: "Je peux la prendre avec mon café ?", a: "Mieux vaut pas : FOCUS remplace un café. Évite de cumuler avec d'autres sources importantes de caféine." },
        { q: "Est-ce que ça peut gêner mon sommeil ?", a: "Comme un café : prends-la le matin ou avant ta session de travail, pas le soir." },
        { q: "Qui fabrique OMNIS ?", a: "Un laboratoire tunisien. La formule complète est indiquée en mg sur le flacon et sur ce site." },
        { q: "Et si mon colis arrive abîmé ?", a: "Écris-nous sur WhatsApp sous 48h avec une photo : on t'envoie un flacon de remplacement." },
        { q: "Délais et frais de livraison ?", a: `Partout en Tunisie en ${DELIVERY_TIME.fr}. 7 DT, offerte dès 2 flacons. Tu paies à la livraison.` },
        { q: "Un flacon dure combien de temps ?", a: "30 gélules = 30 jours, à raison d'une gélule par jour." },
      ];

  return (
    <section id="faq" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-3">{isAr ? "أسئلة" : "Questions"}</p>
        <h2 className="heading-xl text-3xl sm:text-5xl text-ink mb-8">
          {isAr ? "عندك سؤال؟ هاو الجواب." : "Tes questions, nos réponses."}
        </h2>
        <div className="divide-y divide-line border-y border-line">
          {items.map((it) => (
            <details key={it.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-lg font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun rounded">
                {it.q}
                <span className="shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center text-muted transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted leading-relaxed">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
