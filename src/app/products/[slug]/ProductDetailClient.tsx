"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import StickerCircle from "@/components/StickerCircle";
import IngredientPill from "@/components/IngredientPill";
import { products, focusProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug) || focusProduct;

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"ingredients" | "usage" | "faq">("ingredients");
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        color: product.color,
      });
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const productFaqs = [
    {
      q: "Combien de pastilles par prise ?",
      a: "1 seule pastille suffit pour 4 à 6 heures de concentration active. Ne pas dépasser 2 pastilles par jour.",
    },
    {
      q: "Pourquoi L-Théanine + Caféine ?",
      a: "C'est le combo nootropique le plus étudié au monde : la L-théanine supprime les tremblements et l'anxiété causés par la caféine, pour un focus laser parfaitement fluide.",
    },
    {
      q: "Est-ce adapté aux étudiants et professionnels ?",
      a: "Oui, c'est idéal pour les révisions, les journées denses, le code, l'écriture ou toute tâche demandant une concentration soutenue sans pic d'excitation.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/70">
          <Link href="/" className="hover:text-harissa transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/#produits" className="hover:text-harissa transition-colors">
            Produits
          </Link>
          <span>/</span>
          <span className="text-harissa">{product.name}</span>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Product Visual / Sticker Composition Gallery */}
          <div
            className="rounded-3xl p-8 sm:p-12 relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[500px] border-3 overflow-hidden"
            style={{
              backgroundColor: product.color,
              borderColor: "var(--ink)",
              boxShadow: "8px 8px 0 var(--ink)",
            }}
          >
            {/* Top Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border-2 bg-cream text-ink border-ink">
                30 PASTILLES
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border-2 bg-sun text-ink border-ink">
                🇹🇳 MADE IN TN
              </span>
            </div>

            {/* Overlapping Sticker Composition */}
            <div className="relative my-8 flex items-center justify-center w-full">
              {/* Main Yellow Circle */}
              <StickerCircle
                size={210}
                color="var(--sun)"
                shadow={true}
                innerRing={true}
                rotate={-2}
              >
                <div className="text-center">
                  <span
                    className="heading-xl text-3xl sm:text-4xl text-ink block leading-none"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    FOCUS
                  </span>
                  <span className="text-[0.65rem] font-bold tracking-widest text-ink/70 uppercase mt-1 block">
                    30 PASTILLES
                  </span>
                </div>
              </StickerCircle>

              {/* Cream Circle Top-Right */}
              <div className="absolute -top-4 right-8 sm:right-16">
                <StickerCircle
                  size={100}
                  color="var(--cream)"
                  shadow={true}
                  innerRing={true}
                  rotate={3}
                >
                  <span className="text-xs font-black text-ink uppercase text-center leading-tight">
                    ZÉRO
                    <br />
                    CRASH
                  </span>
                </StickerCircle>
              </div>

              {/* Black S Badge Circle Bottom-Right */}
              <div className="absolute -bottom-4 right-12 sm:right-20">
                <StickerCircle
                  size={80}
                  color="var(--ink)"
                  borderColor="var(--ink)"
                  shadow={false}
                  innerRing={true}
                  rotate={-4}
                >
                  <span
                    className="text-3xl font-black text-sun"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    S
                  </span>
                </StickerCircle>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="text-center mt-4">
              <p className="label-sm text-cream opacity-80 text-xs">
                {product.caption}
              </p>
            </div>
          </div>

          {/* Right: Product Buy Box & Details */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sun text-ink border-2 border-ink">
                  EN STOCK · DISPONIBLE
                </span>
                <span className="text-xs font-bold text-ink/60">
                  ⭐ 4.9/5 (128 avis vérifiés)
                </span>
              </div>

              <h1
                className="heading-xl text-4xl sm:text-5xl text-ink uppercase mt-2 mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {product.name}
              </h1>

              <p className="text-lg font-bold text-harissa mb-4">
                {product.tagline}
              </p>

              <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Price block */}
            <div
              className="p-5 rounded-2xl border-3 flex items-center justify-between"
              style={{
                backgroundColor: "white",
                borderColor: "var(--ink)",
                boxShadow: "4px 4px 0 var(--ink)",
              }}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block">
                  PRIX TOTAL TTC
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-4xl font-black text-ink"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {product.price * quantity}
                  </span>
                  <span className="text-lg font-black text-harissa">TND</span>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-ink/60">
                  Qté :
                </span>
                <div className="flex items-center border-2 border-ink rounded-full bg-cream">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-full font-bold flex items-center justify-center hover:bg-sun transition-colors"
                    aria-label="Diminuer"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-black text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-full font-bold flex items-center justify-center hover:bg-sun transition-colors"
                    aria-label="Augmenter"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="btn-sticker btn-primary w-full text-base py-4 text-center justify-center"
            >
              {addedAnimation ? "✓ AJOUTÉ AU PANIER !" : "AJOUTER AU PANIER"}
            </button>

            {/* Reassurance pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 p-3 rounded-xl border-2 border-ink bg-cream text-xs font-bold">
                <span>🚚</span>
                <span>Livraison 24-48h (7 TND)</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl border-2 border-ink bg-cream text-xs font-bold">
                <span>💵</span>
                <span>Paiement à la livraison</span>
              </div>
            </div>

            {/* Tabs for details */}
            <div className="pt-4 border-t-2 border-ink/20">
              <div className="flex border-b-2 border-ink gap-2">
                {[
                  { id: "ingredients", label: "Ingrédients actifs" },
                  { id: "usage", label: "Conseils d'utilisation" },
                  { id: "faq", label: "FAQ Produit" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`py-2.5 px-4 font-bold text-xs uppercase tracking-wider transition-all rounded-t-xl border-t-2 border-x-2 -mb-[2px] ${
                      activeTab === tab.id
                        ? "bg-sun border-ink text-ink"
                        : "bg-transparent border-transparent text-ink/60 hover:text-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div
                className="p-5 rounded-b-2xl border-x-2 border-b-2 border-ink bg-white"
                style={{ minHeight: "180px" }}
              >
                <AnimatePresence mode="wait">
                  {activeTab === "ingredients" && (
                    <motion.div
                      key="ingredients"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.ingredients.map((ing) => (
                          <IngredientPill
                            key={ing.name}
                            name={ing.name}
                            dosage={ing.dosage}
                            color={ing.color}
                            size="md"
                          />
                        ))}
                      </div>
                      <div className="space-y-2 text-xs leading-relaxed text-ink/80">
                        {product.ingredients.map((ing) => (
                          <div
                            key={ing.name}
                            className="p-2.5 rounded-lg border border-ink/15 bg-cream/50"
                          >
                            <span className="font-black text-ink">{ing.name} ({ing.dosage}) :</span>{" "}
                            {ing.description}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "usage" && (
                    <motion.div
                      key="usage"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3 text-sm text-ink/80"
                    >
                      <p className="font-bold text-ink">
                        {product.usage}
                      </p>
                      <ul className="list-disc pl-5 space-y-1.5 text-xs text-ink/75">
                        <li>À consommer avant une séance d&apos;étude, une réunion ou une session de travail intense.</li>
                        <li>Ne pas consommer avec un excès d&apos;autres sources de caféine.</li>
                        <li>Déconseillé aux enfants et aux femmes enceintes ou allaitantes.</li>
                        <li>Conserver dans un endroit frais, sec et à l&apos;abri de la lumière.</li>
                      </ul>
                    </motion.div>
                  )}

                  {activeTab === "faq" && (
                    <motion.div
                      key="faq"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      {productFaqs.map((faq, idx) => (
                        <div key={idx} className="border-b border-ink/10 pb-2 last:border-0">
                          <p className="font-bold text-xs text-ink">{faq.q}</p>
                          <p className="text-xs text-ink/75 mt-1">{faq.a}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
