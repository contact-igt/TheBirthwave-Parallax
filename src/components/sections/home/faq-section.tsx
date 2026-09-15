"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { faq } from "@/content/faq-content";
import { useParallax } from "@/motion/image-motion";

/**
 * "Good to know" — a two-column editorial composition (docs/
 * implementation-brief.md §36, replacing §32's heading-and-thumbnail
 * row): LEFT holds the heading and the full FAQ accordion; RIGHT holds
 * one large visual panel, architected to later carry a looping video
 * without any layout change (see `FaqVisual` below) — for now, the same
 * approved photograph the section already used.
 *
 * Native <details>/<summary> — full keyboard support and screen-reader
 * semantics for free, no ARIA to hand-roll. Hairline dividers only, no
 * card backgrounds, no pill shells.
 *
 * No section-level background fill: this is the one section the homepage
 * rework kept wrapped in DotFieldRegion (see src/app/page.tsx and
 * docs/implementation-brief.md §24) — the dotted texture's single
 * sanctioned scene, at a very low opacity. A local opaque background here
 * would fully occlude the canvas behind it.
 */
export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-pad relative isolate"
    >
      {/* 12-column grid (docs/implementation-brief.md §36): LEFT (heading
          + accordion) spans columns 1–7, RIGHT (the visual panel) spans
          8–12 — both starting at the same row, so the panel reads as
          aligned with the whole block rather than pinned to the
          viewport's top-right corner. Below `lg` this collapses to the
          grid's own single-column default; DOM order (heading → visual →
          accordion) is what actually decides mobile's reading order,
          chosen after comparing it against accordion-first by screenshot
          — the visual works better as an early anchor before a five-
          question list than buried beneath it. */}
      <div className="container-birthwave relative z-10 grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-start">
        {/* Explicit column/row placement on all three children, not
            grid auto-flow: the visual's own `lg:row-span-2` needs the
            heading and accordion to land on two DISTINCT, known rows
            (1 and 2) in the same 1–7 column track for it to correctly
            span alongside both — auto-placement order alone doesn't
            guarantee that once a row-spanning item is in the mix. */}
        <div className="lg:col-start-1 lg:col-span-7 lg:row-start-1">
          {/* Literal clamp from the brief, not this project's own
              `--text-4xl`/`--text-5xl` tokens (both reach further than
              4.8rem at wide viewports) — "strong but restrained"
              specifically caps out at 4.8rem here. */}
          <h2
            id="faq-heading"
            className="text-[clamp(3rem,4vw,4.8rem)] leading-[1.02] font-semibold text-ink"
          >
            {faq.heading}
          </h2>
        </div>

        <div className="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2">
          <FaqVisual />
        </div>

        {/* Width capped independently of the grid column (docs/
            implementation-brief.md §36: "approximately 620–760px max")
            — at very wide viewports the 7/12 column alone would run
            past that. */}
        <div className="max-w-[700px] border-t border-[var(--color-border)] lg:col-start-1 lg:col-span-7 lg:row-start-2">
          {faq.items.map((item) => (
            <details
              key={item.question}
              className="group border-b border-[var(--color-border)] py-7"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 font-body text-lg font-medium text-balance text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-terracotta transition-transform duration-[var(--duration-base)] ease-[var(--ease-signature)] group-open:rotate-45"
                />
              </summary>
              <p className="mt-4 max-w-2xl text-base leading-[var(--leading-relaxed)] text-ink-soft">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The right-hand visual panel — poster image today, architected to
 * become a looping video later without touching this component's own
 * layout (docs/implementation-brief.md §36). The wrapper below (fixed
 * aspect ratio, `overflow-hidden`, minimal radius, no shadow/border/card
 * shell) is exactly what a `<video>` would sit inside too; only the
 * child swaps. When an approved video exists:
 *
 *   <video
 *     muted loop playsInline autoPlay={!reducedMotion}
 *     poster={faq.media.src}          // today's image, unchanged
 *     disablePictureInPicture disableRemotePlayback
 *     className="h-full w-full object-cover"    // identical to <Image> below
 *   >
 *     <source src={faq.media.videoSrc} type="video/mp4" />
 *   </video>
 *
 * — the same unconditional-element, effect-driven play/pause pattern
 * Hero's own video already uses (hero-section.tsx, docs/implementation-
 * brief.md §26): never branch the element type on `reducedMotion` (that
 * reintroduces the hydration mismatch fixed there), just don't call
 * `.play()` under reduced motion, so it rests on its `poster` frame —
 * which is this exact image, already in place. No video asset exists
 * yet, so none is added here.
 */
function FaqVisual() {
  // 8–14px of parallax drift (docs/implementation-brief.md §36) — the
  // existing hook, not a new ScrollTrigger scene; already zeroes itself
  // out under reduced motion and below `minViewportWidth` on its own.
  const parallaxRef = useParallax<HTMLDivElement>({ factor: 0.06, maxOffsetPx: 12, minViewportWidth: 1024 });

  return (
    <div
      ref={parallaxRef}
      style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
      // §38: `max-w-[42vw]` used to apply unconditionally — with no `lg:`
      // gate on it, that capped this panel to 42% of the *viewport*
      // width at every size, so on mobile (where it's meant to be "full-
      // width or nearly full-width," per the brief) it rendered as a
      // thumbnail roughly 160px wide at 390px, confirmed by measuring
      // its own rendered width rather than assumed. Full width below
      // `lg`; the 40vw cap (a deliberate desktop panel size, part of the
      // approved two-column layout) now only applies there.
      className="relative aspect-[3/2] w-full overflow-hidden rounded-sm lg:max-w-[40vw]"
    >
      <Image
        src={faq.media.src}
        alt={faq.media.alt}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
