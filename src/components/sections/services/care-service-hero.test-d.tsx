import { CareServiceHero } from "./care-service-hero";

export const minimumHero = (
  <CareServiceHero
    id="service-hero"
    eyebrow="Women's Health"
    heading="Care at every stage"
    supporting="Clear, compassionate care."
    fallbackLabel="Approved photography pending"
    fallbackGradient="linear-gradient(#fff, #ead7c7)"
  />
);

export const completeHero = (
  <CareServiceHero
    eyebrow="Pregnancy Care"
    heading="Care through every stage"
    supporting="Support built around you."
    body="Ask questions and understand your next step."
    primaryCta={{ label: "Book a consultation", href: "/contact" }}
    secondaryCta={{ label: "Explore care", href: "#care" }}
    image={{
      src: "/images/clinic/doctor-hero.png",
      alt: "A clinician speaking with a patient",
      focalPoint: { mobile: "50% 30%", desktop: "70% 30%" },
    }}
    disclosure="AI-generated illustration"
    location="Nungambakkam, Chennai"
  />
);
