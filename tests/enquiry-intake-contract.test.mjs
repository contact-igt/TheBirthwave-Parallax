import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const routeSource = readFileSync(new URL("../src/app/api/enquiries/route.ts", import.meta.url), "utf8");

test("enquiries are forwarded to the Birthwave admin intake with the website source key", () => {
  assert.match(routeSource, /LEADS_API_SERVER/);
  assert.match(routeSource, /IGT_LEAD_PANEL_ENDPOINT/);
  assert.match(routeSource, /IGT_LEAD_PANEL_CLIENT_KEY/);
  assert.match(routeSource, /birthwave-public\/leads/);
  assert.match(routeSource, /SOURCE_KEY\s*=\s*"birthwave_website"/);
  assert.match(routeSource, /source_key:\s*SOURCE_KEY/);
  assert.match(routeSource, /Idempotency-Key/);
  assert.doesNotMatch(routeSource, /GOOGLE_SHEETS_WEB_APP_URL/);
});
