"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { doctors, doctorsJourneyIntro, doctorsEnquiryForm } from "@/content/doctors-content";
import { DoctorsHero } from "@/components/sections/doctors/doctors-hero";
import { WhoShouldYouConsult } from "@/components/sections/doctors/who-should-you-consult";
import { MultidisciplinaryCare } from "@/components/sections/doctors/multidisciplinary-care";
import { DoctorsAppointmentCta } from "@/components/sections/doctors/doctors-appointment-cta";
import { DoctorsEnquiryForm } from "@/components/sections/doctors/doctors-enquiry-form";
import {
  HeroScene,
  InterstitialScene,
  DoctorScene,
  AlliedConnectedScene,
  ConsultScene,
  CtaScene,
  FormScene,
} from "@/components/sections/doctors/doctors-journey-scenes";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap } from "@/motion/gsap-scroll";
import { accentVar } from "@/lib/accent-tint";
import { cx } from "@/lib/cx";
import {
  DOCTORS_DESKTOP_QUERY,
  TRACK_TRAVEL_FRACTION,
  PARALLAX_SPEED_REFERENCE,
  SCENE_PARALLAX_PX,
  PORTRAIT_REST,
  DOCTOR_SCENE_VARIANT_COUNT,
  activation,
  normalizedDelta,
  buildConnectingLinePath,
  CONNECTING_LINE_CELL_WIDTH,
  CONNECTING_LINE_VIEWBOX_HEIGHT,
  CONNECTING_LINE_HOLD_OPACITY,
  CONNECTING_LINE_TRAVEL_OPACITY,
  CONNECTING_LINE_BASE_OPACITY,
  CONNECTING_LINE_HIGHLIGHT_FRACTION,
  CONNECTING_LINE_SAFE_ZONE_MASK,
  THREAD_BAND_TOP_PERCENT,
  THREAD_BAND_HEIGHT_PERCENT,
  DOCTOR_SCENE_GAP,
  DOCTOR_MEDIA_HEIGHT_PERCENT,
} from "@/motion/doctors-journey";

/**
 * /doctors — MASTER horizontal parallax journey (premium rework).
 *
 * Everything from Hero through the closing enquiry form is ONE continuous
 * horizontally-travelling world on desktop (`lg:` / 1024px and up, motion
 * allowed): one pinned `100svh` stage, one flex track, one GSAP timeline,
 * one `ScrollTrigger`. No section below this point owns a second pin, a
 * second `ScrollTrigger`, or a competing transform — every doctor-scene
 * variant, the Allied/Connected chapter, the Consult panel, the CTA and
 * the Form all read their own parallax purely from that one timeline's
 * `onUpdate`, via a `getBoundingClientRect()` measurement of their own
 * panel each tick (see doctors-journey-scenes.tsx's own top comment for
 * how a scene's internal layers opt into that without individual refs).
 *
 * PROGRESS OWNERSHIP — the one rule this file exists to enforce:
 *   `distance = track.scrollWidth - window.innerWidth` (real measured
 *   width, `invalidateOnRefresh` re-measures on resize — never a guessed
 *   vh number), and a single `gsap.timeline({ scrollTrigger: { pin,
 *   scrub: 1 } })` drives `track`'s own `x` from `0` to `-distance`. The
 *   timeline's own child tween spans only `TRACK_TRAVEL_FRACTION` (0.85)
 *   of the timeline's 0–1 duration — see `FORM_DWELL_FRACTION`'s own
 *   comment in doctors-journey.ts for why: the remaining 0.15 is a real,
 *   physical scroll-distance hold once the Form scene has fully arrived,
 *   not a visual illusion, so a visitor can click into its fields without
 *   the page still sliding under the cursor. A `.set(track, {x}, 1)`
 *   anchor keeps the scrub-to-progress mapping accurate across that split
 *   — the same fix `about-cinematic-canvas.tsx` and `immersive-section.tsx`
 *   both already carry for the identical "GSAP derives a timeline's
 *   natural duration from its last child tween's own end, not literally
 *   1" pitfall.
 *
 * Panel sequence and widths are data-driven from `doctors-content.ts`,
 * not a fixed eleven-panel layout: this page has real, approved copy for
 * exactly six editorial moments today (Hero, the doctor scene(s), the
 * merged Allied/Connected Care chapter, Who Should You Consult, the
 * Appointment CTA, and the closing Form) — see `PANEL_SEQUENCE` below and
 * this file's own doctor-scene mapping for why the doctor-roster portion
 * scales with `doctors.length` rather than a hard-coded "Founder + four
 * clinical doctors" split doctors-content.ts's own single real entry
 * can't honestly support (its own header comment is explicit: several
 * team names surfaced during this rework are "known context," deliberately
 * still not used). The variant-cycling `DoctorScene` system supports five
 * distinct editorial layouts the moment more real doctors are approved,
 * with no further engineering.
 *
 * Below `lg`, and under `prefers-reduced-motion: reduce` at any width: no
 * pin, no track, no horizontal scroll at all — `DoctorsVerticalJourney`
 * renders the exact same content as a normal stacked page, reusing the
 * already-established standalone section components
 * (`doctors-hero.tsx`/`who-should-you-consult.tsx`/
 * `multidisciplinary-care.tsx`/`doctors-appointment-cta.tsx`) plus one new
 * plain vertical form section. Both subtrees are always in the DOM — only
 * CSS (`hidden motion-safe:lg:block` / `motion-safe:lg:hidden`) decides
 * which renders, so there is no hydration mismatch (the same reasoning
 * every other dual-path GSAP scene on this site already relies on).
 */

