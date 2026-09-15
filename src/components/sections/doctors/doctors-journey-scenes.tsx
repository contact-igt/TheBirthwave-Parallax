"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DoctorContent } from "@/content/doctors-content";
import {
  doctorsHero,
  doctorsJourneyIntro,
  multidisciplinaryCare,
  whoShouldYouConsult,
  doctorsAppointmentCta,
  doctorsEnquiryForm,
} from "@/content/doctors-content";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { CtaLink } from "@/components/ui/cta-link";
import { Button } from "@/components/ui/button";
import { DoctorsEnquiryForm } from "@/components/sections/doctors/doctors-enquiry-form";
import { accentVar } from "@/lib/accent-tint";
import { cx } from "@/lib/cx";

/**
 * Desktop-only scene library for the master horizontal track
 * (`doctors-master-journey.tsx`). Every scene below is pure presentation —
 * no GSAP, no ScrollTrigger, no refs to individual layers. Each internal
 * layer that should drift or settle as the scene crosses the viewport
 * carries a `data-parallax-layer`/`data-parallax-settle` attribute
 * instead; the master track's own single `onUpdate` loop reads a scene's
 * real `getBoundingClientRect()` once per tick and applies every one of
 * its layers' transforms from that one measurement — "all internal
 * parallax derives mathematically from master progress and scene position
 * relative to viewport centre," not a per-scene mechanism.
 *
 * The mobile/reduced-motion path never renders any of this — it reuses
 * the existing standalone section components
 * (doctors-hero.tsx/who-should-you-consult.tsx/multidisciplinary-care.tsx/
 * doctors-appointment-cta.tsx) plus a plain vertical form section, all
 * already built for normal document flow.
 */

const APPOINTMENT_HREF = "/#connect";

const SCENE_GRADIENTS = [
  "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-terracotta) 100%)",
  "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-sky) 100%)",
  "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-coral) 100%)",
] as const;

type LayerKind = "primaryPortrait" | "secondaryImage" | "textContent" | "indexNumber" | "backgroundWord";

/** One drifting/settling layer. `settle` additionally opts a layer into
 * the scale/opacity reveal as its scene nears centre (portraits only —
 * text, numerals and background words only ever drift, they never scale
 * or fade by proximity). */
