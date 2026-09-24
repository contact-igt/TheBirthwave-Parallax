import { postpartumCovers } from "@/content/postpartum-care-landing-content";
import { PostpartumImage } from "./postpartum-care-image";
import { PostpartumReveal } from "./postpartum-care-reveal";

/**
 * Section 3 — What Postpartum Care May Include. Carries the `what-we-cover`
 * id the hero's own secondary link targets. Image beside a stacked
 * four-step numbered list, matching `lactation-covers.tsx`'s own
 * numbered-steps composition. Step 04 explicitly leaves the next step to
 * the care team's own explanation — never an automatic assessment.
 */
export function PostpartumCovers() {
  return (
    <section id="what-we-cover" aria-labelledby="postpartum-covers-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <PostpartumReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <PostpartumImage imageKey="closing" corner="bl" aspect="aspect-[4/3]" />

          <div className="max-w-xl">
            <p className="eyebrow">{postpartumCovers.eyebrow}</p>
            <h2 id="postpartum-covers-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {postpartumCovers.heading}
            </h2>

            <div className="mt-8 flex flex-col">
              {postpartumCovers.steps.map((step) => (
                <div key={step.number} className="flex gap-4 border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-2">
                  <span className="mt-0.5 font-body text-sm text-terracotta-deep">{step.number}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{postpartumCovers.note}</p>
          </div>
        </div>
      </PostpartumReveal>
    </section>
  );
}
