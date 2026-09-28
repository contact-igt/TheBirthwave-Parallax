"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { doctors, type DoctorContent } from "@/content/doctors-content";

import { DoctorProfileContent } from "@/components/sections/doctors/doctor-profile-content";
import { FounderSection } from "@/components/sections/doctors/founder-section";
import { MedicalTeamDirectory } from "@/components/sections/doctors/medical-team-directory";
import { AlliedTeamDirectory } from "@/components/sections/doctors/allied-team-directory";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap, ScrollTrigger } from "@/motion/gsap-scroll";
import { DOCTORS_DESKTOP_QUERY, TEAM_SCENE_PORTRAIT_DRIFT_PX, normalizedDelta } from "@/motion/doctors-journey";
import { cx } from "@/lib/cx";

/**
 * /doctors — the team journey (team-journey rework, superseding the
 * team-directory rework's own page composition). Every one of the 10
 * confirmed roster members (Founder → Medical & Clinical Team → Allied
 * Care Team, `doctors`'s own real order — not the old
 * `doctorsJourneyRoster` subset, which deliberately left Allied out) gets
 * one complete scene in ONE pinned horizontal track on eligible desktop
 * viewports; everywhere else (below `lg`, short viewports, reduced
 * motion, content that measures as too tall to fit, JS unavailable) the
 * SAME roster renders through the team-directory rework's own vertical
 * presentation (`FounderSection`/`MedicalTeamDirectory`/
 * `AlliedTeamDirectory`, unchanged) instead. Exactly one of the two is
 * ever visible (`display:none` on the other — removed from layout AND
 * tab order, not just hidden visually), so every person still appears
 * exactly once in the active presentation either way.
 *
 * WHAT THIS REUSES FROM THE OLD `doctors-master-journey.tsx`/
 * `doctors-journey.ts` SYSTEM, AND WHAT IT DELIBERATELY DOES NOT:
 *
 * Reused — the GSAP wiring shape itself: `gsap.context()` +
 * `gsap.matchMedia()` gated on `DOCTORS_DESKTOP_QUERY`, a real measured
 * `getDistance = track.scrollWidth - window.innerWidth` (never a guessed
 * vh number), `invalidateOnRefresh: true` so resize recalculates
 * geometry, and the "closest scene to viewport centre via
 * `getBoundingClientRect()` every tick" technique for knowing which
 * profile is active. `normalizedDelta` (motion/doctors-journey.ts) is
 * reused unchanged for the optional portrait drift below.
 *
 * NOT reused — the old file's much larger "everything from Hero through
 * the closing form is one pinned world" architecture (this rework's own
 * brief is explicit that only the roster itself is pinned; Hero, the
 * guidance sections and the form all stay in normal vertical flow around
 * it), its 86–94vw variable panel widths (every scene here is one
 * consistent ~100vw, "approximately one viewport of horizontal width,"
 * per the brief), its five alternating `DoctorScene` layout variants
 * ("one consistent portrait/text arrangement," per the brief — every
 * scene here renders through the SAME `DoctorProfileContent` the
 * vertical fallback also uses), its connecting-line direction-thread SVG
 * system (no equivalent requested here, and one fewer moving system to
 * keep correct), its per-scene scale/opacity "settle" on activation
 * (`PORTRAIT_REST`) — the brief's own "avoid fading inactive profiles
 * nearly invisible" argues directly against it — and its
 * `FORM_DWELL_FRACTION` end-of-track scroll-distance hold (that existed
 * to give a visitor time to fill in a form that lived INSIDE the old
 * track; this track's own end is a real, undecorated 1:1
 * `getDistance()`, so the last scene's own trailing edge naturally rests
 * flush with the viewport at release, complete and readable, with no
 * separate hold mechanism needed).
 *
 * SCRUB: `scrub: true` (direct, no smoothing lag) — the brief's own
 * "start with direct scrub and approximately 1:1 scroll-to-horizontal
 * travel," not the old system's `scrub: 1`, which is exactly the
 * "long smoothing lag after scrolling stops" the brief says to avoid.
 *
 * CONTENT-FIT FALLBACK: mirrors the established pattern
 * `services-sticky-showcase.tsx` already uses for the identical problem
 * (a fixed-height pinned stage whose content can outgrow it at enlarged
 * text sizes) — a `contentFits` boolean, true by default (so the desktop
 * branch's own visibility is ordinarily decided by CSS media queries
 * alone, with no hydration-mismatch risk), forced to `false` only by a
 * real `ResizeObserver` measurement of each scene's own natural content
 * height against the true space available below the fixed header. Once
 * `false`, BOTH the CSS gate and the GSAP effect switch to the
 * unconditional vertical fallback, regardless of viewport size — an
 * enlarged-text visitor on an otherwise roomy window still gets the
 * always-fits vertical directory instead of a clipped pinned stage.
 *
 * NO-JS SAFETY NET: unlike the Services showcase's own crossfade-based
 * desktop branch (still readable, just static, without JS), a pinned
 * HORIZONTAL track with no JS to ever pin/transform it would leave 9 of
 * the 10 scenes permanently clipped by the pin's own `overflow-hidden`
 * with no way to reach them — a real regression the brief explicitly
 * warns against ("default markup must remain readable before JavaScript
 * enhancement... reduced-motion classes alone do not establish
 * JavaScript-disabled visibility"). A `<noscript>` block force-hides the
 * desktop branch and force-shows the vertical fallback, overriding the
 * `contentFits`-driven classes entirely whenever JS is unavailable.
 *
 * FOCUS MANAGEMENT: every scene's links are real, always-present DOM
 * elements (all 10 scenes exist simultaneously, positioned via the
 * track's own transform) — a keyboard user tabbing through them can reach
 * a scene that isn't currently centred. A `focusin` listener on the
 * track brings that scene to centre by moving the SAME scroll position
 * ScrollTrigger already reads as its progress source (`window.scrollTo`
 * to the scroll position that corresponds to that scene's own index) —
 * not a second, independent carousel state that could disagree with
 * scrolling. The Prev/Next controls and the counter read/drive that
 * identical source. A visible "Skip team presentation" link is the FIRST
 * focusable element on entering the pinned stage, so a keyboard user is
 * never forced through all 10 profiles to reach the rest of the page.
 */

