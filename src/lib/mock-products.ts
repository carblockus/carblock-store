export type Category = "perfume" | "wipes" | "bundle" | "personal";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  price: number;
  badge?: "NEW" | "BESTSELLER" | "BUNDLE";
  image: string;
  scents?: string[];
  sizes?: string[];
};

export const categories = [
  {
    slug: "car-perfume",
    label: "CarBlock",
    description:
      "Our signature long-lasting car perfume — up to 3 months per application.",
    image: "/products/carblock-perfume-main.jpg",
    badge: "BESTSELLER" as const,
    price: 35,
    href: "/products?category=perfume",
  },
  {
    slug: "car-wipes",
    label: "WipesBlock",
    description:
      "Biodegradable wipes that clean and revitalize leather, vinyl and seats.",
    image: "/products/wipes-main.png",
    badge: "NEW" as const,
    price: 35,
    href: "/products?category=wipes",
  },
  {
    slug: "bundles",
    label: "Bundles",
    description:
      "Pair CarBlock with wipes — or double up on our signature perfume.",
    image: "/products/bundle-kit.png",
    badge: "BUNDLE" as const,
    price: 60,
    href: "/products?category=bundle",
  },
];

export const products: Product[] = [
  {
    slug: "carblock-millonario-150ml",
    name: "CarBlock Millonario 150ml",
    category: "perfume",
    shortDescription:
      "Our signature long-lasting car perfume. One application, up to 3 months.",
    price: 35,
    badge: "BESTSELLER",
    image: "/products/carblock-perfume-main.jpg",
    sizes: ["150ml"],
  },
  {
    slug: "wipesblock-interior-60",
    name: "WipesBlock Interior Wipes",
    category: "wipes",
    shortDescription:
      "Clean and revitalize leather, vinyl and fabric in seconds.",
    price: 35,
    badge: "NEW",
    image: "/products/wipes-main.png",
    sizes: ["30 wipes", "60 wipes"],
  },
  {
    slug: "carblock-bundle-kit",
    name: "CarBlock x WipesBlock Kit",
    category: "bundle",
    shortDescription:
      "CarBlock Millonario perfume + WipesBlock interior wipes.",
    price: 60,
    badge: "BUNDLE",
    image: "/products/bundle-kit.png",
  },
  {
    slug: "carblock-2-pack",
    name: "CarBlock 2-Pack",
    category: "bundle",
    shortDescription:
      "Two bottles of CarBlock Millonario — stock up or gift one.",
    price: 60,
    badge: "BUNDLE",
    image: "/products/bundle-2pack.png",
  },
  {
    slug: "woman-block-pheromone",
    name: "Woman Block",
    category: "personal",
    shortDescription:
      "Pheromone perfume for lingerie and bed linens. The scent that stays.",
    price: 35,
    image: "/products/woman-block-main.png",
  },
];

export const testimonials = [
  { name: "Marcus T.", car: "BMW M3", text: "Smells incredible 3 months in. Game changer." },
  { name: "Daniela R.", car: "Tesla Model Y", text: "Finally a car scent that doesn't feel cheap." },
  { name: "Jordan P.", car: "Range Rover Sport", text: "My passengers always ask what fragrance I use." },
  { name: "Ana L.", car: "Mercedes GLE", text: "The wipes brought my leather seats back to life." },
  { name: "Kevin S.", car: "Audi RS6", text: "Worth every dollar. Subtle, sophisticated, lasts forever." },
];
