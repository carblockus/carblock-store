import { ShopContent } from "@/components/site/shop-content";

/**
 * /products — Server Component shell. Keeps the static `metadata`
 * export for SEO and delegates all the i18n-aware UI to <ShopContent>.
 */
export default async function ProductsPage() {
  return <ShopContent />;
}

export const metadata = {
  title: "Shop — CarBlock",
  description:
    "Premium car interior care — CarBlock perfume, WipesBlock wipes and exclusive bundles.",
};
