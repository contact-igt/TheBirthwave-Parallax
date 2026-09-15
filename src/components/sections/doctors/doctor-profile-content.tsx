import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DoctorContent, TeamCategory } from "@/content/doctors-content";
import { getServiceBySlug } from "@/content/services-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { cx } from "@/lib/cx";

const CATEGORY_LABELS: Record<TeamCategory, string> = {
  founder: "Founder",
  medical: "Medical & Clinical Team",
  allied: "Allied Care Team",
};

/**
 * The shared portrait + identity content for one team member — extracted
 * from `DoctorProfileRow` (team-directory rework) so the exact same
 * information hierarchy (small label, name, credentials, special focus,
 * biography, related care, "View full profile") renders identically
 * whether hosted in the vertical directory's stacked row
 * (`DoctorProfileRow`) or the horizontal team journey's full-viewport
 * scene (`TeamJourneyScene`, team-journey rework) — "one consistent
 * portrait/text arrangement rather than changing the layout for every
 * person," per that rework's own brief.
 *
 * Returns two siblings (a portrait `<Link>`, an info `<div>`), not one
 * wrapped element — each caller supplies its own grid/flex layout around
 * them.
 *
 * `showCategory`: off by default, preserving `DoctorProfileRow`'s
 * existing, already-approved output exactly (the role line doubles as
 * the small label there). The team journey's own scenes pass `true` —
 * "show the category as a small label within the profile scene," per
 * that rework's brief — which moves `role` down into a subtitle line
 * instead, so the two never say the same thing twice in different type
 * sizes.
 */
export function DoctorProfileContent({
  doctor,
  index,
  portraitWrapperClassName,
  portraitAttrs,
  drift = false,
  showCategory = false,
}: {
  doctor: DoctorContent;
  index: number;
  portraitWrapperClassName?: string;
  portraitAttrs?: Record<string, string>;
  drift?: boolean;
  showCategory?: boolean;
}) {
  const relatedServices = (doctor.relatedCareSlugs ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((service) => service !== undefined);

  const showSpecialFocus = doctor.specialFocus && doctor.specialFocus !== doctor.role;

  return (
    <>
      <Link
        href={`/doctors/${doctor.slug}`}
        aria-label={`View ${doctor.name}'s full profile`}
        className={portraitWrapperClassName ?? "block w-full max-w-[240px] sm:max-w-none"}
        {...portraitAttrs}
      >
        <PortraitPlaceholder
          photo={doctor.photo}
          index={index}
          corner={index % 2 === 0 ? "tr" : "tl"}
          className="w-full"
          drift={drift}
        />
      </Link>

      <div className="mt-6 sm:mt-0">
        {showCategory ? (
          <p className="font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
            {CATEGORY_LABELS[doctor.team]}
          </p>
        ) : (
          <p className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 uppercase">
            {doctor.role}
          </p>
        )}
        <h3
          className={cx(
            "leading-[1.15] font-semibold text-ink sm:text-[1.75rem]",
            showCategory ? "mt-3 text-[1.9rem]" : "mt-2 text-2xl",
          )}
        >
          {doctor.name}
        </h3>
        {showCategory ? <p className="mt-2 text-base text-ink-soft">{doctor.role}</p> : null}
        {doctor.credentials ? <p className="mt-2 font-medium text-terracotta-deep">{doctor.credentials}</p> : null}
        {showSpecialFocus ? <p className="mt-2 max-w-xl text-base text-ink-soft">{doctor.specialFocus}</p> : null}
        {doctor.bio ? (
          <p className="mt-4 max-w-2xl text-base leading-[var(--leading-relaxed)] text-ink-soft">{doctor.bio}</p>
        ) : null}

        {relatedServices.length > 0 ? (
          <div className="mt-5">
            <p className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-ink-soft/50 uppercase">
              Related Care
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm font-medium text-terracotta-deep underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Link
          href={`/doctors/${doctor.slug}`}
          className="group mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink transition-colors duration-[var(--duration-fast)] hover:text-terracotta-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
        >
          <span className="border-b border-current/40 pb-0.5 group-hover:border-current">View full profile</span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </>
  );
}
