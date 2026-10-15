"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerCircle from "@/components/StickerCircle";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/70">
          <Link href="/" className="hover:text-harissa transition-colors">
            {isAr ? "الرئيسية" : "Accueil"}
          </Link>
          <span>/</span>
          <span className="text-harissa">{isAr ? "قصتنا" : "Notre histoire"}</span>
        </div>

        {/* Hero Banner */}
        <div
          className="rounded-3xl p-8 sm:p-14 mb-12 border-3 text-center relative overflow-hidden"
          style={{
            backgroundColor: "var(--sun)",
            borderColor: "var(--ink)",
            boxShadow: "8px 8px 0 var(--ink)",
          }}
        >
          <span className="label-sm px-3.5 py-1.5 rounded-full border-2 border-ink bg-cream text-ink text-xs inline-block mb-4">
            {isAr ? "صنع بكل فخر في تونس 🇹🇳" : "MADE IN TUNISIA 🇹🇳"}
          </span>
          <h1
            className="heading-xl text-3xl sm:text-6xl text-ink uppercase max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isAr ? "OMNI = الكل. S = مكمل غذائي." : "OMNI = TOUT. S = SUPPLÉMENT."}
          </h1>
          <p className="text-base sm:text-lg text-ink/80 mt-4 max-w-xl mx-auto font-sans leading-relaxed">
            {isAr
              ? "علامة تونسية شابة وعصرية تعيد ابتكار عالم المكملات الغذائية لتمنحك التركيز والطاقة بدون ملل وبدون أي آثار جانبية."
              : "La marque tunisienne qui réinvente les compléments alimentaires avec un style pop, des dosages précis et zéro compromis."}
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 text-sm sm:text-base text-ink/85 leading-relaxed font-sans">
            <h2
              className="heading-xl text-2xl sm:text-4xl text-ink uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isAr ? "لماذا أطلقنا أومنيس ؟" : "POURQUOI OMNIS ?"}
            </h2>
            <p>
              {isAr
                ? "في تونس، اعتدنا على استهلاك قهوة تلو الأخرى طوال اليوم، مهدورين أموالنا على كبسولات ومشروبات طاقة مليئة بالسكر وتسبب الهبوط بعد ساعات قليلة."
                : "Entre les espressos à répétition, les boissons énergisantes pleines de sucre et les compléments pharmaceutiques insipides importés à prix d'or, il manquait une alternative intelligente."}
            </p>
            <p>
              {isAr
                ? "أردنا حلاً عصرياً ولذيذاً : حلوى مضغ مبتكرة تجمع بين الل-ثيانين (مستخلص الشاي الأخضر) والكافيين الطبيعي بنسب علمية مدروسة تمنحك تركيزاً فائقاً يدوم ساعات دون أي ارتعاش أو هبوط."
                : "Nous avons formulé OMNIS avec les meilleurs nootropiques reconnus par la science : l'alliance parfaite de la L-Théanine et de la Caféine, enrichie en vitamines B6 et B12 pour nourrir ton cerveau."}
            </p>
            <div className="p-5 rounded-2xl border-2 border-ink bg-white font-bold text-ink">
              💡 {isAr ? "مهمتنا : تركيز نقي، طاقة متوازنة، ومذاق ممتع في متناول كل التونسيين." : "Notre mission : une énergie propre, une concentration laser et un goût pop fabriqué localement."}
            </div>
          </div>

          {/* Visual Sticker Composition */}
          <div className="flex items-center justify-center p-8">
            <StickerCircle size={220} color="var(--harissa)" shadow={true} innerRing={true} rotate={-3}>
              <div className="text-center text-cream">
                <span className="heading-xl text-3xl block" style={{ fontFamily: "var(--font-heading)" }}>
                  OMNIS
                </span>
                <span className="text-xs font-bold text-sun uppercase tracking-widest mt-1 block">
                  TUNISIE 🇹🇳
                </span>
              </div>
            </StickerCircle>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🔬",
              title: isAr ? "دقة علمية في الجرعات" : "DOSAGES PRÉCIS",
              desc: isAr ? "180 مجم ل-ثيانين و 80 مجم كافيين لفاعلية قصوى مضمونة." : "180 mg de L-Théanine et 80 mg de caféine pure : le ratio parfait.",
              bg: "var(--cream)",
            },
            {
              icon: "🇹🇳",
              title: isAr ? "صناعة محلية 100%" : "100% FABRIQUÉ EN TUNISIE",
              desc: isAr ? "من الفكرة حتى التغليف في معامل تونسية مطابقة للمعايير الصحية." : "De la formulation au packaging, tout est produit dans nos ateliers tunisiens.",
              bg: "var(--sun)",
            },
            {
              icon: "🍬",
              title: isAr ? "نكهة منعشة ولذيذة" : "GOÛT POP FRUITÉ",
              desc: isAr ? "قرص مضغ لذيذ تأخذه معك أينما كنت بدون الحاجة للماء." : "À croquer ou laisser fondre. Un goût gourmand que tu auras plaisir à prendre.",
              bg: "var(--sky)",
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-3xl border-3"
              style={{
                backgroundColor: pillar.bg,
                borderColor: "var(--ink)",
                boxShadow: "5px 5px 0 var(--ink)",
              }}
            >
              <span className="text-3xl mb-3 block">{pillar.icon}</span>
              <h3 className="heading-lg text-lg text-ink uppercase mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink/75 leading-relaxed font-sans">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
