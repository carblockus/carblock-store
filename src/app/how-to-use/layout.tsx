import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Static metadata for /how-to-use. Lives in a server-only layout so the
 * page.tsx itself can be a Client Component (required to consume useT()
 * for the EN/ES toggle).
 */
export const metadata: Metadata = {
  title: "How to Use — CarBlock",
  description:
    "Step-by-step videos on how to apply CarBlock perfume and use WipesBlock — in English and Spanish.",
};

export default function HowToUseLayout({ children }: { children: ReactNode }) {
  return children;
}
