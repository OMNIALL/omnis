"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerCircle from "@/components/StickerCircle";
import { useLanguage } from "@/context/LanguageContext";

import { CONTACT_EMAIL, PHONE_DISPLAY, phoneLink, whatsappLink } from "@/config/site";
export default function ContactPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Question produit",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault();
    setLoading(true);
    setTimeout(() =>{
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "Question produit", message: "" });
    }, 800);
  };

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
          <span className="text-harissa">{isAr ? "اتصل بنا" : "Contact"}</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="label-sm px-3.5 py-1.5 rounded-full border border-line bg-paper text-ink text-xs inline-block mb-3">
            {isAr ? "نحن في الاستماع دائماً " : "À TON ÉCOUTE "}
          </span>
          <h1
            className="heading-xl text-3xl sm:text-5xl text-ink"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isAr ? "تواصل مع فريق أومنيس" : "Contacte l'équipe OMNIS"}
          </h1>
          <p className="text-sm sm:text-base text-ink/70 mt-3 font-sans">
            {isAr
              ? "هل لديك سؤال حول منتجاتنا، جرعاتها، أو طلبيتك الحالية؟ فريقنا في تونس يجيبك في أسرع وقت."
              : "Une question sur la composition de FOCUS, un partenariat ou le suivi de ta livraison ? On te répond avec le sourire sous 24h."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Form (7 cols) */}
          <div
            className="lg:col-span-7 p-6 sm:p-10 rounded-3xl border bg-white"
            style={{
              borderColor: "var(--line)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h2
              className="heading-lg text-xl text-ink mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isAr ? "أرسل لنا رسالة" : "Envoie-nous un message"}
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl border border-line bg-sun/30 text-center space-y-4"
              >
                <StickerCircle size={80} color="var(--sun)" shadow={true} innerRing={true} className="mx-auto">
                  <span className="text-3xl"></span>
                </StickerCircle>
                <h3 className="heading-lg text-xl text-ink">
                  {isAr ? "تم إرسال رسالتك بنجاح !" : "Message bien reçu !"}
                </h3>
                <p className="text-sm text-ink/80 max-w-md mx-auto">
                  {isAr
                    ? "شكراً لك. سيقوم أحد أعضاء فريقنا بالتواصل معك عبر الهاتف أو البريد الإلكتروني خلال 24 ساعة."
                    : "Merci ! Notre équipe tunisienne te répondra par email ou WhatsApp d'ici quelques heures."}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-sticker btn-secondary text-xs px-6 py-2.5 mt-2"
                >
                  {isAr ? "إرسال رسالة أخرى" : "Envoyer un autre message"}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                      {isAr ? "الاسم الكامل *" : "Nom & Prénom *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isAr ? "مثال: أمين بن سالم" : "Ex: Amina Ben Salem"}
                      className="w-full px-4 py-3 rounded-xl border border-line text-sm bg-cream/40 focus:outline-none focus:ring-2 focus:ring-harissa font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                      {isAr ? "رقم الهاتف *" : "Numéro de téléphone *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ex: 98 123 456"
                      className="w-full px-4 py-3 rounded-xl border border-line text-sm bg-cream/40 focus:outline-none focus:ring-2 focus:ring-harissa font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                      {isAr ? "البريد الإلكتروني *" : "Adresse Email *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ton@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-line text-sm bg-cream/40 focus:outline-none focus:ring-2 focus:ring-harissa font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                      {isAr ? "الموضوع" : "Objet du message"}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-line text-sm bg-cream/40 focus:outline-none focus:ring-2 focus:ring-harissa font-bold cursor-pointer"
                    >
                      <option value="Question produit">{isAr ? "سؤال حول المنتج FOCUS" : "Question sur le produit FOCUS"}</option>
                      <option value="Suivi commande">{isAr ? "تتبع طلبيتي الحالية" : "Suivi de ma commande"}</option>
                      <option value="Distribution">{isAr ? "توزيع وشراكات في تونس" : "Devenir revendeur / Partenariat"}</option>
                      <option value="Autre">{isAr ? "موضوع آخر" : "Autre demande"}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                    {isAr ? "رسالتك بالتفصيل *" : "Ton message *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isAr
                        ? "اكتب استفسارك هنا بكل وضوح..."
                        : "Comment pouvons-nous t'aider aujourd'hui ?"
                    }
                    className="w-full px-4 py-3 rounded-xl border border-line text-sm bg-cream/40 focus:outline-none focus:ring-2 focus:ring-harissa font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-sticker btn-primary w-full py-4 text-sm font-bold uppercase tracking-wider"
                >
                  {loading
                    ? (isAr ? "جاري الإرسال..." : "Envoi en cours...")
                    : (isAr ? "إرسال الرسالة ←" : "Envoyer mon message →")}
                </button>
              </form>
            )}
          </div>

          {/* Right: Quick Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* WhatsApp Card */}
            <div
              className="p-6 rounded-3xl border bg-[#E7F8EE]"
              style={{
                borderColor: "var(--line)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full bg-emerald-500 border border-line flex items-center justify-center text-xl text-white">
                  
                </span>
                <div>
                  <h3 className="font-black text-sm uppercase text-ink">
                    WhatsApp support
                  </h3>
                  <p className="text-xs text-ink/70">
                    {isAr ? "رد فوري عبر واتساب" : "Réponse immédiate en direct"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-ink/80 leading-relaxed mb-4">
                {isAr
                  ? "تحب إجابة سريعة على سؤالك؟ فريقنا متواجد على الواتساب لمساعدتك في أي وقت."
                  : "Besoin d'une réponse rapide ? Écris-nous directement sur WhatsApp pour toute question commande ou livraison."}
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sticker w-full py-2.5 text-xs font-bold text-center justify-center bg-emerald-500 text-white border border-line hover:bg-emerald-600 block"
              >
                {isAr ? `فتح محادثة واتساب (${PHONE_DISPLAY})` : `Discuter sur WhatsApp (${PHONE_DISPLAY})`}
              </a>
            </div>

            {/* Direct Phone & Office */}
            <div
              className="p-6 rounded-3xl border bg-white"
              style={{
                borderColor: "var(--line)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h3
                className="heading-lg text-base text-ink mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {isAr ? "معلومات الاتصال المباشر" : "Infos pratiques"}
              </h3>

              <div className="space-y-4 text-xs font-bold text-ink">
                <div className="flex items-start gap-3">
                  <span className="text-lg"></span>
                  <div>
                    <span className="text-[0.65rem] text-muted uppercase block">
                      {isAr ? "الهاتف" : "Téléphone"}
                    </span>
                    <a href={phoneLink} className="hover:text-harissa transition-colors font-mono font-black text-sm">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg"></span>
                  <div>
                    <span className="text-[0.65rem] text-muted uppercase block">
                      {isAr ? "البريد الإلكتروني" : "Email"}
                    </span>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-harissa transition-colors font-bold text-sm">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg"></span>
                  <div>
                    <span className="text-[0.65rem] text-muted uppercase block">
                      {isAr ? "المقر والمختبر" : "Laboratoire & Siège"}
                    </span>
                    <p className="font-bold text-xs leading-snug">
                      OMNIS Labs, Les Berges du Lac 2, Tunis 1053, Tunisie 
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-ink/15">
                  <span className="text-lg"></span>
                  <div>
                    <span className="text-[0.65rem] text-muted uppercase block">
                      {isAr ? "ساعات العمل" : "Horaires de service"}
                    </span>
                    <p className="font-medium text-xs text-ink/80">
                      {isAr ? "الاثنين إلى السبت : 09:00 - 18:00" : "Du Lundi au Samedi : 09h00 – 18h00"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
