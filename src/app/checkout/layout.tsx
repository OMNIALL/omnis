import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finaliser ma commande",
  description: "Commande OMNIS FOCUS, paiement à la livraison partout en Tunisie.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
