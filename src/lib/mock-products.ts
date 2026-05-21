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
  /** Current sale price the customer actually pays. */
  price: number;
  /** Optional "regular" / pre-discount price. When set, components render
   *  it as strikethrough next to `price` so the discount is visible
   *  (e.g. $35 → $30). Omit for products with no promo. */
  originalPrice?: number;
  badge?: "NEW" | "BESTSELLER" | "BUNDLE";
  /** Primary image used in cards. */
  image: string;
  /** Additional gallery images shown on the product detail page (in order). */
  gallery?: string[];
  scents?: string[];
  sizes?: string[];
  /** Amazon listing URL for this specific product. When unset, callers
   *  fall back to the default CarBlock Amazon listing (externalRetailers). */
  amazonHref?: string;
};

export const categories = [
  {
    slug: "car-perfume",
    label: "CarBlock",
    description:
      "Premium liquid car perfume — neutralizes smoke, pet & humidity odors and lasts up to 3 months.",
    image: "/products/carblock-new-1.png",
    badge: "BESTSELLER" as const,
    // Promo: regular $35 → sale $30. Bundle dropped to $50 (was $60).
    // Multi-pack discounts in add-to-cart.tsx scale off this base.
    price: 30,
    originalPrice: 35,
    // Deep-links directly to the product detail page so the home → detail
    // → checkout path is 3 clicks max (Shop Now → Add to Cart → Pay).
    href: "/products/carblock-millonario-150ml",
  },
  {
    slug: "car-wipes",
    label: "WipesBlock",
    description:
      "Premium extra-thick interior wipes — clean every surface and restore deep black on leather, vinyl & plastic.",
    image: "/products/wipes-new-1.png",
    badge: "NEW" as const,
    price: 30,
    originalPrice: 35,
    href: "/products/wipesblock-interior-60",
    amazonHref: "https://www.amazon.com/dp/B0GX7QF3TT",
  },
  {
    slug: "bundles",
    label: "Bundles",
    description:
      "Pair CarBlock with wipes — or double up on our signature perfume.",
    image: "/products/bundle-kit.png",
    badge: "BUNDLE" as const,
    price: 50,
    originalPrice: 60,
    href: "/products/carblock-bundle-kit",
  },
];

export const products: Product[] = [
  {
    slug: "carblock-millonario-150ml",
    name: "CarBlock 150ml",
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
    price: 30,
    originalPrice: 35,
    badge: "BESTSELLER",
    image: "/products/carblock-new-1.png",
    gallery: [
      "/products/carblock-new-2.jpg",
      "/products/carblock-new-3.png",
      "/products/carblock-new-4.png",
      "/products/carblock-new-5.png",
      "/products/carblock-new-6.jpg",
    ],
    sizes: ["150ml"],
  },
  {
    slug: "wipesblock-interior-60",
    name: "WipesBlock Interior Wipes",
    category: "wipes",
    shortDescription:
      "Premium extra-thick wipes that clean every interior surface and restore deep black on leather, vinyl & plastic. 75 wipes per pack.",
    longDescription: [
      {
        title: "Premium Car Interior Wipes That Do More Than Clean",
        body: "Not all wipes are equal. WipesBlock premium car interior wipes feature an extra-thick, oversized texture engineered to lift dirt, grease and grime. Unlike standard car cleaning wipes, each wipe is infused with the signature CarBlock fragrance, leaving your interior smelling as sharp as it looks. These are car detailing wipes for people with standards.",
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
        body: "While most auto interior wipes come in 25–30 count, WipesBlock delivers 75 premium car wipes in a resealable pouch that keeps every wipe fresh and moist from the first use to the last. More car care wipes, more value — keep one set in the car, one at home. The complete car detailing solution by Block CarBlock Millonario, the brand behind the premium car interior experience.",
      },
    ],
    price: 30,
    originalPrice: 35,
    badge: "NEW",
    amazonHref: "https://www.amazon.com/dp/B0GX7QF3TT",
    image: "/products/wipes-new-1.png",
    gallery: [
      "/products/wipes-new-2.png",
      "/products/wipes-new-3.png",
      "/products/wipes-new-4.png",
      "/products/wipes-new-5.png",
      "/products/wipes-new-6.png",
      "/products/wipes-new-7.png",
      "/products/wipes-new-8.png",
    ],
    sizes: ["75 wipes"],
  },
  {
    slug: "carblock-bundle-kit",
    name: "CarBlock x WipesBlock Kit",
    category: "bundle",
    shortDescription:
      "CarBlock perfume + WipesBlock interior wipes.",
    price: 50,
    originalPrice: 60,
    badge: "BUNDLE",
    image: "/products/bundle-kit.png",
    gallery: [
      "/products/carblock-new-1.png",
      "/products/wipes-cat-1.png",
    ],
  },
];

// Order intentionally alternates "steering wheel" shots with "exterior /
// packaging" shots so no two visually similar photos appear back-to-back
// in the marquee. Per request, after every two English testimonials we
// insert one Spanish testimonial.
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
    name: "Erica",
    car: "Mercedes GLE",
    text: "Por fin un aroma que se siente premium. Mi auto huele igual de lujoso que se ve.",
    photo: "/social/IMG_2891.png", // hand holding bottle in luxury interior
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
    name: "Daniel",
    car: "Kit completo",
    text: "Compré el kit completo y vale cada peso. La diferencia con un ambientador normal es brutal.",
    photo: "/social/IMG_2065.png", // wipes pack + carblock bottle on snowy car hood
  },
  {
    name: "Maria Jose V.",
    car: "Jeep Grand Cherokee",
    text: "Smells incredible 3 months in. Game changer.",
    photo: "/social/IMG_0382.jpg", // steering wheel
  },
  {
    name: "Robin",
    car: "Honda Civic",
    text: "Lo aplico una vez y dura meses. Mi familia ya no se queja del olor del carro.",
    photo: "/social/IMG_0729.png", // bottle in front of Honda steering wheel
  },
];
