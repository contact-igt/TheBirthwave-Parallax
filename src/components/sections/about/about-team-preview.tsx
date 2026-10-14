import Link from "next/link";
import { AboutPreviewImage } from "./about-preview-image";
import { aboutTeamPreview } from "@/content/about-content";
import { doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { CtaLink } from "@/components/ui/cta-link";
import { cx } from "@/lib/cx";

/**
 * Section 08 — Our Care Team (People Behind the Care).
 * Editorial portrait composition cycling over the roster in doctors-content.ts.
 */
const SLOTS = [
  { width: "w-full sm:w-[42%]", aspect: "aspect-[4/5]", corner: "tr" as const, offset: "" },
  { width: "w-full sm:w-[30%]", aspect: "aspect-[4/5]", corner: "bl" as const, offset: "sm:mt-20" },
  { width: "w-full sm:w-[22%]", aspect: "aspect-[3/4]", corner: "br" as const, offset: "sm:mt-8 sm:-mr-6 lg:-mr-12" },
];

export function AboutTeamPreview() {
  const preview = doctors.slice(0, SLOTS.length);
  const isSingleEntry = preview.length === 1;

  return (
    <section
      id="about-team-preview"
      aria-labelledby="about-team-preview-heading"
      data-about-scene="team"
      className="relative isolate bg-paper section-pad"
    >
      <div className="container-birthwave">
        {isSingleEntry ? (
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <p className="eyebrow">{aboutTeamPreview.eyebrow}</p>
              <h2 id="about-team-preview-heading" className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
                {aboutTeamPreview.heading}
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                {aboutTeamPreview.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8">
                <CtaLink href={aboutTeamPreview.cta.href} className="text-base font-semibold sm:text-lg">
                  {aboutTeamPreview.cta.label}
                </CtaLink>
              </div>
            </div>

            <Link
              href={`/doctors/${preview[0].slug}`}
              className="group block w-full sm:w-[70%] lg:w-[38%] lg:shrink-0"
            >
              {preview[0].slug === "doctor-name-placeholder" ? (
                <AboutPreviewImage kind="portrait" />
              ) : (
                <PortraitPlaceholder
                  photo={preview[0].photo}
                  index={0}
                  corner={SLOTS[0].corner}
                  className="transition-[transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] group-hover:scale-[1.015]"
                />
              )}
              <p className="mt-4 font-body text-base font-medium text-ink transition-colors duration-[var(--duration-fast)] group-hover:text-terracotta-deep">
                {preview[0].name}
              </p>
              <p className="mt-0.5 text-sm text-ink-soft">{preview[0].role}</p>
            </Link>
          </div>
        ) : (
          <>
            <div className="max-w-2xl">
              <p className="eyebrow">{aboutTeamPreview.eyebrow}</p>
              <h2 id="about-team-preview-heading" className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
                {aboutTeamPreview.heading}
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                {aboutTeamPreview.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8">
                <CtaLink href={aboutTeamPreview.cta.href} className="text-base font-semibold sm:text-lg">
                  {aboutTeamPreview.cta.label}
                </CtaLink>
              </div>
            </div>

            <div className="mt-16 flex flex-col items-start gap-12 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-8 sm:gap-y-0 lg:flex-nowrap">
              {preview.map((doctor, index) => {
                const slot = SLOTS[index] ?? SLOTS[SLOTS.length - 1];
                return (
                  <Link
                    key={doctor.slug}
                    href={`/doctors/${doctor.slug}`}
                    className={cx("group block", slot.width, slot.offset)}
                  >
                    {doctor.slug === "doctor-name-placeholder" ? (
                      <AboutPreviewImage kind="portrait" />
                    ) : (
                      <PortraitPlaceholder
                        photo={doctor.photo}
                        index={index}
                        corner={slot.corner}
                        className="transition-[transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] group-hover:scale-[1.015]"
                      />
                    )}
                    <p className="mt-4 font-body text-base font-medium text-ink transition-colors duration-[var(--duration-fast)] group-hover:text-terracotta-deep">
                      {doctor.name}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-soft">{doctor.role}</p>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
