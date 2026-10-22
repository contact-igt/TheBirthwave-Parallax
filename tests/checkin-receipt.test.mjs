import assert from "node:assert/strict";
import test from "node:test";

const r = await import(new URL("../src/lib/registration/receipt.ts", import.meta.url).href);

const NOW = new Date("2026-10-20T08:00:00Z"); // 13:30 IST, 20 Oct 2026
const ctx = { clinicId: "main", now: NOW };
const TOKEN = "Xk3_9fQ-aB7vLm2ZpR8sTw"; // 22 chars
const good = () => ({
  ok: true,
  id: "BW-20261020-0018",
  token: TOKEN,
  sequence: 18,
  dayTotal: 18,
  checkedInAt: "2026-10-20T07:40:00Z",
  clinicDate: "2026-10-20",
  clinicId: "main",
});

test("a complete save response becomes a receipt", () => {
  assert.deepEqual(r.parseSaveResponse(good(), ctx), {
    reference: "BW-20261020-0018",
    token: TOKEN,
    sequence: 18,
    dayTotal: 18,
    checkedInAt: "2026-10-20T07:40:00Z",
    clinicDate: "2026-10-20",
  });
});

test("no record id means no receipt at all", () => {
  assert.equal(r.parseSaveResponse({ ok: true }, ctx), null);
  assert.equal(r.parseSaveResponse({ ok: true, id: "" }, ctx), null);
  assert.equal(r.parseSaveResponse({ ok: true, id: "x".repeat(101) }, ctx), null);
  assert.equal(r.parseSaveResponse(null, ctx), null);
  assert.equal(r.parseSaveResponse({ ok: false, id: "BW-1" }, ctx), null);
});

test("daily number is shown only when it is provably today's number for this clinic", () => {
  const ref = (over) => r.parseSaveResponse({ ...good(), ...over }, ctx);
  const noNumber = (checkedInAt) => ({
    reference: "BW-20261020-0018",
    token: TOKEN,
    ...(checkedInAt ? { checkedInAt } : {}),
  });
  const T = "2026-10-20T07:40:00Z";
  // missing / inconsistent timestamps (a valid check-in time may still be shown)
  assert.deepEqual(ref({ checkedInAt: undefined }), noNumber());
  assert.deepEqual(ref({ checkedInAt: "yesterday" }), noNumber());
  assert.deepEqual(ref({ clinicDate: "2026-10-21" }), noNumber(T), "clinicDate must equal the IST date of checkedInAt");
  assert.deepEqual(ref({ clinicDate: undefined }), noNumber(T));
  // a number for another day is never shown as today's
  assert.deepEqual(
    ref({ checkedInAt: "2026-10-19T08:00:00Z", clinicDate: "2026-10-19" }),
    noNumber("2026-10-19T08:00:00Z"),
  );
  // another clinic location
  assert.deepEqual(ref({ clinicId: "annex" }), noNumber(T));
  // bad numbers
  for (const sequence of [0, -3, 1.5, 100000, "18", null, NaN]) assert.deepEqual(ref({ sequence }), noNumber(T), String(sequence));
});

test("IST midnight: 23:59 yesterday is not today, 00:01 is", () => {
  const justAfterMidnight = { clinicId: "main", now: new Date("2026-10-20T18:35:00Z") }; // 00:05 IST on the 21st
  const lateYesterday = r.parseSaveResponse(
    { ...good(), checkedInAt: "2026-10-20T18:29:00Z", clinicDate: "2026-10-20", sequence: 240 },
    justAfterMidnight,
  );
  assert.equal(lateYesterday.sequence, undefined);
  const firstOfDay = r.parseSaveResponse(
    { ...good(), checkedInAt: "2026-10-20T18:31:00Z", clinicDate: "2026-10-21", sequence: 1, dayTotal: 1 },
    justAfterMidnight,
  );
  assert.equal(firstOfDay.sequence, 1);
  assert.equal(firstOfDay.clinicDate, "2026-10-21");
});

