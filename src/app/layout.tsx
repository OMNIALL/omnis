import type { Metadata } from "next";
import { Unbounded, DM_Sans, Fraunces, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import AdPixels from "@/components/AdPixels";

// Logo / one display word only.
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

// Body text.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Headings: warm, editorial serif ("clinical warmth").
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Arabic UI text.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OMNIS FOCUS — Caféine naturelle + L-théanine | Fabriqué en Tunisie",
  description:
    "OMNIS FOCUS : 100 mg de caféine naturelle de guarana, 180 mg de L-théanine, vitamines B6 et B12. 30 gélules végétales fabriquées en Tunisie. Paiement à la livraison.",
  keywords: ["OMNIS", "FOCUS", "compléments alimentaires", "Tunisie", "L-théanine", "caféine naturelle", "guarana", "gélules"],
  openGraph: {
    title: "OMNIS FOCUS — L'énergie d'un café, sans le crash",
    description: "Caféine naturelle de guarana + L-théanine + B6/B12. Fabriqué en Tunisie. Paiement à la livraison.",
    siteName: "OMNIS",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "OMNIS FOCUS" }],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${unbounded.variable} ${dmSans.variable} ${fraunces.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <CartProvider>
            <AdPixels />
            {children}
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
