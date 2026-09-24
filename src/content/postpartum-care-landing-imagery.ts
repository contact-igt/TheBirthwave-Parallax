import { portraitGradient } from "@/components/ui/portrait-gradient";

/**
 * Postpartum Recovery & Care — page-local imagery map.
 *
 * No image-generation tool was available while this page was built. The
 * existing `services-imagery.ts` `postpartum-care` asset
 * (`/images/services/postpartum-care-ai-preview-v1.webp`) was inspected
 * first — it depicts a visibly pregnant woman in conversation with a
 * clinician, a prenatal consultation scene, not a postpartum one. Reusing
 * it here (the way `gynaecology-landing-imagery.ts`/
 * `vaginismus-landing-imagery.ts` reuse their own accurate hero assets)
 * would misrepresent it as postpartum photography, so it is deliberately
 * NOT used anywhere on this page. Every slot below instead renders the
 * site's established "built visual placeholder"
 * (`MediaPlaceholder`'s gradient-panel-plus-caption mechanism) — the same
 * honest fallback `vbac-landing-imagery.ts` and
 * `fertility-preconception-landing-imagery.ts` use when no accurate asset
 * exists. `gradient` reuses `portraitGradient`'s existing three confirmed
 * brand hues (terracotta, sky, coral) cycled by index; no new colour is
 * invented for this page. Full generation briefs for all five subjects live
 * in `docs/postpartum-care-ai-imagery.md` — swapping a real `src` in once
 * approved photography/illustration exists is the only change either
 * `PostpartumImage` or `PostpartumHero` will need.
 */
export const postpartumImagery = {
  hero: {
    alt: "AI-generated illustration pending: a South Asian mother with her newborn in a calm, lived-in recovery setting.",
    gradient: portraitGradient(0),
  },
  introduction: {
    alt: "AI-generated illustration pending: a mother resting or having a supportive conversation after birth.",
    gradient: portraitGradient(1),
  },
  recovery: {
    alt: "AI-generated illustration pending: an editorial, non-graphic postpartum lifestyle scene.",
    gradient: portraitGradient(2),
  },
  "first-consultation": {
    alt: "AI-generated illustration pending: a clinician speaking with a mother after birth.",
    gradient: portraitGradient(0),
  },
  closing: {
    alt: "AI-generated illustration pending: a calm mother, newborn and supportive-care moment.",
    gradient: portraitGradient(1),
  },
} as const;

export type PostpartumImageKey = keyof typeof postpartumImagery;
