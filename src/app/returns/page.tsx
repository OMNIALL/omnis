"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function ReturnsPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

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
          <span className="text-harissa">{isAr ? "سياسة الإرجاع" : "Retours & Garanties"}</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="label-sm px-3.5 py-1.5 rounded-full border-2 border-ink bg-sun text-ink text-xs inline-block mb-3">
            {isAr ? "ضمان الرضا والجودة" : "TRANQUILLITÉ & CONFIANCE"}
          </span>
          <h1
            className="heading-xl text-3xl sm:text-5xl text-ink uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isAr ? "سياسة الإرجاع والاستبدال" : "RETOURS & GARANTIES"}
          </h1>
          <p className="text-sm sm:text-base text-ink/70 mt-3 font-sans">
            {isAr
              ? "نحرص على رضاك التام عن كل علبة أومنيس. إليك شروط وضمانات منتجاتنا."
              : "Notre engagement pour garantir la sécurité et la conformité de chaque boîte reçue."}
          </p>
        </div>

        {/* Content Box */}
        <div
          className="p-8 sm:p-10 rounded-3xl border-3 bg-white space-y-6 text-sm text-ink/85 leading-relaxed font-sans"
          style={{ borderColor: "var(--ink)", boxShadow: "6px 6px 0 var(--ink)" }}
        >
          <div>
            <h2 className="heading-lg text-lg text-ink uppercase mb-2">
              {isAr ? "1. فحص الطرد عند الاستلام" : "1. VÉRIFICATION DU COLIS"}
            </h2>
            <p>
              {isAr
                ? "يتم تسليم منتجات أومنيس في عبوات محكمة الإغلاق. ننصح بالتأكد من سلامة العلبة وشريط الأمان عند استلامها من يد الموزع."
                : "Toutes nos pastilles sont scellées hermétiquement. Vous pouvez vérifier l'état extérieur de votre colis directement lors de la remise par le transporteur."}
            </p>
          </div>

          <div className="border-t border-ink/15 pt-5">
            <h2 className="heading-lg text-lg text-ink uppercase mb-2">
              {isAr ? "2. استبدال مجاني للمنتج التالف (خلال 48 ساعة)" : "2. REMPLACEMENT EN CAS DE DÉFAUT (SOUS 48H)"}
            </h2>
            <p>
              {isAr
                ? "في حال وصول علبة متضررة أو بها أي عيب في التغليف، اتصل بنا خلال 48 ساعة وسنقوم بإرسال علبة جديدة مجاناً على نفقتنا وبدون أي مصاريف إضافية."
                : "Si votre produit présente un défaut de fabrication ou un dommage survenu pendant le transport, contactez notre équipe sous 48h : nous vous expédierons un nouvel article gratuitement."}
            </p>
          </div>

          <div className="border-t border-ink/15 pt-5">
            <h2 className="heading-lg text-lg text-ink uppercase mb-2">
              {isAr ? "3. طبيعة المكملات الغذائية" : "3. SPÉCIFICITÉ DES COMPLÉMENTS ALIMENTAIRES"}
            </h2>
            <p>
              {isAr
                ? "لدواعي السلامة الصحية والنظافة، لا يمكن إرجاع العلب المفتوحة أو المستهلكة جزئياً إلا في حالة وجود خلل في الجودة مثبت."
                : "Conformément à la réglementation sanitaire sur les produits de nutrition et compléments, les boîtes ouvertes ou descellées ne peuvent faire l'objet d'un retour pour des raisons évidentes d'hygiène."}
            </p>
          </div>

          <div className="border-t border-ink/15 pt-5">
            <h2 className="heading-lg text-lg text-ink uppercase mb-2">
              {isAr ? "4. كيفية تقديم طلب استبدال" : "4. COMMENT FAIRE UNE RÉCLAMATION"}
            </h2>
            <p>
              {isAr
                ? "أرسل رسالة سريعة إلى hello@omnis.tn أو عبر الواتساب على 98456789 216+ مع صورة توضيحية ورقم طلبيتك، وسيتم الرد عليك في غضون ساعتين."
                : "Envoyez simplement une photo et votre numéro de commande (ex: TN-942810) à hello@omnis.tn ou sur WhatsApp au +216 98 456 789. Traitement sous 2h."}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
