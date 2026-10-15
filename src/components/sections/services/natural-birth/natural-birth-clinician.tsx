import Image from "next/image";
import { naturalBirthClinician } from "@/content/pages/natural-birth";
import { NaturalBirthReveal } from "./natural-birth-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 08 — YOUR OBSTETRICIAN:
 * Dr. Santoshini Nandigam — Natural Birth & VBAC Care specialist.
 */
export function NaturalBirthClinician() {
  const { doctor } = naturalBirthClinician;

  return (
    <section
      id="natural-birth-clinician"
      aria-labelledby="natural-birth-clinician-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <NaturalBirthReveal className="container-birthwave grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        {/* Doctor Photo */}
        <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-tl-panel rounded-tr-xs rounded-br-panel rounded-bl-xs border border-[var(--color-border)] bg-paper-warm shadow-md">
          <Image
            src={doctor.photo}
            alt={doctor.name}
            fill
            sizes="(max-width: 1023px) 90vw, 380px"
            className="object-cover"
            style={{ objectPosition: "50% 12%" }}
          />
        </div>

        {/* Doctor Details */}
        <div className="max-w-xl">
          <p className="eyebrow">{naturalBirthClinician.eyebrow}</p>
          <h2
            id="natural-birth-clinician-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {naturalBirthClinician.heading}
          </h2>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-ink">{doctor.name}</h3>
            <p className="mt-1 font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">
              {doctor.credentials}
            </p>
            <p className="mt-1 text-sm font-medium text-ink-soft">{doctor.role}</p>
            <span className="mt-2.5 inline-block rounded-xs bg-[var(--natural-birth-coral-wash)] px-2.5 py-1 text-xs font-semibold tracking-wide text-terracotta-deep">
              {doctor.specialtyBadge}
            </span>
          </div>

          <div className="mt-5 space-y-3.5 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {doctor.paragraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[var(--color-border)] pt-6">
            <Button href={doctor.primaryCta.href} variant="primary">
              {doctor.primaryCta.label.replace(/\s*↗$/, "")}
            </Button>
          </div>
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
