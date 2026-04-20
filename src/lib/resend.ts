import { Resend } from "resend";

/** Server-side Resend client. Returns null if RESEND_API_KEY isn't set so
 *  endpoints can fail loud rather than crash at import time. */
export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

/** From address — must be a verified domain in Resend dashboard.
 *  Until carblock.us is verified there, fall back to onboarding@resend.dev
 *  which works out of the box for testing. */
export const FROM = process.env.RESEND_FROM ?? "CarBlock <onboarding@resend.dev>";

/** Where customer-service emails (newsletter signups, contact form) go. */
export const TO_INBOX = process.env.RESEND_INBOX ?? "info@carblock.us";
