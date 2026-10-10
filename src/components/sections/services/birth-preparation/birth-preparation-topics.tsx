import { birthPrepTopics } from "@/content/birth-preparation-landing-content";
import { BirthPrepImage } from "./birth-preparation-image";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { cx } from "@/lib/cx";

/**
 * Section 3 — What You'll Learn. Four groups covering understanding labour,
 * comfort/pain-relief, birth preferences, and preparing together.
 */
export function BirthPrepTopics() {
  return (
    <section id="birth-prep-topics" aria-labelledby="birth-prep-topics-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <BirthPrepReveal className="container-birthwave">
        <p className="eyebrow">{birthPrepTopics.eyebrow}</p>
        <h2 id="birth-prep-topics-heading" className="mt-4 max-w-2xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepTopics.heading}
        </h2>
        <p className="mt-4 max-w-[62ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{birthPrepTopics.intro}</p>

        <div className="mt-10 flex flex-col gap-6">
          {birthPrepTopics.groups.map((group, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <div
                key={group.title}
                className={cx(
                  "grid overflow-hidden rounded-xs lg:grid-cols-2 lg:items-stretch",
                  index % 2 === 0 ? "bg-[var(--color-paper-dim)]" : "bg-[var(--birth-prep-sky-wash)]",
                )}
              >
                <div className={cx("relative", imageOnRight && "lg:order-2")}>
                  <BirthPrepImage
                    imageKey={group.imageKey}
                    aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
                    corner={index % 2 === 0 ? "tl" : "tr"}
                    className="h-full min-h-[280px] rounded-none"
                  />
                </div>

                <div className={cx("flex flex-col justify-center p-8 sm:p-10", imageOnRight && "lg:order-1")}>
                  <p className="font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {group.title}
                  </p>

                  <div className="mt-4 flex flex-col">
                    {group.items.map((item) => (
                      <div key={item.title} className="border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-2">
                        <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                        <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </BirthPrepReveal>
    </section>
  );
}
