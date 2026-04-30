import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DollarSign, ShoppingBag, Users, Truck } from "lucide-react";

// Always fetch fresh — no caching for admin
export const dynamic = "force-dynamic";
export const revalidate = 0;

const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default async function AdminDashboard() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOf30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [allOrders, customersTotal, monthOrders, openOrders, recent] =
    await Promise.all([
      prisma.order.findMany({
        where: { status: { not: "REFUNDED" } },
        select: { totalCents: true, createdAt: true },
      }),
      prisma.customer.count(),
      prisma.order.findMany({
        where: { createdAt: { gte: startOfMonth }, status: { not: "REFUNDED" } },
        select: { totalCents: true },
      }),
      prisma.order.count({ where: { status: "PAID" } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { customer: true },
      }),
    ]);

  const revenueAllCents = allOrders.reduce((s, o) => s + o.totalCents, 0);
  const revenueMonthCents = monthOrders.reduce((s, o) => s + o.totalCents, 0);
  const ordersLast30 = allOrders.filter((o) => o.createdAt >= startOf30d).length;

  const kpis = [
    {
      icon: DollarSign,
      label: "Revenue (30d)",
      value: fmt(
        allOrders
          .filter((o) => o.createdAt >= startOf30d)
          .reduce((s, o) => s + o.totalCents, 0),
      ),
    },
    {
      icon: ShoppingBag,
      label: "Orders (30d)",
      value: String(ordersLast30),
    },
    {
      icon: Truck,
      label: "Awaiting fulfillment",
      value: String(openOrders),
      highlight: openOrders > 0,
    },
    {
      icon: Users,
      label: "Customers (all time)",
      value: String(customersTotal),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl uppercase tracking-[0.15em] text-white">
          Dashboard
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Snapshot of CarBlock operations.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className={`rounded-lg border p-5 ${
              k.highlight
                ? "border-[var(--gold)]/60 bg-[var(--gold)]/5"
                : "border-[var(--border)] bg-[var(--surface)]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <k.icon className="h-4 w-4 text-[var(--gold)]" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              {k.label}
            </p>
            <p className="font-display text-3xl text-white mt-1 tabular-nums">
              {k.value}
            </p>
          </div>
        ))}
      </div>

      {/* All-time revenue */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
          All time
        </p>
        <div className="mt-2 flex items-baseline gap-6">
          <div>
            <p className="text-xs text-[var(--muted)]">Revenue</p>
            <p className="font-display text-4xl text-white tabular-nums">
              {fmt(revenueAllCents)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">This month</p>
            <p className="font-display text-2xl text-[var(--gold)] tabular-nums">
              {fmt(revenueMonthCents)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg uppercase tracking-[0.18em] text-white">
            Recent orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] hover:text-[var(--gold-bright)]"
          >
            See all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-sm text-[var(--muted)] py-8 text-center">
            No orders yet. Once a customer pays, the order will appear here.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {recent.map((o) => (
              <li key={o.id}>
                <Link
                  href={`/admin/orders/${o.id}`}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-4 py-3 hover:bg-[var(--surface-2)] -mx-2 px-2 rounded-md transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-mono text-white">
                      {o.orderNumber}
                    </p>
                    <p className="text-xs text-[var(--muted)] truncate">
                      {o.customer.firstName} {o.customer.lastName} ·{" "}
                      {o.customer.email}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full ${statusBadge(
                      o.status,
                    )}`}
                  >
                    {o.status}
                  </span>
                  <span className="font-display text-sm text-white tabular-nums">
                    {fmt(o.totalCents)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function statusBadge(status: string) {
  switch (status) {
    case "PAID":
      return "bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/40";
    case "SHIPPED":
      return "bg-blue-500/15 text-blue-300 border border-blue-500/40";
    case "DELIVERED":
      return "bg-green-500/15 text-green-300 border border-green-500/40";
    case "REFUNDED":
      return "bg-red-500/15 text-red-300 border border-red-500/40";
    default:
      return "bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--border)]";
  }
}
