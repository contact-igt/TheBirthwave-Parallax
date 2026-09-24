import Image from "next/image";
import { normalBirthHero } from "@/content/normal-birth-delivery-landing-content";
import { normalBirthImagery } from "@/content/normal-birth-delivery-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";

/** One responsive image: in normal flow on mobile, full background on desktop. */
export function NormalBirthHero() {
  const image = normalBirthImagery.hero;
  return (
    <section id="nbd-hero" aria-label="Normal Birth & Delivery Care" className="relative isolate overflow-hidden bg-paper-dim lg:min-h-[640px] lg:bg-[#eee0cb]">
      <div className="container-birthwave relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-10 lg:flex lg:min-h-[640px] lg:items-center lg:pb-20">
        <div className="max-w-2xl lg:max-w-[52%]">
          <p className="eyebrow">{normalBirthHero.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2.5rem,1.7rem+3.6vw,4.6rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {normalBirthHero.headingLines.map((line) => <span key={line} className="block">{line}</span>)}
          </h1>
          <p className="mt-6 max-w-md text-xl leading-[var(--leading-relaxed)] font-medium text-ink">{normalBirthHero.supportingHeadline}</p>
          <p className="mt-4 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{normalBirthHero.body}</p>
          <p className="mt-3 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{normalBirthHero.bodySecondary}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={normalBirthHero.primaryCta.href} variant="primary">{normalBirthHero.primaryCta.label}</Button>
            <CtaLink href={normalBirthHero.secondaryCta.href}>{normalBirthHero.secondaryCta.label}</CtaLink>
          </div>
        </div>
      </div>
      <div data-nbd-image="hero" className="relative z-0 mx-5 mb-10 aspect-[4/3] overflow-hidden rounded-tr-panel lg:absolute lg:inset-0 lg:m-0 lg:aspect-auto lg:rounded-none">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" loading="eager" fetchPriority="high" className="object-cover" style={{ objectPosition: image.objectPosition }} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] hidden lg:block lg:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-paper)_97%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_91%,transparent)_34%,color-mix(in_srgb,var(--color-paper)_45%,transparent)_62%,transparent_80%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_85%,transparent)_0%,transparent_19%)]" />
      <span className="absolute right-8 bottom-12 z-10 rounded-xs bg-paper/95 px-2 py-1 font-body text-[0.6875rem] text-ink-soft lg:right-5 lg:bottom-5">AI-generated illustration</span>
    </section>
  );
}
