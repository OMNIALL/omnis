import type { Metadata } from "next";
import { Unbounded, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OMNIS — Tout ce qu'il te faut | Compléments alimentaires fabriqués en Tunisie",
  description:
    "OMNIS, la marque tunisienne de compléments alimentaires. Des pastilles qui boostent ta concentration, ton énergie et ton bien-être. Fabriqué en Tunisie 🇹🇳",
  keywords: [
    "OMNIS",
    "compléments alimentaires",
    "Tunisie",
    "focus",
    "vitamines",
    "pastilles",
    "L-théanine",
    "caféine",
  ],
  openGraph: {
    title: "OMNIS — Tout ce qu'il te faut",
    description:
      "Des pastilles qui boostent ta concentration, sans le crash. Fabriqué en Tunisie.",
    siteName: "OMNIS",
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
      className={`${unbounded.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        <LanguageProvider>
          <CartProvider>
            <CustomCursor />
            {children}
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
