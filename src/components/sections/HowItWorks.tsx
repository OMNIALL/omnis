"use client";

import { motion } from "framer-motion";
import { BookOpen, MessageCircle, PackageCheck, PhoneCall, ShieldCheck, Smartphone } from "lucide-react";
import Link from "next/link";
import { GUARANTEE, GUARANTEE_ACTIVE, GUIDE_ACTIVE } from "@/config/offer";
import { useLanguage } from "@/context/LanguageContext";
import { ORDER_HREF } from "@/config/site";
import { DELIVERY_TIME } from "@/lib/pricing";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

/** "Ce qui se passe après ta commande" — removes every unknown before the visitor has to ask. */
export default function HowItWorks() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  // Pre-emptive unknown removal: every step from order to day 7 (marketing/funnel-triggers-map.md #13).
  const steps = (
    isAr
      ? [
          { Icon: Smartphone, title: "كوموندي في 30 ثانية", text: "اسمك، تليفونك، عنوانك. ما تخلّص حتى شي توّا.", on: true },
          { Icon: PhoneCall, title: "الليفرور يكلّمك", text: `قبل ما يجي، في ${DELIVERY_TIME.ar}، في الولايات الكل.`, on: true },
          { Icon: PackageCheck, title: "ثبّت، و بعد خلّص", text: "العلبة مسكّرة. تثبّت فيها قدّام الليفرور، و تخلّص كي تستلم.", on: true },
          { Icon: BookOpen, title: "الڤيد على الواتساب", text: "« 30 يوم فوكوس »: وقتاش تاخوها و الروتين متاعك.", on: GUIDE_ACTIVE },
          { Icon: MessageCircle, title: "نسألو عليك بعد جمعة", text: "كان عندك سؤال، فما شكون يجاوبك.", on: true },
        ]
      : [
          { Icon: Smartphone, title: "Tu commandes en 30 s", text: "Nom, téléphone, adresse. Rien à payer en ligne.", on: true },
          { Icon: PhoneCall, title: "Le livreur t'appelle", text: `Avant de passer, en ${DELIVERY_TIME.fr}, dans les 24 gouvernorats.`, on: true },
          { Icon: PackageCheck, title: "Tu vérifies, puis tu paies", text: "Le flacon est scellé. Tu vérifies devant le livreur et tu paies à la réception.", on: true },
          { Icon: BookOpen, title: "Ton guide sur WhatsApp", text: "« Protocole Focus 30 jours » : quand la prendre, ta routine.", on: GUIDE_ACTIVE },
          { Icon: MessageCircle, title: "On prend de tes nouvelles à J7", text: "Une question sur la prise ? Quelqu'un te répond.", on: true },
        ]
  ).filter((s) => s.on);

  return (
    <Section
      id="comment-ca-marche"
      eyebrow={isAr ? "كيفاش يمشي" : "Comment ça marche"}
      title={isAr ? "شنوة يصير بعد ما تكوموندي." : "Ce qui se passe après ta commande."}
    >
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5">
        {steps.map(({ Icon, title, text }, i) => (
          <motion.li
            key={title}
            className="border-t border-ink pt-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-full bg-ink text-cream flex items-center justify-center font-semibold tabular-nums">
                {i + 1}
              </span>
              <Icon className="w-5 h-5 text-harissa" strokeWidth={1.75} />
            </div>
            <p className="heading-lg text-xl text-ink mb-1.5">{title}</p>
            <p className="text-muted">{text}</p>
          </motion.li>
        ))}
      </ol>
      {GUARANTEE_ACTIVE && (
        <p className="mt-8 flex gap-2.5 items-start text-ink max-w-2xl">
          <ShieldCheck className="w-5 h-5 text-harissa shrink-0 mt-0.5" strokeWidth={1.75} />
          <span>
            {isAr ? GUARANTEE.packLine.ar : GUARANTEE.packLine.fr}{" "}
            <Link href="/returns#garantie" className="text-muted underline underline-offset-4 hover:text-ink">
              {isAr ? "الشروط" : "Conditions"}
            </Link>
          </span>
        </p>
      )}
      <div className="mt-8">
        <Button href={ORDER_HREF}>{isAr ? "نبدا: نختار الپاك" : "Je choisis mon pack"}</Button>
      </div>
    </Section>
  );
}
