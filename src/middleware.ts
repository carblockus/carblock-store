import { NextResponse, type NextRequest } from "next/server";

/**
 * Protect /admin/* with HTTP Basic Auth.
 * Set ADMIN_PASSWORD in Vercel env vars (and locally in .env.local).
 * Username can be anything (we ignore it); only the password is checked.
 */
export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return new NextResponse(
      "Admin disabled: ADMIN_PASSWORD env var not set",
      { status: 503 },
    );
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = Buffer.from(auth.slice(6), "base64").toString("utf8");
      const [, password] = decoded.split(":");
      if (password === expected) return NextResponse.next();
    } catch {
      // fall through to challenge
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="CarBlock Admin", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
