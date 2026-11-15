import { NextResponse, after } from "next/server";
import { products } from "@/data/products";
import { normalizeTunisianPhone } from "@/lib/phone";
import { quote } from "@/lib/pricing";
import { HONEYPOT_FIELD, checkOrderSpam, clientIp } from "@/lib/antiSpam";
import { notifyNewOrder } from "@/lib/notifyOrder";
import {
  DuplicateOrderIdError,
  ORDER_STATUSES,
  getOrderStore,
  type Order,
  type OrderItem,
  type OrderStatus,
} from "@/lib/orderStore";

export type { Order, OrderItem, OrderStatus };

// Storage: Google Sheets when ORDERS_SHEET_URL + ORDERS_SHEET_SECRET are set,
// otherwise src/data/orders.json (local dev only). See docs/google-sheets-orders.md.

const MAX_QTY_PER_ITEM = 10;

const randomOrderId = () => `TN-${Math.floor(100000 + Math.random() * 900000)}`;

/** Public tracking view: enough to follow the parcel, without exposing personal data. */
function toPublicOrder(o: Order) {
  const [first, ...rest] = o.fullName.trim().split(/\s+/);
  return {
    id: o.id,
    createdAt: o.createdAt,
    fullName: rest.length ? `${first} ${rest[rest.length - 1][0]}.` : first,
    phone: o.phone.replace(/\D/g, "").replace(/\d(?=\d{2})/g, "•"),
    governorate: o.governorate,
    city: o.city,
    address: "",
    notes: "",
    items: o.items,
    subtotal: o.subtotal,
    shippingFee: o.shippingFee,
    total: o.total,
    status: o.status,
  };
}

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const storageError = (err: unknown) => {
  console.error("[orders] storage error:", err);
  return NextResponse.json({ success: false, error: "Stockage indisponible", codes: ["storage"] }, { status: 503 });
};

