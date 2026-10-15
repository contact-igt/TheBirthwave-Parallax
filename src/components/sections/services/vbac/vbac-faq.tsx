import { DotFieldRegion } from "@/components/layout/dot-field-region";
import { FaqSection } from "@/components/sections/home/faq-section";
import { vbacFaq, vbacHero } from "@/content/pages/vbac";
import { servicesImagery } from "@/content/services-imagery";

export function VbacFaq() {
  return (
    <DotFieldRegion>
      <FaqSection
        id="vbac-faq"
        eyebrow={vbacFaq.eyebrow}
        heading={vbacFaq.heading}
        description={vbacHero.supportingLine}
        items={vbacFaq.items}
        media={servicesImagery.vbac}
      />
    </DotFieldRegion>
  );
}
