/**
 * A minimal, on-brand "not built yet" block for route shells that have no
 * real content to render this phase (About, Contact, Privacy, The
 * Experience). Not a new content section — deliberately spare: an
 * eyebrow, one heading, one note. Includes its own top clearance for the
 * fixed header, since (unlike the homepage's hero) nothing above it does.
 */
export function RoutePlaceholder({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note: string;
}) {
  return (
    <section className="relative [padding-block-start:calc(var(--header-height)+var(--space-section))] [padding-block-end:var(--space-section)]">
      <div className="container-birthwave max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
        <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{note}</p>
      </div>
    </section>
  );
}
