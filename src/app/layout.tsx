import type { Metadata } from "next";
import { Inter, Oswald, Cinzel } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { Footer } from "@/components/site/footer";
import { WelcomePopup } from "@/components/site/welcome-popup";
import { CartProvider } from "@/lib/cart-context";
import { LangProvider } from "@/lib/lang-context";
import { CartDrawer } from "@/components/site/cart-drawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CarBlock — It's not an air freshener, it's a perfume for your car.",
  description:
    "CarBlock transforms the interior of your vehicle with a sophisticated, long-lasting fragrance designed for those who take care of every detail of their image.",
  metadataBase: new URL("https://carblock.us"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "CarBlock — Premium Car Perfume & Interior Wipes",
    description:
      "Sophisticated long-lasting car perfume and premium interior wipes that restore deep black on leather, vinyl and plastic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LangProvider>
          <CartProvider>
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WelcomePopup />
            <CartDrawer />
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
