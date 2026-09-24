import Image from "next/image";
import { birthPrepHero } from "@/content/birth-preparation-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { heroFocalPointClassName } from "@/lib/hero-focal-point";

/**
 * Section 1 — full-width photographic hero, following the same pattern
 * `pregnancy-antenatal-hero.tsx` establishes: one photograph spanning the
 * section background, a readability gradient, heading and CTAs visible
 * immediately (no reveal-on-scroll here). No small standalone image card
 * on the right, and no fixed height that could clip content on a short
 * screen — `min-h` only, content can grow the section taller.
 *
 * Mobile: same composition change as the pregnancy hero — the text column
 * sits at the top, the photo's own crop is pushed down and to the side via
 * `object-position`, and generous bottom padding keeps the two from
 * overlapping, rather than relying on the gradient alone to keep the
 * subject's face clear of the heading/CTAs.
 *
 * This hero carries more copy than the pregnancy hero (an extra
 * supporting-headline sentence, per the brief), so its mobile text column
 * measures taller — confirmed via `getBoundingClientRect()` at 390×844,
 * ~846px to the end of the closing line. The image's own mobile start
 * offset (`top-[960px]`) and the gradient's solid-to-fade stops
 * (`66%`/`84%`) are set well past that measured height, with margin for
 * narrower phones wrapping to extra lines, so the photo never begins
 * underneath live text — the exact overlap an earlier pass of this
 * component had at the original `top-[300px]` offset borrowed unchanged
 * from the shorter pregnancy hero.
 */
export function BirthPrepHero() {
  const image = servicesImagery["birth-prep-landing-hero"];

  return (
    <section
      id="birth-prep-hero"
      aria-label="Birth Preparation & Childbirth Education"
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
        // Desktop stops extended further right than the pregnancy hero's
        // own formula (0/27/51/70 → 0/34/62/80): this photo's subjects sit
        // darker/busier at the same relative x-position, and this hero's
        // own longer secondary-CTA label ("Explore What You'll Learn")
        // reaches further into that zone than the pregnancy hero's
        // shorter one — confirmed via a real computed contrast check at
        // 1024×768, where the un-extended stops let the CTA's tail end
        // lose legibility against the photo.
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper)_66%,color-mix(in_srgb,var(--color-paper)_79%,transparent)_74%,transparent_84%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_93%,transparent)_0%,transparent_12%)] sm:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-paper)_96%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_88%,transparent)_34%,color-mix(in_srgb,var(--color-paper)_45%,transparent)_62%,transparent_80%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_85%,transparent)_0%,transparent_19%)]"
      />

      <div className="container-birthwave relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-[480px] sm:pt-[calc(var(--header-height)+3rem)] sm:pb-20">
        <p className="eyebrow">{birthPrepHero.eyebrow}</p>
        <h1 className="mt-5 max-w-2xl text-[clamp(2.5rem,1.7rem+3.6vw,4.6rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepHero.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-md text-xl leading-[var(--leading-relaxed)] font-medium text-ink">
          {birthPrepHero.supportingHeadline}
        </p>
        <p className="mt-4 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{birthPrepHero.body}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={birthPrepHero.primaryCta.href} variant="primary">
            {birthPrepHero.primaryCta.label}
          </Button>
          <CtaLink href={birthPrepHero.secondaryCta.href}>{birthPrepHero.secondaryCta.label}</CtaLink>
        </div>

        <p className="mt-8 font-body text-sm text-ink-soft">{birthPrepHero.supportingLine}</p>
      </div>

      <span className="absolute top-4 right-4 z-10 rounded-xs bg-paper/90 px-2 py-1 font-body text-[0.6875rem] text-ink-soft">
        AI-generated illustration
      </span>
    </section>
  );
}
