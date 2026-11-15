"use client";

import Link from "next/link";
import { BookOpen, Banknote, FlaskConical, MessageCircle, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DELIVERY_TIME, SHIPPING_FEE, FREE_SHIPPING_MIN_BOTTLES } from "@/lib/pricing";
import { GUARANTEE, GUARANTEE_ACTIVE, GUIDE, GUIDE_ACTIVE } from "@/config/offer";

type Row = { Icon: LucideIcon; title: string; text: string; extra?: React.ReactNode };

/**
 * « Ce que tu reçois » — the whole value stack in one place, right above the order button.
 * No invented "worth X DT" figures: the list itself carries the value. Rows follow the selected pack.
 */
export default function OfferStack({ qty }: { qty: number }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const days = qty * 30;
  const freeShip = qty >= FREE_SHIPPING_MIN_BOTTLES;

  const rows: Row[] = [
    {
      Icon: FlaskConical,
      title: isAr ? `${qty === 1 ? "علبة" : `${qty} علب`} FOCUS · ${days} يوم` : `${qty} flacon${qty > 1 ? "s" : ""} FOCUS · ${days} jours`,
      text: isAr
        ? "180 ملغ L-théanine · 100 ملغ كافيين طبيعي · B6 · B12، كل شي مكتوب بالملغ."
        : "180 mg L-théanine · 100 mg caféine naturelle · B6 · B12, tout est écrit au mg près.",
    },
    ...(GUIDE_ACTIVE
      ? [
          {
            Icon: BookOpen,
            title: isAr ? GUIDE.short.ar : GUIDE.short.fr,
            text: isAr ? GUIDE.line.ar : GUIDE.line.fr,
            extra: (
              <details className="mt-1.5 group">
                <summary className="cursor-pointer text-sm text-muted underline underline-offset-4 list-none">
                  {isAr ? "شوف الفصول" : "Voir les chapitres"}
                </summary>
                <ol className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-ink">
                  {(isAr ? GUIDE.chapters.ar : GUIDE.chapters.fr).map((c, i) => (
                    <li key={c} className="flex gap-2">
                      <span className="text-muted tabular-nums">{i + 1}.</span>
                      {c}
                    </li>
                  ))}
                </ol>
              </details>
            ),
          },
        ]
      : []),
    {
      Icon: MessageCircle,
      title: isAr ? "متابعة على الواتساب" : "Suivi sur WhatsApp",
      text: isAr
        ? "نهار 1 كيفاش تاخوها، نهار 7 نسألو عليك، نهار 25 قبل ما تكمّل."
        : "Jour 1 : comment la prendre. Jour 7 : on prend de tes nouvelles. Jour 25 : avant d'en manquer.",
    },
    {
      Icon: Truck,
      title: freeShip ? (isAr ? "التوصيل مجاني" : "Livraison offerte") : isAr ? `توصيل ${SHIPPING_FEE} DT` : `Livraison ${SHIPPING_FEE} DT`,
      text: isAr
        ? `في ${DELIVERY_TIME.ar}، في الولايات الكل. الليفرور يكلّمك قبل ما يجي.`
        : `En ${DELIVERY_TIME.fr}, dans les 24 gouvernorats. Le livreur t'appelle avant de passer.`,
    },
    {
      Icon: Banknote,
      title: isAr ? "تخلّص كي توصلك" : "Tu paies à la porte",
      text: isAr ? "ما تخلّص حتى شي توّا. تثبّت في العلبة، و بعد تخلّص." : "Rien à payer maintenant. Tu vérifies le flacon, puis tu paies.",
    },
    ...(GUARANTEE_ACTIVE && qty >= 2
      ? [
          {
            Icon: ShieldCheck,
            title: isAr ? GUARANTEE.short.ar : GUARANTEE.short.fr,
            text: isAr ? GUARANTEE.line.ar : GUARANTEE.line.fr,
            extra: (
              <Link href="/returns#garantie" className="text-sm text-muted underline underline-offset-4 hover:text-ink">
                {isAr ? "الشروط" : "Conditions"}
              </Link>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="rounded-2xl border border-line bg-cream p-5">
      <p className="heading-lg text-lg text-ink mb-3">{isAr ? "شنوة يوصلك" : "Ce que tu reçois"}</p>
      <ul className="space-y-3">
        {rows.map(({ Icon, title, text, extra }) => (
          <li key={title} className="flex gap-3">
            <Icon className="w-5 h-5 text-harissa shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="font-semibold text-ink leading-snug">{title}</p>
              <p className="text-sm text-muted">{text}</p>
              {extra}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
