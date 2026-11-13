/**
 * Absolute site URL for metadata, sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL once the domain is live (e.g. https://omnis.tn).
 * On Vercel, falls back to the production domain Vercel provides.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
