/**
 * Complete, approved service landing pages that may appear in search results.
 * Add a slug here only when its dedicated page is ready to be indexed.
 */
export const INDEXABLE_SERVICE_SLUGS: ReadonlySet<string> = new Set([
  "fertility-preconception",
  "vaginismus",
  "pregnancy-antenatal-care",
  "birth-preparation",
  "natural-birth",
  "vbac",
]);

export function isIndexableServiceSlug(slug: string): boolean {
  return INDEXABLE_SERVICE_SLUGS.has(slug);
}
