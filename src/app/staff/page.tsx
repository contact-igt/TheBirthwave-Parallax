import type { Metadata } from "next";
import { StaffConsole } from "@/components/staff/staff-console";
import { staffConfig } from "@/lib/staff/instance";

// Reception-only queue console: never indexed, cached or referred.
export const metadata: Metadata = {
  title: "Reception queue | The Birthwave",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

export default function StaffPage() {
  return <StaffConsole enabled={Boolean(staffConfig)} />;
}
