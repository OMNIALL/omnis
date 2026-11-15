"use client";

import { normalizeTunisianPhone } from "@/lib/phone";
import { getUtm } from "@/lib/analytics";

export interface OrderFormData {
  fullName: string;
  phone: string;
  governorate: string;
  city?: string;
  address: string;
  notes?: string;
  /** Anti-spam: honeypot value and first-interaction timestamp. */
  hp_extra?: string;
  startedAt?: number;
  /** Hero A/B variant shown to this visitor (saved with the order). */
  abVariant?: string;
}

export interface PlacedOrder {
  id: string;
  fullName: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export class OrderError extends Error {
  constructor(message: string, public field?: "phone" | "cart") {
    super(message);
  }
}

/**
 * Sends a COD order to /api/orders and fires the Purchase pixel event.
 * Throws OrderError with a user-facing message (FR or AR) on failure.
 */
export async function placeOrder(
  form: OrderFormData,
  items: { id: string; quantity: number }[],
  isAr = false
): Promise<PlacedOrder> {
  if (items.length === 0) {
    throw new OrderError(ERROR_COPY.cart[isAr ? "ar" : "fr"], "cart");
  }
  const phone = normalizeTunisianPhone(form.phone);
  if (!phone) {
    throw new OrderError(ERROR_COPY.phone[isAr ? "ar" : "fr"], "phone");
  }

  let data: { success?: boolean; error?: string; codes?: string[]; order?: PlacedOrder } | null = null;
  let networkFailed = false;
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, phone, items, utm: getUtm() }),
    });
    data = await res.json().catch(() => null);
  } catch {
    networkFailed = true;
  }

  if (networkFailed || !data?.success || !data.order) {
    const codes = data?.codes ?? [];
    const lang = isAr ? "ar" : "fr";
    const known = codes.filter((c): c is ErrorCode => c in ERROR_COPY);
    const message = known.length ? known.map((c) => ERROR_COPY[c][lang]).join(" ") : ERROR_COPY.storage[lang];
    const field = known.includes("phone") ? "phone" : known.includes("cart") ? "cart" : undefined;
    throw new OrderError(message, field);
  }

  const order = data.order;
  saveLastOrder(order); // read by /merci, which fires the Purchase event once
  return order;
}

/** Customer-facing copy for the error codes returned by /api/orders: what happened + what to do. */
const ERROR_COPY = {
  name: {
    fr: "Écris ton nom et prénom (3 lettres minimum).",
    ar: "اكتب اسمك و لقبك (3 حروف على الأقل).",
  },
  bad_name: {
    fr: "Ton nom ne peut contenir que des lettres.",
    ar: "الاسم لازم يكون حروف برك.",
  },
  phone: {
    fr: "Numéro invalide : 8 chiffres, ex. 98 123 456",
    ar: "رقم غير صحيح: 8 أرقام، مثال 98 123 456",
  },
  governorate: { fr: "Choisis ton gouvernorat.", ar: "اختار الولاية متاعك." },
  address: {
    fr: "Ajoute ta ville et ta rue pour que le livreur te trouve.",
    ar: "زيد المدينة و النهج باش الليفرور يلقاك.",
  },
  cart: { fr: "Ton panier est vide.", ar: "السلة فارغة." },
  too_fast: { fr: "Vérifie tes informations puis réessaie.", ar: "ثبّت في المعلومات متاعك و عاود جرّب." },
  rate_phone: {
    fr: "Tu as déjà commandé aujourd'hui avec ce numéro. Pour une autre commande, écris-nous sur WhatsApp.",
    ar: "عملت كوموند اليوم بالنومرو هذا. باش تزيد وحدة، ابعثلنا على الواتساب.",
  },
  rate_ip: {
    fr: "Plusieurs commandes viennent d'être passées depuis cette connexion. Pour en ajouter une, écris-nous sur WhatsApp.",
    ar: "تعدّاو برشا كوموندات من الكونيكسيون هذي. باش تزيد وحدة، ابعثلنا على الواتساب.",
  },
  invalid: {
    fr: "Ta commande n'est pas passée. Recharge la page et réessaie.",
    ar: "الكوموند ما تعدّاتش. عاود حلّ الصفحة و جرّب.",
  },
  storage: {
    fr: "Ta commande n'est pas passée, c'est un souci de notre côté. Réessaie dans une minute, ou envoie-la sur WhatsApp.",
    ar: "الكوموند ما تعدّاتش، المشكل من عندنا. عاود بعد دقيقة، ولا ابعثها على الواتساب.",
  },
} as const;
type ErrorCode = keyof typeof ERROR_COPY;

// ---- Last order hand-off to the /merci thank-you page ----
export const LAST_ORDER_KEY = "omnis_last_order";
export const TRACKED_KEY = "omnis_tracked_orders";

function saveLastOrder(order: PlacedOrder) {
  try {
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  } catch {}
}

/** Order thank-you URL (clean conversion URL for ad platforms). */
export const merciHref = (orderId: string) => `/merci?order=${encodeURIComponent(orderId)}`;
