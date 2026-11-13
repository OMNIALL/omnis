/**
 * Single source of truth for prices — used by the product page, cart, checkout AND the orders API.
 * FOCUS bundles: 1 = 39 DT · 2 = 72 DT · 3 = 99 DT · each extra bottle beyond 3 = 33 DT.
 * Delivery: 7 DT, free from 2 bottles.
 */

export const SHIPPING_FEE = 7;
export const FREE_SHIPPING_MIN_BOTTLES = 2;
export const DELIVERY_TIME = { fr: "24–48h", ar: "24-48 ساعة" };

export const FOCUS_ID = "focus-30";
export const FOCUS_UNIT_PRICE = 39;
const EXTRA_BOTTLE_PRICE = 33;

export interface Bundle {
  qty: 1 | 2 | 3;
  price: number;
  tag?: { fr: string; ar: string };
}

export const FOCUS_BUNDLES: Bundle[] = [
  { qty: 1, price: 39 },
  { qty: 2, price: 72, tag: { fr: "Le plus choisi", ar: "الأكثر طلباً" } },
  { qty: 3, price: 99, tag: { fr: "Meilleur prix", ar: "أحسن سوم" } },
];

/** Price of `qty` units of one product, applying FOCUS bundle pricing. */
export function linePrice(productId: string, unitPrice: number, qty: number): number {
  if (qty <= 0) return 0;
  if (productId !== FOCUS_ID) return unitPrice * qty;
  if (qty <= 3) return FOCUS_BUNDLES[qty - 1].price;
  return FOCUS_BUNDLES[2].price + (qty - 3) * EXTRA_BOTTLE_PRICE;
}

export interface Quote {
  bottles: number;
  subtotal: number;
  fullPrice: number;
  savings: number;
  shipping: number;
  total: number;
}

export function quote(items: { id: string; price: number; quantity: number }[]): Quote {
  const bottles = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + linePrice(i.id, i.price, i.quantity), 0);
  const fullPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = bottles === 0 || bottles >= FREE_SHIPPING_MIN_BOTTLES ? 0 : SHIPPING_FEE;
  return { bottles, subtotal, fullPrice, savings: fullPrice - subtotal, shipping, total: subtotal + shipping };
}

/** Total to pay for a FOCUS bundle of `qty` bottles, delivery included. */
export const focusBundleTotal = (qty: number) =>
  quote([{ id: FOCUS_ID, price: FOCUS_UNIT_PRICE, quantity: qty }]).total;
