import { FROM, TO_INBOX, getResend } from "@/lib/resend";

type Line = {
  productName: string;
  quantity: number;
  unitPriceCents: number;
};

type OrderEmailData = {
  orderNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  shippingMethod: string;
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  items: Line[];
};

const fmt = (cents: number) =>
  `$${(cents / 100).toFixed(2)}`;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function itemsHtml(items: Line[]) {
  return items
    .map(
      (i) => `
    <tr>
      <td style="padding:8px 0;color:#fff;">
        <strong>${escapeHtml(i.productName)}</strong>
        <span style="color:#a1a1a1;"> × ${i.quantity}</span>
      </td>
      <td style="padding:8px 0;text-align:right;color:#fff;font-variant-numeric:tabular-nums;">
        ${fmt(i.unitPriceCents * i.quantity)}
      </td>
    </tr>`,
    )
    .join("");
}

const wrapperOpen = `
<div style="background:#0a0a0a;color:#fff;font-family:Inter,system-ui,sans-serif;padding:40px 24px;max-width:580px;margin:0 auto;">
  <h1 style="font-family:'Times New Roman',serif;letter-spacing:0.12em;color:#d4af37;font-size:28px;margin:0 0 8px;text-transform:uppercase;text-align:center;">CarBlock</h1>
`;

const wrapperFoot = `
  <p style="color:#6f6f6f;font-size:11px;text-align:center;border-top:1px solid #2a2a2a;padding-top:24px;margin-top:32px;">
    Block CarBlock Millonario is operated in the US by Tepew LLC,<br/>
    a registered company in New Jersey.<br/>
    <a href="https://carblock.us/contact" style="color:#d4af37;">Contact us</a> · <a href="https://carblock.us/legal/refunds" style="color:#d4af37;">Refund policy</a>
  </p>
</div>`;

/**
 * Email sent to the customer right after Stripe confirms payment.
 * Includes itemized order, shipping address, totals.
 */
export async function sendCustomerConfirmation(o: OrderEmailData) {
  const resend = getResend();
  if (!resend) {
    console.warn("[order-emails] RESEND_API_KEY missing — skipping customer email");
    return;
  }

  const html = `${wrapperOpen}
  <p style="color:#a1a1a1;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 24px;text-align:center;">Order confirmed</p>

  <h2 style="font-size:26px;line-height:1.2;margin:0 0 8px;text-align:center;text-transform:uppercase;font-weight:700;">
    Thanks, ${escapeHtml(o.firstName)}.
  </h2>
  <p style="color:#a1a1a1;font-size:14px;text-align:center;margin:0 0 28px;">
    Order <span style="color:#fff;font-weight:600;">${escapeHtml(o.orderNumber)}</span> · payment received
  </p>

  <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 16px;">
    ${itemsHtml(o.items)}
  </table>

  <table cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #2a2a2a;padding-top:16px;margin-top:8px;">
    <tr><td style="padding:4px 0;color:#a1a1a1;font-size:13px;">Subtotal</td><td style="padding:4px 0;text-align:right;color:#fff;font-variant-numeric:tabular-nums;font-size:13px;">${fmt(o.subtotalCents)}</td></tr>
    <tr><td style="padding:4px 0;color:#a1a1a1;font-size:13px;">Shipping ${o.shippingMethod === "express" ? "(Express)" : ""}</td><td style="padding:4px 0;text-align:right;color:#fff;font-variant-numeric:tabular-nums;font-size:13px;">${o.shippingCents === 0 ? "FREE" : fmt(o.shippingCents)}</td></tr>
    <tr><td style="padding:4px 0;color:#a1a1a1;font-size:13px;">Tax</td><td style="padding:4px 0;text-align:right;color:#fff;font-variant-numeric:tabular-nums;font-size:13px;">${fmt(o.taxCents)}</td></tr>
    <tr><td style="padding:8px 0;color:#fff;font-weight:700;font-size:15px;border-top:1px solid #2a2a2a;">Total</td><td style="padding:8px 0;text-align:right;color:#d4af37;font-weight:700;font-size:18px;font-variant-numeric:tabular-nums;border-top:1px solid #2a2a2a;">${fmt(o.totalCents)}</td></tr>
  </table>

  <h3 style="text-transform:uppercase;letter-spacing:0.18em;color:#d4af37;font-size:11px;margin:32px 0 8px;">Shipping to</h3>
  <p style="color:#fff;font-size:14px;line-height:1.6;margin:0 0 24px;">
    ${escapeHtml(o.firstName)} ${escapeHtml(o.lastName)}<br/>
    ${escapeHtml(o.address)}<br/>
    ${escapeHtml(o.city)}, ${escapeHtml(o.state)} ${escapeHtml(o.zip)}${o.phone ? `<br/>${escapeHtml(o.phone)}` : ""}
  </p>

  <div style="background:#141414;border:1px solid #2a2a2a;border-radius:8px;padding:16px;margin:0 0 24px;">
    <p style="color:#fff;font-size:13px;margin:0 0 4px;">
      We&rsquo;re packing your order. You&rsquo;ll get a tracking number by email
      as soon as it ships — usually within 1-2 business days.
    </p>
  </div>

  <p style="text-align:center;margin:32px 0;">
    <a href="https://carblock.us/products" style="display:inline-block;background:#d4af37;color:#000;padding:14px 32px;border-radius:999px;text-decoration:none;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;font-size:12px;">Keep shopping</a>
  </p>
${wrapperFoot}`;

  await resend.emails.send({
    from: FROM,
    to: o.email,
    subject: `Order ${o.orderNumber} confirmed — CarBlock`,
    html,
  });
}

