import { gynaecologyClinicians } from "@/content/gynaecology-landing-content";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { cx } from "@/lib/cx";
import { GynaecologyReveal } from "./gynaecology-reveal";

/**
 * Section 5 — The People Behind Your Care.
 * Dr. Santoshi Nandigam (Founder, Obstetrician & Gynaecologist) and
 * Dr. Bharathy Kandasamy (Gynaecologist, Laparoscopic Surgeon, Advanced Fertility Specialist).
 */
export function GynaecologyClinician() {
  const clinicians = gynaecologyClinicians.clinicians
    .map((item) => {
      const doctor = getDoctorBySlug(item.doctorSlug);
      return doctor ? { ...item, doctor } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (clinicians.length === 0) return null;

  return (
    <section
      id="gynaecology-clinician"
      aria-labelledby="gynaecology-clinician-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <GynaecologyReveal className="container-birthwave">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <p className="eyebrow">{gynaecologyClinicians.eyebrow}</p>
          <h2
            id="gynaecology-clinician-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {gynaecologyClinicians.heading}
          </h2>
        </div>

        <div className="space-y-16 lg:space-y-20">
          {clinicians.map((item, idx) => {
            const { doctor } = item;
            const doctorIndex = doctors.findIndex((d) => d.slug === doctor.slug);

            return (
              <div
                key={doctor.slug}
                className={cx(
                  "grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16",
                  idx > 0 && "border-t border-[var(--color-border)] pt-16 lg:pt-20",
                )}
              >
                <PortraitPlaceholder
                  photo={doctor.photo}
                  index={doctorIndex >= 0 ? doctorIndex : idx}
                  className="max-w-sm"
                />

                <div className="max-w-xl">
                  <h3 className="text-xl sm:text-2xl font-semibold text-ink">{doctor.name}</h3>
                  {doctor.credentials ? (
                    <p className="mt-2 text-sm text-ink-soft">{doctor.credentials}</p>
                  ) : null}
                  <p className="mt-1 text-sm text-ink-soft">{doctor.role}</p>

                  <p className="mt-6 border-l-2 border-terracotta pl-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">
                    {item.philosophy}
                  </p>

                  {item.highlight ? (
                    <p className="mt-4 text-sm font-medium text-terracotta-deep">{item.highlight}</p>
                  ) : null}

                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Button href={item.bookHref} variant="primary">
                      {item.bookLabel}
                    </Button>
                    <CtaLink href={item.profileHref}>{item.viewProfileLabel}</CtaLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GynaecologyReveal>
    </section>
  );
}
