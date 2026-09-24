"use client";

import { servicesHero } from "@/content/services-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { ServicesEditorialImage } from "./services-editorial-image";
import { useParallax } from "@/motion/image-motion";

/**
 * Section 01 — Our Care Hero (Our Care / Treatments master page, Phase 1).
 * One strong maternal/care image, large type, generous whitespace — no
 * service-card collage, no icon grid, no floating boxes. This page's own
 * motion identity is "vertical scroll + sticky split-screen," which
 * starts one section down (`services-care-journey.tsx`); this hero is
 * deliberately calm by comparison, the same restrained-opening approach
 * Doctors' own hero (`doctors-hero.tsx`) and Hero's own homepage entry
 * both already take.
 *
 * Three depth planes, per the brief's own parallax concept: a soft
 * oversized background word drifting the least (slower than the frame),
 * the main image at its own native scroll-tied drift, and a small
 * foreground accent shape drifting the most — three separate
 * `useParallax` calls at three different `factor`s rather than a shared
 * mechanism, the same pattern Hero's own `heroBackgroundParallax` preset
 * already establishes for a comparable "background moves slower than
 * foreground" composition.
 */
export function ServicesHero() {
  const wordParallaxRef = useParallax<HTMLDivElement>({ factor: 0.05, maxOffsetPx: 18 });
  const imageParallaxRef = useParallax<HTMLDivElement>({ factor: 0.1, maxOffsetPx: 30 });
  const accentParallaxRef = useParallax<HTMLDivElement>({ factor: 0.18, maxOffsetPx: 44 });

  return (
    <section
      id="our-care-hero"
      aria-label="Our care"
      className="relative isolate overflow-hidden bg-paper [padding-block-start:calc(var(--header-height)+var(--space-section-sm))] [padding-block-end:var(--space-section)]"
    >
      <div
        ref={wordParallaxRef}
        aria-hidden="true"
        style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
        className="pointer-events-none absolute inset-x-0 top-[8%] z-0 text-center select-none"
      >
        <span className="font-display text-[18vw] leading-none font-semibold tracking-[var(--tracking-tight)] text-terracotta/[0.07] uppercase">
          Care
        </span>
      </div>

      <div className="container-birthwave relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{servicesHero.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2.5rem,1.9rem+3.2vw,4.25rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {servicesHero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {servicesHero.supporting}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={servicesHero.primaryCta.href} variant="primary">
              {servicesHero.primaryCta.label}
            </Button>
            <CtaLink href={servicesHero.secondaryCta.href}>{servicesHero.secondaryCta.label}</CtaLink>
          </div>
        </div>

        <div className="relative">
          <div ref={imageParallaxRef} style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}>
            <ServicesEditorialImage
              imageKey="services-hero"
              eager
              sizes="(max-width: 1023px) 85vw, 560px"
              corner="tr"
              aspect="aspect-[4/5] lg:aspect-[3/4]"
            />
          </div>
          {/* Foreground accent — a small soft shape, not a second photo or
              an icon, drifting slightly faster than the main image for
              restrained depth. */}
          <div
            ref={accentParallaxRef}
            aria-hidden="true"
            style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
            className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-full opacity-60 blur-2xl sm:block"
          >
            <div
              className="h-full w-full rounded-full"
              style={{ backgroundImage: "radial-gradient(circle, var(--color-coral) 0%, transparent 72%)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
