import Image from "next/image";
import { pregnancyLandingHero } from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 1 — Hero: Warm, maternal editorial split layout.
 *
 * Left: Eyebrow, display headline, warm supporting copy, consultation CTA & clinic reassurance.
 * Right: Prominent maternity portrait in natural light, framed with signature soft-arch curves,
 * delicate warm border and ambient back-glow.
 *
 * Mobile: Clean vertical stack with comfortable spacing and zero text-overlap.
 */
export function PregnancyAntenatalHero() {
  const image = servicesImagery["pregnancy-antenatal-hero"];

  return (
    <section
      id="pregnancy-hero"
      aria-label="Pregnancy & Antenatal Care"
      className="relative isolate overflow-hidden bg-[#FAF6F2] pt-[calc(var(--header-height)+1.5rem)] pb-16 sm:pt-[calc(var(--header-height)+2.5rem)] sm:pb-24 lg:pt-[calc(var(--header-height)+3rem)] lg:pb-28"
    >
      {/* Soft warm ambient lighting layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 -z-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.18)_0%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-20 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(243,232,226,0.65)_0%,transparent_70%)] blur-2xl"
      />

      <div className="container-birthwave relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left Column: Reassurance & Actions */}
        <div className="max-w-xl">
          <p className="eyebrow text-terracotta-deep font-semibold">{pregnancyLandingHero.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2.5rem,1.8rem+3.2vw,4.4rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {pregnancyLandingHero.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {pregnancyLandingHero.supporting}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={pregnancyLandingHero.primaryCta.href} variant="primary">
              {pregnancyLandingHero.primaryCta.label}
            </Button>
            <CtaLink href={pregnancyLandingHero.secondaryCta.href}>{pregnancyLandingHero.secondaryCta.label}</CtaLink>
          </div>

          <p className="mt-8 flex items-center gap-2.5 font-body text-sm text-ink-soft">
            <span className="inline-block size-2 rounded-full bg-terracotta-deep/80" aria-hidden="true" />
            <span>{pregnancyLandingHero.location}</span>
          </p>
        </div>

        {/* Right Column: Editorial Maternity Image */}
        <figure className="relative w-full">
          {/* Organic warm halo behind frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 -z-10 rounded-t-[84px] rounded-br-[42px] bg-[radial-gradient(circle_at_center,rgba(202,149,133,0.2)_0%,rgba(243,232,226,0.12)_60%,transparent_80%)] blur-lg"
          />

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[72px] rounded-br-[36px] rounded-bl-[16px] border border-[color-mix(in_srgb,var(--color-terracotta)_26%,transparent)] bg-paper-dim shadow-[0_24px_50px_-16px_rgba(53,43,41,0.12)] sm:aspect-[5/4] lg:aspect-auto lg:h-[clamp(30rem,calc(100dvh-13rem),38rem)]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1023px) 92vw, 560px"
              className="object-cover"
              style={{ objectPosition: "74% 14%" }}
            />
          </div>

          <figcaption className="mt-2.5 flex items-center justify-between font-body text-[0.6875rem] text-ink-soft/80">
            <span>Warm natural light · Antenatal care</span>
            <span>AI-generated illustration · Clinic photography pending</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
