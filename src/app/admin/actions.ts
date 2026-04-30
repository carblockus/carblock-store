"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sendShippedEmail } from "@/lib/order-emails";

const CARRIERS = ["USPS", "UPS", "FedEx"] as const;
type Carrier = (typeof CARRIERS)[number];

function isCarrier(v: string): v is Carrier {
  return (CARRIERS as readonly string[]).includes(v);
}

/**
 * Mark an order as shipped, persist the tracking number, and email the
 * customer. Called from the admin order detail page form.
 *
 * Throws on validation/state errors so Next surfaces them in the UI;
 * the function returns void to satisfy the form-action signature.
 */
export async function markOrderShipped(formData: FormData): Promise<void> {
  const orderId = String(formData.get("orderId") ?? "");
  const trackingNumber = String(formData.get("trackingNumber") ?? "").trim();
  const trackingCarrier = String(formData.get("trackingCarrier") ?? "USPS");

  if (!orderId) throw new Error("Missing orderId");
  if (!trackingNumber) throw new Error("Tracking number is required");
  if (!isCarrier(trackingCarrier)) throw new Error("Invalid carrier");

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { customer: true },
  });
  if (!order) throw new Error("Order not found");
  if (order.status === "SHIPPED" || order.status === "DELIVERED") {
    throw new Error("Order is already shipped");
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "SHIPPED",
      trackingNumber,
      trackingCarrier,
      shippedAt: new Date(),
    },
    include: { customer: true },
  });

  await sendShippedEmail({
    orderNumber: updated.orderNumber,
    email: updated.customer.email,
    firstName: updated.customer.firstName ?? "there",
    trackingNumber,
    trackingCarrier,
  }).catch((e) => console.error("[admin] shipped email failed", e));

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}

/** Manually mark an order as delivered. */
export async function markOrderDelivered(formData: FormData): Promise<void> {
  const orderId = String(formData.get("orderId") ?? "");
  if (!orderId) throw new Error("Missing orderId");

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "DELIVERED", deliveredAt: new Date() },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}
