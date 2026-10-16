import { DotFieldRegion } from "@/components/layout/dot-field-region";
import { ServiceFaqSection } from "../shared/service-faq-section";
import { naturalBirthFaq, naturalBirthHero, naturalBirthImagery } from "@/content/pages/natural-birth";

export function NaturalBirthFaq() {
  return (
    <DotFieldRegion>
      <ServiceFaqSection
        id="natural-birth-faq"
        eyebrow={naturalBirthFaq.eyebrow}
        heading={naturalBirthFaq.heading}
        description={naturalBirthHero.supportingHeadline}
        items={naturalBirthFaq.items}
        media={naturalBirthImagery.faq}
      />
    </DotFieldRegion>
  );
}
