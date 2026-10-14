import { vaginismusWhatIs } from "@/content/vaginismus-landing-content";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 2 — Understanding Vaginismus.
 * Evidence-based clinical overview with international medical sources,
 * treatment consensus, symptom indicators, and academic citations.
 */
export function VaginismusWhatIs() {
  return (
    <section
      id="vaginismus-what-is"
      aria-labelledby="vaginismus-what-is-heading"
      className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad"
    >
      <VaginismusReveal className="container-birthwave max-w-4xl">
        <p className="eyebrow">{vaginismusWhatIs.eyebrow}</p>
        <h2
          id="vaginismus-what-is-heading"
          className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {vaginismusWhatIs.heading}
        </h2>

        <p className="mt-6 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
          {vaginismusWhatIs.intro}
        </p>

        {/* International medical sources & treatment evidence grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* International sources */}
          <div className="rounded-xs border border-[var(--color-border)] bg-[var(--vaginismus-rose-wash)] p-7">
            <h3 className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
              {vaginismusWhatIs.internationalSources.heading}
            </h3>
            <div className="mt-5 space-y-4">
              {vaginismusWhatIs.internationalSources.items.map((item) => (
                <div key={item.source} className="border-t border-[var(--color-border)] pt-3 first:border-t-0 first:pt-0">
                  <strong className="block font-body text-sm font-semibold text-ink">
                    {item.source}
                  </strong>
                  <p className="mt-1 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Treatment evidence */}
          <div className="rounded-xs border border-[var(--color-border)] bg-[var(--vaginismus-sky-wash)] p-7">
            <h3 className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
              {vaginismusWhatIs.evidence.heading}
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
              {vaginismusWhatIs.evidence.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta-deep" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* You may experience symptoms list */}
        <div className="mt-12">
          <p className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-ink uppercase">
            {vaginismusWhatIs.subhead}
          </p>
          <div className="mt-4 flex flex-col border-t border-[var(--color-border)]">
            {vaginismusWhatIs.points.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 border-b border-[var(--color-border)] py-4 font-body text-sm font-medium text-ink"
              >
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-terracotta-deep" aria-hidden="true" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance note */}
        <p className="mt-8 border-l-2 border-terracotta pl-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">
          {vaginismusWhatIs.closing}
        </p>

        {/* Medical references */}
        <div className="mt-12 rounded-xs border-t border-[var(--color-border)] pt-6">
          <p className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-ink-soft uppercase">
            {vaginismusWhatIs.references.heading}
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-ink-soft/80">
            {vaginismusWhatIs.references.items.map((refItem) => (
              <li key={refItem} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-ink-soft/40" aria-hidden="true" />
                <span>{refItem}</span>
              </li>
            ))}
          </ul>
        </div>
      </VaginismusReveal>
    </section>
  );
}
