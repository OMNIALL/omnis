import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur OMNIS FOCUS ou ta commande ? Écris-nous sur WhatsApp ou par email.",
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
