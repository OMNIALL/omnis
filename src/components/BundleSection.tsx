"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FOCUS_BUNDLES, FOCUS_UNIT_PRICE } from "@/lib/pricing";
import Image from "next/image";
import { orderHref } from "@/config/site";

const PACK_IMAGES: Record<1 | 2 | 3, string> = {
  1: "/images/focus-bottle.webp",
  2: "/images/bundle-2.webp",
  3: "/images/bundle-3.webp",
};

/** Home "Pack & économise" block — links into the product page with the pack pre-selected. */
export default function BundleSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const copy = {
    1: isAr ? { name: "التجربة", days: "30 يوم" } : { name: "Découverte", days: "30 jours" },
    2: isAr ? { name: "الروتين", days: "60 يوم" } : { name: "Routine", days: "60 jours" },
    3: isAr ? { name: "الفصل الكامل", days: "90 يوم" } : { name: "Trimestre", days: "90 jours" },
  } as const;

  return (
    <section id="produits" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <p className="eyebrow mb-3">{isAr ? "الپاكات" : "Pack & économise"}</p>
          <h2 className="heading-xl text-3xl sm:text-5xl text-ink">
            {isAr ? "خذ روتين كامل، و وفّر." : "Installe la routine. Économise au passage."}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FOCUS_BUNDLES.map((b) => {
            const featured = b.qty === 2;
            const saving = FOCUS_UNIT_PRICE * b.qty - b.price;
            return (
              <Link
                key={b.qty}
                href={orderHref(b.qty)}
                className={`group card p-6 flex flex-col gap-4 transition-transform hover:-translate-y-0.5 ${
                  featured ? "ring-2 ring-ink" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="label-sm text-muted">{copy[b.qty].name}</p>
                  {b.tag && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-ink text-cream">
                      {isAr ? b.tag.ar : b.tag.fr}
                    </span>
                  )}
                </div>
                <div className="relative aspect-square rounded-[14px] overflow-hidden bg-cream">
                  <Image
                    src={PACK_IMAGES[b.qty]}
                    alt={isAr ? `${b.qty} علب OMNIS FOCUS` : `${b.qty} flacon${b.qty > 1 ? "s" : ""} OMNIS FOCUS`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="heading-lg text-2xl text-ink">
                    {b.qty} {isAr ? (b.qty === 1 ? "علبة" : "علب") : b.qty === 1 ? "flacon" : "flacons"} · {copy[b.qty].days}
                  </p>
                  <p className="mt-1 flex items-baseline gap-2">
                    <span className="heading-lg text-3xl text-ink tabular-nums">{b.price} DT</span>
                    {saving > 0 && <s className="text-muted tabular-nums">{FOCUS_UNIT_PRICE * b.qty} DT</s>}
                  </p>
                </div>
                <ul className="space-y-1.5 text-sm text-ink">
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-harissa mt-0.5" />
                    {b.qty >= 2 ? (isAr ? "التوصيل مجاني" : "Livraison offerte") : isAr ? "توصيل 7 DT" : "Livraison 7 DT"}
                  </li>
                  {saving > 0 && (
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-harissa mt-0.5" />
                      {isAr ? `توفّر ${saving} DT` : `${saving} DT d'économie`}
                    </li>
                  )}
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-harissa mt-0.5" />
                    {isAr ? "تخلّص كي توصلك" : "Paiement à la livraison"}
                  </li>
                </ul>
                <span className={`btn-sticker mt-auto ${featured ? "btn-primary" : "btn-secondary"}`}>
                  {isAr ? `نختار ${copy[b.qty].days}` : `Je prends ${copy[b.qty].days}`}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
