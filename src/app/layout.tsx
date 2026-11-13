import type { Metadata } from "next";
import { Unbounded, DM_Sans, Fraunces, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import AdPixels from "@/components/AdPixels";
import { siteUrl } from "@/lib/siteUrl";

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

const OG_TITLE = "OMNIS FOCUS — L'énergie d'un café, sans le crash";
const OG_DESCRIPTION =
  "Caféine naturelle de guarana + L-théanine + B6/B12. 30 gélules fabriquées en Tunisie. Paiement à la livraison.";

// Icons: src/app/icon.png + src/app/apple-icon.png (file conventions), favicon.svg kept as fallback.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Complément concentration Tunisie — OMNIS FOCUS, caféine naturelle + L-théanine",
    template: "%s | OMNIS FOCUS",
  },
  description:
    "OMNIS FOCUS, le complément concentration fabriqué en Tunisie : 100 mg de caféine naturelle de guarana, 180 mg de L-théanine, vitamines B6 et B12. L'énergie d'un café, sans le crash. Paiement à la livraison, 24–48h.",
  keywords: [
    "complément concentration Tunisie",
    "caféine L-théanine Tunisie",
    "alternative au café",
    "gélule énergie sans crash",
    "complément révision bac",
    "OMNIS FOCUS",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_TN",
    alternateLocale: ["ar_TN"],
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    siteName: "OMNIS",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Flacon OMNIS FOCUS et gélules végétales" }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ["/images/og.jpg"],
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
