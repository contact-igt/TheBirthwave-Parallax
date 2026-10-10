"use client";

import { servicesHero } from "@/content/services-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { ServicesEditorialImage } from "./services-editorial-image";
import { useParallax } from "@/motion/image-motion";

/**
 * Section 01 — Our Services Hero.
 *
 * Balanced editorial split layout:
 * - Left: Eyebrow, refined display heading, comfortably readable description,
 *   primary "Find your care" CTA, secondary "Request an appointment" CTA, and honest note.
 * - Right: Strong visual presence with a large editorial photograph in an aspect-[4/5] frame
 *   with subtle multi-plane scroll parallax and single signature rounded corner.
 * - Mobile: Heading, description, and actions strictly precede the image.
 */
export function ServicesHero() {
  const wordParallaxRef = useParallax<HTMLDivElement>({ factor: 0.04, maxOffsetPx: 16 });
  const imageParallaxRef = useParallax<HTMLDivElement>({ factor: 0.08, maxOffsetPx: 26 });
  const accentParallaxRef = useParallax<HTMLDivElement>({ factor: 0.14, maxOffsetPx: 36 });

  return (
    <section
      id="our-services-hero"
      aria-labelledby="services-hero-heading"
      className="relative isolate overflow-hidden bg-paper [padding-block-start:calc(var(--header-height)+var(--space-section-sm))] [padding-block-end:var(--space-section)]"
    >
      {/* Background typographic atmosphere layer */}
      <div
        ref={wordParallaxRef}
        aria-hidden="true"
        style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
        className="pointer-events-none absolute inset-x-0 top-[6%] z-0 text-center select-none"
      >
        <span className="font-display text-[18vw] leading-none font-semibold tracking-[var(--tracking-tight)] text-terracotta/[0.06] uppercase">
          Care
        </span>
      </div>

      <div className="container-birthwave relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        {/* Editorial Text Column */}
        <div className="order-1 max-w-xl">
          <p className="eyebrow text-terracotta-deep">{servicesHero.eyebrow}</p>
          <h1
            id="services-hero-heading"
            className="mt-4 text-[clamp(2.5rem,1.9rem+3.2vw,4.25rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {servicesHero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {servicesHero.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={servicesHero.primaryCta.href} variant="primary">
              {servicesHero.primaryCta.label}
            </Button>
            <CtaLink href={servicesHero.secondaryCta.href}>
              {servicesHero.secondaryCta.label}
            </CtaLink>
          </div>

          {servicesHero.note && (
            <p className="mt-4 text-xs tracking-wide text-ink-soft/75">
              {servicesHero.note}
            </p>
          )}
        </div>

        {/* Editorial Image Column */}
        <div className="order-2 relative">
          <div
            ref={imageParallaxRef}
            style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
            className="relative"
          >
            <ServicesEditorialImage
              imageKey="services-hero"
              eager
              sizes="(max-width: 639px) 92vw, (max-width: 1023px) 85vw, 540px"
              corner="tr"
              aspect="aspect-[4/5]"
              className="shadow-[0_20px_50px_rgba(42,36,33,0.06)]"
            />
          </div>

          {/* Foreground subtle warm glow */}
          <div
            ref={accentParallaxRef}
            aria-hidden="true"
            style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
            className="pointer-events-none absolute -bottom-6 -left-6 hidden h-28 w-28 rounded-full opacity-60 blur-2xl sm:block"
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
