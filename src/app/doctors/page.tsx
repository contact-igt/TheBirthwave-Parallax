import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { DoctorsHero } from "@/components/sections/doctors/doctors-hero";
import { TeamJourney } from "@/components/sections/doctors/team-journey";
import { MultidisciplinaryCare } from "@/components/sections/doctors/multidisciplinary-care";
import { WhoShouldYouConsult } from "@/components/sections/doctors/who-should-you-consult";
import { DoctorsAppointmentCta } from "@/components/sections/doctors/doctors-appointment-cta";
import { DoctorsEnquiryFormSection } from "@/components/sections/doctors/doctors-enquiry-form-section";

export const metadata: Metadata = {
  title: "Our Care Team: The Birth Wave",
  description:
    "Meet the specialists behind BirthWave's continuous journey of care, across women's health, pregnancy, birth, recovery and newborn care.",
};

/**
 * /doctors — team-journey rework. The three previously separate sections
 * (FounderSection, MedicalTeamDirectory, AlliedTeamDirectory) are now
 * unified under TeamJourney, which presents all 10 confirmed roster
 * members as:
 *   - Desktop (≥1024px, normal motion): one pinned horizontal track that
 *     scrolls through every doctor scene, with Prev/Next keyboard controls
 *     and a visible "Skip team presentation" link for keyboard users.
 *   - Mobile / reduced motion / content-overflow fallback: the same vertical
 *     directory (Founder → Medical & Clinical → Allied Care) that the
 *     three older sections produced, rendered through the same shared
 *     `DoctorProfileRow` / `DoctorProfileContent` components.
 *
 * The `id="team-directory"` anchor — targeted by both the Hero's
 * "Explore the Team" CTA and WhoShouldYouConsult's own link — now lives on
 * TeamJourney's outer wrapper (which is always in the DOM, containing
 * whichever presentation is active) rather than on FounderSection (which
 * is hidden inside TeamJourneyDesktop at large viewports).
 *
 * Individual doctor detail pages (`/doctors/[slug]`,
 * `doctor-profile-template.tsx`) and their routes are unchanged.
 */
export default function DoctorsPage() {
  return (
    <PageShell>
      <DoctorsHero />
      <TeamJourney />
      <MultidisciplinaryCare />
      <WhoShouldYouConsult />
      <DoctorsAppointmentCta />
      <DoctorsEnquiryFormSection />
    </PageShell>
  );
}