const DOCTOR_SCENE_WIDTH_VW = [92, 88, 94, 86, 90] as const;

interface PanelDef {
  key: string;
  widthVw: number;
  render: () => ReactNode;
}

function useJourneyPanels(): PanelDef[] {
  return useMemo(() => {
    const panels: PanelDef[] = [
      { key: "hero", widthVw: 100, render: () => <HeroScene /> },
      { key: "interstitial", widthVw: 16, render: () => <InterstitialScene /> },
    ];
    doctors.forEach((doctor, index) => {
      panels.push({
        key: doctor.slug,
        widthVw: DOCTOR_SCENE_WIDTH_VW[index % DOCTOR_SCENE_WIDTH_VW.length],
        render: () => <DoctorScene doctor={doctor} index={index} variant={index % DOCTOR_SCENE_VARIANT_COUNT} />,
      });
    });
    panels.push(
      { key: "allied-connected", widthVw: 128, render: () => <AlliedConnectedScene /> },
      { key: "consult", widthVw: 112, render: () => <ConsultScene /> },
      { key: "cta", widthVw: 80, render: () => <CtaScene /> },
      // 100vw, not the brief's own suggested 105–115vw — deliberately: this
      // is the LAST panel, and the track's mechanical resting position
      // (see `FORM_DWELL_FRACTION`'s own comment in doctors-journey.ts)
      // always lands with this panel's own trailing edge flush against the
      // viewport's right edge. A width wider than 100vw there is not
      // "revealed further" the way it would be mid-track — it is
      // permanently, unrecoverably cropped, since scrolling further only
      // holds (the whole point of the dwell). Confirmed via real QA
      // screenshot at 112vw: the held frame cropped the heading text
      // mid-word ("Still deciding" → "eciding"). 100vw is the one width
      // that rests with zero crop on either side.
      { key: "form", widthVw: 100, render: () => <FormScene /> },
    );
    return panels;
  }, []);
}

export function DoctorsMasterJourney() {
  return (
    <section id="doctors-journey" aria-label="Our care team — a connected journey" className="relative isolate bg-paper">
      <div className="hidden motion-safe:lg:block">
        <DoctorsMasterTrackDesktop />
      </div>
      <div className="motion-safe:lg:hidden">
        <DoctorsVerticalJourney />
      </div>
    </section>
  );
}

