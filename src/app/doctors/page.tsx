import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { DoctorsMasterJourney } from "@/components/sections/doctors/doctors-master-journey";

export const metadata: Metadata = {
  title: "Our Care Team: The Birth Wave",
  description:
    "Meet the specialists behind BirthWave's continuous journey of care, across women's health, pregnancy, birth, recovery and newborn care.",
};

/**
 * /doctors — the master horizontal parallax journey (premium rework).
 * Homepage and About are locked and untouched by this route.
 *
 * Everything the page shows — Hero through the closing enquiry form —
 * lives inside `DoctorsMasterJourney` now: one continuous pinned
 * horizontal world on desktop, a normal stacked page below `lg` and under
 * reduced motion. See that component's own top comment for the full
 * architecture. Individual doctor detail pages (`/doctors/[slug]`,
 * `doctor-profile-template.tsx`) are unchanged.
 */
export default function DoctorsPage() {
  return (
    <PageShell>
      <DoctorsMasterJourney />
    </PageShell>
  );
}
