import { fertilityFaq } from "@/content/pages/fertility-preconception";
import { ServiceFaqSection } from "../shared/service-faq-section";

export function FertilityFaq() {
  return <ServiceFaqSection id="fertility-faq" eyebrow={fertilityFaq.eyebrow} heading={fertilityFaq.heading} items={fertilityFaq.items} />;
}
