import { vaginismusWholePerson } from "@/content/vaginismus-landing-content";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 5A — Why Different Types of Support Matter / Understanding Whole-Person Care.
 * Highlights the interplay between gynaecology, pelvic floor therapy,
 * psychological support, psychosexual care, and mind-body practices.
 */
export function VaginismusWholePerson() {
  return (
    <section
      id="vaginismus-whole-person"
      aria-labelledby="vaginismus-whole-person-heading"
      className="relative isolate bg-paper section-pad border-t border-[var(--color-border)]"
    >
      <VaginismusReveal className="container-birthwave max-w-4xl">
        <p className="eyebrow">{vaginismusWholePerson.eyebrow}</p>
        <h2
          id="vaginismus-whole-person-heading"
          className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {vaginismusWholePerson.heading}
        </h2>

        {/* Intro */}
        <div className="mt-6 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
          {vaginismusWholePerson.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {/* 5 Domains Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vaginismusWholePerson.domains.map((domain) => (
            <div
              key={domain.title}
              className="rounded-xs border border-[var(--color-border)] bg-[var(--vaginismus-rose-wash)]/40 p-6"
            >
              <h3 className="font-body text-base font-semibold text-ink">
                {domain.title}
              </h3>
              <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                {domain.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Note */}
        <div className="mt-10 rounded-xs border-l-2 border-terracotta pl-4 py-2 space-y-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
          {vaginismusWholePerson.closing.map((p, idx) => (
            <p key={idx} className={idx === 1 ? "font-medium text-ink" : ""}>
              {p}
            </p>
          ))}
        </div>
      </VaginismusReveal>
    </section>
  );
}
