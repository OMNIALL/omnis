import Link from "next/link";

type Variant = "primary" | "secondary" | "outline";

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
};

/** Every CTA uses this: flat pill, ≥48px tall, visible focus ring (styles in globals.css). */
export default function Button({ href, children, variant = "primary", className = "", external = false }: Props) {
  const cls = `btn-sticker ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
