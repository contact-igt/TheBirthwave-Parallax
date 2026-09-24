import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { DoctorsHero } from "@/components/sections/doctors/doctors-hero";
import { TeamJourney } from "@/components/sections/doctors/team-journey";
import { WhoCanSupportYourCare } from "@/components/sections/doctors/who-can-support-your-care";
import { WhoShouldYouConsult } from "@/components/sections/doctors/who-should-you-consult";
import { DoctorsEnquiryFormSection } from "@/components/sections/doctors/doctors-enquiry-form-section";

export const metadata: Metadata = {
  title: "Our Care Team: The Birthwave",
  description:
    "Meet the specialists behind The Birthwave's continuous journey of care, across women's health, pregnancy, birth, recovery and newborn care.",
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
 *
 * Lower-page refinement (post-`TeamJourney`): `MultidisciplinaryCare`
 * ("One patient journey. Multiple specialists. Connected care.") is
 * dropped from this page — that "one continuous journey" concept belongs
 * on Services/About and was repeating itself here. `DoctorsAppointmentCta`
 * (a standalone "Book an Appointment / WhatsApp Us" block that used to sit
 * between the old guidance section and the enquiry form) is dropped too:
 * back-to-back "get in touch" sections was its own kind of duplication,
 * and `DoctorsEnquiryFormSection` below now carries a stronger close of
 * its own (see that component's own comment) rather than a second,
 * separate CTA block first. Neither component file nor its content export
 * was deleted — both are still read by the pre-existing horizontal-journey
 * fallback (doctors-journey-scenes.tsx / doctors-master-journey.tsx),
 * which is out of scope for this pass — this page simply no longer
 * renders them. `WhoCanSupportYourCare` (specialty → clinician wayfinding,
 * routing to the matching `/services/[slug]` rather than back to a
 * "View Profile" the visitor is already past) fills the resulting gap.
 */
export default function DoctorsPage() {
  return (
    <PageShell>
      <DoctorsHero />
      <TeamJourney />
      <WhoCanSupportYourCare />
      <WhoShouldYouConsult />
      <DoctorsEnquiryFormSection />
    </PageShell>
  );
}
