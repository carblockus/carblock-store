import { NextResponse } from "next/server";
import { FROM, TO_INBOX, getResend } from "@/lib/resend";

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = ["order", "return", "wholesale", "press", "other"] as const;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim().slice(0, 120);
    const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
    const topic = String(body.topic ?? "other");
    const orderId = String(body.orderId ?? "").trim().slice(0, 60);
    const message = String(body.message ?? "").trim().slice(0, 5000);

    if (!name || !EMAIL_RX.test(email) || !message) {
      return NextResponse.json(
        { error: "Name, valid email and message are required" },
        { status: 400 },
      );
    }
    if (!TOPICS.includes(topic as (typeof TOPICS)[number])) {
      return NextResponse.json({ error: "Invalid topic" }, { status: 400 });
    }

    const resend = getResend();
    if (!resend) {
      console.error("[contact] RESEND_API_KEY not set");
      return NextResponse.json(
        { error: "Email service not configured. Try again later." },
        { status: 503 },
      );
    }

    // 1. Forward to inbox with reply-to set to the customer
    await resend.emails.send({
      from: FROM,
      to: TO_INBOX,
      replyTo: email,
      subject: `[Contact · ${topic}] ${name}${orderId ? ` — order ${orderId}` : ""}`,
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;">
          <h2 style="margin:0 0 16px;">New contact form submission</h2>
          <table cellpadding="6" style="border-collapse:collapse;font-size:14px;">
            <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
            <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
            <tr><td><strong>Topic</strong></td><td>${escapeHtml(topic)}</td></tr>
            ${orderId ? `<tr><td><strong>Order #</strong></td><td>${escapeHtml(orderId)}</td></tr>` : ""}
          </table>
          <h3 style="margin:24px 0 8px;">Message</h3>
          <div style="white-space:pre-wrap;border-left:3px solid #d4af37;padding:8px 16px;color:#333;">${escapeHtml(message)}</div>
          <p style="margin-top:24px;color:#777;font-size:12px;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
        </div>
      `,
    });

    // 2. Auto-acknowledgment to customer
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "We received your message — CarBlock",
      html: `
        <div style="background:#0a0a0a;color:#fff;font-family:Inter,system-ui,sans-serif;padding:40px 24px;max-width:560px;margin:0 auto;">
          <h1 style="font-family:'Times New Roman',serif;letter-spacing:0.12em;color:#d4af37;font-size:24px;margin:0 0 8px;text-transform:uppercase;">CarBlock</h1>
          <p style="color:#a1a1a1;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 24px;">Thanks for reaching out</p>
          <p style="font-size:15px;line-height:1.6;">Hi ${escapeHtml(name)},</p>
          <p style="font-size:15px;line-height:1.6;color:#a1a1a1;">
            We&rsquo;ve received your message and will get back to you within
            <strong style="color:#fff;">1 business day</strong> at this email.
          </p>
          <p style="font-size:14px;color:#6f6f6f;border-left:3px solid #d4af37;padding:8px 16px;margin:24px 0;">
            "${escapeHtml(message.slice(0, 240))}${message.length > 240 ? "…" : ""}"
          </p>
          <p style="color:#6f6f6f;font-size:11px;text-align:center;border-top:1px solid #2a2a2a;padding-top:24px;margin-top:32px;">
            Block CarBlock Millonario is operated in the US by Tepew LLC,<br/>
            a registered company in New Jersey.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[contact]", msg);
    return NextResponse.json({ error: "Could not send message" }, { status: 500 });
  }
}
