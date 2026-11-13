"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { whatsappLink } from "@/config/site";
import { DELIVERY_TIME } from "@/lib/pricing";
import type { PlacedOrder } from "@/lib/placeOrder";

/** Thank-you screen: order recap + WhatsApp confirmation (cuts COD refusals) + tracking. */
export default function OrderSuccess({ order }: { order: PlacedOrder }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const summary = order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ");
  const confirmText = `Bonjour OMNIS, je confirme ma commande ${order.id} (${summary}, ${order.total} DT, paiement à la livraison). Nom : ${order.fullName}. Adresse : ${order.address}${order.city ? ", " + order.city : ""} (${order.governorate}).`;

  const rows: [string, React.ReactNode][] = [
    [isAr ? "المنتوج" : "Produits", summary],
    [isAr ? "الاسم" : "Destinataire", order.fullName],
    [isAr ? "التليفون" : "Téléphone", <span key="p" dir="ltr">{order.phone}</span>],
    [isAr ? "العنوان" : "Adresse", `${order.address}${order.city ? `, ${order.city}` : ""} (${order.governorate})`],
    [
      isAr ? "تخلّص كي توصلك" : "À payer au livreur",
      `${order.total} DT${order.shippingFee === 0 ? (isAr ? " · التوصيل مجاني" : " · livraison offerte") : ""}`,
    ],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-2xl mx-auto p-6 sm:p-10 my-4 sm:my-8"
    >
      <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-4" strokeWidth={1.5} />
      <p className="eyebrow mb-2">{isAr ? "تسجّلت الكوموند" : "Commande enregistrée"}</p>
      <h1 className="heading-xl text-3xl sm:text-4xl text-ink mb-2">
        {isAr ? "مبروك! الـ FOCUS متاعك في الثنية." : "Merci ! Ton FOCUS est en route."}
      </h1>
      <p className="text-muted mb-6">
        {isAr ? "رقم الكوموند: " : "Numéro de commande : "}
        <span className="font-mono font-semibold text-ink" dir="ltr">{order.id}</span>
      </p>

      {/* WhatsApp confirmation — the #1 lever against COD refusals */}
      <div className="rounded-2xl bg-cream border border-line p-5 mb-6">
        <p className="font-semibold text-ink mb-1">
          {isAr ? "آخر خطوة: أكّد الكوموند على الواتساب" : "Dernière étape : confirme ta commande sur WhatsApp"}
        </p>
        <p className="text-sm text-muted mb-4">
          {isAr
            ? "ابعثلنا الميساج الجاهز، و نبعثو الكوموند متاعك في أسرع وقت."
            : "Envoie-nous le message pré-rempli : les commandes confirmées partent en priorité."}
        </p>
        <a
          href={whatsappLink(confirmText)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sticker w-full"
          style={{ backgroundColor: "#25D366", color: "#0B3D1F" }}
        >
          <MessageCircle className="w-5 h-5" strokeWidth={2} />
          {isAr ? "أكّد على الواتساب" : "Confirmer sur WhatsApp"}
        </a>
      </div>

      <dl className="divide-y divide-line border-y border-line text-sm mb-4">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-3">
            <dt className="text-muted">{k}</dt>
            <dd className="font-medium text-ink text-end">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="text-sm text-muted mb-8">
        {isAr
          ? `الليفرور باش يكلّمك قبل ما يوصل (${DELIVERY_TIME.ar}).`
          : `Le livreur t'appelle avant de passer (${DELIVERY_TIME.fr}).`}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={`/track?id=${order.id}`} className="btn-sticker btn-secondary">
          {isAr ? "تابع الكوموند" : "Suivre ma commande"}
        </Link>
        <Link href="/" className="btn-sticker btn-outline">
          {isAr ? "رجوع للرئيسية" : "Retour à l'accueil"}
        </Link>
      </div>
    </motion.div>
  );
}
