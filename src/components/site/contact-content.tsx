"use client";

import Link from "next/link";
import { ChevronRight, Mail, MapPin, Clock, Building2 } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";

/** Client wrapper for /contact — pulls every visible label through the
 *  language dictionary so the page reacts to the EN/ES toggle. */
export function ContactContent() {
  const t = useT();

  const faqs: { q: TranslationKey; a: TranslationKey }[] = [
    { q: "contact.faq.q1", a: "contact.faq.a1" },
    { q: "contact.faq.q2", a: "contact.faq.a2" },
    { q: "contact.faq.q3", a: "contact.faq.a3" },
    { q: "contact.faq.q4", a: "contact.faq.a4" },
  ];

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link
            href="/"
            className="hover:text-[var(--gold)] transition-colors"
          >
            {t("contact.breadcrumb.home")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">{t("contact.breadcrumb.current")}</span>
        </div>
      </div>

      {/* Header */}
      <section className="container-x py-12 md:py-16 text-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          {t("contact.eyebrow")}
        </span>
        <h1 className="font-display text-5xl md:text-6xl uppercase font-bold mt-3 text-white">
          {t("contact.title")}
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-[var(--muted)]">
          {t("contact.subtitle")}
        </p>
      </section>

      {/* Form + Info */}
      <section className="container-x pb-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Form */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
            <h2 className="font-display text-2xl uppercase tracking-[0.15em] text-white mb-1">
              {t("contact.form.eyebrow")}
            </h2>
            <p className="text-sm text-[var(--muted)] mb-6">
              {t("contact.form.intro")}
            </p>
            <ContactForm />
          </div>

          {/* Sidebar — channels + business info */}
          <aside className="space-y-6">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-display text-xs uppercase tracking-[0.22em] text-[var(--gold)] mb-4">
                {t("contact.sidebar.emailUs")}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-[var(--gold)] mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <a
                      href="mailto:info@carblock.us"
                      className="text-sm text-white hover:text-[var(--gold)] transition-colors break-all"
                    >
                      info@carblock.us
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-display text-xs uppercase tracking-[0.22em] text-[var(--gold)] mb-4">
                {t("contact.sidebar.hours")}
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3 text-[var(--muted)]">
                  <Clock className="h-4 w-4 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>
                    {t("contact.sidebar.hoursValue.line1")}
                    <br />
                    <span className="text-white">
                      {t("contact.sidebar.hoursValue.line2")}
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-display text-xs uppercase tracking-[0.22em] text-[var(--gold)] mb-4">
                {t("contact.sidebar.operatedBy")}
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 text-[var(--muted)]">
                  <Building2 className="h-4 w-4 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>
                    <span className="text-white font-medium">Tepew LLC</span>
                    <br />
                    {t("contact.sidebar.operatedByValue.line1")}
                  </span>
                </li>
                <li className="flex items-start gap-3 text-[var(--muted)]">
                  <MapPin className="h-4 w-4 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>{t("contact.sidebar.operatedByValue.line2")}</span>
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
              {t("contact.faq.eyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
              {t("contact.faq.title")}
            </h2>
          </div>

          <ul className="space-y-6">
            {faqs.map((f) => (
              <li
                key={f.q}
                className="rounded-lg border border-[var(--border)] bg-black p-5"
              >
                <h3 className="font-display text-sm uppercase tracking-[0.15em] text-white">
                  {t(f.q)}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  {t(f.a)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
