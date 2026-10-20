import type { ReactNode } from "react";
import type { StepId } from "@/lib/registration/rules";
import s from "./registration.module.css";

const accent = (text: string) => <em className={s.accent}>{text}</em>;

/** Patient-facing wording for each counted stage. Edit copy here only. */
export const STEP_COPY: Record<StepId, { short: string; title: ReactNode; lead?: string }> = {
  name: {
    short: "Your name",
    title: <>What’s your {accent("full name")}?</>,
    lead: "Please write it as you’d like it to appear on your records.",
  },
  birth: {
    short: "About you",
    title: <>A little {accent("about you")}</>,
  },
  contact: {
    short: "Contact",
    title: <>How can we {accent("reach you")}?</>,
    lead: "We’ll only use this to contact you about your care.",
  },
  address: {
    short: "Address",
    title: <>Where do you {accent("live")}?</>,
    lead: "Your present address.",
  },
  concerns: {
    short: "Care",
    title: <>What brings you {accent("in")}?</>,
    lead: "Choose everything that applies. You don’t need to be certain.",
  },
  sources: {
    short: "Referral",
    title: <>How did you hear {accent("about us")}?</>,
    lead: "Choose everything that applies.",
  },
  review: {
    short: "Review & sign",
    title: <>Review and {accent("sign")}</>,
    lead: "Please check your details, then sign to finish.",
  },
};

/**
 * Plain-language privacy summary shown next to the acknowledgement.
 * The clinic must approve this wording before registrations go live.
 */
export const PRIVACY_SUMMARY =
  "The Birthwave uses the details you share here to register you as a patient and to contact you about your care. They are kept confidential and are only seen by clinic staff who need them.";
