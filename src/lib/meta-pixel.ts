/**
 * Meta (Facebook) Pixel — typed wrapper around the global `fbq` function.
 *
 * The base script is loaded by <MetaPixel /> in the root layout; this file
 * provides safe, typed helpers for firing standard events from anywhere in
 * the app.
 *
 * Reference of standard events:
 *   https://developers.facebook.com/docs/meta-pixel/reference
 *
 * The Pixel ID lives in NEXT_PUBLIC_META_PIXEL_ID so it's inlined at build
 * time and visible to the browser.
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

declare global {
  interface Window {
    fbq?: (
      ...args: [string, string, Record<string, unknown>?]
    ) => void;
  }
}

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;
  if (params) {
    window.fbq("track", event, params);
  } else {
    window.fbq("track", event);
  }
}

export const pixel = {
  pageView() {
    track("PageView");
  },

  viewContent(p: {
    id: string;
    name: string;
    category: string;
    price: number;
  }) {
    track("ViewContent", {
      content_ids: [p.id],
      content_name: p.name,
      content_category: p.category,
      content_type: "product",
      value: p.price,
      currency: "USD",
    });
  },

  addToCart(p: {
    id: string;
    name: string;
    category: string;
    price: number;
    qty: number;
  }) {
    track("AddToCart", {
      content_ids: [p.id],
      content_name: p.name,
      content_category: p.category,
      content_type: "product",
      value: p.price * p.qty,
      currency: "USD",
      contents: [{ id: p.id, quantity: p.qty, item_price: p.price }],
    });
  },

  initiateCheckout(items: { id: string; qty: number; price: number }[], total: number) {
    track("InitiateCheckout", {
      content_ids: items.map((i) => i.id),
      contents: items.map((i) => ({
        id: i.id,
        quantity: i.qty,
        item_price: i.price,
      })),
      content_type: "product",
      num_items: items.reduce((s, i) => s + i.qty, 0),
      value: total,
      currency: "USD",
    });
  },

  purchase(p: {
    orderId: string;
    items: { id: string; qty: number; price: number }[];
    total: number;
  }) {
    track("Purchase", {
      content_ids: p.items.map((i) => i.id),
      contents: p.items.map((i) => ({
        id: i.id,
        quantity: i.qty,
        item_price: i.price,
      })),
      content_type: "product",
      num_items: p.items.reduce((s, i) => s + i.qty, 0),
      value: p.total,
      currency: "USD",
      order_id: p.orderId,
    });
  },
};
