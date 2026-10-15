import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { DoctorProfileTemplate } from "@/features/doctors/doctor-profile-template";
import { doctors, getDoctorBySlug } from "@/content/doctors-content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) return { title: "Our Team: The Birthwave" };
  return pageMetadata(
    `${doctor.name}: The Birthwave`,
    `Meet ${doctor.name}, ${doctor.role}, at The Birthwave.`,
    `/doctors/${slug}`,
  );
}

// TODO(content): every profile here is a structural placeholder — see
// src/content/doctors-content.ts. No real names, credentials or bios
// exist yet; do not treat any of this as real.
export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  return (
    <PageShell>
      <DoctorProfileTemplate doctor={doctor} />
    </PageShell>
  );
}
