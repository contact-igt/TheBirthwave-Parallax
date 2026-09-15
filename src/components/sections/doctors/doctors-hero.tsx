"use client";

import { doctorsHero } from "@/content/doctors-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { useParallax } from "@/motion/image-motion";

/**
 * Section 01 — Doctors Hero. A premium editorial opening, not a doctor
 * collage: one large portrait placeholder, generous whitespace, large
 * type. No floating avatars, no glassmorphism, no medical iconography.
 *
 * This section's own motion is deliberately ordinary — the same subtle
 * `useParallax` vertical drift Hero/About/Journey images already use —
 * since this page's distinct motion identity belongs to Section 02's
 * pinned horizontal journey, not the opening hero.
 *
 * Alignment + mobile-horizontal rework: this is the vertical-fallback path
 * (below `lg`/1024px, and under reduced motion at any width — see
 * doctors-master-journey.tsx's own top comment), so "horizontal/editorial"
 * here means the composition itself reads left-to-right, not a real
 * scroll-pinned track. Three widths, three different compositions:
 *   - `lg`+: unchanged two-column row (this is still the desktop pinned
 *     journey's own path below `lg`... no — this IS `lg`+ within the
 *     vertical fallback, which only renders under reduced motion at
 *     desktop widths; kept identical to the previous layout).
 *   - `sm`–`lg` (tablet, ~640–1023px, real two-column territory the
 *     previous `lg:`-gated grid skipped entirely — confirmed via
 *     screenshot as a plain centered single-column stack at 768px,
 *     "falls back too strongly into a vertical stack" exactly as
 *     reported): the same two-column row now engages from `sm` up.
 *   - below `sm` (mobile): not a centered stack either — an offset
 *     composition instead (portrait bleeding from the right edge, text
 *     column offset left and overlapping up into it slightly), so the
 *     eye still travels left→right/top→bottom as one composed scene
 *     rather than two independently centered blocks.
 */
export function DoctorsHero() {
  const imageParallaxRef = useParallax<HTMLDivElement>({ factor: 0.08, maxOffsetPx: 24 });

  return (
    <section
      id="doctors-hero"
      aria-label="Our care team"
      className="relative isolate overflow-hidden bg-paper [padding-block-start:calc(var(--header-height)+var(--space-section-sm))] [padding-block-end:var(--space-section)]"
    >
      <div className="container-birthwave flex flex-col gap-10 sm:grid sm:grid-cols-[1.05fr_0.95fr] sm:items-center sm:gap-10 lg:gap-16">
        <div className="max-w-xl sm:order-1">
          <p className="eyebrow">{doctorsHero.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2.5rem,1.9rem+3.2vw,4.25rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {doctorsHero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {doctorsHero.supporting}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={doctorsHero.primaryCta.href} variant="primary">
              {doctorsHero.primaryCta.label}
            </Button>
            <CtaLink href={doctorsHero.secondaryCta.href}>{doctorsHero.secondaryCta.label}</CtaLink>
          </div>
        </div>

        {/* Below `sm`: the portrait bleeds in from the right edge at
            ~78vw (per the brief's own 72–82vw mobile-offset range)
            instead of a centered, contained block, and overlaps up
            (`-mt-8`) into the text column above it slightly — a
            controlled vertical offset, not a plain stack, so the two
            read as one composed scene rather than two independently
            centered blocks. `sm`+ clears both the negative margin and
            the offset width via the `sm:` overrides, returning to the
            original centered two-column composition. */}
        <div
          ref={imageParallaxRef}
          style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
          className="-mt-8 ml-auto w-[78vw] sm:order-2 sm:mt-0 sm:ml-0 sm:w-auto"
        >
          <MediaPlaceholder
            alt={doctorsHero.media.alt}
            gradient="linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-sky) 100%)"
            corner="tr"
            aspect="aspect-[4/5] lg:aspect-[3/4]"
            className="lg:-mr-[2vw]"
          />
        </div>
      </div>
    </section>
  );
}
