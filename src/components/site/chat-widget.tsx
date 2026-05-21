"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const SHOW_AFTER_SCROLL_PX = 80;

type Message = {
  id: string;
  role: "user" | "agent";
  text: string;
};

/**
 * Floating customer-help chat pinned to the bottom-right of every page.
 *
 * v1: client-side FAQ matcher — a small set of "intents" matched against the
 * user's free-form message via case-insensitive keyword presence, with a
 * polite fallback offering email. This ships value immediately while the
 * proper Anthropic-backed /api/chat agent is wired up in a follow-up
 * commit. Replace `runCannedAgent` with a fetch to /api/chat when ready.
 *
 * Behavior:
 * - Bubble icon appears after ~80px scroll so it doesn't compete with hero
 * - Click opens an inline panel anchored bottom-right (full-width on mobile)
 * - Welcome message greets the visitor with quick-reply suggestions
 * - Conversation lives in component state — not persisted across reloads
 */
export function ChatWidget() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      text:
        "Hi! 👋 I'm the CarBlock helper. Ask me anything — shipping, returns, how long the fragrance lasts, subscription, etc.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Show the bubble after a tiny scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > SHOW_AFTER_SCROLL_PX) setShown(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-scroll messages to bottom on update
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    // Simulate the "agent" typing for ~600ms before replying
    setTimeout(() => {
      const reply = runCannedAgent(trimmed);
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "agent", text: reply },
      ]);
    }, 600);
  }

  function quickReply(q: string) {
    send(q);
  }

  if (!shown) return null;

  return (
    <>
      {/* Floating bubble — bigger on desktop (md:h-16, lg:h-20) so it
          reads clearly on wide viewports. Mobile size stays h-14. */}
      {!open && (
        <button
          type="button"
          aria-label="Open chat help"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-30 grid place-items-center h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full bg-[var(--gold)] text-black shadow-[0_10px_28px_rgba(0,0,0,0.55)] hover:bg-[var(--gold-bright)] transition-colors"
        >
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7 lg:h-9 lg:w-9" />
        </button>
      )}

      {/* Panel — desktop scales up (width, height, inner text sizes) so
          the chat feels prominent on big monitors instead of cramped.
          Mobile width/height untouched. */}
      {open && (
        <div
          role="dialog"
          aria-label="CarBlock customer help"
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[360px] md:w-[440px] lg:w-[500px] md:bottom-6 md:right-6 z-30 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] text-white shadow-[0_18px_40px_rgba(0,0,0,0.65)] flex flex-col max-h-[min(560px,calc(100vh-32px))] md:max-h-[min(720px,calc(100vh-48px))]"
        >
          <header className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 md:py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-display text-xs md:text-sm uppercase tracking-[0.22em]">
                CarBlock Helper
              </span>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="text-[var(--muted)] hover:text-white"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3 md:space-y-4 text-sm md:text-base"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-3 md:px-4 py-2 md:py-2.5 leading-snug ${
                    m.role === "user"
                      ? "bg-[var(--gold)] text-black rounded-br-sm"
                      : "bg-black/40 border border-[var(--border)] text-white rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}

            {/* Quick replies — only when the conversation is fresh */}
            {messages.length === 1 && (
              <div className="pt-1 flex flex-wrap gap-2">
                {[
                  "How long does it last?",
                  "Shipping & returns",
                  "Subscribe & save",
                  "Track my order",
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => quickReply(q)}
                    className="text-[11px] md:text-[12px] uppercase tracking-[0.14em] rounded-full border border-[var(--border-strong)] px-3 md:px-3.5 py-1.5 md:py-2 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-[var(--border)] p-3 md:p-4 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 h-10 md:h-12 bg-black/40 border border-[var(--border-strong)] rounded-full px-4 md:px-5 text-sm md:text-base text-white placeholder:text-[var(--muted-2)] focus:outline-none focus:border-[var(--gold)]/70"
            />
            <button
              type="submit"
              aria-label="Send"
              className="grid place-items-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black shrink-0 transition-colors"
            >
              <Send className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/**
 * Tiny intent matcher for v1. Looks for keywords and returns a canned reply.
 * Replace with a fetch to /api/chat (Anthropic-backed) when that ships.
 */
function runCannedAgent(message: string): string {
  const m = message.toLowerCase();
  const has = (...ks: string[]) => ks.some((k) => m.includes(k));

  if (has("last", "how long", "duration", "month"))
    return "CarBlock lasts up to 3 months with a single application on floor mats, seat edges or the floor. The fragrance gradually fades over time.";
  if (has("ship", "delivery", "arrive", "envío", "deliver"))
    return "We offer free shipping on every US order — no minimum. Standard delivery is 3-7 business days after we hand it to the carrier (lower 48 only, no AK/HI/PR).";
  if (has("return", "refund", "money back", "policy"))
    return "30-day money-back guarantee on unused, unopened products. Email info@carblock.us with your order number and we'll send a return label.";
  if (has("subscribe", "subscription", "save 20", "save %"))
    return "Yes! Subscribe & Save 20% — auto-delivery every 6 weeks, free shipping, cancel anytime. Tap the 'SAVE 20%' banner at the top of the page or go to /subscribe-and-save.";
  if (has("track", "where is my", "order status", "tracking"))
    return "You'll get a tracking link by email once your order ships (1-2 business days after purchase). If it's been more than that, reply to your order confirmation email and we'll check.";
  if (has("ingredient", "chemical", "safe", "pet", "kid"))
    return "CarBlock is made with car-safe fragrance oils and contains no harmful aerosols. Safe around pets and kids — just keep the bottle out of small hands.";
  if (has("price", "cost", "how much"))
    return "Promo pricing: CarBlock 150ml is $30, WipesBlock 75-count is $30. Bundle is $50. 2-pack of CarBlock or WipesBlock is $50. Free shipping on every order. Subscribe & Save brings it to ~$24 every 6 weeks.";
  if (has("amazon", "walmart"))
    return "Yes, we're on Amazon, Walmart and TikTok Shop too. Buying directly on carblock.us gives you the best deal (subscribe & save 20%, free shipping, no marketplace fees).";
  if (has("scent", "smell", "fragrance type"))
    return "CarBlock has a single signature fragrance — sophisticated, masculine, long-lasting. Hard to describe, easy to love. Money-back guarantee if it's not for you.";
  if (has("contact", "human", "agent", "email", "talk to"))
    return "Reach a human at info@carblock.us — we respond within 24h on weekdays. Include your order number if you have one.";
  if (has("hi", "hello", "hey", "hola"))
    return "Hi! How can I help you today? You can ask me about shipping, returns, how long CarBlock lasts, or our subscribe & save plan.";

  return "I'm not 100% sure on that one — I can answer questions about shipping, returns, ingredients, how long it lasts, pricing, or our subscribe & save plan. For anything else, email info@carblock.us and a human will get back to you within a day.";
}
