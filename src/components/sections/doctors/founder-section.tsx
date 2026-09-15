import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { doctors, founderSectionContent } from "@/content/doctors-content";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { Button } from "@/components/ui/button";

/**
 * Featured Founder — the opening entry of the vertical directory (team-
 * directory rework), shown once, with a slightly more generous
 * two-column composition (`0.8fr/1.2fr`, a touch wider than
 * `DoctorProfileRow`'s own ~35%/65% split) — enough to read as the
 * featured entry without a different visual system from the directory
 * rows that follow it.
 *
 * Team-journey rework: this is now specifically the vertical FALLBACK's
 * own Founder presentation (`team-journey.tsx` renders it inside
 * `TeamJourneyVertical`) — the desktop horizontal journey presents the
 * Founder as its own first scene instead (`TeamJourneyScene`, built on
 * the same shared `DoctorProfileContent`). The `id="team-directory"`
 * anchor both "Explore the Team" and "Who Should You Consult?" target now
 * lives on `team-journey.tsx`'s own outer wrapper (which contains BOTH
 * presentations), not here, since only one of the two is ever the active,
 * non-`display:none` element at a given viewport/motion preference.
 *
 * Reads the Founder directly from `doctors` (the one `team: "founder"`
 * entry) rather than a separate constant — one source of truth, same as
 * every other section on this page.
 */
export function FounderSection() {
  const founder = doctors.find((doctor) => doctor.team === "founder");
  if (!founder) return null;

  return (
    <section aria-labelledby="founder-heading" className="relative isolate bg-paper section-pad">
      <div className="container-birthwave grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <PortraitPlaceholder photo={founder.photo} corner="tr" className="w-full" drift />

        <div className="max-w-xl">
          <p className="eyebrow">{founderSectionContent.eyebrow}</p>
          <h2 id="founder-heading" className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
            {founder.name}
          </h2>
          {founder.credentials ? <p className="mt-3 text-lg font-medium text-terracotta-deep">{founder.credentials}</p> : null}
          <p className="mt-2 text-base font-semibold tracking-[var(--tracking-wider)] text-ink-soft/70 uppercase">
            {founder.role}
          </p>
          {founder.specialFocus ? <p className="mt-4 text-lg text-ink-soft">{founder.specialFocus}</p> : null}
          {founder.bio ? <p className="mt-6 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{founder.bio}</p> : null}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={founderSectionContent.cta.href} variant="primary">
              {founderSectionContent.cta.label}
            </Button>
            <Link
              href={`/doctors/${founder.slug}`}
              className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink transition-colors duration-[var(--duration-fast)] hover:text-terracotta-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
            >
              <span className="border-b border-current/40 pb-0.5 group-hover:border-current">View full profile</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
