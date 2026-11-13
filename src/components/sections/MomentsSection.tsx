"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Laptop, Dumbbell, BookOpen, Gamepad2, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { ORDER_HREF } from "@/config/site";

/**
 * « Quand la prendre ? » — four usage moments.
 * Photos: product-free lifestyle shots (no label = no AI label errors). Prompts in marketing/science-and-moments-plan.md.
 * Drop the WebP files in /public/images/moments/ and set `image` below; until then an icon on brand texture is shown.
 */
type Moment = {
  id: string;
  Icon: LucideIcon;
  image: string | null; // e.g. "/images/moments/deep-work.webp"
  title: { fr: string; ar: string };
  text: { fr: string; ar: string };
};

const MOMENTS: Moment[] = [
  {
    id: "deep-work",
    Icon: Laptop,
    image: "/images/moments/deep-work.webp",
    title: { fr: "Deep work", ar: "الخدمة" },
    text: {
      fr: "Une journée chargée ? Une gélule le matin pour rester sur l'essentiel, sans le café de trop.",
      ar: "نهار خدمة كامل؟ كاشية الصباح باش تقعد مركّز، من غير قهوة زايدة.",
    },
  },
  {
    id: "sport",
    Icon: Dumbbell,
    image: "/images/moments/sport.webp",
    title: { fr: "Salle de sport", ar: "السبور" },
    text: {
      fr: "30 min avant ta séance : l'énergie d'un café, sans te sentir à cran.",
      ar: "30 دقيقة قبل السيونس: الإينرجي متاع قهوة، من غير ما تولّي نيرفي.",
    },
  },
  {
    id: "revisions",
    Icon: BookOpen,
    image: "/images/moments/revisions.webp",
    title: { fr: "Révisions", ar: "المراجعة" },
    text: {
      fr: "Reste dans tes fiches, sans le coup de barre de 14h.",
      ar: "تقعد في الكور متاعك، من غير طيحة الوحدة و نص.",
    },
  },
  {
    id: "gaming",
    Icon: Gamepad2,
    image: "/images/moments/gaming.webp",
    title: { fr: "Gaming", ar: "القايمينغ" },
    text: {
      fr: "Les longues sessions : reste dans la partie sans enchaîner les canettes.",
      ar: "السيشن الطويلة: تقعد في البارتية من غير كانيتات.",
    },
  },
];

export default function MomentsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <Section
      id="moments"
      eyebrow={isAr ? "الاستعمال" : "Au quotidien"}
      title={isAr ? "وقتاش تاخوها؟" : "Quand la prendre ?"}
      intro={isAr ? "أربعة لحظات، كاشية وحدة." : "Quatre moments, une seule gélule."}
    >
      {/* Horizontal snap-scroll on phones, 4-column grid on desktop */}
      <ul className="-mx-4 px-4 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory pb-2 sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MOMENTS.map((m, i) => (
          <motion.li
            key={m.id}
            className="card p-2.5 shrink-0 w-[72%] sm:w-auto snap-start flex flex-col"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="relative aspect-[4/5] rounded-[14px] overflow-hidden bg-cream">
              {m.image ? (
                <Image
                  src={m.image}
                  alt={isAr ? m.title.ar : m.title.fr}
                  fill
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <>
                  <Image src="/images/bg-texture.webp" alt="" fill sizes="25vw" className="object-cover" aria-hidden />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-20 h-20 rounded-full bg-paper/90 border border-line flex items-center justify-center">
                      <m.Icon className="w-9 h-9 text-harissa" strokeWidth={1.5} />
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="px-2 pt-4 pb-3">
              <p className="heading-lg text-xl text-ink mb-1.5">{isAr ? m.title.ar : m.title.fr}</p>
              <p className="text-muted text-[15px] leading-relaxed">{isAr ? m.text.ar : m.text.fr}</p>
            </div>
          </motion.li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <Button href={ORDER_HREF}>{isAr ? "كوموندي · 39 DT" : "Je commande · 39 DT"}</Button>
        <p className="text-sm text-muted">
          {isAr ? "كاشية في النهار، زوز ماكسيموم · موش في الليل" : "1 gélule par jour, 2 maximum · pas le soir"}
        </p>
      </div>
    </Section>
  );
}
