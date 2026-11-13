/**
 * Business contact details — the ONLY place to change them.
 * ⚠ TODO before launch: replace these placeholders with the real OMNIS WhatsApp,
 * phone and email (they are shown on contact, FAQ, returns, tracking and legal pages).
 */
export const WHATSAPP_NUMBER = "21698456789"; // international format, digits only (216 + 8 digits)
export const PHONE_DISPLAY = "+216 98 456 789";
export const CONTACT_EMAIL = "hello@omnis.tn";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const phoneLink = `tel:+${WHATSAPP_NUMBER}`;

/**
 * Official social accounts. Leave empty until the real account exists —
 * empty links are hidden in the footer (no more links to instagram.com's home page).
 */
export const SOCIAL_LINKS = {
  instagram: "", // e.g. "https://instagram.com/omnis.tn"
  tiktok: "",
  facebook: "",
};

/** The ONE conversion action — every "order" CTA on the site points here. */
export const ORDER_HREF = "/products/focus#order-form";
export const orderHref = (pack?: 1 | 2 | 3) => (pack ? `/products/focus?pack=${pack}#order-form` : ORDER_HREF);
