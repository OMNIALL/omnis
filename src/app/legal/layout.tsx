import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales, confidentialité et avertissements réglementaires OMNIS.",
  alternates: { canonical: "/legal" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
