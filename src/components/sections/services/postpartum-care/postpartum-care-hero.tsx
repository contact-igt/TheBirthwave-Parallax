import { postpartumHero } from "@/content/postpartum-care-landing-content";
import { postpartumImagery } from "@/content/postpartum-care-landing-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 1 — full-width hero, following the Pregnancy & Antenatal Care
 * reference's own proportions, typography scale and CTA treatment (per
 * this page's brief) but rendering a gradient panel rather than a real
 * `next/image` — the same "no accurate asset available this session"
 * situation `vbac-hero.tsx`/`fertility-preconception-hero.tsx` already
 * document. The one existing `services-imagery.ts` asset for this slug was
 * inspected and found to depict a prenatal, not postpartum, scene (see
 * `postpartum-care-landing-imagery.ts`'s own top comment) — reusing it here
 * would misrepresent it as postpartum photography, so this hero
 * deliberately does not.
 *
 * Responsive structure matches `pregnancy-antenatal-hero.tsx`/`vbac-hero.tsx`
 * exactly: full-bleed background composition only from `lg` upward; below
 * that, normal document flow (copy first, then the image panel) — no fixed
 * top offsets or hard-coded mobile image positioning, so the hero never
 * overlaps its own copy at 768px/1024px.
 */
export function PostpartumHero() {
  const image = postpartumImagery.hero;

  return (
    <section id="postpartum-hero" aria-label="Postpartum Recovery & Care" className="relative isolate overflow-hidden bg-paper-dim lg:min-h-[640px] lg:bg-[#eee0cb]">
      <div className="container-birthwave relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-10 lg:flex lg:min-h-[640px] lg:items-center lg:pb-20">
        <div className="max-w-2xl lg:max-w-[52%]">
          <p className="eyebrow">{postpartumHero.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(2.25rem,1.5rem+3.4vw,4rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {postpartumHero.heading}
          </h1>
          <p className="mt-6 max-w-md text-xl leading-[var(--leading-relaxed)] font-medium text-ink">{postpartumHero.supportingHeadline}</p>
          <p className="mt-4 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{postpartumHero.body}</p>
          <p className="mt-3 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{postpartumHero.bodySecondary}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={postpartumHero.primaryCta.href} variant="primary">
              {postpartumHero.primaryCta.label}
            </Button>
            <CtaLink href={postpartumHero.secondaryCta.href}>{postpartumHero.secondaryCta.label}</CtaLink>
          </div>
        </div>
      </div>

      <div
        data-postpartum-image="hero"
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
