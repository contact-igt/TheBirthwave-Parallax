"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { immersive, philosophy } from "@/content/site-content";
import { useReducedMotion } from "@/motion/reduced-motion";
import { emergenceBand, immersiveEmergence } from "@/motion/section-transitions";
import {
  ensureScrollTriggerRegistered,
  gsap,
  DESKTOP_QUERY,
  SIGNATURE_EASE,
} from "@/motion/gsap-scroll";

// Inactive-line opacity (docs/implementation-brief.md §34 — was 0.14,
// within the brief's own "not 10–15%" complaint; now inside the
// requested 28–40%): a static screenshot mid-sequence should still read
// as understandable, not just show one bright line among near-invisible
// ones.
const INACTIVE_OPACITY = 0.32;

/**
 * Immersive — the dark emotional scene, positioned as the emotional pause
 * between Journey and Care & Trust. Copy is approved, given verbatim: two
 * short lines resolving into the same closing line Philosophy resolves
 * into (`philosophy.resolution`, reused rather than re-typed, so the two
 * can't drift apart by accident) — not a testimonial, no quotation marks,
 * no attribution.
 *
 * Three depth planes, same pinned timeline (docs/implementation-brief.md
 * §30 added the second — an actual emotional photograph, on top of the
 * one purely atmospheric plane §28 had already established; a fourth,
 * the brand mark rendered large and centred over the video, was removed
 * again after review — it read as a stray watermark sitting in the way
 * of the footage rather than atmosphere, and the scene doesn't need it):
 * 1. Background atmosphere — the fabric photograph (`immersive.media`),
 *    full-bleed, low-contrast, read as depth and texture rather than a
 *    recognisable image, drifting the least. Its own opacity dropped in
 *    §39 (0.4 → 0.14) once the real video below it made "the section's
 *    only background imagery" no longer its job — see that note further
 *    down.
 * 2. Emotional video (§37: `immersive.secondaryMedia`, two hands held
 *    together) — §39 made this a TRUE FULL-BLEED SECTION BACKGROUND, at
 *    every width, replacing the earlier "confined to a masked right-side
 *    strip on desktop, a separate compact block on mobile" treatment.
 *    One `<video>`, `absolute inset-0 h-full w-full object-cover`, the
 *    first thing painted after the base ink gradient — the atmosphere
 *    layers that used to be the section's only imagery (fabric texture,
 *    coral light field) now sit *in front of* it instead, doing exactly
 *    what the brief calls "only enough dark/warm scrim for readability":
 *    no separate overlay was invented for this, those already-warm,
 *    already-restrained layers simply became it.
 * 3. Text + coral light field — the foreground, unchanged in position by
 *    §39: left/left-centre on desktop, full-width and centred below
 *    `lg`, each line in its own curated position. The coral light field
 *    drifts the most of any plane — one soft, heavily-blurred field,
 *    never a hard gradient or a glow/blob: it moves lower-left → centre
 *    → lower-right over the scroll, read as changing light, not a UI
 *    effect.
 *
 * Entry/exit are unchanged: broad paper-tinted gradient bands
 * (`emergenceBand`) at the top and bottom, so the dark surface still
 * reads as emerging from and receding into the page, never a hard cut —
 * see docs/implementation-brief.md §29 for the pin-timing fix that keeps
 * that transition from reading as a dead zone in a static capture.
 *
 * Mobile (§39): normal vertical flow (no pin, no forced height, §38),
 * text overlaying the same full-bleed video background as desktop — not
 * a separate, compact, below-the-text media block anymore. Object-
 * position is chosen per breakpoint (the video's own subject sits
 * right-of-frame; centered enough not to crop out of a narrow portrait
 * viewport, without pulling so far left it fights the desktop framing).
 *
 * §37: `immersive.secondaryMedia` is a video (`/brand/dark.mp4`, found
 * during that pass — not the .jpg an earlier brief assumed). Same
 * unconditional-element, imperative-play pattern Hero's own video
 * already uses (hero-section.tsx, §26): identical markup on every
 * render, autoplay only ever started in an effect, never branched on
 * `reducedMotion` (the exact hydration mismatch fixed there). Reduced
 * motion: the video stays paused, showing its own `poster` frame — a
 * real still extracted from the clip, not a separate asset — so
 * "reduced motion" and "static image" are the same resting state.
 */
