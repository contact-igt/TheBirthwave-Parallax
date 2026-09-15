"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceContent } from "@/content/services-content";
import { servicesShowcaseOrder, servicesShowcaseIntro, careChapterSceneRanges } from "@/content/services-content";
import { ServicesEditorialImage } from "./services-editorial-image";
import type { ServicesImageKey } from "@/content/services-imagery";
import { useReducedMotion } from "@/motion/reduced-motion";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { ensureScrollTriggerRegistered, gsap, ScrollTrigger } from "@/motion/gsap-scroll";
import { cx } from "@/lib/cx";
import {
  SERVICES_DESKTOP_QUERY,
  PROTOTYPE_SCENE_COUNT,
  PROTOTYPE_TRACK_VH,
  SHOWCASE_WRAPPER_ID,
  CARE_CHAPTER_WASH,
  TEXT_DRIFT_PX,
  IMAGE_DRIFT_PX,
  IMAGE_SCALE_REST,
  getShowcaseState,
  sceneActivation,
} from "@/motion/services-showcase";

/**
 * Section 03 — Sticky Treatment Showcase (Our Care / Treatments,
 * existing-page refinement). ONE vertical scroll, ONE sticky `100svh`
 * split-screen stage — not 11 separately pinned sections, not Doctors'
 * own horizontal track (locked), not About's own scrubbed-video canvas
 * (locked), no thread line.
 *
 * EXECUTION GATE: only the first `PROTOTYPE_SCENE_COUNT` (3) presentation
 * scenes — Chapter 1, Before/Women's Health — are wired into the PINNED
 * crossfade below; that scene count and its 90vh/scene timing are
 * unchanged from the approved prototype. All 11 are visibly presented on
 * desktop, though: `ShowcaseDesktopContinuation` renders presentation
 * entries 4–11 as normal-flow editorial rows (reusing
 * `ServiceRowVertical`, the same component/layout the fallback below
 * already uses) immediately after the pinned stage releases — no pin, no
 * reserved scroll distance, plain document flow. This fixes a real,
 * confirmed gap: the pinned stage only ever showed 3, and the full
 * 11-item vertical fallback is deliberately hidden whenever the pinned
 * stage is eligible (see below), so the other 8 previously had no
 * on-page editorial presentation on an eligible desktop viewport at
 * all — reachable only via Quick Overview's own direct links, never
 * something a visitor would scroll past. Raising `PROTOTYPE_SCENE_COUNT`
 * would fold entries back into the pin; that isn't done here — the
 * three-scene prototype and its timing stay exactly as approved, this
 * only fixes what happens with the OTHER 8 after it releases.
 *
 * PROGRESS OWNERSHIP — one `ScrollTrigger.create`, `pin` on the `100svh`
 * stage, `start: "top top"`, `end: "+=" + PROTOTYPE_TRACK_VH + "%"`,
 * direct `scrub: true` (no smoothing lag to reconcile against the pin's
 * own release — "use direct scrub initially," per the brief). `onUpdate`
 * reads `self.progress` once and derives every layer (text opacity/
 * transform, image opacity/transform, chapter wash opacity, the counter)
 * from that SAME value each tick — never a second, independently
 * smoothed progress source for some layers and raw scroll for others.
 *
 * ACCESSIBILITY: each scene's own wrapper toggles real `aria-hidden` +
 * `tabIndex={-1}`/`inert` alongside its opacity, not just
 * `pointer-events: none` — an inactive scene's own "Explore Care" link
 * is CSS-invisible either way, but without this a keyboard user could
 * still Tab into it, land on an unreadable link, and have no idea what
 * just received focus. `inert` (supported in every evergreen browser
 * this site otherwise targets) also removes it from the accessibility
 * tree entirely, not just the tab order. Every "Explore Care" link
 * additionally carries an `aria-label` naming its own service — the
 * visible text repeats verbatim across scenes, so without this a
 * screen-reader user tabbing through would hear "Explore Care, Explore
 * Care, Explore Care" with no way to tell them apart.
 *
 * Below the combined width+height desktop query (`SERVICES_DESKTOP_QUERY`
 * — see services-showcase.ts's own comment on why height is part of it
 * now), and under `prefers-reduced-motion: reduce` at any size:
 * `ServicesShowcaseVertical` renders instead — no pin, no crossfade, all
 * 11 services in normal document flow with a one-shot reveal per row.
 */
