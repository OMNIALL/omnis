"use client";

import { motion } from "framer-motion";

interface IngredientPillProps {
  name: string;
  dosage?: string;
  color?: string;
  textColor?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function IngredientPill({
  name,
  dosage,
  color = "var(--sun)",
  textColor = "var(--ink)",
  className = "",
  size = "md",
}: IngredientPillProps) {
  const sizeStyles = {
    sm: "px-3 py-1 text-[0.65rem]",
    md: "px-4 py-1.5 text-xs",
    lg: "px-5 py-2 text-sm",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full border-2 border-ink whitespace-nowrap ${sizeStyles[size]} ${className}`}
      style={{
        backgroundColor: color,
        color: textColor,
        letterSpacing: "0.08em",
      }}
      whileHover={{
        scale: 1.05,
        rotate: 2,
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {name}
      {dosage && (
        <span style={{ opacity: 0.7 }}>{dosage}</span>
      )}
    </motion.span>
  );
}
