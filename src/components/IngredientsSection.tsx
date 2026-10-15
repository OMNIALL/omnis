"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { focusProduct } from "@/data/products";
import StickerCircle from "./StickerCircle";

export default function IngredientsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ingredients = focusProduct.ingredients;

  return (
    <section
      id="ingredients"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="heading-xl text-3xl sm:text-4xl md:text-5xl mb-4"
            style={{ color: "var(--ink)" }}
          >
            CE QU&apos;IL Y A DEDANS
          </h2>
          <p className="text-base sm:text-lg max-w-lg mx-auto opacity-60">
            Clique sur un ingrédient pour en savoir plus.
          </p>
        </motion.div>

        {/* Interactive Circles */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
          {ingredients.map((ing, i) => (
            <motion.button
              key={ing.name}
              onClick={() =>
                setActiveIndex(activeIndex === i ? null : i)
              }
              className="flex flex-col items-center gap-3 group"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
            >
              <StickerCircle
                size={100}
                color={ing.color}
                shadow={activeIndex === i}
                innerRing={true}
                animate={false}
                rotate={activeIndex === i ? 0 : (i % 2 === 0 ? -3 : 3)}
                className={`transition-all duration-200 ${
                  activeIndex === i ? "ring-4 ring-harissa" : ""
                }`}
              >
                <span
                  className="heading-lg text-[0.6rem] sm:text-xs text-center leading-tight px-2"
                  style={{ color: "var(--ink)" }}
                >
                  {ing.name.split(" ")[0]}
                </span>
              </StickerCircle>
              <span
                className="label-sm text-center"
                style={{
                  fontSize: "0.6rem",
                  color:
                    activeIndex === i ? "var(--harissa)" : "var(--ink)",
                  opacity: activeIndex === i ? 1 : 0.5,
                }}
              >
                {ing.dosage}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Detail Card */}
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl"
              style={{
                backgroundColor: ingredients[activeIndex].color,
                border: "3px solid var(--ink)",
                boxShadow: "6px 6px 0 var(--ink)",
              }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-start gap-4">
                <StickerCircle
                  size={60}
                  color="var(--ink)"
                  shadow={false}
                  innerRing={false}
                  animate={false}
                >
                  <span
                    className="text-lg"
                    style={{ color: ingredients[activeIndex].color }}
                  >
                    {activeIndex === 0
                      ? "🍵"
                      : activeIndex === 1
                      ? "☕"
                      : "💊"}
                  </span>
                </StickerCircle>
                <div className="flex-1">
                  <h3
                    className="heading-lg text-lg sm:text-xl mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {ingredients[activeIndex].name}{" "}
                    <span className="opacity-50 text-sm">
                      {ingredients[activeIndex].dosage}
                    </span>
                  </h3>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{
                      color: "var(--ink)",
                      opacity: 0.8,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {ingredients[activeIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
