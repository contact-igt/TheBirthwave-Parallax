import type { QueueInfo, QueueState } from "./receipt.ts";

/** Approved wording. The 10–20 minutes is a typical CONSULTATION length, never a wait time. */
export const CONSULTATION_NOTE =
  "A consultation usually takes around 10–20 minutes. We always take the time needed to listen, understand and care for you.";
export const VARIES_NOTE = "Every patient receives the attention they need, so consultation times can vary.";
export const WAIT_FALLBACK = "Waiting time: Our reception team will update you.";
export const APPROXIMATE_NOTE =
  "This is approximate. It can change with clinical priorities, or if a consultation needs to take longer.";

const IST_TIME = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true });
const IST_DATE = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", day: "2-digit", month: "2-digit", year: "numeric" });

export function formatSequence(n: number): string {
  return String(n).padStart(3, "0");
}

export function formatTimeIST(iso: string): string {
  return IST_TIME.format(new Date(iso)).replace(/ | /g, " ").toLowerCase();
}

export function formatDateFromISO(iso: string): string {
  return IST_DATE.format(new Date(iso));
}

export interface WaitingSummary {
  aheadText?: string;
  waitText: string;
  approximate: boolean;
}

/**
 * Takes ONLY the staff-confirmed queue block. There is deliberately no
 * parameter for the day's registration number or total, so a registration
 * count can never be turned into a waiting time.
 */
export function waitingSummary(queue: QueueInfo | undefined): WaitingSummary {
  if (!queue) return { waitText: WAIT_FALLBACK, approximate: false };

  const aheadText =
    queue.ahead === 0 ? "You’re next" : `${queue.ahead} ${queue.ahead === 1 ? "patient" : "patients"} ahead of you`;
  const e = queue.estimateMinutes;
  return e
    ? { aheadText, waitText: `About ${e.min}–${e.max} minutes`, approximate: true }
    : { aheadText, waitText: WAIT_FALLBACK, approximate: false };
}

export function guidanceFor(state: QueueState | undefined): string {
  switch (state) {
    case undefined:
      return "Please wait to be called. Our reception team will update you.";
    case "registered":
    case "checked_in":
    case "waiting":
      return "Please wait to be called.";
    case "called":
      return "You’re being called. Please proceed to reception and our team will guide you.";
    case "in_consultation":
      return "You’re with our team now.";
    case "completed":
      return "Your visit is complete. Thank you for choosing The Birthwave.";
  }
}

export type Stage = "waiting" | "called" | "consultation" | "done";

export function stageOf(state: QueueState | undefined): Stage {
  if (state === "called") return "called";
  if (state === "in_consultation") return "consultation";
  if (state === "completed") return "done";
  return "waiting";
}
