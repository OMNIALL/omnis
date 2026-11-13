"use client";

import { motion } from "framer-motion";
import { Banknote, FlaskConical, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { whatsappLink } from "@/config/site";
import { DELIVERY_TIME } from "@/lib/pricing";

/**
 * Honest trust section (no invented ratings).
 * TODO: add real customer reviews (WhatsApp screenshots / UGC) once collected.
 */
export default function SocialProof() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const cards = isAr
    ? [
        { Icon: MapPin, title: "مصنوع في تونس", text: "مصنوع في مخبر تونسي، 30 كاشية نباتية في كل علبة." },
        { Icon: FlaskConical, title: "تركيبة واضحة", text: "100 ملغ كافيين طبيعي · 180 ملغ L-théanine · B6 · B12. كل شي مكتوب." },
        { Icon: Banknote, title: "تخلّص كي توصلك", text: `ما تخلّص حتى شي أونلاين. توصيل ${DELIVERY_TIME.ar} لكل الولايات.` },
        { Icon: MessageCircle, title: "نجاوبوك على الواتساب", text: "سؤال على الكوموند ولا على المنتوج؟ ابعثلنا ميساج." },
      ]
    : [
        { Icon: MapPin, title: "Fabriqué en Tunisie", text: "Produit par un laboratoire tunisien. 30 gélules végétales par flacon." },
        { Icon: FlaskConical, title: "Formule transparente", text: "100 mg de caféine naturelle, 180 mg de L-théanine, B6 et B12. Tout est indiqué." },
        { Icon: Banknote, title: "Paiement à la livraison", text: `Rien à payer en ligne. Livraison en ${DELIVERY_TIME.fr} dans les 24 gouvernorats.` },
        { Icon: MessageCircle, title: "Une vraie équipe", text: "Une question sur ta commande ou le produit ? On répond sur WhatsApp." },
      ];

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-line bg-paper">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow mb-3">{isAr ? "الثقة" : "Confiance"}</p>
          <h2 className="heading-xl text-3xl sm:text-5xl text-ink">
            {isAr ? "علامة تونسية جديدة، تخدم بوضوح." : "Une jeune marque tunisienne, qui joue la transparence."}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Icon className="w-6 h-6 text-harissa mb-4" strokeWidth={1.5} />
              <p className="heading-lg text-xl text-ink mb-2">{title}</p>
              <p className="text-sm text-muted leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-ink font-medium">
            {isAr ? "جرّبت FOCUS؟ رايك يعاونّا نحسّنو." : "Tu as testé FOCUS ? Ton avis nous aide à progresser."}
          </p>
          <a
            href={whatsappLink(isAr ? "سلام OMNIS، هاو رايي في FOCUS: " : "Bonjour OMNIS, voici mon avis sur FOCUS : ")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sticker btn-secondary"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2} />
            {isAr ? "ابعث رايك" : "Donner mon avis"}
          </a>
        </div>
      </div>
    </section>
  );
}
