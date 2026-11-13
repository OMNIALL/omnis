// Server-side only (uses fs and the Sheets secret) — import from API routes, never from client components.
import fs from "fs";
import path from "path";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
}

export type OrderStatus = "Nouveau" | "En préparation" | "Expédié" | "Livré" | "Annulé";
export const ORDER_STATUSES: OrderStatus[] = ["Nouveau", "En préparation", "Expédié", "Livré", "Annulé"];

export interface Order {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  utm?: Record<string, string>;
}

export class DuplicateOrderIdError extends Error {}

interface OrderStore {
  list(): Promise<Order[]>;
  find(query: { id?: string; phone?: string }): Promise<Order | null>;
  create(order: Order): Promise<void>;
  updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
  remove(id: string): Promise<void>;
}

// ---------------------------------------------------------------------------
// Google Sheets (production): an Apps Script web app — scripts/google-sheets/orders.gs
// Enabled when ORDERS_SHEET_URL and ORDERS_SHEET_SECRET are set.
// ---------------------------------------------------------------------------
function sheetsStore(url: string, secret: string): OrderStore {
  async function call<T>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      // text/plain avoids a CORS preflight and is what Apps Script parses most reliably.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, action, ...payload }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const text = await res.text();
    let data: { ok: boolean; error?: string } & T;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Sheets endpoint returned non-JSON (HTTP ${res.status}) — check the deployment URL and access.`);
    }
    if (!data.ok) {
      if (data.error === "duplicate") throw new DuplicateOrderIdError();
      if (data.error === "not_found") return data;
      throw new Error(`Sheets error: ${data.error}`);
    }
    return data;
  }

  return {
    async list() {
      return (await call<{ orders: Order[] }>("list")).orders ?? [];
    },
    async find(q) {
      return (await call<{ order: Order | null }>("get", q)).order ?? null;
    },
    async create(order) {
      await call("create", { order });
    },
    async updateStatus(id, status) {
      return (await call<{ order?: Order }>("updateStatus", { id, status })).order ?? null;
    },
    async remove(id) {
      await call("delete", { id });
    },
  };
}

// ---------------------------------------------------------------------------
// Local JSON file (development only). Fails on read-only/serverless hosts.
// ---------------------------------------------------------------------------
function fileStore(): OrderStore {
  const file = path.join(process.cwd(), "src", "data", "orders.json");
  const read = (): Order[] => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf-8")) : []);
  const write = (orders: Order[]) => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(orders, null, 2), "utf-8");
  };

  return {
    async list() {
      return read();
    },
    async find({ id, phone }) {
      return (
        read().find((o) => (id && o.id.toLowerCase() === id.toLowerCase()) || (phone && o.phone === phone)) ?? null
      );
    },
    async create(order) {
      const orders = read();
      if (orders.some((o) => o.id === order.id)) throw new DuplicateOrderIdError();
      orders.unshift(order);
      write(orders);
    },
    async updateStatus(id, status) {
      const orders = read();
      const order = orders.find((o) => o.id === id);
      if (!order) return null;
      order.status = status;
      write(orders);
      return order;
    },
    async remove(id) {
      write(read().filter((o) => o.id !== id));
    },
  };
}

export function getOrderStore(): OrderStore {
  const url = process.env.ORDERS_SHEET_URL;
  const secret = process.env.ORDERS_SHEET_SECRET;
  if (url && secret) return sheetsStore(url, secret);
  if (process.env.NODE_ENV === "production") {
    console.warn("[orders] ORDERS_SHEET_URL / ORDERS_SHEET_SECRET not set — falling back to local file storage.");
  }
  return fileStore();
}
