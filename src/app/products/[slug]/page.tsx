import { notFound } from "next/navigation";
import { products } from "@/lib/mock-products";
import { ProductDetailContent } from "@/components/site/product-detail-content";

/**
 * Product detail route. This file stays a Server Component so it can
 * export `generateStaticParams` (pre-render every product at build
 * time) and `generateMetadata` (per-product SEO meta). All the actual
 * UI that needs to respond to the language toggle lives inside the
 * client component <ProductDetailContent>.
 */

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return <ProductDetailContent product={product} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — CarBlock`,
    description: product.shortDescription,
  };
}
