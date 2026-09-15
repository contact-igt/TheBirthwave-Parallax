import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { RoutePlaceholder } from "@/components/layout/route-placeholder";

export const metadata: Metadata = {
  title: "The Experience: The Birth Wave",
  description: "The Birth Wave Experience, in full. Page in development.",
};

// TODO(content): a fuller, dedicated telling of the journey the homepage's
// Experience section summarizes — approved copy and structure pending.
export default function TheExperiencePage() {
  return (
    <PageShell>
      <RoutePlaceholder
        eyebrow="The Journey"
        title="This page is on its way."
        note="A fuller telling of The Birth Wave Experience belongs here once its copy and structure are approved. See the homepage's Experience section for the current summary."
      />
    </PageShell>
  );
}
