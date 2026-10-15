import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
