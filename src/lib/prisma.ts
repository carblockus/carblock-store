import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

/**
 * Prisma client singleton with the Neon serverless adapter.
 *
 * Why the adapter: on Vercel serverless + Neon free tier, the compute
 * branch auto-suspends after 5 minutes of inactivity. A plain TCP
 * connection from a cold lambda often times out before Neon can wake
 * the compute back up, producing "Can't reach database server" errors
 * (the failure mode we hit on the first paid order).
 *
 * The Neon adapter speaks HTTP/WebSocket and handles the wake-up
 * gracefully, so the first webhook after idle time succeeds.
 *
 * In dev, Next's HMR can spawn many clients which exhausts the pool —
 * we cache one on globalThis to reuse.
 */
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
