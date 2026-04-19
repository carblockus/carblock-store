import Link from "next/link";
import { ChevronRight, Mail, MapPin, Clock, Building2 } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";

export const metadata = {
  title: "Contact Us — CarBlock",
  description:
    "Get in touch with the CarBlock team. We respond within 1 business day.",
};

const channels = [
  {
    icon: Mail,
    label: "Email us",
    value: "info@carblock.us",
    href: "mailto:info@carblock.us",
  },
];

const faqs = [
  {
    q: "How long does CarBlock fragrance last?",
    a: "Up to 3 months with a single application when applied on floor mats, seat edges and the floor.",
  },
  {
    q: "Where do you ship?",
    a: "Currently US-only, including Alaska and Hawaii. Standard shipping is free.",
  },
  {
    q: "What's your return policy?",
    a: "30 days for unused, unopened products. See our Refund Policy for details.",
  },
  {
    q: "Do you offer wholesale?",
    a: "Yes — email info@carblock.us with your business details and we'll send our wholesale price list.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">Contact</span>
        </div>
      </div>

      {/* Header */}
      <section className="container-x py-12 md:py-16 text-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          Get in touch
        </span>
        <h1 className="font-display text-5xl md:text-6xl uppercase font-bold mt-3 text-white">
          We&apos;re Here <span className="text-gold-gradient">to Help</span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-[var(--muted)]">
          Questions about your order, our products or wholesale? Send us a
          message and we&apos;ll get back within one business day.
        </p>
      </section>

      {/* Form + Info */}
      <section className="container-x pb-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Form */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
            <h2 className="font-display text-2xl uppercase tracking-[0.15em] text-white mb-1">
              Send a message
            </h2>
            <p className="text-sm text-[var(--muted)] mb-6">
              Use the form below or write to us directly at any of the
              addresses on the right.
            </p>
            <ContactForm />
          </div>

          {/* Sidebar — channels + business info */}
          <aside className="space-y-6">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-display text-xs uppercase tracking-[0.22em] text-[var(--gold)] mb-4">
                Email Us
              </h3>
              <ul className="space-y-3">
                {channels.map((c) => (
                  <li key={c.value} className="flex items-start gap-3">
                    <c.icon className="h-4 w-4 text-[var(--gold)] mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                        {c.label}
                      </p>
                      <a
                        href={c.href}
                        className="text-sm text-white hover:text-[var(--gold)] transition-colors break-all"
                      >
                        {c.value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-display text-xs uppercase tracking-[0.22em] text-[var(--gold)] mb-4">
                Hours
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3 text-[var(--muted)]">
                  <Clock className="h-4 w-4 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>
                    Monday - Friday
                    <br />
                    <span className="text-white">10:00 AM - 7:00 PM EST</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-display text-xs uppercase tracking-[0.22em] text-[var(--gold)] mb-4">
                Operated By
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 text-[var(--muted)]">
                  <Building2 className="h-4 w-4 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>
                    <span className="text-white font-medium">Tepew LLC</span>
                    <br />
                    Registered company in
                    <br />
                    New Jersey, USA
                  </span>
                </li>
                <li className="flex items-start gap-3 text-[var(--muted)]">
                  <MapPin className="h-4 w-4 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Englewood, NJ — United States</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="border-t border-[var(--border)] bg-[var(--surface)]"
      >
        <div className="container-x py-16 max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
              Quick answers
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
              Frequently <span className="text-gold-gradient">Asked</span>
            </h2>
          </div>

          <ul className="space-y-6">
            {faqs.map((f) => (
              <li
                key={f.q}
                className="rounded-lg border border-[var(--border)] bg-black p-5"
              >
                <h3 className="font-display text-sm uppercase tracking-[0.15em] text-white">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  {f.a}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
