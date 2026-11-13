"use client";

import { motion } from "framer-motion";
import { Target, Sun, BatteryCharging, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/** Benefits — outcome-led ("so that…"), not features. Claims kept within the brand rulebook. */
export default function WhyOmnis() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const benefits = isAr
    ? [
        { Icon: Target, title: "تقعد مركّز، موش نيرفي", text: "الكافيين يفيّقك و الـ L-théanine تخلّي الإينرجي رايقة، باش تكمّل اللي بديتو." },
        { Icon: Sun, title: "العشية تولّي عادية", text: "إينرجي أنعم من القهوة وحدها، باش الوحدة و نص ما تطيّحكش." },
        { Icon: BatteryCharging, title: "أقل تعب", text: "فيتامين B6 و B12 يساهمو في نقص التعب." },
        { Icon: Clock, title: "روتين في 5 ثواني", text: "كاشية مع كاس ما. ما فمّا ما تحضّر، ما فمّا ما تشري كل نهار." },
      ]
    : [
        { Icon: Target, title: "Concentré, pas nerveux", text: "La caféine réveille, la L-théanine l'adoucit — pour aller au bout de ce que tu as commencé." },
        { Icon: Sun, title: "Des après-midi qui tiennent", text: "Une énergie plus régulière que le café seul, pour que 14h ne soit plus un mur." },
        { Icon: BatteryCharging, title: "Moins de fatigue", text: "Les vitamines B6 et B12 contribuent à réduire la fatigue." },
        { Icon: Clock, title: "Une routine de 5 secondes", text: "Une gélule, un verre d'eau. Rien à préparer, rien à acheter chaque jour." },
      ];

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ink text-cream">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow mb-3" style={{ color: "var(--sun)" }}>{isAr ? "شنوّة تربح" : "Ce que tu y gagnes"}</p>
          <motion.h2
            className="heading-xl text-3xl sm:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {isAr ? "نهار كامل، بنفس التركيز." : "Toute ta journée, avec le même focus."}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {benefits.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              className="p-6 sm:p-8 bg-ink"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Icon className="w-6 h-6 mb-5" style={{ color: "var(--sun)" }} strokeWidth={1.5} />
              <h3 className="heading-lg text-xl mb-2">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,244,227,0.75)" }}>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