export function ServicesStickyShowcase() {
  // Starts `true` (matches the pure-CSS default below, so there's no
  // hydration mismatch) and only ever gets forced to `false` after a real
  // measurement inside `ShowcaseDesktop` finds a scene's own text content
  // taller than the box it has to fit in — see that component's own
  // content-fit effect. When forced false, BOTH branches below switch to
  // literal, unconditional classes (not the media-query-gated ones),
  // regardless of viewport, so an enlarged-text visitor on an otherwise
  // roomy desktop window still gets the safe, always-fits vertical
  // sequence instead of a clipped pinned stage.
  const [contentFits, setContentFits] = useState(true);

  return (
    <section id="treatment-showcase-section" aria-label="Treatment showcase" className="relative isolate">
      {/* Literal class strings throughout, never built via template-
          literal interpolation of a shared constant — Tailwind's JIT
          scanner does static text analysis of the source, it never
          executes JS, so a class name assembled at runtime is invisible
          to it and never gets compiled. Confirmed as a real, live bug
          this exact way once already (see git history): the desktop
          branch silently rendered at `display: none` at every viewport
          until its own arbitrary-variant class was written out literally
          instead of interpolated. */}
      <div className={contentFits ? "hidden motion-safe:[@media(min-width:1024px)_and_(min-height:700px)]:block" : "hidden"}>
        <ShowcaseDesktop contentFits={contentFits} onFitChange={setContentFits} />
        {/* Entries 4–11, immediately after the pinned stage releases —
            see this component's own top comment. Only ever rendered
            alongside `ShowcaseDesktop` (this same content-fit/media-query
            branch) — `ServicesShowcaseVertical` below already renders all
            11 on its own, so these two must never both be visible at
            once or entries 4–11 would duplicate. */}
        <ShowcaseDesktopContinuation />
      </div>
      <div className={contentFits ? "motion-safe:[@media(min-width:1024px)_and_(min-height:700px)]:hidden" : "block"}>
        <ServicesShowcaseVertical />
      </div>
    </section>
  );
}