const DESKTOP_ID = "team-journey-desktop";
const VERTICAL_ID = "team-journey-vertical";
// Literal strings, never built via template-literal interpolation of a
// shared constant — Tailwind's JIT scanner does static text analysis of
// the source; a class assembled at runtime is invisible to it and never
// compiles (a real, confirmed bug this exact way once already elsewhere
// in this codebase — see services-sticky-showcase.tsx's own comment).
const DESKTOP_ELIGIBLE_CLASS = "hidden motion-safe:[@media(min-width:1024px)_and_(min-height:700px)]:block";
const VERTICAL_FALLBACK_CLASS = "motion-safe:[@media(min-width:1024px)_and_(min-height:700px)]:hidden";

/**
 * Desktop scene motion — driven by each scene's distance from the stage
 * centre (the same scroll position the track itself scrubs), not by a
 * separate timed tween. A scene is fully settled near centre and fully
 * faded by the transition midpoint, so the outgoing and incoming profiles
 * are never both readable, nothing keeps drifting after the slide stops,
 * and rapid Prev/Next or mid-transition reversals can't leave stale state
 * (it's a pure function of position). The portrait settles a touch before
 * its profile. The first scene's entrance is scrubbed as the stage scrolls
 * into view. (Tablet/phone use the vertical directory's own entrances.)
 */
const SCENE_MOTION = {
  image: { x: -48, y: 10, scale: 0.98, settledWithin: 0.12, fadedBeyond: 0.45 },
  content: { x: 48, y: 10, settledWithin: 0.08, fadedBeyond: 0.42 },
} as const;

/** 0 at/inside `settledWithin`, 1 at/beyond `fadedBeyond`, smoothstepped. */
function sceneAway(share: number, settledWithin: number, fadedBeyond: number) {
  const t = Math.min(1, Math.max(0, (share - settledWithin) / (fadedBeyond - settledWithin)));
  return t * t * (3 - 2 * t);
}

