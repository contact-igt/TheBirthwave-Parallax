"use client";

import { useCallback, useState } from "react";

type SubmissionStatus = "idle" | "submitting" | "submitted" | "error";

export const ENQUIRY_FORM_LABEL = "Secure enquiry form";
export const ENQUIRY_SUCCESS_MESSAGE =
  "Thank you. Your enquiry has been received, and The Birthwave team will contact you shortly.";

export function EnquirySubmissionNotice() {
  return (
    <p className="text-xs leading-relaxed text-ink-soft">
      By submitting, you consent to The Birthwave contacting you about this enquiry. Please do not
      include urgent concerns or detailed medical records in this form.
    </p>
  );
}

export function EnquirySubmitError({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-xs border border-terracotta/35 bg-paper-dim/50 px-4 py-3 text-sm text-ink">
      {message}
    </p>
  );
}

export function useEnquirySubmission(serviceCode: string) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState("");

  const submit = useCallback(
    async (form: HTMLFormElement) => {
      setStatus("submitting");
      setError("");

      const formData = new FormData(form);
      const values = Object.fromEntries(
        Array.from(formData.entries(), ([key, value]) => [key, typeof value === "string" ? value : ""]),
      );
      const hasConsentField = formData.has("consent");
      const consentValue = formData.get("consent");

      try {
        const response = await fetch("/api/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            serviceCode,
            page: window.location.pathname,
            consent: hasConsentField ? consentValue === "on" || consentValue === "true" : true,
          }),
        });
        const result = (await response.json()) as { ok?: boolean; error?: string };

        if (!response.ok || result.ok !== true) {
          throw new Error(result.error || "We could not send your enquiry. Please try again.");
        }

        setStatus("submitted");
        return true;
      } catch (submissionError) {
        setError(
          submissionError instanceof Error
            ? submissionError.message
            : "We could not send your enquiry. Please try again.",
        );
        setStatus("error");
        return false;
      }
    },
    [serviceCode],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError("");
  }, []);

  return { error, reset, status, submit };
}