// GET ?id=<order id or phone> is public (tracking page, returns a masked order).
// GET without id (full list), PATCH and DELETE are admin-only — protected in src/proxy.ts.
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  const store = getOrderStore();

  try {
    if (id) {
      const phone = normalizeTunisianPhone(id);
      const order = await store.find(phone ? { phone } : { id: id.trim() });
      if (!order) {
        return NextResponse.json({ success: false, error: "Commande introuvable" }, { status: 404 });
      }
      return NextResponse.json({ success: true, order: toPublicOrder(order) });
    }
    return NextResponse.json(await store.list());
  } catch (err) {
    return storageError(err);
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Requête invalide", codes: ["invalid"] }, { status: 400 });
  }

  const fullName = str(body.fullName, 100);
  const phone = normalizeTunisianPhone(str(body.phone, 30));
  const governorate = str(body.governorate, 50);
  const city = str(body.city, 100);
  const address = str(body.address, 300);
  const notes = str(body.notes, 500);

  // `codes` lets the client show the message in the customer's language; `error` stays FR for logs/admin.
  const errors: { code: string; fr: string }[] = [];
  if (fullName.length < 3) errors.push({ code: "name", fr: "Nom invalide" });
  if (!phone) errors.push({ code: "phone", fr: "Numéro de téléphone tunisien invalide (8 chiffres)" });
  if (!governorate) errors.push({ code: "governorate", fr: "Gouvernorat manquant" });
  if (address.length < 5) errors.push({ code: "address", fr: "Adresse incomplète" });

  // Prices always come from the catalog, never from the client.
  const items: OrderItem[] = [];
  for (const raw of Array.isArray(body.items) ? body.items : []) {
    const r = raw as Record<string, unknown>;
    const product = products.find((p) => p.id === r.id && p.available);
    const quantity = Math.floor(Number(r.quantity));
    if (!product || !(quantity >= 1 && quantity <= MAX_QTY_PER_ITEM)) continue;
    items.push({ id: product.id, name: product.name, price: product.price, quantity, color: product.color });
  }
  if (items.length === 0) errors.push({ code: "cart", fr: "Panier vide" });

  if (errors.length) {
    return NextResponse.json(
      { success: false, error: errors.map((e) => e.fr).join(" · "), codes: errors.map((e) => e.code) },
      { status: 400 }
    );
  }

  // Anti-spam (fake COD orders cost delivery fees).
  const spam = checkOrderSpam({
    ip: clientIp(req),
    phone,
    fullName,
    honeypot: body[HONEYPOT_FIELD],
    startedAt: body.startedAt,
  });
  if (!spam.ok) {
    console.warn(`[orders] blocked (${spam.reason}) phone=${phone}`);
    if (spam.reason === "honeypot") {
      // Bots get a believable success and nothing is stored.
      return NextResponse.json({ success: true, order: { id: randomOrderId(), fullName, phone, governorate, city, address, items: [], subtotal: 0, shippingFee: 0, total: 0 } });
    }
    const msg: Record<string, string> = {
      too_fast: "Vérifie tes informations puis réessaie.",
      bad_name: "Nom invalide : lettres uniquement.",
      rate_ip: "Trop de commandes depuis cette connexion. Écris-nous sur WhatsApp.",
      rate_phone: "Tu as déjà commandé plusieurs fois aujourd'hui avec ce numéro. Écris-nous sur WhatsApp pour une nouvelle commande.",
    };
    return NextResponse.json({ success: false, error: msg[spam.reason], codes: [spam.reason] }, { status: spam.reason === "bad_name" || spam.reason === "too_fast" ? 400 : 429 });
  }

  const priced = quote(items);
  const utm =
    body.utm && typeof body.utm === "object"
      ? Object.fromEntries(
          Object.entries(body.utm as Record<string, unknown>)
            .filter(([k, v]) => k.startsWith("utm_") && typeof v === "string")
            .map(([k, v]) => [k, str(v, 100)])
        )
      : undefined;

  const store = getOrderStore();
  const base: Omit<Order, "id"> = {
    createdAt: new Date().toISOString(),
    fullName,
    phone,
    governorate,
    city,
    address,
    notes,
    paymentMethod: "Paiement à la livraison",
    items,
    subtotal: priced.subtotal,
    shippingFee: priced.shipping,
    total: priced.total,
    status: "Nouveau",
    ...(utm && Object.keys(utm).length ? { utm } : {}),
    ...(body.abVariant === "A" || body.abVariant === "B" ? { abVariant: body.abVariant } : {}),
  };

  for (let attempt = 0; attempt < 3; attempt++) {
    const order: Order = { id: randomOrderId(), ...base };
    try {
      await store.create(order);
      after(() => notifyNewOrder(order)); // alert the owner without slowing the customer down
      return NextResponse.json({ success: true, order });
    } catch (err) {
      if (err instanceof DuplicateOrderIdError) continue; // extremely rare — pick a new id
      console.error("[orders] failed to save order:", err);
      return NextResponse.json({ success: false, error: "Enregistrement impossible", codes: ["storage"] }, { status: 500 });
    }
  }
  return NextResponse.json({ success: false, error: "Enregistrement impossible", codes: ["storage"] }, { status: 500 });
}

export async function PATCH(req: Request) {
  let id: unknown, status: unknown;
  try {
    ({ id, status } = await req.json());
  } catch {
    return NextResponse.json({ success: false, error: "Requête invalide" }, { status: 400 });
  }
  if (typeof id !== "string" || !ORDER_STATUSES.includes(status as OrderStatus)) {
    return NextResponse.json({ success: false, error: "Statut invalide" }, { status: 400 });
  }
  try {
    const order = await getOrderStore().updateStatus(id, status as OrderStatus);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (err) {
    return storageError(err);
  }
}

export async function DELETE(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
  }
  try {
    await getOrderStore().remove(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return storageError(err);
  }
}
