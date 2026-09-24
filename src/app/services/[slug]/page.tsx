import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { ServicePageTemplate } from "@/features/services/service-page-template";
import { services, getServiceBySlug } from "@/content/services-content";
import { PregnancyAntenatalLandingPage } from "@/components/sections/services/pregnancy-antenatal/pregnancy-antenatal-landing-page";
import { BirthPreparationLandingPage } from "@/components/sections/services/birth-preparation/birth-preparation-landing-page";
import { NormalBirthDeliveryLandingPage } from "@/components/sections/services/normal-birth-delivery/normal-birth-delivery-landing-page";
import { VbacLandingPage } from "@/components/sections/services/vbac/vbac-landing-page";
import { FertilityPreconceptionLandingPage } from "@/components/sections/services/fertility-preconception/fertility-preconception-landing-page";
import { VaginismusLandingPage } from "@/components/sections/services/vaginismus/vaginismus-landing-page";
import { GynaecologyLandingPage } from "@/components/sections/services/gynaecology/gynaecology-landing-page";
import { LactationLandingPage } from "@/components/sections/services/lactation/lactation-landing-page";
import { PostpartumLandingPage } from "@/components/sections/services/postpartum-care/postpartum-care-landing-page";
import { NutritionLandingPage } from "@/components/sections/services/nutrition-emotional-wellbeing/nutrition-emotional-wellbeing-landing-page";
import { NewbornLandingPage } from "@/components/sections/services/newborn-pediatric-care/newborn-pediatric-care-landing-page";
import { NaturalBirthLandingPage } from "@/components/sections/services/natural-birth/natural-birth-landing-page";

/** The slugs with their own dedicated landing page — every other slug
 * keeps rendering through the unmodified, shared `ServicePageTemplate`.
 * Route generation, metadata and the shared `services-content.ts` record
 * are unchanged for all 12 services; only these routes' own BODY swaps. */
const DEDICATED_LANDING_SLUGS = new Set([
  "pregnancy-antenatal-care",
  "birth-preparation",
  "normal-birth-delivery",
  "vbac",
  "fertility-preconception",
  "vaginismus",
  "gynaecology",
  "lactation",
  "postpartum-care",
  "nutrition-emotional-wellbeing",
  "newborn-pediatric-care",
  "natural-birth",
]);

/** Fuller, ad-relevant meta descriptions for dedicated landing pages,
 * consistent with each page's own confirmed content — not the shared
 * template's generic fallback. Every other slug's metadata is unchanged. */
const DEDICATED_LANDING_DESCRIPTIONS: Record<string, string> = {
  "birth-preparation":
    "Explore childbirth education and birth-planning conversations at The Birthwave. Learn what to expect and enquire about available preparation sessions.",
  "normal-birth-delivery":
    "Explore The Birthwave's labour support and delivery care. Discuss vaginal birth preferences, understand care arrangements and enquire about a consultation.",
  vbac: "Explore questions to discuss when considering a vaginal birth after a previous caesarean. Enquire about a VBAC consultation at The Birthwave.",
  "fertility-preconception":
    "Planning pregnancy or looking for fertility guidance? Explore The Birthwave's Fertility & Preconception consultation pathway and discuss your health, questions and next steps.",
  vaginismus:
    "Experiencing difficulty or discomfort with penetration or intimate examinations? Explore The Birthwave's Vaginismus & Intimate Wellness consultation pathway and begin with a private, respectful conversation.",
  gynaecology:
    "Explore The Birthwave's Gynaecology & Women's Wellness consultations. Discuss reproductive-health concerns, changes or questions and understand your next step.",
  lactation:
    "Get lactation and breastfeeding support at The Birthwave. Ask feeding questions, understand your concerns and plan your next step with guidance.",
  "postpartum-care":
    "Explore The Birthwave's postpartum recovery care. Discuss changes after birth, ask recovery questions and understand what support may be appropriate next.",
  "nutrition-emotional-wellbeing":
    "Explore The Birthwave's nutrition and emotional well-being support. Discuss nourishment, energy, emotional adjustment and the next step in your care.",
  "newborn-pediatric-care":
    "Explore The Birthwave's newborn and pediatric care. Bring questions about your baby or child's health, feeding or development and understand the next step.",
  // This entry uses the now-approved "The Birthwave" spelling.
  "natural-birth":
    "Explore The Birthwave's Natural Birth support. Discuss birth preferences, preparation and care options while planning for flexibility if circumstances change.",
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service: The Birthwave" };

  // The dedicated landing page gets a fuller, truthful description drawn
  // from this same confirmed service record (still `services-content.ts`
  // — no new/parallel metadata source) rather than the shared template's
  // own generic fallback; every other slug's metadata is unchanged.
  return {
    title: `${service.name}: The Birthwave`,
    description: DEDICATED_LANDING_SLUGS.has(slug) ? (DEDICATED_LANDING_DESCRIPTIONS[slug] ?? service.shortDescription) : undefined,
  };
}

// TODO(content): every service here is a structural placeholder — see
// src/content/services-content.ts.
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <PageShell>
      {slug === "pregnancy-antenatal-care" ? (
        <PregnancyAntenatalLandingPage />
      ) : slug === "birth-preparation" ? (
        <BirthPreparationLandingPage />
      ) : slug === "normal-birth-delivery" ? (
        <NormalBirthDeliveryLandingPage />
      ) : slug === "vbac" ? (
        <VbacLandingPage />
      ) : slug === "fertility-preconception" ? (
        <FertilityPreconceptionLandingPage />
      ) : slug === "vaginismus" ? (
        <VaginismusLandingPage />
      ) : slug === "gynaecology" ? (
        <GynaecologyLandingPage />
      ) : slug === "lactation" ? (
        <LactationLandingPage />
      ) : slug === "postpartum-care" ? (
        <PostpartumLandingPage />
      ) : slug === "nutrition-emotional-wellbeing" ? (
        <NutritionLandingPage />
      ) : slug === "newborn-pediatric-care" ? (
        <NewbornLandingPage />
      ) : slug === "natural-birth" ? (
        <NaturalBirthLandingPage />
      ) : (
        <ServicePageTemplate service={service} />
      )}
    </PageShell>
  );
}
