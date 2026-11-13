// Server-only: tell the shop owner about each new order.
// Email via Resend when RESEND_API_KEY + ORDERS_NOTIFY_EMAIL are set; otherwise a clear server log line.
// Never throws — a failed alert must never fail the customer's order.
import type { Order } from "@/lib/orderStore";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function notifyNewOrder(order: Order): Promise<void> {
  const items = order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ");
  const line = `[orders] NEW ${order.id} · ${order.fullName} · ${order.phone} · ${order.governorate} · ${items} · ${order.total} DT`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDERS_NOTIFY_EMAIL;
  if (!key || !to) {
    console.log(line, "(email alert off: set RESEND_API_KEY + ORDERS_NOTIFY_EMAIL)");
    return;
  }

  const from = process.env.ORDERS_FROM_EMAIL || "OMNIS Commandes <onboarding@resend.dev>";
  const waPhone = order.phone.replace(/\D/g, "");
  const utm = order.utm ? Object.entries(order.utm).map(([k, v]) => `${k}=${v}`).join(" · ") : "—";
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;color:#14110F">
      <h2 style="margin:0 0 12px">Nouvelle commande ${esc(order.id)} — ${order.total} DT</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><b>Client</b></td><td>${esc(order.fullName)}</td></tr>
        <tr><td><b>Téléphone</b></td><td>${esc(order.phone)} — <a href="https://wa.me/216${waPhone}">WhatsApp</a></td></tr>
        <tr><td><b>Adresse</b></td><td>${esc(order.address)}${order.city ? ", " + esc(order.city) : ""} (${esc(order.governorate)})</td></tr>
        <tr><td><b>Produits</b></td><td>${esc(items)}</td></tr>
        <tr><td><b>Total (COD)</b></td><td>${order.total} DT (livraison ${order.shippingFee} DT)</td></tr>
        <tr><td><b>Note</b></td><td>${esc(order.notes || "—")}</td></tr>
        <tr><td><b>Source</b></td><td>${esc(utm)}</td></tr>
      </table>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), subject: `🛒 ${order.id} · ${items} · ${order.total} DT`, html }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error(line, `(email alert failed: HTTP ${res.status} ${await res.text().catch(() => "")})`);
    else console.log(line, "(email alert sent)");
  } catch (err) {
    console.error(line, "(email alert error)", err);
  }
}
