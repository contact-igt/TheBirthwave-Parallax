import { PageShell } from "@/components/layout/page-shell";
import { DotFieldRegion } from "@/components/layout/dot-field-region";
import { HeroPhilosophyScrollScene } from "@/components/sections/home/hero-philosophy-scroll-scene";
import { JourneySection } from "@/components/sections/home/journey-section";
import { ImmersiveSection } from "@/components/sections/home/immersive-section";
import { CareSection } from "@/components/sections/home/care-section";
import { FaqSection } from "@/components/sections/home/faq-section";
import { FinalCtaSection } from "@/components/sections/home/final-cta-section";

// Rendered explicitly, not mapped from a separate order array (the
// pre-rework home-section-order.ts this replaced) — DotFieldRegion no
// longer wraps "everything between the hero and the final CTA" the way it
// used to, it wraps exactly one named section, FAQ (see
// docs/implementation-brief.md §24), so there's no longer a positional
// rule to derive that wrapping from, and a separate order-only file would
// just be a second source of truth this one could drift from.
export default function Home() {
  return (
    <PageShell>
      <HeroPhilosophyScrollScene />
      <JourneySection />
      <ImmersiveSection />
      <CareSection />
      <DotFieldRegion>
        <FaqSection />
      </DotFieldRegion>
      <FinalCtaSection />
    </PageShell>
  );
}
