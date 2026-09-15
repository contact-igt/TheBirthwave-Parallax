import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { ServicePageTemplate } from "@/features/services/service-page-template";
import { services, getServiceBySlug } from "@/content/services-content";

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
  return {
    title: service ? `${service.name}: The Birth Wave` : "Service: The Birth Wave",
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
      <ServicePageTemplate service={service} />
    </PageShell>
  );
}
