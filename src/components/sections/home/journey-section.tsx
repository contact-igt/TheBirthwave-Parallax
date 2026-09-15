"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { journey } from "@/content/site-content";
import { useReducedMotion } from "@/motion/reduced-motion";
import { useParallax, wipeReveal } from "@/motion/image-motion";
import { cx } from "@/lib/cx";
import { ensureScrollTriggerRegistered, gsap, ScrollTrigger, SIGNATURE_EASE } from "@/motion/gsap-scroll";

/**
 * The signature BirthWave Journey — rebuilt from a pinned single-frame
 * slideshow into a zig-zag SCROLLING journey (docs/implementation-brief.md
 * §27; see that entry for the full brief). The old version pinned one
 * 100vh canvas and swapped content inside it; this version never pins —
 * six sequential scene blocks live in normal document flow, the visitor
 * physically scrolls past each one, and one continuous BirthWave path
 * runs behind all six, alternating which side of centre it favours to
 * match each scene's own text/image side.
 */

const STAGE_COUNT = journey.stages.length;

// ---------------------------------------------------------------------
// The continuous BirthWave path — one SVG line spanning every scene.
// viewBox units are proportional, not literal pixels: the <svg> stretches
// to the actual rendered width/height of its wrapper via
// `preserveAspectRatio="none"`, exactly like the old pinned canvas's path
// did, just no longer confined to a single 100vh frame.
// ---------------------------------------------------------------------
const PATH_WIDTH = 100;
const PATH_HEIGHT = STAGE_COUNT * 100;
// The path's resting x per stage sits just left/right of true centre —
// inside the empty gutter column the 12-col grid leaves for it (col 6 for
// text-left/image-right stages, col 7 for image-left/text-right ones) —
// never as far out as the text or image columns themselves. "Restrained,"
// per the brief: the zig-zag rhythm reads from six gentle alternations,
// not a dramatic sweep across the whole width.
const GUTTER_LEFT = 44;
const GUTTER_RIGHT = 56;
// Mobile gets its own, much narrower path — "travels vertically along the
// left side," per the brief, not the desktop zig-zag's wider gutter swing
// (which on a single-column mobile layout would cut straight through the
// text column instead of sitting beside it). Sits just left of where the
// text column itself starts (the container's own `--space-gutter` inset),
// with a barely-there waver so it doesn't read as a ruled line.
const MOBILE_X = 4;
const MOBILE_WAVER = 1.5;
// Cycles the three confirmed brand hues, but not by pure rotation — Birth
// (stage 4) is deliberately pinned to coral per the brief's "the wave may
// briefly adopt coral" instruction; the other five lean between the warm
// terracotta default and a cooler sky, echoing each stage's own
// background atmosphere (see ATMOSPHERE_HUES below).
const STAGE_HUES = [
  "--color-terracotta",
  "--color-sky",
  "--color-terracotta",
  "--color-coral",
  "--color-terracotta",
  "--color-sky",
] as const;
// The base line's own resting tone (docs/implementation-brief.md §29) —
// a full-page review found `--color-border-strong` (a neutral ink-grey,
// unrelated to the brand palette) reading as visually heavy against the
// warm atmosphere. A subdued Dusty Rose — the same hue as the active
// trace's default, at low strength — keeps the line thin, soft and
// on-brand at rest; only the short highlight trace (still cycling
// terracotta/sky/coral per `STAGE_HUES`) ever carries full colour, so
// the path as a whole never reads as "brightly coloured."
const BASE_STROKE = "color-mix(in srgb, var(--color-terracotta) 38%, transparent)";
const HIGHLIGHT_LENGTH = PATH_HEIGHT / STAGE_COUNT / 1.8;

