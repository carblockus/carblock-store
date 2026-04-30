import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Lightweight DB health check. Hit this to verify the Vercel runtime can
 * reach Neon, independently of Stripe webhooks. Returns the row counts
 * so we can also confirm webhook processing is landing data.
 */
export async function GET() {
  const t0 = Date.now();
  try {
    const [orders, customers] = await Promise.all([
      prisma.order.count(),
      prisma.customer.count(),
    ]);
    return NextResponse.json({
      ok: true,
      orders,
      customers,
      ms: Date.now() - t0,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    const stack = err instanceof Error ? err.stack : undefined;
    return NextResponse.json(
      { ok: false, error: msg, stack: stack?.split("\n").slice(0, 6) },
      { status: 500 },
    );
  }
}
