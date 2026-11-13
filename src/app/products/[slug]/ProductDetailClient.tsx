"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Banknote,
  BookOpen,
  Briefcase,
  Check,
  Dumbbell,
  MessageCircle,
  Truck,
} from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CodOrderForm from "@/components/CodOrderForm";
import OrderSuccess from "@/components/OrderSuccess";
import ComingSoonProduct from "@/components/ComingSoonProduct";
import CompositionPanel from "@/components/CompositionPanel";
import EnergyCurve from "@/components/EnergyCurve";
import ProductGallery from "@/components/ProductGallery";
import TunisiaFlag from "@/components/brand/TunisiaFlag";
import { products, focusProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { trackAddToCart, trackViewContent } from "@/lib/analytics";
import { DELIVERY_TIME, FOCUS_BUNDLES, focusBundleTotal, linePrice } from "@/lib/pricing";
import { whatsappLink } from "@/config/site";
import { merciHref, type PlacedOrder } from "@/lib/placeOrder";
import { useRouter } from "next/navigation";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug) || focusProduct;
  const { language } = useLanguage();
  const isAr = language === "ar";
  const router = useRouter();
  const { addItem } = useCart();

  // 2-pack pre-selected ("Le plus choisi"); ?pack=1|3 from the home bundle cards overrides it.
  // Read via useSyncExternalStore so server and first client render match (no hydration mismatch).
  const urlPack = useSyncExternalStore(
    noopSubscribe,
    () => {
      const p = Number(new URLSearchParams(window.location.search).get("pack"));
      return p === 1 || p === 3 ? (p as 1 | 3) : null;
    },
    () => null
  );
  const [picked, setQty] = useState<1 | 2 | 3 | null>(null);
  const qty: 1 | 2 | 3 = picked ?? urlPack ?? 2;
  const [added, setAdded] = useState(false);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [formVisible, setFormVisible] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  const total = focusBundleTotal(qty);
  const bundleItems = [{ id: product.id, name: product.name, quantity: qty }];

  useEffect(() => {
    if (product.available) trackViewContent({ id: product.id, name: product.name, price: product.price });
  }, [product]);

  // Sticky mobile CTA shows only while the order form is off-screen.
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [placed]);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleAddToCart = () => {
    trackAddToCart({ id: product.id, name: product.name, price: linePrice(product.id, product.price, qty) / qty, quantity: qty });
    addItem({ id: product.id, name: product.name, price: product.price, color: product.color }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const onPlaced = (order: PlacedOrder) => {
    setPlaced(order);
    router.push(merciHref(order.id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const T = isAr
    ? {
        home: "الرئيسية",
        inStock: "متوفّر",
        limited: "أوّل دفعة محدودة",
        tagline: "الإينرجي متاع قهوة، من غير الطيحة.",
        bullets: [
          "100 ملغ كافيين طبيعي من الغوارانا، قدّ قهوة",
          "180 ملغ L-théanine باش الإينرجي تجيك رايقة",
          "كاشية وحدة في النهار · 30 كاشية = 30 يوم",
        ],
        chooseBundle: "اختار الپاك متاعك",
        bottle: (n: number) => (n === 1 ? "علبة وحدة · 30 يوم" : `${n} علب · ${n * 30} يوم`),
        perBottle: (p: number) => `${p} DT للعلبة`,
        save: (s: number) => `توفّر ${s} DT`,
        freeShip: "التوصيل مجاني",
        shipFee: "+ 7 DT توصيل",
        orderTitle: "كوموندي توّا، تخلّص كي توصلك",
        orAdd: "ولا زيدها للسلّة",
        addedTxt: "تزادت للسلّة",
        reassure: [
          { Icon: Truck, label: `توصيل ${DELIVERY_TIME.ar} · مجاني من علبتين` },
          { Icon: Banknote, label: "تخلّص كي توصلك" },
          { Icon: TunisiaFlag, label: "مصنوع في تونس" },
          { Icon: MessageCircle, label: "عندك سؤال؟ واتساب", wa: true },
        ],
        formulaTitle: "التركيبة، بالتفصيل.",
        formulaText: "الكافيين يفيّقك، و الـ L-théanine تخلّيه رايق، و فيتامين B6 و B12 يساهمو في نقص التعب.",
        forWho: "لشكون؟",
        who: [
          { Icon: BookOpen, title: "الباك و القراية", text: "باش تقعد مركّز في المراجعة، من غير 3 قهاوي و كانيتات." },
          { Icon: Briefcase, title: "الخدمة", text: "الرينيونات، الـ deadlines، و الطيحة متاع الوحدة و نص العشية." },
          { Icon: Dumbbell, title: "السبور", text: "إينرجي قبل السيونس، و راسك صافي في التمرين." },
        ],
        faqTitle: "أسئلة",
        sticky: "كوموندي",
      }
    : {
        home: "Accueil",
        inStock: "En stock",
        limited: "Premier lot limité",
        tagline: "L'énergie d'un café, sans le crash.",
        bullets: [
          "100 mg de caféine naturelle de guarana, l'équivalent d'un café",
          "180 mg de L-théanine pour une énergie plus douce",
          "1 gélule par jour · 30 gélules = 30 jours",
        ],
        chooseBundle: "Choisis ton pack",
        bottle: (n: number) => (n === 1 ? "1 flacon · 30 jours" : `${n} flacons · ${n * 30} jours`),
        perBottle: (p: number) => `${p} DT / flacon`,
        save: (s: number) => `−${s} DT`,
        freeShip: "Livraison offerte",
        shipFee: "+ 7 DT de livraison",
        orderTitle: "Commande maintenant, paie à la livraison",
        orAdd: "ou ajouter au panier",
        addedTxt: "Ajouté au panier",
        reassure: [
          { Icon: Truck, label: `Livraison ${DELIVERY_TIME.fr} · offerte dès 2 flacons` },
          { Icon: Banknote, label: "Paiement à la livraison" },
          { Icon: TunisiaFlag, label: "Fabriqué en Tunisie" },
          { Icon: MessageCircle, label: "Une question ? WhatsApp", wa: true },
        ],
        formulaTitle: "La formule, en détail.",
        formulaText:
          "La caféine apporte l'énergie, la L-théanine l'adoucit, et les vitamines B6 et B12 contribuent à réduire la fatigue.",
        forWho: "Pour qui ?",
        who: [
          { Icon: BookOpen, title: "Bac & études", text: "Rester concentré sur tes révisions, sans enchaîner cafés et canettes." },
          { Icon: Briefcase, title: "Travail", text: "Réunions, deadlines et le coup de barre de 14h." },
          { Icon: Dumbbell, title: "Sport", text: "De l'énergie avant la séance, la tête claire pendant l'effort." },
        ],
        faqTitle: "Questions fréquentes",
        sticky: "Commander",
      };

  const productFaqs = isAr
    ? [
        { q: "قدّاش من كاشية في النهار؟", a: "كاشية وحدة مع كاس ما، الصباح ولا قبل الخدمة/المراجعة/السيونس. ما تزيدش على زوز في النهار." },
        { q: "علاش L-théanine مع الكافيين؟", a: "الكافيين يفيّقك، و الـ L-théanine تخلّي الإينرجي تجيك رايقة، من غير الإحساس النيرفي متاع القهوة كي تزيد فيها." },
        { q: "شكون ما لازموش ياخو FOCUS؟", a: "المرا الحاملة ولا اللي ترضع، الصغار، و اللي حساسين للكافيين. ما تخلطوش مع برشا قهوة ولا مشروبات فيها كافيين." },
      ]
    : [
        { q: "Combien de gélules par jour ?", a: "1 gélule avec un verre d'eau, le matin ou avant une session de travail, de révision ou de sport. Ne pas dépasser 2 gélules par jour." },
        { q: "Pourquoi L-théanine + caféine ?", a: "La caféine apporte l'énergie, la L-théanine l'accompagne pour une énergie plus douce, sans le côté nerveux d'un excès de café." },
        { q: "Qui ne doit pas en prendre ?", a: "Déconseillé aux femmes enceintes ou allaitantes, aux enfants et aux personnes sensibles à la caféine. Éviter de cumuler avec d'autres sources importantes de caféine." },
      ];

  if (!product.available) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Navbar />
        <CartDrawer />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <ComingSoonProduct product={product} />
        </main>
        <Footer />
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Navbar />
        <CartDrawer />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <OrderSuccess order={placed} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-10 pb-28 lg:pb-12">
        <nav className="mb-4 sm:mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink transition-colors">{T.home}</Link>
          <span aria-hidden>/</span>
          <span className="text-ink font-medium">OMNIS {product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">
          {/* Visual */}
          <ProductGallery
            badge={
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-line px-3 py-1 text-xs font-semibold text-ink">
                <TunisiaFlag className="w-4 h-auto" />
                {isAr ? "مصنوع في تونس" : "Fabriqué en Tunisie"}
              </span>
            }
          />

          {/* Buy box */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" aria-hidden />
                  {T.inStock}
                </span>
                <span className="text-sm text-muted">·</span>
                <span className="text-sm font-semibold text-harissa">{T.limited}</span>
              </div>
              <p className="eyebrow mb-2">
                {isAr ? "100 ملغ كافيين طبيعي · 180 ملغ L-théanine" : "100 mg caféine naturelle · 180 mg L-théanine"}
              </p>
              <h1 className="heading-xl text-4xl sm:text-5xl text-ink mb-2">
                OMNIS <span className="text-harissa">{product.name}</span>
              </h1>
              <p className="text-lg text-muted mb-4">{T.tagline}</p>
              <p className="flex items-baseline gap-2 mb-5">
                <span className="heading-lg text-3xl text-ink">39 DT</span>
                <span className="text-sm text-muted">
                  {isAr ? "· تخلّص كي توصلك" : "· paiement à la livraison"}
                </span>
              </p>
              <ul className="space-y-2.5 text-[15px] text-ink">
                {T.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <Check className="w-5 h-5 text-harissa shrink-0 mt-0.5" strokeWidth={2} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bundle selector */}
            <div>
              <p className="text-sm font-semibold text-ink mb-2.5">{T.chooseBundle}</p>
              <div className="flex flex-col gap-2.5" role="radiogroup" aria-label={T.chooseBundle}>
                {FOCUS_BUNDLES.map((b) => {
                  const selected = qty === b.qty;
                  const full = product.price * b.qty;
                  const saving = full - b.price;
                  return (
                    <button
                      key={b.qty}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setQty(b.qty)}
                      className={`relative flex items-center justify-between gap-3 p-4 rounded-2xl text-start transition-colors bg-white ${
                        selected ? "border-2 border-ink" : "border border-line hover:border-ink/40"
                      }`}
                    >
                      {b.tag && (
                        <span className="absolute -top-2.5 end-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-ink text-cream">
                          {isAr ? b.tag.ar : b.tag.fr}
                        </span>
                      )}
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            selected ? "bg-ink" : "border border-ink/40"
                          }`}
                        >
                          {selected && <span className="w-2 h-2 rounded-full bg-cream" />}
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">{T.bottle(b.qty)}</span>
                          <span className="block text-sm text-muted">
                            {b.qty > 1 ? T.perBottle(Math.round(b.price / b.qty)) + " · " : ""}
                            {b.qty >= 2 ? T.freeShip : T.shipFee}
                          </span>
                        </span>
                      </span>
                      <span className="text-end shrink-0">
                        <span className="block heading-lg text-xl text-ink tabular-nums">{b.price} DT</span>
                        {saving > 0 && (
                          <span className="block text-sm tabular-nums">
                            <s className="text-muted me-1.5">{full}</s>
                            <span className="font-semibold text-harissa">{T.save(saving)}</span>
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inline COD order form */}
            <div ref={formRef} className="card p-5 sm:p-6 scroll-mt-24">
              <p className="heading-lg text-xl text-ink mb-4">{T.orderTitle}</p>
              <CodOrderForm id="order-form" items={bundleItems} total={total} onSuccess={onPlaced} />
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full text-center text-sm text-muted underline underline-offset-4 mt-3 hover:text-ink"
              >
                {added ? T.addedTxt : T.orAdd}
              </button>
            </div>

            {/* Product attribute badges (verified facts only) */}
            <ul className="flex flex-wrap gap-2">
              {(isAr
                ? ["كاشية نباتية", "كافيين طبيعي من الغوارانا", "مصنوع في تونس", "كاشية وحدة في النهار"]
                : ["Gélule végétale", "Caféine naturelle de guarana", "Fabriqué en Tunisie", "1 gélule par jour"]
              ).map((b) => (
                <li key={b} className="px-3 py-1.5 rounded-full border border-line bg-paper text-[13px] font-medium text-ink">
                  {b}
                </li>
              ))}
            </ul>

            {/* Reassurance */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5">
              {T.reassure.map(({ Icon, label, wa }) => {
                const content = (
                  <>
                    <Icon className="w-5 h-5 text-ink shrink-0" strokeWidth={1.75} />
                    <span>{label}</span>
                  </>
                );
                return (
                  <li key={label} className="text-sm text-ink">
                    {wa ? (
                      <a
                        href={whatsappLink(isAr ? "سلام OMNIS، عندي سؤال على FOCUS" : "Bonjour OMNIS, j'ai une question sur FOCUS")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 underline underline-offset-4 decoration-line hover:decoration-ink"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2.5">{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Formula */}
        <section className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            <p className="eyebrow mb-3">{isAr ? "الفورمولة" : "La formule"}</p>
            <h2 className="heading-xl text-3xl sm:text-4xl text-ink mb-4">{T.formulaTitle}</h2>
            <p className="text-lg text-muted max-w-md">{T.formulaText}</p>
          </div>
          <CompositionPanel />
        </section>

        {/* Energy curve */}
        <div className="mt-16 sm:mt-24">
          <EnergyCurve compact />
        </div>

        {/* For who */}
        <section className="mt-16 sm:mt-24">
          <h2 className="heading-xl text-3xl sm:text-4xl text-ink mb-8">{T.forWho}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {T.who.map(({ Icon, title, text }) => (
              <div key={title} className="border-t border-ink pt-5">
                <Icon className="w-6 h-6 text-harissa mb-3" strokeWidth={1.5} />
                <p className="heading-lg text-xl text-ink mb-1.5">{title}</p>
                <p className="text-muted">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 sm:mt-24 max-w-3xl">
          <h2 className="heading-xl text-3xl sm:text-4xl text-ink mb-6">{T.faqTitle}</h2>
          <div className="divide-y divide-line border-y border-line">
            {productFaqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-ink">
                  {f.q}
                  <span className="text-muted transition-transform group-open:rotate-45 text-xl leading-none" aria-hidden>+</span>
                </summary>
                <p className="mt-2 text-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10">
            <button type="button" onClick={scrollToForm} className="btn-sticker btn-primary">
              {T.sticky} · {total} DT
            </button>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <AnimatePresence>
        {!formVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 inset-x-0 z-40 lg:hidden px-4 pb-4 pt-3 border-t border-line bg-paper/95 backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <div className="leading-tight">
                <p className="font-semibold text-ink text-sm">FOCUS · {T.bottle(qty)}</p>
                <p className="text-sm text-muted">
                  {total} DT · {isAr ? "تخلّص كي توصلك" : "paiement à la livraison"}
                </p>
              </div>
              <button type="button" onClick={scrollToForm} className="btn-sticker btn-primary flex-1 justify-center py-3 text-sm">
                {T.sticky}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
