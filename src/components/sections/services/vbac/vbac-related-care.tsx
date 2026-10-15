import { vbacRelatedCare } from "@/content/pages/vbac";
import { ServiceRelatedCare } from "../shared/service-related-care";
import { VbacReveal } from "./vbac-reveal";

export function VbacRelatedCare() {
  return (
    <ServiceRelatedCare
      id="vbac-related-care"
      eyebrow={vbacRelatedCare.eyebrow}
      heading={vbacRelatedCare.heading}
      services={vbacRelatedCare.services.map((service) => ({ ...service, title: service.title.replace(/\s*↗$/, "") }))}
      Reveal={VbacReveal}
    />
  );
}
