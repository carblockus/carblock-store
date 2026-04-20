export type Category = "perfume" | "wipes" | "bundle" | "personal";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  price: number;
  badge?: "NEW" | "BESTSELLER" | "BUNDLE";
  /** Primary image used in cards. */
  image: string;
  /** Additional gallery images shown on the product detail page (in order). */
  gallery?: string[];
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
    gallery: [
      "/products/carblock-cat-2.jpg",
      "/products/carblock-cat-3.jpg",
      "/products/carblock-cat-4.jpg",
      "/products/carblock-cat-5.jpg",
    ],
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
    gallery: [
      "/products/wipes-cat-1.png",
      "/products/wipes-cat-2.png",
      "/products/wipes-cat-3.png",
      "/products/wipes-cat-4.png",
      "/products/wipes-cat-5.png",
    ],
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
    gallery: [
      "/products/carblock-cat-1.jpg",
      "/products/wipes-cat-1.png",
    ],
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
    gallery: [
      "/products/carblock-cat-1.jpg",
      "/products/carblock-cat-2.jpg",
    ],
  },
  {
    slug: "woman-block-pheromone",
    name: "Woman Block",
    category: "personal",
    shortDescription:
      "Pheromone perfume for lingerie and bed linens. The scent that stays.",
    price: 40,
    image: "/products/woman-block-cat-1.png",
    gallery: [
      "/products/woman-block-cat-2.png",
      "/products/woman-block-cat-3.png",
      "/products/woman-block-cat-4.jpg",
    ],
  },
];

// Order intentionally alternates "steering wheel" shots with "exterior /
// packaging" shots so no two visually similar photos appear back-to-back
// in the marquee.
export const testimonials = [
  {
    name: "Kevin S.",
    car: "Audi S6",
    text: "Worth every dollar. Subtle, sophisticated, lasts forever.",
    photo: "/social/IMG_6323.jpg", // steering wheel
  },
  {
    name: "Tyler M.",
    car: "Mazda CX-5",
    text: "Finally a car scent that doesn't feel cheap.",
    photo: "/social/IMG_1197.jpg", // exterior + packaging
  },
  {
    name: "Jordan P.",
    car: "Range Rover Sport",
    text: "My passengers always ask what fragrance I use.",
    photo: "/social/IMG_1125.jpg", // steering wheel
  },
  {
    name: "Brandon K.",
    car: "Mercedes GLE",
    text: "The wipes brought my leather seats back to life.",
    photo: "/social/att.Iq5h3Q4IrywgGk7YzoBOfKaDYCO5bWI52h638QtfKpw.jpg", // exterior
  },
  {
    name: "Maria Jose V.",
    car: "Jeep Grand Cherokee",
    text: "Smells incredible 3 months in. Game changer.",
    photo: "/social/IMG_0382.jpg", // steering wheel
  },
];
