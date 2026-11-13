import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livraison en Tunisie",
  description: "Livraison OMNIS partout en Tunisie en 24–48h. 7 DT, offerte dès 2 flacons. Paiement à la livraison.",
  alternates: { canonical: "/shipping" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
