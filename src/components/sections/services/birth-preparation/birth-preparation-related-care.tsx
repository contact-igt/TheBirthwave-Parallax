import { birthPrepRelatedCare } from "@/content/birth-preparation-landing-content";
import { ServiceRelatedCare } from "../shared/service-related-care";
import { BirthPrepReveal } from "./birth-preparation-reveal";

export function BirthPrepRelatedCare() {
  return (
    <ServiceRelatedCare
      id="birth-prep-related-care"
      eyebrow={birthPrepRelatedCare.eyebrow}
      heading={birthPrepRelatedCare.heading}
      description={birthPrepRelatedCare.intro}
      services={birthPrepRelatedCare.services}
      cta={birthPrepRelatedCare.cta}
      Reveal={BirthPrepReveal}
    />
  );
}