function buildWavePath(points: Array<{ x: number; y: number }>): string {
  // A short straight lead-in from the very top edge (under the intro
  // heading) into stage one's own point, and a short lead-out past stage
  // six's point to the bottom edge — so the line already exists both
  // above Preconception and below Baby, rather than starting/stopping
  // exactly at a stage. Combined with the fade mask on the <g> below,
  // this is what makes the path "flow directly into Preconception" and
  // "resolve naturally" after Baby instead of cutting hard at either end.
  let d = `M ${points[0].x} 0 L ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midY = (p0.y + p1.y) / 2;
    d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
  }
  d += ` L ${points[points.length - 1].x} ${PATH_HEIGHT}`;
  return d;
}

const JOURNEY_PATH_D = buildWavePath(
  Array.from({ length: STAGE_COUNT }, (_, i) => ({
    x: i % 2 === 0 ? GUTTER_LEFT : GUTTER_RIGHT,
    y: ((i + 0.5) / STAGE_COUNT) * PATH_HEIGHT,
  })),
);
const JOURNEY_PATH_D_MOBILE = buildWavePath(
  Array.from({ length: STAGE_COUNT }, (_, i) => ({
    x: i % 2 === 0 ? MOBILE_X - MOBILE_WAVER : MOBILE_X + MOBILE_WAVER,
    y: ((i + 0.5) / STAGE_COUNT) * PATH_HEIGHT,
  })),
);

// ---------------------------------------------------------------------
// Background atmosphere — one continuous gradient behind the intro and
// all six scenes, not six coloured rectangles. Stops land roughly on
// each stage's own vertical centre; CSS interpolates smoothly between
// them, so there is never a hard seam. Per the brief: 01/05 warm ivory,
// 02 a faint cool-blue lean, 03 warm sand, 04 a light dusty-rose, 06 a
// subtle BirthWave blue.
// ---------------------------------------------------------------------
const ATMOSPHERE_HUES = [
  "var(--color-paper)",
  "color-mix(in srgb, var(--color-sky) 6%, var(--color-paper))",
  "color-mix(in srgb, var(--color-terracotta) 9%, var(--color-paper-dim))",
  "color-mix(in srgb, var(--color-terracotta) 16%, var(--color-paper))",
  "var(--color-paper)",
  "color-mix(in srgb, var(--color-sky) 7%, var(--color-paper))",
] as const;
const ATMOSPHERE_GRADIENT = `linear-gradient(to bottom, ${ATMOSPHERE_HUES[0]} 0%, ${ATMOSPHERE_HUES.map(
  (hue, i) => `${hue} ${(((i + 0.5) / STAGE_COUNT) * 100).toFixed(1)}%`,
).join(", ")}, ${ATMOSPHERE_HUES[ATMOSPHERE_HUES.length - 1]} 100%)`;

// Direction-aware image reveal: left-image scenes reveal left→right
// (`wipeReveal`, already the site's shared left-to-right wipe — reused,
// not redefined); right-image scenes get the mirrored variant, kept
// local to this file rather than added to image-motion.ts, since it's
// only this section's zig-zag that needs a direction-dependent reveal.
const wipeRevealRtl = {
  hiddenClip: "inset(0 0 0 100%)",
  revealedClip: "inset(0 0 0 0%)",
} as const;

const TITLE_ENTER_PX = 26;
const NUMBER_ENTER_PX = 16;
const EXIT_PX = 16;
const EXIT_MIN_OPACITY = 0.3;

export function JourneySection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const highlightPathRef = useRef<SVGPathElement>(null);
  const mobileBasePathRef = useRef<SVGPathElement>(null);
  const mobileHighlightPathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  // One scroll-scrubbed pass draws the base line and moves a short
  // brand-hued "current position" trace along it — independent of any
  // single scene's own entrance/exit timeline, exactly per the brief's
  // "wave: independent subtle progression." No pin: the trigger just
  // scrubs against the wrapper's own natural (tall, unpinned) scroll
  // distance, the same technique Philosophy already uses for its own
  // path, just not pin-bound this time.
  //
  // Desktop-only (docs/implementation-brief.md §38): this used to drive
  // the mobile left-edge path too (CSS visibility decided which of the
  // two pairs actually animated at a given width) — exactly the
  // scroll-driven path dependency the mobile rework rules out for small
  // screens. The mobile path is "optional" per the brief, not a second
  // instance of the desktop wave's own current-position mechanic, so it
  // stays out of `pairs` entirely now and is never touched here — it
  // renders once, at its plain static stroke, and that's its whole
  // resting state.
  useEffect(() => {
    if (reducedMotion) return;
    const wrapper = wrapperRef.current;
    const pairs = [{ base: basePathRef.current, highlight: highlightPathRef.current }].filter(
      (pair): pair is { base: SVGPathElement; highlight: SVGPathElement } =>
        pair.base !== null && pair.highlight !== null,
    );
    if (!wrapper || pairs.length === 0) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      // Whichever pair is CSS-hidden at mount (the desktop group on a
      // narrow viewport, or vice versa) sits inside a `display:none`
      // ancestor — some browsers report `getTotalLength() === 0` there.
      // Skipped, not animated: its default (no dasharray set) is already
      // a fully solid, fully visible line, a safe do-nothing resting
      // state, and it's off-screen at that viewport anyway.
      const activePairs = pairs
        .map((pair) => ({ ...pair, totalLength: pair.base.getTotalLength() }))
        .filter((pair) => pair.totalLength > 0);
      if (activePairs.length === 0) return;

      for (const { base, highlight, totalLength } of activePairs) {
        base.style.strokeDasharray = `${totalLength}`;
        base.style.strokeDashoffset = `${totalLength}`;
        highlight.style.strokeDasharray = `${HIGHLIGHT_LENGTH} ${totalLength}`;
        highlight.style.strokeDashoffset = `${totalLength}`;
      }

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.8,
        onUpdate: (self) => {
          const index = Math.min(STAGE_COUNT - 1, Math.floor(self.progress * STAGE_COUNT));
          const hue = `var(${STAGE_HUES[index]})`;
          activePairs.forEach(({ base, highlight, totalLength }) => {
            const offset = totalLength - self.progress * totalLength;
            base.style.strokeDashoffset = `${offset}`;
            highlight.style.stroke = hue;
            highlight.style.strokeDashoffset = `${Math.max(offset - HIGHLIGHT_LENGTH, -totalLength)}`;
          });
        },
      });

      return () => trigger.kill();
    }, wrapper);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative isolate overflow-x-clip">
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ backgroundImage: ATMOSPHERE_GRADIENT }} />

      {/* Intro — deliberately brief. Philosophy's own resolution line,
          immediately above this section, already lands "one continuous
          journey of care" as its held closing frame (see philosophy-
          section.tsx — untouched, out of scope for this rebuild); a
          second, visually large restatement of the identical sentence
          directly beneath it read as redundant rather than escalating
          (confirmed by screenshotting the seam between the two sections,
          docs/implementation-brief.md §27), so `journey.heading` stays
          reserved for the section's accessible name only — a real
          heading landmark for assistive tech and search, not a repeat
          fed to sighted visitors seconds after they've just read it.
          Only the eyebrow is visible, immediately followed by stage
          one — the short gap itself is what satisfies "flow directly
          into Preconception." */}
      <div className="container-birthwave relative pt-(--space-section-sm) pb-6 sm:pb-8">
        <h2 id="journey-heading" className="sr-only">
          {journey.heading}
        </h2>
        <p className="eyebrow">{journey.eyebrow}</p>
      </div>

      <div ref={wrapperRef} className="container-birthwave relative pb-[clamp(4rem,3rem+5vw,7rem)]">
        {/* The BirthWave path — one continuous line behind every scene,
            not timeline dots. Masked to a soft fade at both ends so it
            reads as already-in-motion on entry and still-travelling on
            exit, never a hard start/stop. */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${PATH_WIDTH} ${PATH_HEIGHT}`}
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        >
          <defs>
            <linearGradient id="journey-path-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="5%" stopColor="#fff" stopOpacity="1" />
              <stop offset="92%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.4" />
            </linearGradient>
            <mask id="journey-path-mask">
              <rect x="0" y="0" width={PATH_WIDTH} height={PATH_HEIGHT} fill="url(#journey-path-fade)" />
            </mask>
          </defs>
          <g mask="url(#journey-path-mask)">
            {/* Desktop: the full zig-zag path, alternating gutters. */}
            <g className="hidden lg:block">
              <path
                ref={basePathRef}
                d={JOURNEY_PATH_D}
                fill="none"
                stroke={BASE_STROKE}
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                ref={highlightPathRef}
                d={JOURNEY_PATH_D}
                fill="none"
                stroke="var(--color-terracotta)"
                strokeWidth="1.8"
                strokeOpacity="0.9"
                strokeLinecap="round"
              />
            </g>
            {/* Mobile/tablet: a quiet near-straight spine along the left
                edge — "travels vertically along the left side," not
                through the (now single-column) text/image content. */}
            <g className="lg:hidden">
              <path
                ref={mobileBasePathRef}
                d={JOURNEY_PATH_D_MOBILE}
                fill="none"
                stroke={BASE_STROKE}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                ref={mobileHighlightPathRef}
                d={JOURNEY_PATH_D_MOBILE}
                fill="none"
                stroke="var(--color-terracotta)"
                strokeWidth="2.25"
                strokeOpacity="0.9"
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>

        {journey.stages.map((stage, index) => (
          <JourneyScene key={stage.number} index={index} stage={stage} isLast={index === STAGE_COUNT - 1} />
        ))}
      </div>
    </section>
  );
}

