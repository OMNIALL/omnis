"use client";

import { useLanguage } from "@/context/LanguageContext";

/** Static, quiet announcement line (the scrolling marquee is gone). */
export default function AnnouncementBar() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <div className="w-full bg-ink text-cream text-center px-4 py-2 text-[13px] font-medium">
      {isAr
        ? "تخلّص كي توصلك · توصيل لكل الولايات · مجاني من علبتين"
        : "Paiement à la livraison · Livraison dans les 24 gouvernorats · Offerte dès 2 flacons"}
    </div>
  );
}
