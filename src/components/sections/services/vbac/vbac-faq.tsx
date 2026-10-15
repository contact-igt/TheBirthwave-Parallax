import { DotFieldRegion } from "@/components/layout/dot-field-region";
import { ServiceFaqSection } from "../shared/service-faq-section";
import { vbacFaq, vbacHero } from "@/content/pages/vbac";
import { servicesImagery } from "@/content/services-imagery";

export function VbacFaq() {
  return (
    <DotFieldRegion>
      <ServiceFaqSection
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
