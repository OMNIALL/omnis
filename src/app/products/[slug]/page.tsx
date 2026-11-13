import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { FOCUS_BUNDLES } from "@/lib/pricing";
import { siteUrl } from "@/lib/siteUrl";
import ProductDetailClient from "./ProductDetailClient";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  const name = product.name.charAt(0) + product.name.slice(1).toLowerCase();

  if (!product.available) {
    return {
      title: `OMNIS ${name} — bientôt disponible`,
      description: `OMNIS ${name} rejoint bientôt la gamme OMNIS. Sois prévenu le premier sur WhatsApp.`,
      robots: { index: false, follow: true },
    };
  }

  const title = "OMNIS FOCUS — gélules caféine naturelle + L-théanine (39 DT)";
  const description =
    "30 gélules végétales : 100 mg de caféine naturelle de guarana, 180 mg de L-théanine, vitamines B6 et B12. Packs dès 33 DT/flacon, livraison 24–48h, paiement à la livraison partout en Tunisie.";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/products/${slug}`,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Flacon OMNIS FOCUS" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/og.jpg"] },
  };
}

/** Product structured data (schema.org) so search engines can show price and availability. */
function ProductJsonLd({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug);
  if (!product?.available) return null;
  const base = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "OMNIS FOCUS",
    description:
      "Complément alimentaire : 100 mg de caféine naturelle de guarana, 180 mg de L-théanine, vitamines B6 et B12. 30 gélules végétales fabriquées en Tunisie.",
    image: [`${base}/images/focus-bottle.webp`, `${base}/images/og.jpg`],
    brand: { "@type": "Brand", name: "OMNIS" },
    sku: product.id,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "TND",
      lowPrice: FOCUS_BUNDLES[0].price,
      highPrice: FOCUS_BUNDLES[FOCUS_BUNDLES.length - 1].price,
      offerCount: FOCUS_BUNDLES.length,
      availability: "https://schema.org/InStock",
      url: `${base}/products/${slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output only contains our own static data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

async function ProductRoute({ params }: Params) {
  const { slug } = await params;
  if (!products.some((p) => p.slug === slug)) notFound();
  return (
    <>
      <ProductJsonLd slug={slug} />
      <ProductDetailClient slug={slug} />
    </>
  );
}

export default function ProductDetailPage({ params }: Params) {
  // Suspense around the params access keeps navigation instant (Next.js cacheComponents).
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProductRoute params={params} />
    </Suspense>
  );
}
