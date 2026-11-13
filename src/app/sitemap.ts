import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/products/focus", priority: 0.9, changeFrequency: "weekly" },
    { path: "/ingredients", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/shipping", priority: 0.4, changeFrequency: "yearly" },
    { path: "/returns", priority: 0.3, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
    { path: "/legal", priority: 0.2, changeFrequency: "yearly" },
  ];
  return pages.map((p) => ({ url: `${base}${p.path}`, lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority }));
}
