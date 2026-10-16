"use client";

import {
  EnquirySubmissionNotice,
  EnquirySubmitError,
  useEnquirySubmission,
  ENQUIRY_FORM_LABEL,
  ENQUIRY_SUCCESS_MESSAGE,
} from "@/lib/use-enquiry-submission";

import conversion from "../shared/service-conversion.module.css";


import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { gynaecologyEnquiry, gynaecologyMobileCta } from "@/content/pages/gynaecology";
import { GynaecologyReveal } from "./gynaecology-reveal";
import { cx } from "@/lib/cx";

const labelClass = "font-body text-sm font-semibold text-ink-soft";
const inputClass =
  "w-full rounded-xs border border-[var(--color-border-strong)] bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors duration-[var(--duration-fast)] focus:border-terracotta-deep focus-visible:outline-none";
const submitButtonClass =
  "group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-coral focus-ring-on-brand disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Section 10 — Final Enquiry / Conversion.
 */
export function GynaecologyEnquiry() {
  const nameId = useId();
  const contactId = useId();
  const messageId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const { error, status, submit } = useEnquirySubmission("gynaecology");
  const [touched, setTouched] = useState(false);

  const isValid = name.trim().length > 0 && contact.trim().length > 0;

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const setEditing = (editing: boolean) => () => {
      form.dataset.editing = editing ? "true" : "false";
    };
    const onFocus = setEditing(true);
    const onBlur = setEditing(false);
    form.addEventListener("focusin", onFocus);
    form.addEventListener("focusout", onBlur);
    return () => {
      form.removeEventListener("focusin", onFocus);
      form.removeEventListener("focusout", onBlur);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!isValid) return;
    await submit(event.currentTarget);
  }

  return (
    <section id="gynaecology-enquiry" aria-labelledby="gynaecology-enquiry-heading" data-service-enquiry className={`${conversion.enquiry} relative isolate scroll-mt-[var(--header-height)] bg-[#e8cec2] section-pad`}>
      <GynaecologyReveal className="container-birthwave grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{gynaecologyEnquiry.eyebrow}</p>
          <h2 id="gynaecology-enquiry-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {gynaecologyEnquiry.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{gynaecologyEnquiry.body}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium text-ink">
            {gynaecologyEnquiry.whatsapp ? (
              <a href="https://wa.me/917904251378" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-terracotta-deep underline hover:text-coral">
                {gynaecologyEnquiry.whatsapp} ↗
              </a>
            ) : null}
            {gynaecologyEnquiry.phone ? (
              <a href={`tel:${gynaecologyEnquiry.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-1.5 text-terracotta-deep underline hover:text-coral">
                Call {gynaecologyEnquiry.phone} ↗
              </a>
            ) : null}
          </div>

          <p className="mt-8 border-t border-[var(--color-border)] pt-4 text-sm leading-relaxed text-ink-soft">{gynaecologyEnquiry.urgentNote}</p>
        </div>

        <div className="w-full max-w-md rounded-sm bg-paper p-7 sm:p-8">
          <p className="mb-5 font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">{ENQUIRY_FORM_LABEL}</p>

          {status === "submitted" ? (
            <p role="status" className="text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {ENQUIRY_SUCCESS_MESSAGE}
            </p>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {error ? <EnquirySubmitError message={error} /> : null}
              <EnquirySubmissionNotice />
              <div className="flex flex-col gap-1.5">
                <label htmlFor={nameId} className={labelClass}>
                  {gynaecologyEnquiry.fields.name}
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
                  {gynaecologyEnquiry.fields.contact}
                </label>
                <input
                  id={contactId}
                  name="contact"
                  type="text"
                  autoComplete="tel"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  aria-invalid={touched && contact.trim().length === 0}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor={messageId} className={labelClass}>
                  {gynaecologyEnquiry.fields.message}
                </label>
                <textarea id={messageId} name="message" rows={3} value={message} onChange={(event) => setMessage(event.target.value)} className={cx(inputClass, "resize-none")} />
              </div>

              {touched && !isValid ? (
                <p className="text-sm font-medium text-terracotta-deep" role="alert">
                  Enter your name and a phone number or email so we can reach you.
                </p>
              ) : null}

              <button type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"} className={submitButtonClass}>
                {gynaecologyEnquiry.primaryCta}
              </button>
            </form>
          )}
        </div>
      </GynaecologyReveal>
    </section>
  );
}

export function GynaecologyMobileEnquiryBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("gynaecology-hero");
    const form = document.getElementById("gynaecology-enquiry");
    if (!hero || !form) return;

    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { threshold: 0 });
    const formObserver = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.05 });
    heroObserver.observe(hero);
    formObserver.observe(form);

    const formEl = form.querySelector("form");
    const syncEditing = () => setFormEditing(formEl?.dataset.editing === "true");
    const editingObserver = formEl ? new MutationObserver(syncEditing) : null;
    if (formEl && editingObserver) {
      editingObserver.observe(formEl, { attributes: true, attributeFilter: ["data-editing"] });
    }

    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
      editingObserver?.disconnect();
    };
  }, []);

  const visible = pastHero && !formVisible && !formEditing;

  return (
    <div
      className={cx(
        "fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-border)] bg-paper px-4 py-3 transition-transform duration-[var(--duration-base)] ease-[var(--ease-signature)] sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      inert={!visible}
    >
      <a
        href={gynaecologyMobileCta.href}
        className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] hover:bg-coral"
      >
        {gynaecologyMobileCta.label}
      </a>
    </div>
  );
}
