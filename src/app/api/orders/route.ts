import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
}

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
  status: "Nouveau" | "En préparation" | "Expédié" | "Livré" | "Annulé";
}

const dataFilePath = path.join(process.cwd(), "src", "data", "orders.json");

function getStoredOrders(): Order[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      // Default demo order for first-time admin inspection
      const initialOrders: Order[] = [
        {
          id: "TN-942810",
          createdAt: new Date().toISOString(),
          fullName: "Youssef Trabelsi",
          phone: "98 456 789",
          governorate: "Tunis",
          city: "La Marsa",
          address: "12 Avenue Habib Bourguiba, Résidence Les Palmiers",
          notes: "Appeler avant d'arriver SVP",
          paymentMethod: "Paiement à la livraison",
          items: [
            {
              id: "focus-30",
              name: "FOCUS",
              price: 39,
              quantity: 2,
              color: "#E8432A",
            },
          ],
          subtotal: 78,
          shippingFee: 7,
          total: 85,
          status: "Nouveau",
        },
      ];
      fs.writeFileSync(dataFilePath, JSON.stringify(initialOrders, null, 2), "utf-8");
      return initialOrders;
    }
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(orders, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save orders:", err);
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const orders = getStoredOrders();

  if (id) {
    const order = orders.find(
      (o) => o.id.toLowerCase() === id.toLowerCase() || o.phone.replace(/\s+/g, "") === id.replace(/\s+/g, "")
    );
    if (!order) {
      return NextResponse.json({ success: false, error: "Commande introuvable" }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  }

  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orders = getStoredOrders();

    const newOrder: Order = {
      id: body.id || `TN-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      fullName: body.fullName || "Client Inconnu",
      phone: body.phone || "-",
      governorate: body.governorate || "Tunis",
      city: body.city || "",
      address: body.address || "",
      notes: body.notes || "",
      paymentMethod: body.paymentMethod === "cod" ? "Paiement à la livraison" : body.paymentMethod,
      items: body.items || [],
      subtotal: body.subtotal || 0,
      shippingFee: body.shippingFee || 7,
      total: body.total || 0,
      status: "Nouveau",
    };

    orders.unshift(newOrder);
    saveOrders(orders);

    return NextResponse.json({ success: true, order: newOrder });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const orders = getStoredOrders();
    const orderIndex = orders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    orders[orderIndex].status = status;
    saveOrders(orders);

    return NextResponse.json({ success: true, order: orders[orderIndex] });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    const orders = getStoredOrders();
    const filtered = orders.filter((o) => o.id !== id);
    saveOrders(filtered);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
