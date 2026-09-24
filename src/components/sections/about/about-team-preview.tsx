import Link from "next/link";
import { AboutPreviewImage } from "./about-preview-image";
import { aboutTeamPreview, aboutDoctorsCta } from "@/content/about-content";
import { doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { CtaLink } from "@/components/ui/cta-link";
import { cx } from "@/lib/cx";

/**
 * Section 07 — People Behind the Care, rebuilt as an editorial portrait
 * composition (visual architecture rework) — no cards, no uniform grid.
 * Three positional "slots" (large/primary, medium/offset-down,
 * small/partly bleeding off the right edge) cycle over whatever roster
 * exists in doctors-content.ts.
 *
 * Section 08 (Doctors CTA) is folded directly into this scene's close
 * — a large directional statement + link, not a separate banner section
 * — rather than kept as its own standalone `<section>`
 * (about-doctors-cta.tsx, from Phase 1, is retired).
 */
const SLOTS = [
  { width: "w-full sm:w-[42%]", aspect: "aspect-[4/5]", corner: "tr" as const, offset: "" },
  { width: "w-full sm:w-[30%]", aspect: "aspect-[4/5]", corner: "bl" as const, offset: "sm:mt-20" },
  { width: "w-full sm:w-[22%]", aspect: "aspect-[3/4]", corner: "br" as const, offset: "sm:mt-8 sm:-mr-6 lg:-mr-12" },
];

export function AboutTeamPreview() {
  const preview = doctors.slice(0, SLOTS.length);
  // Image-placeholder placement refinement: with exactly one approved
  // roster entry, the three-slot editorial composition below reads as
  // two empty gaps around a single portrait — not "one large, intentional
  // portrait" as the multi-entry composition intends. This single-entry
  // case gets its own simple intro-left/portrait-right layout instead
  // (stacking naturally on mobile, same as every other flex-col-first
  // section on this page); nothing here is hardcoded to "exactly one"
  // structurally, it's just which branch renders. The moment a second
  // approved entry lands, `preview.length` stops being 1 and the
  // untouched slot composition below takes back over on its own — no
  // invented doctors, no change needed here.
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
              <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{aboutTeamPreview.note}</p>
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
              <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{aboutTeamPreview.note}</p>
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

        {/* Doctors CTA (Section 08), folded in — a directional close, not
            a standalone banner. */}
        <div className="mt-24 flex flex-col items-start gap-6 border-t border-[var(--color-border)] pt-12 sm:mt-28 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <p className="text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-[1.15] font-semibold text-ink">
              {aboutDoctorsCta.heading}
            </p>
            <p className="mt-3 text-base text-ink-soft">{aboutDoctorsCta.supporting}</p>
          </div>
          <CtaLink href={aboutDoctorsCta.cta.href} className="shrink-0 text-lg">
            {aboutDoctorsCta.cta.label}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
