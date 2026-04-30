import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "PAID", label: "Awaiting" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "REFUNDED", label: "Refunded" },
] as const;

const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const fmtDate = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);

export default async function OrdersList({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const sp = await searchParams;
  const filter = sp.status ?? "all";
  const where = filter === "all" ? {} : { status: filter as never };

  const orders = await prisma.order.findMany({
    where,
    include: { customer: true, items: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const counts = await prisma.order.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  const countByStatus: Record<string, number> = {};
  for (const c of counts) countByStatus[c.status] = c._count._all;
  const totalAll = counts.reduce((s, c) => s + c._count._all, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-[0.15em] text-white">
            Orders
          </h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            All paid orders, newest first.
          </p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => {
          const active = filter === f.value;
          const count = f.value === "all" ? totalAll : countByStatus[f.value] ?? 0;
          return (
            <Link
              key={f.value}
              href={f.value === "all" ? "/admin/orders" : `/admin/orders?status=${f.value}`}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em] border transition-colors ${
                active
                  ? "bg-[var(--gold)] border-[var(--gold)] text-black"
                  : "border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-[var(--border-strong)]"
              }`}
            >
              {f.label}
              <span
                className={`text-[10px] tabular-nums ${
                  active ? "text-black/70" : "text-[var(--muted-2)]"
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Table */}
      {orders.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <p className="text-sm text-[var(--muted)]">
            No orders match this filter.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface-2)] text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Order</th>
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Items</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Total</th>
                <th className="text-right px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-[var(--surface-2)] transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="font-mono text-white hover:text-[var(--gold)]"
                    >
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-white">
                    {o.customer.firstName} {o.customer.lastName}
                    <br />
                    <span className="text-xs text-[var(--muted)]">
                      {o.customer.email}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {o.items.reduce((s, i) => s + i.quantity, 0)} items
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full ${statusBadge(
                        o.status,
                      )}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-display text-white tabular-nums">
                    {fmt(o.totalCents)}
                  </td>
                  <td className="px-4 py-3 text-right text-[var(--muted)] tabular-nums text-xs">
                    {fmtDate(o.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
