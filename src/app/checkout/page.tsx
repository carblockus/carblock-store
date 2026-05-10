import { Suspense } from "react";
import { CheckoutFlow } from "@/components/site/checkout-flow";
import { MetaCartHydrator } from "@/components/site/meta-cart-hydrator";

export const metadata = {
  title: "Checkout — CarBlock",
  description: "Complete your CarBlock order.",
};

export default function CheckoutPage() {
  return (
    <>
      <Suspense fallback={null}>
        <MetaCartHydrator />
      </Suspense>
      <CheckoutFlow />
    </>
  );
}
