import { vaginismusWhatIs } from "@/content/vaginismus-landing-content";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 2 — What Is Vaginismus? / Understanding Vaginismus.
 */
export function VaginismusWhatIs() {
  return (
    <section id="vaginismus-what-is" aria-labelledby="vaginismus-what-is-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <VaginismusReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{vaginismusWhatIs.eyebrow}</p>
        <h2 id="vaginismus-what-is-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vaginismusWhatIs.heading}
        </h2>

        <p className="mt-6 text-base leading-[var(--leading-relaxed)] text-ink-soft">{vaginismusWhatIs.intro}</p>

        <p className="mt-8 font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink uppercase">{vaginismusWhatIs.subhead}</p>

        <div className="mt-4 flex flex-col">
          {vaginismusWhatIs.points.map((point) => (
            <div key={point} className="border-t border-[var(--color-border)] py-3.5 font-body text-sm font-medium text-ink first:border-t-0">
              {point}
            </div>
          ))}
        </div>

        <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{vaginismusWhatIs.closing}</p>
      </VaginismusReveal>
    </section>
  );
}