function DoctorsMasterTrackDesktop() {
  const reducedMotion = useReducedMotion();
  const panels = useJourneyPanels();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const highlightPathRef = useRef<SVGPathElement>(null);
  const endpointRef = useRef<HTMLDivElement>(null);
  const linePathLengthRef = useRef(0);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const linePathD = useMemo(() => buildConnectingLinePath(panels.length), [panels.length]);

  // The path's own total length, in its native SVG units — read once via
  // the platform API (`getTotalLength`), not estimated, since the dash
  // draw/highlight-window math below needs a real length to offset
  // against. Recomputed whenever the path's own `d` changes (more/fewer
  // panels), which is the only thing that can change it.
  useEffect(() => {
    if (basePathRef.current) {
      linePathLengthRef.current = basePathRef.current.getTotalLength();
    }
  }, [linePathD]);

  useEffect(() => {
    if (reducedMotion) return;
    const pinEl = pinRef.current;
    const track = trackRef.current;
    if (!pinEl || !track) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(DOCTORS_DESKTOP_QUERY, () => {
        const getDistance = () => Math.max(1, track.scrollWidth - window.innerWidth);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinEl,
            pin: pinEl,
            start: "top top",
            end: () => `+=${getDistance() / TRACK_TRAVEL_FRACTION}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Clamped at 1 for the whole final-dwell portion of the
              // ScrollTrigger's own range — everything below that reads
              // this (not the raw `self.progress`) mirrors the track's own
              // hold-once-arrived behaviour instead of continuing to creep.
              const trackProgress = Math.min(1, self.progress / TRACK_TRAVEL_FRACTION);
              const distance = getDistance();
              const viewportMid = window.innerWidth / 2;
              let activeIndex = 0;
              let bestDist = Infinity;
              // The direction-thread's own HOLD/TRAVEL signal: the
              // strongest activation across every scene this tick — 1
              // when some scene sits dead-centre (HOLD), falling toward 0
              // as the visitor scrolls between two scenes with neither
              // one centred (TRAVEL). See doctors-journey.ts's own
              // comment on CONNECTING_LINE_HOLD_OPACITY for why this is
              // the same `activation()` the portrait-settle logic below
              // already computes, not a second progress source.
              let maxActivation = 0;

              sceneRefs.current.forEach((scene, i) => {
                if (!scene) return;
                const rect = scene.getBoundingClientRect();
                const mid = rect.left + rect.width / 2;
                const dist = mid - viewportMid;
                if (Math.abs(dist) < bestDist) {
                  bestDist = Math.abs(dist);
                  activeIndex = i;
                }

                const nd = normalizedDelta(dist);
                const a = activation(dist);
                if (a > maxActivation) maxActivation = a;

                scene.querySelectorAll<HTMLElement>("[data-parallax-layer]").forEach((layer) => {
                  const kind = layer.dataset.parallaxLayer as keyof typeof SCENE_PARALLAX_PX | undefined;
                  if (!kind || !(kind in SCENE_PARALLAX_PX)) return;
                  const px = SCENE_PARALLAX_PX[kind] * nd;
                  if (layer.dataset.parallaxSettle === "true") {
                    const scale = PORTRAIT_REST.scale - (PORTRAIT_REST.scale - 1) * a;
                    const opacity = PORTRAIT_REST.opacity + (1 - PORTRAIT_REST.opacity) * a;
                    layer.style.transform = `translate3d(${px.toFixed(2)}px, 0, 0) scale(${scale.toFixed(3)})`;
                    layer.style.opacity = opacity.toFixed(3);
                  } else {
                    layer.style.transform = `translate3d(${px.toFixed(2)}px, 0, 0)`;
                  }
                });
              });

              const transitionActivation = 1 - maxActivation;

              if (lineRef.current) {
                const lineOffset = -(distance * PARALLAX_SPEED_REFERENCE.connectingLine) * trackProgress;
                lineRef.current.style.transform = `translate3d(${lineOffset.toFixed(2)}px, 0, 0)`;
                lineRef.current.style.width = `${distance + window.innerWidth * 1.15}px`;
              }

              const totalLength = linePathLengthRef.current;
              if (totalLength > 0 && basePathRef.current && highlightPathRef.current) {
                const drawnLength = totalLength * trackProgress;

                // BASE trace — a real line-draw reveal (dasharray = full
                // length, dashoffset shrinks as `trackProgress` advances),
                // reversible for free: scrolling back up just re-grows the
                // offset, no separate reverse-scroll logic needed. Held at
                // one quiet, constant opacity — the "PAST" record.
                basePathRef.current.style.strokeDasharray = `${totalLength}`;
                basePathRef.current.style.strokeDashoffset = `${(totalLength - drawnLength).toFixed(2)}`;
                basePathRef.current.style.opacity = CONNECTING_LINE_BASE_OPACITY.toFixed(3);

                // HIGHLIGHT window — one "on" dash of fixed length riding
                // the same path, its centre tracking `drawnLength` (so it
                // visually rides right at the current draw-point, i.e.
                // between whichever two scenes are currently transitioning),
                // its OPACITY driven by `transitionActivation` — the part
                // that actually implements HOLD (near-0, quiet) vs TRAVEL
                // (its strongest) rather than a flat always-on stroke.
                const windowLength = totalLength * CONNECTING_LINE_HIGHLIGHT_FRACTION;
                const gapLength = Math.max(0.01, totalLength - windowLength);
                highlightPathRef.current.style.strokeDasharray = `${windowLength.toFixed(2)} ${gapLength.toFixed(2)}`;
                highlightPathRef.current.style.strokeDashoffset = `${(windowLength / 2 - drawnLength).toFixed(2)}`;
                const highlightOpacity =
                  CONNECTING_LINE_HOLD_OPACITY +
                  (CONNECTING_LINE_TRAVEL_OPACITY - CONNECTING_LINE_HOLD_OPACITY) * transitionActivation;
                highlightPathRef.current.style.opacity = highlightOpacity.toFixed(3);

                // Directional feel — the ONE enhancement used (an
                // endpoint marker, not a moving highlight AND an arrow
                // AND particles): a small dot at the current draw-point,
                // fading in and out with the same signal as the highlight
                // it travels with.
                if (endpointRef.current) {
                  const clampedLength = Math.max(0, Math.min(totalLength, drawnLength));
                  const point = basePathRef.current.getPointAtLength(clampedLength);
                  // Percentages of the (already-stretched) container, not
                  // raw viewBox units — see this ref's own JSX comment.
                  const leftPercent = (point.x / (panels.length * CONNECTING_LINE_CELL_WIDTH)) * 100;
                  const topPercent = (point.y / CONNECTING_LINE_VIEWBOX_HEIGHT) * 100;
                  endpointRef.current.style.left = `${leftPercent.toFixed(3)}%`;
                  endpointRef.current.style.top = `${topPercent.toFixed(3)}%`;
                  endpointRef.current.style.opacity = highlightOpacity.toFixed(3);
                }
              }

              if (progressFillRef.current) {
                progressFillRef.current.style.width = `${(trackProgress * 100).toFixed(2)}%`;
              }
              if (counterRef.current) {
                counterRef.current.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(sceneRefs.current.length).padStart(2, "0")}`;
              }
            },
          },
        });

        tl.to(track, { x: () => -getDistance(), ease: "none", duration: TRACK_TRAVEL_FRACTION }, 0);
        // Anchor at exactly 1 — see this file's own top comment.
        tl.set(track, { x: () => -getDistance() }, 1);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, pinEl);

    return () => ctx.revert();
  }, [reducedMotion, panels.length]);

  return (
    <div
      ref={pinRef}
      className="relative h-svh w-full overflow-hidden bg-paper"
      // Alignment + thread-safe-zone rework — shared scene tokens, read by
      // every text/media scene in doctors-journey-scenes.tsx via
      // `var(--doctor-scene-gap)` / `var(--doctor-media-height)` instead of
      // one-off gap/height values per scene. See doctors-journey.ts's own
      // comment on `DOCTOR_SCENE_GAP`/`DOCTOR_MEDIA_HEIGHT_PERCENT` for why
      // these two particular values.
      style={
        {
          "--doctor-scene-gap": DOCTOR_SCENE_GAP,
          "--doctor-media-height": `${DOCTOR_MEDIA_HEIGHT_PERCENT}%`,
        } as CSSProperties
      }
    >
      {/* The connecting line — now a "direction thread," not a permanent
          stroke: most visible BETWEEN scenes, quiet while one is centred
          and being read (see the onUpdate branch above for the HOLD/
          TRAVEL math). Two wrappers, two different jobs:
            - the OUTER one is never transformed and carries the safe-zone
              mask — now only a soft edge fade (see doctors-journey.ts's own
              comment on `CONNECTING_LINE_SAFE_ZONE_MASK`); content safety
              comes from the vertical placement below, not this mask.
            - the INNER one (`lineRef`) is what the onUpdate above
              transforms for the line's own (slight) parallax lag —
              masking a translating element by its own box would move the
              fade along with the content instead of keeping it fixed to
              the viewport, which is why these are separate. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{ maskImage: CONNECTING_LINE_SAFE_ZONE_MASK, WebkitMaskImage: CONNECTING_LINE_SAFE_ZONE_MASK }}
      >
        <div
          ref={lineRef}
          className="absolute left-0 will-change-transform"
          // Thread safe zone: living in the genuine negative space below
          // every scene's own content/media band (see doctors-journey.ts's
          // own comment on `THREAD_BAND_TOP_PERCENT`) rather than trying to
          // dodge content horizontally at mid-screen, which is what
          // actually crossed headlines/portraits/lists before this.
          style={{ top: `${THREAD_BAND_TOP_PERCENT}%`, height: `${THREAD_BAND_HEIGHT_PERCENT}%` }}
        >
          <svg
            viewBox={`0 0 ${panels.length * CONNECTING_LINE_CELL_WIDTH} ${CONNECTING_LINE_VIEWBOX_HEIGHT}`}
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
          >
            {/* BASE — the travelled trace, drawn via dasharray/dashoffset
                as the journey progresses. Constant, quiet opacity. */}
            <path
              ref={basePathRef}
              d={linePathD}
              fill="none"
              stroke="var(--color-terracotta)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* HIGHLIGHT — a short travelling window riding the same
                path, its opacity doing the actual HOLD/TRAVEL work. */}
            <path
              ref={highlightPathRef}
              d={linePathD}
              fill="none"
              stroke="var(--color-terracotta)"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity={CONNECTING_LINE_HOLD_OPACITY}
            />
          </svg>
          {/* The one directional cue used — a small endpoint marker at the
              current draw-point, not an arrowhead or particles. A plain
              HTML dot positioned by percentage, not an SVG `<circle>`:
              the viewBox above is stretched non-uniformly
              (`preserveAspectRatio="none"`, very wide, short), so a
              circle drawn in its own coordinate space would render as a
              squashed ellipse, not a dot. Percentages of this container's
              own real (already-stretched) box sidestep that entirely. */}
          <div
            ref={endpointRef}
            className="absolute size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta"
            style={{ left: 0, top: "50%", opacity: CONNECTING_LINE_HOLD_OPACITY }}
          />
        </div>
      </div>

      <div ref={trackRef} className="relative z-10 flex h-full w-max will-change-transform">
        {panels.map((panel, index) => (
          <div
            key={panel.key}
            ref={(el) => {
              sceneRefs.current[index] = el;
            }}
            data-parallax-scene
            style={{ width: `${panel.widthVw}vw` }}
            className="relative h-full shrink-0 overflow-hidden"
          >
            {panel.render()}
          </div>
        ))}
      </div>

      {/* Progress — a thin line and a small "01 / 08" counter, never a
          large pagination control. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 px-10 xl:px-16">
        <span className="font-display text-xs font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 tabular-nums">
          <span ref={counterRef}>01 / {String(panels.length).padStart(2, "0")}</span>
        </span>
        <div className="mt-3 h-px w-full bg-[var(--color-border)]">
          <div ref={progressFillRef} className="h-px bg-terracotta" style={{ width: "0%" }} />
        </div>
      </div>
    </div>
  );
}

/**
 * Below `lg`, and under reduced motion at any width: a normal, premium
 * vertical editorial sequence — no pinning, no forced heights, no
 * sideways swipe requirement. Reuses the already-approved standalone
 * section components for Hero/Consult/Multidisciplinary-Care/CTA
 * verbatim, adds the doctor list (alternating portrait/text, same rhythm
 * the desktop track's own variant cycle carries) and a plain vertical
 * form section — "maintain: Hero, Founder, Clinical Doctors, Allied Care,
 * Consult Guidance, Connected Care, CTA, Form, Footer," per the brief,
 * mapped onto this page's own real content the same way the desktop
 * track is (see this file's own top comment).
 */
function DoctorsVerticalJourney() {
  return (
    <>
      <DoctorsHero />
      <DoctorsVerticalDoctorList />
      <MultidisciplinaryCare />
      <WhoShouldYouConsult />
      <DoctorsAppointmentCta />
      <DoctorsEnquiryFormSection />
    </>
  );
}

/** Alignment + mobile-horizontal rework: a short, local, static thread
 * fragment shown only below `sm` — the brief's own "no huge desktop
 * thread SVG on mobile, one short local segment per scene instead."
 * Purely decorative (`aria-hidden`), no motion, so nothing to gate on
 * reduced motion beyond what's already true of a static line. Mirrors
 * for the `imageOnRight` case via `scale-x-[-1]` rather than a second
 * authored path. */
function MobileThreadFragment({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 32"
      preserveAspectRatio="none"
      className={cx("h-4 w-full text-terracotta/35 sm:hidden", flip && "scale-x-[-1]")}
    >
      <path d="M 4 6 C 40 6, 50 26, 116 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function DoctorsVerticalDoctorList() {
  return (
    <section aria-label="The people behind the care" className="relative isolate bg-paper">
      <div className="container-birthwave py-(--space-section-sm)">
        <p className="eyebrow">{doctorsJourneyIntro.eyebrow}</p>
        <h2 className="mt-4 max-w-2xl text-[clamp(2rem,1.6rem+2vw,2.9rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {doctorsJourneyIntro.heading}
        </h2>
      </div>

      <div className="container-birthwave flex flex-col gap-16 pb-(--space-section) sm:gap-20">
        {doctors.map((doctor, index) => {
          const imageOnRight = index % 2 === 1;
          const gradient = [
            "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-terracotta) 100%)",
            "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-sky) 100%)",
            "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-coral) 100%)",
          ][index % 3];
          return (
            <div
              key={doctor.slug}
              className={cx(
                "flex flex-col sm:grid sm:grid-cols-2 sm:items-center sm:gap-10",
                imageOnRight && "sm:[&>*:first-child]:col-start-2 sm:[&>*:first-child]:row-start-1",
              )}
            >
              {/* Below `sm`: an offset composition, not a centered stack
                  — the portrait bleeds from one edge at ~76vw (alternating
                  sides with `imageOnRight`, same rhythm the desktop
                  track's own variant cycle carries), overlapping down
                  slightly past the identity block that follows it via the
                  thread fragment's own negative margin below, so the eye
                  still travels across the composition rather than reading
                  two centered, unrelated blocks. `sm`+ clears the offset
                  width/alignment entirely, back to the original centered
                  two-column grid. */}
              <MediaPlaceholder
                alt={doctor.photo.alt}
                gradient={gradient}
                corner={imageOnRight ? "tl" : "tr"}
                aspect="aspect-[4/5]"
                className={cx("w-[76vw] sm:mx-0 sm:w-full", imageOnRight ? "ml-auto" : "mr-auto")}
              />
              <MobileThreadFragment flip={imageOnRight} />
              <div className="-mt-2 sm:mt-0">
                <span className="font-display text-lg font-semibold" style={{ color: accentVar(index) }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 uppercase">
                  {doctor.role}
                </p>
                <h3 className="mt-2 text-2xl leading-[1.1] font-semibold text-ink sm:text-3xl">{doctor.name}</h3>
                {doctor.credentials ? <p className="mt-2 font-medium text-terracotta-deep">{doctor.credentials}</p> : null}
                {doctor.philosophy ? (
                  <p className="mt-4 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{doctor.philosophy}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DoctorsEnquiryFormSection() {
  return (
    <section
      id="doctors-enquiry"
      aria-labelledby="doctors-enquiry-heading"
      className="relative isolate bg-paper-dim section-pad"
    >
      <div className="container-birthwave grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <div className="max-w-md">
          <p className="eyebrow">{doctorsEnquiryForm.eyebrow}</p>
          <h2
            id="doctors-enquiry-heading"
            className="mt-4 text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] leading-[1.1] font-semibold text-ink"
          >
            {doctorsEnquiryForm.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{doctorsEnquiryForm.supporting}</p>
        </div>

        <DoctorsEnquiryForm />
      </div>
    </section>
  );
}
