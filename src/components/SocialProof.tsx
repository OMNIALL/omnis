"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/products";

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--ink)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="heading-xl text-3xl sm:text-4xl md:text-5xl mb-4"
            style={{ color: "var(--cream)" }}
          >
            ILS EN PARLENT
          </h2>

          {/* Rating pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 mt-4"
            style={{
              backgroundColor: "var(--sun)",
              borderColor: "var(--ink)",
              boxShadow: "4px 4px 0 rgba(255,255,255,0.1)",
            }}
          >
            <span className="text-lg">⭐</span>
            <span className="font-black text-lg" style={{ fontFamily: "var(--font-heading)" }}>
              4.9
            </span>
            <span className="text-sm font-bold opacity-60">/ 5</span>
          </div>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-2xl mx-auto relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="p-8 sm:p-10 rounded-3xl relative"
              style={{
                backgroundColor: "var(--cream)",
                border: "3px solid var(--ink)",
                boxShadow: "6px 6px 0 rgba(255,255,255,0.1)",
              }}
              initial={{ opacity: 0, y: 20, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -20, rotate: 2 }}
              transition={{ duration: 0.4 }}
            >
              {/* Speech bubble tail */}
              <div
                className="absolute -bottom-4 left-10 w-8 h-8"
                style={{
                  backgroundColor: "var(--cream)",
                  border: "3px solid var(--ink)",
                  borderTop: "none",
                  borderLeft: "none",
                  transform: "rotate(45deg)",
                }}
              />

              <p
                className="text-lg sm:text-xl leading-relaxed mb-6"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--ink)",
                }}
              >
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm"
                  style={{
                    backgroundColor: "var(--sun)",
                    borderColor: "var(--ink)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--ink)" }}>
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-xs opacity-50">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="text-sm">⭐</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8 mb-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-3 h-3 rounded-full border-2 transition-all duration-300"
              style={{
                borderColor: "var(--cream)",
                backgroundColor:
                  i === currentIndex ? "var(--sun)" : "transparent",
                transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>

        {/* Instagram Grid Placeholder */}
        <div className="pt-8 border-t-2" style={{ borderColor: "rgba(255,244,227,0.15)" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <span className="label-sm text-sun tracking-widest text-xs">COMMUNAUTÉ</span>
              <h3 className="heading-lg text-2xl sm:text-3xl text-cream mt-1">
                #OMNISSQUAD SUR INSTAGRAM
              </h3>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sticker btn-primary text-xs px-5 py-2.5"
            >
              Suivre @omnis.tn
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                tag: "#AllumeTonFocus",
                handle: "@amina_dev",
                bgColor: "var(--harissa)",
                textColor: "var(--cream)",
                accent: "var(--sun)",
                stickerText: "⚡ FOCUS",
              },
              {
                tag: "#MorningRoutine",
                handle: "@karim_tn",
                bgColor: "var(--sun)",
                textColor: "var(--ink)",
                accent: "var(--harissa)",
                stickerText: "☕ NO CRASH",
              },
              {
                tag: "#MadeInTunisia",
                handle: "@nour_fit",
                bgColor: "var(--cream)",
                textColor: "var(--ink)",
                accent: "var(--sky)",
                stickerText: "🇹🇳 100% LOCAL",
              },
              {
                tag: "#EtudiantFocus",
                handle: "@selim_arch",
                bgColor: "var(--sky)",
                textColor: "var(--ink)",
                accent: "var(--sun)",
                stickerText: "📚 100% CLEAN",
              },
            ].map((post, index) => (
              <motion.div
                key={post.handle}
                className="relative p-5 rounded-2xl border-3 flex flex-col justify-between min-h-[170px] overflow-hidden group cursor-pointer"
                style={{
                  backgroundColor: post.bgColor,
                  color: post.textColor,
                  border: "3px solid var(--ink)",
                  boxShadow: "4px 4px 0 var(--ink)",
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: index % 2 === 0 ? 1.5 : -1.5,
                  boxShadow: "6px 6px 0 var(--ink)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="px-2.5 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-wider border-2"
                    style={{
                      backgroundColor: post.accent,
                      color: "var(--ink)",
                      borderColor: "var(--ink)",
                    }}
                  >
                    {post.stickerText}
                  </span>
                  <span className="text-sm opacity-60 font-mono">📸</span>
                </div>

                <div className="my-auto py-2">
                  <p className="font-black text-sm tracking-tight opacity-90">
                    {post.tag}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-ink/20">
                  <span className="text-xs font-bold opacity-75">
                    {post.handle}
                  </span>
                  <span className="text-xs opacity-60">♥ 342</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
