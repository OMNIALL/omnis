"use client";

import Link from "next/link";
import OmnisLogo from "./OmnisLogo";
import { useLanguage } from "@/context/LanguageContext";
import { SOCIAL_LINKS } from "@/config/site";

export default function Footer() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const footerGroups = [
    {
      title: isAr ? "المنتجات" : "Produits",
      links: [
        { label: "FOCUS (Gélules)", href: "/products/focus" },
        { label: isAr ? "ÉNERGIE (قريباً)" : "ÉNERGIE (Bientôt)", href: "/#produits" },
        { label: isAr ? "SOMMEIL (قريباً)" : "SOMMEIL (Bientôt)", href: "/#produits" },
        { label: isAr ? "IMMUNITÉ (قريباً)" : "IMMUNITÉ (Bientôt)", href: "/#produits" },
      ],
    },
    {
      title: isAr ? "عن أومنيس" : "À propos",
      links: [
        { label: isAr ? "قصتنا وراء أومنيس" : "Notre histoire", href: "/about" },
        { label: isAr ? "المكونات والجرعات" : "Ingrédients actifs", href: "/ingredients" },
        { label: isAr ? "الأبحاث" : "La science", href: "/science" },
        { label: isAr ? "الأسئلة الشائعة" : "Foire aux questions", href: "/faq" },
        { label: isAr ? "تتبع طلبيتك مباشرة" : "Suivi de commande", href: "/track" },
      ],
    },
    {
      title: isAr ? "الدعم والقانون" : "Support & Légal",
      links: [
        { label: isAr ? "اتصل بنا" : "Contact & Support", href: "/contact" },
        { label: isAr ? "التوصيل في تونس" : "Livraison en Tunisie", href: "/shipping" },
        { label: isAr ? "الإرجاع والضمان" : "Retours & Garanties", href: "/returns" },
        { label: isAr ? "إشعار قانوني وخصوصية" : "Mentions Légales", href: "/legal" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: SOCIAL_LINKS.instagram,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: SOCIAL_LINKS.tiktok,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.35 6.35 0 003.14 15.2a6.35 6.35 0 0010.86 4.48V13.2a8.2 8.2 0 005.59 2.18V11.9a4.84 4.84 0 01-3.77-1.44V6.69h3.77z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: SOCIAL_LINKS.facebook,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className="w-full pt-16 pb-8 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--ink)",
        color: "var(--cream)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Logo Column */}
          <div className="lg:col-span-2">
            <OmnisLogo size="lg" color="var(--cream)" showTagline />
            <p
              className="mt-4 text-sm leading-relaxed max-w-sm"
              style={{ opacity: 0.6 }}
            >
              {isAr
                ? "مكمّلات غذائية مصنوعة في تونس، بتركيبات قصيرة و جرعات واضحة."
                : "Des compléments alimentaires fabriqués en Tunisie, aux formules courtes et aux doses affichées."}
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.filter((s) => s.href).map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-200 hover:bg-cream hover:text-ink"
                  style={{ borderColor: "rgba(255,244,227,0.3)", color: "var(--cream)" }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4
                className="label-sm mb-4"
                style={{
                  color: "var(--sun)",
                  fontSize: "0.75rem",
                }}
              >
                {group.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-sun block"
                      style={{
                        color: "var(--cream)",
                        opacity: 0.8,
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="w-full h-[2px] mb-6"
          style={{ backgroundColor: "rgba(255,244,227,0.12)" }}
        />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center sm:text-left"
            style={{ opacity: 0.7, maxWidth: "560px", lineHeight: 1.6 }}
          >
            {isAr
              ? "هذه المنتجات هي مكملات غذائية ولا تعوض نظاماً غذائياً متنوعاً ومتوازناً أو نمط حياة صحي. يُنصح بعدم تجاوز الجرعة اليومية الموصى بها."
              : "Ces produits sont des compléments alimentaires et ne remplacent pas une alimentation équilibrée. Ne pas dépasser la dose journalière recommandée."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs" style={{ opacity: 0.6 }}>
            <span>© 2026 OMNIS. {isAr ? "جميع الحقوق محفوظة." : "Tous droits réservés."}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
