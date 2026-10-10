import { vaginismusSupportWork } from "@/content/vaginismus-landing-content";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 5 — How Support May Work / Individualised Support.
 */
export function VaginismusSupportWork() {
  return (
    <section id="vaginismus-support-work" aria-labelledby="vaginismus-support-work-heading" className="relative isolate bg-[var(--vaginismus-sky-wash)] section-pad">
      <VaginismusReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{vaginismusSupportWork.eyebrow}</p>
        <h2 id="vaginismus-support-work-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vaginismusSupportWork.heading}
        </h2>
        <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">{vaginismusSupportWork.body}</p>

        <div className="mt-8 flex flex-col">
          {vaginismusSupportWork.points.map((point) => (
            <div key={point.title} className="border-t border-[var(--color-border)] py-5 first:border-t-0">
              <h3 className="font-body text-base font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{vaginismusSupportWork.closing}</p>
      </VaginismusReveal>
    </section>
  );
}
