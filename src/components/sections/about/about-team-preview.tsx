import Link from "next/link";
import { AboutPreviewImage } from "./about-preview-image";
import { aboutTeamPreview } from "@/content/about-content";
import { doctors } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { CtaLink } from "@/components/ui/cta-link";
import { cx } from "@/lib/cx";

/**
 * Section 08 — Our Care Team (People Behind the Care).
 * Editorial portrait composition for the first two clinicians in the roster.
 */
const SLOTS = [
  {
    card: "w-full max-w-[20rem] justify-self-center",
    corner: "tr" as const,
    offset: "",
  },
  {
    card: "w-full max-w-[17rem] justify-self-center",
    corner: "bl" as const,
    offset: "sm:mt-14",
  },
];

export function AboutTeamPreview() {
  const preview = doctors
    .filter((doctor) => doctor.slug !== "dr-bharathy-kandasamy")
    .slice(0, SLOTS.length)
    .map((doctor) =>
      doctor.slug === "dr-santoshi-nandigam"
        ? {
          ...doctor,
          photo: {
            ...doctor.photo,
            src: "/images/web-ready/heroservice.JPG",
          },
        }
        : doctor,
    );
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
              className="group block w-full max-w-[20rem] self-center lg:shrink-0"
            >
              {preview[0].slug === "doctor-name-placeholder" ? (
                <AboutPreviewImage kind="portrait" />
              ) : (
                <PortraitPlaceholder
                  photo={preview[0].photo}
                  index={0}
                  corner={SLOTS[0].corner}
                  sizes="(max-width: 639px) calc(100vw - 40px), 320px"
                  className="transition-[transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              )}
              <p className="mt-4 font-body text-base font-medium text-ink transition-colors duration-[var(--duration-fast)] group-hover:text-terracotta-deep">
                {preview[0].name}
              </p>
              <p className="mt-0.5 text-sm text-ink-soft">{preview[0].role}</p>
            </Link>
          </div>
        ) : (
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
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

            <div className="mx-auto grid w-full max-w-[39rem] gap-10 sm:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] sm:items-start sm:gap-6 lg:mx-0">
              {preview.map((doctor, index) => {
                const slot = SLOTS[index] ?? SLOTS[SLOTS.length - 1];
                return (
                  <Link
                    key={doctor.slug}
                    href={`/doctors/${doctor.slug}`}
                    className={cx("group block", slot.card, slot.offset)}
                  >
                    {doctor.slug === "doctor-name-placeholder" ? (
                      <AboutPreviewImage kind="portrait" />
                    ) : (
                      <PortraitPlaceholder
                        photo={doctor.photo}
                        index={index}
                        corner={slot.corner}
                        sizes={index === 0 ? "(max-width: 639px) calc(100vw - 40px), 320px" : "(max-width: 639px) calc(100vw - 40px), 272px"}
                        className="transition-[transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
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
          </div>
        )}
      </div>
    </section>
  );
}
