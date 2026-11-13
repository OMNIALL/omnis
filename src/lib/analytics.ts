/**
 * Ad-platform tracking helpers (Meta Pixel + TikTok Pixel).
 * Scripts are loaded by <AdPixels /> in the root layout only when
 * NEXT_PUBLIC_META_PIXEL_ID / NEXT_PUBLIC_TIKTOK_PIXEL_ID are set.
 * Every helper is a safe no-op when a pixel isn't loaded.
 */

import { track as vercelTrack } from "@vercel/analytics";
import { getHeroVariant } from "@/lib/abTest";

type Params = Record<string, unknown>;
type W = Window & {
  fbq?: (...args: unknown[]) => void;
  ttq?: { track: (event: string, params?: Params, opts?: Params) => void };
};

const CURRENCY = "TND";

export interface TrackedItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

function send(metaEvent: string, ttEvent: string, params: Params, eventId?: string) {
  if (typeof window === "undefined") return;
  const w = window as W;
  // Vercel Web Analytics custom events (recorded on Vercel Pro; harmless no-op otherwise).
  try {
    const v = params.value;
    vercelTrack(metaEvent, {
      ...(typeof v === "number" ? { value: v } : {}),
      variant: getHeroVariant(),
      ...(typeof params.source === "string" ? { source: params.source } : {}),
    });
  } catch {}
  try {
    w.fbq?.("track", metaEvent, params, eventId ? { eventID: eventId } : undefined);
  } catch {}
  try {
    w.ttq?.track(ttEvent, params, eventId ? { event_id: eventId } : undefined);
  } catch {}
}

function itemsParams(items: TrackedItem[], value: number) {
  return {
    value,
    currency: CURRENCY,
    content_type: "product",
    content_ids: items.map((i) => i.id),
    contents: items.map((i) => ({ id: i.id, content_id: i.id, content_name: i.name, quantity: i.quantity, price: i.price })),
    num_items: items.reduce((s, i) => s + i.quantity, 0),
  };
}

export const trackViewContent = (item: Omit<TrackedItem, "quantity">) =>
  send("ViewContent", "ViewContent", itemsParams([{ ...item, quantity: 1 }], item.price));

export const trackAddToCart = (item: TrackedItem) =>
  send("AddToCart", "AddToCart", itemsParams([item], item.price * item.quantity));

/** Fired when checkout starts: on /checkout load, or on first interaction with the product-page order form. */
export const trackInitiateCheckout = (items: TrackedItem[], value: number, source = "checkout") =>
  send("InitiateCheckout", "InitiateCheckout", { ...itemsParams(items, value), source });

/** WhatsApp clicks (questions, confirmations, waitlist). */
export const trackContact = (source: string) => send("Contact", "Contact", { source });

/** orderId is used as the dedup event id (match it in a future Conversions API call). */
export const trackPurchase = (items: TrackedItem[], value: number, orderId: string) =>
  send("Purchase", "CompletePayment", { ...itemsParams(items, value), order_id: orderId }, orderId);

// ---- UTM capture: stored for the session and attached to each order ----
const UTM_KEY = "omnis_utm";

export function captureUtm() {
  if (typeof window === "undefined") return;
  try {
    const sp = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    sp.forEach((v, k) => {
      if (k.startsWith("utm_")) utm[k] = v;
    });
    if (Object.keys(utm).length) sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {}
}

export function getUtm(): Record<string, string> | undefined {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}
