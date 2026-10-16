const ALLOWED_SERVICE_CODES = new Set([
  "general-contact",
  "doctor-enquiry",
  "fertility-preconception",
  "vaginismus",
  "pregnancy-antenatal-care",
  "birth-preparation",
  "natural-birth",
  "normal-birth-delivery",
  "vbac",
  "postpartum-care",
  "lactation",
  "newborn-pediatric-care",
  "gynaecology",
  "nutrition-emotional-wellbeing",
]);

const MAX_BODY_BYTES = 20_000;

function clean(value: unknown, maximumLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "The enquiry is too large." }, { status: 413 });
  }

  let input: Record<string, unknown>;

  try {
    input = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "The enquiry could not be read." }, { status: 400 });
  }

  // Silently accept bot-filled honeypot submissions without forwarding them.
  if (clean(input.website, 200)) {
    return Response.json({ ok: true });
  }

  const serviceCode = clean(input.serviceCode, 100);
  const name = clean(input.name, 120);
  const contact = clean(input.phone || input.contact, 120);

  if (!ALLOWED_SERVICE_CODES.has(serviceCode) || !name || !contact || input.consent !== true) {
    return Response.json(
      { ok: false, error: "Please complete the required fields and try again." },
      { status: 400 },
    );
  }

  const webAppUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  const secret = process.env.FORM_WEBHOOK_SECRET;

  if (!webAppUrl || !secret) {
    console.error("Enquiry submission environment variables are not configured.");
    return Response.json(
      { ok: false, error: "Online enquiries are temporarily unavailable. Please call or WhatsApp us." },
      { status: 503 },
    );
  }

  let endpoint: URL;

  try {
    endpoint = new URL(webAppUrl);
  } catch {
    console.error("GOOGLE_SHEETS_WEB_APP_URL is invalid.");
    return Response.json({ ok: false, error: "Online enquiries are temporarily unavailable." }, { status: 503 });
  }

  if (endpoint.protocol !== "https:" || endpoint.hostname !== "script.google.com") {
    console.error("GOOGLE_SHEETS_WEB_APP_URL must use the official Google Apps Script host.");
    return Response.json({ ok: false, error: "Online enquiries are temporarily unavailable." }, { status: 503 });
  }

  const payload = {
    secret,
    serviceCode,
    name,
    phone: clean(input.phone, 120),
    contact: clean(input.contact, 120),
    email: clean(input.email, 254),
    careArea: clean(input.careArea, 500),
    serviceHelp: clean(input.serviceHelp, 500),
    topic: clean(input.topic, 500),
    stage: clean(input.stage, 500),
    helpReason: clean(input.helpReason, 500),
    helpOption: clean(input.helpOption, 500),
    concern: clean(input.concern, 500),
    discussionTopic: clean(input.discussionTopic, 500),
    contactMethod: clean(input.contactMethod, 100),
    caesareanCount: clean(input.caesareanCount, 50),
    message: clean(input.message, 5_000),
    page: clean(input.page, 500),
    consent: true,
    website: "",
  };

  try {
    const googleResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(12_000),
    });

    const responseText = await googleResponse.text();
    let result: { ok?: boolean } = {};

    try {
      result = JSON.parse(responseText) as { ok?: boolean };
    } catch {
      // A non-JSON response is treated as a failed submission.
    }

    if (!googleResponse.ok || result.ok !== true) {
      console.error("Google Apps Script rejected an enquiry submission.");
      return Response.json(
        { ok: false, error: "We could not send your enquiry. Please call or WhatsApp us instead." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Enquiry forwarding failed.", error);
    return Response.json(
      { ok: false, error: "We could not send your enquiry. Please call or WhatsApp us instead." },
      { status: 502 },
    );
  }
}
