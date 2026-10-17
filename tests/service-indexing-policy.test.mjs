import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";

const policyUrl = new URL("../src/lib/service-indexing-policy.ts", import.meta.url);
const sitemapUrl = new URL("../src/app/sitemap.ts", import.meta.url);
const servicePageUrl = new URL("../src/app/services/[slug]/page.tsx", import.meta.url);

test("only approved service pages are indexable", async () => {
  assert.equal(
    existsSync(fileURLToPath(policyUrl)),
    true,
    "a shared service-indexing policy must exist",
  );

  const { INDEXABLE_SERVICE_SLUGS, isIndexableServiceSlug } = await import(policyUrl.href);

  assert.deepEqual([...INDEXABLE_SERVICE_SLUGS], [
    "fertility-preconception",
    "vaginismus",
    "pregnancy-antenatal-care",
    "birth-preparation",
    "natural-birth",
    "vbac",
  ]);
  assert.equal(isIndexableServiceSlug("vaginismus"), true);
  assert.equal(isIndexableServiceSlug("pcos-menstrual-health"), false);

  const sitemapSource = readFileSync(sitemapUrl, "utf8");
  const servicePageSource = readFileSync(servicePageUrl, "utf8");

  assert.match(sitemapSource, /@\/lib\/service-indexing-policy/);
  assert.match(servicePageSource, /isIndexableServiceSlug/);
  assert.match(servicePageSource, /index:\s*false,\s*follow:\s*true/);
});
