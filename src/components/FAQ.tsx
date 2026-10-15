"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/data/products";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.h2
          className="heading-xl text-3xl sm:text-4xl md:text-5xl text-center mb-12 sm:mb-16"
          style={{ color: "var(--ink)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          FAQ
        </motion.h2>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{
                border: "3px solid var(--ink)",
                boxShadow:
                  openIndex === i
                    ? "6px 6px 0 var(--ink)"
                    : "4px 4px 0 var(--ink)",
                backgroundColor:
                  openIndex === i ? "var(--sun)" : "white",
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span
                  className="font-bold text-base sm:text-lg"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--ink)",
                  }}
                >
                  {item.question}
                </span>
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0"
                  style={{
                    backgroundColor:
                      openIndex === i ? "var(--ink)" : "var(--sun)",
                    borderColor: "var(--ink)",
                  }}
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={
                      openIndex === i ? "var(--sun)" : "var(--ink)"
                    }
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--ink)",
                        opacity: 0.8,
                      }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
