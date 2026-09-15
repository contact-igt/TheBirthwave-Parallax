import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { RoutePlaceholder } from "@/components/layout/route-placeholder";

export const metadata: Metadata = {
  title: "Privacy Policy: The Birth Wave",
  description: "The Birth Wave's privacy policy, page in development.",
};

// TODO(legal): no approved privacy policy or terms text exists yet — this
// is legal copy and must not be drafted without review. Placeholder only.
export default function PrivacyPage() {
  return (
    <PageShell>
      <RoutePlaceholder
        eyebrow="Privacy"
        title="This page is on its way."
        note="A reviewed privacy policy is pending. This route exists so the site's footer and navigation are ready to link to it once it's approved."
      />
    </PageShell>
  );
}
