import { LegalLayout } from "@/components/site/legal-layout";

export const metadata = {
  title: "Terms & Conditions — CarBlock",
  description: "Terms governing the use of carblock.us and CarBlock products.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      effectiveDate="April 19, 2026"
    >
      <p>
        These Terms &amp; Conditions (&ldquo;<strong>Terms</strong>&rdquo;)
        govern your access to and use of the website{" "}
        <strong>carblock.us</strong> (the &ldquo;<strong>Site</strong>&rdquo;)
        and any products, services or content offered by{" "}
        <strong>Tepew LLC</strong> (&ldquo;<strong>Company</strong>,&rdquo;
        &ldquo;<strong>we</strong>,&rdquo; &ldquo;<strong>us</strong>,&rdquo;
        &ldquo;<strong>our</strong>&rdquo;), a limited liability company
        registered in the State of New Jersey, United States. By accessing the
        Site or placing an order, you agree to be bound by these Terms.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 18 years old and legally capable of entering into a
        binding contract to purchase from the Site. By placing an order, you
        represent and warrant that you meet these requirements.
      </p>

      <h2>2. Products &amp; Pricing</h2>
      <p>
        We make every effort to display product images and information
        accurately. However, colors, packaging and presentation may vary
        slightly. All prices are in US Dollars (USD) and are subject to change
        without notice prior to checkout. Promotional codes have specific terms
        of use and may not be combined unless explicitly stated.
      </p>
      <p>
        We reserve the right to limit quantities, refuse orders, or correct
        pricing or product errors at any time, including after an order has been
        submitted but prior to shipment.
      </p>

      <h2>3. Orders &amp; Payment</h2>
      <p>
        Orders placed through the Site constitute an offer to purchase, which
        we may accept or decline at our discretion. Payment is processed
        securely through <strong>Stripe, Inc.</strong> We do not store full
        credit card information on our servers.
      </p>
      <p>
        Sales tax is calculated based on shipping destination and applicable
        state and local laws.
      </p>

      <h2>4. Shipping</h2>
      <p>
        We ship to addresses within the United States. Estimated delivery times
        are 3-7 business days for standard shipping after order processing
        (1-2 business days). Risk of loss passes to the buyer upon delivery to
        the carrier. We are not responsible for delays caused by carriers or
        circumstances beyond our control.
      </p>

      <h2>5. Returns &amp; Refunds</h2>
      <p>
        Returns are governed by our{" "}
        <a href="/legal/refunds">Refund Policy</a>, which is incorporated into
        these Terms by reference.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content on the Site — including text, graphics, logos, the
        CarBlock and WipesBlock trademarks, fingerprint mark, product
        photography and software — is owned by or licensed to Tepew LLC and
        protected by United States and international intellectual property
        laws. You may not copy, reproduce, modify or distribute any content
        without our prior written consent.
      </p>

      <h2>7. User Conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site for any unlawful purpose.</li>
        <li>
          Attempt to gain unauthorized access to any portion of the Site or
          related systems.
        </li>
        <li>
          Interfere with the operation of the Site, including by transmitting
          viruses, scraping, or excessive automated requests.
        </li>
        <li>Misrepresent your identity or affiliation.</li>
        <li>
          Use any product purchased from us in a manner inconsistent with its
          intended use or label instructions.
        </li>
      </ul>

      <h2>8. Product Use &amp; Disclaimers</h2>
      <p>
        CarBlock products are intended for use as car interior fragrance and
        cleaning aids only. Avoid contact with eyes, do not ingest, and keep
        out of reach of children and pets. If irritation occurs, discontinue
        use and seek medical advice. Apply only to interior surfaces as
        instructed. We are not liable for damage caused by improper use.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        TO THE FULLEST EXTENT PERMITTED BY LAW, TEPEW LLC, ITS OFFICERS,
        EMPLOYEES, AGENTS AND SUPPLIERS SHALL NOT BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES ARISING OUT OF
        OR RELATED TO YOUR USE OF THE SITE OR PRODUCTS, EVEN IF ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ANY CLAIM SHALL
        NOT EXCEED THE AMOUNT PAID BY YOU FOR THE PRODUCT GIVING RISE TO THE
        CLAIM.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Tepew LLC and its affiliates
        from any claim, demand, damages or expenses arising from your breach of
        these Terms or your misuse of the Site or products.
      </p>

      <h2>11. Governing Law &amp; Dispute Resolution</h2>
      <p>
        These Terms are governed by the laws of the State of New Jersey,
        without regard to conflict of law principles. Any dispute arising out
        of or related to these Terms shall be resolved exclusively in the
        state or federal courts located in New Jersey, and you consent to
        personal jurisdiction in those courts.
      </p>

      <h2>12. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be
        posted on this page with an updated &ldquo;Effective&rdquo; date.
        Continued use of the Site after changes are posted constitutes your
        acceptance of the updated Terms.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms? Contact us at{" "}
        <a href="mailto:info@carblock.us">info@carblock.us</a> or via the{" "}
        <a href="/contact">Contact page</a>.
      </p>

      <hr />
      <p className="text-xs">
        <strong>Tepew LLC</strong> · Registered in New Jersey, USA · Operator
        of carblock.us
      </p>
    </LegalLayout>
  );
}
