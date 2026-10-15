"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerCircle from "@/components/StickerCircle";
import type { Order } from "@/app/api/orders/route";

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [searchId, setSearchId] = useState(initialId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchTracking = useCallback(async (idToFetch: string) => {
    if (!idToFetch.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/orders?id=${encodeURIComponent(idToFetch.trim())}&_t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (res.ok && data.success && data.order) {
        setOrder(data.order);
        setLastUpdated(new Date());
      } else {
        setOrder(null);
        setError("Aucune commande trouvée pour ce numéro ou téléphone.");
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch if query param present
  useEffect(() => {
    if (initialId) {
      fetchTracking(initialId);
    }
  }, [initialId, fetchTracking]);

  // Real-time polling every 3 seconds if an order is active
  useEffect(() => {
    if (!order?.id) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders?id=${encodeURIComponent(order.id)}&_t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (res.ok && data.success && data.order) {
          setOrder(data.order);
          setLastUpdated(new Date());
        }
      } catch {
        // Silent polling error
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [order?.id]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(searchId);
  };

  const steps = [
    {
      title: "Commande Confirmée",
      desc: "Reçue et enregistrée dans le système OMNIS",
      statusKey: "Nouveau",
      icon: "📦",
    },
    {
      title: "En Préparation",
      desc: "Pastilles dosées et emballées avec soin",
      statusKey: "En préparation",
      icon: "⚡",
    },
    {
      title: "En Cours de Livraison",
      desc: "Pris en charge par notre transporteur express",
      statusKey: "Expédié",
      icon: "🚚",
    },
    {
      title: "Livré & Encaissé",
      desc: "Colis remis en main propre contre paiement",
      statusKey: "Livré",
      icon: "📍",
    },
  ];

  const getStepStatus = (stepIndex: number, currentStatus: Order["status"]) => {
    const statusOrder: Record<Order["status"], number> = {
      Nouveau: 0,
      "En préparation": 1,
      Expédié: 2,
      Livré: 3,
      Annulé: -1,
    };

    const currentRank = statusOrder[currentStatus] ?? 0;
    if (currentStatus === "Annulé") return "cancelled";
    if (stepIndex < currentRank) return "completed";
    if (stepIndex === currentRank) return "current";
    return "upcoming";
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-ink bg-sun text-xs font-black uppercase tracking-wider mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-harissa animate-ping" />
          SUIVI EN TEMPS RÉEL (TUNISIE 🇹🇳)
        </div>
        <h1
          className="heading-xl text-3xl sm:text-4xl md:text-5xl text-ink uppercase"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          OÙ EST MA COMMANDE ?
        </h1>
        <p className="text-sm sm:text-base text-ink/70 mt-2 max-w-lg mx-auto font-sans">
          Entre ton numéro de commande (ex: <strong>TN-942810</strong>) ou ton numéro de téléphone pour suivre l&apos;acheminement en direct.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mt-6"
        >
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="N° de commande (TN-XXXXXX) ou téléphone"
            required
            className="flex-1 px-5 py-3.5 rounded-full border-3 border-ink text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-harissa font-bold text-ink"
            style={{ boxShadow: "4px 4px 0 var(--ink)" }}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-sticker btn-primary text-sm px-7 py-3.5 whitespace-nowrap"
          >
            {loading ? "Recherche..." : "Suivre mon colis"}
          </button>
        </form>

        {error && (
          <p className="text-harissa font-bold text-xs sm:text-sm mt-3 bg-harissa/10 py-2 px-4 rounded-xl border border-harissa/30 inline-block">
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* Real-time Order View */}
      {order && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-10 rounded-3xl border-3 bg-white"
          style={{
            borderColor: "var(--ink)",
            boxShadow: "8px 8px 0 var(--ink)",
          }}
        >
          {/* Top Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-ink/15">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-ink/50 block">
                COMMANDE IDENTIFIÉE
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-mono font-black text-2xl text-ink">
                  {order.id}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2"
                  style={{
                    backgroundColor:
                      order.status === "Livré"
                        ? "#4ADE80"
                        : order.status === "Annulé"
                        ? "var(--harissa)"
                        : "var(--sun)",
                    borderColor: "var(--ink)",
                    color: order.status === "Annulé" ? "white" : "var(--ink)",
                  }}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream border-2 border-ink text-xs font-bold text-ink">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Connecté en direct · Mis à jour à {lastUpdated.toLocaleTimeString("fr-TN")}</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-8">
            <h2
              className="heading-lg text-lg text-ink uppercase mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ÉTAPES DE LIVRAISON
            </h2>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                {steps.map((step, idx) => {
                  const state = getStepStatus(idx, order.status);
                  const isCompleted = state === "completed";
                  const isCurrent = state === "current";

                  return (
                    <div
                      key={step.title}
                      className={`p-5 rounded-2xl border-3 transition-all flex flex-col justify-between ${
                        isCurrent
                          ? "bg-sun border-ink shadow-[4px_4px_0_var(--ink)] scale-105"
                          : isCompleted
                          ? "bg-cream/70 border-ink"
                          : "bg-gray-50 border-ink/30 opacity-60"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">{step.icon}</span>
                          <span
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-black ${
                              isCompleted
                                ? "bg-emerald-500 text-white border-ink"
                                : isCurrent
                                ? "bg-ink text-sun border-ink"
                                : "bg-transparent border-ink/40 text-ink/40"
                            }`}
                          >
                            {isCompleted ? "✓" : idx + 1}
                          </span>
                        </div>

                        <h3 className="font-black text-sm text-ink uppercase">
                          {step.title}
                        </h3>
                        <p className="text-xs text-ink/75 mt-1 leading-snug">
                          {step.desc}
                        </p>
                      </div>

                      {isCurrent && (
                        <div className="mt-4 pt-2 border-t border-ink/20">
                          <span className="text-[0.65rem] font-black uppercase tracking-wider text-harissa block animate-pulse">
                            ● Étape en cours
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Details Grid: Destination vs Package */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t-2 border-ink/15">
            {/* Delivery Destination */}
            <div className="p-5 rounded-2xl border-2 border-ink bg-cream/40 space-y-2">
              <span className="text-[0.65rem] font-black uppercase tracking-wider text-ink/50 block">
                DESTINATAIRE & LIEU DE DÉPÔT
              </span>
              <p className="font-black text-base text-ink">
                {order.fullName}
              </p>
              <p className="text-xs font-bold text-ink/80">
                📞 {order.phone}
              </p>
              <p className="text-xs text-ink/80 pt-1">
                📍 {order.address}, {order.city} ({order.governorate})
              </p>
              {order.notes && (
                <p className="text-xs text-harissa italic pt-1 border-t border-ink/10">
                  Note : &ldquo;{order.notes}&rdquo;
                </p>
              )}
            </div>

            {/* Package & Payment Summary */}
            <div className="p-5 rounded-2xl border-2 border-ink bg-cream/40 space-y-2">
              <span className="text-[0.65rem] font-black uppercase tracking-wider text-ink/50 block">
                CONTENU DU COLIS & ENCAISSEMENT
              </span>

              <div className="space-y-1.5 py-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs font-bold text-ink">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{item.price * item.quantity} TND</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-ink/15 pt-2 flex justify-between text-xs text-ink/70">
                <span>Frais de livraison :</span>
                <span>{order.shippingFee} TND</span>
              </div>

              <div className="flex justify-between font-black text-base text-ink pt-1 border-t border-ink/20">
                <span>TOTAL À PAYER AU LIVREUR :</span>
                <span className="text-harissa text-lg">{order.total} TND</span>
              </div>
              <span className="text-[0.65rem] font-medium text-ink/60 block">
                💵 Espèces à la remise en main propre
              </span>
            </div>
          </div>

          {/* Support Actions */}
          <div className="mt-8 pt-6 border-t-2 border-ink/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-ink/70 text-center sm:text-left">
              Un livreur vous appellera sur le <strong>{order.phone}</strong> avant son passage.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/21698456789?text=${encodeURIComponent(`Bonjour OMNIS, je souhaite avoir des nouvelles de ma commande ${order.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sticker btn-secondary text-xs px-5 py-2.5"
              >
                💬 Support WhatsApp
              </a>
              <Link href="/" className="btn-sticker btn-primary text-xs px-5 py-2.5">
                Retour Boutique
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Demo helper if no order loaded */}
      {!order && !loading && (
        <div className="mt-12 p-8 rounded-3xl border-3 border-ink bg-sun/30 text-center max-w-lg mx-auto">
          <StickerCircle size={70} color="var(--sun)" shadow={true} innerRing={true} className="mx-auto mb-3">
            <span className="text-2xl">💡</span>
          </StickerCircle>
          <h3 className="font-black text-sm uppercase text-ink">
            Exemple de suivi
          </h3>
          <p className="text-xs text-ink/75 mt-1">
            Tu viens de faire un test ? Clique sur le code ci-dessous pour tester le suivi instantané :
          </p>
          <button
            onClick={() => {
              setSearchId("TN-942810");
              fetchTracking("TN-942810");
            }}
            className="mt-3 px-4 py-2 rounded-xl border-2 border-ink bg-white font-mono font-black text-xs text-harissa hover:bg-cream transition-colors"
          >
            Tester avec TN-942810 →
          </button>
        </div>
      )}
    </div>
  );
}

export default function TrackingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <Suspense fallback={<div className="py-20 text-center font-bold">Chargement du suivi...</div>}>
          <TrackingContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
