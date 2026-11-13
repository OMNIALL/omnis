"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { whatsappLink } from "@/config/site";

/**
 * "Join the club" — via WhatsApp instead of email: Tunisian customers answer WhatsApp,
 * and the old email form didn't store anything.
 */
export default function Newsletter() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
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
          className="text-base sm:text-lg mb-8"
          style={{ color: "var(--muted)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {isAr
            ? "ابعثلنا ميساج على الواتساب و كون أوّل واحد يعرف بالمنتوجات الجديدة و العروض."
            : "Écris-nous sur WhatsApp pour être le premier au courant des nouveautés et des offres."}
        </motion.p>

        <motion.a
          href={whatsappLink(isAr ? "سلام OMNIS، نحب ندخل للكلوب" : "Bonjour OMNIS, je veux rejoindre le club")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sticker btn-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <MessageCircle className="w-5 h-5" strokeWidth={2} /> {isAr ? "ادخل للكلوب على الواتساب" : "Rejoindre sur WhatsApp"}
        </motion.a>
      </div>
    </section>
  );
}
