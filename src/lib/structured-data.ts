import type { DoctorContent } from "@/content/doctors-content";
import type { ServiceContent } from "@/content/services-content";
import { absoluteUrl, homeDescription, siteOrigin } from "@/lib/seo";

const schemaContext = "https://schema.org";

export const clinicId = `${siteOrigin}/#clinic`;
export const websiteId = `${siteOrigin}/#website`;

export const siteStructuredData = {
  "@context": schemaContext,
  "@graph": [
    {
      "@type": "MedicalClinic",
      "@id": clinicId,
      name: "The Birthwave",
      url: siteOrigin,
      logo: absoluteUrl("/brand/wordmark-mauve.png"),
      image: absoluteUrl("/images/clinic/birthwave.JPG"),
      description: homeDescription,
      telephone: "+91 93630 31925",
      email: "thebirthwave@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 8/15, Mahalingapuram Main Road, Nungambakkam",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600034",
        addressCountry: "IN",
      },
      sameAs: [
        "https://www.instagram.com/thebirthwave",
        "https://www.youtube.com/@thebirthwaveclinic",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteOrigin,
      name: "The Birthwave",
      description: homeDescription,
      inLanguage: "en-IN",
      publisher: { "@id": clinicId },
    },
  ],
} as const;

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    "@context": schemaContext,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageStructuredData({
  type = "WebPage",
  name,
  description,
  path,
}: {
  type?: "AboutPage" | "CollectionPage" | "ContactPage" | "FAQPage" | "WebPage";
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": schemaContext,
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": websiteId },
    about: { "@id": clinicId },
  };
}

export function serviceStructuredData(
  service: ServiceContent,
  description = service.shortDescription,
) {
  const path = `/services/${service.slug}`;
  return {
    "@context": schemaContext,
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    url: absoluteUrl(path),
    name: service.name,
    description,
    provider: { "@id": clinicId },
    areaServed: { "@type": "City", name: "Chennai" },
  };
}

export function personStructuredData(doctor: DoctorContent) {
  const path = `/doctors/${doctor.slug}`;
  return {
    "@context": schemaContext,
    "@type": "Person",
    "@id": `${absoluteUrl(path)}#person`,
    url: absoluteUrl(path),
    name: doctor.name,
    jobTitle: doctor.role,
    ...(doctor.photo.src ? { image: absoluteUrl(doctor.photo.src) } : {}),
    worksFor: { "@id": clinicId },
  };
}

export function itemListStructuredData(
  name: string,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": schemaContext,
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
