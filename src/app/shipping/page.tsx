"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { governorates } from "@/data/products";

export default function ShippingPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/70">
          <Link href="/" className="hover:text-harissa transition-colors">
            {isAr ? "الرئيسية" : "Accueil"}
          </Link>
          <span>/</span>
          <span className="text-harissa">{isAr ? "التوصيل والشحن" : "Livraison"}</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="label-sm px-3.5 py-1.5 rounded-full border border-line bg-paper text-ink text-xs inline-block mb-3">
            {isAr ? "توصيل سريع وموثوق " : "EXPÉDITION EXPRESS "}
          </span>
          <h1
            className="heading-xl text-3xl sm:text-5xl text-ink"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isAr ? "التوصيل في تونس" : "Livraison en Tunisie"}
          </h1>
          <p className="text-sm sm:text-base text-ink/70 mt-3 font-sans">
            {isAr
              ? "نوصل منتجات أومنيس إلى باب منزلك في كافة الـ 24 ولاية تونسية مع ميزة الدفع عند الاستلام."
              : "Toutes les informations sur nos délais, nos tarifs et le déroulement de votre livraison."}
          </p>
        </div>

        {/* 3 Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div
            className="p-6 rounded-3xl border bg-white"
            style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-card)" }}
          >
            <span className="text-3xl mb-2 block"></span>
            <h3 className="heading-lg text-base text-ink mb-1">
              {isAr ? "المدة : 24 إلى 48 ساعة" : "Délais : 24 à 48h"}
            </h3>
            <p className="text-xs text-ink/75 leading-relaxed">
              {isAr
                ? "تجهيز وشحن الطلبيات يتم خلال 24 ساعة لضمان وصولها السريع."
                : "Les commandes sont préparées et expédiées sous 24h."}
            </p>
          </div>

          <div
            className="p-6 rounded-3xl border bg-paper"
            style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-card)" }}
          >
            <span className="text-3xl mb-2 block"></span>
            <h3 className="heading-lg text-base text-ink mb-1">
              {isAr ? "التوصيل : 7 د.ت · مجاني من علبتين" : "LIVRAISON : 7 TND · OFFERTE DÈS 2 FLACONS"}
            </h3>
            <p className="text-xs text-ink/75 leading-relaxed">
              {isAr
                ? "نفس السوم لكل الولايات، و مجاني كي تاخو علبتين ولا أكثر."
                : "Même tarif partout en Tunisie, offert dès 2 flacons."}
            </p>
          </div>

          <div
            className="p-6 rounded-3xl border bg-white"
            style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-card)" }}
          >
            <span className="text-3xl mb-2 block"></span>
            <h3 className="heading-lg text-base text-ink mb-1">
              {isAr ? "الدفع عند الاستلام" : "Paiement à la livraison"}
            </h3>
            <p className="text-xs text-ink/75 leading-relaxed">
              {isAr
                ? "تدفع للموزع نقداً عند فتح واستلام طردك بيدك."
                : "Réglez directement en espèces au livreur lors de la remise en main propre."}
            </p>
          </div>
        </div>

        {/* Governorates Covered */}
        <div
          className="p-8 sm:p-10 rounded-3xl border bg-white mb-12"
          style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-card)" }}
        >
          <h2
            className="heading-lg text-xl text-ink mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isAr ? "الولايات المشمولة بالتوصيل (24 ولاية)" : "GOUVERNORATS COUVERTS (LES 24 RÉGIONS)"}
          </h2>
          <p className="text-xs text-ink/70 mb-6 font-sans">
            {isAr
              ? "نغطي كافة المدن والمعتمديات والقرى التونسية عبر شبكة نقل موثوقة :"
              : "Notre partenaire de transport dessert l'intégralité des délégations tunisiennes :"}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {governorates.map((gov) => (
              <span
                key={gov}
                className="px-3 py-1.5 rounded-xl border border-ink/30 bg-cream text-xs font-bold text-ink text-center"
              >
                {gov}
              </span>
            ))}
          </div>
        </div>

        {/* Live track link */}
        <div className="text-center p-8 rounded-3xl border bg-sun/40 border-ink">
          <h3 className="heading-lg text-lg text-ink mb-2">
            {isAr ? "هل لديك طلبية جارية بالفعل ؟" : "Tu as déjà une commande en cours ?"}
          </h3>
          <p className="text-xs text-ink/75 mb-5">
            {isAr
              ? "يمكنك متابعة حالة شحنتها خطوة بخطوة في الوقت الحقيقي."
              : "Suis l'avancement de ton colis en direct avec ton numéro de commande ou téléphone."}
          </p>
          <Link href="/track" className="btn-sticker btn-primary text-xs px-6 py-3">
            {isAr ? "تتبع طلبيتك الآن ←" : "Accéder au suivi en direct →"}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
