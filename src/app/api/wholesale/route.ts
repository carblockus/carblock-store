import { NextResponse } from "next/server";
import { FROM, TO_INBOX, getResend } from "@/lib/resend";

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const fullName = String(body.fullName ?? "").trim().slice(0, 120);
    const businessName = String(body.businessName ?? "").trim().slice(0, 160);
    const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
    const phone = String(body.phone ?? "").trim().slice(0, 40);
    const state = String(body.state ?? "").trim().slice(0, 60);
    const city = String(body.city ?? "").trim().slice(0, 80);
    const businessType = String(body.businessType ?? "").trim().slice(0, 80);
    const expectedVolume = String(body.expectedVolume ?? "").trim().slice(0, 80);
    const sellingChannels = String(body.sellingChannels ?? "")
      .trim()
      .slice(0, 400);
    const message = String(body.message ?? "").trim().slice(0, 4000);
    const acceptsRules = body.acceptsRules === true;

    if (!fullName || !EMAIL_RX.test(email) || !phone || !state) {
      return NextResponse.json(
        { error: "Full name, email, phone and state are required" },
        { status: 400 },
      );
    }
    if (!acceptsRules) {
      return NextResponse.json(
        { error: "You must accept the wholesale program rules" },
        { status: 400 },
      );
    }

    const resend = getResend();
    if (!resend) {
      console.error("[wholesale] RESEND_API_KEY not set");
      return NextResponse.json(
        { error: "Email service not configured. Try again later." },
        { status: 503 },
      );
    }

    // 1. Internal alert with reply-to set to applicant
    await resend.emails.send({
      from: FROM,
      to: TO_INBOX,
      replyTo: email,
      subject: `🚚 Wholesale application — ${businessName || fullName} (${state})`,
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;max-width:580px;">
          <h2 style="margin:0 0 16px;">New wholesale application</h2>
          <table cellpadding="6" style="border-collapse:collapse;font-size:14px;width:100%;">
            <tr><td><strong>Applicant</strong></td><td>${escapeHtml(fullName)}</td></tr>
            <tr><td><strong>Business</strong></td><td>${escapeHtml(businessName) || "—"}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${encodeURIComponent(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
            <tr><td><strong>Location</strong></td><td>${escapeHtml(city) ? escapeHtml(city) + ", " : ""}${escapeHtml(state)}</td></tr>
            <tr><td><strong>Business type</strong></td><td>${escapeHtml(businessType) || "—"}</td></tr>
            <tr><td><strong>Expected first order</strong></td><td>${escapeHtml(expectedVolume) || "—"}</td></tr>
          </table>

          ${
            sellingChannels
              ? `<h3 style="margin:18px 0 6px;">Selling channels</h3><div style="white-space:pre-wrap;border-left:3px solid #d4af37;padding:8px 16px;color:#333;font-size:14px;">${escapeHtml(sellingChannels)}</div>`
              : ""
          }

          ${
            message
              ? `<h3 style="margin:18px 0 6px;">Message</h3><div style="white-space:pre-wrap;border-left:3px solid #d4af37;padding:8px 16px;color:#333;font-size:14px;">${escapeHtml(message)}</div>`
              : ""
          }

          <p style="margin-top:18px;color:#0a8a3a;font-size:13px;font-weight:600;">
            ✓ Applicant agreed to: 100-unit minimum · No selling on Amazon or Walmart · MAP policy · Pays shipping to their state
          </p>
          <p style="color:#777;font-size:12px;margin-top:18px;">Reply directly to this email to respond.</p>
        </div>
      `,
    });

    // 2. Auto-acknowledgment to applicant
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "We received your wholesale application — CarBlock",
      html: `
        <div style="background:#0a0a0a;color:#fff;font-family:Inter,system-ui,sans-serif;padding:40px 24px;max-width:560px;margin:0 auto;">
          <h1 style="font-family:'Times New Roman',serif;letter-spacing:0.12em;color:#d4af37;font-size:24px;margin:0 0 8px;text-transform:uppercase;text-align:center;">CarBlock</h1>
          <p style="color:#a1a1a1;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 24px;text-align:center;">Wholesale program</p>
          <h2 style="font-size:24px;line-height:1.2;margin:0 0 16px;text-transform:uppercase;font-weight:700;text-align:center;">
            Thanks, ${escapeHtml(fullName)}.
          </h2>
          <p style="color:#a1a1a1;font-size:15px;line-height:1.6;text-align:center;">
            We&rsquo;ve received your wholesale application and a member of the
            CarBlock team will reach out within
            <strong style="color:#fff;">2 business days</strong> to confirm
            pricing, shipping and next steps.
          </p>
          <div style="background:#141414;border:1px solid #2a2a2a;border-radius:8px;padding:18px;margin:24px 0;">
            <p style="color:#d4af37;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin:0 0 10px;">Reminder of program rules</p>
            <ul style="color:#fff;font-size:13px;line-height:1.7;padding-left:18px;margin:0;">
              <li>100-unit minimum per order</li>
              <li>No reselling on Amazon or Walmart</li>
              <li>Respect the MAP (minimum advertised price) policy</li>
              <li>Distributor covers shipping to their state (~$60 per 100 units, varies by location)</li>
              <li>Marketing assets (creatives + videos) included</li>
            </ul>
          </div>
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
    console.error("[wholesale]", msg);
    return NextResponse.json(
      { error: "Could not submit application" },
      { status: 500 },
    );
  }
}
