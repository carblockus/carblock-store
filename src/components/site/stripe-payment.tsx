"use client";

import { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { ChevronLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/lib/cart-context";

const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const isTestMode = publishable?.startsWith("pk_test_") ?? false;
let stripePromise: Promise<Stripe | null> | null = null;
function getStripe() {
  if (!publishable) return Promise.resolve(null);
  if (!stripePromise) stripePromise = loadStripe(publishable);
  return stripePromise;
}

type Props = {
  items: CartItem[];
  email: string;
  total: number;
  shippingMethod: "standard" | "express";
  onBack: () => void;
  onSucceeded: (paymentIntentId: string) => void;
};

export function StripePayment({
  items,
  email,
  total,
  shippingMethod,
  onBack,
  onSucceeded,
}: Props) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/checkout/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
            shippingMethod,
          }),
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(data.error || "Failed to create intent");
        setClientSecret(data.clientSecret);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        if (!cancelled) setError(msg);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!publishable) {
    return (
      <div className="rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
        Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY. Check .env.local and restart
        the dev server.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center text-xs uppercase tracking-[0.22em] text-[var(--muted)] hover:text-white transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to shipping
      </button>

      <h2 className="font-display text-2xl uppercase tracking-[0.15em] text-white">
        Payment
      </h2>

      {isTestMode ? (
        <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-3 flex items-start gap-2 text-xs text-[var(--muted)]">
          <Lock className="h-4 w-4 text-[var(--gold)] shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-medium">Test mode — no real charges</p>
            <p>
              Use card{" "}
              <span className="font-mono text-[var(--gold)]">
                4242 4242 4242 4242
              </span>
              , any future date, any CVC.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-3 flex items-start gap-2 text-xs text-[var(--muted)]">
          <Lock className="h-4 w-4 text-[var(--gold)] shrink-0 mt-0.5" />
          <p className="text-[var(--muted)]">
            Your payment is encrypted and processed securely by{" "}
            <span className="text-white font-medium">Stripe</span>. We never see
            or store your full card number.
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {!clientSecret && !error && (
        <div className="text-sm text-[var(--muted)] py-8 text-center">
          Loading payment form…
        </div>
      )}

      {clientSecret && (
        <Elements
          stripe={getStripe()}
          options={{
            clientSecret,
            appearance: {
              theme: "night",
              variables: {
                colorPrimary: "#d4af37",
                colorBackground: "#141414",
                colorText: "#ffffff",
                colorDanger: "#ef4444",
                fontFamily: "Inter, system-ui, sans-serif",
                borderRadius: "8px",
              },
            },
          }}
        >
          <PaymentForm
            email={email}
            total={total}
            onSucceeded={onSucceeded}
          />
        </Elements>
      )}
    </div>
  );
}

function PaymentForm({
  email,
  total,
  onSucceeded,
}: {
  email: string;
  total: number;
  onSucceeded: (id: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Payment failed");
      setSubmitting(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout?stripe_return=1`,
        receipt_email: email || undefined,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed");
      setSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSucceeded(paymentIntent.id);
    } else {
      setError("Payment not completed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 disabled:opacity-50"
      >
        {submitting ? "Processing…" : `Pay $${total.toFixed(2)}`}
      </Button>

      <p className="text-[10px] text-center uppercase tracking-[0.22em] text-[var(--muted)]">
        <Lock className="inline h-3 w-3 mr-1 text-[var(--gold)]" />
        Secure 256-bit encrypted checkout · Powered by Stripe
      </p>
    </form>
  );
}
