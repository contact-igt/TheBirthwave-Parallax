"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { philosophy } from "@/content/site-content";
import { useParallax, useHandoffProgress } from "@/motion/image-motion";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap, SIGNATURE_EASE } from "@/motion/gsap-scroll";
import { cx } from "@/lib/cx";

/** Small, restrained vertical travel for each revealed line — "a small
 * vertical movement, without bounce or dramatic scaling," per the brief. */
const REVEAL_TRAVEL_PX = 16;

/**
 * One shared type scale for the three narrative statements (messages[0],
 * the section's own `<h2>`, plus messages[1]/messages[2]) — homepage
 * navigation + Philosophy typography micro-fix. Previously messages[1]/[2]
 * were plain `text-xl` paragraphs (a fixed 1.375rem, default/regular
 * weight, no letter-spacing) while messages[0] carried this exact clamp,
 * `font-semibold` and `tracking-tight` — a real, confirmed inconsistency
 * (statement 01 read with far more visual authority than 02/03, and 02
 * read smaller still since nothing in `text-xl` scales with viewport).
 * Not a new value invented for this fix: it's the size the design system
 * already committed to for this exact composition, just extended to all
 * three statements instead of only the first. `text-balance` is likewise
 * extended to all three — the tool this same file already uses on the
 * heading/resolution to avoid an awkward one-word orphan line, not a new
 * per-statement max-width (none proved necessary against the shared
 * `max-w-xl` column at any required breakpoint — see this file's own QA).
 * Text color is deliberately left as its own per-statement choice (ink for
 * the opening statement, ink-soft for the two that follow) — the brief's
 * own consistency list is explicit: font-size, weight, line-height,
 * letter-spacing and responsive scaling, not color.
 *
 * `!leading-[1.08]`, not plain `leading-[1.08]`: globals.css's own
 * `h1,h2,h3,h4 { line-height: var(--leading-tight) }` rule is unlayered,
 * so — per CSS's cascade-layer rules — it beats ANY Tailwind utility class
 * (Tailwind's utilities all live inside `@layer utilities`) regardless of
 * selector specificity. Confirmed by computed-style measurement, not
 * assumed: statement 01's `<h2>` was actually rendering at a 1.05 ratio
 * (58.8px at a 56px font-size) while the plain `<p>` statements correctly
 * rendered this class's own intended 1.08 (60.48px) — a real, measurable
 * line-height mismatch this task's own "same line-height" requirement
 * newly makes relevant (the mismatch predates this fix; it just had no
 * visible consequence while statements 02/03 were their own smaller,
 * un-clamped `text-xl`). Same fix pattern `cta-link.tsx`'s own `!text-...`
 * classes already use for the identical unlayered-global-rule-vs-utility
 * conflict (there: `a { color: inherit }`). Harmless on the two `<p>`
 * elements, which were never affected by the h1–h4 rule to begin with —
 * `!important` just wins there too, with no visible change.
 */
const NARRATIVE_STATEMENT_CLASS =
  "text-balance text-[clamp(2.3rem,1.8rem+2.6vw,3.5rem)] !leading-[1.08] font-semibold tracking-[var(--tracking-tight)]";

/** How far this section's own top overlaps up into Hero's tail — must
 * match the section's own `-mt-*` class below AND the `overlapPx` passed
 * to `useHandoffProgress` exactly, so the visual overlap and the reveal
 * math that hides it at rest never drift apart. -mt-20 in Tailwind's
 * default scale is exactly 80px (20 × 0.25rem × 16px). */
const HERO_OVERLAP_PX = 80;

/** Px of scroll distance the handoff spans once the overlap starts being
 * crossed — short enough to read as a brief, deliberate transition
 * rather than a slow, lingering dissolve. Shared with hero-section.tsx's
 * own `useHandoffProgress` call so both sides settle in step. */
const HANDOFF_RANGE_PX = 240;

/** Px of upward drift the incoming group settles into by the time the
 * handoff completes — paired with Hero's own smaller `OUTGOING_TRANSLATE_PX`
 * (hero-section.tsx) for "outgoing moves slightly slower than incoming." */
const INCOMING_TRANSLATE_PX = 26;

