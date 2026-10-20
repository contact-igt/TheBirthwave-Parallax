import type { Metadata } from "next";
import { RegistrationFlow } from "@/components/registration/registration-flow";

// Confidential patient intake: never indexed, never cached, never referred.
export const metadata: Metadata = {
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

export const dynamic = "force-dynamic";

export default function RegistrationPage() {
  return <RegistrationFlow />;
}
