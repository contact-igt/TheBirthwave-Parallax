import Image from "next/image";
import { vbacClinician } from "@/content/pages/vbac";
import { VbacReveal } from "./vbac-reveal";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 08 — YOUR OBSTETRICIAN / DOCTOR IN FOCUS:
 * Premium 2-column editorial layout: Left arched portrait with credential chip, Right details & CTAs.
 */
export function VbacClinician() {
  const { doctor } = vbacClinician;

  return (
    <section id="vbac-clinician" aria-labelledby="vbac-clinician-heading" className="relative isolate overflow-hidden border-t border-[var(--color-border)] bg-paper-dim/60 section-pad">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/natural-birth/natural-birth-approach-background-v1.png')] bg-cover bg-center" />
      <VbacReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
          {/* Doctor Portrait with Arched Frame */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-tl-panel rounded-tr-panel rounded-bl-sm rounded-br-panel border border-[var(--color-border)] bg-paper p-2.5 shadow-md">
              <div className="relative h-full w-full overflow-hidden rounded-tl-panel rounded-tr-panel rounded-bl-xs rounded-br-panel">
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 1023px) 90vw, 420px"
                  className="object-cover"
                  style={{ objectPosition: "50% 12%" }}
                />
              </div>
            </div>
            {/* Floating credential chip */}
            <div className="absolute -bottom-3 right-4 sm:right-6 rounded-full border border-[var(--color-border)] bg-paper px-4 py-1.5 shadow-sm">
              <span className="font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">
                {doctor.credentials}
              </span>
            </div>
          </div>

          {/* Doctor Details & Biography */}
          <div className="max-w-xl">
            <p className="eyebrow">{vbacClinician.eyebrow}</p>
            <h2 id="vbac-clinician-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {vbacClinician.heading}
            </h2>

            <div className="mt-6 border-l-2 border-terracotta pl-5">
              <h3 className="text-2xl font-semibold text-ink">{doctor.name}</h3>
              <p className="mt-1 font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">
                {doctor.credentials}
              </p>
              <p className="mt-1 text-sm font-medium text-ink-soft">{doctor.role}</p>
              <span className="mt-2.5 inline-block rounded-xs bg-[var(--vbac-coral-wash)] px-2.5 py-1 text-xs font-semibold tracking-wide text-terracotta-deep">
                {doctor.specialtyBadge}
              </span>
            </div>

            <div className="mt-6 space-y-3.5 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
              {doctor.paragraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[var(--color-border)] pt-6">
              <Button href={doctor.primaryCta.href} variant="primary">
                {doctor.primaryCta.label.replace(/\s*↗$/, "")}
              </Button>
              <CtaLink href={doctor.secondaryCta.href}>
                {doctor.secondaryCta.label.replace(/\s*↗$/, "")}
              </CtaLink>
            </div>
          </div>
        </div>
      </VbacReveal>
    </section>
  );
}
