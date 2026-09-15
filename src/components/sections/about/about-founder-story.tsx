import Image from "next/image";
import { aboutFounderStory, aboutFounderIntro } from "@/content/about-content";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 05 — Founder Story, rebuilt as a major editorial scene (visual
 * architecture rework). Desktop: a large portrait holds the left column
 * (~50% of the container's own width — inside the requested 45–55%
 * viewport range once the container's own max-width/gutters are
 * accounted for) and stays `sticky` while the story scrolls beside it on
 * the right — no profile card, no small aside image as Phase 1 had.
 *
 * No founder name exists yet (see about-content.ts) — `aboutFounderIntro
 * .introLabel` ("Our Founder") is reused here, set at name-scale
 * typography, rather than inventing one; replace that one string once a
 * real name is approved and this section's scale/hierarchy needs no
 * other change. Still no clinical credentials anywhere in this file —
 * that stays reserved for /doctors.
 */
export function AboutFounderStory() {
  return (
    <section
      id="about-founder-story"
      aria-labelledby="about-founder-story-heading"
      data-about-scene="founder-story"
      className="relative isolate section-pad"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, var(--color-paper) 0%, var(--color-paper-dim) 18%, var(--color-paper-dim) 82%, var(--color-paper) 100%)",
      }}
    >
      <div className="container-birthwave grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-x-20">
        <div
          // Image-placeholder placement refinement: sticky is gated on
          // viewport HEIGHT as well as width now, not just `lg`. A 4:5
          // portrait at this column's own width can run taller than a
          // short laptop viewport once the sticky top offset (header +
          // 3.5rem) is subtracted — sticky would then pin the portrait
          // with its own lower portion permanently past the viewport
          // bottom for the whole scroll range beside a much longer story
          // column, never fully visible. Below the height threshold the
          // portrait simply stays a normal, non-sticky grid item — it
          // scrolls fully into and out of view like anything else, so
          // the complete image stays reachable on short screens instead
          // of being clipped by a sticky window it can't fit inside.
          className="lg:self-start [@media(min-width:1024px)_and_(min-height:700px)]:sticky [@media(min-width:1024px)_and_(min-height:700px)]:top-[calc(var(--header-height)+3.5rem)]"
        >
          <div
            data-about-visual="founder-portrait"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs bg-paper-dim shadow-sm"
          >
            <Image
              src={aboutFounderStory.media.src}
              alt={aboutFounderStory.media.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        <div className="max-w-xl">
          <p className="eyebrow">{aboutFounderStory.eyebrow}</p>
          <p
            data-about-copy="founder-name"
            className="mt-4 text-[clamp(2.5rem,1.9rem+3vw,4rem)] leading-[1.02] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {aboutFounderIntro.introLabel}
          </p>
          <h2 id="about-founder-story-heading" className="mt-2 text-xl font-medium text-ink-soft">
            {aboutFounderStory.heading}
          </h2>

          <div className="mt-8 space-y-5">
            {aboutFounderStory.body.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="font-display mt-10 max-w-lg text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-[1.3] font-medium text-terracotta-deep">
            &ldquo;{aboutFounderStory.quote}&rdquo;
          </p>

          <div className="mt-10">
            <CtaLink href={aboutFounderStory.cta.href}>{aboutFounderStory.cta.label}</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
