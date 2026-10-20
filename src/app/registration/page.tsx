import type { Metadata } from "next";
import { isCheckinApp } from "@/lib/app-mode";
import { RegistrationFlow } from "@/components/registration/registration-flow";

// Confidential patient intake: never indexed, never cached, never referred.
const base: Metadata = {
  title: "Registration | The Birthwave",
  description: "Walk-in patient registration for The Birthwave clinic.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  referrer: "no-referrer",
};

export function generateMetadata(): Metadata {
  return isCheckinApp() ? { ...base, title: "Clinic Check-in | The Birthwave" } : base;
}

export const dynamic = "force-dynamic";

export default async function RegistrationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // The shared clinic tablet is bookmarked with ?kiosk=1; personal phones have no flag.
  const params = await searchParams;
  return <RegistrationFlow kiosk={params.kiosk === "1"} checkin={isCheckinApp()} />;
}
