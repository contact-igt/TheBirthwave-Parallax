import { ServiceFaqSection } from "../shared/service-faq-section";
import { newbornPractical, newbornFaq } from "@/content/pages/newborn-pediatric-care";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { NewbornReveal } from "./newborn-pediatric-care-reveal";

/**
 * Section 7 — Practical Information. Every field is a confirmed-pending
 * placeholder (see the content file's own comment) — visible
 * "[BirthWave confirmation needed: ...]" wording rather than hiding missing
 * information behind a generic claim. No photograph implies a real
 * consultation space; the shared `MediaPlaceholder` stands in until real,
 * approved photography exists.
 */
export function NewbornPractical() {
  return (
    <section id="newborn-practical" aria-labelledby="newborn-practical-heading" className="relative isolate bg-[var(--newborn-rose-wash)] section-pad">
      <NewbornReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <MediaPlaceholder
          alt={newbornPractical.facilityPhotoPendingLabel}
          gradient="linear-gradient(135deg, var(--color-paper-dim) 0%, var(--color-sky) 100%)"
          corner="tr"
          aspect="aspect-[4/5]"
          className="w-full"
        />

        <div>
          <p className="eyebrow">{newbornPractical.eyebrow}</p>
          <h2 id="newborn-practical-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {newbornPractical.heading}
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{newbornPractical.intro}</p>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {newbornPractical.info.map((item) => (
              <div key={item.label}>
                <strong className="block font-body text-sm font-semibold text-ink">{item.label}</strong>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </NewbornReveal>
    </section>
  );
}

/** Section 8 — FAQ. Native `<details>/<summary>` — the same accessible
 * accordion every other landing page on this site uses. Answers stay
 * cautious throughout: no diagnosis, no guaranteed reassurance, no
 * vaccination/teleconsultation claim — every unconfirmed operational
 * question is left as an explicit placeholder. */
export function NewbornFaq() {
  return <ServiceFaqSection id="newborn-faq" eyebrow={newbornFaq.eyebrow} heading={newbornFaq.heading} items={newbornFaq.items} />;
}
