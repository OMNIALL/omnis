"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CodOrderForm from "@/components/CodOrderForm";
import OrderSuccess from "@/components/OrderSuccess";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { focusProduct } from "@/data/products";
import { trackAddToCart, trackInitiateCheckout } from "@/lib/analytics";
import { DELIVERY_TIME, FREE_SHIPPING_MIN_BOTTLES, linePrice } from "@/lib/pricing";
import { merciHref, type PlacedOrder } from "@/lib/placeOrder";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, cartQuote, clearCart, addItem, updateQuantity } = useCart();
  const { language } = useLanguage();
  const isAr = language === "ar";
  const router = useRouter();
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);

  const tracked = useRef(false);
  useEffect(() =>{
    if (tracked.current || items.length === 0) return;
    tracked.current = true;
    trackInitiateCheckout(items, cartQuote.total);
  }, [items, cartQuote.total]);

  const onPlaced = (order: PlacedOrder) => {
    setPlaced(order);
    router.push(merciHref(order.id));
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addFocus = () =>{
    trackAddToCart({ id: focusProduct.id, name: focusProduct.name, price: focusProduct.price, quantity: 1 });
    addItem({ id: focusProduct.id, name: focusProduct.name, price: focusProduct.price, color: focusProduct.color });
  };

  const T = isAr
    ? {
        back: "→ رجوع للبوتيك",
        title: "كمّل الكوموند",
        sub: "تخلّص كاش كي توصلك، وين ما كنت في تونس ",
        form: "معلوماتك",
        summary: "الكوموند متاعك",
        empty: "السلّة فارغة.",
        addFocus: " زيد FOCUS (39 DT)",
        qty: "الكمية",
        subtotal: "المجموع",
        savings: "التوفير",
        shipping: "التوصيل",
        free: "مجاني",
        total: "تخلّص كي توصلك",
        freeHint: (n: number) => `زيد ${n} علبة و التوصيل يولّي مجاني `,
        delivery: ` توصيل ${DELIVERY_TIME.ar} · الليفرور يكلّمك قبل ما يوصل`,
      }
    : {
        back: "← Retour à la boutique",
        title: "Finaliser ma commande",
        sub: "Paiement en espèces à la livraison, partout en Tunisie ",
        form: "Tes coordonnées",
        summary: "RÉCAPITULATIF",
        empty: "Ton panier est vide.",
        addFocus: " Ajouter FOCUS (39 DT)",
        qty: "Quantité",
        subtotal: "Sous-total",
        savings: "Économie pack",
        shipping: "Livraison",
        free: "Offerte",
        total: "Total à payer",
        freeHint: (n: number) => `Ajoute ${n} flacon et la livraison est offerte `,
        delivery: ` Livraison ${DELIVERY_TIME.fr} · le livreur t'appelle avant de passer`,
      };

  const missingForFree = FREE_SHIPPING_MIN_BOTTLES - cartQuote.bottles;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {placed ? (
          <OrderSuccess order={placed} />
        ) : (
          <>
            <div className="mb-6 sm:mb-8">
              <Link
                href="/products/focus"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/70 hover:text-harissa transition-colors mb-2"
              >
                {T.back}
              </Link>
              <h1 className="heading-xl text-3xl sm:text-5xl text-ink" style={{ fontFamily: "var(--font-heading)" }}>
                {T.title}
              </h1>
              <p className="text-sm text-ink/70 mt-1">{T.sub}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Summary first on mobile so people see what they pay */}
              <div className="lg:col-span-5 lg:order-2">
                <div
                  className="p-5 sm:p-6 rounded-3xl border bg-white lg:sticky lg:top-28"
                  style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-card)" }}
                >
                  <h2 className="heading-lg text-lg text-ink mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    {T.summary} ({cartQuote.bottles})
                  </h2>

                  {items.length === 0 ? (
                    <div className="py-6 text-center flex flex-col items-center gap-3">
                      <p className="text-sm font-bold text-muted">{T.empty}</p>
                      <button type="button" onClick={addFocus} className="btn-sticker btn-primary text-xs px-5 py-2.5">
                        {T.addFocus}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 mb-5">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-3 p-3 rounded-xl border border-ink/20 bg-cream/40"
                          >
                            <div>
                              <p className="font-black text-sm uppercase text-ink">{item.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted">{T.qty}</span>
                                <div className="flex items-center border border-line rounded-full bg-white">
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-7 h-7 font-bold"
                                    aria-label="−"
                                  >
                                    −
                                  </button>
                                  <span className="w-6 text-center font-black text-sm">{item.quantity}</span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                                    className="w-7 h-7 font-bold"
                                    aria-label="+"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            <span className="font-black text-sm text-harissa">
                              {linePrice(item.id, item.price, item.quantity)} DT
                            </span>
                          </div>
                        ))}
                      </div>

                      {missingForFree > 0 && (
                        <button
                          type="button"
                          onClick={addFocus}
                          className="w-full mb-4 p-2.5 rounded-xl border-2 border-dashed border-ink bg-sun/30 text-xs font-black text-ink hover:bg-sun/50"
                        >
                          {T.freeHint(missingForFree)}
                        </button>
                      )}

                      <div className="space-y-2 border-t-2 border-ink/15 pt-4 text-sm font-bold text-ink/80">
                        <div className="flex justify-between">
                          <span>{T.subtotal}</span>
                          <span>{cartQuote.fullPrice} DT</span>
                        </div>
                        {cartQuote.savings > 0 && (
                          <div className="flex justify-between text-harissa">
                            <span>{T.savings}</span>
                            <span>−{cartQuote.savings} DT</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>{T.shipping}</span>
                          <span>{cartQuote.shipping === 0 ? T.free : `${cartQuote.shipping} DT`}</span>
                        </div>
                        <div className="flex justify-between text-lg font-black text-ink border-t-2 border-ink pt-3">
                          <span>{T.total}</span>
                          <span className="text-harissa">{cartQuote.total} DT</span>
                        </div>
                      </div>
                      <p className="mt-4 p-3 rounded-xl bg-sun/30 border border-ink/20 text-xs text-ink/80">{T.delivery}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="lg:col-span-7 lg:order-1">
                <div
                  className="p-5 sm:p-6 rounded-3xl border bg-white"
                  style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-card)" }}
                >
                  <h2 className="heading-lg text-lg text-ink mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    {T.form}
                  </h2>
                  <CodOrderForm
                    items={items.map((i) => ({ id: i.id, name: i.name, quantity: i.quantity }))}
                    total={cartQuote.total}
                    onSuccess={onPlaced}
                    showNotes
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
