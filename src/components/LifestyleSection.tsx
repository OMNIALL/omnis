"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

/** Three real-life moments (révisions · bureau · sport) — photography-led, Neuro-style. */
export default function LifestyleSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const moments = isAr
    ? [
        { src: "/images/lifestyle-study.webp", w: 1458, h: 1800, title: "المراجعة", text: "تقعد مركّز على الدروس، من غير 3 قهاوي." },
        { src: "/images/lifestyle-office.webp", w: 1800, h: 1005, title: "الخدمة", text: "الرينيونات و الـ deadlines، من غير طيحة الوحدة و نص." },
        // lifestyle-gym is pulled until its label is fixed (wrong dosages in the AI image).
        { src: "/images/hand-bottle.webp", w: 1458, h: 1800, title: "وين ما مشيت", text: "صغيرة في الساك، كاشية وحدة في النهار." },
      ]
    : [
        { src: "/images/lifestyle-study.webp", w: 1458, h: 1800, title: "Révisions", text: "Rester concentré sur tes cours, sans enchaîner les cafés." },
        { src: "/images/lifestyle-office.webp", w: 1800, h: 1005, title: "Travail", text: "Réunions et deadlines, sans le coup de barre de 14h." },
        // lifestyle-gym is pulled until its label is fixed (wrong dosages in the AI image).
        { src: "/images/hand-bottle.webp", w: 1458, h: 1800, title: "Partout avec toi", text: "Un flacon dans le sac, une gélule par jour." },
      ];

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <p className="eyebrow mb-3">{isAr ? "في نهارك" : "Au quotidien"}</p>
          <h2 className="heading-xl text-3xl sm:text-5xl text-ink">
            {isAr ? "كاشية وحدة، لكل اللي قدّامك." : "Une gélule, pour tout ce qui t'attend."}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {moments.map((m, i) => (
            <motion.figure
              key={m.src}
              className="group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-paper">
                <Image
                  src={m.src}
                  alt={`OMNIS FOCUS — ${m.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-4">
                <p className="heading-lg text-xl text-ink">{m.title}</p>
                <p className="text-muted mt-1">{m.text}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
