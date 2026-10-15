import type { Metadata } from "next";
import { NotFoundView } from "@/components/sections/not-found/not-found-view";

export const metadata: Metadata = {
  title: "404 — Care is Never Lost | The Birthwave",
  description:
    "We couldn't find the page you were looking for, but your care is never lost. Explore clinical pathways, speak to our care desk, or contact our 24/7 triage ward.",
  robots: { index: false, follow: true },
};

export default function Page404() {
  return <NotFoundView />;
}
