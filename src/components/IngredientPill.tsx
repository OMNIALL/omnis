interface IngredientPillProps {
  name: string;
  dosage?: string;
  /** Kept for API compatibility; pills now share one calm style. */
  color?: string;
  textColor?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/** Calm ingredient tag: hairline border, sentence-weight text, dosage in muted tabular figures. */
export default function IngredientPill({ name, dosage, className = "", size = "md" }: IngredientPillProps) {
  const sizeStyles = {
    sm: "px-3 py-1 text-xs",
    md: "px-3.5 py-1.5 text-[13px]",
    lg: "px-4 py-2 text-sm",
  };
  const label = name.charAt(0) + name.slice(1).toLowerCase();
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border border-line bg-paper text-ink whitespace-nowrap ${sizeStyles[size]} ${className}`}
    >
      {label}
      {dosage && <span className="text-muted tabular-nums">{dosage.toLowerCase()}</span>}
    </span>
  );
}
