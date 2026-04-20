import { LegalLayout } from "@/components/site/legal-layout";

export const metadata = {
  title: "Privacy Policy — CarBlock",
  description: "How CarBlock collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate="April 19, 2026"
    >
      <p>
        <strong>Tepew LLC</strong> (&ldquo;<strong>we</strong>,&rdquo;
        &ldquo;<strong>us</strong>,&rdquo; &ldquo;<strong>our</strong>&rdquo;),
        operator of <strong>carblock.us</strong>, respects your privacy. This
        Privacy Policy explains what personal information we collect, how we
        use it, and the choices you have.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Contact &amp; account details:</strong> name, email address,
          phone number.
        </li>
        <li>
          <strong>Shipping &amp; billing address.</strong>
        </li>
        <li>
          <strong>Order information:</strong> the products you purchase, order
          history, and any communication regarding your orders.
        </li>
        <li>
          <strong>Customer service messages</strong> sent through our Contact
          page or email.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>Device information (browser, OS, screen size).</li>
        <li>IP address and approximate location.</li>
        <li>Pages visited, time on site, referral source.</li>
        <li>
          Cookies and similar technologies (see{" "}
          <a href="#cookies">Cookies</a> below).
        </li>
      </ul>

      <h3>Information from third parties</h3>
      <p>
        Payment information is collected and processed directly by{" "}
        <strong>Stripe, Inc.</strong> We never see or store your full card
        number. Stripe&apos;s privacy practices apply to that data and are
        available at{" "}
        <a
          href="https://stripe.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          stripe.com/privacy
        </a>
        .
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To process and fulfill your orders.</li>
        <li>
          To communicate about your order, send shipping notifications and
          respond to customer service inquiries.
        </li>
        <li>To send marketing emails (only if you opt in).</li>
        <li>To prevent fraud and enforce our Terms.</li>
        <li>To improve our products, Site and customer experience.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>3. How We Share Your Information</h2>
      <p>
        We <strong>do not sell</strong> your personal information. We share
        limited information only with trusted third parties that help us
        operate the business:
      </p>
      <ul>
        <li>
          <strong>Stripe</strong> — payment processing.
        </li>
        <li>
          <strong>Shipping carriers</strong> (USPS, UPS, FedEx) — to deliver
          your orders.
        </li>
        <li>
          <strong>Email service providers</strong> — to send transactional and
          (opt-in) marketing emails.
        </li>
        <li>
          <strong>Analytics providers</strong> (Vercel Analytics, Google
          Analytics) — to understand site usage in aggregate.
        </li>
        <li>
          <strong>Legal authorities</strong> — when required by law, subpoena
          or to protect our legal rights.
        </li>
      </ul>

      <h2 id="cookies">4. Cookies</h2>
      <p>We use cookies and similar technologies to:</p>
      <ul>
        <li>Keep your shopping cart between visits.</li>
        <li>Remember your preferences.</li>
        <li>Measure traffic and improve the Site.</li>
      </ul>
      <p>
        You can control cookies through your browser settings. Disabling
        cookies may break some Site functionality (such as the cart).
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We keep order records for as long as needed to fulfill the order,
        provide customer support, comply with tax/accounting obligations
        (typically 7 years), and enforce our Terms. Marketing data is retained
        until you unsubscribe.
      </p>

      <h2>6. Your Rights</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you.</li>
        <li>Correct inaccurate information.</li>
        <li>Delete your information (subject to legal exceptions).</li>
        <li>Opt out of marketing emails (every email has an unsubscribe link).</li>
        <li>Lodge a complaint with a data protection authority.</li>
      </ul>
      <p>
        To exercise these rights, email us at{" "}
        <a href="mailto:info@carblock.us">info@carblock.us</a>.
      </p>

      <h2>7. Security</h2>
      <p>
        We use industry-standard security measures including TLS encryption,
        access controls and PCI-compliant payment processing through Stripe.
        However, no system is 100% secure; you transmit information at your
        own risk.
      </p>

      <h2>8. Children</h2>
      <p>
        The Site is not directed to individuals under 18. We do not knowingly
        collect personal information from children. If we learn we have
        collected information from a minor, we will delete it.
      </p>

      <h2>9. International Visitors</h2>
      <p>
        Our Site is operated from the United States. If you visit from outside
        the US, your information will be transferred to and processed in the
        US, where data protection laws may differ from those in your country.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this Policy. Material changes will be posted on this
        page with a new effective date. Significant changes affecting how we
        use existing data will be communicated via email when possible.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        Privacy questions or requests? Email{" "}
        <a href="mailto:info@carblock.us">info@carblock.us</a> or use
        the <a href="/contact">Contact page</a>.
      </p>

      <hr />
      <p className="text-xs">
        <strong>Tepew LLC</strong> · Registered in New Jersey, USA · Operator
        of carblock.us
      </p>
    </LegalLayout>
  );
}
