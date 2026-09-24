import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DoctorContent, TeamCategory } from "@/content/doctors-content";
import { getServiceBySlug } from "@/content/services-content";
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
 * name, role, qualifications, specialty focus, a description block that
 * ALWAYS renders something (real confirmed copy or an honest, quietly-
 * styled placeholder — never omitted, unlike every other optional field
 * here, which still follows this file's usual "if missing, omit" rule),
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
    .filter((service) => service !== undefined);

  const showSpecialFocus = doctor.specialFocus && doctor.specialFocus !== doctor.role;

  return (
    <>
      <div className={portraitWrapperClassName ?? "block w-full"} {...portraitAttrs}>
        <PortraitPlaceholder
          photo={doctor.photo}
          index={index}
          corner={index % 2 === 0 ? "tr" : "tl"}
          className="w-full"
          drift={drift}
          objectPosition={doctor.photoPosition}
          accentWash
        />
      </div>

      <div className="mt-8 max-w-[38rem] sm:mt-0">
        <p className="font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
          {CATEGORY_LABELS[doctor.team]}
        </p>
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

        {/* Description — the one field on this page that always renders
            something, per the brief's own explicit exception to "if
            missing, omit": a real confirmed sentence when one exists,
            otherwise a clearly-a-placeholder line, muted and italic so it
            never reads as finished copy. */}
        {doctor.description ? (
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{doctor.description}</p>
        ) : (
          <p className="mt-5 text-base leading-[var(--leading-relaxed)] text-ink-soft/50 italic">
            Profile description coming soon.
          </p>
        )}

        {doctor.quote ? (
          <blockquote className="mt-6 border-l-2 border-[var(--color-border-strong)] py-1 pl-5 text-lg leading-[var(--leading-relaxed)] text-ink italic">
            “{doctor.quote}”
          </blockquote>
        ) : null}

        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Button href="/#connect" variant="primary">
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

        {relatedServices.length > 0 ? (
          <div className="mt-6">
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
      </div>
    </>
  );
}
