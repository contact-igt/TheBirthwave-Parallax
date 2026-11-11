import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroMotionPreview } from "@/components/sections/home/hero-motion-preview";

export const metadata: Metadata = {
  title: "Homepage motion preview | The Birthwave",
  robots: { index: false, follow: false },
};

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <HeroMotionPreview />;
}
