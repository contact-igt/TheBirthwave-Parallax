import { portraitGradient } from "@/components/ui/portrait-gradient";

/**
 * VBAC — page-local imagery map.
 *
 * No image-generation tool was available while this page was built, so every
 * slot below is an honest "built visual placeholder" — the same
 * gradient-panel-plus-caption mechanism `MediaPlaceholder` already uses
 * site-wide for approved-photography-pending spots — rather than a real
 * photograph, a reused/relabeled image from another service's page, or a
 * fabricated file. `gradient` reuses `portraitGradient`'s existing three
 * confirmed brand hues (terracotta, sky, coral) cycled by index; no new
 * colour is invented for this page. Full generation briefs for all five
 * subjects live in `docs/vbac-ai-imagery.md` — swapping a real `src` in once
 * approved photography/illustration exists is the only change either
 * `VbacImage` or `VbacHero` will need.
 */
export const vbacImagery = {
  hero: {
    alt: "AI-generated illustration pending: a thoughtful expectant mother and her partner near a sunlit window.",
    gradient: portraitGradient(0),
  },
  consultation: {
    alt: "AI-generated illustration pending: a calm one-to-one maternity-care consultation.",
    gradient: portraitGradient(1),
  },
  "birth-history": {
    alt: "AI-generated illustration pending: a reflective conversation about a personal birth history, no medical records shown.",
    gradient: portraitGradient(2),
  },
  planning: {
    alt: "AI-generated illustration pending: a couple discussing birth preferences together at home.",
    gradient: portraitGradient(0),
  },
  "next-steps": {
    alt: "AI-generated illustration pending: a warm, practical preparation moment at home.",
    gradient: portraitGradient(1),
  },
} as const;

export type VbacImageKey = keyof typeof vbacImagery;
