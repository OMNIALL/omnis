"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OmnisLogo from "./OmnisLogo";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.navProducts, href: "/#produits" },
    { label: t.navIngredients, href: "/#ingredients" },
    { label: t.navStory, href: "/about" },
    { label: t.navTrack, href: "/track" },
    { label: t.navContact, href: "/contact" },
    { label: t.navFAQ, href: "/faq" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{
        backgroundColor: "var(--cream)",
        borderBottom: scrolled ? "2px solid var(--ink)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="shrink-0">
            <OmnisLogo size="sm" />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="label-sm relative group"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "var(--harissa)" }}
                />
              </a>
            ))}
          </div>

          {/* Language Switcher + Cart Button + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher */}
            <div
              className="flex items-center rounded-full border-2 border-ink p-0.5 bg-white text-xs font-black"
              style={{ boxShadow: "2px 2px 0 var(--ink)" }}
            >
              <button
                type="button"
                onClick={() => setLanguage("fr")}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === "fr"
                    ? "bg-sun text-ink font-black border border-ink"
                    : "text-ink/60 hover:text-ink font-bold"
                }`}
                title="Passer en Français"
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ar")}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === "ar"
                    ? "bg-sun text-ink font-black border border-ink"
                    : "text-ink/60 hover:text-ink font-bold"
                }`}
                title="التحويل إلى العربية"
              >
                عربي 🇹🇳
              </button>
            </div>

            <button
              id="cart-button"
              onClick={toggleCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{
                backgroundColor: "var(--sun)",
                borderColor: "var(--ink)",
                color: "var(--ink)",
                boxShadow: "4px 4px 0 var(--ink)",
              }}
              aria-label={t.cart}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="hidden sm:inline">{t.cart}</span>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                  style={{
                    backgroundColor: "var(--harissa)",
                    color: "var(--cream)",
                    border: "2px solid var(--ink)",
                  }}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <motion.span
                className="block w-6 h-[2.5px] bg-ink rounded-full"
                style={{ backgroundColor: "var(--ink)" }}
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block w-6 h-[2.5px] bg-ink rounded-full"
                style={{ backgroundColor: "var(--ink)" }}
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="block w-6 h-[2.5px] bg-ink rounded-full"
                style={{ backgroundColor: "var(--ink)" }}
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: "var(--cream)",
              borderTop: "2px solid var(--ink)",
            }}
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="label-sm py-3 px-4 rounded-2xl transition-colors"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--ink)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--sun)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
