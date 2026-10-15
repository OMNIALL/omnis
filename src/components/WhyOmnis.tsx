"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "⚡",
    title: "INGRÉDIENTS ACTIFS DOSÉS",
    description:
      "Chaque pastille contient des doses précises et efficaces. Pas de poudre de perlimpinpin.",
    color: "var(--sun)",
    rotate: -2,
  },
  {
    icon: "🍬",
    title: "GOÛT POP",
    description:
      "On a bossé le goût pour que tu aies envie de la prendre. C'est bon, tout simplement.",
    color: "var(--harissa)",
    textColor: "var(--cream)",
    rotate: 1,
  },
  {
    icon: "📉",
    title: "SANS CRASH",
    description:
      "La L-Théanine lisse l'effet de la caféine. Tu montes en douceur, tu redescends tranquille.",
    color: "var(--sky)",
    rotate: -1,
  },
  {
    icon: "🇹🇳",
    title: "FABRIQUÉ EN TUNISIE",
    description:
      "De la formulation à l'emballage, tout est fait ici. On soutient le savoir-faire local.",
    color: "var(--cream)",
    rotate: 2,
  },
];

export default function WhyOmnis() {
  return (
    <section
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--ink)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h2
          className="heading-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-12 sm:mb-16"
          style={{ color: "var(--sun)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          TOUT-EN-UN.
          <br />
          ZÉRO BLABLA.
        </motion.h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="relative p-6 sm:p-8 rounded-3xl border-3 hover-wiggle"
              style={{
                backgroundColor: feature.color,
                border: "3px solid var(--ink)",
                boxShadow: "6px 6px 0 rgba(255,255,255,0.1)",
                transform: `rotate(${feature.rotate}deg)`,
                color: feature.textColor || "var(--ink)",
              }}
              initial={{ opacity: 0, y: 40, rotate: feature.rotate }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: feature.rotate,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                rotate: 0,
                scale: 1.03,
                boxShadow: "8px 8px 0 rgba(255,255,255,0.15)",
              }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3
                className="heading-lg text-base sm:text-lg mb-3"
                style={{ color: feature.textColor || "var(--ink)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{
                  opacity: 0.8,
                  fontFamily: "var(--font-body)",
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
