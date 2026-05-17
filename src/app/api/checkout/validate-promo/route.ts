import { NextResponse } from "next/server";
import { products } from "@/lib/mock-products";
import { resolvePromoCode } from "@/lib/promo";

/**
 * Customer-facing endpoint that validates a discount code and tells the
 * checkout how much will be deducted. Recomputes the cart subtotal from the
 * server catalog (never trusts client prices). The PaymentIntent route
 * re-validates again at checkout time — this endpoint is purely for UI.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      code?: string;
      items?: { slug: string; qty: number }[];
    };
    const code = (body.code ?? "").trim();
    const items = Array.isArray(body.items) ? body.items : [];

    if (!code) {
      return NextResponse.json(
        { ok: false, error: "Enter a code" },
        { status: 400 },
      );
    }
    if (items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Add items to your cart first" },
        { status: 400 },
      );
    }

    let subtotalCents = 0;
    for (const ci of items) {
      const p = products.find((x) => x.slug === ci.slug);
      if (!p) continue;
      const qty = Math.max(1, Math.min(20, Math.floor(ci.qty || 1)));
      subtotalCents += Math.round(p.price * 100) * qty;
    }

    const result = await resolvePromoCode(code, subtotalCents);
    if (!result.ok) {
      return NextResponse.json(result, { status: 200 });
    }
    return NextResponse.json({
      ok: true,
      code: result.code,
      discountCents: result.discountCents,
      label: result.label,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[validate-promo]", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
