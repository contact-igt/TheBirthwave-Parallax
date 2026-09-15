import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { ServicePageTemplate } from "@/features/services/service-page-template";
import { services, getServiceBySlug } from "@/content/services-content";
import { PregnancyAntenatalLandingPage } from "@/components/sections/services/pregnancy-antenatal/pregnancy-antenatal-landing-page";

/** The one slug with its own dedicated landing page — every other slug
 * keeps rendering through the unmodified, shared `ServicePageTemplate`.
 * Route generation, metadata and the shared `services-content.ts` record
 * are unchanged for all 11 services; only this one route's own BODY
 * swaps. */
const DEDICATED_LANDING_SLUGS = new Set(["pregnancy-antenatal-care"]);

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
  if (!service) return { title: "Service: The Birth Wave" };

  // The dedicated landing page gets a fuller, truthful description drawn
  // from this same confirmed service record (still `services-content.ts`
  // — no new/parallel metadata source) rather than the shared template's
  // own generic fallback; every other slug's metadata is unchanged.
  return {
    title: `${service.name}: The Birth Wave`,
    description: DEDICATED_LANDING_SLUGS.has(slug) ? service.shortDescription : undefined,
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
      {DEDICATED_LANDING_SLUGS.has(slug) ? <PregnancyAntenatalLandingPage /> : <ServicePageTemplate service={service} />}
    </PageShell>
  );
}
