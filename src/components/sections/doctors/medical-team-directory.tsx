import { doctors, medicalTeamGridContent } from "@/content/doctors-content";
import { DoctorProfileRow } from "@/components/sections/doctors/doctor-profile-row";
import { DOCTORS_SURFACE_TONED } from "@/components/sections/doctors/doctors-surfaces";

/**
 * Medical & Clinical Team directory — team rework: one full-width
 * editorial profile row per doctor (`DoctorProfileRow`, shared with
 * `AlliedTeamDirectory`) in place of the previous four-column card grid.
 * A plain vertical stack, hairline-divided — no per-row background,
 * shadow or badge.
 */
export function MedicalTeamDirectory() {
  const team = doctors.filter((doctor) => doctor.team === "medical");
  if (team.length === 0) return null;

  return (
    <section aria-labelledby="medical-team-heading" className={`relative isolate section-pad ${DOCTORS_SURFACE_TONED}`}>
      <div className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{medicalTeamGridContent.eyebrow}</p>
          <h2
            id="medical-team-heading"
            className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {medicalTeamGridContent.heading}
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