function ParallaxLayer({
  kind,
  settle = false,
  className,
  style,
  children,
}: {
  kind: LayerKind;
  settle?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      data-parallax-layer={kind}
      data-parallax-settle={settle ? "true" : undefined}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

function DoctorActions({ doctor, align = "left" }: { doctor: DoctorContent; align?: "left" | "right" }) {
  return (
    <div className={cx("mt-8 flex flex-wrap items-center gap-x-7 gap-y-3", align === "right" && "justify-end")}>
      <Link
        href={`/doctors/${doctor.slug}`}
        className="group inline-flex items-center gap-1.5 font-body text-base font-semibold text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink"
      >
        <span className="border-b border-current/40 pb-0.5 group-hover:border-current">View Profile</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
      <CtaLink href={APPOINTMENT_HREF}>Book Appointment</CtaLink>
    </div>
  );
}

function CareAreas({ careAreas, align = "left" }: { careAreas?: string[]; align?: "left" | "right" }) {
  if (!careAreas || careAreas.length === 0) return null;
  return (
    <ul className={cx("mt-5 flex flex-wrap items-center gap-x-3 gap-y-2", align === "right" && "justify-end")}>
      {careAreas.map((area, i) => (
        <li key={area} className="flex items-center gap-3">
          {i > 0 ? (
            <span aria-hidden="true" className="text-ink-soft/40">
              /
            </span>
          ) : null}
          <span className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
            {area}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------
// 01 — Hero
// ---------------------------------------------------------------------

export function HeroScene() {
  return (
    <div
      className="relative flex h-full w-full items-center overflow-hidden"
      style={{ paddingTop: "var(--header-height)" }}
    >
      <ParallaxLayer
        kind="backgroundWord"
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 text-center select-none"
      >
        <span
          aria-hidden="true"
          className="font-display text-[16vw] leading-none font-semibold tracking-[var(--tracking-tight)] text-terracotta/[0.08] uppercase"
        >
          {doctorsHero.eyebrow}
        </span>
      </ParallaxLayer>

      <div className="container-birthwave relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-[var(--doctor-scene-gap)]">
        <ParallaxLayer kind="textContent" className="max-w-xl">
          <p className="eyebrow">{doctorsHero.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2.5rem,1.9rem+3.2vw,4.25rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {doctorsHero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{doctorsHero.supporting}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={doctorsHero.primaryCta.href} variant="primary">
              {doctorsHero.primaryCta.label}
            </Button>
            <CtaLink href={doctorsHero.secondaryCta.href}>{doctorsHero.secondaryCta.label}</CtaLink>
          </div>
        </ParallaxLayer>

        {/* Alignment rework: h-[62vh] (a viewport-height value, unrelated
            to the scene's own vertical centering) replaced with the shared
            `--doctor-media-height` token, applied the same way every other
            scene's own media block now reads it — keeps this block's
            reveal centered with real top/bottom margin instead of nearly
            filling the scene height, and gives the thread's own safe zone
            (doctors-master-journey.tsx) genuine clearance below it. */}
        <div className="relative h-[var(--doctor-media-height)] max-h-[560px]">
          <ParallaxLayer kind="primaryPortrait" settle className="absolute inset-0 h-full w-[78%]">
            <MediaPlaceholder alt={doctorsHero.media.alt} gradient={SCENE_GRADIENTS[0]} corner="tr" aspect="h-full w-full" />
          </ParallaxLayer>
          <ParallaxLayer
            kind="secondaryImage"
            settle
            className="absolute -top-[6%] right-[-9%] h-[38%] w-[38%] shadow-[0_1.5rem_3rem_-1.5rem_rgba(36,26,23,0.35)]"
          >
            <MediaPlaceholder
              alt="Care team, detail — approved photography pending"
              gradient={SCENE_GRADIENTS[1]}
              corner="tr"
              aspect="h-full w-full"
            />
          </ParallaxLayer>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Interstitial — the short, deliberate hold between Hero and the doctor
// scenes ("SECTION START" beat, `doctorsJourneyIntro`). A slim panel, not
// a full scene: large quiet type, the connecting line passing behind it,
// nothing else competing for attention.
// ---------------------------------------------------------------------

export function InterstitialScene() {
  return (
    <div className="flex h-full w-full items-center justify-center px-10">
      <div className="max-w-xs text-center">
        <p className="eyebrow">{doctorsJourneyIntro.eyebrow}</p>
        <ParallaxLayer kind="textContent">
          <p className="mt-4 text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)] leading-[1.2] font-semibold text-ink">
            {doctorsJourneyIntro.heading}
          </p>
        </ParallaxLayer>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 02 — Doctor scenes: five alternating editorial variants, cycling by
// `index % 5` (see `DOCTOR_SCENE_VARIANT_COUNT`) — a repeating system so
// however many real doctors eventually exist read as one intentional
// sequence, not a portfolio grab-bag. Only variant 0 renders today
// (doctors-content.ts has exactly one real entry).
// ---------------------------------------------------------------------

export function DoctorScene({ doctor, index, variant }: { doctor: DoctorContent; index: number; variant: number }) {
  const number = String(index + 1).padStart(2, "0");
  const gradient = SCENE_GRADIENTS[index % SCENE_GRADIENTS.length];
  const accent = accentVar(index);

  const portrait = (aspect: string, corner: "tr" | "tl" | "br" | "bl" = "tr", secondary = false) => (
    <ParallaxLayer kind={secondary ? "secondaryImage" : "primaryPortrait"} settle className="h-full w-full">
      <MediaPlaceholder alt={doctor.photo.alt} gradient={gradient} corner={corner} aspect={cx(aspect, "h-full w-full")} />
    </ParallaxLayer>
  );

  const indexNumeral = (className: string) => (
    <ParallaxLayer kind="indexNumber">
      <span
        aria-hidden="true"
        className={cx("pointer-events-none font-display leading-none font-semibold tabular-nums", className)}
        style={{ color: accent }}
      >
        {number}
      </span>
    </ParallaxLayer>
  );

  const specialtyWord = (align: "left" | "right") => (
    <ParallaxLayer
      kind="backgroundWord"
      className={cx(
        "pointer-events-none absolute inset-y-0 z-0 flex items-center select-none",
        align === "left" ? "left-0" : "right-0",
      )}
    >
      <span
        aria-hidden="true"
        className="font-display text-[7vw] leading-none font-semibold tracking-[var(--tracking-tight)] uppercase"
        style={{ color: accent, opacity: 0.08 }}
      >
        {doctor.role}
      </span>
    </ParallaxLayer>
  );

  const nameBlock = (align: "left" | "right" = "left") => (
    <ParallaxLayer kind="textContent" className={align === "right" ? "text-right" : "text-left"}>
      <p className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 uppercase">
        {doctor.role}
      </p>
      <h2 className="mt-2 text-[clamp(1.9rem,1.5rem+1.6vw,2.75rem)] leading-[1.08] font-semibold text-ink">{doctor.name}</h2>
      {doctor.credentials ? <p className="mt-2 font-medium text-terracotta-deep">{doctor.credentials}</p> : null}
      {doctor.philosophy ? (
        <p className="mt-5 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{doctor.philosophy}</p>
      ) : null}
      <CareAreas careAreas={doctor.careAreas} align={align} />
      <DoctorActions doctor={doctor} align={align} />
    </ParallaxLayer>
  );

  let content: ReactNode;

  if (variant === 0) {
    // Portrait left / text right. The background word sits behind the
    // portrait (left), not the text column (right) — confirmed via QA
    // screenshot as a real legibility bug when the two shared a side: the
    // giant low-opacity role word ran directly through the readable
    // credentials line.
    content = (
      <div className="relative grid h-full grid-cols-[0.85fr_1fr] items-center gap-[var(--doctor-scene-gap)] px-10 xl:px-16">
        {specialtyWord("left")}
        <div className="relative z-10 h-[var(--doctor-media-height)] self-center">{portrait("aspect-[4/5]")}</div>
        <div className="relative z-10 max-w-md">
          <div className="mb-2">{indexNumeral("text-xl")}</div>
          {nameBlock("left")}
        </div>
      </div>
    );
  } else if (variant === 1) {
    // Text left / portrait right — background word behind the portrait.
    content = (
      <div className="relative grid h-full grid-cols-[1fr_0.85fr] items-center gap-[var(--doctor-scene-gap)] px-10 xl:px-16">
        {specialtyWord("right")}
        <div className="relative z-10 max-w-md justify-self-end text-right">
          <div className="mb-2">{indexNumeral("text-xl")}</div>
          {nameBlock("right")}
        </div>
        <div className="relative z-10 h-[var(--doctor-media-height)] self-center justify-self-end">{portrait("aspect-[4/5]", "tl")}</div>
      </div>
    );
  } else if (variant === 2) {
    // Oversized portrait, full-bleed, text overlaid in negative space.
    content = (
      <div className="relative h-full w-full">
        <div className="absolute inset-0">{portrait("h-full w-full", "tr")}</div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(100deg, color-mix(in srgb, var(--color-paper) 92%, transparent) 0%, color-mix(in srgb, var(--color-paper) 55%, transparent) 32%, transparent 58%)",
          }}
        />
        <div className="relative z-10 flex h-full max-w-md flex-col justify-center px-10 xl:px-16">
          <div className="mb-2">{indexNumeral("text-xl")}</div>
          {nameBlock("left")}
        </div>
      </div>
    );
  } else if (variant === 3) {
    // Portrait lower-right / large index typography dominant.
    content = (
      <div className="relative h-full w-full px-10 xl:px-16">
        <div className="absolute top-1/2 left-10 -translate-y-1/2 xl:left-16">
          {indexNumeral("text-[16rem] leading-none tracking-tighter opacity-30 xl:text-[20rem]")}
        </div>
        {/* Bottom-anchored by design (`items-end`/`self-end` — this
            variant's own "portrait lower-right" idea, unchanged), but the
            bottom padding is deliberately taller than the other variants'
            own `py-16` now: `self-end` measures from the padded row's own
            bottom edge, and at the old `pb-16` (64px) that put the
            portrait's own bottom edge within a few percent of the
            thread's safe-zone band below it. `pb-28` clears it with real
            margin, confirmed by screenshot alongside the other variants. */}
        <div className="relative z-10 grid h-full grid-cols-[1.1fr_0.9fr] items-end gap-[var(--doctor-scene-gap)] pt-16 pb-28">
          <div className="max-w-md self-center">{nameBlock("left")}</div>
          <div className="relative h-[56%] self-end justify-self-end">{portrait("aspect-[3/4]", "br")}</div>
        </div>
      </div>
    );
  } else {
    // Wide portrait / narrow editorial text column — background word
    // behind the (wide) portrait, same side as it, not the text.
    content = (
      <div className="relative grid h-full grid-cols-[1.3fr_0.7fr] items-center gap-[var(--doctor-scene-gap)] px-10 xl:px-16">
        {specialtyWord("left")}
        <div className="relative z-10 h-[var(--doctor-media-height)] self-center">{portrait("h-full w-full", "tl")}</div>
        <div className="relative z-10 max-w-xs">
          <div className="mb-2">{indexNumeral("text-xl")}</div>
          {nameBlock("left")}
        </div>
      </div>
    );
  }

  return content;
}

// ---------------------------------------------------------------------
// Allied Care / Connected Care — merged into one wide (125vw) editorial
// chapter (see doctors-master-journey.tsx's own top comment for why:
// doctors-content.ts has exactly one real content block covering both
// concepts — "multiple specialists, one connected journey" — and
// splitting it into two panels would mean showing the same seven stage
// labels twice under two different headings). No card grid, no invented
// team-member names or portraits standing in for a roster that doesn't
// exist yet: the placeholder panels below are captioned the same honest
// way `doctors-content.ts`'s own single entry is. The seven care stages
// sit as small nodes directly on the shared connecting line rather than
// a separate static rule — "integrate the stages into the same
// horizontal visual thread," per the brief.
// ---------------------------------------------------------------------

export function AlliedConnectedScene() {
  return (
    <div className="relative flex h-full w-full items-center px-10 xl:px-16">
      <div className="grid h-full w-full grid-cols-[0.62fr_1.38fr] items-center gap-[var(--doctor-scene-gap)]">
        <ParallaxLayer kind="textContent" className="max-w-md">
          <p className="eyebrow">{multidisciplinaryCare.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {multidisciplinaryCare.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{multidisciplinaryCare.intro}</p>
        </ParallaxLayer>

        {/* Alignment rework: h-[80%] → the shared `--doctor-media-height`
            token (62%, down from 80%) AND the internal zone spans below
            are tightened (primary's own bottom moved from 58%→54%, the
            bottom-left secondary's own top moved from 66%→60%, closing
            the gap between them from 8% to 6% of a now-smaller zone) —
            together these are what actually fixes the reported "secondary
            image appears detached": at the old 80%-tall/8%-gap zone the
            two boxes read as two unrelated floating rectangles; the
            smaller, tighter zone reads as one clustered group, confirmed
            by screenshot. `left-[10%]` → `left-[4%]` also brings the
            bottom-left box more directly under the primary block's own
            left edge instead of offset further right, reinforcing that
            it's anchored to the same group rather than a separate one. */}
        <div className="relative h-[var(--doctor-media-height)] w-full">
          {/* Three placeholder blocks in explicitly non-overlapping zones
              (confirmed by the zone math itself, not just by eye — an
              earlier draft placed the two secondary boxes almost directly
              on top of the primary one and each other, confirmed as a
              real collision via QA screenshot): primary top-left
              (y 0–54%, x 0–44%), a medium box top-right (y 0–36%,
              x 70–100%, clear of primary by a 26%-wide gap), and a small
              box bottom-left (y 60–94%, x 4–30%, clear of primary by a
              6%-tall gap and of the top-right box by not sharing either
              axis range). */}
          <ParallaxLayer kind="primaryPortrait" settle className="absolute top-0 left-0 h-[54%] w-[44%]">
            <MediaPlaceholder
              alt="Care team, in practice — approved photography pending"
              gradient={SCENE_GRADIENTS[1]}
              corner="tr"
              aspect="h-full w-full"
            />
          </ParallaxLayer>
          <ParallaxLayer kind="secondaryImage" settle className="absolute top-0 right-0 h-[36%] w-[30%]">
            <MediaPlaceholder
              alt="Allied care specialist — approved photography pending"
              gradient={SCENE_GRADIENTS[2]}
              corner="tr"
              aspect="h-full w-full"
            />
          </ParallaxLayer>
          <ParallaxLayer kind="secondaryImage" settle className="absolute top-[60%] left-[4%] h-[34%] w-[26%]">
            <MediaPlaceholder
              alt="Allied care specialist — approved photography pending"
              gradient={SCENE_GRADIENTS[0]}
              corner="bl"
              aspect="h-full w-full"
            />
          </ParallaxLayer>

          {/* Seven stage nodes riding the shared connecting line, evenly
              spaced across this panel's own width, in the open band
              between the primary/top-right boxes above and the
              bottom-left box below (y 54–60%) — clear of all three. */}
          <ul className="absolute inset-x-0 top-[57%] flex items-center justify-between">
            {multidisciplinaryCare.stages.map((stage, index) => (
              <li key={stage} className="flex flex-col items-center gap-2" style={{ width: `${100 / multidisciplinaryCare.stages.length}%` }}>
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full ring-4 ring-paper"
                  style={{ backgroundColor: accentVar(index) }}
                />
                <span className="text-center font-body text-xs font-semibold tracking-[var(--tracking-wide)] text-ink-soft uppercase">
                  {stage}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Who Should You Consult — calmer and text-led, per the brief. All eight
// real concerns (whoShouldYouConsult.concerns) shown at once as a compact
// 2x4 grid rather than the vertical page's spacious single column — a
// pinned horizontal panel only has one viewport's worth of height to work
// with, so density comes from the extra width instead.
// ---------------------------------------------------------------------

export function ConsultScene() {
  return (
    <div className="relative flex h-full w-full items-center px-10 xl:px-16">
      <div className="grid h-full w-full grid-cols-[0.55fr_1.45fr] items-center gap-[var(--doctor-scene-gap)]">
        <ParallaxLayer kind="textContent" className="max-w-sm">
          <p className="eyebrow">{whoShouldYouConsult.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.5rem+1.8vw,2.6rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {whoShouldYouConsult.heading}
          </h2>
          <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">{whoShouldYouConsult.intro}</p>
          <div className="mt-7">
            <CtaLink href={whoShouldYouConsult.cta.href}>{whoShouldYouConsult.cta.label}</CtaLink>
          </div>
        </ParallaxLayer>

        <ParallaxLayer kind="textContent" className="grid grid-cols-2 gap-x-10 border-t border-[var(--color-border)]">
          {whoShouldYouConsult.concerns.map((concern) => (
            <div key={concern.question} className="border-b border-[var(--color-border)] py-4">
              <p className="text-base leading-[1.3] font-semibold text-ink">{concern.question}</p>
              <p className="mt-1.5 text-sm leading-[1.5] text-ink-soft">{concern.guidance}</p>
            </div>
          ))}
        </ParallaxLayer>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Appointment CTA — the calmest scene in the sequence, deliberately: no
// background word, no index numeral, minimal parallax, per "motion should
// gradually become calmer" heading into the Form.
// ---------------------------------------------------------------------

export function CtaScene() {
  return (
    <div className="flex h-full w-full items-center px-10 xl:px-16">
      <ParallaxLayer kind="textContent" className="max-w-xl">
        <h2 className="text-[clamp(2rem,1.6rem+1.8vw,2.85rem)] leading-[1.1] font-semibold text-ink">
          {doctorsAppointmentCta.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{doctorsAppointmentCta.supporting}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={doctorsAppointmentCta.primaryCta.href} variant="primary">
            {doctorsAppointmentCta.primaryCta.label}
          </Button>
          <CtaLink href={doctorsAppointmentCta.secondaryCta.href}>{doctorsAppointmentCta.secondaryCta.label}</CtaLink>
        </div>
      </ParallaxLayer>
    </div>
  );
}

// ---------------------------------------------------------------------
// Form — the final horizontal panel. Movement here is already minimal
// (see the scene above) and the master track's own final dwell (see
// `FORM_DWELL_FRACTION`) holds this scene fully still once it arrives, so
// no `ParallaxLayer` wraps the form itself — only the heading column gets
// the same restrained textContent drift every other scene's copy gets on
// the way in.
// ---------------------------------------------------------------------

export function FormScene() {
  return (
    <div className="flex h-full w-full items-center px-10 xl:px-16">
      <div className="grid h-full w-full items-center gap-[var(--doctor-scene-gap)] lg:grid-cols-[0.9fr_1.1fr]">
        <ParallaxLayer kind="textContent" className="max-w-md">
          <p className="eyebrow">{doctorsEnquiryForm.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.5rem+1.8vw,2.6rem)] leading-[1.1] font-semibold text-ink">
            {doctorsEnquiryForm.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">{doctorsEnquiryForm.supporting}</p>
        </ParallaxLayer>

        <DoctorsEnquiryForm compact />
      </div>
    </div>
  );
}
