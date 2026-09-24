import Image from "next/image";
import { fertilityHero } from "@/content/fertility-preconception-landing-content";
import { fertilityImagery } from "@/content/fertility-preconception-landing-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { heroFocalPointClassName } from "@/lib/hero-focal-point";

/**
 * Full-bleed background composition only from `lg` upward; below that,
 * normal document flow (copy first, then the image panel) — the same
 * responsive structure `normal-birth-delivery-hero.tsx` establishes.
 * Renders Next/Image with responsive focal point preservation.
 */
export function FertilityHero() {
  const image = fertilityImagery.hero;
  return (
    <section
      id="fertility-hero"
      aria-label="Fertility & Preconception"
      className="relative isolate overflow-hidden bg-paper-dim lg:min-h-[640px] lg:bg-[#eee0cb]"
    >
      <div className="container-birthwave relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-10 lg:flex lg:min-h-[640px] lg:items-center lg:pb-20">
        <div className="max-w-2xl lg:max-w-[52%]">
          <p className="eyebrow">{fertilityHero.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2.5rem,1.7rem+3.6vw,4.6rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {fertilityHero.heading}
          </h1>
          <p className="mt-6 max-w-md text-xl leading-[var(--leading-relaxed)] font-medium text-ink">{fertilityHero.supportingHeadline}</p>
          <p className="mt-4 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{fertilityHero.body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={fertilityHero.primaryCta.href} variant="primary">
              {fertilityHero.primaryCta.label}
            </Button>
          </div>

          <div className="mt-6">
            <CtaLink href={fertilityHero.secondaryCta.href}>{fertilityHero.secondaryCta.label}</CtaLink>
          </div>
        </div>
      </div>

      <div
        data-fertility-image="hero"
        className="relative z-0 mx-5 mb-10 aspect-[4/3] overflow-hidden rounded-tr-panel lg:absolute lg:inset-0 lg:m-0 lg:aspect-auto lg:rounded-none"
      >
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
        className="pointer-events-none absolute inset-0 z-[1] hidden lg:block lg:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-paper)_97%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_91%,transparent)_34%,color-mix(in_srgb,var(--color-paper)_45%,transparent)_62%,transparent_80%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_85%,transparent)_0%,transparent_19%)]"
      />
      <span className="absolute right-8 bottom-12 z-10 rounded-xs bg-paper/95 px-2 py-1 font-body text-[0.6875rem] text-ink-soft lg:right-5 lg:bottom-5">
        AI-generated illustration
      </span>
    </section>
  );
}
