"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerCircle from "@/components/StickerCircle";
import { useLanguage } from "@/context/LanguageContext";

export default function IngredientsPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const items = [
    {
      name: "L-THÉANINE",
      nameAr: "ل-ثيانين",
      dosage: "180 MG",
      color: "var(--sun)",
      icon: "🍵",
      role: isAr ? "استرخاء ذهني بدون نعاس" : "Calme & Clarté mentale",
      desc: isAr
        ? "حمض أميني طبيعي متواجد في أوراق الشاي الأخضر الممتاز. يقلل التوتر العصبي ويمنحك حالة من الهدوء والتركيز العميق (Alpha brain waves)."
        : "Acide aminé naturel extrait des feuilles de thé vert. Il favorise un état de vigilance calme et atténue complètement la nervosité liée à la caféine.",
    },
    {
      name: "CAFÉINE NATURELLE",
      nameAr: "كافيين طبيعي",
      dosage: "80 MG",
      color: "var(--cream)",
      icon: "☕",
      role: isAr ? "يقظة ونشاط فوري" : "Vigilance & Énergie nette",
      desc: isAr
        ? "جرعة متوازنة ومضبوطة تعادل فنجان قهوة إسبريسو غني. ترفع من سرعة الاستجابة وتحفز الجهاز العصبي للعمل بكفاءة تامة."
        : "Équivalent à un expresso de qualité. Stimule la vivacité d'esprit, améliore le temps de réaction sans surdosage nocif.",
    },
    {
      name: "VITAMINE B6",
      nameAr: "فيتامين B6",
      dosage: "1.4 MG (100% AJR)",
      color: "var(--sky)",
      icon: "🧬",
      role: isAr ? "دعم الجهاز العصبي" : "Métabolisme & Système nerveux",
      desc: isAr
        ? "فيتامين أساسي يساهم في تصنيع النواقل العصبية (الدوبامين والسيروتونين) ويساعد في مكافحة التعب والإرهاق الفكري."
        : "Contribue au bon fonctionnement du système nerveux et à la synthèse normale des neurotransmetteurs de l'énergie et de l'humeur.",
    },
    {
      name: "VITAMINE B12",
      nameAr: "فيتامين B12",
      dosage: "2.5 µG (100% AJR)",
      color: "var(--harissa)",
      textColor: "var(--cream)",
      icon: "⚡",
      role: isAr ? "مكافحة التعب الذهني" : "Réduction de la fatigue",
      desc: isAr
        ? "عنصر حيوي لتحويل الغذاء إلى طاقة خلوية حقيقية، والحفاظ على كفاءة الذاكرة والأداء الإدراكي العالي طوال اليوم."
        : "Essentielle à la production d'énergie cellulaire et au maintien des fonctions cognitives optimales tout au long de la journée.",
    },
  ];

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
          <span className="text-harissa">{isAr ? "المكونات" : "Ingrédients"}</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="label-sm px-3.5 py-1.5 rounded-full border-2 border-ink bg-sun text-ink text-xs inline-block mb-3">
            {isAr ? "شفافية مطلقة 100%" : "TRANSPARENCE TOTALE 100%"}
          </span>
          <h1
            className="heading-xl text-3xl sm:text-5xl text-ink uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isAr ? "المكونات الفعالة لـ FOCUS" : "CE QU'IL Y A DEDANS"}
          </h1>
          <p className="text-sm sm:text-base text-ink/70 mt-3 font-sans">
            {isAr
              ? "لا سكر زائد، لا مواد حافظة مشبوهة، فقط ما تحتاجه خلايا دماغك لتعمل في قمة طاقتها."
              : "Des molécules actives pures dosées avec rigueur pour décupler tes capacités sans crash."}
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {items.map((ing) => (
            <div
              key={ing.name}
              className="p-8 rounded-3xl border-3 flex flex-col justify-between"
              style={{
                backgroundColor: ing.color,
                color: ing.textColor || "var(--ink)",
                borderColor: "var(--ink)",
                boxShadow: "6px 6px 0 var(--ink)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{ing.icon}</span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 border-ink bg-white text-ink">
                    {ing.dosage}
                  </span>
                </div>

                <h2
                  className="heading-lg text-2xl mb-1 uppercase"
                  style={{ color: ing.textColor || "var(--ink)" }}
                >
                  {isAr ? ing.nameAr : ing.name}
                </h2>
                <span className="text-xs font-black uppercase tracking-wider opacity-70 block mb-4">
                  {ing.role}
                </span>

                <p className="text-sm sm:text-base leading-relaxed opacity-90 font-sans">
                  {ing.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-ink/20 flex items-center justify-between text-xs font-bold">
                <span>{isAr ? "مطابق لمعايير السلامة" : "Conforme aux normes sanitaires"}</span>
                <span>✓ Validé</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div
          className="p-8 sm:p-12 rounded-3xl border-3 bg-white text-center max-w-3xl mx-auto"
          style={{
            borderColor: "var(--ink)",
            boxShadow: "8px 8px 0 var(--ink)",
          }}
        >
          <StickerCircle size={80} color="var(--sun)" shadow={true} innerRing={true} className="mx-auto mb-4">
            <span className="text-3xl">⚡</span>
          </StickerCircle>
          <h3 className="heading-xl text-2xl sm:text-3xl text-ink uppercase mb-3">
            {isAr ? "جاهز لإشعال تركيزك ؟" : "PRÊT À TESTER L'EFFET FOCUS ?"}
          </h3>
          <p className="text-sm text-ink/75 max-w-md mx-auto mb-6">
            {isAr
              ? "اطلب علبتك الآن بـ 39 د.ت فقط مع توصيل سريع والدفع عند الاستلام."
              : "30 pastilles à croquer pour booster tes journées, tes sessions de travail ou tes révisions."}
          </p>
          <Link href="/products/focus" className="btn-sticker btn-primary px-8 py-3.5">
            {isAr ? "اطلب FOCUS الآن (39 د.ت)" : "Commander FOCUS (39 TND)"}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
