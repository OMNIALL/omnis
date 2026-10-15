"use client";

import { motion } from "framer-motion";
import StickerCircle from "./StickerCircle";

export default function BrandStory() {
  return (
    <section
      id="histoire"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Sticker illustrations */}
          <motion.div
            className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Large OMNIS circle */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <StickerCircle
                size={200}
                color="var(--sun)"
                shadow={true}
                innerRing={true}
                delay={0.2}
              >
                <span
                  className="heading-xl text-2xl sm:text-3xl"
                  style={{ color: "var(--ink)" }}
                >
                  OMNIS
                </span>
              </StickerCircle>
            </motion.div>

            {/* Small circles */}
            <motion.div
              className="absolute top-4 right-8 sm:right-16"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <StickerCircle
                size={70}
                color="var(--harissa)"
                shadow={true}
                innerRing={true}
                rotate={-5}
                delay={0.4}
              >
                <span className="text-xs font-bold" style={{ color: "var(--cream)" }}>
                  ALL
                </span>
              </StickerCircle>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-8 sm:left-16"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <StickerCircle
                size={80}
                color="var(--ink)"
                borderColor="var(--ink)"
                shadow={false}
                innerRing={true}
                rotate={5}
                delay={0.6}
              >
                <span
                  className="heading-lg text-xl"
                  style={{ color: "var(--sun)" }}
                >
                  S
                </span>
              </StickerCircle>
            </motion.div>

            <motion.div
              className="absolute top-16 left-4"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <StickerCircle
                size={50}
                color="var(--sky)"
                shadow={true}
                innerRing={false}
                rotate={-3}
                delay={0.8}
              />
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="heading-xl text-3xl sm:text-4xl md:text-5xl mb-6"
              style={{ color: "var(--ink)" }}
            >
              NOTRE
              <br />
              HISTOIRE
            </h2>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed" style={{ opacity: 0.8 }}>
              <p>
                <strong style={{ color: "var(--harissa)" }}>OMNI</strong> = tout.{" "}
                <strong style={{ color: "var(--sun)" }}>S</strong> = supplément.
              </p>
              <p>
                Tout ce qu&apos;il te faut, dans une seule pastille.
              </p>
              <p>
                On a créé OMNIS parce qu&apos;on en avait marre des compléments
                alimentaires fades, compliqués, importés et hors de prix. On voulait
                quelque chose de <strong>simple</strong>, <strong>efficace</strong>,
                avec un <strong>goût de ouf</strong> — et surtout, fabriqué chez nous,
                en Tunisie.
              </p>
              <p>
                Chaque pastille OMNIS est formulée avec des ingrédients actifs dosés
                avec précision. Pas de remplissage, pas de blabla marketing.
                Juste ce qui marche.
              </p>
            </div>

            {/* Values */}
            <div className="flex flex-wrap gap-3 mt-8">
              {["🇹🇳 Made in Tunisia", "⚡ Dosé avec précision", "🍬 Goût pop"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full border-2 font-bold text-sm"
                    style={{
                      borderColor: "var(--ink)",
                      backgroundColor: "var(--sun)",
                      color: "var(--ink)",
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
