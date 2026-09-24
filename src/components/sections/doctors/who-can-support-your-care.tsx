"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { whoCanSupportYourCare, whoCanSupportGroups, type DoctorContent } from "@/content/doctors-content";
import { getServiceBySlug } from "@/content/services-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * Section 01 (lower-page refinement) — Who Can Support This Part Of Your
 * Care? Specialty-to-clinician wayfinding, replacing the removed "Our
 * Patient Journey / Multiple Specialties, Connected Care" section (that
 * concept belongs on Services/About; this page's own job is routing a
 * visitor to the right PERSON). Never "View Profile" — the visitor is
 * already on the Doctors page — so every CTA here points either at the
 * matching `/services/[slug]` route ("Explore Related Care", where a
 * confirmed mapping exists) or the general booking anchor ("Book a
 * Consultation", for the Founder's group, which has no confirmed
 * `relatedCareSlugs` to route to). The last group (three allied-care
 * professionals under one heading) carries no CTA at all — one link per
 * person there would read as clutter, not help.
 *
 * Quiet by design, deliberately calmer than `TeamJourney` above: a plain
 * hairline-divided list (the same "editorial question/answer row"
 * language `WhoShouldYouConsult` already uses on this page), one-shot
 * `useScrollReveal` per row — no pin, no GSAP, no card boxes.
 *
 * Portrait-prominence refinement: a real 4:5 portrait rather than an
 * icon-sized thumbnail — plus a wider clinician-content column
 * (`sm:grid-cols-[0.55fr_1fr]`, ~35%/65%, up from an earlier ~52%/48%,
 * which had the specialty label taking MORE room than the clinician
 * side) so names and roles don't read compressed. A multi-person group
 * (today, only the last one) lays out as a lightweight mini-grid at
 * `lg:` — one column on mobile/tablet, up to three side by side once the
 * clinician column is wide enough — rather than a plain vertical stack.
 *
 * Rectangular-portrait refinement (this pass): `shape="rect"` on
 * `PortraitPlaceholder` — a plain, uniformly-rounded tile (`rounded-2xl`)
 * instead of the site's signature deep-corner "arch" frame every OTHER
 * portrait on this page still uses (Hero, Founder, the team directory,
 * `/doctors/[slug]`, all untouched). A deliberate one-section exception:
 * this row is a compact specialty-lookup list, not an editorial photo
 * moment, and the brief wants it reading as a clean, scannable tile.
 * `w-20 sm:w-24` (80px mobile → 96px desktop, both inside the brief's own
 * 72–90px/88–96px ranges), up from the previous `w-14 sm:w-20`
 * (56px/80px).
 */
export function WhoCanSupportYourCare() {
  return (
    <section
      id="who-can-support-your-care"
      aria-labelledby="who-can-support-heading"
      className="relative isolate bg-paper section-pad"
    >
      <div className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{whoCanSupportYourCare.eyebrow}</p>
          <h2
            id="who-can-support-heading"
            className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {whoCanSupportYourCare.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{whoCanSupportYourCare.intro}</p>
        </div>

        <div className="mt-14 flex flex-col border-t border-[var(--color-border)]">
          {whoCanSupportGroups.map((group) => (
            <SpecialtyRow key={group.label} label={group.label} members={group.members} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecialtyRow({ label, members }: { label: string; members: DoctorContent[] }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();
  // Only a single-person group ever gets a care-area CTA — see this
  // file's own top comment on why a multi-person group stays quiet.
  const soloMember = members.length === 1 ? members[0] : null;
  const isGroup = members.length > 1;

  return (
    <div
      ref={ref}
      className={cx(
        "grid gap-4 border-b border-[var(--color-border)] py-9 transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:grid-cols-[0.55fr_1fr] sm:items-start sm:gap-8",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <p className="text-[clamp(1.35rem,1.15rem+0.9vw,1.75rem)] leading-[1.2] font-semibold text-ink">{label}</p>

      {isGroup ? (
        // Multi-person group — a lightweight mini-grid, not several tiny
        // portraits stacked in a column: one per row on mobile/tablet, up
        // to three across once the clinician column (~65% of the
        // container at `lg:`) is wide enough to hold them without
        // cramping. No per-person CTA here (see this file's own top
        // comment).
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-3">
          {members.map((doctor) => (
            <PersonLine key={doctor.slug} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {members.map((doctor) => (
            <PersonLine key={doctor.slug} doctor={doctor} />
          ))}
          {soloMember ? <RelatedCareCta doctor={soloMember} className="ml-24 sm:ml-28" /> : null}
        </div>
      )}
    </div>
  );
}

function PersonLine({ doctor }: { doctor: DoctorContent }) {
  return (
    <div className="flex items-center gap-4">
      <PortraitPlaceholder
        photo={doctor.photo}
        shape="rect"
        sizes="(max-width: 639px) 80px, 96px"
        className="w-20 shrink-0 sm:w-24"
      />
      <div>
        <p className="font-body text-base font-semibold text-ink sm:text-lg">{doctor.name}</p>
        <p className="mt-0.5 text-sm leading-[1.4] text-ink-soft">{doctor.role}</p>
      </div>
    </div>
  );
}

function RelatedCareCta({ doctor, className }: { doctor: DoctorContent; className?: string }) {
  const primarySlug = doctor.relatedCareSlugs?.[0];
  const service = primarySlug ? getServiceBySlug(primarySlug) : undefined;

  if (service) {
    return (
      <Link
        href={`/services/${service.slug}`}
        aria-label={`Explore Related Care: ${service.name}`}
        className={cx(
          "group inline-flex w-fit items-center gap-1.5 rounded-xs py-1 font-body text-sm font-semibold text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]",
          className,
        )}
      >
        Explore Related Care
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    );
  }

  // No confirmed `relatedCareSlugs` for this person (the Founder) — a
  // generic booking link, never a guessed service mapping.
  return (
    <Link
      href="/#connect"
      aria-label={`Book a Consultation with ${doctor.name}`}
      className={cx(
        "group inline-flex w-fit items-center gap-1.5 rounded-xs py-1 font-body text-sm font-semibold text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]",
        className,
      )}
    >
      Book a Consultation
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
