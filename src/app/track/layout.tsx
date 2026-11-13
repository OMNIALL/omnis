import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suivi de commande",
  description: "Suis ta commande OMNIS avec ton numéro de commande ou ton téléphone.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
