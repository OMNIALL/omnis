"use client";

import { useLanguage } from "@/context/LanguageContext";

/** Label-style composition table ("Supplement facts") — the credible way to show the formula. */
export default function CompositionPanel({ className = "" }: { className?: string }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const rows = isAr
    ? [
        ["L-théanine", "180 ملغ", "—"],
        ["كافيين طبيعي (مستخلص الغوارانا)", "100 ملغ", "—"],
        ["فيتامين B6", "1,4 ملغ", "100%"],
        ["فيتامين B12", "2,5 ميكروغرام", "100%"],
      ]
    : [
        ["L-théanine", "180 mg", "—"],
        ["Caféine naturelle (extrait de guarana)", "100 mg", "—"],
        ["Vitamine B6", "1,4 mg", "100 %"],
        ["Vitamine B12", "2,5 µg", "100 %"],
      ];

  return (
    <div className={`card p-6 sm:p-8 ${className}`}>
      <div className="flex items-baseline justify-between border-b-4 border-ink pb-3 mb-1">
        <h3 className="heading-lg text-2xl text-ink">{isAr ? "التركيبة" : "Composition"}</h3>
        <span className="text-sm font-semibold text-muted">{isAr ? "لكل كاشية" : "Pour 1 gélule"}</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink/70 text-muted">
            <th className="text-start font-semibold py-2">{isAr ? "المكوّن الفعّال" : "Actif"}</th>
            <th className="text-end font-semibold py-2">{isAr ? "الكمية" : "Quantité"}</th>
            <th className="text-end font-semibold py-2 w-16">{isAr ? "VNR*" : "%VNR*"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, qty, vnr]) => (
            <tr key={name} className="border-b border-line">
              <td className="py-3 font-semibold text-ink">{name}</td>
              <td className="py-3 text-end tabular-nums text-ink" dir="ltr">{qty}</td>
              <td className="py-3 text-end tabular-nums text-muted">{vnr}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 space-y-1.5 text-xs leading-relaxed text-muted">
        <p>
          {isAr
            ? "* VNR: القيم الغذائية المرجعية. — : ما فمّاش قيمة مرجعية."
            : "* VNR : valeurs nutritionnelles de référence. — : pas de VNR établie."}
        </p>
        <p>
          {isAr
            ? "كاشية وحدة في النهار مع كاس ما، ما تزيدش على زوز. ممنوع على الصغار، المرا الحاملة ولا اللي ترضع، و اللي حساسين للكافيين. المكمّل الغذائي ما يعوّضش الماكلة المتوازنة."
            : "1 gélule par jour avec un verre d'eau, 2 maximum. Déconseillé aux enfants, aux femmes enceintes ou allaitantes et aux personnes sensibles à la caféine. Un complément alimentaire ne remplace pas une alimentation variée et équilibrée."}
        </p>
      </div>
    </div>
  );
}
