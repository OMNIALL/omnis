"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

import { ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL, PHONE_DISPLAY } from "@/config/site";
import { GUARANTEE, GUARANTEE_ACTIVE } from "@/config/offer";

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
          <span className="text-harissa">{isAr ? "الإرجاع و الضمانات" : "Retours & garanties"}</span>
        </div>

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="label-sm px-3.5 py-1.5 rounded-full border border-line bg-paper text-ink text-xs inline-block mb-3">
            {isAr ? "تشري و انت مرتاح" : "Commande l'esprit tranquille"}
          </span>
          <h1 className="heading-xl text-3xl sm:text-5xl text-ink" style={{ fontFamily: "var(--font-heading)" }}>
            {isAr ? "الإرجاع و الضمانات" : "Retours & garanties"}
          </h1>
          <p className="text-sm sm:text-base text-ink/70 mt-3 font-sans">
            {isAr
              ? "تخلّص كي توصلك، و كان فما مشكل نلقاولو حل."
              : "Tu paies à la livraison, et si quelque chose ne va pas, on trouve une solution."}
          </p>
        </div>

        <div
          className="p-8 sm:p-10 rounded-3xl border bg-white space-y-6 text-sm text-ink/85 leading-relaxed font-sans"
          style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-card)" }}
        >
          {GUARANTEE_ACTIVE && (
            <div id="garantie" className="scroll-mt-28 rounded-2xl bg-cream border border-line p-5">
              <h2 className="heading-lg text-lg text-ink mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-harissa" strokeWidth={1.75} />
                {isAr ? "ضمان العلبة المسكّرة" : "La garantie flacon scellé"}
              </h2>
              <p className="text-base text-ink mb-2">{isAr ? GUARANTEE.line.ar : GUARANTEE.line.fr}</p>
              <p>{isAr ? GUARANTEE.terms.ar : GUARANTEE.terms.fr}</p>
              <p className="mt-2">
                {isAr
                  ? "باش تستعملها: ابعثلنا على الواتساب رقم الكوموند متاعك، و نقولولك كيفاش ترجّع العلبة."
                  : "Pour l'utiliser : envoie ton numéro de commande sur WhatsApp, on t'explique comment renvoyer le flacon."}
              </p>
            </div>
          )}

          <div className={GUARANTEE_ACTIVE ? "border-t border-ink/15 pt-5" : ""}>
            <h2 className="heading-lg text-lg text-ink mb-2">{isAr ? "1. ثبّت في الكوليه" : "1. Vérifie ton colis"}</h2>
            <p>
              {isAr
                ? "كل علبة مسكّرة بشريط أمان. تنجّم تثبّت في الكوليه قدّام الليفرور قبل ما تخلّص."
                : "Chaque flacon est scellé. Tu peux vérifier l'état du colis devant le livreur, avant de payer."}
            </p>
          </div>

          <div className="border-t border-ink/15 pt-5">
            <h2 className="heading-lg text-lg text-ink mb-2">
              {isAr ? "2. كوليه مكسّر ولا فيه عيب" : "2. Colis abîmé ou défaut"}
            </h2>
            <p>
              {isAr
                ? "كان العلبة وصلت مكسّرة ولا فيها عيب، ابعثلنا تصويرة على الواتساب في 48 ساعة، و نبعثولك علبة أخرى ببلاش."
                : "Si ton flacon arrive abîmé ou présente un défaut, envoie-nous une photo sur WhatsApp sous 48h : on t'en renvoie un gratuitement."}
            </p>
          </div>

          <div className="border-t border-ink/15 pt-5">
            <h2 className="heading-lg text-lg text-ink mb-2">
              {isAr ? "3. العلب المحلولة" : "3. Flacons ouverts"}
            </h2>
            <p>
              {isAr
                ? "على خاطر النظافة و السلامة، العلب المحلولة ما ترجعش، إلا كان فيها عيب في الجودة."
                : "Pour des raisons d'hygiène, un flacon ouvert ne peut pas être repris, sauf défaut de qualité."}
              {GUARANTEE_ACTIVE &&
                (isAr
                  ? " هذا علاش الضمان متاعنا يخدم بالعلبة الثانية المسكّرة."
                  : " C'est pour ça que notre garantie porte sur le second flacon, encore scellé.")}
            </p>
          </div>

          <div className="border-t border-ink/15 pt-5">
            <h2 className="heading-lg text-lg text-ink mb-2">{isAr ? "4. كيفاش تكلّمنا" : "4. Nous contacter"}</h2>
            <p>
              {isAr
                ? `ابعث رقم الكوموند (مثال TN-942810) و تصويرة كان لزم على الواتساب ${PHONE_DISPLAY} ولا على ${CONTACT_EMAIL}.`
                : `Envoie ton numéro de commande (ex. TN-942810) et une photo si besoin, sur WhatsApp au ${PHONE_DISPLAY} ou à ${CONTACT_EMAIL}.`}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
