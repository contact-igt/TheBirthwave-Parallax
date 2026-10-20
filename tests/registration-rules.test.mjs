import assert from "node:assert/strict";
import test from "node:test";

const rules = await import(new URL("../src/lib/registration/rules.ts", import.meta.url).href);

const NOW = new Date("2026-10-20T08:00:00Z"); // 13:30 IST on 20 Oct 2026

const valid = () => ({
  fullName: "Priya Raman",
  dobDay: "14",
  dobMonth: "03",
  dobYear: "1993",
  gender: "female",
  phone: "98765 43210",
  altPhone: "",
  email: "",
  addressLine1: "12, Lake View Road",
  addressLine2: "",
  city: "Chennai",
  state: "Tamil Nadu",
  pin: "600020",
  concerns: ["pregnancy"],
  sources: ["google_maps"],
  sourceOther: "",
  consent: true,
  signatureMethod: "typed",
  signatureData: "",
  signatureTyped: "Priya Raman",
});

test("paper-form option lists are complete and unambiguous", () => {
  assert.deepEqual(
    rules.CONCERNS.map((c) => c.id),
    ["pregnancy", "fertility", "gynaecology", "paediatrics", "vbac", "vaginismus", "not_sure"],
  );
  assert.deepEqual(
    rules.SOURCES.map((s) => s.id),
    ["doctor", "google_maps", "google_search", "friends_family", "chatgpt", "instagram", "facebook", "youtube", "other"],
  );
  assert.deepEqual(rules.GENDERS.map((g) => g.id), ["male", "female"]);
  for (const c of rules.CONCERNS) assert.ok(c.description.length > 10);
  assert.notEqual(
    rules.SOURCES.find((s) => s.id === "google_maps").label,
    rules.SOURCES.find((s) => s.id === "google_search").label,
  );
});

test("full name", () => {
  assert.equal(rules.validateFullName("Priya Raman"), null);
  assert.equal(rules.validateFullName("A. K. Selvam"), null);
  assert.equal(rules.validateFullName("சுமதி ராஜன்"), null);
  assert.ok(rules.validateFullName(""));
  assert.ok(rules.validateFullName("P"));
  assert.ok(rules.validateFullName("1234"));
  assert.ok(rules.validateFullName("x".repeat(101)));
});

test("indian mobile numbers", () => {
  assert.equal(rules.normaliseIndianMobile("98765 43210"), "+919876543210");
  assert.equal(rules.normaliseIndianMobile("+91 98765-43210"), "+919876543210");
  assert.equal(rules.normaliseIndianMobile("09876543210"), "+919876543210");
  assert.equal(rules.normaliseIndianMobile("5876543210"), null);
  assert.equal(rules.normaliseIndianMobile("98765"), null);
  assert.equal(rules.normaliseIndianMobile("abcdefghij"), null);
  assert.ok(rules.validateMobile("", true));
  assert.equal(rules.validateMobile("", false), null);
  assert.ok(rules.validateMobile("12345", false));
});

test("email is optional but validated when present", () => {
  assert.equal(rules.validateEmail(""), null);
  assert.equal(rules.validateEmail("priya@example.com"), null);
  assert.ok(rules.validateEmail("priya@"));
  assert.ok(rules.validateEmail("not an email"));
});

test("date of birth: real, past, sensible", () => {
  assert.equal(rules.validateDob("14", "3", "1993", NOW), null);
  assert.ok(rules.validateDob("", "", "", NOW));
  assert.ok(rules.validateDob("31", "02", "1990", NOW), "31 Feb does not exist");
  assert.ok(rules.validateDob("29", "02", "2023", NOW), "2023 is not a leap year");
  assert.equal(rules.validateDob("29", "02", "2024", NOW), null);
  assert.ok(rules.validateDob("21", "10", "2026", NOW), "tomorrow (IST) is the future");
  assert.equal(rules.validateDob("20", "10", "2026", NOW), null, "today in IST is allowed");
  assert.ok(rules.validateDob("01", "01", "1850", NOW));
  assert.ok(rules.validateDob("1", "13", "1990", NOW));
  assert.ok(rules.validateDob("ab", "01", "1990", NOW));
});

test("age and guardian flag", () => {
  assert.equal(rules.calculateAge("2008-10-21", NOW), 17);
  assert.equal(rules.calculateAge("2008-10-20", NOW), 18);
  assert.equal(rules.calculateAge("1993-03-14", NOW), 33);
});

test("PIN code", () => {
  assert.equal(rules.validatePin("600020"), null);
  assert.ok(rules.validatePin("060020"));
  assert.ok(rules.validatePin("60002"));
  assert.ok(rules.validatePin("6000a0"));
  assert.ok(rules.validatePin(""));
});

test("Asia/Kolkata registration date", () => {
  assert.equal(rules.registrationDateIST(new Date("2026-10-20T20:00:00Z")), "2026-10-21");
  assert.equal(rules.registrationDateIST(new Date("2026-10-20T08:00:00Z")), "2026-10-20");
  assert.equal(rules.formatDateIN("2026-10-21"), "21/10/2026");
});

