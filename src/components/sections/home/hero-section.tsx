"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { hero, brand } from "@/content/site-content";
import { CtaLink } from "@/components/ui/cta-link";
import { useParallax, useExitDrift, useHandoffProgress, heroBackgroundParallax } from "@/motion/image-motion";
import { useReducedMotion } from "@/motion/reduced-motion";

// Hero's own bottom-edge dissolve into paper tone — unchanged from before
// this rework, and no longer scroll-scripted: it was already a static,
// always-on resting-state visual on mobile; it's now that same static
// visual at every breakpoint, since there's no more desktop-only scrub
// branch to animate it. Local to this file (not `section-transitions.ts`'s
// shared `emergenceBand`, which Immersive/Final CTA use and this rework
// doesn't touch).
const HERO_DISSOLVE_GRADIENT = [
  "radial-gradient(38% 70% at 18% 100%, color-mix(in srgb, var(--color-paper) 94%, transparent) 0%, transparent 72%)",
  "radial-gradient(46% 85% at 58% 100%, color-mix(in srgb, var(--color-paper) 97%, transparent) 0%, transparent 78%)",
  "radial-gradient(34% 62% at 86% 100%, color-mix(in srgb, var(--color-paper) 92%, transparent) 0%, transparent 68%)",
  "linear-gradient(to top, color-mix(in srgb, var(--color-paper) 96%, transparent) 0%, transparent 100%)",
].join(", ");

// The static wave/fabric boundary SVG that used to live here (an
// authored curve at Hero's own bottom edge) is retired as of the
// "moving reveal" pass: confirmed via screenshot as the actual cause of
// the reported "straight horizontal image boundary" — Philosophy's own
// new travelling wave mask (philosophy-section.tsx) now paints INTO this
// same overlap zone, and Hero's static wave, still opaque and unchanged,
// was showing through the transparent parts of that mask as a second,
// conflicting curve — the exact "seam" the new reveal was built to
// remove, not reproduce alongside it. One curved, moving boundary now
// carries the whole "wave/fabric transition at the seam" idea that two
// static-plus-dynamic curves were fighting over.

/** Shared with philosophy-section.tsx's own `useHandoffProgress` call —
 * both sides measure the same real scroll distance so the two settle in
 * step, even though each reads its own section's own edge. */
const HANDOFF_RANGE_PX = 240;

/** Px of upward drift Hero's own background settles into by the time the
 * handoff completes — deliberately smaller than Philosophy's own
 * `INCOMING_TRANSLATE_PX` (26), so the outgoing media moves slightly
 * slower than the incoming media: a restrained depth cue during the
 * handoff, not a redesign of Hero's own (untouched) resting parallax. */
const OUTGOING_TRANSLATE_PX = 12;

/**
 * Hero — preserved initial layout, media, branding and copy throughout.
 *
 * Rebuilt (homepage hero→Philosophy transition rework): the previous pass
 * gave Hero its own dedicated sticky "exit stage" — an extra ~25vh of
 * reserved scroll distance (`hero-transition.ts`'s `TRACK_VH`, now
 * deleted) purely to scrub the video, fade the copy in phases, and drive
 * an animated fabric veil — on top of the ~100vh a `position: sticky`
 * element unavoidably takes to physically clear the viewport once
 * released. Visitors scrolled through that whole reserved interval before
 * Philosophy's own wording ever appeared, confirmed on screenshot as
 * exactly the reported problem: an empty or logo-only stretch between
 * Hero and Philosophy's wording. Removing the sticky stage, the scrub
 * progress source, and the phase-based fades removes that reserved
 * interval structurally — Hero is a normal, non-pinned, content-driven
 * `min-h-dvh` section in plain document flow, at every breakpoint, and
 * Philosophy begins immediately after it with no gap.
 *
 * The video now simply plays (same unconditional, hydration-safe
 * `<video>` element as before — only whether it's *playing* is ever
 * decided imperatively). Its own background layer keeps the same subtle
 * `useParallax` drift Hero had before this rework (unrelated to the
 * removed sticky/scrub system — a small, symmetric, scroll-position-based
 * translateY, same as Journey's and Care's images already use).
 *
 * The text column's only remaining scroll-linked behavior is
 * `useExitDrift` — a small, existing, already-shared utility
 * (image-motion.ts) that drifts/dims a section's own content as it
 * scrolls *past* the top of the viewport, floored well short of fully
 * transparent. Its own progress only reaches that floor once Hero has
 * scrolled a full section-height past the viewport top — i.e. once Hero
 * is already off-screen — so the copy stays fully readable for the whole
 * time it's actually on screen, and never fades out "long before
 * Philosophy arrives." Off entirely below 768px and under reduced motion
 * (the hook's own defaults), matching this component's other motion.
 */
