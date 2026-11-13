import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre histoire",
  description: "OMNIS, marque tunisienne de compléments alimentaires : des formules courtes, des doses affichées en mg, fabriquées par un laboratoire tunisien.",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
