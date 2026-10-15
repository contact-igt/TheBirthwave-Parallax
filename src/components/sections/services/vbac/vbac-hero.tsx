import { vbacHero } from "@/content/pages/vbac";
import { vbacImagery } from "@/content/pages/vbac";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 01 — HERO:
 * Premium split hero layout (55% content / 45% editorial framed image).
 */
export function VbacHero() {
  const image = vbacImagery.hero;

  return (
    <section
      id="vbac-hero"
      aria-label="VBAC (Vaginal Birth After Caesarean)"
      className="relative isolate overflow-hidden bg-paper-dim pt-[calc(var(--header-height)+2rem)] pb-12 lg:pt-[calc(var(--header-height)+3.5rem)] lg:pb-20"
    >
      <div className="container-birthwave">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left Column: Content (55%) */}
          <div className="max-w-2xl">
            <p className="eyebrow">{vbacHero.eyebrow}</p>
            <h1 className="mt-4 text-[clamp(2.25rem,1.5rem+3.4vw,3.8rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {vbacHero.heading}
            </h1>

            <p className="mt-5 max-w-xl text-lg font-medium leading-[var(--leading-relaxed)] text-ink sm:text-xl">
              {vbacHero.supportingLine}
            </p>

            <div className="mt-4 max-w-xl space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
              {vbacHero.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-10">
              <Button href={vbacHero.primaryCta.href} variant="primary">
                {vbacHero.primaryCta.label.replace(/\s*↗$/, "")}
              </Button>
              <CtaLink href={vbacHero.secondaryCta.href}>
                {vbacHero.secondaryCta.label}
              </CtaLink>
            </div>
          </div>

          {/* Right Column: Editorial Framed Media (45%) */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              data-vbac-image="hero"
              className="relative aspect-[4/3] sm:aspect-[4/4.2] lg:aspect-[4/4.6] w-full overflow-hidden rounded-tr-panel rounded-tl-sm rounded-br-sm rounded-bl-panel border border-[var(--color-border)] bg-paper shadow-sm"
              style={{ backgroundImage: image.gradient }}
            >
              <p className="absolute right-3.5 bottom-3.5 max-w-[calc(100%-2rem)] rounded-xs bg-paper/95 px-3 py-1.5 font-body text-[0.6875rem] leading-snug text-ink-soft shadow-xs backdrop-blur-xs">
                {image.alt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
