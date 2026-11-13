"use client";

import { useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import { governorates } from "@/data/products";
import { normalizeTunisianPhone } from "@/lib/phone";
import { OrderError, placeOrder, type PlacedOrder } from "@/lib/placeOrder";
import { useLanguage } from "@/context/LanguageContext";
import { whatsappLink } from "@/config/site";
import { getHeroVariant } from "@/lib/abTest";

interface Props {
  /** What is being ordered (prices are recomputed on the server). */
  items: { id: string; name: string; quantity: number }[];
  /** Total shown on the submit button. */
  total: number;
  onSuccess: (order: PlacedOrder) => void;
  /** Show the optional "notes for the courier" field. */
  showNotes?: boolean;
  id?: string;
  /** Called once, on the customer's first interaction with the form (funnel: "form start"). */
  onStart?: () => void;
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border text-base bg-white focus:outline-none focus:ring-2 focus:ring-harissa/40 focus:border-ink font-medium";

/** Minimal Cash-on-Delivery order form: name, phone, governorate, address. */
export default function CodOrderForm({ items, total, onSuccess, showNotes = false, id, onStart }: Props) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [form, setForm] = useState({ fullName: "", phone: "", governorate: "", address: "", notes: "" });
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hp, setHp] = useState(""); // honeypot — real people never see or fill it
  const startedAt = useRef(0); // first interaction time (anti-bot timing)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (k === "phone") setPhoneError("");
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const phoneMsg = isAr ? "رقم غير صحيح: 8 أرقام، مثال 98 123 456" : "Numéro invalide : 8 chiffres, ex. 98 123 456";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const order = await placeOrder({ ...form, hp_extra: hp, startedAt: startedAt.current, abVariant: getHeroVariant() }, items.map((i) => ({ id: i.id, quantity: i.quantity })), isAr);
      onSuccess(order);
    } catch (err) {
      if (err instanceof OrderError && err.field === "phone") setPhoneError(err.message);
      else setSubmitError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  };

  const waText = `Bonjour OMNIS, je veux commander : ${items.map((i) => `${i.quantity}× ${i.name}`).join(", ")} (${total} DT). Nom : ${form.fullName}. Tél : ${form.phone}. Adresse : ${form.address} (${form.governorate}).`;

  return (
    <form
      id={id}
      onSubmit={submit}
      onFocusCapture={() => {
        if (!startedAt.current) {
          startedAt.current = Date.now();
          onStart?.();
        }
      }}
      className="flex flex-col gap-3 scroll-mt-28"
      noValidate={false}
    >
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Ne pas remplir
          <input type="text" name="hp_extra" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5">
          {isAr ? "الاسم و اللقب *" : "Nom & prénom *"}
        </label>
        <input
          className={`${inputCls} border-ink/25`}
          name="fullName"
          autoComplete="name"
          required
          minLength={3}
          value={form.fullName}
          onChange={set("fullName")}
          placeholder={isAr ? "مثال: محمد بن صالح" : "Ex : Mohamed Ben Salah"}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5">
          {isAr ? "رقم التليفون *" : "Téléphone *"}
        </label>
        <input
          className={`${inputCls} ${phoneError ? "border-harissa" : "border-ink/25"}`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          required
          value={form.phone}
          onChange={set("phone")}
          onBlur={() => form.phone && !normalizeTunisianPhone(form.phone) && setPhoneError(phoneMsg)}
          placeholder="98 123 456"
          aria-invalid={!!phoneError}
        />
        {phoneError && <p className="text-xs font-bold text-harissa mt-1">{phoneError}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5">
          {isAr ? "الولاية *" : "Gouvernorat *"}
        </label>
        <select
          className={`${inputCls} border-ink/25 cursor-pointer`}
          name="governorate"
          required
          value={form.governorate}
          onChange={set("governorate")}
        >
          <option value="" disabled>
            {isAr ? "اختار الولاية" : "Choisis ton gouvernorat"}
          </option>
          {governorates.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5">
          {isAr ? "العنوان (المدينة، النهج، الرقم) *" : "Adresse (ville, rue, n°) *"}
        </label>
        <input
          className={`${inputCls} border-ink/25`}
          name="address"
          autoComplete="street-address"
          required
          minLength={5}
          value={form.address}
          onChange={set("address")}
          placeholder={isAr ? "مثال: المنزه 6، نهج ابن خلدون عدد 14" : "Ex : Ennasr 2, 14 rue Ibn Khaldoun"}
        />
      </div>

      {showNotes && (
        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">
            {isAr ? "ملاحظة للليفرور (اختياري)" : "Note pour le livreur (optionnel)"}
          </label>
          <textarea
            className={`${inputCls} border-ink/25 resize-none`}
            name="notes"
            rows={2}
            value={form.notes}
            onChange={set("notes")}
          />
        </div>
      )}

      {submitError && (
        <div role="alert" className="p-3.5 rounded-2xl border-2 border-harissa bg-white text-sm text-ink">
          <p className="font-bold text-harissa mb-1 flex items-center gap-1.5"><AlertCircle className="w-4 h-4 shrink-0" />{submitError}</p>
          <p className="text-xs text-ink/80">
            {isAr ? "ولا ابعث الكوموند على " : "Ou envoie ta commande sur "}
            <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="font-black underline">
              WhatsApp
            </a>
            {isAr ? "، المعلومات متاعك مكتوبة." : ", avec tes infos déjà remplies."}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || items.length === 0}
        className="btn-sticker btn-primary w-full justify-center py-4 text-base mt-1 disabled:opacity-50"
      >
        {submitting
          ? isAr ? "قاعدين نسجّلو…" : "Envoi en cours…"
          : isAr ? `كوموندي · ${total} DT` : `Je commande · ${total} DT`}
      </button>
      <p className="text-center text-sm text-muted -mt-1">
        {isAr ? "تخلّص كي توصلك · ما تخلّص حتى شي توّا" : "Tu paies à la livraison · rien à payer maintenant"}
      </p>
    </form>
  );
}
