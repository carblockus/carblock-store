/**
 * Translation dictionary for CarBlock.
 *
 * Add a new key by writing both the English and Spanish copy.
 * Components consume strings via useT() (see lang-context.tsx).
 *
 * For untranslated content, components fall back to the English string
 * automatically.
 */

export type Lang = "en" | "es";

export const dictionaries = {
  en: {
    /* ---------- Announcement bar ---------- */
    "announcement.text":
      "Free shipping on all orders — Premium fragrance for your car, guaranteed.",

    /* ---------- Navbar ---------- */
    "nav.shop": "Shop",
    "nav.howToUse": "How to Use",
    "nav.about": "About",
    "nav.wholesale": "Wholesale",
    "nav.contact": "Contact",
    "nav.cart": "Cart",
    "nav.account": "Account",
    "nav.search": "Search",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",

    /* ---------- Hero ---------- */
    "hero.eyebrow": "CarBlock",
    "hero.title.line1": "It's not an air freshener,",
    "hero.title.line2.before": "it's a",
    "hero.title.line2.highlight": "perfume",
    "hero.title.line2.after": "for your car.",
    "hero.paragraph":
      "CarBlock transforms the interior of your vehicle with a sophisticated, long-lasting fragrance designed for those who take care of every detail of their image.",
    "hero.pill.upto": "Up to",
    "hero.pill.duration": "3 months",
    "hero.pill.suffix": "of fragrance",
    "hero.cta.shop": "Shop Now",
    "hero.cta.howItWorks": "How it Works",

    /* ---------- Welcome popup ---------- */
    "popup.welcome": "Welcome to CarBlock",
    "popup.title.before": "Get",
    "popup.title.discount": "15% OFF",
    "popup.title.suffix": "your first order",
    "popup.body":
      "Join the club. Drop your email and we'll send your code straight to your inbox — free shipping always included.",
    "popup.emailPlaceholder": "your@email.com",
    "popup.cta": "Claim My 15% Off",
    "popup.dismiss": "No thanks, I'll pay full price",
    "popup.legal":
      "By subscribing you agree to our privacy policy. Unsubscribe anytime.",
    "popup.success.title": "You're",
    "popup.success.title.highlight": "in",
    "popup.success.body.before": "Check your inbox for your",
    "popup.success.body.code": "15% OFF",
    "popup.success.body.after": "code. See you soon.",

    /* ---------- Footer ---------- */
    "footer.tagline":
      "Premium car interior care — designed for drivers who care about every detail.",
    "footer.followUs": "Follow us",
    "footer.findUsAlso": "Find us also",
    "footer.col.shop": "Shop",
    "footer.col.help": "Help",
    "footer.col.legal": "Legal",
    "footer.link.allProducts": "All products",
    "footer.link.howToUse": "How to use",
    "footer.link.about": "About",
    "footer.link.wholesale": "Wholesale",
    "footer.link.contact": "Contact us",
    "footer.link.refund": "Refund policy",
    "footer.link.faq": "FAQ",
    "footer.link.terms": "Terms & Conditions",
    "footer.link.privacy": "Privacy Policy",
    "footer.link.cookies": "Cookie Settings",
    "footer.attribution.before":
      "Block CarBlock Millonario is operated in the US by",
    "footer.attribution.entity": "Tepew LLC",
    "footer.attribution.after": "a registered company in New Jersey.",
    "footer.copyright": "All rights reserved.",
    "footer.madeWith": "Made with",
    "footer.forDrivers": "for drivers",

    /* ---------- Lang switcher ---------- */
    "lang.toggle.aria": "Switch language",
  },

  es: {
    /* ---------- Announcement bar ---------- */
    "announcement.text":
      "Envío gratis en todas las órdenes — Fragancia premium para tu auto, garantizada.",

    /* ---------- Navbar ---------- */
    "nav.shop": "Tienda",
    "nav.howToUse": "Cómo Usar",
    "nav.about": "Nosotros",
    "nav.wholesale": "Distribuidores",
    "nav.contact": "Contacto",
    "nav.cart": "Carrito",
    "nav.account": "Cuenta",
    "nav.search": "Buscar",
    "nav.openMenu": "Abrir menú",
    "nav.closeMenu": "Cerrar menú",

    /* ---------- Hero ---------- */
    "hero.eyebrow": "CarBlock",
    "hero.title.line1": "No es un ambientador,",
    "hero.title.line2.before": "es un",
    "hero.title.line2.highlight": "perfume",
    "hero.title.line2.after": "para tu auto.",
    "hero.paragraph":
      "CarBlock transforma el interior de tu vehículo con una fragancia sofisticada y duradera, diseñada para quienes cuidan cada detalle de su imagen.",
    "hero.pill.upto": "Hasta",
    "hero.pill.duration": "3 meses",
    "hero.pill.suffix": "de fragancia",
    "hero.cta.shop": "Comprar",
    "hero.cta.howItWorks": "Cómo Funciona",

    /* ---------- Welcome popup ---------- */
    "popup.welcome": "Bienvenido a CarBlock",
    "popup.title.before": "Obtén",
    "popup.title.discount": "15% DE DESCUENTO",
    "popup.title.suffix": "en tu primera compra",
    "popup.body":
      "Únete al club. Déjanos tu correo y te enviamos el código directo a tu inbox — envío gratis siempre incluido.",
    "popup.emailPlaceholder": "tu@correo.com",
    "popup.cta": "Reclamar mi 15% OFF",
    "popup.dismiss": "No gracias, prefiero pagar el precio completo",
    "popup.legal":
      "Al suscribirte aceptas nuestra política de privacidad. Cancela cuando quieras.",
    "popup.success.title": "Estás",
    "popup.success.title.highlight": "dentro",
    "popup.success.body.before": "Revisa tu inbox para tu código de",
    "popup.success.body.code": "15% OFF",
    "popup.success.body.after": ". Nos vemos pronto.",

    /* ---------- Footer ---------- */
    "footer.tagline":
      "Cuidado interior premium para tu auto — diseñado para quienes cuidan cada detalle.",
    "footer.followUs": "Síguenos",
    "footer.findUsAlso": "También en",
    "footer.col.shop": "Tienda",
    "footer.col.help": "Ayuda",
    "footer.col.legal": "Legal",
    "footer.link.allProducts": "Todos los productos",
    "footer.link.howToUse": "Cómo usar",
    "footer.link.about": "Nosotros",
    "footer.link.wholesale": "Distribuidores",
    "footer.link.contact": "Contáctanos",
    "footer.link.refund": "Política de reembolso",
    "footer.link.faq": "Preguntas frecuentes",
    "footer.link.terms": "Términos y Condiciones",
    "footer.link.privacy": "Política de Privacidad",
    "footer.link.cookies": "Cookies",
    "footer.attribution.before":
      "Block CarBlock Millonario es operado en EE.UU. por",
    "footer.attribution.entity": "Tepew LLC",
    "footer.attribution.after": "una empresa registrada en Nueva Jersey.",
    "footer.copyright": "Todos los derechos reservados.",
    "footer.madeWith": "Hecho con",
    "footer.forDrivers": "para conductores",

    /* ---------- Lang switcher ---------- */
    "lang.toggle.aria": "Cambiar idioma",
  },
} as const;

export type TranslationKey = keyof (typeof dictionaries)["en"];
