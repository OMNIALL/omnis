"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

import { useLanguage } from "@/context/LanguageContext";

export default function ProductShowcase() {
  const { t } = useLanguage();

  return (
    <section id="produits" className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="heading-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ color: "var(--ink)" }}
          >
            {t.productRangeTitle}
          </h2>
          <p
            className="text-base sm:text-lg max-w-lg mx-auto opacity-60"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.productRangeSubtitle}
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
