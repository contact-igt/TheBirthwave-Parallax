import { randomUUID } from "crypto";

const ALLOWED_SERVICE_CODES = new Set([
  "general-contact", "doctor-enquiry", "fertility-preconception", "vaginismus",
  "pregnancy-antenatal-care", "birth-preparation", "natural-birth", "normal-birth-delivery",
  "vbac", "postpartum-care", "lactation", "newborn-pediatric-care", "gynaecology",
  "nutrition-emotional-wellbeing",
]);

const MAX_BODY_BYTES = 20_000;
const SOURCE_KEY = "birthwave_website";
const unquote = (value?: string) => (value || "").trim().replace(/^["']|["']$/g, "");

function clean(value: unknown, maximumLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

function resolveEndpoint() {
  const override = unquote(process.env.IGT_LEAD_PANEL_ENDPOINT);
  if (override) return override;

  const server = (unquote(process.env.LEADS_API_SERVER) || "localhost").toLowerCase();
  const base = server === "production"
    ? unquote(process.env.LEADS_PRODUCTION_API_URL)
    : server === "stage"
      ? unquote(process.env.LEADS_STAGE_API_URL)
      : unquote(process.env.LEADS_LOCALHOST_API_URL) || unquote(process.env.LEADS_API_URL);

  return `${(base || "http://localhost:8000/api/v1").replace(/\/+$/, "")}/birthwave-public/leads`;
}

function buildMessage(input: Record<string, unknown>) {
  const details = [
    ["Care requested", clean(input.serviceHelp || input.careArea || input.concern, 500)],
    ["Topic", clean(input.topic || input.discussionTopic, 500)],
    ["Stage", clean(input.stage, 500)],
    ["Reason", clean(input.helpReason || input.helpOption, 500)],
    ["Preferred contact", clean(input.contactMethod, 100)],
    ["Preferred doctor", clean(input.preferredDoctor, 120)],
    ["Previous caesareans", clean(input.caesareanCount, 50)],
    ["Page", clean(input.page, 500)],
  ].filter(([, value]) => value);
  const message = clean(input.message, 5_000);

  return [message, ...details.map(([label, value]) => `${label}: ${value}`)].filter(Boolean).join("\n");
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

  if (clean(input.website, 200)) return Response.json({ ok: true });

  const serviceCode = clean(input.serviceCode, 100);
  const name = clean(input.name, 120);
  const phone = clean(input.phone || input.contact, 120);
  if (!ALLOWED_SERVICE_CODES.has(serviceCode) || !name || phone.replace(/\D/g, "").length < 7 || input.consent !== true) {
    return Response.json(
      { ok: false, error: "Please enter your name, a valid phone number, and consent before sending." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(resolveEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Key": unquote(process.env.IGT_LEAD_PANEL_CLIENT_KEY) || "birthwave",
        "Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        source_key: SOURCE_KEY,
        lead_id: randomUUID(),
        name,
        phone,
        email: clean(input.email, 254) || null,
        service: clean(input.serviceHelp || input.careArea || input.concern, 500) || serviceCode,
        service_slug: serviceCode,
        message: buildMessage(input) || null,
        consent: true,
        attribution: { channel: "Form", landing_page: clean(input.page, 500) || null },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    const result = (await response.json().catch(() => ({}))) as { success?: boolean; lead_id?: string };

    if (!response.ok || result.success !== true) {
      console.error("Birthwave lead intake rejected an enquiry.", { status: response.status });
      return Response.json(
        { ok: false, error: "We could not send your enquiry. Please call or WhatsApp us instead." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, lead_id: result.lead_id });
  } catch (error) {
    console.error("Birthwave lead intake forwarding failed.", error);
    return Response.json(
      { ok: false, error: "We could not send your enquiry. Please call or WhatsApp us instead." },
      { status: 502 },
    );
  }
}