export function HeroSection() {
  const bgRef = useParallax<HTMLDivElement>(heroBackgroundParallax);
  const outgoingRef = useHandoffProgress<HTMLDivElement>({
    edge: "bottom",
    rangePx: HANDOFF_RANGE_PX,
    maxTranslatePx: OUTGOING_TRANSLATE_PX,
  });
  const heroContentRef = useExitDrift<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (reducedMotion) {
      el.pause();
      return;
    }
    el.play().catch(() => {});
    return () => {
      el.pause();
    };
  }, [reducedMotion]);

  return (
    <section id="hero-section" aria-label="Introduction" className="relative isolate bg-paper-dim">
      <div className="relative flex min-h-dvh items-center overflow-hidden">
        <div
          ref={bgRef}
          style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
          className="absolute inset-0 scale-110"
        >
          {/* A second, small translate nested inside the existing
              parallax wrapper — composes naturally via normal transform
              stacking, no calc() needed. `--handoff-y` only moves once
              the visitor has started scrolling into Philosophy (0 at
              rest, see useHandoffProgress); at scrollY 0 this is 0px, so
              Hero's own initial appearance is unchanged. The existing
              `scale-110` overscan already budgets well more room than
              this small a shift needs, so no new edge exposure risk. */}
          <div ref={outgoingRef} style={{ transform: "translate3d(0, var(--handoff-y, 0px), 0)" }} className="h-full w-full">
            {/* Unconditional — identical markup on the server and on the
                client's first render, every time (hydration-safe: only
                whether it's *playing* is ever decided imperatively). At
                rest this simply shows its `poster` frame. */}
            <video
              ref={videoRef}
              aria-hidden="true"
              muted
              loop
              playsInline
              // Scroll-video smoothness audit: `preload="metadata"` only
              // fetches container/duration info, not actual video data —
              // for a video that starts playing immediately on page load
              // (see the effect below), that left the very first play()
              // call racing the browser's own on-demand buffering, a
              // plausible real source of an early stutter distinct from
              // anything scroll-related (this video is never scroll-linked
              // at all — see this component's own top comment). `auto`
              // matches what about-cinematic-canvas.tsx's own video already
              // uses for the same reason.
              preload="auto"
              poster={hero.media.posterSrc}
              disablePictureInPicture
              disableRemotePlayback
              className="h-full w-full object-cover"
            >
              <source src={hero.media.videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Scrim behind the text column — guarantees AA contrast
            against the video regardless of which frame is showing. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full max-w-2xl bg-[linear-gradient(90deg,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_78%,transparent)_60%,transparent_100%)]"
        />

        {/* Hero's own bottom-edge dissolve into paper tone — static at
            every breakpoint now (see the constant's own comment). */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[46svh]"
          style={{ backgroundImage: HERO_DISSOLVE_GRADIENT }}
        />

        <div
          ref={heroContentRef}
          style={{ transform: "translate3d(0, var(--exit-y, 0px), 0)", opacity: "var(--exit-opacity, 1)" }}
          className="container-birthwave relative z-10 [padding-block:var(--header-height)]"
        >
          <div className="motion-rise-in max-w-lg">
            <Image
              src={brand.logo.wordmarkMauve}
              alt={brand.logo.alt}
              width={320}
              height={157}
              priority
              className="h-auto w-[88px] sm:w-[114px] lg:w-[152px]"
            />

            <p className="eyebrow mt-6">{hero.eyebrow}</p>

            <h1 className="mt-3 text-balance text-[clamp(2.05rem,1.75rem+2vw,2.75rem)] sm:text-3xl">
              <span className="block font-medium text-ink-soft">{hero.headlineLead}</span>
              <span className="block font-bold text-ink">{hero.headlineEmphasis}</span>
            </h1>

            <div>
              <p className="mt-5 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                {hero.subhead}
              </p>

              <div className="mt-8">
                <CtaLink href={hero.primaryCta.href}>{hero.primaryCta.label}</CtaLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
