import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { AboutCinematicCanvas } from "@/components/sections/about/about-cinematic-canvas";
import { AboutFounderStory } from "@/components/sections/about/about-founder-story";
import { AboutInsideClinic } from "@/components/sections/about/about-inside-clinic";
import { AboutHowWeCare } from "@/components/sections/about/about-how-we-care";
import { AboutTeamPreview } from "@/components/sections/about/about-team-preview";
import { AboutFirstVisit } from "@/components/sections/about/about-first-visit";
import { AboutClinicStrip } from "@/components/sections/about/about-clinic-strip";
import { AboutAppointmentCta } from "@/components/sections/about/about-appointment-cta";

import styles from "./about-backgrounds.module.css";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "About Us: The Birthwave",
  "Why The Birthwave exists: one continuous journey of care across fertility, pregnancy, birth, recovery and newborn care.",
  "/about",
);

/**
 * About — Complete Page Flow
 *
 * 1. Existing four-scene animated hero (AboutCinematicCanvas)
 * 2. Existing founder section, refined (AboutFounderStory)
 * 3. Inside The BirthWave clinic space (AboutInsideClinic)
 * 4. What connected care looks like (AboutHowWeCare)
 * 5. People behind the care (AboutTeamPreview)
 * 6. Your first visit (AboutFirstVisit)
 * 7. Compact clinic location strip (AboutClinicStrip)
 * 8. Final consultation CTA (AboutAppointmentCta)
 */
export default function AboutPage() {
  return (
    <PageShell>
      <div className={styles.page}>
      <AboutCinematicCanvas />
      <AboutFounderStory />
      <AboutInsideClinic />
      <AboutHowWeCare />
      <AboutTeamPreview />
      <AboutFirstVisit />
      <AboutClinicStrip />
      <AboutAppointmentCta />
      </div>
    </PageShell>
  );
}
