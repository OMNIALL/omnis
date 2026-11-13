"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "fr" | "ar";

export interface Translations {
  // Navigation & Top
  announcement: string;
  navProducts: string;
  navIngredients: string;
  navStory: string;
  navFAQ: string;
  navTrack: string;
  navContact: string;
  cart: string;

  // Hero
  heroTagline: string;
  heroHeadline1: string;
  heroHeadlineHighlight: string;
  heroSubtitle: string;
  btnOrder: string;
  btnDiscover: string;
  heroCaption: string;

  // Products
  productRangeTitle: string;
  productRangeSubtitle: string;
  capsules: string;
  addToCart: string;
  comingSoon: string;
  viewProduct: string;

  // Why Omnis
  whyTitle: string;
  whySubtitle: string;

  // Story
  storyTitle: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;

  // Testimonials & Social
  testimonialsTitle: string;
  ratingScore: string;
  communityTitle: string;

  // FAQ
  faqTitle: string;

  // Newsletter
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterPlaceholder: string;
  newsletterBtn: string;
  newsletterSuccess: string;

  // Common UI
  deliveryTunisia: string;
  codBadge: string;
  madeInTunisia: string;
  backToHome: string;
  totalTND: string;
  checkout: string;
}

export const translations: Record<Language, Translations> = {
  fr: {
    announcement: "Livraison partout en Tunisie · Fabriqué en Tunisie  · Paiement à la livraison",
    navProducts: "Produits",
    navIngredients: "Ingrédients",
    navStory: "Notre histoire",
    navFAQ: "FAQ",
    navTrack: "Suivi Colis",
    navContact: "Contact",
    cart: "Panier",

    heroTagline: "30 GÉLULES · + VITAMINES B6 ET B12 · FABRIQUÉ EN TUNISIE",
    heroHeadline1: "Allume ton",
    heroHeadlineHighlight: "focus.",
    heroSubtitle: "Des gélules qui boostent ta concentration, sans le crash.",
    btnOrder: "Commander",
    btnDiscover: "Découvrir",
    heroCaption: "30 GÉLULES · + VITAMINES B6 ET B12 · FABRIQUÉ EN TUNISIE",

    productRangeTitle: "La gamme OMNIS",
    productRangeSubtitle: "Tout ce qu'il te faut, dans une seule gélule.",
    capsules: "GÉLULES",
    addToCart: "Ajouter au panier",
    comingSoon: "BIENTÔT",
    viewProduct: "Voir le produit",

    whyTitle: "Une formule simple. Des doses claires.",
    whySubtitle: "Pourquoi choisir OMNIS au quotidien",

    storyTitle: "Notre histoire",
    storyP1: "OMNI = tout. S = supplément.",
    storyP2: "Tout ce qu'il te faut, dans une seule gélule.",
    storyP3: "On a créé OMNIS pour offrir des compléments sains, efficaces et fabriqués fièrement en Tunisie.",

    testimonialsTitle: "Ils en parlent",
    ratingScore: "Fabriqué en Tunisie · Paiement à la livraison",
    communityTitle: "#OMNISSQUAD sur Instagram",

    faqTitle: "Questions fréquentes",

    newsletterTitle: "Rejoins le club OMNIS",
    newsletterSubtitle: "Sois le premier au courant des nouveaux produits, offres et surprises.",
    newsletterPlaceholder: "ton@email.com",
    newsletterBtn: "S'inscrire",
    newsletterSuccess: " Bienvenue dans le club !",

    deliveryTunisia: "Livraison 24-48h partout en Tunisie",
    codBadge: "Paiement à la livraison",
    madeInTunisia: "100% Fabriqué en Tunisie ",
    backToHome: "Retour à l'accueil",
    totalTND: "Total en Dinars Tunisiens (TND)",
    checkout: "Passer commande",
  },

  ar: {
    announcement: "توصيل لكامل تراب الجمهورية التونسية · صنع في تونس  · الدفع عند الاستلام",
    navProducts: "المنتجات",
    navIngredients: "المكونات",
    navStory: "قصتنا",
    navFAQ: "الأسئلة الشائعة",
    navTrack: "تتبع طلبيتك",
    navContact: "اتصل بنا",
    cart: "السلة",

    heroTagline: "30 كبسولة نباتية · مع فيتامينات B6 و B12 · صنع في تونس",
    heroHeadline1: "شَعّل",
    heroHeadlineHighlight: "تركيزك.",
    heroSubtitle: "كبسولة طبيعية ترفع تركيزك الذهني بدون هبوط أو توتر.",
    btnOrder: "اطلب الآن",
    btnDiscover: "اكتشف المزيد",
    heroCaption: "30 كبسولة · مع فيتامينات B6 و B12 · صنع في تونس",

    productRangeTitle: "مجموعة أومنيس",
    productRangeSubtitle: "كل ما تحتاجه في كبسولة واحدة.",
    capsules: "كبسولات",
    addToCart: "أضف إلى السلة",
    comingSoon: "قريباً",
    viewProduct: "تفاصيل المنتج",

    whyTitle: "الكل في واحد. بدون كلام فارغ.",
    whySubtitle: "لماذا تختار أومنيس يومياً",

    storyTitle: "قصة أومنيس",
    storyP1: "أومني = الكل. إس = مكمل غذائي.",
    storyP2: "كل ما تحتاجه لصحتك في كبسولة واحدة.",
    storyP3: "ابتكرنا أومنيس في تونس لنقدم مكملات عصرية، نظيفة وفعالة بأعلى معايير الجودة.",

    testimonialsTitle: "آراء عملائنا",
    ratingScore: "مصنوع في تونس · تخلّص كي توصلك",
    communityTitle: "مجتمع #OMNISSQUAD على إنستغرام",

    faqTitle: "الأسئلة المتكررة",

    newsletterTitle: "انضم إلى نادي أومنيس",
    newsletterSubtitle: "كن أول من يعلم بإطلاق المنتجات الجديدة والعروض الحصرية.",
    newsletterPlaceholder: "بريدك الإلكتروني",
    newsletterBtn: "اشتراك",
    newsletterSuccess: " مرحباً بك في النادي !",

    deliveryTunisia: "توصيل سريع 24-48 ساعة في كل تونس",
    codBadge: "الدفع نقداً عند الاستلام",
    madeInTunisia: "صنع 100% في تونس ",
    backToHome: "العودة للرئيسية",
    totalTND: "المجموع بالدينار التونسي (د.ت)",
    checkout: "تأكيد الطلب",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() =>{
    try {
      const saved = localStorage.getItem("omnis_lang") as Language | null;
      if (saved && (saved === "fr" || saved === "ar")) {
        setLanguageState(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  const setLanguage = (lang: Language) =>{
    setLanguageState(lang);
    try {
      localStorage.setItem("omnis_lang", lang);
    } catch {
      // Ignore
    }
    // Update html dir attribute
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", lang);
    }
  };

  const isRtl = language === "ar";
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
