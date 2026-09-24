import { postpartumIntro } from "@/content/postpartum-care-landing-content";
import { PostpartumImage } from "./postpartum-care-image";
import { PostpartumReveal } from "./postpartum-care-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 2 — Trust-Building Introduction. A full section with a generous
 * image opposite the text, matching `lactation-intro.tsx`/`vbac-intro.tsx`'s
 * own balanced editorial composition. Explicitly reassures that a visitor
 * doesn't need to decide for themselves whether a concern is worth raising.
 */
export function PostpartumIntro() {
  return (
    <section id="postpartum-intro" aria-labelledby="postpartum-intro-heading" className="relative isolate bg-paper section-pad">
      <PostpartumReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <PostpartumImage imageKey="introduction" corner="tl" aspect="aspect-[4/3]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{postpartumIntro.eyebrow}</p>
            <h2 id="postpartum-intro-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {postpartumIntro.heading}
            </h2>

            {postpartumIntro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-col">
              {postpartumIntro.themes.map((theme) => (
                <div key={theme.title} className="border-t border-[var(--color-border)] py-5">
                  <h3 className="text-lg font-semibold text-ink">{theme.title}</h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{theme.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button href={postpartumIntro.cta.href} variant="primary">
                {postpartumIntro.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </PostpartumReveal>
    </section>
  );
}