test("concern selection keeps 'not sure' exclusive", () => {
  assert.deepEqual(rules.toggleConcern(["pregnancy"], "fertility"), ["pregnancy", "fertility"]);
  assert.deepEqual(rules.toggleConcern(["pregnancy", "fertility"], "not_sure"), ["not_sure"]);
  assert.deepEqual(rules.toggleConcern(["not_sure"], "pregnancy"), ["pregnancy"]);
  assert.deepEqual(rules.toggleConcern(["pregnancy"], "pregnancy"), []);
});

test("selections keep on-screen order and de-duplicate", () => {
  assert.deepEqual(rules.toggleSource(["instagram"], "google_maps"), ["google_maps", "instagram"]);
  assert.deepEqual(rules.toggleConcern(["vaginismus"], "vbac"), ["vbac", "vaginismus"]);
  const dup = rules.validateRegistration({ ...valid(), sources: ["youtube", "doctor", "doctor"] }, NOW);
  assert.deepEqual(dup.value.sources, ["doctor", "youtube"]);
});

test("step validation reports field-level errors", () => {
  const empty = { ...valid(), fullName: "", phone: "", pin: "" };
  assert.ok(rules.validateStep("name", empty).fullName);
  assert.ok(rules.validateStep("contact", empty).phone);
  assert.ok(rules.validateStep("address", empty).pin);
  assert.deepEqual(rules.validateStep("contact", valid()), {});
  assert.ok(rules.validateStep("concerns", { ...valid(), concerns: [] }).concerns);
  assert.ok(rules.validateStep("sources", { ...valid(), sources: [] }).sources);
  assert.ok(rules.validateStep("sources", { ...valid(), sources: ["other"], sourceOther: " " }).sourceOther);
  assert.deepEqual(rules.validateStep("sources", { ...valid(), sources: ["other"], sourceOther: "A poster" }), {});
  assert.ok(rules.validateStep("birth", { ...valid(), gender: "" }).gender);
  assert.ok(rules.validateStep("address", { ...valid(), state: "Atlantis" }).state);
});

test("review step needs consent and a signature", () => {
  assert.deepEqual(rules.validateStep("review", valid(), NOW), {});
  assert.ok(rules.validateStep("review", { ...valid(), consent: false }, NOW).consent);
  assert.ok(rules.validateStep("review", { ...valid(), signatureTyped: "" }, NOW).signature);
  assert.ok(
    rules.validateStep("review", { ...valid(), signatureMethod: "drawn", signatureData: "" }, NOW).signature,
  );
  assert.ok(
    rules.validateStep(
      "review",
      { ...valid(), signatureMethod: "drawn", signatureData: "data:text/html;base64,AAAA" },
      NOW,
    ).signature,
    "only PNG data URLs are accepted",
  );
});

test("validateRegistration normalises a good payload", () => {
  const input = {
    ...valid(),
    email: " Priya@Example.com ",
    altPhone: "+91 91234 56789",
    sources: ["google_maps", "other"],
    sourceOther: "Poster near the bus stop",
  };
  const result = rules.validateRegistration(input, NOW);
  assert.equal(result.ok, true);
  assert.equal(result.value.dateOfBirth, "1993-03-14");
  assert.equal(result.value.phone, "+919876543210");
  assert.equal(result.value.alternatePhone, "+919123456789");
  assert.equal(result.value.email, "priya@example.com");
  assert.deepEqual(result.value.sources, ["google_maps", "other"]);
  assert.equal(result.value.sourceOther, "Poster near the bus stop");
  assert.equal(result.value.flags.guardianReviewRequired, false);
  assert.equal(result.value.flags.typedSignaturePendingClinicApproval, true);
  assert.equal(result.value.registrationDate, "2026-10-20");
});

test("validateRegistration flags guardian review for minors and paediatrics", () => {
  const minor = rules.validateRegistration({ ...valid(), dobYear: "2015" }, NOW);
  assert.equal(minor.value.flags.guardianReviewRequired, true);
  const paeds = rules.validateRegistration({ ...valid(), concerns: ["paediatrics"] }, NOW);
  assert.equal(paeds.value.flags.guardianReviewRequired, true);
});

test("validateRegistration rejects unknown ids, wrong types and unknown fields", () => {
  assert.equal(rules.validateRegistration(null, NOW).ok, false);
  assert.equal(rules.validateRegistration("x", NOW).ok, false);
  assert.equal(rules.validateRegistration({ ...valid(), concerns: ["cancer"] }, NOW).ok, false);
  assert.equal(rules.validateRegistration({ ...valid(), sources: ["tiktok"] }, NOW).ok, false);
  assert.equal(rules.validateRegistration({ ...valid(), gender: "prefer_not_to_say" }, NOW).ok, false);
  assert.equal(rules.validateRegistration({ ...valid(), fullName: { a: 1 } }, NOW).ok, false);
  const withExtra = rules.validateRegistration({ ...valid(), isAdmin: true }, NOW);
  assert.equal(withExtra.ok, true);
  assert.equal("isAdmin" in withExtra.value, false);
});

test("oversized drawn signature is refused", () => {
  const huge = "data:image/png;base64," + "A".repeat(rules.MAX_SIGNATURE_CHARS);
  const result = rules.validateRegistration(
    { ...valid(), signatureMethod: "drawn", signatureData: huge },
    NOW,
  );
  assert.equal(result.ok, false);
});
