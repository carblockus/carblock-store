# CarBlock Store

E-commerce site for **CarBlock Millonario** premium car perfume and **WipesBlock** interior wipes.

Operated in the US by **Tepew LLC**, a registered company in New Jersey.
Live at [carblock.us](https://carblock.us).

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **TypeScript**
- **Tailwind CSS v4** + custom design tokens (black / gold / white)
- **shadcn/ui** primitives on Radix
- **Stripe** Payment Element for checkout
- **Lucide** icons, **Inter / Oswald / Cinzel** fonts

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Stripe test keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `STRIPE_SECRET_KEY` | https://dashboard.stripe.com/apikeys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | https://dashboard.stripe.com/apikeys |

For production, use `sk_live_...` and `pk_live_...` keys.

## Project structure

```
src/
├─ app/                      Next.js App Router pages
│  ├─ page.tsx               Home (hero slideshow + categories + stats)
│  ├─ products/              Catalog and product detail
│  ├─ checkout/              Multi-step checkout with Stripe
│  ├─ contact/               Contact form
│  ├─ legal/                 Terms, Privacy, Refund policies
│  └─ api/checkout/          Stripe payment-intent endpoint
├─ components/site/          App-specific components
├─ components/ui/            shadcn/ui primitives
└─ lib/                      Cart context, Stripe singleton, mock catalog
```

## Deploy

Optimized for **Vercel**. Push to `main` → automatic preview/production deploys.
