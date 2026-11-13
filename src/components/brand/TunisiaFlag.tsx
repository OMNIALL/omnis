/** Tunisian flag as SVG — the 🇹🇳 emoji renders as "TN" on Windows. */
export default function TunisiaFlag({ className = "w-5 h-auto", title = "Tunisie" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label={title}>
      <rect width="30" height="20" rx="2" fill="#E70013" />
      <circle cx="15" cy="10" r="5" fill="#fff" />
      <circle cx="15.6" cy="10" r="3.8" fill="#E70013" />
      <circle cx="16.6" cy="10" r="3.05" fill="#fff" />
      <polygon
        fill="#E70013"
        points="16.20,7.70 16.74,9.26 18.39,9.29 17.07,10.28 17.55,11.86 16.20,10.92 14.85,11.86 15.33,10.28 14.01,9.29 15.66,9.26"
      />
    </svg>
  );
}
