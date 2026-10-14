"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { fertilityEnquiry, fertilityMobileCta } from "@/content/fertility-preconception-landing-content";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

const phoneDigits = fertilityEnquiry.phone.replace(/\D/g, "");
const phoneHref = `tel:+${phoneDigits}`;
const whatsappHref = `https://wa.me/${phoneDigits}`;

const labelClass = "font-body text-sm font-semibold text-ink-soft";
const inputClass =
  "w-full rounded-xs border border-[var(--color-border-strong)] bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors duration-[var(--duration-fast)] focus:border-terracotta-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-deep";
const contactLinkClass =
  "inline-flex min-h-11 items-center rounded-xs !text-terracotta-deep underline underline-offset-4 hover:!text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-deep font-semibold";
const submitButtonClass =
  "group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-coral focus-ring-on-brand disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Section 11 — Plan Your Next Step.
 * Enquiry form and communication channels.
 */
export function FertilityEnquiry() {
  const nameId = useId();
  const contactId = useId();
  const topicId = useId();
  const messageId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "previewed">("idle");
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!isValid) return;
    setStatus("previewed");
  }

  return (
    <section id="fertility-enquiry" aria-labelledby="fertility-enquiry-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-[#e8cec2] section-pad">
      <div className="container-birthwave grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{fertilityEnquiry.eyebrow}</p>
          <h2 id="fertility-enquiry-heading" className={cx(styles.display, styles.h2, "mt-4")}>
            {fertilityEnquiry.heading}
          </h2>
          <div className="mt-5 space-y-3 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {fertilityEnquiry.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
            <li>
              <a href={phoneHref} className={contactLinkClass}>
                Call: {fertilityEnquiry.phone}
              </a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                {fertilityEnquiry.whatsappLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>

          <p className="mt-8 border-t border-[var(--color-border)] pt-4 text-sm leading-relaxed text-ink-soft">
            {fertilityEnquiry.disclaimer}
          </p>
        </div>

        <div className="w-full max-w-md rounded-sm bg-paper p-7 sm:p-8">
          <p className="mb-5 font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
            {fertilityEnquiry.previewNotice}
          </p>

          {status === "previewed" ? (
            <p role="status" className="text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {fertilityEnquiry.previewResult}
            </p>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={nameId} className={labelClass}>
                  {fertilityEnquiry.fields.name}
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
                  {fertilityEnquiry.fields.contact}
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
                <label htmlFor={topicId} className={labelClass}>
                  {fertilityEnquiry.fields.topic}
                </label>
                <select
                  id={topicId}
                  name="topic"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  className={inputClass}
                >
                  <option value="">Select an option...</option>
                  {fertilityEnquiry.dropdownOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor={messageId} className={labelClass}>
                  {fertilityEnquiry.fields.message}
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className={cx(inputClass, "resize-none")}
                />
              </div>

              {touched && !isValid ? (
                <p className="text-sm font-medium text-terracotta-deep" role="alert">
                  {fertilityEnquiry.validationMessage}
                </p>
              ) : null}

              <button type="submit" className={submitButtonClass}>
                {fertilityEnquiry.submitLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Mobile compact CTA — appears once the hero has scrolled past, hides while
 * the enquiry form is in view or any of its fields has focus.
 */
export function FertilityMobileEnquiryBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("fertility-hero");
    const form = document.getElementById("fertility-enquiry");
    if (!hero || !form) return;

    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { threshold: 0 });
    const formObserver = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.05 });
    heroObserver.observe(hero);
    formObserver.observe(form);

    const formEl = form.querySelector("form");
    const syncEditing = () => setFormEditing(formEl?.dataset.editing === "true");
    const focusObserver = new MutationObserver(syncEditing);
    if (formEl) {
      focusObserver.observe(formEl, { attributes: true, attributeFilter: ["data-editing"] });
    }

    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
      focusObserver.disconnect();
    };
  }, []);

  const show = pastHero && !formVisible && !formEditing;

  return (
    <div
      aria-hidden={!show}
      className={cx(
        "fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-paper/95 px-4 py-3 shadow-[var(--shadow-panel)] backdrop-blur-md transition-transform duration-[var(--duration-normal)] ease-[var(--ease-signature)] lg:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <a
        href={fertilityMobileCta.href}
        className="flex min-h-11 w-full items-center justify-center rounded-xs bg-terracotta px-4 py-2.5 font-body text-sm font-semibold tracking-wider text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-coral focus-ring-on-brand"
      >
        {fertilityMobileCta.label}
      </a>
    </div>
  );
}
