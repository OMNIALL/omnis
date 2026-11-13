"use client";

import React from "react";

interface StickerCircleProps {
  size?: number;
  color?: string;
  borderColor?: string;
  children?: React.ReactNode;
  className?: string;
  /** Kept for API compatibility — circles no longer rotate, bounce or cast hard shadows. */
  rotate?: number;
  shadow?: boolean;
  innerRing?: boolean;
  animate?: boolean;
  delay?: number;
}

/** Calm circular badge (legacy name). Paper surface, hairline border, no motion. */
export default function StickerCircle({
  size = 120,
  color = "var(--paper)",
  children,
  className = "",
}: StickerCircleProps) {
  // Map the old loud fills onto the calm palette.
  const fill = color === "var(--sun)" || color === "var(--sky)" || color === "var(--cream)" ? "var(--paper)" : color;
  return (
    <div
      className={`relative flex items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: fill,
        border: "1px solid var(--line)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {children}
    </div>
  );
}
