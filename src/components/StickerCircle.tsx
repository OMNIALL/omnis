"use client";

import { motion } from "framer-motion";
import React from "react";

interface StickerCircleProps {
  size?: number;
  color?: string;
  borderColor?: string;
  children?: React.ReactNode;
  className?: string;
  rotate?: number;
  shadow?: boolean;
  innerRing?: boolean;
  animate?: boolean;
  delay?: number;
}

export default function StickerCircle({
  size = 120,
  color = "var(--sun)",
  borderColor = "var(--ink)",
  children,
  className = "",
  rotate = 0,
  shadow = true,
  innerRing = true,
  animate = true,
  delay = 0,
}: StickerCircleProps) {
  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        border: `3px solid ${borderColor}`,
        boxShadow: shadow ? "6px 6px 0 var(--ink)" : "none",
        transform: `rotate(${rotate}deg)`,
      }}
      initial={animate ? { scale: 0, rotate: rotate - 10 } : false}
      animate={animate ? { scale: 1, rotate } : false}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay,
      }}
      whileHover={{
        scale: 1.05,
        rotate: rotate + 3,
        transition: { duration: 0.2 },
      }}
    >
      {innerRing && (
        <div
          className="absolute rounded-full"
          style={{
            width: size - 16,
            height: size - 16,
            border: `2px solid ${borderColor}`,
            opacity: 0.3,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
