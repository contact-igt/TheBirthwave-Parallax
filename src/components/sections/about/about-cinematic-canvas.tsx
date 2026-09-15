"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  aboutHero,
  aboutProblem,
  aboutBelief,
  aboutFounderIntro,
  aboutCinematicSequence,
  aboutCinematicVideo,
} from "@/content/about-content";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap, SIGNATURE_EASE } from "@/motion/gsap-scroll";
import { ABOUT_TRACK_VH, ABOUT_DESKTOP_QUERY, ABOUT_BEAT_PHASES, mapAboutProgressToVideoTime } from "@/motion/about-cinematic";

/**
 * Sections 01–04 — the final desktop cinematic scroll-video system
 * (Phase 4). Visual composition (asymmetric per-beat placement, the
 * per-beat `Scrim`, the numeral chapter rail) is the already-approved
 * Phase 3 visual architecture, unchanged in kind — this pass replaces
 * Phase 3's static placeholder atmosphere with the real ~30s cinematic
 * clip (`aboutCinematicVideo.src`) and adds the scroll-driven progression
 * that placeholder was always standing in for. Two Belief/Founder/Problem
 * text positions were nudged (documented at each one below) after
 * checking the real footage's actual face/hand positions frame-by-frame —
 * a placeholder gradient has no faces to avoid; real footage does.
 *
 * ONE progress owner: a single `gsap.timeline` with one `ScrollTrigger`
 * (`trigger` = the outer track, `start: "top top"`, `end: "bottom bottom"`,
 * `scrub: 1`) drives both the four beats' opacity/y tweens (as ordinary
 * GSAP tweens on that one timeline) and, via that same ScrollTrigger's
 * own `onUpdate`, the target video time. No second ScrollTrigger, no
 * separate rAF loop computing its own scroll percentage. The only other
 * per-frame loop is a `gsap.ticker` tick that exponentially smooths
 * `video.currentTime` toward that one target — isolated to seeking only,
 * per the brief, the same tau=8 exponential-interpolation-with-snap
 * pattern the (now-deleted) homepage `hero-transition.ts` used for
 * exactly this kind of smoothed scroll-to-video mapping.
 *
 * Desktop (`lg:` and up, motion allowed — `AboutCinematicCanvasDesktop`):
 * one `320svh` outer track, one `position: sticky` `100svh` visual stage,
 * one `<video>` inside it. No pin (GSAP's own `pin` option is never used
 * here — the sticky stage is plain CSS, matching hero-section.tsx's own
 * sticky mechanics elsewhere on the site), so the ScrollTrigger's only
 * job is computing progress, never managing layout.
 *
 * Everywhere else (below `lg`, OR `prefers-reduced-motion: reduce` at any
 * width — `AboutCinematicCanvasStatic`): no video element renders at all,
 * no track height, no sticky stage. The same four beats stack in normal
 * document flow, each backed by a real extracted poster frame from this
 * same clip (not a placeholder gradient anymore) — this is also what a
 * fresh visitor's very first paint shows before the desktop video's own
 * metadata loads (native `poster` attribute), and it's the entire
 * experience for anyone with `prefers-reduced-motion: reduce`.
 *
 * Both subtrees are always in the DOM — visibility is pure CSS
 * (`hidden motion-safe:lg:block` / `motion-safe:lg:hidden`), never a JS
 * conditional branch on `reducedMotion` or viewport width, so there is no
 * hydration mismatch: `prefers-reduced-motion` is a media query the
 * browser evaluates identically on the server-rendered markup and the
 * client's first paint (the same reasoning `useReducedMotion`'s own
 * `getServerSnapshot` and this codebase's other `motion-safe:`-gated
 * sections already rely on).
 */

const BEATS = [
  { key: "hero", cinematicId: "about-hero" },
  { key: "problem", cinematicId: "about-problem" },
  { key: "belief", cinematicId: "about-belief" },
  { key: "founder-intro", cinematicId: "about-founder-intro" },
] as const;

