import { vbacHero } from "@/content/vbac-landing-content";
import { vbacImagery } from "@/content/vbac-landing-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Full-bleed background composition only from `lg` upward; below that,
 * normal document flow (copy first, then the image panel) — no fixed top
 * offsets or hard-coded mobile image positioning, so the hero never
 * overlaps its own copy at 768px/1024px. Same responsive structure
 * `normal-birth-delivery-hero.tsx` already establishes; the image layer
 * here is a gradient panel rather than a `next/image`, since no
 * image-generation tool was available while this page was built (see
 * `vbac-landing-imagery.ts`'s own top comment).
 */
export function VbacHero() {
  const image = vbacImagery.hero;
  return (
    <section id="vbac-hero" aria-label="VBAC (Vaginal Birth After Caesarean)" className="relative isolate overflow-hidden bg-paper-dim lg:min-h-[640px] lg:bg-[#eee0cb]">
      <div className="container-birthwave relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-10 lg:flex lg:min-h-[640px] lg:items-center lg:pb-20">
        <div className="max-w-2xl lg:max-w-[52%]">
          <p className="eyebrow">{vbacHero.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2.25rem,1.5rem+3.4vw,4rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacHero.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-xl leading-[var(--leading-relaxed)] font-medium text-ink">{vbacHero.supportingHeadline}</p>
          <p className="mt-4 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{vbacHero.body}</p>
          <p className="mt-3 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{vbacHero.bodySecondary}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={vbacHero.primaryCta.href} variant="primary">
              {vbacHero.primaryCta.label}
            </Button>
            <CtaLink href={vbacHero.secondaryCta.href}>{vbacHero.secondaryCta.label}</CtaLink>
          </div>
        </div>
      </div>

      <div
        data-vbac-image="hero"
        className="relative z-0 mx-5 mb-10 aspect-[4/3] overflow-hidden rounded-tr-panel lg:absolute lg:inset-0 lg:m-0 lg:aspect-auto lg:rounded-none"
        style={{ backgroundImage: image.gradient }}
      >
        <p className="absolute right-4 bottom-4 max-w-[calc(100%-2rem)] rounded-xs bg-paper/95 px-2.5 py-1 font-body text-[0.6875rem] leading-snug text-ink-soft">
          {image.alt}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden lg:block lg:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-paper)_97%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_91%,transparent)_34%,color-mix(in_srgb,var(--color-paper)_45%,transparent)_62%,transparent_80%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_85%,transparent)_0%,transparent_19%)]"
      />
    </section>
  );
}
