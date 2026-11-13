"use client";

/*
 * Hero headline variants (pick one, or A/B test — see marketing/copy-variants.md):
 *  A (current, outcome):  « L'énergie d'un café. Sans le crash. »
 *  B (problem-led):       « Ton 3ème café ne marche plus ? Passe à une gélule. »
 *  C (ease):              « Une gélule le matin. Concentré jusqu'au soir. »
 *  D (local trust):       « Le focus, fabriqué en Tunisie. »
 */

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Banknote, Truck, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DELIVERY_TIME } from "@/lib/pricing";
import { ORDER_HREF } from "@/config/site";

export default function Hero() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const trust = isAr
    ? [
        { Icon: MapPin, label: "مصنوع في تونس" },
        { Icon: Banknote, label: "تخلّص كي توصلك" },
        { Icon: Truck, label: `توصيل ${DELIVERY_TIME.ar}` },
      ]
    : [
        { Icon: MapPin, label: "Fabriqué en Tunisie" },
        { Icon: Banknote, label: "Paiement à la livraison" },
        { Icon: Truck, label: `Livraison ${DELIVERY_TIME.fr}` },
      ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-10">
      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        {/* Copy — first on every screen size so the CTA is above the fold on phones */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {isAr ? "100 ملغ كافيين طبيعي · 180 ملغ L-théanine" : "100 mg caféine naturelle · 180 mg L-théanine"}
          </motion.p>

          <motion.h1
            className="heading-xl text-[2.35rem] leading-[1.04] sm:text-6xl lg:text-7xl text-ink"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* A/B: both variants render; CSS shows the one in <html data-hero> (src/lib/abTest.ts) */}
            <span className="hero-a">
              {isAr ? (
                <>الإينرجي متاع قهوة. <span className="text-harissa">من غير الطيحة.</span></>
              ) : (
                <>L&apos;énergie d&apos;un café. <span className="text-harissa italic">Sans le crash.</span></>
              )}
            </span>
            <span className="hero-b">
              {isAr ? (
                <>ثالث قهوة ما عادش تنفع؟ <span className="text-harissa">بدّلها بكاشية.</span></>
              ) : (
                <>Ton 3ème café ne marche plus ? <span className="text-harissa italic">Passe à une gélule.</span></>
              )}
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-muted max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {isAr
              ? "كاشية وحدة في النهار باش تقعد مركّز في المراجعة، الخدمة و السبور، من غير ما تولّي نيرفي."
              : "Une gélule par jour pour rester concentré en révisions, au travail ou au sport, sans la nervosité d'un café de trop."}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href={ORDER_HREF} className="btn-sticker btn-primary">
              {isAr ? "كوموندي · 39 DT" : "Je commande · 39 DT"}
            </Link>
            <a href="#comment-ca-marche" className="btn-sticker btn-outline hidden sm:inline-flex">
              {isAr ? "كيفاش يخدم؟" : "Comment ça marche"}
            </a>
          </motion.div>

          {/* Trust strip, directly under the CTA */}
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted">
            {trust.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-ink" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Product visual — short on phones, tall on desktop */}
        <motion.div
          className="relative rounded-[28px] bg-paper border border-line overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[520px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/focus-bottle.webp"
            alt={isAr ? "علبة OMNIS FOCUS، 30 كاشية نباتية" : "Flacon OMNIS FOCUS, 30 gélules végétales"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 start-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-ink">
              {isAr ? "التوصيل مجاني من علبتين" : "Livraison offerte dès 2 flacons"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
