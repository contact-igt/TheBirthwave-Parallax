import Image from "next/image";
import { birthPrepHero } from "@/content/birth-preparation-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { heroFocalPointClassName } from "@/lib/hero-focal-point";

/**
 * Section 01 — Hero: Full-width photographic hero for the All-in-One Prenatal Workshop.
 */
export function BirthPrepHero() {
  const image = servicesImagery["birth-prep-landing-hero"];

  return (
    <section
      id="birth-prep-hero"
      aria-label="Birth Preparation & Childbirth Education workshop"
      className="relative isolate flex min-h-[760px] items-start overflow-hidden bg-[#eee0cb] sm:min-h-[660px] sm:items-center"
    >
      <div className="absolute inset-x-0 top-[960px] bottom-0 -z-20 sm:inset-0">
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper)_66%,color-mix(in_srgb,var(--color-paper)_79%,transparent)_74%,transparent_84%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_93%,transparent)_0%,transparent_12%)] sm:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-paper)_96%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_88%,transparent)_34%,color-mix(in_srgb,var(--color-paper)_45%,transparent)_62%,transparent_80%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_85%,transparent)_0%,transparent_19%)]"
      />

      <div className="container-birthwave relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-[480px] sm:pt-[calc(var(--header-height)+3rem)] sm:pb-20">
        <p className="eyebrow">{birthPrepHero.eyebrow}</p>
        <h1 className="mt-5 max-w-2xl text-[clamp(2.5rem,1.7rem+3.6vw,4.6rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepHero.heading}
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-[var(--leading-relaxed)] font-medium text-ink">
          {birthPrepHero.supportingHeadline}
        </p>

        <div className="mt-4 space-y-3 max-w-xl text-lg leading-[var(--leading-relaxed)] text-ink-soft">
          {birthPrepHero.body.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={birthPrepHero.primaryCta.href} variant="primary">
            {birthPrepHero.primaryCta.label}
          </Button>
          <CtaLink href={birthPrepHero.secondaryCta.href}>{birthPrepHero.secondaryCta.label}</CtaLink>
        </div>
      </div>

      <span className="absolute top-4 right-4 z-10 rounded-xs bg-paper/90 px-2 py-1 font-body text-[0.6875rem] text-ink-soft">
        AI-generated illustration
      </span>
    </section>
  );
}
