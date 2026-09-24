import Image from "next/image";
import { vaginismusHero } from "@/content/vaginismus-landing-content";
import { vaginismusImagery } from "@/content/vaginismus-landing-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { heroFocalPointClassName } from "@/lib/hero-focal-point";

/**
 * Section 1 — full-width hero, following `pregnancy-antenatal-hero.tsx`'s
 * own approved structure exactly (per this page's brief: "Match Pregnancy
 * architecture" for the hero) — one photograph spanning the section
 * background, a readability gradient, heading and CTA visible immediately,
 * no reveal-on-scroll here. Unlike the other four dedicated landing pages
 * built without an image-generation tool, this page has one real, approved
 * photograph already (`vaginismusImagery.hero`, reused from the existing
 * `/services` card asset — see that file's own top comment), so this hero
 * renders a real `next/image` rather than a gradient panel.
 *
 * `object-position` favours the upper-centre band where both women's faces
 * sit in the source photograph (patient left-of-centre, clinician right-
 * of-centre) rather than pregnancy's own left/right split, which was tuned
 * for a differently-composed image with its subject at the frame's right.
 *
 * Only one restrained CTA above the fold (`vaginismusHero.primaryCta`); the
 * "Understand the consultation ↓" link is a quiet text link (`CtaLink`),
 * not a second button — matching the brief's "no competing secondary CTA"
 * rule while still surfacing the same optional jump-link
 * `fertility-preconception-hero.tsx`'s own secondary link provides.
 */
export function VaginismusHero() {
  const image = vaginismusImagery.hero;

  return (
    <section
      id="vaginismus-hero"
      aria-label="Vaginismus & Intimate Wellness"
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
      {/* Readability gradient — mobile-first: base (below `sm`) is a
          top-down fade so the text column stays fully readable regardless
          of the photo's own tone; `sm:` overrides with a left-to-right +
          bottom fade for the side-by-side desktop composition, the exact
          same two-layer approach `pregnancy-antenatal-hero.tsx` uses. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper)_54%,color-mix(in_srgb,var(--color-paper)_82%,transparent)_65%,transparent_80%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_93%,transparent)_0%,transparent_12%)] sm:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-paper)_96%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_85%,transparent)_27%,color-mix(in_srgb,var(--color-paper)_30%,transparent)_51%,transparent_70%),linear-gradient(0deg,color-mix(in_srgb,var(--color-paper)_85%,transparent)_0%,transparent_19%)]"
      />

      <div className="container-birthwave relative z-10 pt-[calc(var(--header-height)+2.5rem)] pb-[290px] sm:pt-[calc(var(--header-height)+3rem)] sm:pb-20">
        <p className="eyebrow">{vaginismusHero.eyebrow}</p>
        <h1 className="mt-5 max-w-2xl text-[clamp(2.5rem,1.7rem+3.6vw,4.6rem)] leading-[1.05] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vaginismusHero.heading}
        </h1>
        <p className="mt-6 max-w-md text-xl leading-[var(--leading-relaxed)] font-medium text-ink">{vaginismusHero.supportingHeadline}</p>
        <p className="mt-4 max-w-md text-lg leading-[var(--leading-relaxed)] text-ink-soft">{vaginismusHero.body}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={vaginismusHero.primaryCta.href} variant="primary">
            {vaginismusHero.primaryCta.label}
          </Button>
        </div>

        <div className="mt-6">
          <CtaLink href={vaginismusHero.secondaryCta.href}>{vaginismusHero.secondaryCta.label}</CtaLink>
        </div>
      </div>

      <span className="absolute top-4 right-4 z-10 rounded-xs bg-paper/90 px-2 py-1 font-body text-[0.6875rem] text-ink-soft">
        AI-generated illustration
      </span>
    </section>
  );
}
