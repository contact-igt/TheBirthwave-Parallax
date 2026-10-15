import { vaginismusRelatedCare } from "@/content/pages/vaginismus";
import { ServiceRelatedCare } from "../shared/service-related-care";
import { VaginismusReveal } from "./vaginismus-reveal";

export function VaginismusRelatedCare() {
  return (
    <ServiceRelatedCare
      id="vaginismus-related-care"
      eyebrow={vaginismusRelatedCare.eyebrow}
      heading={vaginismusRelatedCare.heading}
      description={vaginismusRelatedCare.note}
      services={vaginismusRelatedCare.items.map((item) => ({ title: item.label, description: item.description, href: `/services/${item.slug}` }))}
      Reveal={VaginismusReveal}
    />
  );
}