export function AboutCinematicCanvas() {
  return (
    <section aria-label="About BirthWave — origin story" data-about-scene="cinematic" className="relative isolate bg-paper">
      <div className="hidden motion-safe:lg:block">
        <AboutCinematicCanvasDesktop />
      </div>
      <div className="motion-safe:lg:hidden">
        <AboutCinematicCanvasStatic />
      </div>
    </section>
  );
}

function AboutCinematicCanvasDesktop() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const heroBeatRef = useRef<HTMLDivElement>(null);
  const problemBeatRef = useRef<HTMLDivElement>(null);
  const beliefBeatRef = useRef<HTMLDivElement>(null);
  const founderBeatRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Real duration only — never assumed. The reported export runs 30.016s,
  // not exactly 30.000s; `mapAboutProgressToVideoTime` scales its own
  // approximate-source breakpoints against whatever this actually reports.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const readDuration = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
    };
    readDuration();
    video.addEventListener("loadedmetadata", readDuration);
    return () => video.removeEventListener("loadedmetadata", readDuration);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track) return;

    // Never the main experience — scroll drives `currentTime`, not
    // autoplay. Defensive: no `autoplay` attribute exists on the element
    // either, so this only guards against a browser starting inline
    // playback on its own.
    video.pause();

    if (reducedMotion) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(ABOUT_DESKTOP_QUERY, () => {
        const heroBeat = heroBeatRef.current;
        const problemBeat = problemBeatRef.current;
        const beliefBeat = beliefBeatRef.current;
        const founderBeat = founderBeatRef.current;
        if (!heroBeat || !problemBeat || !beliefBeat || !founderBeat) return;

        // Hero starts already visible (autoAlpha 1), not faded in from 0:
        // progress 0 is the section's own resting arrival state (a fresh
        // page load lands exactly there, before any scroll), and fading
        // the page's one <h1> in from nothing would read as a blank
        // opening frame — the same reasoning philosophy-section.tsx's own
        // opening beat was built around. Its own clean exit (per the
        // brief: "clean exit before Beat 02 becomes dominant") still
        // applies in full below.
        gsap.set(heroBeat, { autoAlpha: 1, y: 0 });
        gsap.set([problemBeat, beliefBeat, founderBeat], { autoAlpha: 0, y: 20 });

        let targetVideoTime = 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              targetVideoTime = mapAboutProgressToVideoTime(self.progress, durationRef.current);
            },
          },
        });

        const addBeat = (
          el: HTMLElement,
          phase: { enter: readonly [number, number]; exit: readonly [number, number] | null },
        ) => {
          // `.to()`, not `.fromTo()`: each beat's own starting point (Hero
          // already at autoAlpha 1, the other three at 0/y:20) was just
          // set above via `gsap.set` — a scrub-linked ScrollTrigger syncs
          // to the real current scroll position the instant it's created
          // (including on a mid-page refresh), so this still lands each
          // beat in the right state regardless of where the visitor
          // actually is when the effect mounts.
          tl.to(el, { autoAlpha: 1, y: 0, ease: SIGNATURE_EASE, duration: phase.enter[1] - phase.enter[0] }, phase.enter[0]);
          if (phase.exit) {
            tl.to(
              el,
              { autoAlpha: 0, y: -20, ease: SIGNATURE_EASE, duration: phase.exit[1] - phase.exit[0] },
              phase.exit[0],
            );
          }
        };

        addBeat(heroBeat, ABOUT_BEAT_PHASES.hero);
        addBeat(problemBeat, ABOUT_BEAT_PHASES.problem);
        addBeat(beliefBeat, ABOUT_BEAT_PHASES.belief);
        addBeat(founderBeat, ABOUT_BEAT_PHASES.founderIntro);

        // Anchor the timeline's own total duration at exactly 1: GSAP
        // derives a timeline's duration from wherever its last child tween
        // ends, and Founder — the one beat with no `exit` — has its last
        // tween end at its own enter's finish (~0.79), not 1. Left alone,
        // a scrub-linked ScrollTrigger maps scroll progress 0→1 onto
        // *that* shorter duration, silently compressing every phase
        // fraction above (confirmed via direct measurement: scrolling to
        // the trigger's own true 30%-of-range point produced a timeline
        // position of ~0.24, not 0.30). A zero-duration `set` re-affirming
        // Founder's already-true resting state, placed at `1`, costs
        // nothing visually and forces the timeline to span the full 0–1
        // range the ScrollTrigger itself is measuring against.
        tl.set(founderBeat, { autoAlpha: 1, y: 0 }, 1);

        // Seek smoothing — isolated to `currentTime` only, per the brief:
        // a small exponential interpolation toward whatever
        // `targetVideoTime` the ScrollTrigger's own `onUpdate` above most
        // recently computed, ticking on the same `gsap.ticker` every
        // other GSAP scene on the page already shares (not a second,
        // independently-scheduled rAF loop).
        //
        // Scroll-video smoothness audit findings (measured, not assumed):
        // `self.progress` in the `onUpdate` above is the ScrollTrigger's
        // raw, immediate scroll-based progress — confirmed via direct
        // instrumentation that it reflects a new scroll position within
        // 1 frame, regardless of this same ScrollTrigger's own `scrub: 1`
        // (which only smooths *this timeline's own* playback — the beat
        // opacity/y tweens above — not the value read here). So 100% of
        // the video's own catch-up lag was coming from this exponential
        // filter alone; `scrub` was cleared of that specific complaint
        // and left unchanged (it's still the right speed for the beat
        // crossfades, which aren't part of this audit's scope).
        //
        // TAU raised 8 → 12 (within the requested 10–14 range), plus the
        // adaptive boost below: measured settle time (to within 0.05s of
        // target, via temporary instrumentation exposing both values —
        // removed after measuring) for the same large scroll jump dropped
        // from 709ms at the original TAU 8 to 441ms — video reads as
        // noticeably more attached to the scroll input, with no visible
        // jitter on slow scrolls in the same test.
        //
        // A light adaptive boost on top (per the brief's own "small delta
        // → gentle, large delta → faster catch-up" suggestion): effective
        // tau scales up toward TAU_MAX only when the gap is already
        // large (a fast flick-scroll jumping many seconds of footage at
        // once), so a normal, small continuous-scroll delta still gets
        // the gentler baseline feel — not a second smoothing system, one
        // multiplier on the existing one.
        let currentVideoTime = 0;
        let lastTime = 0;
        const TAU = 12;
        const TAU_MAX = 22;
        const ADAPTIVE_DELTA_SCALE = 4; // seconds of gap to reach TAU_MAX

        const tick = () => {
          const now = performance.now();
          const dt = lastTime ? (now - lastTime) / 1000 : 0;
          lastTime = now;

          if (dt <= 0) {
            currentVideoTime = targetVideoTime;
          } else {
            const gap = Math.abs(targetVideoTime - currentVideoTime);
            const boost = Math.min(1, gap / ADAPTIVE_DELTA_SCALE);
            const effectiveTau = TAU + (TAU_MAX - TAU) * boost;
            const alpha = 1 - Math.exp(-dt * effectiveTau);
            currentVideoTime += (targetVideoTime - currentVideoTime) * alpha;
            if (Math.abs(targetVideoTime - currentVideoTime) < 0.001) {
              currentVideoTime = targetVideoTime;
            }
          }

          // Seek threshold raised 0.01s → 0.035s: at this clip's 24fps,
          // one frame is ~0.0417s, so 0.01s previously allowed a seek to
          // fire for a sub-frame difference that could never change what
          // was actually rendered — pure wasted decode work. 0.035s stays
          // safely under one frame's worth of change while cutting
          // unnecessary seeks, per the brief's own suggested 0.02–0.04s
          // range.
          if (Math.abs(video.currentTime - currentVideoTime) > 0.035) {
            video.currentTime = currentVideoTime;
          }
        };
        gsap.ticker.add(tick);

        return () => {
          gsap.ticker.remove(tick);
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, track);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={trackRef} className="relative" style={{ height: `${ABOUT_TRACK_VH}svh` }}>
      {/* The visual stage — pinned via plain CSS `position: sticky` (no
          GSAP `pin`) for the whole cinematic track. */}
      <div className="sticky top-0 z-0 h-svh w-full overflow-hidden bg-paper-dim">
        <video
          ref={videoRef}
          aria-hidden="true"
          muted
          playsInline
          preload="auto"
          poster={aboutHero.media.posterSrc}
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
        >
          <source src={aboutCinematicVideo.src} type="video/mp4" />
        </video>

        {/* A quiet, static "chapter rail" — documentary wayfinding
            flavor, not a scroll-driven indicator (each beat's own opacity
            already carries that). Numerals only — see the Phase 3 note
            this file inherits on why word labels were dropped. */}
        <ol className="absolute top-1/2 right-3 z-10 flex -translate-y-1/2 flex-col items-end gap-6 sm:right-5">
          {aboutCinematicSequence.map((_, index) => (
            <li key={index} className="font-display text-xs font-semibold text-paper/70 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </li>
          ))}
        </ol>

        {/* The four beats live INSIDE the sticky visual stage, not as
            siblings of it — a real bug caught via screenshot QA: as plain
            children of the outer 320svh track (`absolute` relative to
            that track, not to the sticky stage), each beat scrolled away
            normally with the rest of the page instead of staying pinned
            alongside the video, so by ~30% into the track its text had
            already scrolled hundreds of pixels above the viewport. Nested
            here, `absolute inset-0` is relative to the *sticky* stage
            itself, so all four move together with it — pinned for the
            whole track — and GSAP's opacity/`y` tweens are the only thing
            that ever changes which one is actually visible. */}

        {/* Beat 01 — Hero: lower-left, the page's one <h1>. Unchanged from
            Phase 3's approved position — the footage's own subject (a
            woman seated left-of-center, upper half of frame) clears this
            bottom-anchored text with room to spare. */}
        <div
          ref={heroBeatRef}
          id={BEATS[0].cinematicId}
          data-cinematic-beat={BEATS[0].cinematicId}
          data-about-copy={BEATS[0].key}
          className="absolute inset-0 z-10 flex items-end"
        >
        <div className="container-birthwave pb-20 xl:pb-28">
          <div className="relative max-w-xl">
            <Scrim />
            <p className="eyebrow text-ink">{aboutHero.eyebrow}</p>
            <h1 className="mt-5 text-[clamp(2.5rem,1.9rem+3.2vw,4.5rem)] leading-[1.02] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {aboutHero.headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              {aboutHero.supporting}
            </p>
          </div>
        </div>
      </div>

      {/* Beat 02 — The Problem: upper-right, the opposite corner —
          narrowed from Phase 3's `max-w-lg` to `max-w-md` and pulled a
          touch further from the edge (`mr-10`/`xl:mr-14`): the real
          footage at this beat's own video window (~11–16s, the
          doorway/moving-between-spaces shot) has its subject standing
          more centrally than a placeholder gradient implied, and the
          wider column would have sat across her face at some points in
          that range — checked frame-by-frame before choosing this width,
          not guessed. */}
      <div
        ref={problemBeatRef}
        id={BEATS[1].cinematicId}
        data-cinematic-beat={BEATS[1].cinematicId}
        data-about-copy={BEATS[1].key}
        className="absolute inset-0 z-10 flex items-start"
      >
        <div className="container-birthwave pt-24 xl:pt-32">
          <div className="relative mr-10 ml-auto max-w-md text-right xl:mr-14">
            <Scrim />
            <p className="eyebrow text-ink">{aboutProblem.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(2.1rem,1.6rem+2.4vw,3.25rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {aboutProblem.heading}
            </h2>
            <p className="mt-6 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{aboutProblem.body}</p>
            <ul className="mt-7 flex flex-wrap items-center justify-end gap-x-3 gap-y-2">
              {aboutProblem.stages.map((stage, index) => (
                <li key={stage} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-ink-soft/40">
                      /
                    </span>
                  ) : null}
                  <span className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {stage}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Beat 03 — The Belief: moved from Phase 3's vertically-centered
          placement to top-anchored (`items-start pt-24`) — the real
          footage across this beat's own window (~17.5–23.5s, the
          document handoff resolving into a seated consultation) keeps
          both people's faces and joined hands in the vertical middle of
          the frame throughout; only the top ~30% (wall, curtain, framed
          art) stays consistently clear across that whole span. Still the
          sequence's dominant, largest statement and its own strongest
          hold (see about-cinematic.ts's own comment on why).
          Micro-fix: the top-anchored block above still grazed the
          doctor's forehead/hairline for the later half of this beat's own
          window (~p 0.65–0.73, the seated-consultation portion) — her
          face sits close enough to frame-center that the heading's own
          second line reached it. A static `-translate-x-10 -translate-y-10`
          (40px left, 40px up) on the text block itself — not the
          GSAP-driven beat wrapper, and not tied to progress, so it's one
          fixed placement for the whole beat, never animated — plus a
          modest ~6% `max-width` reduction (`max-w-4xl` → `max-w-[52.5rem]`,
          896px → 840px) moves the block clear of her, with no change to
          copy, type scale, hierarchy, timing, or footage. Left shift and
          `max-width` both kept modest deliberately: `container-birthwave`'s
          own left gutter is ~45–48px at 1440px, so a larger left shift
          would have started crowding (or at narrower `lg` widths, clipping
          past) the true viewport edge; the up shift stops well short of
          the fixed header's own ~70–80px clearance. */}
      <div
        ref={beliefBeatRef}
        id={BEATS[2].cinematicId}
        data-cinematic-beat={BEATS[2].cinematicId}
        data-about-copy={BEATS[2].key}
        className="absolute inset-0 z-10 flex items-start"
      >
        <div className="container-birthwave pt-24 xl:pt-28">
          <div className="relative max-w-[52.5rem] -translate-x-10 -translate-y-10">
            <Scrim strong />
            <p className="eyebrow text-ink">{aboutBelief.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(2.75rem,2rem+3.6vw,5rem)] leading-[1.02] font-semibold tracking-[var(--tracking-tight)] text-ink uppercase">
              {aboutBelief.heading}
            </h2>
            <p className="mt-8 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              {aboutBelief.body}
            </p>
          </div>
        </div>
      </div>

      {/* Beat 04 — Founder Introduction: lower-right, narrowed the same
          way and for the same reason as Problem above — the final
          consultation footage's joined hands extend fairly wide across
          the lower-center of frame at this beat's own ~28–30s window. The
          consultation footage is explicitly atmosphere here, not a claim
          that it depicts the founder — see this file's own top comment
          and about-content.ts's `aboutFounderIntro`. */}
      <div
        ref={founderBeatRef}
        id={BEATS[3].cinematicId}
        data-cinematic-beat={BEATS[3].cinematicId}
        data-about-copy={BEATS[3].key}
        className="absolute inset-0 z-10 flex items-end"
      >
        <div className="container-birthwave pb-20 xl:pb-28">
          <div className="relative mr-10 ml-auto max-w-md text-right xl:mr-14">
            <Scrim />
            <p className="eyebrow text-ink">{aboutFounderIntro.eyebrow}</p>
            <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">{aboutFounderIntro.introLabel}</h2>
            <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{aboutFounderIntro.story}</p>
            <p className="mt-6 border-r-2 border-terracotta pr-5 text-xl leading-[1.4] font-medium text-ink italic">
              &ldquo;{aboutFounderIntro.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

/** A soft blurred backing behind each beat's text — legibility over real
 * footage without a hard card edge or a heavy full-frame gradient (the
 * brief is explicit: "do not cover it with a heavy gradient... only a
 * localized/subtle scrim"). Unchanged from Phase 3. */
function Scrim({ strong = false }: { strong?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={strong ? "absolute -inset-x-8 -inset-y-10 -z-10 rounded-[2.5rem] blur-2xl" : "absolute -inset-x-6 -inset-y-8 -z-10 rounded-[2rem] blur-2xl"}
      style={{ backgroundColor: `color-mix(in srgb, var(--color-paper) ${strong ? 62 : 55}%, transparent)` }}
    />
  );
}

/**
 * Static path — below `lg`, and `prefers-reduced-motion: reduce` at any
 * width (see the CSS split in `AboutCinematicCanvas` above). Natural
 * stacked flow, no pinning, no `320svh` track, no video element at all —
 * each beat backed by its own real extracted poster frame from the same
 * cinematic clip instead of Phase 3's placeholder gradient.
 */
function AboutCinematicCanvasStatic() {
  return (
    <div className="flex flex-col">
      <StaticBeat posterSrc={aboutHero.media.posterSrc} alt={aboutHero.media.alt}>
        <div id={`${BEATS[0].cinematicId}-static`} data-cinematic-beat={BEATS[0].cinematicId} data-about-copy={BEATS[0].key}>
          <p className="eyebrow">{aboutHero.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.25rem,1.8rem+2.2vw,3rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {aboutHero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{aboutHero.supporting}</p>
        </div>
      </StaticBeat>

      <StaticBeat posterSrc={aboutProblem.media.posterSrc} alt={aboutProblem.media.alt}>
        <div id={`${BEATS[1].cinematicId}-static`} data-cinematic-beat={BEATS[1].cinematicId} data-about-copy={BEATS[1].key}>
          <p className="eyebrow">{aboutProblem.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.6rem+1.4vw,2.5rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {aboutProblem.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{aboutProblem.body}</p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            {aboutProblem.stages.map((stage, index) => (
              <li key={stage} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-ink-soft/40">
                    /
                  </span>
                ) : null}
                <span className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                  {stage}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </StaticBeat>

      <StaticBeat posterSrc={aboutBelief.media.posterSrc} alt={aboutBelief.media.alt}>
        <div id={`${BEATS[2].cinematicId}-static`} data-cinematic-beat={BEATS[2].cinematicId} data-about-copy={BEATS[2].key}>
          <p className="eyebrow">{aboutBelief.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.1rem,1.7rem+1.8vw,2.75rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink uppercase">
            {aboutBelief.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{aboutBelief.body}</p>
        </div>
      </StaticBeat>

      <StaticBeat posterSrc={aboutFounderIntro.media.posterSrc} alt={aboutFounderIntro.media.alt} last>
        <div id={`${BEATS[3].cinematicId}-static`} data-cinematic-beat={BEATS[3].cinematicId} data-about-copy={BEATS[3].key}>
          <p className="eyebrow">{aboutFounderIntro.eyebrow}</p>
          <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">{aboutFounderIntro.introLabel}</h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{aboutFounderIntro.story}</p>
          <p className="mt-5 border-l-2 border-terracotta pl-5 text-xl leading-[1.4] font-medium text-ink italic">
            &ldquo;{aboutFounderIntro.quote}&rdquo;
          </p>
        </div>
      </StaticBeat>
    </div>
  );
}

function StaticBeat({
  posterSrc,
  alt,
  children,
  last = false,
}: {
  posterSrc: string;
  alt: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "border-b border-[var(--color-border)]"}>
      <div aria-hidden="true" data-about-visual="poster" className="relative h-64 w-full overflow-hidden sm:h-80">
        <Image src={posterSrc} alt={alt} fill sizes="100vw" className="object-cover object-[50%_38%]" />
      </div>
      <div className="container-birthwave py-12">{children}</div>
    </div>
  );
}