export function TeamJourney() {
  // Always starts `true` (no hydration mismatch) and is only ever forced
  // to `false` after a real measurement inside `TeamJourneyDesktop` finds
  // a scene's own content taller than the space it has to fit in — see
  // that component's own content-fit effect.
  const [contentFits, setContentFits] = useState(true);

  return (
    <section
      id="team-directory"
      aria-label="Our care team"
      className="relative isolate scroll-mt-[var(--header-height)]"
    >
      <noscript>
        <style>{`#${DESKTOP_ID}{display:none !important} #${VERTICAL_ID}{display:block !important}`}</style>
      </noscript>

      {/* Section backdrop: team photo (desktop) + soft wash, sticky and
          viewport-sized. The ambient Galaxy light comes from the page's
          shared post-Hero layer (DoctorsAmbientBackdrop), behind this
          section — this section's own surface is transparent so it shows. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-clip [mask-image:linear-gradient(to_bottom,transparent_0,black_120px,black_calc(100%-120px),transparent_100%)]"
      >
        <div className="sticky top-0 h-svh w-full overflow-clip">
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src="/images/clinic/doctors-team-bg.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-35 select-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper/40" />
        </div>
      </div>

      <div id={DESKTOP_ID} className={cx("relative z-10", contentFits ? DESKTOP_ELIGIBLE_CLASS : "hidden")}>
        <TeamJourneyDesktop contentFits={contentFits} onFitChange={setContentFits} />
      </div>
      <div id={VERTICAL_ID} className={cx("relative z-10", contentFits ? VERTICAL_FALLBACK_CLASS : "block")}>
        <TeamJourneyVertical />
      </div>
    </section>
  );
}

/** The team-directory rework's own vertical presentation, reused
 * verbatim as this rework's fallback — Founder featured once, then the
 * two profile-row directories, in the confirmed Founder → Medical →
 * Allied order. */
function TeamJourneyVertical() {
  return (
    <>
      <FounderSection />
      <MedicalTeamDirectory />
      <AlliedTeamDirectory />
    </>
  );
}

function TeamJourneyDesktop({
  contentFits,
  onFitChange,
}: {
  contentFits: boolean;
  onFitChange: (fits: boolean) => void;
}) {
  const reducedMotion = useReducedMotion();
  const roster = doctors;

  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Content-fit measurement — see this file's own top comment. Re-runs on
  // a `ResizeObserver` (catches font-size-driven reflow a plain
  // `window.resize` listener would miss — text zoom doesn't fire
  // `resize`) watching both the pin itself and every scene's own content
  // block, plus a window resize listener for ordinary viewport changes.
  useLayoutEffect(() => {
    if (reducedMotion) return;
    const pinEl = pinRef.current;
    if (!pinEl) return;

    const measure = () => {
      // Only measure while the stage is actually rendered. Below `lg` it's
      // display:none (0px tall), which would read as "every scene overflows"
      // and latch the vertical fallback on for good — so resizing back up to
      // desktop would never bring the track back.
      if (pinEl.clientHeight === 0) return;
      const headerEl = document.querySelector("header");
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
      const available = pinEl.clientHeight - headerHeight;
      let overflow = false;
      for (const content of contentRefs.current) {
        if (content && content.scrollHeight > available) {
          overflow = true;
          break;
        }
      }
      onFitChange(!overflow);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(pinEl);
    for (const content of contentRefs.current) {
      if (content) ro.observe(content);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reducedMotion, onFitChange]);

  // The one controlling ScrollTrigger — see this file's own top comment
  // for exactly what was kept/dropped from the old system.
  useEffect(() => {
    if (reducedMotion || !contentFits) return;
    const pinEl = pinRef.current;
    const track = trackRef.current;
    if (!pinEl || !track) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(DOCTORS_DESKTOP_QUERY, () => {
        const getDistance = () => Math.max(1, track.scrollWidth - window.innerWidth);

        // ── Scene motion (one controller, position-driven) ────────────────
        const parts = sceneRefs.current.map((scene) => ({
          image: scene?.querySelector<HTMLElement>("[data-doctor-image]") ?? null,
          content: scene?.querySelector<HTMLElement>("[data-doctor-content]") ?? null,
        }));
        // First scene's own entrance: 0 → 1 as the stage scrolls into view.
        let entry = 0;
        const I = SCENE_MOTION.image;
        const C = SCENE_MOTION.content;

        const update = () => {
          const viewportMid = window.innerWidth / 2;
          let activeIdx = 0;
          let bestDist = Infinity;

          sceneRefs.current.forEach((scene, i) => {
            if (!scene) return;
            const rect = scene.getBoundingClientRect();
            const dist = rect.left + rect.width / 2 - viewportMid;
            if (Math.abs(dist) < bestDist) {
              bestDist = Math.abs(dist);
              activeIdx = i;
            }

            const share = Math.abs(dist) / window.innerWidth;
            const { image, content } = parts[i] ?? {};
            if (image && content) {
              const pre = i === 0 ? 1 - entry : 0;
              const a = Math.max(sceneAway(share, I.settledWithin, I.fadedBeyond), pre);
              const b = Math.max(sceneAway(share, C.settledWithin, C.fadedBeyond), pre);
              gsap.set(image, { opacity: 1 - a, x: I.x * a, y: I.y * a, scale: 1 - (1 - I.scale) * a });
              gsap.set(content, { opacity: 1 - b, x: C.x * b, y: C.y * b });
            }

            // Optional portrait depth — subtle, applied to the portrait's
            // own inner element (the wrapper carries the scene motion), never
            // its text.
            const portrait = scene.querySelector<HTMLElement>("[data-team-portrait] > *");
            if (portrait) {
              const offset = normalizedDelta(dist) * TEAM_SCENE_PORTRAIT_DRIFT_PX;
              portrait.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
            }
          });

          setActiveIndex((prev) => (prev === activeIdx ? prev : activeIdx));
        };

        const entryTrigger = ScrollTrigger.create({
          trigger: pinEl,
          start: "top 78%",
          end: "top 30%",
          onUpdate: (self) => {
            entry = self.progress;
            update();
          },
          onRefresh: (self) => {
            entry = self.progress;
          },
        });

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinEl,
            pin: pinEl,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: true,
            // Settle on the nearest doctor once a free wheel/trackpad gesture
            // stops. Without it a gesture can rest at the midpoint between
            // two doctors, where the position-driven fade (above) shows
            // neither. Prev/Next and focus-centring already land exactly on a
            // doctor, so for them this is a no-op.
            snap: {
              snapTo: 1 / Math.max(1, roster.length - 1),
              // Nearest doctor only. Velocity projection turned one quick
              // wheel flick into a jump of several doctors, and directional
              // snapping let a 40px trackpad nudge advance a whole doctor.
              inertia: false,
              directional: false,
              delay: 0.12,
              duration: { min: 0.2, max: 0.5 },
              ease: "power1.inOut",
            },
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: update,
          },
        });

        triggerRef.current = tween.scrollTrigger ?? null;
        update();

        return () => {
          entryTrigger.kill();
          tween.scrollTrigger?.kill();
          tween.kill();
          triggerRef.current = null;
          parts.forEach(({ image, content }) => {
            if (image && content) gsap.set([image, content], { clearProps: "opacity,transform" });
          });
        };
      });
    }, pinEl);

    return () => ctx.revert();
  }, [reducedMotion, contentFits, roster.length]);

  // Prev/Next AND the focus-follow effect below both move this one
  // function's target: the real scroll position ScrollTrigger reads as
  // its own progress source — never a second, independent index that
  // scrolling could disagree with.
  function scrollToIndex(index: number) {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const clamped = Math.max(0, Math.min(roster.length - 1, index));
    const progress = roster.length > 1 ? clamped / (roster.length - 1) : 0;
    const targetY = trigger.start + progress * (trigger.end - trigger.start);
    window.scrollTo({ top: targetY, behavior: reducedMotion ? "auto" : "smooth" });
  }

  // A keyboard user must never focus something they can't see — bring
  // the focused scene to centre rather than leaving it off-screen.
  useEffect(() => {
    if (reducedMotion || !contentFits) return;
    const track = trackRef.current;
    if (!track) return;

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      const scene = target?.closest<HTMLElement>("[data-team-scene]");
      if (!scene) return;
      const index = sceneRefs.current.findIndex((el) => el === scene);
      if (index === -1) return;
      const rect = scene.getBoundingClientRect();
      const viewportMid = window.innerWidth / 2;
      const mid = rect.left + rect.width / 2;
      // Only nudge if it's meaningfully off-centre — avoids fighting a
      // scroll already in flight while tabbing within an already-active
      // scene's own links.
      if (Math.abs(mid - viewportMid) > rect.width * 0.15) {
        scrollToIndex(index);
      }
    };

    track.addEventListener("focusin", onFocusIn);
    return () => track.removeEventListener("focusin", onFocusIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- scrollToIndex closes over stable refs only
  }, [reducedMotion, contentFits]);

  const controlButtonClass =
    "pointer-events-auto flex size-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-paper text-ink transition-colors duration-[var(--duration-fast)] hover:border-terracotta-deep hover:text-terracotta-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--color-border-strong)] disabled:hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]";

  return (
    <div className="relative">
      {/* First focusable element on entering the pinned stage — a
          keyboard user is never forced to tab through all 10 profiles to
          reach the rest of the page. */}
      <a
        href="#who-can-support-your-care"
        className="absolute top-4 left-4 z-30 rounded-xs bg-paper px-3 py-1.5 font-body text-xs font-semibold text-ink-soft underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-terracotta-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
      >
        Skip team presentation
      </a>

      {/* Transparent: the team photo, Galaxy and wash live in
          TeamJourney's shared backdrop, behind this stage. */}
      {/* `overflow-clip`, not `overflow-hidden`: a hidden-overflow box is still
          programmatically scrollable, so focusing a link in an off-centre
          doctor made the browser scroll THIS box sideways instead of letting
          the focus handler below centre the track — focus landed on an
          invisible profile and the counter never moved. Clip can't scroll. */}
      <div ref={pinRef} className="relative h-svh w-full overflow-clip">

        <div ref={trackRef} className="relative z-10 flex h-full w-max will-change-transform">
          {roster.map((doctor, index) => (
            <TeamJourneyScene
              key={doctor.slug}
              doctor={doctor}
              index={index}
              sceneRef={(el) => {
                sceneRefs.current[index] = el;
              }}
              contentRef={(el) => {
                contentRefs.current[index] = el;
              }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-6 px-10">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous profile"
            className={controlButtonClass}
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <span
            aria-live="polite"
            className="pointer-events-none min-w-16 text-center font-display text-xs font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 tabular-nums"
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(roster.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === roster.length - 1}
            aria-label="Next profile"
            className={controlButtonClass}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamJourneyScene({
  doctor,
  index,
  sceneRef,
  contentRef,
}: {
  doctor: DoctorContent;
  index: number;
  sceneRef: (el: HTMLDivElement | null) => void;
  contentRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={sceneRef}
      data-team-scene
      className={cx(
        // No per-scene background: the shared ambient backdrop runs
        // continuously behind every scene (hard-edged tints read as a
        // travelling colour seam mid-slide).
        "relative flex h-full w-screen shrink-0 items-center overflow-hidden px-6 pt-[var(--header-height)] sm:px-10",
      )}
    >
      <div
        ref={contentRef}
        className="container-birthwave relative z-10 grid gap-10 sm:grid-cols-[clamp(300px,33%,380px)_minmax(0,41rem)] sm:items-center sm:justify-center sm:gap-16"
      >
        <DoctorProfileContent
          doctor={doctor}
          index={index}
          showCategory
          portraitWrapperClassName="block w-full max-w-[360px]"
          contentClassName="max-w-[41rem]"
          portraitAttrs={{ "data-team-portrait": "true" }}
        />
      </div>
    </div>
  );
}
