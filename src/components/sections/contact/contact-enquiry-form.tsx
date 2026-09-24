"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { contactEnquiryForm } from "@/content/contact-content";
import { cx } from "@/lib/cx";

const labelClass = "font-body text-sm font-medium text-ink";
const inputClass =
  "w-full rounded-xs border border-[color-mix(in_srgb,var(--color-ink)_12%,transparent)] bg-transparent px-4 py-3 text-base text-ink placeholder:text-ink-soft/40 transition-colors duration-[var(--duration-fast)] hover:border-[color-mix(in_srgb,var(--color-ink)_24%,transparent)] focus:border-terracotta-deep focus-visible:outline-none";

const submitButtonClass =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-sm bg-terracotta-deep px-8 py-3.5 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-paper)] uppercase transition-all duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-terracotta hover:text-ink hover:translate-x-0.5 focus-ring-on-brand disabled:cursor-not-allowed disabled:opacity-60";

const whatsappButtonClass =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-sm border border-[color-mix(in_srgb,var(--color-ink)_18%,transparent)] bg-transparent px-8 py-3.5 font-body text-sm font-semibold tracking-[0.06em] text-ink transition-all duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:border-ink hover:bg-paper-dim/60 hover:translate-x-0.5 focus-ring-on-brand";

export function ContactEnquiryForm() {
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const serviceHelpId = useId();
  const messageId = useId();
  const consentId = useId();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceHelp, setServiceHelp] = useState<string>("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "previewed">("idle");
  const [touched, setTouched] = useState(false);

  // Validation: Name is required, Phone is required, Consent checkbox must be checked
  const isValid = name.trim().length > 0 && phone.trim().length > 0 && consent;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!isValid) return;

    // Honest Preview mode - no backend integration exists yet
    setStatus("previewed");
  }

  return (
    <div
      id="contact-form"
      className="scroll-mt-[calc(var(--header-height)+2rem)] rounded-md border border-[color-mix(in_srgb,var(--color-ink)_8%,transparent)] bg-paper p-8 sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(36,26,23,0.03)] relative overflow-hidden"
    >
      {/* Subtle thin terracotta accent top line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-terracotta/40" />

      {/* Header section with minimal typography */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <h2 className="font-display text-2xl font-semibold tracking-[var(--tracking-tight)] text-ink sm:text-3xl">
            {contactEnquiryForm.heading}
          </h2>
          <span className="text-[11px] font-medium tracking-[0.06em] text-terracotta-deep/80 uppercase">
            {contactEnquiryForm.previewNotice}
          </span>
        </div>
        <p className="text-sm leading-[var(--leading-relaxed)] text-ink-soft">
          {contactEnquiryForm.supportingLine}
        </p>
      </div>

      {status === "previewed" ? (
        <div role="status" className="mt-8 rounded-sm border border-terracotta/30 bg-paper-dim/40 p-8 text-center sm:p-10">
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Enquiry Received (Preview Mode)
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {contactEnquiryForm.previewResult}
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setTouched(false);
              }}
              className="font-body text-sm font-semibold text-terracotta-deep underline underline-offset-4 hover:text-ink"
            >
              Reset Form Preview
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {/* Name (Required) - Full width */}
            <div className="flex flex-col gap-2">
              <label htmlFor={nameId} className={labelClass}>
                {contactEnquiryForm.fields.name} <span className="text-terracotta-deep">*</span>
              </label>
              <input
                id={nameId}
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={touched && name.trim().length === 0}
                placeholder="Full name"
                className={inputClass}
              />
              {touched && name.trim().length === 0 && (
                <p className="text-xs font-medium text-terracotta-deep" role="alert">
                  Please enter your name.
                </p>
              )}
            </div>

            {/* Phone (Required) + Email (Optional) - Two columns on Desktop */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor={phoneId} className={labelClass}>
                  {contactEnquiryForm.fields.phone} <span className="text-terracotta-deep">*</span>
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={touched && phone.trim().length === 0}
                  placeholder="Phone number"
                  className={inputClass}
                />
                {touched && phone.trim().length === 0 && (
                  <p className="text-xs font-medium text-terracotta-deep" role="alert">
                    Please enter your phone number.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor={emailId} className={labelClass}>
                  {contactEnquiryForm.fields.email}
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className={inputClass}
                />
              </div>
            </div>

            {/* What do you need help with? - Full width */}
            <div className="flex flex-col gap-2">
              <label htmlFor={serviceHelpId} className={labelClass}>
                {contactEnquiryForm.fields.serviceHelp}
              </label>
              <select
                id={serviceHelpId}
                name="serviceHelp"
                value={serviceHelp}
                onChange={(e) => setServiceHelp(e.target.value)}
                className={cx(inputClass, !serviceHelp && "text-ink-soft/40")}
              >
                <option value="" disabled>
                  Select care pathway, concern, or general enquiry
                </option>
                {contactEnquiryForm.serviceOptions.map((opt) => (
                  <option key={opt} value={opt} className="text-ink">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Message (Optional) - Full width */}
            <div className="flex flex-col gap-2">
              <label htmlFor={messageId} className={labelClass}>
                {contactEnquiryForm.fields.message}
              </label>
              <textarea
                id={messageId}
                name="message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you are looking for or any questions you have..."
                className={cx(inputClass, "resize-none")}
              />
            </div>

            {/* Consent Checkbox - Full width */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id={consentId}
                name="consent"
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                aria-invalid={touched && !consent}
                className="mt-1 size-4 rounded-xs border-[color-mix(in_srgb,var(--color-ink)_20%,transparent)] text-terracotta-deep focus:ring-terracotta cursor-pointer"
              />
              <label htmlFor={consentId} className="text-sm leading-relaxed text-ink-soft cursor-pointer select-none">
                {contactEnquiryForm.fields.consent} <span className="text-terracotta-deep">*</span>
              </label>
            </div>
            {touched && !consent && (
              <p className="text-xs font-medium text-terracotta-deep" role="alert">
                Please confirm your consent for The Birthwave to contact you.
              </p>
            )}
          </div>

          {/* CTAs section: Primary SEND ENQUIRY + Secondary WhatsApp action */}
          <div className="mt-4 flex flex-col gap-3 pt-2">
            <button type="submit" className={submitButtonClass}>
              <span>{contactEnquiryForm.submitLabel}</span>
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
            </button>

            <a
              href="#contact-details"
              className={whatsappButtonClass}
            >
              <span>{contactEnquiryForm.whatsappLabel}</span>
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
            </a>

            <p className="mt-2 text-center text-xs leading-[var(--leading-relaxed)] text-ink-soft">
              {contactEnquiryForm.nonUrgentNote}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
