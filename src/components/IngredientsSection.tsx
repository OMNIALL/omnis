"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, Leaf, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CompositionPanel from "./CompositionPanel";

export default function IngredientsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const steps = isAr
    ? [
        { Icon: Coffee, title: "كافيين طبيعي من الغوارانا", text: "100 ملغ، قدّ قهوة. هو اللي يعطيك الإينرجي." },
        { Icon: Leaf, title: "L-théanine", text: "180 ملغ، حاجة طبيعية موجودة في التاي. تخلّي الإينرجي تجي أنعم." },
        { Icon: Zap, title: "فيتامين B6 و B12", text: "يساهمو في نقص التعب و في الخدمة العادية للجهاز العصبي." },
      ]
    : [
        { Icon: Coffee, title: "Caféine naturelle de guarana", text: "100 mg, l'équivalent d'un café. C'est elle qui apporte l'énergie." },
        { Icon: Leaf, title: "L-théanine", text: "180 mg, présente naturellement dans le thé. Elle accompagne la caféine pour une énergie plus douce." },
        { Icon: Zap, title: "Vitamines B6 et B12", text: "Contribuent à réduire la fatigue et au fonctionnement normal du système nerveux." },
      ];

  return (
    <section id="ingredients" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <p className="eyebrow mb-3">{isAr ? "الفورمولة" : "La formule"}</p>
          <motion.h2
            className="heading-xl text-3xl sm:text-5xl text-ink mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {isAr ? "ثلاثة مكوّنات. حتى حاجة مخبّية." : "Trois actifs. Rien de caché."}
          </motion.h2>
          <p className="text-muted text-lg mb-10 max-w-md">
            {isAr
              ? "الكافيين يفيّقك، و الـ L-théanine تخلّيه رايق. النتيجة: تركيز صافي من غير ما تولّي نيرفي."
              : "La caféine réveille, la L-théanine l'adoucit. Résultat : un focus calme, sans le côté nerveux d'un excès de café."}
          </p>
          <ol className="space-y-6">
            {steps.map(({ Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <span className="shrink-0 w-11 h-11 rounded-full border border-line bg-paper flex items-center justify-center">
                  <Icon className="w-5 h-5 text-harissa" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-semibold text-ink">
                    <span className="text-muted tabular-nums me-2">0{i + 1}</span>
                    {title}
                  </p>
                  <p className="text-sm text-muted mt-1 leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-5">
          <div className="relative aspect-[3/2] rounded-[20px] overflow-hidden bg-paper">
            <Image
              src="/images/focus-ingredients.webp"
              alt={isAr ? "الغوارانا، أوراق التاي و كاشيات OMNIS FOCUS" : "Guarana, feuilles de thé et gélules OMNIS FOCUS"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <CompositionPanel />
        </div>
      </div>
    </section>
  );
}
