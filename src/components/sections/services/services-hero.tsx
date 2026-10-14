"use client";

import { ourServicesHero } from "@/content/our-services-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { ServicesEditorialImage } from "./services-editorial-image";
import { useParallax } from "@/motion/image-motion";

/**
 * Section 01 — Our Services Hero.
 *
 * Balanced editorial split layout:
 * - Left: Eyebrow, display heading, 3 body paragraphs, primary "Find your care" CTA, secondary "Book a consultation" CTA.
 * - Right: Large editorial photograph in an aspect-[4/5] frame with subtle multi-plane scroll parallax and signature corner.
 * - Mobile: Content strictly precedes image in natural reading order.
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
          <p className="eyebrow text-terracotta-deep">{ourServicesHero.eyebrow}</p>
          <h1
            id="services-hero-heading"
            className="mt-4 text-display leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {ourServicesHero.heading}
          </h1>

          <div className="mt-6 space-y-4 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {ourServicesHero.paragraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={ourServicesHero.primaryCta.href} variant="primary">
              {ourServicesHero.primaryCta.label.replace(/\s*→$/, "")}
            </Button>
            <CtaLink href={ourServicesHero.secondaryCta.href}>
              {ourServicesHero.secondaryCta.label.replace(/\s*→$/, "")}
            </CtaLink>
          </div>
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