function JourneyScene({
  index,
  stage,
  isLast,
}: {
  index: number;
  stage: (typeof journey.stages)[number];
  isLast: boolean;
}) {
  const textLeft = index % 2 === 0; // odd stage numbers (01, 03, 05): text-left / image-right
  const imageOnLeft = !textLeft;
  const isBirth = stage.title === "Birth";
  const reveal = imageOnLeft ? wipeReveal : wipeRevealRtl;

  const sceneRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  // Image parallax: ~5–10% of scroll delta, only once the desktop
  // zig-zag geometry is actually active (≥1024px — see the component's
  // own lg: grid classes below) — below that the layout is already a
  // plain vertical stack, and the brief asks for no motion tricks there
  // beyond a normal reveal.
  const parallaxRef = useParallax<HTMLDivElement>({ factor: 0.08, maxOffsetPx: 34, minViewportWidth: 1024 });

  useEffect(() => {
    if (reducedMotion) return;
    const scene = sceneRef.current;
    const clip = clipRef.current;
    const number = numberRef.current;
    const title = titleRef.current;
    const copy = copyRef.current;
    if (!scene || !clip || !number || !title || !copy) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      gsap.set(clip, { clipPath: reveal.hiddenClip });
      gsap.set(number, { autoAlpha: 0, y: NUMBER_ENTER_PX });
      gsap.set(title, { autoAlpha: 0, y: TITLE_ENTER_PX });
      gsap.set(copy, { autoAlpha: 0, y: TITLE_ENTER_PX });

      // One scrub across the scene's full time in the viewport: the
      // first slice is the entrance (number, then title, then supporting
      // copy — staggered per the brief), a held middle, then a gentle
      // exit drift/fade in the final slice. Image parallax is a separate,
      // always-on mechanism (`useParallax` above), so it keeps drifting
      // through the exit rather than freezing with the text.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: "top 82%",
          end: "bottom 18%",
          scrub: 0.6,
        },
      });

      tl.to(clip, { clipPath: reveal.revealedClip, ease: SIGNATURE_EASE, duration: 0.32 }, 0)
        .to(number, { autoAlpha: 1, y: 0, ease: SIGNATURE_EASE, duration: 0.16 }, 0.02)
        .to(title, { autoAlpha: 1, y: 0, ease: SIGNATURE_EASE, duration: 0.2 }, 0.1)
        .to(copy, { autoAlpha: 1, y: 0, ease: SIGNATURE_EASE, duration: 0.2 }, 0.18)
        .to(
          [number, title, copy],
          { autoAlpha: EXIT_MIN_OPACITY, y: -EXIT_PX, ease: "power1.in", duration: 0.16 },
          0.82,
        );

      return () => tl.scrollTrigger?.kill();
    }, scene);

    return () => ctx.revert();
  }, [reducedMotion, reveal]);

  return (
    <div
      ref={sceneRef}
      className={cx(
        // Desktop min-height 92svh → 86svh (docs/implementation-brief.md
        // §29, within a requested 80–88svh range): a full-page review
        // found some empty space at each stage's own top/bottom once its
        // text+image content settled centered inside 92svh.
        //
        // Mobile rework (§38): the 85svh floor used to apply below `lg`
        // too — on a single-column stage (text block, then image, no
        // side-by-side layout to fill), forcing 85% of the viewport tall
        // regardless of actual content height opened up real empty space
        // above/below short stages (e.g. "Preparation," a one-line
        // headline), confirmed by screenshot, exactly the "huge empty
        // gaps"/"forced height" the brief rules out. Below `lg` the grid
        // now sizes to its own content, with `py-16` (64px, inside the
        // requested 56–88px stage-padding range) doing the spacing work
        // instead of a height floor.
        "relative grid items-center gap-x-6 gap-y-10 py-16 lg:min-h-[86svh] lg:grid-cols-12 lg:gap-x-10 lg:py-0",
        isLast && "pb-[clamp(3rem,2rem+4vw,5rem)]",
      )}
    >
      <div
        className={cx(
          "relative z-10",
          textLeft ? "lg:col-span-5 lg:col-start-1" : "lg:col-span-5 lg:col-start-8",
        )}
      >
        <p ref={numberRef} className="flex items-baseline gap-3">
          <span
            className="font-display text-2xl font-semibold tabular-nums"
            style={{ color: `var(${STAGE_HUES[index]})` }}
          >
            {stage.number}
          </span>
          <span className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 uppercase">
            {stage.title}
          </span>
        </p>

        <h3
          ref={titleRef}
          className={cx(
            "mt-5 leading-[1.1] font-semibold text-ink",
            isBirth
              ? "text-[clamp(2.1rem,1.4rem+2.8vw,3.6rem)]"
              : "text-[clamp(1.9rem,1.3rem+2.3vw,3.1rem)]",
          )}
        >
          {stage.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        <p ref={copyRef} className="mt-6 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">
          {stage.supporting}
        </p>
      </div>

      <div
        className={cx(
          "relative z-10",
          imageOnLeft
            ? "lg:col-span-6 lg:col-start-1 lg:mr-0 lg:ml-[-1.25vw]"
            : "lg:col-span-6 lg:col-start-7 lg:mr-[-1.25vw]",
        )}
      >
        <div
          className={cx(
            // §38: the 26rem (416px) cap used to hold at every width below
            // `lg` — harmless on phones (content columns there are already
            // narrower than 416px, so it never actually binds), but at
            // tablet widths (the container column comfortably exceeds
            // 416px) it left the image visibly smaller than its own text
            // block above, with wide empty gutters either side — not the
            // "full-width or ~92–100% of content width" the brief asks
            // for. `md:max-w-none` drops the cap starting exactly at the
            // 768px tablet breakpoint this rework is reviewed at.
            "relative mx-auto aspect-[1122/1402] w-full max-w-[26rem] overflow-hidden md:max-w-none lg:mx-0",
            imageOnLeft
              ? "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs"
              : "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs",
            isBirth && (imageOnLeft ? "lg:origin-top-left lg:scale-[1.06]" : "lg:origin-top-right lg:scale-[1.06]"),
          )}
        >
          {/* The parallax layer is oversized equally on every side
              (`-inset-[6%]`, not just top/bottom) so its own aspect ratio
              still matches the source photograph's exactly — oversizing
              only vertically (an earlier version of this file did) makes
              the box proportionally taller than the image, which forces
              `object-cover` to crop the *sides* to compensate, clipping
              subjects standing near either edge (confirmed against the
              real photos: Preconception and Baby both have a person's
              head close to one side). Equal oversize means `object-cover`
              never has to crop anything beyond what the translateY
              parallax itself reveals at its extremes. */}
          <div ref={parallaxRef} style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }} className="absolute -inset-[6%]">
            <div ref={clipRef} className="absolute inset-0 overflow-hidden">
              <Image
                src={stage.image}
                alt={stage.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 88vw"
                className="object-cover"
                style={{ objectPosition: stage.objectPosition }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
