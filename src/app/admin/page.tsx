"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import OmnisLogo from "@/components/OmnisLogo";
import type { Order } from "@/app/api/orders/route";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () =>{
    try {
      setLoading(true);
      const res = await fetch(`/api/orders?_t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() =>{
    fetchOrders();
    const interval = setInterval(() =>{
      fetch(`/api/orders?_t=${Date.now()}`, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) =>{
          if (data && Array.isArray(data)) setOrders(data);
        })
        .catch(() =>{});
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusChange = async (id: string, newStatus: Order["status"]) =>{
    setUpdatingId(id);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) =>{
    if (!confirm(`Supprimer la commande ${id} ?`)) return;
    try {
      const res = await fetch(`/api/orders?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((order) =>{
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.governorate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "Tous" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter(
    (o) => o.status === "Nouveau" || o.status === "En préparation" || o.status === "Expédié"
  ).length;
  const completedOrders = orders.filter((o) => o.status === "Livré").length;

  const statusStyles: Record<Order["status"], { bg: string; text: string; border: string }> = {
    Nouveau: { bg: "var(--sun)", text: "var(--ink)", border: "var(--ink)" },
    "En préparation": { bg: "var(--cream)", text: "var(--ink)", border: "var(--ink)" },
    Expédié: { bg: "var(--sky)", text: "var(--ink)", border: "var(--ink)" },
    Livré: { bg: "#4ADE80", text: "var(--ink)", border: "var(--ink)" },
    Annulé: { bg: "var(--harissa)", text: "white", border: "var(--ink)" },
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      {/* Top Header */}
      <header
        className="w-full px-4 sm:px-8 py-4 border-b-3"
        style={{
          backgroundColor: "white",
          borderColor: "var(--line)",
          borderBottom: "3px solid var(--ink)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" title="Retour au site">
              <OmnisLogo size="sm" />
            </Link>
            <span
              className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2"
              style={{
                backgroundColor: "var(--sun)",
                borderColor: "var(--line)",
                color: "var(--ink)",
              }}
            >
              PANNEAU D&apos;ADMINISTRATION
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-line text-xs font-bold text-emerald-950">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Direct / Live Sync
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="px-4 py-2 rounded-full border-2 font-bold text-xs uppercase tracking-wider hover:bg-cream transition-colors"
              style={{ borderColor: "var(--line)" }}
            >
               Actualiser
            </button>
            <Link
              href="/"
              className="btn-sticker btn-primary text-xs px-5 py-2"
            >
              Voir la boutique
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10">
        {/* Title */}
        <div className="mb-8">
          <h1
            className="heading-xl text-3xl sm:text-4xl text-ink"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            COMMANDES CLIENTS ({orders.length})
          </h1>
          <p className="text-sm text-ink/70 mt-1 font-sans">
            Consultez les coordonnées des acheteurs, les produits commandés et gérez les livraisons en Tunisie .
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div
            className="p-5 rounded-2xl border bg-white"
            style={{
              borderColor: "var(--line)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span className="text-xs font-black uppercase tracking-wider text-muted">
              CHIFFRE D&apos;AFFAIRES TOTAL
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span
                className="text-3xl font-black text-harissa"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {totalRevenue}
              </span>
              <span className="text-sm font-black text-ink">TND</span>
            </div>
            <span className="text-[0.7rem] text-muted mt-1 block">
              Paiements à l&apos;encaissement
            </span>
          </div>

          <div
            className="p-5 rounded-2xl border bg-white"
            style={{
              borderColor: "var(--line)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span className="text-xs font-black uppercase tracking-wider text-muted">
              Total commandes
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span
                className="text-3xl font-black text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {orders.length}
              </span>
            </div>
            <span className="text-[0.7rem] text-muted mt-1 block">
              Toutes régions confondues
            </span>
          </div>

          <div
            className="p-5 rounded-2xl border"
            style={{
              backgroundColor: "var(--sun)",
              borderColor: "var(--line)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span className="text-xs font-black uppercase tracking-wider text-ink/70">
              En attente de livraison
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span
                className="text-3xl font-black text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {pendingOrders}
              </span>
            </div>
            <span className="text-[0.7rem] text-ink/80 mt-1 block">
              À préparer ou en cours d&apos;expédition
            </span>
          </div>

          <div
            className="p-5 rounded-2xl border"
            style={{
              backgroundColor: "#BBF7D0",
              borderColor: "var(--line)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span className="text-xs font-black uppercase tracking-wider text-ink/70">
              Livraisons effectuées
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span
                className="text-3xl font-black text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {completedOrders}
              </span>
            </div>
            <span className="text-[0.7rem] text-ink/80 mt-1 block">
              Clients livrés avec succès
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div
          className="p-5 rounded-2xl border bg-white mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4"
          style={{
            borderColor: "var(--line)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom, téléphone, ville, n° commande..."
              className="w-full px-4 py-2.5 rounded-xl border border-line text-sm bg-cream/40 focus:outline-none focus:ring-2 focus:ring-harissa font-medium"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {["Tous", "Nouveau", "En préparation", "Expédié", "Livré", "Annulé"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-all ${
                    statusFilter === status
                      ? "bg-ink text-cream border-ink"
                      : "bg-cream text-ink border-ink/40 hover:border-ink"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>

        {/* Orders Table / Cards */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 rounded-full border border-ink bg-sun mx-auto animate-spin mb-4" />
            <p className="font-bold text-sm text-ink/70">Chargement des commandes...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div
            className="p-12 rounded-3xl border bg-white text-center"
            style={{
              borderColor: "var(--line)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <p className="text-4xl mb-3"></p>
            <h3 className="heading-lg text-lg text-ink mb-2">
              Aucune commande trouvée
            </h3>
            <p className="text-xs text-muted">
              Aucune commande ne correspond aux filtres actuels.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) =>{
              const currentStatusStyle = statusStyles[order.status] || {
                bg: "var(--cream)",
                text: "var(--ink)",
                border: "var(--ink)",
              };

              const cleanPhone = order.phone.replace(/[^0-9]/g, "");
              const whatsappUrl = `https://wa.me/216${cleanPhone.startsWith("216") ? cleanPhone.slice(3) : cleanPhone}`;

              return (
                <div
                  key={order.id}
                  className="p-6 rounded-3xl border bg-white flex flex-col gap-5 transition-all"
                  style={{
                    borderColor: "var(--line)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {/* Top Bar: Order ID, Date, Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-ink/15">
                    <div className="flex items-center gap-3">
                      <span
                        className="px-3 py-1 rounded-xl font-mono font-black text-sm border border-line bg-cream text-ink"
                      >
                        {order.id}
                      </span>
                      <Link
                        href={`/track?id=${order.id}`}
                        target="_blank"
                        className="text-xs font-bold text-ink/70 hover:text-harissa underline flex items-center gap-1"
                        title="Ouvrir la page de suivi client"
                      >
                        Suivi client ↗
                      </Link>
                      <span className="text-xs text-muted font-medium">
                        {new Date(order.createdAt).toLocaleDateString("fr-TN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-muted">
                        Statut :
                      </span>
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as Order["status"]
                          )
                        }
                        className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border-2 cursor-pointer focus:outline-none"
                        style={{
                          backgroundColor: currentStatusStyle.bg,
                          color: currentStatusStyle.text,
                          borderColor: currentStatusStyle.border,
                        }}
                      >
                        <option value="Nouveau"> Nouveau</option>
                        <option value="En préparation"> En préparation</option>
                        <option value="Expédié"> Expédié</option>
                        <option value="Livré"> Livré</option>
                        <option value="Annulé"> Annulé</option>
                      </select>

                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-1.5 text-muted hover:text-harissa transition-colors ml-2"
                        title="Supprimer la commande"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Body Grid: Client Info vs Order Items */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Client Info (7 cols) */}
                    <div className="md:col-span-7 space-y-3">
                      <div>
                        <span className="text-[0.65rem] font-black uppercase tracking-wider text-muted block">
                          CLIENT / DESTINATAIRE
                        </span>
                        <p className="font-black text-base text-ink">
                          {order.fullName}
                        </p>
                      </div>

                      {/* Phone & Instant Contact Links */}
                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={`tel:${order.phone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line text-xs font-bold bg-sun/40 hover:bg-sun text-ink transition-colors"
                        >
                           {order.phone}
                        </a>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line text-xs font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-colors"
                        >
                           Contacter sur WhatsApp
                        </a>
                      </div>

                      {/* Address */}
                      <div className="p-3 rounded-2xl border border-ink/20 bg-cream/40 text-xs space-y-1">
                        <p className="font-bold text-ink">
                           {order.address}
                        </p>
                        <p className="text-ink/75">
                          {order.city}, <strong>Gouvernorat de {order.governorate}</strong> (Tunisie)
                        </p>
                        {order.notes && (
                          <p className="text-harissa font-medium italic pt-1 border-t border-ink/10">
                             Note client : &ldquo;{order.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order Items & Total (5 cols) */}
                    <div className="md:col-span-5 p-4 rounded-2xl border border-line bg-cream/30 space-y-3">
                      <span className="text-[0.65rem] font-black uppercase tracking-wider text-muted block">
                        Articles commandés
                      </span>

                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="w-5 h-5 rounded-full border border-ink flex items-center justify-center text-[0.6rem] font-black text-cream"
                                style={{ backgroundColor: item.color }}
                              >
                                {item.name.charAt(0)}
                              </span>
                              <span className="font-black text-ink">
                                {item.name}
                              </span>
                              <span className="text-muted">
                                × {item.quantity}
                              </span>
                            </div>
                            <span className="font-black text-ink">
                              {item.price * item.quantity} TND
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t-2 border-ink/15 pt-2 space-y-1 text-xs">
                        <div className="flex justify-between text-ink/70">
                          <span>Livraison ({order.governorate}) :</span>
                          <span>{order.shippingFee} TND</span>
                        </div>
                        <div className="flex justify-between font-black text-sm text-ink pt-1 border-t border-ink/10">
                          <span>Total à encaisser :</span>
                          <span className="text-harissa text-base">
                            {order.total} TND
                          </span>
                        </div>
                        <span className="text-[0.65rem] font-bold text-muted block pt-1">
                          Mode : {order.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
