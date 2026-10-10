import { PageShell } from "@/components/layout/page-shell";
import { DotFieldRegion } from "@/components/layout/dot-field-region";
import { HeroPhilosophyScrollScene } from "@/components/sections/home/hero-philosophy-scroll-scene";
import { JourneySection } from "@/components/sections/home/journey-section";
import { TeamIntroSection } from "@/components/sections/home/team-intro-section";
import { CareSection } from "@/components/sections/home/care-section";
import { CareDiscoverySection } from "@/components/sections/home/care-discovery-section";
import { FirstVisitSection } from "@/components/sections/home/first-visit-section";
import { FaqSection } from "@/components/sections/home/faq-section";
import { VisitClinicSection } from "@/components/sections/home/visit-clinic-section";
import { FinalCtaSection } from "@/components/sections/home/final-cta-section";

export default function Home() {
  return (
    <PageShell>
      {/* 1 & 2. Hero & Opening Philosophy Scene */}
      <HeroPhilosophyScrollScene />

      {/* 3. The 6-Stage Care Journey */}
      <JourneySection />

      {/* 4. Team Introduction (Repurposing "A Moment") */}
      <TeamIntroSection />

      {/* 5. How We Care (4 Core Principles) */}
      <CareSection />

      {/* 6. Service Overview (6 Pathways) */}
      <CareDiscoverySection />

      {/* 7. Your First Visit, Made Clearer (3-Step Connected Sequence) */}
      <FirstVisitSection />

      {/* 8. Frequently Asked Questions.
          Testimonials (ReviewsSection) are deliberately NOT rendered: its
          three quotes, names, localities and 5-star ratings are illustrative
          placeholders with no approved source or patient consent (see that
          file's own TODO). Re-add it only with client-approved reviews. */}
      <DotFieldRegion>
        <FaqSection />
      </DotFieldRegion>

      {/* 9. Visit The Birthwave (Clinic Video & Location Showcase) */}
      <VisitClinicSection />

      {/* 10. Final Consultation CTA */}
      <FinalCtaSection />
    </PageShell>
  );
}
