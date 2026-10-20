import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(root, p), "utf8");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

test("private route matcher covers /registration and children only", async () => {
  const { isPrivateRoute } = await import(new URL("../src/lib/private-routes.ts", import.meta.url).href);
  assert.equal(isPrivateRoute("/registration"), true);
  assert.equal(isPrivateRoute("/registration/"), true);
  assert.equal(isPrivateRoute("/registration/done"), true);
  assert.equal(isPrivateRoute("/"), false);
  assert.equal(isPrivateRoute("/contact"), false);
  assert.equal(isPrivateRoute("/registrations-info"), false);
  assert.equal(isPrivateRoute(null), false);
});

test("Google Analytics lives only in SiteAnalytics and skips private routes", () => {
  const layout = read("src/app/layout.tsx");
  assert.equal(/googletagmanager|gtag\(/.test(layout), false, "layout must not inline GA any more");
  assert.match(layout, /<SiteAnalytics\s*\/>/);
  const analytics = read("src/components/analytics/site-analytics.tsx");
  assert.match(analytics, /isPrivateRoute\(pathname\)/);
  assert.match(analytics, /if \(isPrivate\) return null/);
  assert.match(analytics, /ga-disable-/);
  assert.match(analytics, /googletagmanager\.com\/gtag\/js\?id=\$\{GA_ID\}/, "public pages keep GA");
});

test("registration code never touches analytics, browser storage or the enquiry endpoint", () => {
  const files = [
    ...walk(join(root, "src/components/registration")),
    ...walk(join(root, "src/lib/registration")),
    ...walk(join(root, "src/app/registration")),
    ...walk(join(root, "src/app/api/registrations")),
    ...walk(join(root, "src/app/api/queue")),
    ...walk(join(root, "src/app/api/staff")),
    ...walk(join(root, "src/app/thank-you")),
    ...walk(join(root, "src/app/staff")),
    ...walk(join(root, "src/components/staff")),
    ...walk(join(root, "src/lib/staff")),
  ].filter((f) => /\.(ts|tsx)$/.test(f));
  assert.ok(files.length > 5);
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    for (const banned of [
      /localStorage|sessionStorage|indexedDB|document\.cookie/,
      /gtag|dataLayer|googletagmanager|fbq\(|_paq/,
      /api\/enquiries|use-enquiry-submission/,
      /console\.(log|info|debug)/,
    ]) {
      assert.equal(banned.test(src), false, `${file} matches ${banned}`);
    }
  }
});

test("registration page is noindex, outside the sitemap and disallowed in robots", () => {
  const page = read("src/app/registration/page.tsx");
  assert.match(page, /index:\s*false/);
  assert.match(page, /follow:\s*false/);
  assert.equal(/registration/.test(read("src/app/sitemap.ts")), false);
  const robots = read("src/app/robots.ts");
  assert.match(robots, /PRIVATE_ROUTE_PREFIXES/);
  assert.match(robots, /\/api\/registrations/);
});

test("registration page and API send no-store and privacy headers", async () => {
  const config = readFileSync(join(root, "next.config.ts"), "utf8");
  for (const needle of [
    "/registration",
    "/api/registrations",
    "no-store",
    "noindex, nofollow",
    "no-referrer",
    "X-Frame-Options",
  ]) {
    assert.ok(config.includes(needle), `next.config.ts should include ${needle}`);
  }
});
