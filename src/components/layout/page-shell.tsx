import type { ReactNode } from "react";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * The chrome every route shares: the ambient background, the fixed
 * header, and the footer, wrapping whatever the page provides as
 * `children` inside `<main>`. Deliberately unopinionated about top
 * spacing — the homepage's hero manages its own clearance under the
 * fixed header (see hero-section.tsx), while other pages should give
 * their own first block `padding-top: var(--header-height)` or more
 * (see route-placeholder.tsx for the pattern).
 *
 * IMPORTANT — every top-level block a page renders inside this shell
 * needs `position: relative` (a plain `relative` class is enough; the
 * homepage sections use `relative isolate` because they also layer their
 * own z-0 tint fills, which non-homepage content doesn't need). Without
 * it, that content is the one non-positioned thing in the tree, and per
 * CSS's stacking order, plain in-flow content paints *before*
 * `z-index: auto`/`0` positioned content — regardless of DOM order — so
 * the fixed AmbientBackground paints over it and it becomes invisible.
 * This bit `site-footer.tsx` and every new route template once already;
 * `route-placeholder.tsx`, `service-page-template.tsx` and
 * `doctor-profile-template.tsx` all carry the fix now.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}
