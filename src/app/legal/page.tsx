"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

import { CONTACT_EMAIL, PHONE_DISPLAY } from "@/config/site";
export default function LegalPage() {
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
          <span className="text-harissa">{isAr ? "إشعار قانوني" : "Mentions Légales"}</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h1
            className="heading-xl text-3xl sm:text-5xl text-ink"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isAr ? "الإشعار القانوني والخصوصية" : "Mentions légales & confidentialité"}
          </h1>
          <p className="text-sm sm:text-base text-ink/70 mt-3 font-sans">
            {isAr
              ? "الشفافية وحماية بياناتك الشخصية في صلب التزامات علامة أومنيس في تونس."
              : "Informations légales relatives à la marque OMNIS et à la protection de vos données."}
          </p>
        </div>

        {/* Content Box */}
        <div
          className="p-8 sm:p-10 rounded-3xl border bg-white space-y-6 text-sm text-ink/85 leading-relaxed font-sans"
          style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-card)" }}
        >
          <div>
            <h2 className="heading-lg text-lg text-ink mb-2">
              {isAr ? "1. هوية الشركة والناشر" : "1. Éditeur du site"}
            </h2>
            <p>
              <strong>OMNIS Nutrition SARL</strong> — Société de droit tunisien enregistrée au Registre National des Entreprises (RNE).
              <br />
              Siège social : Les Berges du Lac 2, Tunis 1053, Tunisie.
              <br />
              Email : <a href={`mailto:${CONTACT_EMAIL}`} className="underline font-bold">{CONTACT_EMAIL}</a> | Téléphone : {PHONE_DISPLAY}.
            </p>
          </div>

          <div className="border-t border-ink/15 pt-5">
            <h2 className="heading-lg text-lg text-ink mb-2">
              {isAr ? "2. طبيعة المنتجات والاستخدام" : "2. Avertissement réglementaire"}
            </h2>
            <p className="p-4 rounded-xl bg-sun/20 border border-ink/20 font-bold text-xs text-ink">
               {isAr
                ? "منتجات أومنيس هي مكملات غذائية وليست أدوية. لا تعوض نظاماً غذائياً متنوعاً ومتوازناً أو نمط حياة صحي. يُنصح بعدم تجاوز الجرعة اليومية الموصى بها."
                : "Les produits OMNIS sont des compléments alimentaires déclarés et ne remplacent en aucun cas une alimentation saine, équilibrée et variée. Tenir hors de portée des jeunes enfants. Ne pas dépasser la dose conseillée."}
            </p>
          </div>

          <div className="border-t border-ink/15 pt-5">
            <h2 className="heading-lg text-lg text-ink mb-2">
              {isAr ? "3. حماية البيانات الشخصية" : "3. Protection des données personnelles"}
            </h2>
            <p>
              {isAr
                ? "تُستخدم البيانات التي تقدمها عند الطلب (الاسم، الهاتف، العنوان) حصرياً لمعالجة طلبيتك وتوصيلها، ولا يتم بيعها أو مشاركتها مع أي طرف ثالث لأغراض تسويقية."
                : "Les données collectées lors de votre commande (nom, téléphone, adresse) sont strictement réservées au traitement et à l'acheminement de votre colis par notre équipe logistique. Elles ne sont jamais cédées ni vendues à des tiers."}
            </p>
          </div>

          <div className="border-t border-ink/15 pt-5">
            <h2 className="heading-lg text-lg text-ink mb-2">
              {isAr ? "4. الملكية الفكرية والعلامة التجارية" : "4. Propriété intellectuelle"}
            </h2>
            <p>
              {isAr
                ? "جميع العلامات، الشعارات، الهوية البصرية والنصوص الموجودة على هذا الموقع هي ملكية حصرية لعلامة OMNIS ومحمية بموجب قوانين الملكية الفكرية في تونس."
                : "Le nom OMNIS, son logo, le design packaging 'Direction C – Pop Énergie', les graphismes et l'ensemble des textes sont la propriété exclusive d'OMNIS et protégés par les lois relatives à la propriété intellectuelle."}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
