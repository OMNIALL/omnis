import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retours et garanties",
  description: "Colis abîmé ? Écris-nous sous 48h avec une photo : on t’envoie un flacon de remplacement.",
  alternates: { canonical: "/returns" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
