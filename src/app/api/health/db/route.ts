import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Lightweight DB health check + URL diagnostic.
 * Hides the password but reveals every other URL component so we can
 * confirm Vercel is reading the env var we expect.
 */

function maskUrl(raw: string | undefined): Record<string, string> {
  if (!raw) return { error: "DATABASE_URL not set" };
  try {
    const u = new URL(raw);
    return {
      protocol: u.protocol,
      username: u.username || "(empty)",
      passwordLen: String(u.password.length),
      passwordPrefix: u.password.slice(0, 4) + "***",
      host: u.host,
      pathname: u.pathname,
      params: u.searchParams.toString() || "(none)",
    };
  } catch (err) {
    return {
      parseError: err instanceof Error ? err.message : "unknown",
      rawLen: String(raw.length),
      rawHead: raw.slice(0, 30) + "...",
    };
  }
}

export async function GET() {
  const t0 = Date.now();
  const urlInfo = maskUrl(process.env.DATABASE_URL);

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
      url: urlInfo,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json(
      { ok: false, error: msg, url: urlInfo },
      { status: 500 },
    );
  }
}
