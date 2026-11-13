import type { Metadata } from "next";
import MerciClient from "./MerciClient";

// Thank-you page: clean conversion URL for ad platforms; never indexed.
export const metadata: Metadata = {
  title: "Merci",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return <MerciClient />;
}
