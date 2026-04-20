import { NextResponse } from "next/server";
import { FROM, TO_INBOX, getResend } from "@/lib/resend";

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Captures a newsletter signup. Currently:
 *  1. Notifies the inbox (info@carblock.us) so we can manually compile the list.
 *  2. Confirms to the subscriber with the 15% off code.
 *
 * When we wire up Postgres (next sprint), we'll also persist the email + source.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; source?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    const source = (body.source ?? "unknown").slice(0, 40);

    if (!EMAIL_RX.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = getResend();
    if (!resend) {
      console.error("[newsletter] RESEND_API_KEY not set — cannot send emails");
      return NextResponse.json(
        { error: "Email service not configured. Try again later." },
        { status: 503 },
      );
    }

    // 1. Internal notification
    await resend.emails.send({
      from: FROM,
      to: TO_INBOX,
      subject: `New newsletter signup — ${email}`,
      text: `New subscriber via ${source}\n\nEmail: ${email}\n\nAdd to your mailing list.`,
    });

    // 2. Welcome email with coupon to subscriber
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Welcome to CarBlock — your 15% OFF code inside",
      html: `
        <div style="background:#0a0a0a;color:#fff;font-family:Inter,system-ui,sans-serif;padding:40px 24px;max-width:560px;margin:0 auto;">
          <h1 style="font-family:'Times New Roman',serif;letter-spacing:0.12em;color:#d4af37;font-size:28px;margin:0 0 8px;text-transform:uppercase;">CarBlock</h1>
          <p style="color:#a1a1a1;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 28px;">Welcome to the club</p>
          <h2 style="font-size:32px;line-height:1.1;margin:0 0 16px;text-transform:uppercase;font-weight:700;">
            Get <span style="color:#d4af37;">15% OFF</span> your first order
          </h2>
          <p style="color:#a1a1a1;font-size:15px;line-height:1.6;margin:0 0 24px;">
            Use this code at checkout:
          </p>
          <div style="background:#141414;border:1px solid #d4af37;border-radius:8px;padding:24px;text-align:center;margin:0 0 24px;">
            <p style="font-family:monospace;font-size:24px;color:#f2c94c;letter-spacing:0.2em;margin:0;">WELCOME15</p>
          </div>
          <p style="color:#a1a1a1;font-size:14px;line-height:1.6;">
            One application of CarBlock Millonario lasts up to 3 months. Premium
            fragrance designed for drivers who care about every detail.
          </p>
          <p style="text-align:center;margin:32px 0;">
            <a href="https://carblock.us/products" style="display:inline-block;background:#d4af37;color:#000;padding:14px 32px;border-radius:999px;text-decoration:none;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;font-size:12px;">Shop Now</a>
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
    console.error("[newsletter]", msg);
    return NextResponse.json({ error: "Could not subscribe" }, { status: 500 });
  }
}
