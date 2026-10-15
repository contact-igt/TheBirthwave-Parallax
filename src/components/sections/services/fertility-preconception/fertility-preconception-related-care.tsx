import { fertilityRelatedCare } from "@/content/pages/fertility-preconception";
import { ServiceRelatedCare } from "../shared/service-related-care";

export function FertilityRelatedCare() {
  return (
    <ServiceRelatedCare
      id="fertility-related-care"
      eyebrow={fertilityRelatedCare.eyebrow}
      heading={fertilityRelatedCare.heading}
      services={fertilityRelatedCare.items.map((item) => ({ title: item.title, description: item.description, href: `/services/${item.slug}` }))}
    />
  );
}
