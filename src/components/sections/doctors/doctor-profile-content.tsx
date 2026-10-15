import Link from "next/link";
import styles from "./doctors-refinements.module.css";
import { ArrowUpRight } from "lucide-react";
import type { DoctorContent, TeamCategory } from "@/content/doctors-content";
import { getServiceBySlug } from "@/content/services-content";
import { HIDDEN_SERVICE_SLUGS } from "@/content/nav-care-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";

const CATEGORY_LABELS: Record<TeamCategory, string> = {
  founder: "Founder",
  medical: "Medical & Clinical Team",
  allied: "Allied Care Team",
};

/**
 * The shared portrait + identity content for one team member — large-
 * portrait visual redesign. One consistent editorial composition for
 * EVERY profile (Founder included — "keep it part of the same profile
 * system," per the brief, not a separate component): category eyebrow,
 * name, role, qualifications, specialty focus, an optional confirmed
 * description (missing descriptions are omitted),
 * an optional quote, then a CTA row (`Book a Consultation` + `View Full
 * Profile`), then Related Care.
 *
 * Returns two siblings (a portrait wrapper, an info `<div>`), not one
 * wrapped element — each caller supplies its own grid/column ratio around
 * them (`DoctorProfileRow`, `FounderSection`, and — unchanged by this
 * pass — `team-journey.tsx`'s own pinned horizontal scene, which this
 * component must keep rendering for: see `showCategory` below).
 *
 * `showCategory` is accepted but no longer branches anything — every
 * profile now always shows the category eyebrow (this component's own
 * prior dual-mode, one line duplicating `role` as a plain label and one
 * showing the real category, read confusingly like two different
 * features; unifying to one mode is itself part of this redesign). Kept
 * in the prop type ONLY so `team-journey.tsx`'s existing
 * `<DoctorProfileContent showCategory .../>` call — main Doctors-page
 * motion architecture, out of scope for this pass — keeps type-checking
 * and rendering exactly the same output it already did.
 */
export function DoctorProfileContent({
  doctor,
  index,
  portraitWrapperClassName,
  portraitAttrs,
  contentClassName,
  drift = false,
  featured = false,
  headingId,
  headingLevel: Heading = "h3",
  ...legacyProps
}: {
  doctor: DoctorContent;
  index: number;
  portraitWrapperClassName?: string;
  portraitAttrs?: Record<string, string>;
  /** Overrides the profile column's width (default `max-w-[38rem]`). */
  contentClassName?: string;
  drift?: boolean;
  /** A slightly stronger presentation — larger name, no effect on the
   * shared content structure itself. Used only by `FounderSection`. */
  featured?: boolean;
  /** `id` for the name heading — lets a caller's own `aria-labelledby`
   * reference it (`FounderSection` needs this; a row inside an already-
   * labelled directory grid doesn't). */
  headingId?: string;
  /** `FounderSection` is the page's only profile with no OTHER heading of
   * its own above it, so its name needs to be a real `h2` (matching the
   * level `MedicalTeamDirectory`/`AlliedTeamDirectory` give their own
   * section heading) rather than skip straight to `h3` under the page's
   * `h1` — every other caller keeps the default. */
  headingLevel?: "h2" | "h3";
  /** @deprecated no longer changes behavior — see this file's own top
   * comment. Kept only so `team-journey.tsx`'s existing call still
   * type-checks. */
  showCategory?: boolean;
}) {
  void legacyProps;
  const relatedServices = (doctor.relatedCareSlugs ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => service !== undefined && !HIDDEN_SERVICE_SLUGS.has(service.slug));

  const showSpecialFocus = doctor.specialFocus && doctor.specialFocus !== doctor.role;

  return (
    <>
      <div className={portraitWrapperClassName ?? "block w-full"} data-doctor-image {...portraitAttrs}>
        <div className="relative">
          <PortraitPlaceholder
            photo={doctor.photo}
            index={index}
            corner={index % 2 === 0 ? "tr" : "tl"}
            className="w-full"
            drift={drift}
            objectPosition={doctor.photoPosition}
            accentWash
          />
          {((doctor.careAreas && doctor.careAreas.length > 0) || doctor.specialFocus) ? (
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 z-20 rounded-xl bg-white/95 p-3 sm:p-3.5 shadow-[0_8px_20px_rgba(42,32,28,0.08)] border border-[#EAE1D7] backdrop-blur-xs max-w-[210px] sm:max-w-[240px]">
              <p className="text-[10px] font-semibold tracking-wider text-muted uppercase">SPECIALISES IN</p>
              <ul className="mt-1 space-y-1 text-xs font-medium text-espresso">
                {(doctor.careAreas ?? [doctor.specialFocus]).slice(0, 2).map((area, i) => (
                  <li key={area} className="flex items-center gap-1.5">
                    <span className={cx("size-1.5 rounded-full shrink-0", i === 0 ? "bg-terracotta" : "bg-sky")} />
                    <span className="truncate">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className={cx("mt-8 sm:mt-0", contentClassName ?? "max-w-[38rem]")} data-doctor-content>
        <div className="flex items-center gap-3">
          <p className="font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
            {CATEGORY_LABELS[doctor.team]}
          </p>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-0.5 w-6 rounded-full bg-terracotta/60" />
            <span className="h-0.5 w-6 rounded-full bg-sky/60" />
          </div>
        </div>

        <Heading
          id={headingId}
          className={cx(
            "leading-[1.12] font-semibold text-ink",
            featured ? "mt-4 text-[2.25rem] sm:text-[2.75rem]" : "mt-3 text-[1.9rem] sm:text-[2.1rem]",
          )}
        >
          {doctor.name}
        </Heading>
        <p className="mt-2 text-base text-ink-soft">{doctor.role}</p>
        {doctor.credentials ? <p className="mt-2 font-medium text-terracotta-deep">{doctor.credentials}</p> : null}
        {showSpecialFocus ? <p className="mt-2 text-base text-ink-soft">{doctor.specialFocus}</p> : null}

        {doctor.description ? (
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{doctor.description}</p>
        ) : null}

        {doctor.quote ? (
          <blockquote className="mt-6 border-l-2 border-[var(--color-border-strong)] py-1 pl-5 text-lg leading-[var(--leading-relaxed)] text-ink italic">
            “{doctor.quote}”
          </blockquote>
        ) : null}

        {doctor.team === "founder" ? (
          <ul className={styles.pills} aria-label="Care journey">
            {["Pregnancy", "Birth", "Recovery"].map((area) => <li key={area} className={styles.pill}>{area}</li>)}
          </ul>
        ) : null}

        {doctor.team !== "founder" && relatedServices.length === 0 && doctor.careAreas?.length ? (
          <ul className={styles.pills} aria-label="Care areas">
            {doctor.careAreas.map((area) => <li key={area} className={styles.pill}>{area}</li>)}
          </ul>
        ) : null}

        {relatedServices.length > 0 ? (
          <div className="mt-6">
            <ul className={styles.pills}>
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className={styles.pill}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Button href="/contact" variant="primary" className={styles.bookButton}>
            Book a Consultation
          </Button>
          <Link
            href={`/doctors/${doctor.slug}`}
            className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink transition-colors duration-[var(--duration-fast)] hover:text-terracotta-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
          >
            <span className="border-b border-current/40 pb-0.5 group-hover:border-current">View Full Profile</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
