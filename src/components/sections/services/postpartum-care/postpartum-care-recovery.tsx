import { postpartumRecovery } from "@/content/postpartum-care-landing-content";
import { PostpartumImage } from "./postpartum-care-image";
import { PostpartumReveal } from "./postpartum-care-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 4 — Recovery Can Look Different. Four themes beside a portrait
 * image, matching `gynaecology-when-to-consider.tsx`'s own
 * points-plus-image composition. No pinned or scrubbed motion. Closes with
 * an explicit urgent-care routing note rather than implying this page can
 * assess severity itself.
 */
export function PostpartumRecovery() {
  return (
    <section id="postpartum-recovery" aria-labelledby="postpartum-recovery-heading" className="relative isolate bg-[var(--postpartum-sky-wash)] section-pad">
      <PostpartumReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{postpartumRecovery.eyebrow}</p>
          <h2 id="postpartum-recovery-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {postpartumRecovery.heading}
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">{postpartumRecovery.body}</p>
          <p className="mt-3 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{postpartumRecovery.bodySecondary}</p>

          <div className="mt-8 flex flex-col">
            {postpartumRecovery.themes.map((theme) => (
              <div key={theme.title} className="border-t border-[var(--color-border)] py-5">
                <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink uppercase">{theme.title}</h3>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{theme.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{postpartumRecovery.note}</p>

          <div className="mt-8">
            <Button href={postpartumRecovery.cta.href} variant="primary">
              {postpartumRecovery.cta.label}
            </Button>
          </div>
        </div>

        <PostpartumImage imageKey="recovery" corner="br" aspect="aspect-[4/5]" />
      </PostpartumReveal>
    </section>
  );
}