type ShippedEmailData = {
  orderNumber: string;
  email: string;
  firstName: string;
  trackingNumber: string;
  trackingCarrier: string;
  trackingUrl?: string;
};

/**
 * Notify the customer that their order has shipped, with a tracking
 * number/link. Triggered from the admin "Mark as shipped" action.
 */
export async function sendShippedEmail(o: ShippedEmailData) {
  const resend = getResend();
  if (!resend) {
    console.warn("[order-emails] RESEND_API_KEY missing — skipping shipped email");
    return;
  }

  const carrierTrackingUrls: Record<string, (n: string) => string> = {
    USPS: (n) => `https://tools.usps.com/go/TrackConfirmAction?tLabels=${n}`,
    UPS: (n) => `https://www.ups.com/track?tracknum=${n}`,
    FedEx: (n) => `https://www.fedex.com/fedextrack/?trknbr=${n}`,
  };
  const trackingLink =
    o.trackingUrl ??
    carrierTrackingUrls[o.trackingCarrier]?.(o.trackingNumber) ??
    null;

  const html = `${wrapperOpen}
  <p style="color:#a1a1a1;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 24px;text-align:center;">Your order has shipped</p>

  <h2 style="font-size:28px;line-height:1.2;margin:0 0 8px;text-align:center;text-transform:uppercase;font-weight:700;">
    On its way, ${escapeHtml(o.firstName)}.
  </h2>
  <p style="color:#a1a1a1;font-size:14px;text-align:center;margin:0 0 28px;">
    Order <span style="color:#fff;font-weight:600;">${escapeHtml(o.orderNumber)}</span> is in transit.
  </p>

  <div style="background:#141414;border:1px solid #2a2a2a;border-radius:8px;padding:20px;margin:0 0 24px;">
    <p style="margin:0 0 8px;color:#a1a1a1;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">${escapeHtml(o.trackingCarrier)} tracking</p>
    <p style="margin:0;font-family:monospace;color:#fff;font-size:16px;letter-spacing:0.04em;">${escapeHtml(o.trackingNumber)}</p>
  </div>

  ${
    trackingLink
      ? `<p style="text-align:center;margin:32px 0;">
           <a href="${trackingLink}" style="display:inline-block;background:#d4af37;color:#000;padding:14px 32px;border-radius:999px;text-decoration:none;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;font-size:12px;">Track package</a>
         </p>`
      : ""
  }

  <p style="color:#a1a1a1;font-size:14px;line-height:1.6;text-align:center;">
    Apply CarBlock once on your floor mats, seat edges and floor — and you&rsquo;re
    set for up to 3 months. <a href="https://carblock.us/how-to-use" style="color:#d4af37;">Watch how here.</a>
  </p>
${wrapperFoot}`;

  await resend.emails.send({
    from: FROM,
    to: o.email,
    subject: `Order ${o.orderNumber} shipped — ${o.trackingCarrier} ${o.trackingNumber}`,
    html,
  });
}

/**
 * Internal alert sent to info@carblock.us with the new order details so
 * fulfillment can start. Reply-to set to the customer email so the team
 * can write back directly.
 */
export async function sendInternalOrderAlert(o: OrderEmailData) {
  const resend = getResend();
  if (!resend) return;

  const itemsText = o.items
    .map((i) => `${i.quantity}× ${i.productName} (${fmt(i.unitPriceCents)} ea)`)
    .join("\n");

  await resend.emails.send({
    from: FROM,
    to: TO_INBOX,
    replyTo: o.email,
    subject: `🛒 New order ${o.orderNumber} — ${fmt(o.totalCents)} — ${o.firstName} ${o.lastName}`,
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:580px;">
        <h2 style="margin:0 0 16px;">New paid order</h2>

        <table cellpadding="6" style="border-collapse:collapse;font-size:14px;width:100%;">
          <tr><td><strong>Order #</strong></td><td>${escapeHtml(o.orderNumber)}</td></tr>
          <tr><td><strong>Customer</strong></td><td>${escapeHtml(o.firstName)} ${escapeHtml(o.lastName)}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${encodeURIComponent(o.email)}">${escapeHtml(o.email)}</a></td></tr>
          ${o.phone ? `<tr><td><strong>Phone</strong></td><td>${escapeHtml(o.phone)}</td></tr>` : ""}
          <tr><td><strong>Shipping</strong></td><td>${o.shippingMethod === "express" ? "Express" : "Standard"}</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>${fmt(o.totalCents)}</strong></td></tr>
        </table>

        <h3 style="margin:24px 0 8px;">Items</h3>
        <pre style="background:#f7f7f7;border-radius:6px;padding:12px;font-family:monospace;font-size:13px;white-space:pre-wrap;">${escapeHtml(itemsText)}</pre>

        <h3 style="margin:24px 0 8px;">Ship to</h3>
        <p style="font-size:14px;line-height:1.6;">
          ${escapeHtml(o.firstName)} ${escapeHtml(o.lastName)}<br/>
          ${escapeHtml(o.address)}<br/>
          ${escapeHtml(o.city)}, ${escapeHtml(o.state)} ${escapeHtml(o.zip)}
        </p>

        <p style="margin-top:24px;color:#777;font-size:12px;">
          Reply directly to this email to write to the customer.
        </p>
      </div>
    `,
  });
}