export function ImmersiveSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoVideoRef = useRef<HTMLVideoElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const resolutionRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  // Emotional video playback (docs/implementation-brief.md §37) — its own
  // small effect, separate from the scroll-driven timeline below,
  // mirroring exactly how Hero's own video play/pause is wired. One
  // element now (§39 removed the separate mobile-only video that used to
  // need this list — the same full-bleed background plays at every
  // width), but kept as a small standalone effect rather than folded
  // into the pin effect below, since it must run regardless of
  // `DESKTOP_QUERY`.
  useEffect(() => {
    const el = photoVideoRef.current;
    if (!el) return;
    if (reducedMotion) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
  }, [reducedMotion]);

  useEffect(() => {
    const lightEl = lightRef.current;
    if (!lightEl) return;

    if (reducedMotion) {
      // Mobile/reduced-motion still keeps the light field's own gentle
      // drift ("DARK SECTION: normal vertical scene with light parallax
      // only", per the brief) — a plain scroll-tied transform, not a
      // pin, and skipped entirely under reduced motion specifically
      // (prefers-reduced-motion) rather than only at the mobile
      // breakpoint, since reduced motion is the stronger constraint.
      lightEl.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const pinEl = pinRef.current;
    const fabricEl = fabricRef.current;
    const photoEl = photoRef.current;
    if (!pinEl || !fabricEl || !photoEl) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_QUERY, () => {
        const messages = messageRefs.current.filter(
          (el): el is HTMLParagraphElement => el !== null,
        );
        const resolutionEl = resolutionRef.current;
        if (!resolutionEl) return;
        const beats = [...messages, resolutionEl];

        gsap.set(beats.slice(1), { autoAlpha: INACTIVE_OPACITY, y: -10, scale: 0.96 });
        gsap.set(beats[0], { autoAlpha: 1, y: 0, scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            // 135% → 70% (docs/implementation-brief.md §29 — see that
            // entry for the root-cause investigation behind this number):
            // a GSAP pin reserves its *entire* scroll distance as document
            // height via a pin-spacer, but that reserved distance only
            // visually fills during a live, incremental scroll — GSAP
            // toggles the pinned frame to `position:fixed` per real
            // scroll tick. Any render that doesn't process real scroll
            // events (a full-page screenshot, print/PDF export, a
            // crawler) shows the pinned frame at its own short natural
            // resting height, with the *rest* of the reserved distance —
            // here, the 135% beyond that natural height — as genuinely
            // blank. Confirmed by reproducing it directly: a real
            // scroll-through shows zero gap; a naive full-page capture
            // of the same build showed roughly a full viewport of blank
            // space between this scene and Care. Two changes shrink that
            // reserved-but-unfilled distance rather than hiding it:
            // this shorter `end` (only 2 transitions here — Philosophy's
            // 125%/3-transition cut, done separately for pacing, is a
            // comparable per-beat rate), and the pinned frame's own
            // natural height below, raised from 85vh to a full svh.
            // +=70% → +=45% (pacing fix): confirmed against a screen
            // recording that the previous distance, combined with the
            // 55%-to-100% hold below, left the scene visibly frozen for
            // several real seconds before Care arrived in a rush — three
            // captured frames roughly 2.5s apart during that hold were
            // pixel-identical (all three lines already settled, nothing
            // moving). Shortening the reserved distance itself, not just
            // the hold fraction, is what actually removes that dead time
            // from the page rather than just relabeling it.
            end: "+=45%",
            // 1 → 0.45 (pacing fix, paired with the shorter `end` above):
            // a `scrub` value is a real smoothing *time*, not a fraction —
            // it keeps interpolating toward the scrollbar's target for up
            // to that many seconds after scrolling stops or the pinned
            // range's own end is reached. A fast scroll/fling can cross a
            // short pinned distance in well under a second, so with the
            // previous scrub:1 the *pin* (driven by raw scroll position)
            // could release before the *timeline* (still smoothing toward
            // its target) had actually reached its final, settled state —
            // confirmed on the same recording: the frame immediately after
            // release showed this section's own text still overlapping
            // Care's incoming heading, not a clean handoff. Dropping scrub
            // well below the shortened end distance's own real-time scroll
            // budget lets the timeline catch up inside a normal scroll
            // instead of trailing past release.
            scrub: 0.45,
            pin: pinEl,
            anticipatePin: 1,
          },
        });

        // Retimed twice now. The first retiming (homepage motion-
        // coherence pass) fixed a version with no reading holds at all;
        // this pass fixes what that one over-corrected into — matching
        // the shorter `end` above, the resolution's own hold used to run
        // 55–100%, a full 45% of the timeline (and, at the old 70%
        // pinned distance, several real seconds) doing nothing. Message
        // progression now runs across most of the timeline instead of
        // stopping halfway through it: beat 0 holds 0–18%, transitions to
        // beat 1 across 18–34%, beat 1 gets its own brief hold (34–55%),
        // then hands off to the resolution across 55–85% — a deliberately
        // longer transition for the section's own closing statement, the
        // same relative weighting the previous version already gave it.
        // Only 85–100% (15% of the timeline, and of the now-shorter
        // pinned distance) is left as a genuine final hold — enough to
        // read the resolution and, together with the reduced `scrub`
        // above, enough real scroll distance for the timeline to have
        // fully caught up before the pin releases, without reviving the
        // original dead stretch. `.set(beats[2], ..., 1)` still anchors
        // the timeline's own natural duration at exactly 1, for the same
        // reason noted on this file's earlier passes and on Philosophy's
        // sibling timeline: GSAP derives duration from the last child
        // tween's own end otherwise, which would silently rescale every
        // fraction above.
        tl.to(beats[0], { autoAlpha: INACTIVE_OPACITY, y: -10, scale: 0.96, ease: SIGNATURE_EASE, duration: 0.16 }, 0.18)
          .to(beats[1], { autoAlpha: 1, y: 0, scale: 1, ease: SIGNATURE_EASE, duration: 0.16 }, 0.18)
          .to(beats[1], { autoAlpha: INACTIVE_OPACITY, y: -10, scale: 0.96, ease: SIGNATURE_EASE, duration: 0.3 }, 0.55)
          .to(beats[2], { autoAlpha: 1, y: 0, scale: 1, ease: SIGNATURE_EASE, duration: 0.3 }, 0.55)
          .set(beats[2], { autoAlpha: 1, y: 0, scale: 1 }, 1);

        // Background fabric texture: a small, near-static drift — kept
        // minimal so it never competes with the words, spanning the
        // timeline's own full 0→1 range (rescaled from the old
        // `beats.length - 1` unit system to match the fractional one
        // above).
        tl.fromTo(fabricEl, { y: -10 }, { y: 10, ease: "none", duration: 1 }, 0);

        // Emotional photo (docs/implementation-brief.md §30): a slow,
        // restrained drift — more than the mark and background texture
        // behind it (it's meant to read as a real, present photograph,
        // not texture), still well short of the light field's own
        // motion, and nowhere near a "dramatic slide." Desktop-only,
        // matching where it's actually visible.
        tl.fromTo(photoEl, { y: -14 }, { y: 14, ease: "none", duration: 1 }, 0);

        // Coral light field: fastest plane, and the only one that moves
        // in two dimensions — lower-left → centre → lower-right, in two
        // legs so it reads as travelling light rather than a straight
        // diagonal slide.
        tl.fromTo(
          lightEl,
          { xPercent: -18, yPercent: 14 },
          { xPercent: 0, yPercent: -6, ease: "sine.inOut", duration: 0.5 },
          0,
        ).to(lightEl, { xPercent: 18, yPercent: 10, ease: "sine.inOut", duration: 0.5 }, 0.5);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section aria-label={immersive.eyebrow} className="relative isolate">
      <div ref={wrapperRef} className="relative">
        <div
          ref={pinRef}
          // 92svh → 88svh (docs/implementation-brief.md §34, within the
          // requested 82–92svh — "do not make this section taller than
          // necessary"). The §29/§32 reasoning this comment used to
          // describe (a tall natural height closes the gap against the
          // pin's reserved distance, keeping a static capture from
          // showing blank space) still holds; this just settles a
          // little further into the requested range rather than sitting
          // at its very top edge.
          //
          // `min-[769px]:min-h-[88svh]` (docs/implementation-brief.md
          // §38, breakpoint corrected in the homepage motion-coherence
          // pass): the floor used to apply below `lg` (1024px) too, even
          // though the pin effect above only ever engages at
          // `DESKTOP_QUERY` (769px+) — on a narrower viewport this left a
          // tall, mostly-empty dark panel with the (already well-padded,
          // see the text column's own `py-(--space-section)` below)
          // content just centered inside it, confirmed by screenshot as
          // exactly the "large blank dark space" the brief rules out.
          // The breakpoint itself was still wrong after that fix, just in
          // the other direction: `lg` (1024px) doesn't match
          // `DESKTOP_QUERY` (769px), so anywhere from 769–1023px wide the
          // JS pin engaged against a pinEl with *no* height floor at all
          // — pinning whatever short, content-sized box it happened to
          // be for the same `+=70%` scroll distance, a real JS-pin-
          // breakpoint/CSS-stage-sizing mismatch. `min-[769px]:` (an
          // arbitrary Tailwind breakpoint, not a named one — matches the
          // same technique this codebase already uses elsewhere to keep a
          // literal Tailwind class in sync with a JS constant by hand)
          // makes the two agree exactly.
          className="relative isolate flex w-full items-center justify-center overflow-hidden bg-ink min-[769px]:min-h-[88svh]"
        >
          {/* Base tone — deep warm BirthWave brown, unchanged. */}
          <div className="absolute inset-0 bg-[linear-gradient(200deg,var(--color-ink)_0%,var(--color-terracotta-deep)_45%,var(--color-coral)_100%)]" />

          {/* Emotional video layer (docs/implementation-brief.md §30, now
              video — §37: a real clip of two hands held together, found
              at `/brand/dark.mp4`) — §39: a TRUE FULL-BLEED SECTION
              BACKGROUND at every width, painted first (directly on top
              of the base ink tone), not a masked right-side strip on
              desktop with a separate compact block below the copy on
              mobile. The fabric texture, brand mark and coral light
              field below (in DOM order — so visually *in front of* this
              layer) are what now does the "only enough dark/warm scrim
              for readability" work: already-warm, already-restrained
              atmosphere layers, not a purpose-built overlay invented for
              this pass. Its own warm directional wash (the second child
              below) is unchanged from §34/§37 — tuned for a strip, it
              still reads correctly stretched across the full width: dark
              at the left edge where the text column sits, lighter
              through the middle, a soft coral tint at the right.
              `brightness`/`saturate` darken the clip enough to sit in
              this dark scene without reading brighter than the rest of
              it, short of obscuring the subject — dialled back from an
              initial 0.7/0.85 (docs/implementation-brief.md §34's own
              values, tuned for a small right-side strip) once stacked
              with the warm wash below and the section's other overlays
              read as smothering the footage entirely rather than
              "clearly visible," confirmed by screenshot. `object-
              position` is set per breakpoint — the clip's own subject
              sits right-of-frame, so mobile (now the full portrait
              viewport, not a partial strip) pulls in further to keep the
              subject on-frame; desktop keeps the original framing.
              `lg:scale-125` is overscan for the pin effect's own subtle
              drift below — unneeded on mobile, which never runs that
              effect (gated to `DESKTOP_QUERY`). Never a card: no border,
              no shadow, no radius. `aria-hidden` on the `<video>` itself:
              it has no `alt`, and a silent, muted, looping clip is
              decorative the same way Hero's own video already is — the
              copy carries the meaning. */}
          <div ref={photoRef} className="absolute inset-0 overflow-hidden">
            <video
              ref={photoVideoRef}
              aria-hidden="true"
              muted
              loop
              playsInline
              preload="metadata"
              poster={immersive.secondaryMedia.posterSrc}
              disablePictureInPicture
              disableRemotePlayback
              className="absolute inset-0 h-full w-full scale-115 object-cover object-[78%_62%] brightness-[0.85] saturate-[0.95] lg:scale-125 lg:object-[72%_45%]"
            >
              <source src={immersive.secondaryMedia.videoSrc} type="video/mp4" />
            </video>
            {/* Warm directional wash — ink/terracotta-deep percentages
                halved from §34's original 35%/25% (docs/implementation-
                brief.md §39): tuned for a strip that only ever covered
                the right ~60% of the section, this same gradient now
                stretches across the *entire* width, so its 0%-edge
                strength was landing at full force right behind the text
                column instead of at a strip's own outer edge — confirmed
                by screenshot as a second layer of darkening stacked on
                top of the video's own filter and the radial scrim below,
                well past "only enough... for readability." */}
            <div className="absolute inset-0 bg-[linear-gradient(200deg,color-mix(in_srgb,var(--color-ink)_18%,transparent)_0%,transparent_55%,color-mix(in_srgb,var(--color-terracotta-deep)_14%,transparent)_100%)] mix-blend-multiply" />
          </div>

          {/* Background plane (docs/implementation-brief.md §28): the
              approved fabric photograph, full-bleed and deep-cropped.
              Two earlier passes both read wrong on screenshot, not
              assumption: opacity 0.55 was a literal, fairly graphic
              photograph competing with the message; dropping to 0.16
              with `mix-blend-screen` still left its rim-lit fold lines
              sharp enough to trace as a wavy line — uncomfortably close
              to the "ECG/sine-graph" look this site's own Journey brief
              explicitly rules out elsewhere. Fixed by dropping the
              screen blend (it was amplifying exactly those bright edges)
              in favour of a plain low-opacity layer with real blur, so
              the fabric's own fold lines soften into a diffuse glow
              rather than tracing as strokes — "moving light and depth,"
              not a recognisable shape.

              0.4 → 0.14 (docs/implementation-brief.md §39): tuned when
              this was the section's only background imagery, sitting
              directly on the plain ink gradient. Now that the real video
              paints first underneath it, 0.4 of blurred second photo
              read as fog smothering the footage — confirmed by
              screenshot, direct contradiction of "clearly visible" full-
              bleed video. Lowered to a warm tint the video still reads
              clearly through, rather than removed outright: it's still
              doing real work broadening the espresso base tone evenly
              across the whole section, which the video's own single
              fixed crop doesn't. */}
          <div
            ref={fabricRef}
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.14] blur-2xl"
          >
            <Image
              src={immersive.media.src}
              alt={immersive.media.alt}
              fill
              sizes="100vw"
              className="scale-150 object-cover object-[55%_50%]"
            />
          </div>

          {/* Foreground plane: one soft, heavily-blurred coral light
              field — restrained on purpose (no hard gradient edge, no
              glow/blob, no neon) so it reads as changing light drifting
              through the scene, not a UI effect. */}
          <div
            ref={lightRef}
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.16] blur-3xl"
            style={{
              backgroundImage:
                "radial-gradient(circle, color-mix(in srgb, var(--color-coral) 70%, transparent) 0%, transparent 68%)",
            }}
          />

          {/* Scrim: darkens the center so the statement holds contrast
              regardless of the light field's own position. 55% → 38%
              (docs/implementation-brief.md §39): this was tuned to sit
              on top of a plain gradient background — now that the real
              video sits underneath everything (its own filter and the
              warm wash above it already contributing real darkening of
              their own), 55% here on top of both was the last of three
              stacked layers pushing the footage well past "only enough
              scrim for readability," confirmed by screenshot. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_srgb,var(--color-ink)_38%,transparent)_0%,transparent_75%)]"
          />

          {/* Emergence bands — the dark surface fades from/to the ambient
              paper tone at each edge instead of starting as a hard block. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-(--space-fade-final)"
            style={{ backgroundImage: emergenceBand.fromPaper(immersiveEmergence.top) }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-(--space-fade-final)"
            style={{ backgroundImage: emergenceBand.toPaper(immersiveEmergence.bottom) }}
          />

          {/* Text column: below `lg`, full-width, eyebrow and resolution
              centred, overlaying the full-bleed video background (§39)
              directly — no narrower column needed there since the video
              is no longer confined to one side. At `lg`+, the column
              caps at roughly half the container, unchanged from before
              this pass, so the composition still reads as text on the
              left with the video's own right-of-frame subject visible
              on the right, even though the video itself now extends
              underneath the text column too rather than stopping at its
              edge. */}
          <div className="container-birthwave relative z-10 py-(--space-section)">
            <div className="lg:max-w-[52%]">
              <p className="text-center font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-coral uppercase lg:text-left">
                {immersive.eyebrow}
              </p>

              <div className="relative mt-10 flex flex-col gap-10 sm:mt-14 sm:gap-14">
                <p
                  ref={(el) => {
                    messageRefs.current[0] = el;
                  }}
                  className="mr-auto max-w-xl text-left text-[clamp(1.5rem,1rem+2.2vw,2.75rem)] leading-[1.2] font-semibold text-paper"
                >
                  {immersive.messages[0]}
                </p>
                <p
                  ref={(el) => {
                    messageRefs.current[1] = el;
                  }}
                  className="mx-auto ml-[14vw] max-w-xl text-left text-[clamp(1.5rem,1rem+2.2vw,2.75rem)] leading-[1.2] font-semibold text-paper sm:ml-[22vw] lg:mx-0 lg:ml-[8%] lg:max-w-md"
                >
                  {immersive.messages[1]}
                </p>
                <p
                  ref={resolutionRef}
                  className="mx-auto max-w-3xl text-center text-[clamp(1.75rem,1.1rem+2.8vw,3.5rem)] leading-[1.15] font-semibold tracking-[var(--tracking-wide)] text-paper uppercase lg:mx-0 lg:max-w-lg lg:text-left"
                >
                  {philosophy.resolution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
