"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Illustrative energy curve: coffee alone (spike → crash) vs caffeine + L-théanine (smoother).
 * Labeled as an illustration — not data.
 */
export default function EnergyCurve({ compact = false }: { compact?: boolean }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section className={compact ? "" : "w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ink text-cream"}>
      <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${compact ? "" : ""}`}>
        <div>
          <p className="eyebrow mb-3" style={{ color: compact ? undefined : "var(--sun)" }}>
            {isAr ? "الفرق" : "La différence"}
          </p>
          <h2 className={`heading-xl text-3xl sm:text-5xl mb-4 ${compact ? "text-ink" : ""}`}>
            {isAr ? "إينرجي تطلع بالشوية… و ما تطيحش." : "Une énergie qui monte en douceur. Et qui ne s'effondre pas."}
          </h2>
          <p className={`text-lg max-w-md ${compact ? "text-muted" : ""}`} style={compact ? undefined : { color: "rgba(255,244,227,0.75)" }}>
            {isAr
              ? "القهوة وحدها تطلّعك فيسع و تطيّحك فيسع. مع الـ L-théanine، الكافيين يتصرّف بطريقة أنعم: لا نيرفي، لا طيحة متاع العشية."
              : "Le café seul fait monter vite et redescendre d'un coup. Associée à la L-théanine, la caféine se ressent de façon plus régulière : moins de nervosité, pas de coup de barre."}
          </p>
        </div>

        <figure className={`rounded-[24px] p-5 sm:p-7 ${compact ? "card" : ""}`} style={compact ? undefined : { background: "rgba(255,244,227,0.06)", border: "1px solid rgba(255,244,227,0.14)" }}>
          <svg viewBox="0 0 400 220" className="w-full h-auto" role="img" aria-label={isAr ? "رسم توضيحي للإينرجي" : "Illustration de la courbe d'énergie"}>
            {/* axes */}
            <line x1="30" y1="190" x2="390" y2="190" stroke="currentColor" strokeOpacity="0.25" />
            <line x1="30" y1="20" x2="30" y2="190" stroke="currentColor" strokeOpacity="0.25" />
            {/* coffee alone: spike & crash */}
            <motion.path
              d="M30 175 C 70 170, 85 40, 115 35 C 145 32, 150 120, 185 165 C 205 188, 225 182, 250 150 C 270 125, 285 60, 305 62 C 330 65, 340 170, 390 182"
              fill="none"
              stroke="#E8432A"
              strokeWidth="3"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4 }}
            />
            {/* FOCUS: smoother */}
            <motion.path
              d="M30 175 C 80 150, 110 85, 160 78 C 220 70, 300 80, 350 105 C 370 115, 380 125, 390 132"
              fill="none"
              stroke={compact ? "#14110F" : "#FFC83D"}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.3 }}
            />
            <text x="38" y="208" fontSize="11" fill="currentColor" fillOpacity="0.6">{isAr ? "الصباح" : "Matin"}</text>
            <text x="190" y="208" fontSize="11" fill="currentColor" fillOpacity="0.6">{isAr ? "14:00" : "14h"}</text>
            <text x="350" y="208" fontSize="11" fill="currentColor" fillOpacity="0.6">{isAr ? "العشية" : "Soir"}</text>
          </svg>
          <figcaption className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-6 border-t-[3px] border-dashed" style={{ borderColor: "#E8432A" }} />
              {isAr ? "قهوة وحدها" : "Café seul"}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 border-t-4 rounded" style={{ borderColor: compact ? "#14110F" : "#FFC83D" }} />
              {isAr ? "كافيين + L-théanine" : "Caféine + L-théanine"}
            </span>
            <span className="opacity-60 text-xs ms-auto">{isAr ? "رسم توضيحي" : "Illustration"}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
