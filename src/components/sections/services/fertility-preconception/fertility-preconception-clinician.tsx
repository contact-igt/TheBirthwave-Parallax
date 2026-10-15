import { fertilityClinicians } from "@/content/pages/fertility-preconception";
import { getDoctorBySlug, doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/**
 * Section 6 — The People Behind Your Care.
 * Meet your clinicians: Dr. Santoshi Nandigam and Dr. Bharathy Kandasamy.
 */
export function FertilityClinician() {
  const clinicians = fertilityClinicians.clinicians
    .map((item) => {
      const doctor = getDoctorBySlug(item.doctorSlug);
      return doctor ? { ...item, doctor } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (clinicians.length === 0) return null;

  return (
    <section
      id="fertility-clinician"
      aria-labelledby="fertility-clinician-heading"
      className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad"
    >
      <div className="container-birthwave">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <p className="eyebrow">{fertilityClinicians.eyebrow}</p>
          <h2
            id="fertility-clinician-heading"
            className={cx(styles.display, styles.h2, "mt-4 max-w-[28ch]")}
          >
            {fertilityClinicians.heading}
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
                  "grid items-center gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20",
                  idx > 0 && "border-t border-[var(--color-border)] pt-16 lg:pt-20"
                )}
              >
                <PortraitPlaceholder
                  photo={doctor.photo}
                  index={doctorIndex >= 0 ? doctorIndex : idx}
                  className="w-full max-w-xs lg:max-w-sm"
                />

                <div className="max-w-2xl">
                  <h3 className={cx(styles.display, styles.name)}>{item.name || doctor.name}</h3>
                  {item.credentials || doctor.credentials ? (
                    <p className="mt-3 font-body text-lg font-semibold text-ink">
                      {item.credentials || doctor.credentials}
                    </p>
                  ) : null}
                  <p className="mt-1 font-body text-base text-ink-soft">{item.role || doctor.role}</p>
                  {item.specialFocus ? (
                    <p className="mt-2 font-body text-sm font-medium text-terracotta-deep">
                      {item.specialFocus}
                    </p>
                  ) : null}

                  <div className="mt-5 space-y-3 max-w-[56ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
                    {item.description.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

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
      </div>
    </section>
  );
}
