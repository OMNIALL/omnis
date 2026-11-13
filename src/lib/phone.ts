/**
 * Normalizes a Tunisian phone number to "XX XXX XXX" (8 digits).
 * Accepts spaces, dashes, dots and a +216 / 00216 / 216 prefix.
 * Returns "" when the number is not a valid Tunisian number
 * (8 digits starting with 2, 3, 4, 5, 7 or 9).
 */
export function normalizeTunisianPhone(input: string): string {
  let digits = (input || "").replace(/[^\d]/g, "");
  if (digits.startsWith("00216")) digits = digits.slice(5);
  else if (digits.length === 11 && digits.startsWith("216")) digits = digits.slice(3);
  if (!/^[234579]\d{7}$/.test(digits)) return "";
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}
