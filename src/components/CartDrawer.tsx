"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    totalPrice,
    totalItems,
    updateQuantity,
    removeItem,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: "rgba(20, 17, 15, 0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full z-[70] w-full max-w-md flex flex-col"
            style={{
              backgroundColor: "var(--cream)",
              borderLeft: "3px solid var(--ink)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-5 shrink-0"
              style={{ borderBottom: "3px solid var(--ink)" }}
            >
              <h2
                className="heading-lg text-xl"
                style={{ color: "var(--ink)" }}
              >
                PANIER ({totalItems})
              </h2>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 hover:rotate-90 transition-transform duration-300"
                style={{
                  backgroundColor: "var(--sun)",
                  borderColor: "var(--ink)",
                }}
                aria-label="Fermer le panier"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center border-3"
                    style={{
                      backgroundColor: "var(--sun)",
                      border: "3px solid var(--ink)",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </div>
                  <p className="font-bold text-lg" style={{ color: "var(--ink)" }}>
                    Ton panier est vide
                  </p>
                  <p className="text-sm opacity-60">
                    Ajoute des produits pour commencer !
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center gap-4 p-4 rounded-2xl border-2"
                      style={{
                        backgroundColor: "white",
                        borderColor: "var(--ink)",
                        boxShadow: "4px 4px 0 var(--ink)",
                      }}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                    >
                      {/* Product color dot */}
                      <div
                        className="w-12 h-12 rounded-full border-2 shrink-0 flex items-center justify-center"
                        style={{
                          backgroundColor: item.color,
                          borderColor: "var(--ink)",
                        }}
                      >
                        <span
                          className="text-xs font-black"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--cream)",
                          }}
                        >
                          {item.name.charAt(0)}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-bold text-sm uppercase tracking-wider"
                          style={{ color: "var(--ink)" }}
                        >
                          {item.name}
                        </p>
                        <p className="text-sm font-bold" style={{ color: "var(--harissa)" }}>
                          {item.price} TND
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm hover:bg-sun transition-colors"
                          style={{
                            borderColor: "var(--ink)",
                            color: "var(--ink)",
                          }}
                          aria-label="Diminuer quantité"
                        >
                          −
                        </button>
                        <span className="font-bold text-sm w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm hover:bg-sun transition-colors"
                          style={{
                            borderColor: "var(--ink)",
                            color: "var(--ink)",
                          }}
                          aria-label="Augmenter quantité"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm opacity-40 hover:opacity-100 transition-opacity"
                        aria-label="Supprimer"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="p-5 shrink-0"
                style={{ borderTop: "3px solid var(--ink)" }}
              >
                {/* Shipping note */}
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="opacity-60">Livraison</span>
                  <span className="font-bold">7 TND</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg">Total</span>
                  <span
                    className="text-2xl font-black"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--harissa)",
                    }}
                  >
                    {totalPrice + 7} TND
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-sticker btn-primary w-full text-center block"
                >
                  Commander · {totalPrice + 7} TND
                </Link>
                <p
                  className="text-center text-xs mt-3 opacity-50"
                  style={{ lineHeight: 1.4 }}
                >
                  Paiement à la livraison disponible
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
