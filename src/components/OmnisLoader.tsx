"use client";

import { motion } from "framer-motion";

interface OmnisLoaderProps {
  size?: number;
  label?: string;
}

export default function OmnisLoader({
  size = 90,
  label = "Chargement...",
}: OmnisLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: "var(--sun)",
          border: "3.5px solid var(--ink)",
          boxShadow: "5px 5px 0 var(--ink)",
        }}
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: "easeInOut",
        }}
      >
        {/* Inner thin ring */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size - 16,
            height: size - 16,
            border: "1.5px solid var(--ink)",
            opacity: 0.35,
          }}
        />
        <span
          className="font-black text-ink select-none tracking-tight"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: size * 0.22,
          }}
        >
          OMNIS
        </span>
      </motion.div>
      {label && (
        <span className="label-sm text-ink opacity-70 tracking-widest text-xs">
          {label}
        </span>
      )}
    </div>
  );
}
