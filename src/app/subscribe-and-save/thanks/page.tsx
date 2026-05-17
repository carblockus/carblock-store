import Link from "next/link";
import { Check } from "lucide-react";

export const metadata = {
  title: "You're in — CarBlock Subscription",
  robots: { index: false, follow: false },
};

export default function SubscribeThanksPage() {
  return (
    <div className="container-x py-20 md:py-32 text-center max-w-xl mx-auto space-y-6">
      <div className="mx-auto h-20 w-20 rounded-full bg-[var(--gold)] grid place-items-center">
        <Check className="h-10 w-10 text-black" strokeWidth={3} />
      </div>
      <div>
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          You&apos;re subscribed
        </span>
        <h1 className="font-display text-3xl md:text-4xl uppercase font-bold text-white mt-2">
          Welcome to the club
        </h1>
      </div>
      <p className="text-[var(--muted)]">
        Your first order is on its way. We&apos;ll automatically send you a
        fresh bottle every 6 weeks with{" "}
        <span className="text-[var(--gold)] font-semibold">20% off</span> for
        as long as your subscription is active. You can pause or cancel
        anytime by replying to your confirmation email.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-block rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 px-8 leading-[3rem]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
