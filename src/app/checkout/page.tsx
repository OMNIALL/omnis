"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerCircle from "@/components/StickerCircle";
import { useCart } from "@/context/CartContext";
import { governorates } from "@/data/products";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, addItem } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    governorate: "Tunis",
    city: "",
    address: "",
    notes: "",
    paymentMethod: "cod", // Cash on Delivery default
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shippingFee = items.length > 0 ? 7 : 0;
  const finalTotal = totalPrice + shippingFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = "TN-" + Math.floor(100000 + Math.random() * 900000);

    let orderItems = items;
    let orderSubtotal = totalPrice;
    let orderTotal = finalTotal;

    if (orderItems.length === 0) {
      orderItems = [
        {
          id: "focus-30",
          name: "FOCUS",
          price: 39,
          quantity: 1,
          color: "#E8432A",
        },
      ];
      orderSubtotal = 39;
      orderTotal = 46;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generatedId,
          fullName: formData.fullName || "Client Test",
          phone: formData.phone || "99 000 000",
          governorate: formData.governorate || "Tunis",
          city: formData.city || "Tunis",
          address: formData.address || "Centre Ville",
          notes: formData.notes || "",
          paymentMethod: formData.paymentMethod || "cod",
          items: orderItems,
          subtotal: orderSubtotal,
          shippingFee: 7,
          total: orderTotal,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur de sauvegarde");
      }
    } catch (err) {
      console.error("Order submission error:", err);
    } finally {
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderPlaced(true);
      clearCart();
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {orderPlaced ? (
            /* Order Placed Success View */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl border-3 text-center my-8"
              style={{
                backgroundColor: "white",
                borderColor: "var(--ink)",
                boxShadow: "8px 8px 0 var(--ink)",
              }}
            >
              {/* Success Sticker */}
              <div className="flex justify-center mb-6">
                <StickerCircle
                  size={120}
                  color="var(--sun)"
                  shadow={true}
                  innerRing={true}
                  rotate={3}
                >
                  <span className="text-4xl">🎉</span>
                </StickerCircle>
              </div>

              <span className="label-sm text-harissa tracking-widest text-xs">
                COMMANDE CONFIRMÉE
              </span>

              <h1
                className="heading-xl text-3xl sm:text-4xl text-ink uppercase mt-2 mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                MABROUK ! TON FOCUS ARRIVE.
              </h1>

              <div
                className="p-4 rounded-xl border-2 border-ink bg-cream mb-6 inline-block"
              >
                <p className="text-xs font-bold text-ink/70">NUMÉRO DE COMMANDE</p>
                <p className="font-mono font-black text-xl text-ink">{orderId}</p>
              </div>

              <div className="text-left space-y-2 text-sm text-ink/80 max-w-md mx-auto mb-8 bg-cream/50 p-5 rounded-2xl border border-ink/20">
                <p>
                  <strong>Destinataire :</strong> {formData.fullName}
                </p>
                <p>
                  <strong>Téléphone :</strong> {formData.phone}
                </p>
                <p>
                  <strong>Adresse :</strong> {formData.address}, {formData.city} (
                  {formData.governorate})
                </p>
                <p>
                  <strong>Mode de paiement :</strong> Paiement à la livraison (
                  {finalTotal} TND)
                </p>
                <p className="text-xs text-ink/60 pt-2 border-t border-ink/10">
                  Notre livreur vous contactera par téléphone avant la livraison
                  (24-48h).
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/track?id=${orderId}`}
                  className="btn-sticker btn-primary px-8 py-3.5 inline-flex items-center gap-2"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-harissa animate-ping" />
                  Suivre ma commande en direct
                </Link>
                <Link href="/" className="btn-sticker btn-secondary px-8 py-3.5 inline-block">
                  Retour à l&apos;accueil
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Checkout Form View */
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/70 hover:text-harissa transition-colors mb-2"
                >
                  ← Retour à la boutique
                </Link>
                <h1
                  className="heading-xl text-3xl sm:text-4xl md:text-5xl text-ink uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  FINALISER MA COMMANDE
                </h1>
                <p className="text-sm text-ink/70 mt-1">
                  Paiement sécurisé en espèces à la livraison partout en Tunisie 🇹🇳
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form Column */}
                <form
                  onSubmit={handleSubmit}
                  className="lg:col-span-7 flex flex-col gap-6"
                >
                  {/* Coordonnées */}
                  <div
                    className="p-6 rounded-3xl border-3 bg-white"
                    style={{
                      borderColor: "var(--ink)",
                      boxShadow: "6px 6px 0 var(--ink)",
                    }}
                  >
                    <h2
                      className="heading-lg text-lg text-ink uppercase mb-4 flex items-center gap-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      <span className="w-7 h-7 rounded-full bg-sun border-2 border-ink flex items-center justify-center text-xs font-black">
                        1
                      </span>
                      COORDONNÉES & CONTACT
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                          Nom & Prénom *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Ex: Mohamed Ben Salah"
                          className="w-full px-4 py-3 rounded-xl border-2 border-ink text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-harissa font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                          Numéro de téléphone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Ex: 98 123 456"
                          className="w-full px-4 py-3 rounded-xl border-2 border-ink text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-harissa font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Adresse de livraison */}
                  <div
                    className="p-6 rounded-3xl border-3 bg-white"
                    style={{
                      borderColor: "var(--ink)",
                      boxShadow: "6px 6px 0 var(--ink)",
                    }}
                  >
                    <h2
                      className="heading-lg text-lg text-ink uppercase mb-4 flex items-center gap-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      <span className="w-7 h-7 rounded-full bg-sun border-2 border-ink flex items-center justify-center text-xs font-black">
                        2
                      </span>
                      ADRESSE DE LIVRAISON (TUNISIE)
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                          Gouvernorat *
                        </label>
                        <select
                          name="governorate"
                          value={formData.governorate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-ink text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-harissa font-bold cursor-pointer"
                        >
                          {governorates.map((gov) => (
                            <option key={gov} value={gov}>
                              {gov}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                          Ville / Délégation *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Ex: Marsa, Ennasr, Menzeh..."
                          className="w-full px-4 py-3 rounded-xl border-2 border-ink text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-harissa font-medium"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                        Adresse complète (Rue, n°, bâtiment) *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Ex: 14 Rue Ibn Khaldoun, Appt 3"
                        className="w-full px-4 py-3 rounded-xl border-2 border-ink text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-harissa font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-ink mb-1.5">
                        Indications pour le livreur (Optionnel)
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Ex: Sonnette à droite, code porte 1234"
                        className="w-full px-4 py-3 rounded-xl border-2 border-ink text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-harissa font-medium resize-none"
                      />
                    </div>
                  </div>

                  {/* Mode de paiement */}
                  <div
                    className="p-6 rounded-3xl border-3 bg-white"
                    style={{
                      borderColor: "var(--ink)",
                      boxShadow: "6px 6px 0 var(--ink)",
                    }}
                  >
                    <h2
                      className="heading-lg text-lg text-ink uppercase mb-4 flex items-center gap-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      <span className="w-7 h-7 rounded-full bg-sun border-2 border-ink flex items-center justify-center text-xs font-black">
                        3
                      </span>
                      MODE DE PAIEMENT
                    </h2>

                    <label className="flex items-center gap-3 p-4 rounded-2xl border-2 border-ink bg-sun/20 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleChange}
                        className="accent-ink w-5 h-5 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-sm text-ink uppercase">
                            💵 Paiement à la livraison (Par défaut)
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sun border border-ink text-ink">
                            Recommandé
                          </span>
                        </div>
                        <p className="text-xs text-ink/70 mt-0.5">
                          Tu paies le livreur en espèces dès réception de ton colis.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Submit button for mobile/desktop */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-sticker btn-primary py-4 text-base tracking-wider disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Traitement en cours..."
                      : `Confirmer la commande · ${items.length > 0 ? finalTotal : 46} TND`}
                  </button>
                </form>

                {/* Order Summary Column */}
                <div className="lg:col-span-5">
                  <div
                    className="p-6 rounded-3xl border-3 bg-white sticky top-28"
                    style={{
                      borderColor: "var(--ink)",
                      boxShadow: "6px 6px 0 var(--ink)",
                    }}
                  >
                    <h2
                      className="heading-lg text-lg text-ink uppercase mb-4"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      RÉCAPITULATIF ({items.reduce((s, i) => s + i.quantity, 0)})
                    </h2>

                    {items.length === 0 ? (
                      <div className="py-8 text-center flex flex-col items-center gap-3">
                        <p className="text-sm font-bold text-ink/60">
                          Ton panier est actuellement vide.
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            addItem({
                              id: "focus-30",
                              name: "FOCUS",
                              price: 39,
                              color: "#E8432A",
                            })
                          }
                          className="btn-sticker btn-primary text-xs px-5 py-2.5"
                        >
                          ⚡ Ajouter 1 FOCUS pour tester
                        </button>
                        <Link
                          href="/#produits"
                          className="text-xs font-bold text-ink/70 hover:underline mt-1"
                        >
                          Ou voir tous les produits
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between gap-3 p-3 rounded-xl border border-ink/20 bg-cream/40"
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="w-8 h-8 rounded-full border border-ink flex items-center justify-center text-xs font-black text-cream"
                                  style={{ backgroundColor: item.color }}
                                >
                                  {item.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-black text-xs uppercase text-ink">
                                    {item.name}
                                  </p>
                                  <p className="text-[0.7rem] text-ink/60">
                                    Quantité : {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-black text-sm text-harissa">
                                {item.price * item.quantity} TND
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2 border-t-2 border-ink/15 pt-4 text-xs font-bold text-ink/80">
                          <div className="flex justify-between">
                            <span>Sous-total</span>
                            <span>{totalPrice} TND</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frais de livraison</span>
                            <span>{shippingFee} TND</span>
                          </div>
                          <div className="flex justify-between text-base font-black text-ink border-t-2 border-ink pt-3">
                            <span>TOTAL À PAYER</span>
                            <span className="text-harissa">{finalTotal} TND</span>
                          </div>
                        </div>

                        <div className="mt-6 p-3 rounded-xl bg-sun/30 border border-ink/20 text-[0.75rem] text-ink/80 flex items-center gap-2">
                          <span>📦</span>
                          <span>
                            Expédition express sous 24h avec suivi par SMS.
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
