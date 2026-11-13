"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Smartphone, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ORDER_HREF } from "@/config/site";
import { DELIVERY_TIME } from "@/lib/pricing";

/** How it works — 3 simple steps so ordering feels easy and risk-free. */
export default function HowItWorks() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const steps = isAr
    ? [
        { Icon: Package, title: "اختار الپاك", text: "علبة، زوز ولا ثلاثة. من علبتين التوصيل مجاني." },
        { Icon: Smartphone, title: "كوموندي في 30 ثانية", text: "اسمك، تليفونك، عنوانك. ما تخلّص حتى شي توّا." },
        { Icon: Truck, title: "استلم و خلّص", text: `الليفرور يكلّمك و يوصلك في ${DELIVERY_TIME.ar}. تخلّص كي تستلم.` },
      ]
    : [
        { Icon: Package, title: "Choisis ton pack", text: "1, 2 ou 3 flacons. Livraison offerte dès 2 flacons." },
        { Icon: Smartphone, title: "Commande en 30 secondes", text: "Nom, téléphone, adresse. Rien à payer en ligne." },
        { Icon: Truck, title: "Reçois et paie", text: `Le livreur t'appelle et te livre en ${DELIVERY_TIME.fr}. Tu paies à la réception.` },
      ];

  return (
    <section id="comment-ca-marche" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <p className="eyebrow mb-3">{isAr ? "كيفاش تكوموندي" : "Comment ça marche"}</p>
          <h2 className="heading-xl text-3xl sm:text-5xl text-ink">
            {isAr ? "ثلاثة خطوات. بلاش مخاطرة." : "Trois étapes. Zéro risque."}
          </h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ Icon, title, text }, i) => (
            <motion.li
              key={title}
              className="border-t border-ink pt-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-full bg-ink text-cream flex items-center justify-center font-semibold tabular-nums">
                  {i + 1}
                </span>
                <Icon className="w-5 h-5 text-harissa" strokeWidth={1.75} />
              </div>
              <p className="heading-lg text-xl text-ink mb-1.5">{title}</p>
              <p className="text-muted">{text}</p>
            </motion.li>
          ))}
        </ol>
        <div className="mt-10">
          <Link href={ORDER_HREF} className="btn-sticker btn-primary">
            {isAr ? "نبدا: نختار الپاك" : "Je choisis mon pack"}
          </Link>
        </div>
      </div>
    </section>
  );
}
