import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private or transactional pages: no value in search results.
        disallow: ["/admin", "/api/", "/merci", "/checkout", "/track"],
      },
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
