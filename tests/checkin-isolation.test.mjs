import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(root, p), "utf8");
const mode = await import(new URL("../src/lib/app-mode.ts", import.meta.url).href);

test("check-in mode is opt-in through CLINIC_APP", () => {
  assert.equal(mode.isCheckinApp({ CLINIC_APP: "checkin" }), true);
  assert.equal(mode.isCheckinApp({ CLINIC_APP: "CHECKIN " }), true);
  assert.equal(mode.isCheckinApp({}), false);
  assert.equal(mode.isCheckinApp({ CLINIC_APP: "site" }), false);
  assert.equal(mode.isCheckinApp({ CLINIC_APP: "true" }), false);
});

test("subdomain root opens the check-in experience without redirecting", () => {
  assert.deepEqual(mode.decideCheckinRoute("/"), { action: "rewrite", to: "/registration" });
});

test("only check-in routes and assets are reachable on the subdomain", () => {
  for (const ok of [
    "/registration",
    "/thank-you",
    "/staff",
    "/api/registrations",
    "/api/queue/status",
    "/api/staff/login",
    "/_next/static/chunks/a.js",
    "/_next/image",
    "/brand/wordmark-mauve.png",
    "/images/clinic/consultation2.webp",
    "/icon.png",
    "/favicon.ico",
    "/robots.txt",
  ]) {
    assert.deepEqual(mode.decideCheckinRoute(ok), { action: "next" }, ok);
  }
  for (const blocked of [
    "/about",
    "/services",
    "/services/vbac",
    "/doctors/dr-x",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/the-experience",
    "/api/enquiries",
    "/sitemap.xml",
    "/images/doctors/x.jpg",
    "/brandx/leak",
    "/registration-old",
    "/staffing",
    "/thank-you-page",
  ]) {
    assert.deepEqual(mode.decideCheckinRoute(blocked), { action: "notfound" }, blocked);
  }
});

test("proxy only acts in check-in mode", () => {
  const proxy = read("src/proxy.ts");
  assert.match(proxy, /if \(!isCheckinApp\(\)\) return NextResponse\.next\(\)/);
  assert.match(proxy, /decideCheckinRoute/);
  assert.match(proxy, /nextUrl\.clone\(\)/, "the rewrite must keep the query string (?kiosk=1)");
});

test("layout drops marketing analytics and structured data in check-in mode", () => {
  const layout = read("src/app/layout.tsx");
  assert.match(layout, /isCheckinApp\(\)/);
  assert.match(layout, /!checkin && <SiteAnalytics/);
  assert.match(layout, /!checkin && <JsonLd/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /index: false/);
  assert.equal(/canonical|alternates/.test(layout), false);
});

test("robots, sitemap and headers are locked down in check-in mode", () => {
  assert.match(read("src/app/robots.ts"), /isCheckinApp\(\)[\s\S]*disallow: "\/"/);
  assert.match(read("src/app/sitemap.ts"), /isCheckinApp\(\)\) return \[\]/);
  const config = read("next.config.ts");
  assert.match(config, /isCheckinApp/);
  assert.match(config, /no-store/);
  assert.match(config, /NEXT_DIST_DIR/);
});

test("private routes include the receipt and staff pages", async () => {
  const { isPrivateRoute } = await import(new URL("../src/lib/private-routes.ts", import.meta.url).href);
  for (const p of ["/registration", "/thank-you", "/staff", "/staff/queue"]) assert.equal(isPrivateRoute(p), true, p);
});
