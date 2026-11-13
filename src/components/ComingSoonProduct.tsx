"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { whatsappLink, ORDER_HREF } from "@/config/site";
import BottleVisual from "./brand/BottleVisual";
import type { Product } from "@/data/products";

/** Product not on sale yet: no order form — a WhatsApp waitlist + a path to FOCUS. */
export default function ComingSoonProduct({ product }: { product: Product }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const name = product.name.charAt(0) + product.name.slice(1).toLowerCase();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-6 sm:py-12">
      <div className="rounded-[28px] bg-paper border border-line flex items-center justify-center min-h-[280px] sm:min-h-[460px]">
        <BottleVisual className="w-32 sm:w-48 grayscale opacity-60" />
      </div>
      <div className="flex flex-col gap-5">
        <p className="eyebrow">{isAr ? "قريباً" : "Bientôt"}</p>
        <h1 className="heading-xl text-4xl sm:text-5xl text-ink">OMNIS {name}</h1>
        <p className="text-lg text-muted max-w-md">
          {isAr
            ? `OMNIS ${name} باش يزيد للمجموعة قريباً. تحب تكون أوّل واحد يعرف؟ ابعثلنا على الواتساب.`
            : `OMNIS ${name} rejoint bientôt la gamme. Tu veux être prévenu le premier ? Écris-nous sur WhatsApp.`}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsappLink(isAr ? `سلام OMNIS، علّمني كي يخرج ${name}` : `Bonjour OMNIS, prévenez-moi à la sortie de ${name}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sticker btn-secondary"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2} />
            {isAr ? "علّمني كي يخرج" : "Préviens-moi"}
          </a>
          <Link href={ORDER_HREF} className="btn-sticker btn-primary">
            {isAr ? "توّا: OMNIS FOCUS · 39 DT" : "Disponible : OMNIS FOCUS · 39 DT"}
          </Link>
        </div>
      </div>
    </div>
  );
}
