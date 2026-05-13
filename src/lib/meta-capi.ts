/**
 * Meta Conversions API (CAPI) — server-side event sender.
 *
 * Complements the browser Pixel in src/components/analytics/meta-pixel.tsx.
 * The browser fires events too, but ad blockers / Safari ITP / iOS opt-outs
 * eat 15-30% of them. Sending the same Purchase event from the server bypasses
 * all of that and gives Meta a complete view of conversions.
 *
 * Deduplication: every server event carries an `event_id`. The browser Pixel
 * is fired with the *same* `eventID`, so Meta merges the pair and counts the
 * conversion exactly once. The PaymentIntent ID is what we use — it is unique,
 * stable, and already shared between client and server.
 *
 * Reference: https://developers.facebook.com/docs/marketing-api/conversions-api
 *
 * Env vars (Vercel + .env.local):
 *   NEXT_PUBLIC_META_PIXEL_ID    Public Pixel ID. Already used by the browser
 *                                pixel — we reuse it here.
 *   META_CAPI_ACCESS_TOKEN       Secret access token from Events Manager →
 *                                Settings → Conversions API → Generate access
 *                                token. KEEP SECRET. Server-only.
 *   META_CAPI_TEST_CODE          Optional. When set, every event is sent with
 *                                a test_event_code so it shows up under
 *                                Events Manager → Test events. Remove for prod.
 */
import crypto from "node:crypto";

const GRAPH_VERSION = "v21.0";

/** SHA256 hex digest — Meta requires hashed PII. */
function sha256(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}

/**
 * Hash a single PII field after Meta's normalization rules:
 * trim, lowercase, strip whitespace where applicable.
 * Returns null for empty input so we don't transmit hashes of empty strings.
 */
function hashField(
  raw: string | null | undefined,
  opts: { stripWhitespace?: boolean; digitsOnly?: boolean } = {},
): string | null {
  if (!raw) return null;
  let v = raw.trim().toLowerCase();
  if (opts.digitsOnly) v = v.replace(/\D+/g, "");
  if (opts.stripWhitespace) v = v.replace(/\s+/g, "");
  if (!v) return null;
  return sha256(v);
}

type CapiContent = { id: string; quantity: number; item_price: number };

export type PurchaseEventInput = {
  /** Unique per order — used for browser/server dedup. Use the Stripe PI ID. */
  eventId: string;
  /** Unix seconds. Defaults to now. Must be within the last 7 days. */
  eventTime?: number;
  /** URL of the page that triggered the conversion, if known. */
  eventSourceUrl?: string;
  /** Purchase value in major units (e.g. dollars, not cents). */
  value: number;
  currency: string;
  contents: CapiContent[];
  /** PII — sent hashed. */
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  /** Not hashed — Meta uses these to match against ad impressions. */
  fbp?: string | null;
  fbc?: string | null;
  clientIpAddress?: string | null;
  clientUserAgent?: string | null;
};

/**
 * Send a `Purchase` event to Meta. Returns true on HTTP 2xx, false otherwise.
 * Never throws — failures are logged and swallowed so a CAPI outage cannot
 * break the order flow.
 */
export async function sendPurchaseEvent(
  input: PurchaseEventInput,
): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) {
    console.log(
      "[meta-capi] skipping — META_CAPI_ACCESS_TOKEN or pixel id not set",
    );
    return false;
  }

  const user_data: Record<string, unknown> = {};
  const em = hashField(input.email);
  if (em) user_data.em = [em];
  const ph = hashField(input.phone, { digitsOnly: true });
  if (ph) user_data.ph = [ph];
  const fn = hashField(input.firstName);
  if (fn) user_data.fn = [fn];
  const ln = hashField(input.lastName);
  if (ln) user_data.ln = [ln];
  const ct = hashField(input.city, { stripWhitespace: true });
  if (ct) user_data.ct = [ct];
  const st = hashField(input.state);
  if (st) user_data.st = [st];
  // ZIP: US 5-digit only — strip the "-1234" extension if present.
  const zip5 = input.zip ? input.zip.trim().split("-")[0] : null;
  const zp = hashField(zip5);
  if (zp) user_data.zp = [zp];
  const country = hashField(input.country ?? "us");
  if (country) user_data.country = [country];

  if (input.fbp) user_data.fbp = input.fbp;
  if (input.fbc) user_data.fbc = input.fbc;
  if (input.clientIpAddress) user_data.client_ip_address = input.clientIpAddress;
  if (input.clientUserAgent) user_data.client_user_agent = input.clientUserAgent;

  const event = {
    event_name: "Purchase",
    event_time: input.eventTime ?? Math.floor(Date.now() / 1000),
    event_id: input.eventId,
    action_source: "website",
    event_source_url: input.eventSourceUrl,
    user_data,
    custom_data: {
      currency: input.currency.toUpperCase(),
      value: Number(input.value.toFixed(2)),
      order_id: input.eventId,
      content_type: "product",
      content_ids: input.contents.map((c) => c.id),
      contents: input.contents,
      num_items: input.contents.reduce((n, c) => n + c.quantity, 0),
    },
  };

  const body: Record<string, unknown> = { data: [event] };
  const testCode = process.env.META_CAPI_TEST_CODE;
  if (testCode) body.test_event_code = testCode;

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) {
      console.error(
        `[meta-capi] Purchase failed (HTTP ${res.status}):`,
        text.slice(0, 500),
      );
      return false;
    }
    console.log(
      `[meta-capi] Purchase sent — event_id=${input.eventId} value=${input.value} ${input.currency}`,
      testCode ? `(test_event_code=${testCode})` : "",
    );
    return true;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[meta-capi] network error:", msg);
    return false;
  }
}
