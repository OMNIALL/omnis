import type { Metadata } from "next";
import ScienceClient from "./ScienceClient";

export const metadata: Metadata = {
  title: "Caféine + L-théanine : ce que disent les études",
  description:
    "Les études publiées sur la combinaison caféine + L-théanine : doses testées, résultats, limites et liens PubMed. Plus les fiches Examine.com pour vérifier par toi-même.",
  alternates: { canonical: "/science" },
};

export default function SciencePage() {
  return <ScienceClient />;
}
