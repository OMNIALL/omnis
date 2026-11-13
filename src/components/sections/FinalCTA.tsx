"use client";

import Link from "next/link";
import Image from "next/image";
import { Banknote, Truck, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { orderHref } from "@/config/site";
import { DELIVERY_TIME } from "@/lib/pricing";

/** Closing CTA — repeats the promise and the one action. */
export default function FinalCTA() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto rounded-[28px] bg-ink text-cream overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col gap-6 justify-center">
          <p className="eyebrow" style={{ color: "var(--sun)" }}>{isAr ? "جاهز؟" : "Prêt ?"}</p>
          <h2 className="heading-xl text-3xl sm:text-5xl">
            {isAr ? "خلّي القهوة الثالثة. خذ كاشية." : "Laisse tomber le 3ème café. Prends une gélule."}
          </h2>
          <p className="text-lg" style={{ color: "rgba(255,244,227,0.78)" }}>
            {isAr
              ? "30 كاشية = 30 يوم. ابدا بعلبة وحدة، ولا خذ الروتين كامل و التوصيل مجاني."
              : "30 gélules = 30 jours. Commence avec un flacon, ou installe la routine avec la livraison offerte."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={orderHref(2)} className="btn-sticker btn-primary">
              {isAr ? "نكوموندي الپاك 60 يوم · 72 DT" : "Je prends le pack 60 jours · 72 DT"}
            </Link>
            <Link
              href={orderHref(1)}
              className="btn-sticker"
              style={{ borderColor: "rgba(255,244,227,0.35)", color: "var(--cream)" }}
            >
              {isAr ? "علبة وحدة · 39 DT" : "1 flacon · 39 DT"}
            </Link>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm" style={{ color: "rgba(255,244,227,0.78)" }}>
            <li className="flex items-center gap-1.5"><Banknote className="w-4 h-4" />{isAr ? "تخلّص كي توصلك" : "Paiement à la livraison"}</li>
            <li className="flex items-center gap-1.5"><Truck className="w-4 h-4" />{isAr ? `توصيل ${DELIVERY_TIME.ar}` : `Livraison ${DELIVERY_TIME.fr}`}</li>
            <li className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{isAr ? "مصنوع في تونس" : "Fabriqué en Tunisie"}</li>
          </ul>
        </div>
        <div className="relative min-h-[260px] lg:min-h-full">
          <Image
            src="/images/hand-bottle.webp"
            alt={isAr ? "علبة OMNIS FOCUS في اليد" : "Flacon OMNIS FOCUS en main"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
