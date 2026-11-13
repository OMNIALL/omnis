"use client";

import { motion } from "framer-motion";
import { FlaskConical, Leaf, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BrandStory() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const values = isAr
    ? [
        { Icon: MapPin, label: "مصنوع في تونس" },
        { Icon: FlaskConical, label: "جرعات مضبوطة" },
        { Icon: Leaf, label: "كاشية نباتية" },
      ]
    : [
        { Icon: MapPin, label: "Fabriqué en Tunisie" },
        { Icon: FlaskConical, label: "Doses précises" },
        { Icon: Leaf, label: "Gélule végétale" },
      ];

  return (
    <section id="histoire" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Brand mark */}
        <motion.div
          className="rounded-[28px] bg-harissa text-cream p-10 sm:p-14 min-h-[300px] flex flex-col justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2" dir="ltr">
            <span className="font-display-keep text-5xl sm:text-7xl font-black tracking-tight">OMNI</span>
            <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-sun border-[3px] border-ink flex items-center justify-center">
              <span className="font-display-keep text-2xl sm:text-3xl font-black text-ink">S</span>
            </span>
          </div>
          <dl className="grid grid-cols-2 gap-6 mt-10 text-sm" dir="ltr">
            <div>
              <dt className="font-display-keep font-black text-xl">OMNI</dt>
              <dd className="opacity-85">{isAr ? "الكل" : "tout, en latin"}</dd>
            </div>
            <div>
              <dt className="font-display-keep font-black text-xl">S</dt>
              <dd className="opacity-85">{isAr ? "مكمّل غذائي" : "supplément"}</dd>
            </div>
          </dl>
        </motion.div>

        {/* Story */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="eyebrow mb-3">{isAr ? "قصّتنا" : "Notre histoire"}</p>
          <h2 className="heading-xl text-3xl sm:text-5xl text-ink mb-6">
            {isAr ? "كل اللي تحتاجو، في كاشية وحدة." : "Tout ce qu'il te faut, dans une seule gélule."}
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            {isAr ? (
              <>
                <p>في تونس، المكمّلات يا مستوردة و غالية، يا مكتوب عليها برشا و ما تفهم فيها شي. من حقّك تعرف شنوّة تاخو.</p>
                <p>حبّينا حاجة بسيطة: تركيبة واضحة، جرعات مكتوبة بالملغ، مصنوعة في مخبر تونسي، و توصلك لدارك.</p>
              </>
            ) : (
              <>
                <p>
                  En Tunisie, les compléments sont souvent importés, chers, et impossibles à déchiffrer.
                  Tu mérites de savoir exactement ce que tu prends.
                </p>
                <p>
                  OMNIS, c&apos;est une formule courte, des doses affichées en mg, une fabrication par un
                  laboratoire tunisien, et une livraison jusqu&apos;à ta porte, payée à la réception.
                </p>
              </>
            )}
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 mt-8">
            {values.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Icon className="w-4 h-4 text-harissa" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
