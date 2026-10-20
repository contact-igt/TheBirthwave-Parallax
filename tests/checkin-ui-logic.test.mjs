import assert from "node:assert/strict";
import test from "node:test";

const dev = await import(new URL("../src/lib/registration/device-mode.ts", import.meta.url).href);
const wait = await import(new URL("../src/lib/registration/waiting.ts", import.meta.url).href);

const TOKEN = "Xk3_9fQ-aB7vLm2ZpR8sTw";

test("shared clinic tablets are marked by ?kiosk=1 on the start URL; phones are the default", () => {
  assert.equal(dev.isKioskSearch("?kiosk=1"), true);
  assert.equal(dev.isKioskSearch("?a=b&kiosk=1"), true);
  assert.equal(dev.isKioskSearch(""), false);
  assert.equal(dev.isKioskSearch("?kiosk=0"), false);
  assert.equal(dev.isKioskSearch("?kiosk=true"), false);
});

test("the receipt token lives only in the URL fragment and must look unguessable", () => {
  assert.equal(dev.tokenFromHash(`#t=${TOKEN}`), TOKEN);
  assert.equal(dev.tokenFromHash("#t=123456"), null);
  assert.equal(dev.tokenFromHash(`#x=${TOKEN}`), null);
  assert.equal(dev.tokenFromHash(""), null);
  assert.equal(dev.thankYouHref(TOKEN, false), `/thank-you#t=${TOKEN}`);
  assert.equal(dev.thankYouHref(TOKEN, true), `/thank-you?kiosk=1#t=${TOKEN}`);
  assert.equal(dev.thankYouHref(undefined, true), "/thank-you?kiosk=1");
  assert.equal(dev.thankYouHref("bad token", false), "/thank-you", "invalid tokens are never put in a URL");
  assert.equal(dev.thankYouHref(TOKEN, false).includes("?"), false, "no token in the query string");
});

test("start URL differs between the check-in app and the website build", () => {
  assert.equal(dev.startHref(true, false), "/");
  assert.equal(dev.startHref(true, true), "/?kiosk=1");
  assert.equal(dev.startHref(false, false), "/registration");
  assert.equal(dev.startHref(false, true), "/registration?kiosk=1");
});

test("registration number and clock formatting", () => {
  assert.equal(wait.formatSequence(18), "018");
  assert.equal(wait.formatSequence(1), "001");
  assert.equal(wait.formatSequence(1234), "1234");
  assert.equal(wait.formatTimeIST("2026-10-20T07:40:00Z"), "1:10 pm");
  assert.equal(wait.formatTimeIST("2026-10-20T18:31:00Z"), "12:01 am");
  assert.equal(wait.formatDateFromISO("2026-10-20T18:31:00Z"), "21/10/2026");
});

test("approved consultation wording says typical duration and leaves room for more time", () => {
  assert.equal(
    wait.CONSULTATION_NOTE,
    "A consultation usually takes around 10–20 minutes. We always take the time needed to listen, understand and care for you.",
  );
  assert.match(wait.CONSULTATION_NOTE, /usually/);
  assert.match(wait.CONSULTATION_NOTE, /always take the time needed/);
  assert.equal(wait.WAIT_FALLBACK, "Waiting time: Our reception team will update you.");
  assert.match(wait.VARIES_NOTE, /vary/);
  for (const text of [wait.CONSULTATION_NOTE, wait.WAIT_FALLBACK, wait.VARIES_NOTE]) {
    assert.equal(/guarantee|within 10|in 10 minutes|exactly/i.test(text), false);
  }
});

test("waiting summary is empty of numbers unless a real, staff-confirmed queue supplied them", () => {
  const none = wait.waitingSummary(undefined);
  assert.equal(none.aheadText, undefined);
  assert.equal(none.waitText, wait.WAIT_FALLBACK);
  assert.equal(none.approximate, false);

  const ahead = wait.waitingSummary({ ahead: 3, updatedAt: "2026-10-20T07:55:00Z" });
  assert.equal(ahead.aheadText, "3 patients ahead of you");
  assert.equal(ahead.waitText, wait.WAIT_FALLBACK, "patients ahead alone never becomes a time");

  assert.equal(wait.waitingSummary({ ahead: 1, updatedAt: "2026-10-20T07:55:00Z" }).aheadText, "1 patient ahead of you");
  assert.equal(wait.waitingSummary({ ahead: 0, updatedAt: "2026-10-20T07:55:00Z" }).aheadText, "You’re next");

  const est = wait.waitingSummary({ ahead: 3, updatedAt: "2026-10-20T07:55:00Z", estimateMinutes: { min: 15, max: 30 } });
  assert.equal(est.waitText, "About 15–30 minutes");
  assert.equal(est.approximate, true);
  assert.match(wait.APPROXIMATE_NOTE, /approximate/i);
  assert.match(wait.APPROXIMATE_NOTE, /longer/i);
});

test("waiting summary takes no registration number, so totals cannot become waiting time", () => {
  assert.equal(wait.waitingSummary.length, 1);
});

test("guidance follows the real state and falls back safely", () => {
  assert.equal(wait.guidanceFor(undefined), "Please wait to be called. Our reception team will update you.");
  assert.equal(wait.guidanceFor("registered"), "Please wait to be called.");
  assert.equal(wait.guidanceFor("waiting"), "Please wait to be called.");
  assert.match(wait.guidanceFor("called"), /proceed to reception/i);
  assert.match(wait.guidanceFor("in_consultation"), /with our team/i);
  assert.match(wait.guidanceFor("completed"), /Thank you/);
  assert.deepEqual(wait.stageOf(undefined), "waiting");
  assert.deepEqual(wait.stageOf("called"), "called");
  assert.deepEqual(wait.stageOf("completed"), "done");
});
