export type Category = "perfume" | "wipes" | "bundle";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  /** One-line tagline used on cards and meta descriptions. */
  shortDescription: string;
  /** Full marketing description shown on the product detail page.
   *  Each entry becomes a paragraph or bullet. Falls back to a generic
   *  description if not provided. */
  longDescription?: { title: string; body: string }[];
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
      "Premium liquid car perfume — neutralizes smoke, pet & humidity odors and lasts up to 3 months.",
    image: "/products/carblock-perfume-main.jpg",
    badge: "BESTSELLER" as const,
    price: 35,
    href: "/products",
  },
  {
    slug: "car-wipes",
    label: "WipesBlock",
    description:
      "Luxury extra-thick interior wipes — clean every surface and restore deep black on leather, vinyl & plastic.",
    image: "/products/wipes-main.png",
    badge: "NEW" as const,
    price: 35,
    href: "/products",
  },
  {
    slug: "bundles",
    label: "Bundles",
    description:
      "Pair CarBlock with wipes — or double up on our signature perfume.",
    image: "/products/bundle-kit.png",
    badge: "BUNDLE" as const,
    price: 60,
    href: "/products",
  },
];

export const products: Product[] = [
  {
    slug: "carblock-millonario-150ml",
    name: "CarBlock Millonario 150ml",
    category: "perfume",
    shortDescription:
      "Premium liquid car perfume that neutralizes smoke, pet & humidity odors and lasts up to 3 months.",
    longDescription: [
      {
        title: "Premium Car Perfume",
        body: "More than an air freshener — this liquid fragrance delivers an elegant, modern aroma far superior to vent clips or hanging trees.",
      },
      {
        title: "Long-Lasting Scent (Up to 3 Months)",
        body: "The liquid formula adheres to interior fibers, maintaining a stable, long-lasting scent that outperforms standard car fresheners.",
      },
      {
        title: "Advanced Odor Neutralizer",
        body: "Effectively neutralizes strong odors from smoke, humidity and pets, leaving a clean and sophisticated fragrance throughout your vehicle.",
      },
      {
        title: "Unique Floor Application",
        body: "Pour directly onto the carpet under the mats for a slow-release diffusion that keeps your car smelling fresh for weeks.",
      },
      {
        title: "Premium Quality & Large Capacity",
        body: "Proudly made in Colombia with high-quality ingredients. Each bottle contains 150ml (approx. 5 fl oz) of concentrated car fragrance — full coverage for sedans, SUVs and trucks. A level of luxury that standard car scents simply cannot match.",
      },
    ],
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
      "Luxury extra-thick wipes that clean every interior surface and restore deep black on leather, vinyl & plastic. 75 wipes per pack.",
    longDescription: [
      {
        title: "Luxury Car Interior Wipes That Do More Than Clean",
        body: "Not all wipes are equal. WipesBlock luxury car interior wipes feature an extra-thick, oversized premium texture engineered to lift dirt, grease and grime. Unlike standard car cleaning wipes, each wipe is infused with the signature CarBlock fragrance, leaving your interior smelling as sharp as it looks. These are car detailing wipes for people with standards.",
      },
      {
        title: "Helps Restore Deep Black Color",
        body: "The only car wipes that help bring the black back. Most car wipes clean the surface — WipesBlock goes further: our formula revives faded, dull black surfaces back to their original rich, deep finish. Acts as a black trim restorer for vinyl, plastic dashboards and leather seats. Results without a separate restorer product. Works on vinyl trim, plastic, dashboard, leather seats and leather accessories including purses and bags.",
      },
      {
        title: "Cleans Every Interior Surface",
        body: "One product. Zero streaks. Zero residue. True car interior cleaner wipes cover every surface: dashboard, center console, door panels, leather seats, vinyl trim, plastic trim and carpet. The streak-free, lint-free formula removes dust, fingerprints, grease and grime without leaving residue or damaging delicate finishes. Safe on all automotive interior surfaces — from steering wheel to upholstery.",
      },
      {
        title: "Not Just for Cars",
        body: "The leather color restorer wipes for purses, bags and accessories. WipesBlock doubles as leather purse cleaning wipes and black leather bag cleaner — restoring the deep black color and reviving the shine of leather goods: purses, handbags, shoes, belts and more. The same leather color restorer formula that works on your car seats works on your everyday leather accessories. One premium wipe. Two worlds. Because your standards don't stop at the door.",
      },
      {
        title: "75 Premium Car Wipes — More Than Most. Better Than All.",
        body: "While most auto interior wipes come in 25–30 count, WipesBlock delivers 75 premium car wipes in a resealable pouch that keeps every wipe fresh and moist from the first use to the last. More car care wipes, more value — keep one set in the car, one at home. The complete car detailing solution by Block CarBlock Millonario, the brand behind the luxury car interior experience.",
      },
    ],
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
    sizes: ["75 wipes"],
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
    name: "David R.",
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
