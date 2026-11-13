import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ingrédients et dosages",
  description: "La formule OMNIS FOCUS en détail : L-théanine 180 mg, caféine naturelle de guarana 100 mg, vitamines B6 et B12 (100% VNR).",
  alternates: { canonical: "/ingredients" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
