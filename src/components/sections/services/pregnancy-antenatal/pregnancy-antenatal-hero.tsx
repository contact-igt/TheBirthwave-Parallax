import Image from "next/image";
import { pregnancyLandingHero } from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { heroFocalPointClassName } from "@/lib/hero-focal-point";

/**
 * Section 1 — full-width hero, following the approved reference's own
 * `.bw-background-hero`: one photograph spanning the section background,
 * a readability gradient, heading and CTA visible immediately (no
 * reveal-on-scroll here — "hero heading and primary CTA are visible
 * immediately," per the brief).
 *
 * Mobile: the reference doesn't just add a gradient, it changes the whole
 * composition — the section grows taller, the text column sits at the
 * TOP (`items-start`, not centred) with the photo's own visible crop
 * pushed down and right (`object-position`), and the content column
 * reserves real bottom padding so the two never overlap. Reproduced the
 * same way here (`items-start` + a taller `min-h` + a lower
 * `object-position` + a deliberately generous `pb-*`, all mobile-only,
 * `sm:` overrides return to the desktop side-by-side composition) rather
 * than relying on the gradient alone to keep the face clear of the
 * heading/CTA — the same single photograph throughout, no second
 * cropped asset.
 */
export function PregnancyAntenatalHero() {
  const image = servicesImagery["pregnancy-antenatal-hero"];

  return (
    <section
      id="pregnancy-hero"
      aria-label="Pregnancy & Antenatal Care"
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
          // Mobile keeps the subject lower and further right in the
          // (shorter, inset-from-the-top) crop, clear of the text column
          // above it; desktop uses the reference's own `65% center`. Values
          // now live in `services-imagery.ts`'s own `focalPoint` field
          // (see `hero-focal-point.ts`) rather than duplicated here.
          className={`object-cover ${heroFocalPointClassName(image.focalPoint)}`}
        />
      </div>
      {/* Readability gradient — mobile-first: base (below `sm`) is a
          top-down fade so the text column stays fully readable regardless
          of the photo's own tone; `sm:` overrides with the reference's own
          left-to-right + bottom fade for the side-by-side desktop
          composition. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper)_38%,color-mix(in_srgb,var(--color-paper)_79%,transparent)_46%,transparent_60%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_93%,transparent)_0%,transparent_12%)] sm:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-paper)_96%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_85%,transparent)_27%,color-mix(in_srgb,var(--color-paper)_30%,transparent)_51%,transparent_70%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_85%,transparent)_0%,transparent_19%)]"
      />

      {/* `pt-[calc(var(--header-height)+...)]` — PageShell is deliberately
          unopinionated about top clearance under its own fixed header
          (see that component's own comment); this section's own content
          provides it, the same way hero-section.tsx's homepage hero
          already does, rather than leaving the eyebrow/heading to sit
          under the fixed header. */}
      <div className="container-birthwave relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-[420px] sm:pt-[calc(var(--header-height)+3rem)] sm:pb-20">
        <p className="eyebrow">{pregnancyLandingHero.eyebrow}</p>
        <h1 className="mt-5 max-w-2xl text-[clamp(2.5rem,1.7rem+3.6vw,4.6rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {pregnancyLandingHero.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">
          {pregnancyLandingHero.supporting}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={pregnancyLandingHero.primaryCta.href} variant="primary">
            {pregnancyLandingHero.primaryCta.label}
          </Button>
          <CtaLink href={pregnancyLandingHero.secondaryCta.href}>{pregnancyLandingHero.secondaryCta.label}</CtaLink>
        </div>

        <p className="mt-8 font-body text-sm text-ink-soft">{pregnancyLandingHero.location}</p>
      </div>

      <span className="absolute top-4 right-4 z-10 rounded-xs bg-paper/90 px-2 py-1 font-body text-[0.6875rem] text-ink-soft">
        AI-generated illustration
      </span>
    </section>
  );
}
