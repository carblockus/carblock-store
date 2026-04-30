import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

/**
 * Prisma client singleton with the Neon serverless driver.
 *
 * On Vercel serverless + Neon free tier, the compute branch auto-suspends
 * after 5 minutes of inactivity. A plain TCP connection from a cold lambda
 * often times out before Neon can wake the compute back up. The Neon
 * serverless driver speaks HTTP/WebSocket and handles the wake-up
 * gracefully, so the first webhook after idle time succeeds.
 *
 * In Node runtimes we have to hand the driver a WebSocket constructor —
 * the `ws` package — because there's no global WebSocket. Edge runtimes
 * already have WebSocket built in, so this is a no-op there.
 */

if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws as unknown as typeof WebSocket;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function makeClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const adapter = new PrismaNeon({ connectionString: url });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? makeClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
