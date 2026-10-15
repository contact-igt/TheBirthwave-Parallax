import { DotFieldRegion } from "@/components/layout/dot-field-region";
import { FaqSection } from "@/components/sections/home/faq-section";
import { naturalBirthFaq, naturalBirthHero, naturalBirthImagery } from "@/content/pages/natural-birth";

export function NaturalBirthFaq() {
  return (
    <DotFieldRegion>
      <FaqSection
        id="natural-birth-faq"
        eyebrow={naturalBirthFaq.eyebrow}
        heading={naturalBirthFaq.heading}
        description={naturalBirthHero.supportingHeadline}
        items={naturalBirthFaq.items}
        media={naturalBirthImagery.practical}
      />
    </DotFieldRegion>
  );
}
