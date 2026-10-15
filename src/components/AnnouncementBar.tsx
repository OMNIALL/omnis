"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function AnnouncementBar() {
  const { t } = useLanguage();
  const message = `${t.announcement} · `;

  return (
    <div
      className="w-full overflow-hidden py-2.5"
      style={{
        backgroundColor: "var(--ink)",
        color: "var(--sun)",
      }}
    >
      <div className="marquee-track">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="label-sm whitespace-nowrap px-8"
            style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
