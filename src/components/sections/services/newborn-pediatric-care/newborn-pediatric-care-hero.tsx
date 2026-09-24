import Image from "next/image";
import { newbornHero } from "@/content/newborn-pediatric-care-landing-content";
import { newbornImagery } from "@/content/newborn-pediatric-care-landing-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { heroFocalPointClassName } from "@/lib/hero-focal-point";

/**
 * Section 1 — full-width hero, following `pregnancy-antenatal-hero.tsx`'s
 * own approved structure exactly (per this page's brief: match the
 * Pregnancy architecture) — one photograph spanning the section
 * background, a readability gradient, heading and CTA visible immediately,
 * no reveal-on-scroll here. This page has one real, approved photograph
 * already (`newbornImagery.hero`, reused from the existing `/services`
 * card asset — see that file's own top comment), so this hero renders a
 * real `next/image` rather than a gradient panel.
 *
 * `object-position` favours the upper-left band where the father and
 * newborn sit in the source photograph, per `newbornImagery.hero`'s own
 * `focalPoint`.
 */
export function NewbornHero() {
  const image = newbornImagery.hero;

  return (
    <section
      id="newborn-hero"
      aria-label="Newborn & Pediatric Care"
      className="relative isolate flex min-h-[720px] items-start overflow-hidden bg-[#eee0cb] sm:min-h-[640px] sm:items-center"
    >
      <div className="absolute inset-x-0 top-[280px] bottom-0 -z-20 sm:inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={`object-cover ${heroFocalPointClassName(image.focalPoint)}`}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper)_54%,color-mix(in_srgb,var(--color-paper)_82%,transparent)_65%,transparent_80%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_93%,transparent)_0%,transparent_12%)] sm:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-paper)_96%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_85%,transparent)_27%,color-mix(in_srgb,var(--color-paper)_30%,transparent)_51%,transparent_70%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_85%,transparent)_0%,transparent_19%)]"
      />

      <div className="container-birthwave relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-[290px] sm:pt-[calc(var(--header-height)+3rem)] sm:pb-20">
        <p className="eyebrow">{newbornHero.eyebrow}</p>
        <h1 className="mt-5 max-w-2xl text-[clamp(2.5rem,1.7rem+3.6vw,4.6rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {newbornHero.heading}
        </h1>
        <p className="mt-6 max-w-md text-xl leading-[var(--leading-relaxed)] font-medium text-ink">{newbornHero.supportingHeadline}</p>
        <p className="mt-4 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{newbornHero.body}</p>
        <p className="mt-3 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{newbornHero.bodySecondary}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={newbornHero.primaryCta.href} variant="primary">
            {newbornHero.primaryCta.label}
          </Button>
        </div>

        <div className="mt-6">
          <CtaLink href={newbornHero.secondaryCta.href}>{newbornHero.secondaryCta.label}</CtaLink>
        </div>
      </div>

      <span className="absolute top-4 right-4 z-10 rounded-xs bg-paper/90 px-2 py-1 font-body text-[0.6875rem] text-ink-soft">
        AI-generated illustration
      </span>
    </section>
  );
}
