"use client";

import { useId, useState, type FormEvent } from "react";
import { doctorsEnquiryForm, whoShouldYouConsult } from "@/content/doctors-content";
import { cx } from "@/lib/cx";

// `Button` (components/ui/button.tsx) renders a `next/link` `<a>` — right
// for every other CTA on this page, wrong for a real form's own submit
// control, which must be a native `<button type="submit">` or Enter-to-
// submit and screen-reader form semantics both break. This repeats
// `Button`'s own visual treatment (same classes) on a real button element
// instead of importing it.
const submitButtonClass =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-coral focus-ring-on-brand disabled:cursor-not-allowed disabled:opacity-60";

/**
 * The horizontal journey's closing enquiry form — one real implementation,
 * used both inside the desktop pinned track's Form scene and the mobile/
 * reduced-motion vertical sequence, so field behaviour is never
 * duplicated or allowed to drift between the two render paths.
 *
 * Genuinely interactive: controlled fields, real `<label>`s, keyboard tab
 * order, a required-field check before "submitting," and a `<select>`
 * built from `whoShouldYouConsult.concerns` — the same real concern list
 * used elsewhere on this page, not a second invented category set.
 *
 * No backend exists yet (see `doctorsEnquiryForm`'s own TODO in
 * doctors-content.ts) — submitting never calls `fetch`/an API route and
 * never claims data was sent anywhere; it only moves this component into
 * a local "received" state. `className`/`compact` let the desktop Form
 * scene ask for a slightly denser layout to fit one viewport height,
 * without a second copy of the form.
 */
export function DoctorsEnquiryForm({ compact = false, className }: { compact?: boolean; className?: string }) {
  const nameId = useId();
  const contactId = useId();
  const concernId = useId();
  const messageId = useId();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [concern, setConcern] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [touched, setTouched] = useState(false);

  const isValid = name.trim().length > 0 && contact.trim().length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!isValid) return;
    // No backend endpoint exists yet — this only updates local state. See
    // this component's own top comment and doctorsEnquiryForm's TODO.
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className={cx("max-w-md", className)} role="status">
        <p className="text-[clamp(1.5rem,1.3rem+0.9vw,1.9rem)] leading-[1.15] font-semibold text-ink">
          {doctorsEnquiryForm.confirmation.heading}
        </p>
        <p className={cx("mt-3 text-ink-soft", compact ? "text-base" : "text-lg leading-[var(--leading-relaxed)]")}>
          {doctorsEnquiryForm.confirmation.body}
        </p>
      </div>
    );
  }

  const fieldGap = compact ? "gap-4" : "gap-5";
  const labelClass = "font-body text-sm font-semibold text-ink-soft";
  const inputClass = cx(
    "w-full rounded-xs border border-[var(--color-border-strong)] bg-paper px-4 text-ink placeholder:text-ink-soft/50 transition-colors duration-[var(--duration-fast)] focus:border-terracotta-deep focus-visible:outline-none",
    compact ? "py-2.5 text-sm" : "py-3 text-base",
  );

  return (
    <form onSubmit={handleSubmit} noValidate className={cx("flex w-full max-w-md flex-col", fieldGap, className)}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={nameId} className={labelClass}>
          {doctorsEnquiryForm.fields.name}
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={touched && name.trim().length === 0}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={contactId} className={labelClass}>
          {doctorsEnquiryForm.fields.contact}
        </label>
        <input
          id={contactId}
          name="contact"
          type="text"
          autoComplete="email"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          aria-invalid={touched && contact.trim().length === 0}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={concernId} className={labelClass}>
          {doctorsEnquiryForm.fields.concern}
        </label>
        <select
          id={concernId}
          name="concern"
          value={concern}
          onChange={(event) => setConcern(event.target.value)}
          className={cx(inputClass, !concern && "text-ink-soft/50")}
        >
          <option value="" disabled>
            {doctorsEnquiryForm.concernPlaceholder}
          </option>
          {whoShouldYouConsult.concerns.map((item) => (
            <option key={item.question} value={item.question} className="text-ink">
              {item.question}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={messageId} className={labelClass}>
          {doctorsEnquiryForm.fields.message}
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={compact ? 2 : 3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={cx(inputClass, "resize-none")}
        />
      </div>

      {touched && !isValid ? (
        <p className="text-sm font-medium text-terracotta-deep" role="alert">
          Enter your name and a way to reach you before sending.
        </p>
      ) : null}

      <button type="submit" className={cx(submitButtonClass, "mt-1 w-full sm:w-auto")}>
        {doctorsEnquiryForm.submitLabel}
      </button>
    </form>
  );
}
