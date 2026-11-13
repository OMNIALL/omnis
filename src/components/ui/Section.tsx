import Container from "./Container";

type Tone = "cream" | "paper" | "ink";

const tones: Record<Tone, string> = {
  cream: "",
  paper: "bg-paper border-y border-line",
  ink: "bg-ink text-cream",
};

interface Props {
  children: React.ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  /** Optional eyebrow + title block rendered above the content. */
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
}

/** Standard page section: consistent vertical rhythm, gutters, alternating backgrounds, heading block. */
export default function Section({ children, id, tone = "cream", className = "", eyebrow, title, intro }: Props) {
  const onDark = tone === "ink";
  return (
    <section id={id} className={`w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20 ${tones[tone]} ${className}`}>
      <Container>
        {(eyebrow || title || intro) && (
          <div className="max-w-2xl mb-10">
            {eyebrow && (
              <p className="eyebrow mb-3" style={onDark ? { color: "var(--sun)" } : undefined}>
                {eyebrow}
              </p>
            )}
            {title && <h2 className={`heading-xl text-3xl sm:text-5xl ${onDark ? "" : "text-ink"}`}>{title}</h2>}
            {intro && (
              <p className={`text-lg mt-4 ${onDark ? "" : "text-muted"}`} style={onDark ? { color: "rgba(255,244,227,0.75)" } : undefined}>
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
