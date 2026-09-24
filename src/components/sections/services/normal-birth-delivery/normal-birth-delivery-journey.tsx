import { normalBirthJourney } from "@/content/normal-birth-delivery-landing-content";
import { NormalBirthImage } from "./normal-birth-delivery-image";
import { NormalBirthReveal } from "./normal-birth-delivery-reveal";
import { cx } from "@/lib/cx";

/**
 * Section 3 — The Care Journey. Two substantial image-and-text
 * compositions covering the brief's three stages (before + during share
 * the first composition's labour-support image; after birth gets its own
 * calm after-birth image) — matching the "avoid one photograph per short
 * sentence" instruction and the same alternating-story layout the other
 * two landing pages already establish for a comparable need.
 */
export function NormalBirthJourney() {
  return (
    <section id="nbd-journey" aria-labelledby="nbd-journey-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <NormalBirthReveal className="container-birthwave">
        <p className="eyebrow">{normalBirthJourney.eyebrow}</p>
        <h2 id="nbd-journey-heading" className="mt-4 max-w-2xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {normalBirthJourney.heading}
        </h2>

        <div className="mt-10 flex flex-col gap-6">
          {normalBirthJourney.compositions.map((composition, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <div
                key={composition.tag}
                className={cx(
                  "grid grid-cols-1 overflow-hidden rounded-xs lg:grid-cols-2 lg:items-stretch",
                  index === 0 ? "bg-[var(--color-paper-dim)]" : "bg-[var(--nbd-sky-wash)]",
                )}
              >
                <div className={cx("relative", imageOnRight && "lg:order-2")}>
                  <NormalBirthImage
                    imageKey={index === 0 ? "labour-support" : "after-birth"}
                    aspect="aspect-[4/3] lg:h-full"
                    corner={index === 0 ? "tl" : "tr"}
                    className="h-full min-h-[220px] rounded-none sm:min-h-[280px]"
                  />
                </div>

                <div className={cx("flex min-w-0 flex-col justify-center p-8 sm:p-10", imageOnRight && "lg:order-1")}>
                  <p className="font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {composition.tag}
                  </p>

                  <div className="mt-4 flex flex-col">
                    {composition.blocks.map((block) => (
                      <div key={block.title} className="border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-2">
                        <h3 className="text-lg font-semibold text-ink">{block.title}</h3>
                        <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{block.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </NormalBirthReveal>
    </section>
  );
}
