import type { Metadata } from "next";
import { RestorativeLoadingView } from "@/components/sections/loading/restorative-loading-view";

export const metadata: Metadata = {
  title: "Loading | The Birthwave",
  description: "Loading The Birthwave perinatal care portal.",
};

export default function LoadingPage() {
  return <RestorativeLoadingView targetHref="/" />;
}
