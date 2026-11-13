import Image from "next/image";

/**
 * Product visual: the FOCUS pack shot (white background, blended into the cream UI with multiply).
 * Set FOCUS_BOTTLE_IMAGE to null to fall back to the vector illustration below.
 */
export const FOCUS_BOTTLE_IMAGE: string | null = "/images/focus-bottle-front.webp"; // 1254×1254, cream background

interface Props {
  className?: string;
  /** Label color band — harissa for FOCUS, other colors for future products. */
  accent?: string;
  name?: string;
  src?: string | null;
  muted?: boolean;
  priority?: boolean;
}

export default function BottleVisual({
  className = "w-56",
  accent = "#E8432A",
  name = "FOCUS",
  src = FOCUS_BOTTLE_IMAGE,
  muted = false,
  priority = false,
}: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={`OMNIS ${name} — flacon de 30 gélules végétales`}
        width={1254}
        height={1254}
        priority={priority}
        sizes="(max-width: 640px) 60vw, 360px"
        className={`${className} h-auto mix-blend-multiply select-none`}
        style={{ opacity: muted ? 0.55 : 1 }}
      />
    );
  }
  return (
    <svg
      viewBox="0 0 220 300"
      className={className}
      role="img"
      aria-label={`OMNIS ${name} — flacon de 30 gélules`}
      style={{ opacity: muted ? 0.55 : 1 }}
    >
      <defs>
        <linearGradient id={`body-${name}`} x1="0" x2="1">
          <stop offset="0" stopColor="#ECE6DC" />
          <stop offset="0.18" stopColor="#FFFFFF" />
          <stop offset="0.7" stopColor="#FBF8F3" />
          <stop offset="1" stopColor="#E3DCD1" />
        </linearGradient>
      </defs>
      <rect x="62" y="18" width="96" height="46" rx="8" fill="#F3EEE6" stroke="#D6CEC2" />
      <rect x="34" y="72" width="152" height="210" rx="26" fill={`url(#body-${name})`} stroke="#DDD5C9" />
      <rect x="40" y="112" width="140" height="138" rx="6" fill="#FFFBF4" />
      <rect x="40" y="112" width="140" height="8" fill={accent} />
      <text x="110" y="186" textAnchor="middle" fontFamily="var(--font-heading), serif" fontWeight="600" fontSize="30" fill={accent}>
        {name}
      </text>
    </svg>
  );
}