/**
 * The travelling wave mask — an original curve in the same family as
 * hero-section.tsx's own static `WAVE_EDGE_D` (comparable amplitude,
 * comparable control-point rhythm), used here as an SVG luminance mask
 * instead of a visible stroke: white below the curve is the *revealed*
 * region, everything above is unpainted (masks treat unpainted as
 * hidden). `MASK_TILE_HEIGHT` is deliberately far taller than any
 * realistic section height (the same "author a small viewBox, stretch to
 * the real rendered size via `preserveAspectRatio='none'`" technique
 * journey-section.tsx's and hero-section.tsx's own paths already use,
 * just applied to a mask instead of a stroke) — the white fill below the
 * curve extends all the way to the tile's own bottom, so however far this
 * tile is repositioned within its travel range, there's always solid
 * white left to cover the whole element; a shorter tile would run out of
 * "revealed" coverage partway down a tall section.
 *
 * `MASK_POSITION_START_PX`/`END_PX` are `mask-position-y` values, not
 * direct pixel offsets of the curve itself — the curve's own baseline
 * sits at y=200 inside the tile, so effective on-page wave position =
 * `maskPositionY + 200`. Start (-100) puts the wave at image-y 100 —
 * comfortably below `HERO_OVERLAP_PX` (80), the entire sliver exposed at
 * rest, so a slightly generous margin.
 *
 * End is calibrated to finish exactly when the handoff itself finishes,
 * not before: the visible sliver of this box grows by roughly 1px of
 * screen height per 1px of scroll (it's a normal, non-pinned element),
 * so over `HANDOFF_RANGE_PX` of scroll the growing "window" the curve
 * has to stay ahead of grows by that same ~240px. The wave's own travel
 * must therefore span the same ~240px of effective on-page position, not
 * further — confirmed as a real, measured bug (not assumed): the
 * previous END (-300) put the effective wave position at image-y -100,
 * a 200px journey from the 100px start, so the mask's hidden region hit
 * zero at scroll≈120px — half of `HANDOFF_RANGE_PX` — well before the
 * handoff itself completed. Everything revealed after that point was no
 * longer touched by the curve at all: just the box's own plain
 * rectangular top edge sliding further into view, unmasked, for the
 * rest of the scroll range — exactly the reported "straight rectangular
 * image edge" / "travelling wave is not visually apparent" defect,
 * verified via direct inspection of the live `--handoff-mask-y` values
 * at each scroll depth, not guessed. End (-200) puts the wave at image-y
 * 0 exactly at `HANDOFF_RANGE_PX`, so the curve stays part of the
 * growing visible sliver for the whole handoff instead of finishing at
 * its midpoint.
 */
const MASK_TILE_HEIGHT = 2400;
const MASK_WAVE_D =
  "M0,214 C 220,264 340,158 580,200 C 820,242 940,160 1180,198 C 1300,217 1380,210 1440,204";
const MASK_POSITION_START_PX = -100;
const MASK_POSITION_END_PX = -200;

const WAVE_MASK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 ${MASK_TILE_HEIGHT}" preserveAspectRatio="none"><path d="${MASK_WAVE_D} L 1440,${MASK_TILE_HEIGHT} L 0,${MASK_TILE_HEIGHT} Z" fill="#fff"/></svg>`;
const WAVE_MASK_DATA_URI = `url("data:image/svg+xml,${encodeURIComponent(WAVE_MASK_SVG)}")`;

/**
 * PhilosophySection — homepage motion coherence pass.
 *
 * Composition is unchanged from the previous hero→Philosophy rework: the
 * eyebrow, the first statement (the section's real `<h2>`) and the
 * background image are still all present together the moment the section
 * enters the viewport, and the section is still fully non-pinned, in
 * plain document flow, at every breakpoint — none of that structural fix
 * is touched here.
 *
 * What that rework over-corrected: it made the remaining two statements
 * and the resolution permanently visible alongside the first, with no
 * scroll-linked progression left at all — "too much text progression
 * removed," per the later brief this file now addresses. This pass adds
 * back a restrained, sequential reveal for exactly those three lines
 * (message 1, message 2, the resolution) without reintroducing what
 * caused the original regression: no pin, no reserved scroll distance of
 * its own, no multi-viewport track. One `gsap.timeline` scrubbed against
 * the section's own natural transit through the viewport (`start`/`end`
 * keyed to the section itself, matching the same "top 85%/bottom 15%"
 * per-element trigger convention journey-section.tsx's own scenes already
 * use) is the entire mechanism.
 *
 * All three lines are unconditionally in the JSX at all times — revealing
 * one is purely an `autoAlpha`/`y` change, never a `display`/conditional-
 * render toggle, so there is no layout shift when it appears and no
 * dependency on JS for the content to exist in the DOM. The initial
 * hidden state is applied by the effect itself (`gsap.set`), not a CSS
 * class computed at build time: if the effect never runs (reduced motion,
 * or a script failure), every line simply stays at its default, fully
 * visible resting state — fail-safe in the same direction Journey's and
 * Immersive's own reduced-motion branches already fail toward.
 */
