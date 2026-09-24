import Image from "next/image";
import { naturalBirthHero } from "@/content/natural-birth-landing-content";
import { naturalBirthImagery } from "@/content/natural-birth-landing-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { heroFocalPointClassName } from "@/lib/hero-focal-point";

/**
 * Section 01 — Hero. Full-bleed background composition only from `lg`
 * upward; below that, normal document flow (copy first, then the image
 * panel) — same responsive structure `vbac-hero.tsx`/
 * `normal-birth-delivery-hero.tsx` already establish.
 */
export function NaturalBirthHero() {
  const image = naturalBirthImagery.hero;
  return (
    <section
      id="natural-birth-hero"
      aria-label="Natural Birth"
      className="relative isolate overflow-hidden bg-paper-dim lg:min-h-[640px] lg:bg-[#eee0cb]"
    >
      <div className="container-birthwave relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-10 lg:flex lg:min-h-[640px] lg:items-center lg:pb-20">
        <div className="max-w-2xl lg:max-w-[52%]">
          <p className="eyebrow">{naturalBirthHero.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2.25rem,1.5rem+3.4vw,4rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {naturalBirthHero.heading}
          </h1>
          <p className="mt-6 max-w-md text-xl leading-[var(--leading-relaxed)] font-medium text-ink">
            {naturalBirthHero.supportingHeadline}
          </p>
          <p className="mt-4 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{naturalBirthHero.body}</p>
          <p className="mt-3 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{naturalBirthHero.bodySecondary}</p>
          <p className="mt-3 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{naturalBirthHero.bodyTertiary}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={naturalBirthHero.primaryCta.href} variant="primary">
              {naturalBirthHero.primaryCta.label}
            </Button>
            <CtaLink href={naturalBirthHero.secondaryCta.href}>{naturalBirthHero.secondaryCta.label}</CtaLink>
          </div>
        </div>
      </div>

      <div
        data-natural-birth-image="hero"
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
        <span className="absolute right-4 bottom-4 z-10 rounded-xs bg-paper/95 px-2.5 py-1 font-body text-[0.6875rem] leading-snug text-ink-soft">
          AI-generated illustration
        </span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden lg:block lg:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-paper)_97%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_91%,transparent)_34%,color-mix(in_srgb,var(--color-paper)_45%,transparent)_62%,transparent_80%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_85%,transparent)_0%,transparent_19%)]"
      />
    </section>
  );
}
