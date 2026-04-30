"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart-context";
import { StripePayment } from "./stripe-payment";

type Step = 1 | 2 | 3;

const steps = [
  { n: 1 as Step, label: "Shipping", icon: Truck },
  { n: 2 as Step, label: "Payment", icon: CreditCard },
  { n: 3 as Step, label: "Confirmation", icon: Check },
];

export function CheckoutFlow() {
  const { items, subtotal, count, hydrated, clear } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Form state — declared at top so hook order is stable across renders
  const [ship, setShip] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    method: "standard",
  });

  // Redirect to /products if cart is empty (only after hydration, and not on confirmation)
  useEffect(() => {
    if (hydrated && count === 0 && step !== 3) {
      router.replace("/products");
    }
  }, [hydrated, count, step, router]);

  function handlePaymentSuccess(paymentIntentId: string) {
    // Use Stripe payment-intent ID (pi_...) as our order reference
    setOrderId(paymentIntentId.toUpperCase());
    setStep(3);
    setTimeout(() => clear(), 100);
  }

  const shipping = ship.method === "express" ? 15 : 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  // Wait until cart hydrates from localStorage before rendering
  if (!hydrated) {
    return (
      <div className="container-x py-32 text-center text-[var(--muted)]">
        Loading checkout…
      </div>
    );
  }

  return (
    <div className="container-x py-12 md:py-16">
      {/* Stepper */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => {
            const active = step === s.n;
            const done = step > s.n;
            const Icon = s.icon;
            return (
              <div key={s.n} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div
                    className={`h-10 w-10 rounded-full grid place-items-center border-2 transition-colors ${
                      active
                        ? "bg-[var(--gold)] border-[var(--gold)] text-black"
                        : done
                          ? "bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold)]"
                          : "bg-transparent border-[var(--border-strong)] text-[var(--muted)]"
                    }`}
                  >
                    {done ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] tracking-[0.22em] uppercase ${
                      active || done ? "text-white" : "text-[var(--muted)]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-px flex-1 mx-3 ${
                      step > s.n ? "bg-[var(--gold)]" : "bg-[var(--border)]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        {/* Left — current step form */}
        <div>
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="space-y-6"
            >
              <h2 className="font-display text-2xl uppercase tracking-[0.15em] text-white">
                Shipping
              </h2>

              <Field
                label="Email"
                value={ship.email}
                onChange={(v) => setShip({ ...ship, email: v })}
                type="email"
                required
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="First name"
                  value={ship.firstName}
                  onChange={(v) => setShip({ ...ship, firstName: v })}
                  required
                />
                <Field
                  label="Last name"
                  value={ship.lastName}
                  onChange={(v) => setShip({ ...ship, lastName: v })}
                  required
                />
              </div>
              <Field
                label="Address"
                value={ship.address}
                onChange={(v) => setShip({ ...ship, address: v })}
                required
              />
              <div className="grid sm:grid-cols-3 gap-4">
                <Field
                  label="City"
                  value={ship.city}
                  onChange={(v) => setShip({ ...ship, city: v })}
                  required
                />
                <StateField
                  value={ship.state}
                  onChange={(v) => setShip({ ...ship, state: v })}
                />
                <Field
                  label="ZIP"
                  value={ship.zip}
                  onChange={(v) => setShip({ ...ship, zip: v })}
                  required
                />
              </div>

              <div className="space-y-3 pt-2">
                <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Shipping method
                </Label>
                <RadioGroup
                  value={ship.method}
                  onValueChange={(v) => setShip({ ...ship, method: v })}
                  className="space-y-2"
                >
                  <ShippingOption
                    value="standard"
                    label="Standard (3-7 business days)"
                    price="Free"
                  />
                  <ShippingOption
                    value="express"
                    label="Express (1-3 business days)"
                    price="$15"
                  />
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12"
              >
                Continue to Payment
              </Button>
            </form>
          )}

          {step === 2 && (
            <StripePayment
              items={items}
              email={ship.email}
              total={total}
              shippingMethod={ship.method as "standard" | "express"}
              shipping={{
                email: ship.email,
                firstName: ship.firstName,
                lastName: ship.lastName,
                address: ship.address,
                city: ship.city,
                state: ship.state,
                zip: ship.zip,
                phone: ship.phone,
              }}
              onBack={() => setStep(1)}
              onSucceeded={handlePaymentSuccess}
            />
          )}

          {step === 3 && (
            <div className="text-center max-w-md mx-auto py-10 space-y-6">
              <div className="mx-auto h-20 w-20 rounded-full bg-[var(--gold)] grid place-items-center">
                <Check className="h-10 w-10 text-black" strokeWidth={3} />
              </div>
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
                  Order confirmed
                </span>
                <h2 className="font-display text-3xl md:text-4xl uppercase font-bold text-white mt-2">
                  Thank You
                </h2>
              </div>
              <p className="text-[var(--muted)]">
                Your order{" "}
                <span className="text-white font-mono font-semibold">
                  {orderId}
                </span>{" "}
                is on its way. We sent a confirmation email to{" "}
                <span className="text-white">{ship.email || "you"}</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button
                  asChild
                  className="rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 px-8"
                >
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/30 bg-transparent hover:bg-white hover:text-black text-white tracking-[0.18em] uppercase text-xs h-12 px-8"
                >
                  <Link href="/products">Keep Shopping</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right — order summary (hidden on confirmation) */}
        {step !== 3 && (
          <aside className="lg:sticky lg:top-28 self-start rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 space-y-5">
            <h3 className="font-display text-sm uppercase tracking-[0.22em] text-white border-b border-[var(--border)] pb-4">
              Order Summary
            </h3>
            <div className="space-y-4 max-h-72 overflow-y-auto">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden bg-black border border-[var(--border)]">
                    <div
                      className="absolute inset-0 bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url('${item.image}')`,
                        backgroundSize:
                          item.category === "bundle" ? "contain" : "cover",
                      }}
                    />
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-[var(--gold)] text-black text-[10px] font-bold grid place-items-center">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white font-medium line-clamp-2">
                      {item.name}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-white tabular-nums shrink-0">
                    ${item.qty * item.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--border)] pt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row
                label={
                  ship.method === "express" ? "Shipping (Express)" : "Shipping"
                }
                value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                highlight={shipping === 0}
              />
              <Row label="Tax (est.)" value={`$${tax.toFixed(2)}`} />
              <div className="border-t border-[var(--border)] pt-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-white">
                  Total
                </span>
                <span className="font-display text-2xl font-bold text-white tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 bg-[var(--surface)] border-[var(--border-strong)] text-white placeholder:text-[var(--muted-2)] rounded-md px-4"
      />
    </div>
  );
}

// 48 contiguous US states only — Alaska, Hawaii and Puerto Rico are
// intentionally excluded because we don't ship there.
const CONTIGUOUS_STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" }, { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" },
  { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" }, { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" }, { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" }, { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

function StateField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        State
      </Label>
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full bg-[var(--surface)] border border-[var(--border-strong)] text-white rounded-md px-4 cursor-pointer focus:outline-none focus:border-[var(--gold)]/70"
      >
        <option value="">Select…</option>
        {CONTIGUOUS_STATES.map((s) => (
          <option key={s.code} value={s.code}>
            {s.code} — {s.name}
          </option>
        ))}
      </select>
      <p className="text-[10px] text-[var(--muted-2)]">
        We don&apos;t ship to AK, HI or PR at this time.
      </p>
    </div>
  );
}

function ShippingOption({
  value,
  label,
  price,
}: {
  value: string;
  label: string;
  price: string;
}) {
  return (
    <Label
      htmlFor={`ship-${value}`}
      className="flex items-center justify-between gap-3 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 cursor-pointer hover:border-[var(--gold)]/60 transition-colors has-[:checked]:border-[var(--gold)] has-[:checked]:bg-[var(--gold)]/10"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem
          id={`ship-${value}`}
          value={value}
          className="border-[var(--muted)] data-[state=checked]:border-[var(--gold)] data-[state=checked]:bg-[var(--gold)]"
        />
        <span className="text-sm text-white">{label}</span>
      </div>
      <span className="text-xs uppercase tracking-[0.18em] text-[var(--gold)] font-semibold">
        {price}
      </span>
    </Label>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        {label}
      </span>
      <span
        className={`text-sm tabular-nums ${
          highlight ? "text-[var(--gold)] font-semibold" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