export function PhilosophySection() {
  const imageParallaxRef = useParallax<HTMLDivElement>({ factor: 0.06, maxOffsetPx: 20 });
  const handoffRef = useHandoffProgress<HTMLDivElement>({
    overlapPx: HERO_OVERLAP_PX,
    rangePx: HANDOFF_RANGE_PX,
    maxTranslatePx: INCOMING_TRANSLATE_PX,
    maskTravelStartPx: MASK_POSITION_START_PX,
    maskTravelEndPx: MASK_POSITION_END_PX,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const message1Ref = useRef<HTMLParagraphElement>(null);
  const message2Ref = useRef<HTMLParagraphElement>(null);
  const resolutionRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const sectionEl = sectionRef.current;
    const message1 = message1Ref.current;
    const message2 = message2Ref.current;
    const resolution = resolutionRef.current;
    if (!sectionEl || !message1 || !message2 || !resolution) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      gsap.set([message1, message2, resolution], { autoAlpha: 0, y: REVEAL_TRAVEL_PX });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 1,
        },
      });

      // Sequential, not simultaneous: message 2 doesn't begin until
      // message 1 has fully arrived, and the resolution waits for message
      // 2 in turn — each its own short reveal, not a shared crossfade.
      // The resolution's own arrival still leaves a full ~35% of the
      // section's transit as a plain hold (nothing animates after 0.62)
      // before it scrolls away, satisfying "the final line is readable
      // before it leaves" without needing extra scroll distance.
      tl.to(message1, { autoAlpha: 1, y: 0, ease: SIGNATURE_EASE, duration: 0.08 }, 0.3)
        .to(message2, { autoAlpha: 1, y: 0, ease: SIGNATURE_EASE, duration: 0.08 }, 0.42)
        .to(resolution, { autoAlpha: 1, y: 0, ease: SIGNATURE_EASE, duration: 0.08 }, 0.54)
        // Anchors the timeline's own natural duration at exactly 1 — GSAP
        // derives a timeline's duration from its last child's own end
        // time (here, 0.62, the resolution tween's own finish), and a
        // scrub-linked ScrollTrigger maps scroll progress 0→1 onto
        // *that* duration, not literally 1, unless something anchors it
        // there. Left alone this silently compresses every fraction above
        // (confirmed the same way an identical bug was caught and fixed
        // on the About page's own cinematic timeline: measuring the real
        // scroll position against the intended fraction and finding them
        // diverge). A zero-duration `set` re-affirming the resolution's
        // already-true resting state, placed at `1`, costs nothing
        // visually and fixes the mapping.
        .set(resolution, { autoAlpha: 1, y: 0 }, 1);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, sectionEl);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      aria-labelledby="philosophy-heading"
      // Hero → Philosophy blend fix (wave-mask revision): the section
      // still overlaps up into Hero's own tail by `HERO_OVERLAP_PX`, but
      // this section itself now carries NO opaque background at all
      // (moved to the text column below, `sm:bg-transparent`) — the
      // *complete* incoming visual group (photo + both overlays) is
      // masked as one unit below, so wherever that mask is transparent,
      // there is nothing else here to paint over Hero, which sits behind
      // in normal document order and shows straight through. An opaque
      // section background was exactly what the previous, photo-only
      // fade couldn't get past: the readability overlay's own always-on
      // paper tint kept painting a rectangular seam regardless of the
      // photo's own opacity.
      className="relative isolate overflow-hidden -mt-20"
    >
      {/* The atmosphere image — a contained panel above the text below
          `sm`, the section's own full-bleed backdrop from `sm` up. */}
      <div
        ref={imageParallaxRef}
        style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
        className="relative aspect-[4/5] w-full sm:absolute sm:inset-0 sm:aspect-auto sm:h-full"
      >
        {/* The complete incoming visual group — photo, readability
            overlay and bottom wash together, as ONE masked+translated
            unit. A travelling wave-shaped luminance mask (an original
            curve, not hero-section.tsx's own stroke reused verbatim)
            replaces the previous straight-edge opacity fade: below the
            curve is revealed, above is unpainted (=hidden), and the
            curve's own position travels upward across the handoff via
            `--handoff-mask-y` (one shared progress controller — see
            `useHandoffProgress`). Grouping every layer here, not just the
            photo, is what keeps the readability overlay and bottom wash
            from leaving their own rectangular seam once the photo's edge
            went soft — the exact remaining bug a photo-only mask left
            behind. `--handoff-y` adds a small upward drift as the handoff
            completes (paired with hero-section.tsx's own smaller,
            slower outgoing drift, for restrained depth). Once progress
            reaches 1, the mask sits well above the visible area and the
            translate settles — fully revealed, mask effectively cleared. */}
        <div
          ref={handoffRef}
          className="absolute inset-0"
          style={{
            transform: "translate3d(0, var(--handoff-y, 0px), 0)",
            maskImage: WAVE_MASK_DATA_URI,
            WebkitMaskImage: WAVE_MASK_DATA_URI,
            maskSize: `100% ${MASK_TILE_HEIGHT}px`,
            WebkitMaskSize: `100% ${MASK_TILE_HEIGHT}px`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "0px var(--handoff-mask-y, 0px)",
            WebkitMaskPosition: "0px var(--handoff-mask-y, 0px)",
          }}
        >
          <Image
            src={philosophy.media.src}
            alt={philosophy.media.alt}
            fill
            sizes="100vw"
            className="object-cover object-[22%_32%] sm:object-[27%_38%]"
          />

          {/* Readability overlay, `sm`+ only: opaque toward the text
              column (right) fading out over the photo's own subject
              (left) — the mirror of Hero's own scrim direction. Below
              `sm` the image sits above the text in plain flow, so no
              overlay is needed there at all. Now inside the same masked
              group as the photo — see this block's own top comment. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden sm:block"
            style={{
              backgroundImage:
                "linear-gradient(100deg, transparent 0%, transparent 30%, color-mix(in srgb, var(--color-paper) 55%, transparent) 54%, color-mix(in srgb, var(--color-paper) 88%, transparent) 76%, var(--color-paper) 100%)",
            }}
          />

          {/* A soft bottom wash at every width — keeps the resolution
              line (closest to the image's own bottom edge on mobile)
              readable too, and gives the full-bleed desktop image a
              settled lower edge rather than a hard crop line into the
              text block. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/3 sm:h-1/2"
            style={{ backgroundImage: "linear-gradient(to top, var(--color-paper) 0%, transparent 100%)" }}
          />
        </div>
      </div>

      {/* `bg-paper` lives here, not on the section, so the section's own
          overlap band (above) can stay genuinely transparent — below
          `sm` the image is a contained block, not full-bleed, so this
          column still needs its own paper backdrop for the text beneath
          it; at `sm`+ the (now fully-revealed) image already covers the
          whole section, so an opaque column here would needlessly sit
          between it and the text overlaid on top of it. */}
      <div className="container-birthwave relative z-10 bg-paper py-(--space-section) sm:min-h-svh sm:bg-transparent sm:flex sm:flex-col sm:justify-center">
        <div className="max-w-xl sm:ml-auto sm:text-right">
          <p className="eyebrow">{philosophy.eyebrow}</p>

          <h2 id="philosophy-heading" className={cx("mt-5", NARRATIVE_STATEMENT_CLASS, "text-ink")}>
            {philosophy.messages[0].text}
          </h2>

          <div className="mt-8 space-y-6">
            <p ref={message1Ref} className={cx(NARRATIVE_STATEMENT_CLASS, "text-ink-soft")}>
              {philosophy.messages[1].text}
            </p>
            <p ref={message2Ref} className={cx(NARRATIVE_STATEMENT_CLASS, "text-ink-soft")}>
              {philosophy.messages[2].text}
            </p>
          </div>

          <p
            ref={resolutionRef}
            className="mt-10 text-balance text-[clamp(1.6rem,1.3rem+1.4vw,2.25rem)] leading-[1.2] font-semibold tracking-[var(--tracking-wide)] text-terracotta-deep uppercase"
          >
            {philosophy.resolution}
          </p>
        </div>
      </div>
    </section>
  );
}
