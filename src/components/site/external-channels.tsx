/**
 * External retail channels (Amazon, Walmart, TikTok Shop) and their
 * brand icons. Shared by the footer and the /products page so the URLs
 * live in exactly one place.
 */

export type IconComponent = React.ComponentType<{ className?: string }>;

/** TikTok inline icon (lucide-react doesn't ship one). */
export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

/** Amazon mark — bold lowercase 'a' (currentColor) with the gold smile. */
export function AmazonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fontFamily="Arial Black, Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontSize="22"
        fill="currentColor"
      >
        a
      </text>
      <path
        d="M5 24 Q16 30 25 25"
        stroke="#f2c94c"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 23.5 L25 25 L23.5 28"
        stroke="#f2c94c"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Walmart "spark" — six-pointed mark. */
export function WalmartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <g>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="12"
            cy="6"
            rx="1.5"
            ry="4"
            transform={`rotate(${deg} 12 12)`}
          />
        ))}
      </g>
    </svg>
  );
}

export const externalRetailers = [
  {
    label: "Amazon",
    icon: AmazonIcon,
    href: "https://www.amazon.com/Carblock-Premium-Car-Perfume-Long-Lasting/dp/B0BJZQFTYQ?ref_=ast_sto_dp",
  },
  {
    label: "Walmart",
    icon: WalmartIcon,
    href: "https://www.walmart.com/ip/Carblock-Premium-Car-Perfume-Long-Lasting-Odor-Eliminator-Up-3-Months-Neutralizes-Bad-Odors-Humidity-Pet-Smoke-Smells-150-ml-Residue-Car-Interior-Fra/19323606705",
  },
  {
    label: "TikTok Shop",
    icon: TikTokIcon,
    href: "https://www.tiktok.com/shop/store/carblock-perfume-carro/7494142720595428782",
  },
] as const;
