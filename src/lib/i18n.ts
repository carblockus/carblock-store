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
      "Free shipping on every US order — Premium fragrance for your car, guaranteed.",
    /** Short variant used on phones where the full sentence doesn't fit. */
    "announcement.short": "Free shipping on every US order",

    /* ---------- Navbar ---------- */
    "nav.shop": "Shop",
    "nav.howToUse": "How to Use",
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
    "hero.pill.upto": "Up to",
    "hero.pill.duration": "3 months",
    "hero.pill.suffix": "of fragrance",
    "hero.cta.shop": "Shop Now",
    "hero.cta.howItWorks": "How it Works",
    "hero.cta.learnMore": "Learn More",
    /** Trust signal under the desktop hero CTAs — sits next to 5 gold stars. */
    "hero.trust.text": "Trusted by thousands of drivers",

    /* ---------- Welcome popup ---------- */
    "popup.welcome": "Welcome to CarBlock",
    "popup.title.before": "Get",
    "popup.title.discount": "15% OFF",
    "popup.title.suffix": "your first order",
    "popup.body":
      "Join the club. Drop your email and we'll send your code straight to your inbox — free shipping on every US order.",
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

    /* ---------- /how-to-use page ---------- */
    "howto.breadcrumb.home": "Home",
    "howto.breadcrumb.current": "How to use",
    "howto.hero.title.before": "How to",
    "howto.hero.title.highlight": "use it",
    "howto.hero.body":
      "One application of CarBlock lasts up to 3 months. WipesBlock cleans and revitalizes your interior in seconds. Watch how to get the most out of every product.",
    "howto.bonus.eyebrow": "Tutorials",
    "howto.bonus.section.es": "Español",
    "howto.bonus.subtitle.es": "Step-by-step tutorials in Spanish.",
    "howto.bonus.carblock.body":
      "How to apply the perfume for up to 3 months of fragrance.",
    "howto.bonus.wipes.body":
      "Clean, restore and deodorize leather, vinyl and fabric.",
    /* ---------- /how-to-use top videos ---------- */
    "howto.videos.eyebrow": "Tutorials",
    "howto.videos.title.before": "Watch how to",
    "howto.videos.title.highlight": "use it",
    "howto.videos.body":
      "Two CarBlock tutorials (English and Spanish) plus a WipesBlock demo — watch and apply in minutes.",
    "howto.videos.carblockEn.label": "CarBlock — English",
    "howto.videos.carblockEn.sub": "How to apply for up to 3 months of fragrance.",
    "howto.videos.carblockEs.label": "CarBlock — Español",
    "howto.videos.carblockEs.sub": "Cómo aplicarlo para 3 meses de fragancia.",
    "howto.videos.wipes.label": "WipesBlock — Demo",
    "howto.videos.wipes.sub": "Clean, restore and deodorize in seconds.",
    "howto.cta.eyebrow": "Ready to try it?",
    "howto.cta.title.before": "Get yours and",
    "howto.cta.title.highlight": "feel the difference",
    "howto.cta.body": "Free shipping on all US orders. 30-day money-back guarantee.",
    "howto.cta.shopNow": "Shop now",
    "howto.cta.shopAmazon": "Available",
    "howto.cta.contact": "Have a question?",

    /* ---------- Stats / How-to-Apply ---------- */
    "stats.eyebrow": "How to apply",
    "stats.title.before": "Lasts up to",
    "stats.title.duration": "3 months",
    "stats.title.after": "with a single application.",
    "stats.body.before": "Apply the liquid directly",
    "stats.body.under": "under the floor mats",
    "stats.body.middle": ", or along the",
    "stats.body.edges": "floor edges",
    "stats.body.for": "for a",
    "stats.body.stronger": "stronger fragrance",
    "stats.body.dot": ".",
    "stats.tech1.eyebrow": "Technique 1",
    "stats.tech1.title": "Lift the mat. Pour underneath. Replace.",
    "stats.tech1.body":
      "Best for an even, long-lasting diffusion across the cabin.",
    "stats.tech2.eyebrow": "Technique 2",
    "stats.tech2.title": "Pour along the floor edge.",
    "stats.tech2.body":
      "For a stronger, more concentrated scent right from day one.",
    "stats.dist.eyebrow": "Recommended distribution",
    "stats.dist.driver.label": "Driver",
    "stats.dist.driver.where": "On driver's floor mat & seat edges",
    "stats.dist.passenger.label": "Passenger",
    "stats.dist.passenger.where": "On passenger's floor mat & seat edges",
    "stats.dist.rear.label": "Rear",
    "stats.dist.rear.where": "On rear mats, seat edges & floor",
    "stats.watchTutorial": "Watch tutorial",

    /* ---------- HowToUse video component ---------- */
    "htuse.title": "How to Use",
    "htuse.step1.title": "Open the bottle",
    "htuse.step1.body":
      "Twist off the cap. The liquid is concentrated — a little goes a long way.",
    "htuse.step2.title": "Pour on floor mats & edges",
    "htuse.step2.body":
      "Distribute along the car floor edges and underneath the mats. The fragrance slow-releases for up to 3 months.",
  },

  es: {
    /* ---------- Announcement bar ---------- */
    "announcement.text":
      "Envío gratis en toda orden de EE. UU. — Fragancia premium para tu auto, garantizada.",
    /** Short variant used on phones where the full sentence doesn't fit. */
    "announcement.short": "Envío gratis en toda orden de EE. UU.",

    /* ---------- Navbar ---------- */
    "nav.shop": "Tienda",
    "nav.howToUse": "Cómo Usar",
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
    "hero.pill.upto": "Hasta",
    "hero.pill.duration": "3 meses",
    "hero.pill.suffix": "de fragancia",
    "hero.cta.shop": "Comprar",
    "hero.cta.howItWorks": "Cómo Funciona",
    "hero.cta.learnMore": "Conocer Más",
    /** Trust signal under the desktop hero CTAs — sits next to 5 gold stars. */
    "hero.trust.text": "Miles de conductores ya confían",

    /* ---------- Welcome popup ---------- */
    "popup.welcome": "Bienvenido a CarBlock",
    "popup.title.before": "Obtén",
    "popup.title.discount": "15% DE DESCUENTO",
    "popup.title.suffix": "en tu primera compra",
    "popup.body":
      "Únete al club. Déjanos tu correo y te enviamos el código directo a tu inbox — envío gratis en toda orden de EE. UU.",
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

    /* ---------- /how-to-use page ---------- */
    "howto.breadcrumb.home": "Inicio",
    "howto.breadcrumb.current": "Cómo usar",
    "howto.hero.title.before": "Cómo",
    "howto.hero.title.highlight": "usarlo",
    "howto.hero.body":
      "Una aplicación de CarBlock dura hasta 3 meses. WipesBlock limpia y revitaliza tu interior en segundos. Mira cómo sacarle el máximo provecho a cada producto.",
    "howto.bonus.eyebrow": "Tutoriales",
    "howto.bonus.section.es": "Español",
    "howto.bonus.subtitle.es": "Tutoriales paso a paso en español.",
    "howto.bonus.carblock.body":
      "Cómo aplicar el perfume para hasta 3 meses de fragancia.",
    "howto.bonus.wipes.body":
      "Limpia, restaura y desodoriza cuero, vinilo y tela.",
    /* ---------- /how-to-use videos del inicio ---------- */
    "howto.videos.eyebrow": "Tutoriales",
    "howto.videos.title.before": "Mira cómo",
    "howto.videos.title.highlight": "usarlos",
    "howto.videos.body":
      "Dos tutoriales de CarBlock (inglés y español) más un demo de WipesBlock — míralos y aplica en minutos.",
    "howto.videos.carblockEn.label": "CarBlock — Inglés",
    "howto.videos.carblockEn.sub": "How to apply for up to 3 months of fragrance.",
    "howto.videos.carblockEs.label": "CarBlock — Español",
    "howto.videos.carblockEs.sub": "Cómo aplicarlo para 3 meses de fragancia.",
    "howto.videos.wipes.label": "WipesBlock — Demo",
    "howto.videos.wipes.sub": "Limpia, restaura y desodoriza en segundos.",
    "howto.cta.eyebrow": "¿Listo para probarlo?",
    "howto.cta.title.before": "Pídelo y",
    "howto.cta.title.highlight": "siente la diferencia",
    "howto.cta.body":
      "Envío gratis en toda orden de EE. UU. Garantía de devolución de 30 días.",
    "howto.cta.shopNow": "Comprar ahora",
    "howto.cta.shopAmazon": "Disponible",
    "howto.cta.contact": "¿Tienes una pregunta?",

    /* ---------- Stats / Cómo aplicar ---------- */
    "stats.eyebrow": "Cómo aplicar",
    "stats.title.before": "Dura hasta",
    "stats.title.duration": "3 meses",
    "stats.title.after": "con una sola aplicación.",
    "stats.body.before": "Aplica el líquido directamente",
    "stats.body.under": "bajo los tapetes",
    "stats.body.middle": ", o a lo largo de los",
    "stats.body.edges": "bordes del piso",
    "stats.body.for": "para una",
    "stats.body.stronger": "fragancia más intensa",
    "stats.body.dot": ".",
    "stats.tech1.eyebrow": "Técnica 1",
    "stats.tech1.title": "Levanta el tapete. Vierte debajo. Vuelve a colocar.",
    "stats.tech1.body":
      "Mejor para una difusión uniforme y duradera en toda la cabina.",
    "stats.tech2.eyebrow": "Técnica 2",
    "stats.tech2.title": "Vierte a lo largo del borde del piso.",
    "stats.tech2.body":
      "Para un aroma más intenso y concentrado desde el primer día.",
    "stats.dist.eyebrow": "Distribución recomendada",
    "stats.dist.driver.label": "Conductor",
    "stats.dist.driver.where":
      "En el tapete del conductor y bordes del asiento",
    "stats.dist.passenger.label": "Pasajero",
    "stats.dist.passenger.where":
      "En el tapete del pasajero y bordes del asiento",
    "stats.dist.rear.label": "Trasero",
    "stats.dist.rear.where":
      "En los tapetes traseros, bordes del asiento y piso",
    "stats.watchTutorial": "Ver tutorial",

    /* ---------- Componente HowToUse / video ---------- */
    "htuse.title": "Cómo usarlo",
    "htuse.step1.title": "Abre la botella",
    "htuse.step1.body":
      "Destornilla la tapa. El líquido es concentrado — un poco rinde mucho.",
    "htuse.step2.title": "Vierte en tapetes y bordes",
    "htuse.step2.body":
      "Distribuye a lo largo de los bordes del piso del auto y debajo de los tapetes. La fragancia se libera lentamente hasta por 3 meses.",
  },
} as const;

export type TranslationKey = keyof (typeof dictionaries)["en"];
