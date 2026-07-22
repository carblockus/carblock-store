import { Gift25Content } from "@/components/site/gift25-content";

/**
 * /gift25 — landing anchored from Amazon insert QR codes. Customers
 * arrive from a physical box, see the gift hero, copy the GIFT25 code
 * and pick a product from the catalog underneath.
 *
 * Server Component shell so the static <metadata> export gets picked up
 * for SEO / link previews. All interactive UI lives in the client
 * component <Gift25Content>.
 */
export const metadata = {
  title: "Your 25% OFF Gift — CarBlock",
  description:
    "Thank you gift: 25% off your next order. Copy the code and redeem at checkout.",
};

export default function Gift25Page() {
  return <Gift25Content />;
}
