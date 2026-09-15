import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DoctorContent } from "@/content/doctors-content";
import { getServiceBySlug } from "@/content/services-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";

/**
 * Renders one team member's profile — the shared template every
 * `/doctors/[slug]` page uses. Doctor data + image placeholder grid
 * pass: now reads the confirmed roster's fuller shape (qualification,
 * special focus, care areas, related care, a portrait placeholder) and
 * renders every one of those sections CONDITIONALLY — a field this
 * person's own entry doesn't confirm (most don't have `bio`; several
 * don't have `credentials`) is simply omitted, never replaced with
 * filler copy like "information coming soon."
 */
export function DoctorProfileTemplate({ doctor }: { doctor: DoctorContent }) {
  const relatedServices = (doctor.relatedCareSlugs ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((service) => service !== undefined);

  return (
    <article className="relative [padding-block-start:calc(var(--header-height)+var(--space-section))] [padding-block-end:var(--space-section)]">
      <div className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <PortraitPlaceholder photo={doctor.photo} corner="tr" />

          <div className="max-w-xl">
            <p className="eyebrow">{doctor.role}</p>
            <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">{doctor.name}</h1>
            {doctor.credentials ? <p className="mt-3 text-lg font-medium text-terracotta-deep">{doctor.credentials}</p> : null}
            {doctor.specialFocus ? <p className="mt-2 text-base text-ink-soft">{doctor.specialFocus}</p> : null}

            {doctor.careAreas && doctor.careAreas.length > 0 ? (
              <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                {doctor.careAreas.map((area, i) => (
                  <li key={area} className="flex items-center gap-3">
                    {i > 0 ? (
                      <span aria-hidden="true" className="text-ink-soft/40">
                        /
                      </span>
                    ) : null}
                    <span className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                      {area}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            {doctor.bio ? <p className="mt-8 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{doctor.bio}</p> : null}

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/#connect" variant="primary">
                Book an Appointment
              </Button>
            </div>

            {relatedServices.length > 0 ? (
              <div className="mt-12 border-t border-[var(--color-border)] pt-8">
                <p className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 uppercase">
                  Related Care
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group inline-flex items-center gap-1.5 font-body text-base font-semibold text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
                      >
                        <span className="border-b border-current/40 pb-0.5 group-hover:border-current">{service.name}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
