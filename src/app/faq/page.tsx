"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    {
      q: isAr ? "ما هو أومنيس (OMNIS) بالتحديد ؟" : "C'est quoi OMNIS exactement ?",
      a: isAr
        ? "أومنيس هي علامة تونسية مبتكرة متخصصة في المكملات الغذائية على شكل حلوى مضغ لذيذة. منتجنا الأول FOCUS يجمع بين الل-ثيانين والكافيين الطبيعي وفيتامينات B6 و B12 لدعم تركيزك وطاقتك الذهنية."
        : "OMNIS est une marque tunisienne de compléments alimentaires sous forme de pastilles à croquer. Notre formule FOCUS allie L-Théanine, Caféine et Vitamines B6/B12 pour un boost de concentration net et sans crash.",
    },
    {
      q: isAr ? "أين يتم تصنيع منتجات أومنيس ؟" : "Où les produits OMNIS sont-ils fabriqués ?",
      a: isAr
        ? "في تونس 100% 🇹🇳 ! يتم تصنيع وتعبئة كل علبة في مختبرات ومعامل تونسية خاضعة لمعايير السلامة والجودة الغذائية المعمول بها."
        : "Tous nos produits sont conçus, formulés et emballés en Tunisie 🇹🇳, dans des ateliers certifiés conformes aux normes d'hygiène et de sécurité sanitaire les plus strictes.",
    },
    {
      q: isAr ? "كيف أتناول أقراص FOCUS ؟" : "Comment dois-je consommer FOCUS ?",
      a: isAr
        ? "تناول قرصاً واحداً للمضغ في الصباح أو قبل بدء جلسة دراسة أو عمل تتطلب تركيزاً عالياً. يمنحك مفعولاً يدوم من 4 إلى 6 ساعات. لا تتجاوز قرصين يومياً."
        : "Croque ou laisse fondre 1 pastille le matin ou 20 minutes avant une session de travail intense. L'effet dure 4 à 6 heures. Ne dépasse pas 2 pastilles par jour.",
    },
    {
      q: isAr ? "ما هي تكلفة ومدة التوصيل في تونس ؟" : "Quels sont les délais et tarifs de livraison en Tunisie ?",
      a: isAr
        ? "نوصل لجميع الـ 24 ولاية تونسية خلال 24 إلى 48 ساعة فقط. معلوم التوصيل ثابت : 7 دنانير تونسية. والدفع يتم نقداً عند الاستلام."
        : "Nous livrons partout en Tunisie (les 24 gouvernorats) sous 24 à 48 heures ouvrées. Le tarif de livraison est fixé à 7 TND. Le paiement se fait en espèces au livreur à la réception.",
    },
    {
      q: isAr ? "هل توجد أي آثار جانبية أو أرق ؟" : "Y a-t-il des effets secondaires ou des tremblements ?",
      a: isAr
        ? "بفضل جرعة الل-ثيانين (180 مجم) المتوازنة مع الكافيين (80 مجم)، تم تصميم FOCUS ليلغي تماماً خفقان القلب أو التوتر أو الارتعاش الذي قد تسببه القهوة التقليدية."
        : "Non. Grâce à la synergie de la L-Théanine (180 mg) qui module l'effet stimulant de la caféine (80 mg), tu bénéficies d'un focus limpide sans palpitations, sans nervosité et sans le coup de barre de 16h.",
    },
    {
      q: isAr ? "ماذا أفعل إذا واجهت مشكلة في طلبيتي ؟" : "Comment contacter le service client en cas de problème ?",
      a: isAr
        ? "فريقنا متواجد دائماً ! يمكنك التواصل معنا عبر صفحة 'اتصل بنا' أو مباشرة على الواتساب على الرقم 98456789 216+ لخدمتك فورا."
        : "Notre service client basé à Tunis est joignable 6j/7 via notre page contact, par email à hello@omnis.tn ou directement sur WhatsApp au +216 98 456 789.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/70">
          <Link href="/" className="hover:text-harissa transition-colors">
            {isAr ? "الرئيسية" : "Accueil"}
          </Link>
          <span>/</span>
          <span className="text-harissa">{isAr ? "الأسئلة الشائعة" : "FAQ"}</span>
        </div>

        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="label-sm px-3.5 py-1.5 rounded-full border-2 border-ink bg-sun text-ink text-xs inline-block mb-3">
            {isAr ? "كل ما تود معرفته" : "TOUTES TES RÉPONSES"}
          </span>
          <h1
            className="heading-xl text-3xl sm:text-5xl text-ink uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isAr ? "الأسئلة المتكررة" : "FOIRE AUX QUESTIONS"}
          </h1>
          <p className="text-sm sm:text-base text-ink/70 mt-3 font-sans max-w-lg mx-auto">
            {isAr
              ? "إليك إجابات واضحة ومباشرة عن التركيبة، التوصيل، وكيفية الاستفادة القصوى من أومنيس."
              : "Des explications simples, honnêtes et sans détour sur OMNIS et nos pastilles."}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4 mb-16">
          {questions.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border-3 overflow-hidden transition-all"
              style={{
                borderColor: "var(--ink)",
                backgroundColor: openIndex === i ? "var(--sun)" : "white",
                boxShadow: openIndex === i ? "6px 6px 0 var(--ink)" : "4px 4px 0 var(--ink)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-black text-sm sm:text-base text-ink"
              >
                <span>{item.q}</span>
                <span
                  className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center text-sm font-black shrink-0 transition-transform duration-200"
                  style={{
                    backgroundColor: openIndex === i ? "var(--ink)" : "var(--cream)",
                    color: openIndex === i ? "var(--sun)" : "var(--ink)",
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-ink/80 leading-relaxed font-sans border-t border-ink/15 pt-3">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div
          className="p-8 rounded-3xl border-3 bg-white text-center"
          style={{
            borderColor: "var(--ink)",
            boxShadow: "6px 6px 0 var(--ink)",
          }}
        >
          <h3 className="heading-lg text-lg sm:text-xl text-ink uppercase mb-2">
            {isAr ? "لم تجد إجابة لسؤالك ؟" : "TU AS ENCORE UNE QUESTION ?"}
          </h3>
          <p className="text-xs sm:text-sm text-ink/70 mb-5">
            {isAr
              ? "فريقنا متواجد للرد عليك فوراً عبر صفحة الاتصال أو على الواتساب."
              : "Notre équipe est disponible pour te guider et répondre à toutes tes interrogations."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-sticker btn-primary text-xs px-6 py-2.5">
              {isAr ? "صفحة الاتصال" : "Contacter l'équipe"}
            </Link>
            <a
              href="https://wa.me/21698456789"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sticker btn-secondary text-xs px-6 py-2.5"
            >
              WhatsApp (+216 98 456 789)
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
