import { doctors } from "@/content/doctors-content";
import { DoctorProfileContent } from "@/components/sections/doctors/doctor-profile-content";

/**
 * Featured Founder — the opening entry of the vertical directory (team-
 * directory rework), shown once. Large-portrait visual redesign: now
 * built on the SAME `DoctorProfileContent` every other profile uses
 * ("keep it part of the same profile system," per the brief) rather than
 * its own separate, duplicated markup — `featured` gives her a slightly
 * larger name, nothing else changes shape. The wrapper grid here is a
 * touch more generous than `DoctorProfileRow`'s own (`0.8fr/1.2fr`, ~40%/
 * 60%, vs. `DoctorProfileRow`'s ~43%/57%) — still inside the brief's own
 * 40–45%/55–60% range — reading as the featured entry without a
 * different visual system from the directory rows that follow it.
 *
 * Team-journey rework: this is now specifically the vertical FALLBACK's
 * own Founder presentation (`team-journey.tsx` renders it inside
 * `TeamJourneyVertical`) — the desktop horizontal journey presents the
 * Founder as its own first scene instead (`TeamJourneyScene`, unchanged
 * by this pass, built on the same shared `DoctorProfileContent`). The
 * `id="team-directory"` anchor both "Explore the Team" and "Who Should
 * You Consult?" target lives on `team-journey.tsx`'s own outer wrapper,
 * not here.
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
      {/* `overflow-x-hidden` — see DoctorProfileRow's own comment: clips
          the portrait's soft accent-wash bleed at this block's own
          boundary so it can never push a fraction of a px past the
          viewport edge on a narrow phone. */}
      <div className="container-birthwave grid gap-12 overflow-x-hidden sm:grid-cols-[0.8fr_1.2fr] sm:items-start sm:gap-16">
        <DoctorProfileContent
          doctor={founder}
          index={0}
          drift
          featured
          headingId="founder-heading"
          headingLevel="h2"
          portraitWrapperClassName="block w-full"
        />
      </div>
    </section>
  );
}
