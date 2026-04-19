import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY env var");
}

/** Server-side Stripe singleton. Never import this from client components. */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Pin API version for stability — bump intentionally when reviewing changelogs
  apiVersion: "2024-12-18.acacia",
  appInfo: { name: "CarBlock Store", version: "0.1.0" },
});
