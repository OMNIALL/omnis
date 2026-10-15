"use client";

interface OmnisLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  badgeColor?: string;
  showTagline?: boolean;
  className?: string;
}

export default function OmnisLogo({
  size = "md",
  color = "var(--ink)",
  badgeColor = "var(--sun)",
  showTagline = false,
  className = "",
}: OmnisLogoProps) {
  const sizes = {
    sm: { text: "text-xl", badge: 24, badgeText: "text-sm", tagline: "text-[0.5rem]" },
    md: { text: "text-3xl", badge: 36, badgeText: "text-xl", tagline: "text-[0.6rem]" },
    lg: { text: "text-5xl", badge: 52, badgeText: "text-2xl", tagline: "text-xs" },
    xl: { text: "text-7xl", badge: 72, badgeText: "text-4xl", tagline: "text-sm" },
  };

  const s = sizes[size];

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="flex items-center gap-1">
        <span
          className={`${s.text} font-[var(--font-heading)] font-black tracking-tight uppercase`}
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 900,
            color,
          }}
        >
          OMNI
        </span>
        <div
          className="rounded-full flex items-center justify-center border-[3px] border-ink shrink-0"
          style={{
            width: s.badge,
            height: s.badge,
            backgroundColor: badgeColor,
            borderColor: color === "var(--cream)" ? "var(--cream)" : "var(--ink)",
          }}
        >
          <span
            className={`${s.badgeText} font-black`}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              color: color === "var(--cream)" ? "var(--ink)" : "var(--ink)",
            }}
          >
            S
          </span>
        </div>
      </div>
      {showTagline && (
        <span
          className={`${s.tagline} font-bold uppercase tracking-[0.2em] mt-1 opacity-60`}
          style={{ color }}
        >
          OMNI = ALL · S = SUPPLÉMENT
        </span>
      )}
    </div>
  );
}
