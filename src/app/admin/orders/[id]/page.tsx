import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Truck, CheckCircle2, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { markOrderShipped, markOrderDelivered } from "@/app/admin/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const fmtDate = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);

export default async function OrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { customer: true, items: true },
  });
  if (!order) return notFound();

  const isOpen = order.status === "PAID";
  const isShipped = order.status === "SHIPPED";

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        href="/admin/orders"
        className="inline-flex items-center text-xs uppercase tracking-[0.22em] text-[var(--muted)] hover:text-white"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to orders
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
            Order
          </p>
          <h1 className="font-display text-3xl uppercase tracking-[0.1em] text-white font-mono mt-1">
            {order.orderNumber}
          </h1>
          <p className="text-xs text-[var(--muted)] mt-2">
            Placed {fmtDate(order.createdAt)}
          </p>
        </div>
        <span
          className={`inline-block text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${statusBadge(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        {/* Items + totals */}
        <div className="space-y-6">
          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
              Items
            </h2>
            <ul className="divide-y divide-[var(--border)]">
              {order.items.map((i) => (
                <li
                  key={i.id}
                  className="flex items-center justify-between py-3 gap-4"
                >
                  <div>
                    <p className="text-white font-medium">{i.productName}</p>
                    <p className="text-xs text-[var(--muted)] font-mono">
                      {i.productSlug} · ${(i.unitPriceCents / 100).toFixed(2)} ea
                    </p>
                  </div>
                  <span className="text-[var(--muted)]">×{i.quantity}</span>
                  <span className="font-display text-white tabular-nums">
                    {fmt(i.unitPriceCents * i.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-1.5 text-sm">
              <Row label="Subtotal" value={fmt(order.subtotalCents)} />
              <Row
                label={`Shipping ${order.shippingMethod === "express" ? "(Express)" : "(Standard)"}`}
                value={order.shippingCents === 0 ? "Free" : fmt(order.shippingCents)}
              />
              <Row label="Tax" value={fmt(order.taxCents)} />
              <div className="pt-2 mt-2 border-t border-[var(--border)]">
                <Row
                  label="Total"
                  value={fmt(order.totalCents)}
                  bold
                  goldValue
                />
              </div>
            </div>
          </section>

          {/* Mark as shipped */}
          {isOpen && (
            <section className="rounded-lg border border-[var(--gold)]/40 bg-[var(--gold)]/5 p-6">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-4 flex items-center gap-2">
                <Truck className="h-3.5 w-3.5" />
                Mark as shipped
              </h2>
              <form action={markOrderShipped} className="space-y-4">
                <input type="hidden" name="orderId" value={order.id} />
                <div className="grid sm:grid-cols-[140px_1fr] gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mb-1">
                      Carrier
                    </label>
                    <select
                      name="trackingCarrier"
                      defaultValue="USPS"
                      className="w-full h-11 bg-[var(--surface)] border border-[var(--border-strong)] text-white rounded-md px-3 cursor-pointer focus:outline-none focus:border-[var(--gold)]/70"
                    >
                      <option value="USPS">USPS</option>
                      <option value="UPS">UPS</option>
                      <option value="FedEx">FedEx</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mb-1">
                      Tracking number
                    </label>
                    <input
                      name="trackingNumber"
                      required
                      placeholder="9400 1234 5678 9012 3456 78"
                      className="w-full h-11 bg-[var(--surface)] border border-[var(--border-strong)] text-white rounded-md px-3 placeholder:text-[var(--muted-2)] font-mono text-sm focus:outline-none focus:border-[var(--gold)]/70"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-11 px-6"
                >
                  Mark Shipped & Email Customer
                </Button>
                <p className="text-[10px] text-[var(--muted)]">
                  This emails the customer with the tracking link.
                </p>
              </form>
            </section>
          )}

          {isShipped && (
            <section className="rounded-lg border border-blue-500/40 bg-blue-500/5 p-6 space-y-4">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-blue-300 mb-2 flex items-center gap-2">
                <Truck className="h-3.5 w-3.5" />
                Shipped
              </h2>
              <div className="text-sm space-y-1">
                <p className="text-white">
                  <span className="text-[var(--muted)]">Carrier:</span>{" "}
                  {order.trackingCarrier}
                </p>
                <p className="text-white font-mono">
                  <span className="text-[var(--muted)] font-sans">Tracking:</span>{" "}
                  {order.trackingNumber}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  Shipped {order.shippedAt ? fmtDate(order.shippedAt) : "—"}
                </p>
              </div>
              <form action={markOrderDelivered}>
                <input type="hidden" name="orderId" value={order.id} />
                <Button
                  type="submit"
                  variant="outline"
                  className="rounded-full border-[var(--border-strong)] hover:border-[var(--gold)] text-white text-xs uppercase tracking-[0.18em] h-10"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as delivered
                </Button>
              </form>
            </section>
          )}
        </div>

        {/* Sidebar — customer + shipping */}
        <aside className="space-y-4">
          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-3">
              Customer
            </h2>
            <p className="text-white font-medium">
              {order.customer.firstName} {order.customer.lastName}
            </p>
            <a
              href={`mailto:${order.customer.email}`}
              className="text-sm text-[var(--gold)] hover:text-[var(--gold-bright)] inline-flex items-center gap-1 break-all"
            >
              {order.customer.email}
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
            {order.shipPhone && (
              <p className="text-sm text-[var(--muted)] mt-2">
                {order.shipPhone}
              </p>
            )}
          </section>

          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-3">
              Ship to
            </h2>
            <p className="text-sm text-white leading-relaxed">
              {order.shipName}
              <br />
              {order.shipAddress}
              <br />
              {order.shipCity}, {order.shipState} {order.shipZip}
            </p>
          </section>

          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-3">
              Payment
            </h2>
            <p className="text-xs text-[var(--muted)] mb-1">Stripe Intent</p>
            <a
              href={`https://dashboard.stripe.com/payments/${order.stripePaymentIntentId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--gold)] hover:text-[var(--gold-bright)] break-all inline-flex items-start gap-1"
            >
              {order.stripePaymentIntentId}
              <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
            </a>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  goldValue,
}: {
  label: string;
  value: string;
  bold?: boolean;
  goldValue?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "text-white font-semibold" : "text-[var(--muted)]"}>
        {label}
      </span>
      <span
        className={`tabular-nums ${
          goldValue
            ? "text-[var(--gold)] font-display text-lg"
            : bold
              ? "text-white font-semibold"
              : "text-white"
        }`}
      >
        {value}
      </span>
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
