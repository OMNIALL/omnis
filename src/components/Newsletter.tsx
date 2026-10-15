"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export default function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--sun)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="heading-xl text-3xl sm:text-4xl md:text-5xl mb-4"
          style={{ color: "var(--ink)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.newsletterTitle}
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg mb-8 opacity-70"
          style={{ color: "var(--ink)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {t.newsletterSubtitle}
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletterPlaceholder}
            required
            className="flex-1 px-5 py-3.5 rounded-full text-base font-medium focus:outline-none focus:ring-2 focus:ring-harissa"
            style={{
              border: "3px solid var(--ink)",
              backgroundColor: "var(--cream)",
              color: "var(--ink)",
              fontFamily: "var(--font-body)",
            }}
          />
          <button
            type="submit"
            className="px-8 py-3.5 rounded-full font-bold text-base uppercase tracking-wider transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]"
            style={{
              backgroundColor: "var(--ink)",
              color: "var(--sun)",
              border: "3px solid var(--ink)",
              boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
              fontFamily: "var(--font-body)",
            }}
          >
            {submitted ? t.newsletterSuccess : t.newsletterBtn}
          </button>
        </motion.form>

        {submitted && (
          <motion.p
            className="mt-4 font-bold text-sm"
            style={{ color: "var(--ink)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Bienvenue dans le club ! 🎉
          </motion.p>
        )}
      </div>
    </section>
  );
}
