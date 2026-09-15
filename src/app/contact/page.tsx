import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { RoutePlaceholder } from "@/components/layout/route-placeholder";

export const metadata: Metadata = {
  title: "Contact: The Birth Wave",
  description: "Contact The Birth Wave, page in development.",
};

// TODO(content): no confirmed contact details, address, phone number or
// contact form exist yet — forms/scheduling are explicitly out of scope
// until then. Do not add fabricated contact information here.
export default function ContactPage() {
  return (
    <PageShell>
      <RoutePlaceholder
        eyebrow="Contact"
        title="This page is on its way."
        note="Confirmed contact details and a way to reach The Birth Wave are pending. This route exists so the site's navigation and structure are ready for them."
      />
    </PageShell>
  );
}
