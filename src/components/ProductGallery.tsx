"use client";

import { useState } from "react";
import Image from "next/image";

const SHOTS = [
  { src: "/images/focus-bottle.webp", w: 1254, h: 1254, alt: "OMNIS FOCUS — flacon de 30 gélules végétales" },
  { src: "/images/hand-bottle.webp", w: 1254, h: 1254, alt: "OMNIS FOCUS — flacon en main" },
  { src: "/images/focus-label.webp", w: 1224, h: 1285, alt: "Étiquette OMNIS FOCUS : composition, mode d'emploi, informations nutritionnelles", contain: true },
  { src: "/images/focus-ingredients.webp", w: 1254, h: 1254, alt: "Guarana, feuilles de thé, gélules et flacon OMNIS FOCUS" },
  { src: "/images/lifestyle-study.webp", w: 1254, h: 1254, alt: "OMNIS FOCUS sur un bureau de révision" },
];

/** Product page gallery: main image + thumbnails. */
export default function ProductGallery({ badge }: { badge?: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const shot = SHOTS[active];

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-24">
      <div className="relative aspect-[4/5] sm:aspect-square rounded-[28px] bg-paper border border-line overflow-hidden">
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          fill
          priority={active === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={shot.contain ? "object-contain p-2 sm:p-4 bg-paper" : "object-cover"}
        />
        {badge && <div className="absolute top-4 start-4">{badge}</div>}
      </div>
      <div className="grid grid-cols-6 gap-2" role="tablist" aria-label="Photos du produit">
        {SHOTS.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={s.alt}
            onClick={() => setActive(i)}
            className={`relative aspect-square rounded-xl overflow-hidden bg-paper transition ${
              i === active ? "ring-2 ring-ink" : "ring-1 ring-line opacity-80 hover:opacity-100"
            }`}
          >
            <Image
              src={s.src}
              alt=""
              fill
              sizes="80px"
              className={s.contain ? "object-contain p-0.5 bg-paper" : "object-cover"}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
