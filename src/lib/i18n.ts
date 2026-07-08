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

    /* ---------- Product detail page (/products/[slug]) ---------- */
    "product.size": "Size",
    "product.selectYourPack": "Select your pack",
    "product.pack.single": "Single",
    "product.pack.2pack": "2-Pack",
    "product.pack.3pack": "3-Pack",
    "product.addToCart": "Add to Cart",
    "product.addedToCart": "Added to Cart",
    "product.available": "Available",
    "product.trust.shipping.label": "Free Shipping",
    "product.trust.shipping.sub": "Every US order",
    "product.trust.duration.label": "Lasts 3 Months",
    "product.trust.duration.sub": "Single application",
    "product.trust.guaranteed.label": "Guaranteed",
    "product.trust.guaranteed.sub": "Premium quality",
    "product.accordion.description": "Description",
    "product.accordion.howToUse": "How to Use It",
    "product.accordion.shipping": "Shipping & Returns",
    "product.accordion.faq": "FAQ",
    "product.shipping.bullet1": "Free standard shipping on every order — no minimum.",
    "product.shipping.bullet2": "Ships to the contiguous US (lower 48 states) only.",
    "product.shipping.bullet3": "We don't ship to Alaska, Hawaii or Puerto Rico.",
    "product.shipping.bullet4": "Orders ship within 1-2 business days.",
    "product.shipping.bullet5": "Standard delivery: 3-7 business days.",
    "product.shipping.bullet6.before": "30-day return",
    "product.shipping.bullet6.linkText": "policy",
    "product.shipping.bullet6.after": "for unused products.",
    /* ---------- FAQ module (product detail — CarBlock only) ---------- */
    "product.faq.section.eyebrow": "Frequently asked",
    "product.faq.section.title": "Questions & Answers",
    "product.faq.q1": "Does it stain carpets or leave residue?",
    "product.faq.a1":
      "No. The liquid absorbs into the carpet fibers as it falls and dries clean, with no residue and no stains.",
    "product.faq.q2": "How long does the fragrance last?",
    "product.faq.a2":
      "Up to 3 months from one full bottle. Customers report the scent returns even stronger after vacuuming.",
    "product.faq.q3": "Does it work on smoke and pet odors?",
    "product.faq.a3":
      "Yes. It neutralizes odors from smoke, pets, humidity and food instead of masking them.",
    "product.faq.q4": "How do I apply it?",
    "product.faq.a4":
      "Uncap the bottle and pour the liquid over all your floor mats, front and back, with a light touch along the edges of the seats. No need to lift the mats — it spreads and absorbs on its own.",
    "product.faq.q5": "What does it smell like?",
    "product.faq.a5":
      "A unique blend of citrus oils. Fresh and elegant, with a neutral character that is neither masculine nor feminine.",
    "product.faq.q6": "Do I use the whole bottle at once?",
    "product.faq.a6":
      "Yes. One full 150 ml application gives complete coverage and up to 3 months of fragrance.",
    "product.related.eyebrow": "You may also like",
    "product.related.title.before": "Complete Your",
    "product.related.title.highlight": "Ride",
    "product.carblock.bullet1":
      "Premium perfume-grade fragrance — not a cheap car scent",
    "product.carblock.bullet2": "Eliminates smoke, pet & humidity odors",
    "product.carblock.bullet3":
      "Long-lasting — up to 90 days per application",
    "product.carblock.bullet4":
      "Apply on carpets / mats to fragrance the entire cabin",
    "product.carblock.bullet5": "Won't stain carpets or floor mats",
    "product.wipes.shortDescription":
      "Premium extra-thick wipes that clean every interior surface and restore deep black on leather, vinyl & plastic. 75 wipes per pack.",
    "product.bundle.shortDescription":
      "CarBlock perfume + WipesBlock interior wipes.",
    /* ---------- /products shop page ---------- */
    "shop.eyebrow": "Shop",
    "shop.title.before": "For Your",
    "shop.title.highlight": "Car",
    "shop.subtitle":
      "Premium fragrance + interior care. Limited-time promo — save up to 33% on bundles.",
    "shop.empty": "No products available right now.",
    "shop.retailers.eyebrow": "Prefer your favorite marketplace?",
    "shop.retailers.title": "Also available on",
    "shop.retailers.body":
      "Find CarBlock and WipesBlock through our official storefronts.",
    "shop.retailers.open": "Open",
    "shop.card.shop": "Shop",
    "shop.card.save": "Save",
    /* ---------- Testimonials ---------- */
    "testimonials.eyebrow": "Trusted by",
    "testimonials.title": "Over 100,000 satisfied drivers",
    /* ---------- /subscribe-and-save ---------- */
    "subscribe.eyebrow": "Subscribe & Save",
    "subscribe.title": "Save 20% on every order",
    "subscribe.body":
      "CarBlock delivered to your door every 6 weeks. Always 20% off. Free shipping. Cancel anytime.",
    "subscribe.perks.save.title": "Save 20%",
    "subscribe.perks.save.body": "Every order, automatically.",
    "subscribe.perks.delivered.title": "Delivered every 6 weeks",
    "subscribe.perks.delivered.body": "Set it and forget it.",
    "subscribe.perks.shipping.title": "Free shipping",
    "subscribe.perks.shipping.body": "On every recurring order.",
    "subscribe.perks.cancel.title": "Cancel anytime",
    "subscribe.perks.cancel.body": "No long-term commitment.",
    /* ---------- Contact page (/contact) ---------- */
    "contact.breadcrumb.home": "Home",
    "contact.breadcrumb.current": "Contact",
    "contact.eyebrow": "Get in touch",
    "contact.title": "We're Here to Help",
    "contact.subtitle":
      "Questions about your order, our products or wholesale? Send us a message and we'll get back within one business day.",
    "contact.form.eyebrow": "Send a message",
    "contact.form.intro":
      "Use the form below or write to us directly at any of the addresses on the right.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.topic": "Topic",
    "contact.form.orderNumber": "Order # (optional)",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending…",
    "contact.form.sent.title": "Message Sent",
    "contact.form.sent.body":
      "Thanks for reaching out. We'll get back to you within 1 business day at",
    "contact.form.responseNote": "We typically respond within 1 business day",
    "contact.topic.order": "Order question",
    "contact.topic.return": "Return / refund",
    "contact.topic.wholesale": "Wholesale / business",
    "contact.topic.press": "Press / partnership",
    "contact.topic.other": "Other",
    "contact.sidebar.emailUs": "Email Us",
    "contact.sidebar.hours": "Hours",
    "contact.sidebar.hoursValue.line1": "Monday – Friday",
    "contact.sidebar.hoursValue.line2": "10:00 AM – 7:00 PM EST",
    "contact.sidebar.operatedBy": "Operated By",
    "contact.sidebar.operatedByValue.line1":
      "Registered company in New Jersey, USA",
    "contact.sidebar.operatedByValue.line2": "Englewood, NJ — United States",
    "contact.faq.eyebrow": "Quick answers",
    "contact.faq.title": "Frequently Asked",
    "contact.faq.q1": "How long does CarBlock fragrance last?",
    "contact.faq.a1":
      "Up to 3 months with a single application when applied correctly on floor mats, seat edges and the floor.",
    "contact.faq.q2": "Where do you ship?",
    "contact.faq.a2":
      "We ship to the contiguous US (lower 48 states) — no Alaska, Hawaii or Puerto Rico. Free standard shipping on every order.",
    "contact.faq.q3": "What's your return policy?",
    "contact.faq.a3":
      "30-day money-back guarantee on unused, unopened products. Email us with your order number and we'll send a return label.",
    "contact.faq.q4": "Do you offer wholesale?",
    "contact.faq.a4":
      "Yes. 100-unit minimum, no Amazon or Walmart resale, marketing assets included. See the Wholesale page or write us through this form.",
    /* ---------- Wholesale page (/wholesale) ---------- */
    "wholesale.breadcrumb.home": "Home",
    "wholesale.breadcrumb.current": "Wholesale",
    "wholesale.eyebrow": "Distributors program",
    "wholesale.title.before": "Sell CarBlock in your",
    "wholesale.title.highlight": "market",
    "wholesale.subtitle":
      "Carry the brand drivers love — premium car perfume + premium interior wipes — with marketing assets included.",
    "wholesale.rules.eyebrow": "Read this first",
    "wholesale.rules.title": "Program rules",
    "wholesale.rules.intro":
      "Plain and simple. Apply only if all of them work for your business — this saves you and us time.",
    "wholesale.rule1.title": "100-unit minimum",
    "wholesale.rule1.body":
      "Each order starts at 100 units. Mix CarBlock and WipesBlock as you wish.",
    "wholesale.rule2.title": "No Amazon or Walmart resale",
    "wholesale.rule2.body":
      "Distributors cannot resell on Amazon or Walmart — those marketplaces are reserved for our own listings.",
    "wholesale.rule3.title": "Respect the MAP policy",
    "wholesale.rule3.body":
      "Stick to our Minimum Advertised Price. Selling below it breaks the agreement and ends the partnership.",
    "wholesale.rule4.title": "Distributor pays shipping",
    "wholesale.rule4.body":
      "Shipping is on your side. We quote it before the invoice based on volume and destination.",
    "wholesale.rule5.title": "Creatives & videos included",
    "wholesale.rule5.body":
      "Marketing kit included with every order: hero photos, social videos, A+ banners and ad copy.",
    "wholesale.fit.eyebrow": "Quick fit check",
    "wholesale.fit.title": "Apply if all of them are true",
    "wholesale.fit.item1": "Have a real selling channel (store, online, social)",
    "wholesale.fit.item2": "Comfortable starting at 100 units",
    "wholesale.fit.item3": "Willing to skip Amazon and Walmart channels",
    "wholesale.fit.item4":
      "Will respect the MAP (minimum advertised price) policy",
    "wholesale.fit.item5": "Excited to grow CarBlock in your market",
    "wholesale.apply.eyebrow": "Apply now",
    "wholesale.apply.title": "Tell us about your business",
    "wholesale.apply.subtitle":
      "We respond within 2 business days with pricing, shipping quote and the marketing pack.",
    "wholesale.apply.form.name": "Your name",
    "wholesale.apply.form.email": "Email",
    "wholesale.apply.form.business": "Business name",
    "wholesale.apply.form.country": "Country / market",
    "wholesale.apply.form.channel": "Selling channel",
    "wholesale.apply.form.volume": "Estimated monthly volume",
    "wholesale.apply.form.notes": "Anything else (optional)",
    "wholesale.apply.form.submit": "Send application",
    "wholesale.apply.form.submitting": "Sending…",
    "wholesale.apply.form.sent.title": "Application received",
    "wholesale.apply.form.sent.body":
      "Thanks! We'll respond within 2 business days at the email you provided.",
    /* ---------- Checkout flow ---------- */
    "checkout.loading": "Loading checkout…",
    "checkout.step.shipping": "Shipping",
    "checkout.step.payment": "Payment",
    "checkout.step.confirmation": "Confirmation",
    "checkout.shipping.title": "Shipping",
    "checkout.shipping.email": "Email",
    "checkout.shipping.firstName": "First name",
    "checkout.shipping.lastName": "Last name",
    "checkout.shipping.address": "Address",
    "checkout.shipping.city": "City",
    "checkout.shipping.state": "State",
    "checkout.shipping.statePlaceholder": "Select…",
    "checkout.shipping.zip": "ZIP",
    "checkout.shipping.stateNotice":
      "We don't ship to AK, HI or PR at this time.",
    "checkout.shipping.method": "Shipping method",
    "checkout.shipping.method.standard": "Standard (3-7 business days)",
    "checkout.shipping.method.express": "Express (1-3 business days)",
    "checkout.shipping.continue": "Continue to Payment",
    "checkout.confirmation.title": "Order confirmed",
    "checkout.confirmation.heading": "Thank You",
    "checkout.confirmation.body":
      "Your order is on its way. We sent a confirmation email to",
    "checkout.confirmation.backHome": "Back to Home",
    "checkout.confirmation.keepShopping": "Keep Shopping",
    "checkout.summary.title": "Order Summary",
    "checkout.summary.subtotal": "Subtotal",
    "checkout.summary.discount": "Discount",
    "checkout.summary.shipping": "Shipping",
    "checkout.summary.tax": "Tax (est.)",
    "checkout.summary.total": "Total",
    "checkout.summary.promoLabel": "Discount code",
    "checkout.summary.promoApply": "Apply",

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

    /* ---------- Página de detalle de producto ---------- */
    "product.size": "Tamaño",
    "product.selectYourPack": "Selecciona tu pack",
    "product.pack.single": "Individual",
    "product.pack.2pack": "Pack de 2",
    "product.pack.3pack": "Pack de 3",
    "product.addToCart": "Agregar al carrito",
    "product.addedToCart": "Agregado al carrito",
    "product.available": "Disponible",
    "product.trust.shipping.label": "Envío Gratis",
    "product.trust.shipping.sub": "En toda orden de EE. UU.",
    "product.trust.duration.label": "Dura 3 Meses",
    "product.trust.duration.sub": "Una sola aplicación",
    "product.trust.guaranteed.label": "Garantizado",
    "product.trust.guaranteed.sub": "Calidad premium",
    "product.accordion.description": "Descripción",
    "product.accordion.howToUse": "Cómo usarlo",
    "product.accordion.shipping": "Envío y devoluciones",
    "product.accordion.faq": "Preguntas frecuentes",
    "product.shipping.bullet1":
      "Envío estándar gratis en toda orden — sin mínimo.",
    "product.shipping.bullet2":
      "Solo enviamos a los 48 estados contiguos de EE. UU.",
    "product.shipping.bullet3": "No enviamos a Alaska, Hawái ni Puerto Rico.",
    "product.shipping.bullet4":
      "Las órdenes se despachan dentro de 1-2 días hábiles.",
    "product.shipping.bullet5": "Entrega estándar: 3-7 días hábiles.",
    "product.shipping.bullet6.before": "Devolución de 30 días — consulta la",
    "product.shipping.bullet6.linkText": "política",
    "product.shipping.bullet6.after": "para productos sin usar.",
    /* ---------- Módulo FAQ (detalle de producto — solo CarBlock) ---------- */
    "product.faq.section.eyebrow": "Preguntas frecuentes",
    "product.faq.section.title": "Preguntas y respuestas",
    "product.faq.q1": "¿Mancha los tapetes o deja residuo?",
    "product.faq.a1":
      "No. El líquido se absorbe en las fibras del tapete al caer y se seca limpio, sin residuo ni manchas.",
    "product.faq.q2": "¿Cuánto dura la fragancia?",
    "product.faq.a2":
      "Hasta 3 meses con una botella completa. Los clientes reportan que el aroma vuelve incluso más fuerte después de aspirar.",
    "product.faq.q3": "¿Funciona contra olores a humo y mascotas?",
    "product.faq.a3":
      "Sí. Neutraliza olores de humo, mascotas, humedad y comida en lugar de solo enmascararlos.",
    "product.faq.q4": "¿Cómo lo aplico?",
    "product.faq.a4":
      "Destapa la botella y vierte el líquido sobre todos los tapetes del auto, adelante y atrás, con un toque ligero a lo largo de los bordes de los asientos. No necesitas levantar los tapetes — se esparce y absorbe solo.",
    "product.faq.q5": "¿A qué huele?",
    "product.faq.a5":
      "A una mezcla única de aceites cítricos. Fresco y elegante, con un carácter neutro que no es ni masculino ni femenino.",
    "product.faq.q6": "¿Uso toda la botella de una vez?",
    "product.faq.a6":
      "Sí. Una aplicación completa de 150 ml da cobertura total y hasta 3 meses de fragancia.",
    "product.related.eyebrow": "También te puede gustar",
    "product.related.title.before": "Completa tu",
    "product.related.title.highlight": "estilo",
    "product.carblock.bullet1":
      "Fragancia premium tipo perfume, no aroma barato de auto",
    "product.carblock.bullet2":
      "Elimina olores de humo, mascotas y humedad",
    "product.carblock.bullet3":
      "Larga duración — hasta 90 días por aplicación",
    "product.carblock.bullet4":
      "Se aplica en los tapetes para aromatizar todo el interior",
    "product.carblock.bullet5": "No mancha los tapetes ni el piso",
    "product.wipes.shortDescription":
      "Toallitas premium extra-gruesas que limpian cada superficie interior y restauran el negro profundo en cuero, vinilo y plástico. 75 toallitas por paquete.",
    "product.bundle.shortDescription":
      "Perfume CarBlock + toallitas interiores WipesBlock.",

    /* ---------- Página de tienda /products ---------- */
    "shop.eyebrow": "Tienda",
    "shop.title.before": "Para tu",
    "shop.title.highlight": "Auto",
    "shop.subtitle":
      "Fragancia premium + cuidado interior. Promoción por tiempo limitado — ahorra hasta 33% en bundles.",
    "shop.empty": "No hay productos disponibles en este momento.",
    "shop.retailers.eyebrow": "¿Prefieres tu marketplace favorito?",
    "shop.retailers.title": "También disponible en",
    "shop.retailers.body":
      "Encuentra CarBlock y WipesBlock en nuestras tiendas oficiales.",
    "shop.retailers.open": "Abrir",
    "shop.card.shop": "Ver",
    "shop.card.save": "Ahorra",

    /* ---------- Testimonios ---------- */
    "testimonials.eyebrow": "Confían en nosotros",
    "testimonials.title": "Más de 100,000 conductores satisfechos",

    /* ---------- /subscribe-and-save ---------- */
    "subscribe.eyebrow": "Suscríbete y Ahorra",
    "subscribe.title": "Ahorra 20% en cada pedido",
    "subscribe.body":
      "CarBlock entregado en tu puerta cada 6 semanas. Siempre 20% de descuento. Envío gratis. Cancela cuando quieras.",
    "subscribe.perks.save.title": "Ahorra 20%",
    "subscribe.perks.save.body": "En cada pedido, automáticamente.",
    "subscribe.perks.delivered.title": "Entrega cada 6 semanas",
    "subscribe.perks.delivered.body": "Configúralo una vez y olvídate.",
    "subscribe.perks.shipping.title": "Envío gratis",
    "subscribe.perks.shipping.body": "En cada pedido recurrente.",
    "subscribe.perks.cancel.title": "Cancela cuando quieras",
    "subscribe.perks.cancel.body": "Sin compromiso a largo plazo.",

    /* ---------- Página de contacto (/contact) ---------- */
    "contact.breadcrumb.home": "Inicio",
    "contact.breadcrumb.current": "Contacto",
    "contact.eyebrow": "Contáctanos",
    "contact.title": "Estamos para ayudarte",
    "contact.subtitle":
      "¿Preguntas sobre tu pedido, nuestros productos o ventas al por mayor? Envíanos un mensaje y te respondemos en un día hábil.",
    "contact.form.eyebrow": "Envía un mensaje",
    "contact.form.intro":
      "Usa el formulario o escríbenos directamente a cualquiera de los datos de la derecha.",
    "contact.form.name": "Nombre",
    "contact.form.email": "Correo electrónico",
    "contact.form.topic": "Asunto",
    "contact.form.orderNumber": "N.º de orden (opcional)",
    "contact.form.message": "Mensaje",
    "contact.form.send": "Enviar mensaje",
    "contact.form.sending": "Enviando…",
    "contact.form.sent.title": "Mensaje enviado",
    "contact.form.sent.body":
      "Gracias por escribirnos. Te respondemos en 1 día hábil a",
    "contact.form.responseNote":
      "Normalmente respondemos en 1 día hábil",
    "contact.topic.order": "Consulta sobre pedido",
    "contact.topic.return": "Devolución / reembolso",
    "contact.topic.wholesale": "Distribución / mayorista",
    "contact.topic.press": "Prensa / colaboración",
    "contact.topic.other": "Otro",
    "contact.sidebar.emailUs": "Escríbenos",
    "contact.sidebar.hours": "Horario",
    "contact.sidebar.hoursValue.line1": "Lunes a viernes",
    "contact.sidebar.hoursValue.line2": "10:00 AM – 7:00 PM (EST)",
    "contact.sidebar.operatedBy": "Operado por",
    "contact.sidebar.operatedByValue.line1":
      "Empresa registrada en Nueva Jersey, EE. UU.",
    "contact.sidebar.operatedByValue.line2":
      "Englewood, NJ — Estados Unidos",
    "contact.faq.eyebrow": "Respuestas rápidas",
    "contact.faq.title": "Preguntas frecuentes",
    "contact.faq.q1": "¿Cuánto dura la fragancia de CarBlock?",
    "contact.faq.a1":
      "Hasta 3 meses con una sola aplicación, aplicada correctamente en los tapetes, los bordes de los asientos y el piso.",
    "contact.faq.q2": "¿A dónde envían?",
    "contact.faq.a2":
      "Enviamos a los 48 estados contiguos de EE. UU. — sin Alaska, Hawái ni Puerto Rico. Envío estándar gratis en toda orden.",
    "contact.faq.q3": "¿Cuál es la política de devolución?",
    "contact.faq.a3":
      "Garantía de devolución de 30 días en productos sin usar y sin abrir. Escríbenos con el número de pedido y te enviamos la etiqueta de devolución.",
    "contact.faq.q4": "¿Ofrecen ventas al por mayor?",
    "contact.faq.a4":
      "Sí. Mínimo de 100 unidades, sin reventa en Amazon o Walmart, incluye paquete de marketing. Mira la página de Distribuidores o escríbenos por este formulario.",

    /* ---------- Página /wholesale ---------- */
    "wholesale.breadcrumb.home": "Inicio",
    "wholesale.breadcrumb.current": "Distribuidores",
    "wholesale.eyebrow": "Programa de distribuidores",
    "wholesale.title.before": "Vende CarBlock en tu",
    "wholesale.title.highlight": "mercado",
    "wholesale.subtitle":
      "Lleva la marca que los conductores aman — perfume para auto premium + toallitas interiores premium — con material de marketing incluido.",
    "wholesale.rules.eyebrow": "Lee esto primero",
    "wholesale.rules.title": "Reglas del programa",
    "wholesale.rules.intro":
      "Claras y directas. Postula solo si todas funcionan para tu negocio — nos ahorra tiempo a ambos.",
    "wholesale.rule1.title": "Mínimo de 100 unidades",
    "wholesale.rule1.body":
      "Cada orden arranca en 100 unidades. Combina CarBlock y WipesBlock como prefieras.",
    "wholesale.rule2.title": "Sin reventa en Amazon ni Walmart",
    "wholesale.rule2.body":
      "Los distribuidores no pueden revender en Amazon ni Walmart — esos marketplaces están reservados a nuestras propias listas.",
    "wholesale.rule3.title": "Respeta la política MAP",
    "wholesale.rule3.body":
      "Sigue nuestro Precio Mínimo Anunciado. Vender por debajo rompe el acuerdo y termina la relación.",
    "wholesale.rule4.title": "El distribuidor paga el envío",
    "wholesale.rule4.body":
      "El envío corre por tu cuenta. Lo cotizamos antes de la factura según el volumen y el destino.",
    "wholesale.rule5.title": "Creativos y videos incluidos",
    "wholesale.rule5.body":
      "Kit de marketing incluido en cada orden: fotos hero, videos para redes, banners A+ y copys de anuncios.",
    "wholesale.fit.eyebrow": "Chequeo rápido",
    "wholesale.fit.title": "Postula si todas son ciertas",
    "wholesale.fit.item1":
      "Tienes un canal de venta real (tienda, online, redes)",
    "wholesale.fit.item2": "Cómodo arrancando con 100 unidades",
    "wholesale.fit.item3":
      "Dispuesto a no vender en los canales de Amazon ni Walmart",
    "wholesale.fit.item4":
      "Respetarás la política MAP (precio mínimo anunciado)",
    "wholesale.fit.item5":
      "Te entusiasma hacer crecer CarBlock en tu mercado",
    "wholesale.apply.eyebrow": "Postula ahora",
    "wholesale.apply.title": "Cuéntanos sobre tu negocio",
    "wholesale.apply.subtitle":
      "Respondemos en 2 días hábiles con precios, cotización de envío y el paquete de marketing.",
    "wholesale.apply.form.name": "Tu nombre",
    "wholesale.apply.form.email": "Correo electrónico",
    "wholesale.apply.form.business": "Nombre del negocio",
    "wholesale.apply.form.country": "País / mercado",
    "wholesale.apply.form.channel": "Canal de venta",
    "wholesale.apply.form.volume": "Volumen mensual estimado",
    "wholesale.apply.form.notes": "Algo más (opcional)",
    "wholesale.apply.form.submit": "Enviar postulación",
    "wholesale.apply.form.submitting": "Enviando…",
    "wholesale.apply.form.sent.title": "Postulación recibida",
    "wholesale.apply.form.sent.body":
      "¡Gracias! Te respondemos en 2 días hábiles al correo que dejaste.",

    /* ---------- Checkout ---------- */
    "checkout.loading": "Cargando checkout…",
    "checkout.step.shipping": "Envío",
    "checkout.step.payment": "Pago",
    "checkout.step.confirmation": "Confirmación",
    "checkout.shipping.title": "Envío",
    "checkout.shipping.email": "Correo electrónico",
    "checkout.shipping.firstName": "Nombre",
    "checkout.shipping.lastName": "Apellido",
    "checkout.shipping.address": "Dirección",
    "checkout.shipping.city": "Ciudad",
    "checkout.shipping.state": "Estado",
    "checkout.shipping.statePlaceholder": "Selecciona…",
    "checkout.shipping.zip": "Código postal",
    "checkout.shipping.stateNotice":
      "Por ahora no enviamos a AK, HI ni PR.",
    "checkout.shipping.method": "Método de envío",
    "checkout.shipping.method.standard": "Estándar (3-7 días hábiles)",
    "checkout.shipping.method.express": "Exprés (1-3 días hábiles)",
    "checkout.shipping.continue": "Continuar al pago",
    "checkout.confirmation.title": "Pedido confirmado",
    "checkout.confirmation.heading": "Gracias",
    "checkout.confirmation.body":
      "Tu pedido va en camino. Te enviamos un correo de confirmación a",
    "checkout.confirmation.backHome": "Volver al inicio",
    "checkout.confirmation.keepShopping": "Seguir comprando",
    "checkout.summary.title": "Resumen del pedido",
    "checkout.summary.subtotal": "Subtotal",
    "checkout.summary.discount": "Descuento",
    "checkout.summary.shipping": "Envío",
    "checkout.summary.tax": "Impuestos (est.)",
    "checkout.summary.total": "Total",
    "checkout.summary.promoLabel": "Código de descuento",
    "checkout.summary.promoApply": "Aplicar",
  },
} as const;

export type TranslationKey = keyof (typeof dictionaries)["en"];
