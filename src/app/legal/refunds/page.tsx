import { LegalLayout } from "@/components/site/legal-layout";

export const metadata = {
  title: "Refund & Shipping Policy — CarBlock",
  description:
    "CarBlock refund, return and shipping policy operated by Tepew LLC.",
};

export default function RefundsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Refund & Shipping Policy"
      effectiveDate="April 19, 2026"
    >
      <p>
        We want you to love every CarBlock order. If something is not right,
        this policy explains how returns, refunds, exchanges and shipping
        work. This policy is offered by <strong>Tepew LLC</strong>, operator
        of <strong>carblock.us</strong>.
      </p>

      <h2 id="returns">1. 30-Day Return Window</h2>
      <p>
        You may request a return within <strong>30 days</strong> of the
        delivery date. To be eligible:
      </p>
      <ul>
        <li>
          The product must be <strong>unused</strong>, <strong>unopened</strong>{" "}
          and in its original packaging;
        </li>
        <li>You must provide the order number or proof of purchase;</li>
        <li>
          Items marked &ldquo;Final Sale&rdquo; or sold as part of a
          promotional bundle (when explicitly noted) cannot be returned.
        </li>
      </ul>

      <h2>2. How to Request a Return</h2>
      <ol>
        <li>
          Email{" "}
          <a href="mailto:info@carblock.us">info@carblock.us</a> with
          your order number and the reason for the return;
        </li>
        <li>
          We&apos;ll reply within <strong>2 business days</strong> with a
          return authorization (RMA) and shipping instructions;
        </li>
        <li>
          Ship the item back using a trackable method. Return shipping is the
          customer&apos;s responsibility unless the return is due to our
          error or a defective product.
        </li>
      </ol>

      <h2>3. Refunds</h2>
      <p>
        Once we receive and inspect your return, we&apos;ll process the
        refund within <strong>5-7 business days</strong>. Refunds are issued
        to the original payment method used at checkout. Depending on your
        bank, it may take an additional <strong>5-10 business days</strong>{" "}
        for the refund to appear on your statement.
      </p>
      <p>
        Original shipping charges are non-refundable except where the return
        is due to our error.
      </p>

      <h2>4. Damaged or Defective Items</h2>
      <p>
        If your order arrives damaged or defective, contact us within{" "}
        <strong>7 days</strong> of delivery at{" "}
        <a href="mailto:info@carblock.us">info@carblock.us</a> with:
      </p>
      <ul>
        <li>Your order number;</li>
        <li>Photos clearly showing the damage or defect;</li>
        <li>A short description of the issue.</li>
      </ul>
      <p>
        We&apos;ll send a replacement at no charge or issue a full refund —
        your choice.
      </p>

      <h2>5. Exchanges</h2>
      <p>
        We do not offer direct exchanges at this time. If you&apos;d like a
        different product, please request a return and place a new order.
      </p>

      <h2>6. Cancellations</h2>
      <p>
        We process orders quickly. To cancel an order, email{" "}
        <a href="mailto:info@carblock.us">info@carblock.us</a> within{" "}
        <strong>1 hour</strong> of placing it. Once an order has shipped, it
        cannot be cancelled — it must follow the return process above.
      </p>

      <h2>7. Lost or Stolen Packages</h2>
      <p>
        Risk of loss passes to the buyer upon delivery to the carrier. If
        your tracking shows &ldquo;Delivered&rdquo; but you did not receive
        the package, please:
      </p>
      <ol>
        <li>Check with neighbors and your local mail facility;</li>
        <li>File a claim with the carrier (USPS, UPS or FedEx);</li>
        <li>
          Email us at{" "}
          <a href="mailto:info@carblock.us">info@carblock.us</a> — we
          will assist where possible, but we are not liable for packages
          marked as delivered.
        </li>
      </ol>

      <h2 id="shipping">8. Shipping</h2>
      <h3>Where we ship</h3>
      <p>
        We currently ship within the <strong>United States</strong> only,
        including Alaska and Hawaii (additional fees may apply).
      </p>

      <h3>Processing time</h3>
      <p>
        Orders are processed within <strong>1-2 business days</strong>{" "}
        (Monday-Friday, excluding US federal holidays).
      </p>

      <h3>Delivery time &amp; cost</h3>
      <ul>
        <li>
          <strong>Standard (Free)</strong> — 3 to 7 business days after
          processing;
        </li>
        <li>
          <strong>Express ($15)</strong> — 1 to 3 business days after
          processing.
        </li>
      </ul>
      <p>
        <strong>Free shipping</strong> applies to all standard US orders, no
        minimum required.
      </p>

      <h3>Tracking</h3>
      <p>
        Once your order ships, you&apos;ll receive a confirmation email with
        a tracking link.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about returns or shipping? Email{" "}
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