test("day total is only shown when consistent with the number", () => {
  assert.equal(r.parseSaveResponse({ ...good(), dayTotal: 17 }, ctx).dayTotal, undefined);
  assert.equal(r.parseSaveResponse({ ...good(), dayTotal: 25 }, ctx).dayTotal, 25);
  assert.equal(r.parseSaveResponse({ ...good(), sequence: undefined, dayTotal: 25 }, ctx).dayTotal, undefined);
});

test("only unguessable-looking tokens are kept", () => {
  assert.equal(r.isValidToken(TOKEN), true);
  for (const bad of ["", "123456", "short-token", "has space in it 12345678901", "a/b/c".repeat(10), "x".repeat(129), 12345, null]) {
    assert.equal(r.isValidToken(bad), false, String(bad));
  }
  assert.equal(r.parseSaveResponse({ ...good(), token: "123456" }, ctx).token, undefined);
});

test("unexpected backend fields (names, phones) never reach the receipt", () => {
  const out = r.parseSaveResponse({ ...good(), fullName: "Priya Raman", phone: "+919876543210", concerns: ["fertility"] }, ctx);
  assert.deepEqual(Object.keys(out).sort(), ["checkedInAt", "clinicDate", "dayTotal", "reference", "sequence", "token"]);
});

const status = (over = {}, queue) => ({
  ok: true,
  status: {
    reference: "BW-20261020-0018",
    sequence: 18,
    dayTotal: 25,
    checkedInAt: "2026-10-20T07:40:00Z",
    clinicDate: "2026-10-20",
    clinicId: "main",
    state: "waiting",
    updatedAt: "2026-10-20T07:55:00Z",
    ...(queue ? { queue } : {}),
    ...over,
  },
});
const liveQueue = (over = {}) => ({ live: true, confirmedByStaff: true, ahead: 3, updatedAt: "2026-10-20T07:55:00Z", ...over });

test("patient status keeps real queue data separate from the registration number", () => {
  const out = r.parseStatusResponse(status({}, liveQueue()), ctx);
  assert.equal(out.sequence, 18);
  assert.equal(out.queue.ahead, 3, "patients ahead come from the queue, not the registration number");
  assert.notEqual(out.queue.ahead, out.sequence - 1);
  assert.equal(out.state, "waiting");
});

test("queue block is only trusted when live and staff-confirmed", () => {
  const q = (queue) => r.parseStatusResponse(status({}, queue), ctx).queue;
  assert.equal(q(liveQueue({ live: false })), undefined);
  assert.equal(q(liveQueue({ confirmedByStaff: false })), undefined);
  assert.equal(q(liveQueue({ ahead: -1 })), undefined);
  assert.equal(q(liveQueue({ ahead: 1.5 })), undefined);
  assert.equal(q(liveQueue({ ahead: "3" })), undefined);
  assert.equal(q(liveQueue({ updatedAt: "nope" })), undefined);
  assert.equal(r.parseStatusResponse(status({}), ctx).queue, undefined);
});

test("waiting estimates must be a sane range from the backend, and only while waiting", () => {
  const est = (e, state = "waiting") => r.parseStatusResponse(status({ state }, liveQueue({ estimateMinutes: e })), ctx).queue?.estimateMinutes;
  assert.deepEqual(est({ min: 15, max: 30 }), { min: 15, max: 30 });
  assert.equal(est({ min: 30, max: 15 }), undefined);
  assert.equal(est({ min: -1, max: 10 }), undefined);
  assert.equal(est({ min: 10, max: 500 }), undefined);
  assert.equal(est({ min: 10 }), undefined);
  assert.equal(est({ min: "10", max: "20" }), undefined);
  assert.equal(est({ min: 15, max: 30 }, "in_consultation"), undefined);
  assert.equal(est({ min: 15, max: 30 }, "completed"), undefined);
});

test("unknown states and malformed status are rejected", () => {
  assert.equal(r.parseStatusResponse(status({ state: "vip_fast_track" }), ctx), null);
  assert.equal(r.parseStatusResponse({ ok: true }, ctx), null);
  assert.equal(r.parseStatusResponse(status({ reference: "" }), ctx), null);
  assert.deepEqual(r.QUEUE_STATES, ["registered", "checked_in", "waiting", "called", "in_consultation", "completed"]);
});