function ShowcaseDesktop({
  contentFits,
  onFitChange,
}: {
  contentFits: boolean;
  onFitChange: (fits: boolean) => void;
}) {
  const reducedMotion = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const textStackRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const washRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const prototypeServices = servicesShowcaseOrder.slice(0, PROTOTYPE_SCENE_COUNT);

  // Content-fit check — a real measurement, not a guess. The width+height
  // media query (`SERVICES_DESKTOP_QUERY`) can't catch enlarged TEXT
  // specifically: browser "text only" zoom and aggressive font-size
  // overrides grow the text without shrinking `window.innerWidth`/
  // `innerHeight` at all, so that query still matches even though the
  // fixed-height pinned stage can no longer fit the content. Confirmed as
  // a real, reproducible failure, not assumed: doubling the root font-size
  // left a scene's own text content (567px) overflowing its column
  // (270px) by more than 2× while the pin stayed engaged and the text was
  // silently clipped by the stage's own `overflow-hidden` — exactly what
  // this effect exists to catch and correct, by reporting `fits=false`
  // up to `ServicesStickyShowcase`, which then forces the vertical
  // fallback unconditionally (see that component's own comment).
  // Re-measures on both a `ResizeObserver` (catches font-size-driven
  // reflow of the text content itself, which a plain `window.resize`
  // listener would miss — text zoom doesn't fire `resize`) and window
  // resize (catches ordinary viewport changes).
  useLayoutEffect(() => {
    if (reducedMotion) return;
    const stack = textStackRef.current;
    if (!stack) return;

    const measure = () => {
      const available = stack.clientHeight;
      if (available <= 0) return;
      let overflow = false;
      for (const child of Array.from(stack.children)) {
        const inner = child.firstElementChild as HTMLElement | null;
        if (inner && inner.scrollHeight > available) {
          overflow = true;
          break;
        }
      }
      onFitChange(!overflow);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stack);
    for (const child of Array.from(stack.children)) {
      if (child.firstElementChild) ro.observe(child.firstElementChild);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reducedMotion, onFitChange]);

  useEffect(() => {
    // Also gated on `contentFits`: if a later measurement (font-size
    // changed mid-session, window resized) flips this to `false` after
    // the pin was already created, this effect re-runs (it's a
    // dependency below) and its own cleanup kills the existing
    // ScrollTrigger/pin before the early return — no orphaned pin left
    // reserving scroll distance behind a `display: none` ancestor.
    if (reducedMotion || !contentFits) return;
    const pinEl = pinRef.current;
    if (!pinEl) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(SERVICES_DESKTOP_QUERY, () => {
        // A plain `ScrollTrigger.create`, not a `gsap.timeline` — every
        // scene's own opacity/transform is written directly from
        // `onUpdate` below, so there's no tween whose own playback
        // position this needs to drive.
        const trigger = ScrollTrigger.create({
          trigger: pinEl,
          pin: pinEl,
          start: "top top",
          end: `+=${PROTOTYPE_TRACK_VH}%`,
          // Direct scrub (see this component's own top comment) — the
          // visual state and the pin's own release point are driven by
          // the identical raw `self.progress`, so a fast scroll or fling
          // can never outrun the crossfade the way a smoothed `scrub`
          // number could.
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const { position, activeIndex } = getShowcaseState(self.progress, prototypeServices.length);

            prototypeServices.forEach((_, i) => {
              const distance = i - position;
              const a = sceneActivation(distance);
              const isActive = a > 0.5;
              const textEl = textRefs.current[i];
              const imageEl = imageRefs.current[i];
              if (textEl) {
                textEl.style.opacity = a.toFixed(3);
                textEl.style.transform = `translate3d(0, ${(distance * TEXT_DRIFT_PX).toFixed(2)}px, 0)`;
                // Real accessibility state, not just pointer-events — see
                // this file's own top comment.
                textEl.style.pointerEvents = isActive ? "auto" : "none";
                textEl.setAttribute("aria-hidden", isActive ? "false" : "true");
                if (isActive) {
                  textEl.removeAttribute("inert");
                } else {
                  textEl.setAttribute("inert", "");
                }
              }
              if (imageEl) {
                const scale = IMAGE_SCALE_REST - (IMAGE_SCALE_REST - 1) * a;
                imageEl.style.opacity = a.toFixed(3);
                imageEl.style.transform = `translate3d(0, ${(distance * IMAGE_DRIFT_PX).toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
              }
            });

            Object.entries(careChapterSceneRanges).forEach(([chapterId, [start, end]]) => {
              const washEl = washRefs.current[chapterId];
              if (!washEl) return;
              // Ranges are computed against the FULL 11-service order;
              // clamp against however many scenes this prototype actually
              // wires up so a chapter entirely past the prototype's own
              // scope (start beyond `prototypeServices.length`) simply
              // never lights up rather than producing a stale/incorrect
              // wash.
              if (start >= prototypeServices.length) {
                washEl.style.opacity = "0";
                return;
              }
              const distanceOutside = position < start ? start - position : position > end + 1 ? position - (end + 1) : 0;
              washEl.style.opacity = Math.max(0, 1 - distanceOutside).toFixed(3);
            });

            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${(self.progress * 100).toFixed(2)}%`;
            }
            if (counterRef.current) {
              counterRef.current.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(prototypeServices.length).padStart(2, "0")}`;
            }
          },
        });

        return () => {
          trigger.kill();
        };
      });
    }, pinEl);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- prototypeServices is a stable slice of a module-level constant array
  }, [reducedMotion, contentFits]);

  return (
    <div id={SHOWCASE_WRAPPER_ID} className="relative">
      <div
        ref={pinRef}
        className="relative isolate h-svh w-full overflow-hidden bg-paper"
        style={
          {
            "--care-scene-gap": "clamp(3rem, 5vw, 6rem)",
            "--care-content-width": "42%",
          } as CSSProperties
        }
      >
        {/* Chapter-mood background washes — layered, static gradients;
            only their OPACITY is written per frame (see onUpdate above),
            never a recomputed gradient string. No thread line. */}
        {Object.entries(CARE_CHAPTER_WASH).map(([chapterId, gradient]) => (
          <div
            key={chapterId}
            ref={(el) => {
              washRefs.current[chapterId] = el;
            }}
            aria-hidden="true"
            className="absolute inset-0 z-0"
            // Chapter "before" owns scene 0, so it starts visible instead
            // of every wash starting blank before hydration.
            style={{ backgroundImage: gradient, opacity: chapterId === "before" ? 1 : 0 }}
          />
        ))}

        <div className="container-birthwave relative z-10 flex h-full flex-col justify-center py-20">
          <div className="mb-8 max-w-xl">
            <p className="eyebrow">{servicesShowcaseIntro.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">{servicesShowcaseIntro.heading}</h2>
          </div>

          <div
            className="relative grid flex-1 items-center lg:grid-cols-[minmax(0,var(--care-content-width))_1fr]"
            style={{ gap: "var(--care-scene-gap)" }}
          >
            <div ref={textStackRef} className="relative h-full min-h-0">
              {prototypeServices.map((service, i) => (
                <TreatmentText
                  key={service.slug}
                  service={service}
                  index={i}
                  total={prototypeServices.length}
                  textRef={(el) => {
                    textRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
            {/* `overflow-hidden` — the image's own small scale/y-drift
                (see onUpdate) must never expose a frame edge; this is
                what clips it, not a coincidence of the placeholder's own
                sizing. */}
            <div className="relative h-full min-h-0 overflow-hidden rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs">
              {prototypeServices.map((service, i) => (
                <TreatmentImage
                  key={service.slug}
                  service={service}
                  imageRef={(el) => {
                    imageRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress — a thin line and a small "01 / 03" counter. This is
            the PRESENTATION position within this prototype's own scene
            count, never the service's original 01–11 id — the two are
            never conflated anywhere in this file. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 px-10 xl:px-16">
          <span className="font-display text-xs font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 tabular-nums">
            <span ref={counterRef}>01 / {String(prototypeServices.length).padStart(2, "0")}</span>
          </span>
          <div className="mt-3 h-px w-full bg-[var(--color-border)]">
            <div ref={progressFillRef} className="h-px bg-terracotta" style={{ width: "0%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Desktop-eligible continuation — presentation entries 4–11
 * (`servicesShowcaseOrder.slice(PROTOTYPE_SCENE_COUNT)`), immediately
 * after the pinned three-scene stage in document order, so they become
 * visible in normal flow exactly as the pinned stage releases — no gap,
 * no separate reserved distance. Reuses `ServiceRowVertical` unchanged
 * (the same component/markup the fallback below renders all 11 through)
 * and `servicesShowcaseOrder` unchanged — no new layout, no second data
 * source. `index` is each service's own REAL position in the full
 * 11-item order (3–10), not a restarted 0-based count, so
 * `ServiceRowVertical`'s own `index + 1` numbering continues correctly
 * at "04" rather than resetting to "01".
 */
function ShowcaseDesktopContinuation() {
  const continuation = servicesShowcaseOrder.slice(PROTOTYPE_SCENE_COUNT);
  return (
    <div id="treatment-showcase-continuation" className="container-birthwave section-pad">
      <div className="flex flex-col gap-16 sm:gap-20">
        {continuation.map((service, i) => (
          <ServiceRowVertical key={service.slug} service={service} index={i + PROTOTYPE_SCENE_COUNT} />
        ))}
      </div>
    </div>
  );
}

function TreatmentText({
  service,
  index,
  total,
  textRef,
}: {
  service: ServiceContent;
  index: number;
  total: number;
  textRef: (el: HTMLDivElement | null) => void;
}) {
  const number = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <div
      ref={textRef}
      className="absolute inset-0 flex items-center will-change-transform"
      // Scene 0 starts at opacity 1 and fully in the accessibility tree
      // (every other scene at 0/inert) so the very first server-rendered
      // paint already shows the opening treatment, readable and
      // reachable, instead of a blank stage; `onUpdate` overwrites this
      // on its very first tick regardless of which scene is actually
      // active once JS takes over.
      style={{ opacity: index === 0 ? 1 : 0 }}
      aria-hidden={index === 0 ? "false" : "true"}
      inert={index !== 0}
    >
      {/* One consistent composition for every scene — no oversized index
          number behind the text, no background word behind the image, no
          dual-image variant. */}
      <div className="relative max-w-md">
        <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 uppercase">
          {number} / {totalStr} — {service.eyebrow}
        </span>
        <h3 className="mt-3 text-[clamp(1.9rem,1.5rem+1.6vw,2.75rem)] leading-[1.1] font-semibold text-ink">
          {service.name}
        </h3>
        {/* ~40–44 characters per line, per the brief — `ch` is literally
            "characters" as a CSS unit, so this is a direct expression of
            that target rather than an approximated px/rem value. */}
        <p className="mt-4 max-w-[42ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">
          {service.shortDescription}
        </p>
        <div className="mt-7">
          <Link
            href={`/services/${service.slug}`}
            aria-label={`Explore Care: ${service.name}`}
            className="group inline-flex items-center gap-1.5 font-body text-base font-semibold text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
          >
            <span aria-hidden="true" className="border-b border-current/40 pb-0.5 group-hover:border-current">
              Explore Care
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function TreatmentImage({
  service,
  imageRef,
}: {
  service: ServiceContent;
  imageRef: (el: HTMLDivElement | null) => void;
}) {

  return (
    <div ref={imageRef} className="absolute inset-0 will-change-transform" style={{ opacity: 0 }} aria-hidden="true">
      <ServicesEditorialImage imageKey={service.slug as ServicesImageKey} eager sizes="(min-width: 1024px) 560px, 85vw" corner="tr" aspect="h-full w-full" />
    </div>
  );
}

/**
 * Below the desktop+height query, under reduced motion, and under text
 * enlargement severe enough that the pinned stage can't stay readable —
 * a premium, non-pinned vertical sequence: no sticky `100svh` system, no
 * scroll-scrubbed crossfade. ALL 11 services render here, once, in
 * presentation order — this is the ONLY place all 11 appear together on
 * these paths, so it renders the full list itself rather than relying on
 * `ShowcaseDesktopContinuation` (which is desktop-pin-only, and must
 * never render alongside this or entries 4–11 would duplicate).
 * Alternating left/right offset composition, one-shot reveal-on-scroll
 * per row (`useScrollReveal`) — the same component
 * `ShowcaseDesktopContinuation` also reuses for entries 4–11 on the
 * pinned-eligible path.
 */
function ServicesShowcaseVertical() {
  return (
    <div id={`${SHOWCASE_WRAPPER_ID}-vertical`} className="container-birthwave section-pad">
      <div className="max-w-2xl">
        <p className="eyebrow">{servicesShowcaseIntro.eyebrow}</p>
        <h2 className="mt-4 text-[clamp(2rem,1.6rem+2vw,2.9rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {servicesShowcaseIntro.heading}
        </h2>
      </div>

      <div className="mt-16 flex flex-col gap-16 sm:gap-20">
        {servicesShowcaseOrder.map((service, index) => (
          <ServiceRowVertical key={service.slug} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}

function ServiceRowVertical({ service, index }: { service: ServiceContent; index: number }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();
  const imageOnRight = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={cx(
        "flex flex-col transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-signature)] sm:grid sm:grid-cols-2 sm:items-center sm:gap-10 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        imageOnRight && "sm:[&>*:first-child]:col-start-2 sm:[&>*:first-child]:row-start-1",
        revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <ServicesEditorialImage
        imageKey={service.slug as ServicesImageKey}
        corner={imageOnRight ? "tl" : "tr"}
        aspect="aspect-[4/5]"
        className={cx("w-[76vw] sm:mx-0 sm:w-full", imageOnRight ? "ml-auto" : "mr-auto")}
      />
      <div className="-mt-2 sm:mt-0">
        <span className="font-display text-lg font-semibold text-terracotta">{String(index + 1).padStart(2, "0")}</span>
        <p className="mt-3 font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 uppercase">
          {service.eyebrow}
        </p>
        <h3 className="mt-2 text-2xl leading-[1.1] font-semibold text-ink sm:text-3xl">{service.name}</h3>
        <p className="mt-4 max-w-[44ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">
          {service.shortDescription}
        </p>
        <div className="mt-6">
          <Link
            href={`/services/${service.slug}`}
            aria-label={`Explore Care: ${service.name}`}
            className="group inline-flex items-center gap-1.5 font-body text-base font-semibold text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
          >
            <span aria-hidden="true" className="border-b border-current/40 pb-0.5 group-hover:border-current">
              Explore Care
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
