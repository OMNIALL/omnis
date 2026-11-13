/** Centered content column (max ~1280px) with the standard side gutters. */
export default function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto w-full ${className}`}>{children}</div>;
}
