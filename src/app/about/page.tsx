import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { AboutCinematicCanvas } from "@/components/sections/about/about-cinematic-canvas";
import { AboutFounderStory } from "@/components/sections/about/about-founder-story";
import { AboutHowWeCare } from "@/components/sections/about/about-how-we-care";
import { AboutTeamPreview } from "@/components/sections/about/about-team-preview";
import { AboutAppointmentCta } from "@/components/sections/about/about-appointment-cta";

export const metadata: Metadata = {
  title: "About: The Birth Wave",
  description:
    "Why BirthWave exists: one continuous journey of care across fertility, pregnancy, birth, recovery and newborn care.",
};

/**
 * About — visual architecture rework (content hierarchy unchanged from
 * Phase 1; see about-content.ts). Homepage is locked and untouched.
 *
 * `AboutCinematicCanvas` composes Sections 01–04 (Hero, Problem, Belief,
 * Founder Introduction) as one continuous pinned-atmosphere chapter, not
 * four separately-backgrounded sections — see that file's own doc comment
 * for the mechanism (pure CSS `position: sticky`, no motion library yet).
 * Sections 05–09 (Founder Story, How We Care, People Behind the Care +
 * Doctors CTA folded in, Final Appointment CTA) follow in normal
 * editorial document flow, each recomposed to remove the generic
 * repeated-rectangle rhythm Phase 1 had — see each component's own doc
 * comment for what changed and why.
 */
export default function AboutPage() {
  return (
    <PageShell>
      <AboutCinematicCanvas />
      <AboutFounderStory />
      <AboutHowWeCare />
      <AboutTeamPreview />
      <AboutAppointmentCta />
    </PageShell>
  );
}
