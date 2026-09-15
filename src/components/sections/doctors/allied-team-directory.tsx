import { doctors, alliedTeamGridContent } from "@/content/doctors-content";
import { DoctorProfileRow } from "@/components/sections/doctors/doctor-profile-row";

/**
 * Allied Care Team directory — same `DoctorProfileRow` system as
 * `MedicalTeamDirectory`, one directory across both sections. Shorter
 * confirmed content (several entries have no credentials/bio) simply
 * produces a shorter row — never padded out to match a longer one.
 */
export function AlliedTeamDirectory() {
  const team = doctors.filter((doctor) => doctor.team === "allied");
  if (team.length === 0) return null;

  return (
    <section aria-labelledby="allied-team-heading" className="relative isolate bg-paper section-pad">
      <div className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{alliedTeamGridContent.eyebrow}</p>
          <h2
            id="allied-team-heading"
            className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {alliedTeamGridContent.heading}
          </h2>
        </div>

        <div className="mt-12">
          {team.map((doctor, index) => (
            <DoctorProfileRow key={doctor.slug} doctor={doctor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
