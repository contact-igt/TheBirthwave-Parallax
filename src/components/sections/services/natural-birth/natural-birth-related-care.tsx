import { naturalBirthRelatedCare } from "@/content/pages/natural-birth";
import { ServiceRelatedCare } from "../shared/service-related-care";
import { NaturalBirthReveal } from "./natural-birth-reveal";

export function NaturalBirthRelatedCare() {
  return (
    <ServiceRelatedCare
      id="natural-birth-related-care"
      eyebrow={naturalBirthRelatedCare.eyebrow}
      heading={naturalBirthRelatedCare.heading}
      description={naturalBirthRelatedCare.intro}
      services={naturalBirthRelatedCare.services.map((service) => ({ ...service, title: service.title.replace(/\s*→$/, "") }))}
      Reveal={NaturalBirthReveal}
    />
  );
}
