"use client";

import { motion } from "framer-motion";
import StickerCircle from "./StickerCircle";
import IngredientPill from "./IngredientPill";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <div
        className="relative overflow-hidden w-full max-w-7xl mx-auto"
        style={{
          backgroundColor: "var(--harissa)",
          borderRadius: "32px",
          border: "3px solid var(--ink)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-10 lg:p-16 relative z-10">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center gap-6 sm:gap-8">
            <motion.h1
              className="heading-xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ color: "var(--cream)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {t.heroHeadline1}{" "}
              <br className="hidden sm:block" />
              <span style={{ color: "var(--sun)" }}>{t.heroHeadlineHighlight}</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg max-w-md"
              style={{
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                opacity: 0.9,
                lineHeight: 1.6,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.heroSubtitle}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#produits" className="btn-sticker btn-primary">
                {t.btnOrder}
              </a>
              <a href="#ingredients" className="btn-sticker btn-outline">
                {t.btnDiscover}
              </a>
            </motion.div>

            {/* Ingredient Pills */}
            <motion.div
              className="flex flex-wrap gap-2 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <IngredientPill
                name="L-THÉANINE"
                dosage="180 MG"
                color="var(--sun)"
              />
              <IngredientPill
                name="CAFÉINE"
                dosage="80 MG"
                color="var(--cream)"
              />
            </motion.div>

            {/* Caption */}
            <motion.p
              className="label-sm mt-1"
              style={{
                color: "var(--cream)",
                opacity: 0.6,
                fontSize: "0.65rem",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8 }}
            >
              {t.heroCaption}
            </motion.p>
          </div>

          {/* Right: Sticker Composition */}
          <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
            {/* Large yellow "FOCUS" circle */}
            <motion.div
              className="absolute"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <StickerCircle
                size={220}
                color="var(--sun)"
                shadow={true}
                innerRing={true}
                delay={0.3}
              >
                <span
                  className="heading-xl text-3xl sm:text-4xl"
                  style={{ color: "var(--ink)" }}
                >
                  FOCUS
                </span>
              </StickerCircle>
            </motion.div>

            {/* Cream circle */}
            <motion.div
              className="absolute"
              style={{ top: "5%", right: "10%" }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <StickerCircle
                size={100}
                color="var(--cream)"
                shadow={true}
                innerRing={true}
                rotate={-3}
                delay={0.5}
              />
            </motion.div>

            {/* Black circle with yellow S */}
            <motion.div
              className="absolute"
              style={{ bottom: "10%", right: "5%" }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <StickerCircle
                size={80}
                color="var(--ink)"
                borderColor="var(--ink)"
                shadow={false}
                innerRing={true}
                rotate={3}
                delay={0.7}
              >
                <span
                  className="heading-xl text-2xl"
                  style={{ color: "var(--sun)" }}
                >
                  S
                </span>
              </StickerCircle>
            </motion.div>

            {/* Extra small cream circle */}
            <motion.div
              className="absolute hidden sm:block"
              style={{ top: "25%", left: "5%" }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <StickerCircle
                size={60}
                color="var(--cream)"
                shadow={true}
                innerRing={false}
                rotate={-2}
                delay={0.9}
              />
            </motion.div>

            {/* Extra yellow small circle */}
            <motion.div
              className="absolute hidden md:block"
              style={{ bottom: "20%", left: "10%" }}
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <StickerCircle
                size={50}
                color="var(--sun)"
                shadow={true}
                innerRing={false}
                rotate={2}
                delay={1.1}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
