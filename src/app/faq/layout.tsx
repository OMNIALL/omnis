import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description: "Caféine, sommeil, dose, livraison, paiement à la livraison : toutes les réponses sur OMNIS FOCUS, le complément concentration fabriqué en Tunisie.",
  alternates: { canonical: "/faq" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
