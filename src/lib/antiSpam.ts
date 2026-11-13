// Server-only anti-spam for COD orders (fake orders cost delivery fees).
// In-memory limits are per server instance — good enough to stop bursts; the honeypot and
// timing checks stop most bots. For stronger protection later: Upstash/Redis rate limiting.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function hit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  b.count += 1;
  return b.count <= limit;
}

// Keep the map small.
function sweep() {
  if (buckets.size < 5000) return;
  const now = Date.now();
  for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k);
}

export const HONEYPOT_FIELD = "hp_extra"; // unusual name so browser autofill never fills it
const MIN_FILL_MS = 3000; // humans need more than 3 s to fill name + phone + address
const HOUR = 60 * 60 * 1000;

export type SpamVerdict =
  | { ok: true }
  | { ok: false; reason: "honeypot" | "too_fast" | "rate_ip" | "rate_phone" | "bad_name" };

export function checkOrderSpam(input: {
  ip: string;
  phone: string;
  fullName: string;
  honeypot: unknown;
  startedAt: unknown;
}): SpamVerdict {
  sweep();
  if (typeof input.honeypot === "string" && input.honeypot.trim() !== "") return { ok: false, reason: "honeypot" };

  const started = Number(input.startedAt);
  if (Number.isFinite(started) && started > 0 && Date.now() - started < MIN_FILL_MS) {
    return { ok: false, reason: "too_fast" };
  }

  // Names: letters (Latin/Arabic), spaces, apostrophes, dots, hyphens only — no digits or links.
  if (!/^[\p{L}\s'’.\-]{3,100}$/u.test(input.fullName) || /https?:|www\./i.test(input.fullName)) {
    return { ok: false, reason: "bad_name" };
  }

  if (!hit(`ip:${input.ip}`, 10, HOUR)) return { ok: false, reason: "rate_ip" };
  if (!hit(`phone:${input.phone}`, 3, 24 * HOUR)) return { ok: false, reason: "rate_phone" };
  return { ok: true };
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip")) || "unknown";
}
