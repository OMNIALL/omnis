"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import StickerCircle from "./StickerCircle";
import IngredientPill from "./IngredientPill";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      className="relative flex flex-col overflow-hidden card-sticker"
      style={{
        backgroundColor: product.color,
        borderRadius: "24px",
        minHeight: "480px",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between p-5 sm:p-6">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span
            className="text-lg sm:text-xl font-black tracking-tight"
            style={{
              fontFamily: "var(--font-heading)",
              color: product.available ? "var(--cream)" : product.textColor,
            }}
          >
            OMNI
          </span>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center border-2"
            style={{
              backgroundColor: "var(--sun)",
              borderColor: "var(--ink)",
            }}
          >
            <span
              className="text-xs font-black"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--ink)",
              }}
            >
              S
            </span>
          </div>
        </div>
        <span
          className="label-sm"
          style={{
            color: product.available ? "var(--cream)" : product.textColor,
            fontSize: "0.65rem",
            opacity: 0.8,
          }}
        >
          {product.pastilles} PASTILLES
        </span>
      </div>

      {/* Sticker Circles */}
      <div className="flex-1 flex items-center justify-center px-6 py-4 relative">
        <StickerCircle
          size={140}
          color="var(--sun)"
          shadow={true}
          innerRing={true}
          animate={false}
        >
          <span
            className="heading-lg text-xl sm:text-2xl tracking-tighter"
            style={{ color: "var(--ink)", fontFamily: "var(--font-heading)" }}
          >
            {product.name}
          </span>
        </StickerCircle>
        <div className="absolute top-2 right-8">
          <StickerCircle
            size={60}
            color="var(--cream)"
            shadow={true}
            innerRing={true}
            rotate={-3}
            animate={false}
          />
        </div>
        <div className="absolute bottom-4 right-4">
          <StickerCircle
            size={45}
            color="var(--ink)"
            borderColor="var(--ink)"
            shadow={false}
            innerRing={false}
            rotate={3}
            animate={false}
          >
            <span
              className="text-sm font-black"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--sun)",
              }}
            >
              S
            </span>
          </StickerCircle>
        </div>

        {/* Coming Soon Sticker */}
        {!product.available && (
          <motion.div
            className="absolute top-1/2 left-1/2 z-20"
            style={{
              transform: "translate(-50%, -50%) rotate(-8deg)",
            }}
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            <div
              className="px-6 py-3 rounded-full border-3 font-black uppercase tracking-wider text-sm"
              style={{
                backgroundColor: "var(--ink)",
                color: "var(--sun)",
                border: "3px solid var(--ink)",
                boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
                fontFamily: "var(--font-heading)",
              }}
            >
              BIENTÔT
            </div>
          </motion.div>
        )}
      </div>

      {/* Product Name */}
      <div className="px-5 sm:px-6 pb-2">
        {product.available ? (
          <Link href={`/products/${product.slug}`} className="group block">
            <h3
              className="heading-xl text-3xl sm:text-4xl transition-transform duration-200 group-hover:translate-x-1"
              style={{
                color: "var(--cream)",
              }}
            >
              {product.name}
            </h3>
          </Link>
        ) : (
          <h3
            className="heading-xl text-3xl sm:text-4xl"
            style={{
              color: product.textColor,
            }}
          >
            {product.name}
          </h3>
        )}
      </div>

      {/* Ingredient Pills (only for available products) */}
      {product.available && product.ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 px-5 sm:px-6 pb-3">
          {product.ingredients.slice(0, 2).map((ing) => (
            <IngredientPill
              key={ing.name}
              name={ing.name}
              dosage={ing.dosage}
              color={ing.color}
              size="sm"
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        className="px-5 sm:px-6 pb-5 sm:pb-6 mt-auto"
      >
        <p
          className="label-sm mb-4"
          style={{
            color: product.available ? "var(--cream)" : product.textColor,
            fontSize: "0.6rem",
            opacity: 0.6,
          }}
        >
          {product.caption}
        </p>

        {product.available && (
          <div className="flex items-center justify-between gap-3">
            <span
              className="text-2xl font-black"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--cream)",
              }}
            >
              {product.price} <span className="text-base">TND</span>
            </span>
            <button
              id={`add-to-cart-${product.id}`}
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  color: product.color,
                })
              }
              className="btn-sticker btn-primary text-sm px-4 py-2.5"
              style={{ fontSize: "0.75rem" }}
            >
              Ajouter au panier
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
