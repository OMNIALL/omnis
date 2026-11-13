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
    throw new OrderError(isAr ? "السلة فارغة." : "Ton panier est vide.", "cart");
  }
  const phone = normalizeTunisianPhone(form.phone);
  if (!phone) {
    throw new OrderError(
      isAr ? "رقم غير صحيح: 8 أرقام، مثال 98 123 456" : "Numéro invalide : 8 chiffres, ex. 98 123 456",
      "phone"
    );
  }

  let data: { success?: boolean; error?: string; order?: PlacedOrder } | null = null;
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, phone, items, utm: getUtm() }),
    });
    data = await res.json().catch(() => null);
    if (!res.ok || !data?.success || !data.order) throw new Error(data?.error);
  } catch (err) {
    const serverMsg = err instanceof Error && err.message && res400(data) ? err.message : "";
    throw new OrderError(
      serverMsg || (isAr ? "ما تنجّمش الكوموند تتسجّل." : "Ta commande n'a pas pu être enregistrée.")
    );
  }

  const order = data.order;
  saveLastOrder(order); // read by /merci, which fires the Purchase event once
  return order;
}

// Validation errors (400) carry a readable message; storage errors don't.
const res400 = (data: { error?: string } | null) =>
  !!data?.error && !/Enregistrement|Stockage/.test(data.error);

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
