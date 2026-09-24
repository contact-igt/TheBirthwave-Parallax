import { portraitGradient } from "@/components/ui/portrait-gradient";
import { servicesImagery } from "@/content/services-imagery";

/**
 * Nutrition & Emotional Well-being — page-local imagery map.
 *
 * `hero` reuses the one real, approved illustration this service already
 * has — `services-imagery.ts`'s own `nutrition-emotional-wellbeing` key
 * (`/images/services/nutrition-emotional-wellbeing-ai-preview-v1.webp`,
 * already live on the plain `/services` listing) — with its own alt text
 * accurate to where it appears on THIS page, the same "different `imageKey`
 * per usage context, no duplicated binary asset" pattern
 * `gynaecology-landing-imagery.ts`/`vaginismus-landing-imagery.ts` already
 * establish. That illustration was inspected and confirmed accurate for
 * this page's own approved visual direction: a pregnant South Asian woman
 * in conversation with a wellness professional over a balanced, unstyled
 * meal — no scale, no calorie chart, no diet-culture staging.
 *
 * The other four conceptual spots (Trust-Building Introduction, Nutrition,
 * Emotional Well-being, First Consultation) have no dedicated approved
 * image yet — no image-generation tool is available in this session, the
 * same situation `postpartum-care-landing-imagery.ts` and
 * `vbac-landing-imagery.ts` document for their own slots — so each renders
 * the site's established "built visual placeholder" (`MediaPlaceholder`'s
 * gradient-panel-plus-caption mechanism) rather than a real photograph, a
 * reused/relabelled image from another service's page, or a fabricated
 * file. `gradient` reuses `portraitGradient`'s existing three confirmed
 * brand hues (terracotta, sky, coral) cycled by index; no new colour is
 * invented for this page. Full generation briefs for all five subjects
 * (including the already-fulfilled hero) live in
 * `docs/nutrition-emotional-wellbeing-ai-imagery.md` — swapping a real
 * `src` in once approved photography/illustration exists is the only
 * change either `NutritionImage` or `NutritionHero` will need.
 */
export const nutritionImagery = {
  hero: {
    src: servicesImagery["nutrition-emotional-wellbeing"].src,
    alt: "AI-generated illustration: A pregnant woman talks with a wellness professional over a balanced, home-cooked meal.",
    // Source photo is portrait-oriented (~1122x1500), the pregnant woman
    // sits in the left ~40% of the frame with her face around 28-32%
    // across and ~30% down; the wellness professional sits in the right
    // third. Inside this wide/short hero container desktop crops are
    // width-bound (the full image width always shows, so desktop.x has
    // little visible effect there — the same situation
    // `gynaecology-landing-imagery.ts`'s own hero entry documents), while
    // `mobile.x` genuinely matters since the tall mobile panel crops
    // horizontally too. Confirmed by visual inspection of the source file.
    focalPoint: { mobile: "30% 20%", desktop: "38% 22%" },
  },
  introduction: {
    alt: "AI-generated illustration pending: a supportive conversation in warm, natural surroundings.",
    gradient: portraitGradient(1),
  },
  nutrition: {
    alt: "AI-generated illustration pending: a natural meal-preparation or nourishment moment, no diet-culture styling.",
    gradient: portraitGradient(2),
  },
  "emotional-wellbeing": {
    alt: "AI-generated illustration pending: a quiet, reflective or supportive conversation scene.",
    gradient: portraitGradient(0),
  },
  "first-consultation": {
    alt: "AI-generated illustration pending: a warm, respectful well-being consultation scene.",
    gradient: portraitGradient(1),
  },
} as const;

export type NutritionImageKey = keyof typeof nutritionImagery;
