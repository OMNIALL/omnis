"use client";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { StudyCard, ExamineBlock, ScienceDisclaimer } from "@/components/sections/ScienceSection";
import { useLanguage } from "@/context/LanguageContext";
import { studies } from "@/data/studies";
import { ORDER_HREF } from "@/config/site";

export default function ScienceClient() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const featured = studies.filter((s) => s.featured);
  const more = studies.filter((s) => !s.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        <Section
          eyebrow={isAr ? "الأبحاث" : "La recherche"}
          title={
            <span className="block">
              {isAr ? "الكافيين + L-théanine: شنوّة تقول الدراسات" : "Caféine + L-théanine : ce que disent les études"}
            </span>
          }
          intro={
            isAr
              ? "نحطّولك الدراسات كيف ما هي: شنوّة تجرّب، شنوّة لقاو، و الحدود متاعها. كل دراسة عندها لينك لـ PubMed."
              : "Les études telles qu'elles sont : ce qui a été testé, ce qui a été trouvé, et leurs limites. Chaque étude renvoie vers PubMed."
          }
        >
          <h2 className="heading-lg text-2xl text-ink mb-5">{isAr ? "الدراسات الأساسية" : "Études principales"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((s, i) => (
              <StudyCard key={s.id} study={s} index={i} />
            ))}
          </div>

          <h2 className="heading-lg text-2xl text-ink mt-14 mb-2">{isAr ? "دراسات أخرى" : "Autres études"}</h2>
          <p className="text-muted mb-5 max-w-2xl">
            {isAr
              ? "حتى الدراسات اللي نتائجها أقل إيجابية موجودة هنا — باش تشوف الصورة الكاملة."
              : "Y compris celles dont les résultats sont moins favorables — pour que tu aies l'image complète."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {more.map((s, i) => (
              <StudyCard key={s.id} study={s} index={i} />
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-6">
            <ExamineBlock />
            <ScienceDisclaimer />
          </div>

          <div className="mt-10 card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="heading-lg text-xl text-ink">
              {isAr ? "OMNIS FOCUS: 100 ملغ كافيين طبيعي + 180 ملغ L-théanine + B6 و B12." : "OMNIS FOCUS : 100 mg de caféine naturelle + 180 mg de L-théanine + B6 et B12."}
            </p>
            <Button href={ORDER_HREF}>{isAr ? "كوموندي · 39 DT" : "Je commande · 39 DT"}</Button>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
