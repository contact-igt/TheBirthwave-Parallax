"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { vbacEnquiry, vbacMobileCta } from "@/content/pages/vbac";
import { VbacReveal } from "./vbac-reveal";
import { cx } from "@/lib/cx";

const labelClass = "font-body text-sm font-semibold text-ink-soft";
const inputClass =
  "w-full rounded-xs border border-[var(--color-border-strong)] bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors duration-[var(--duration-fast)] focus:border-terracotta-deep focus-visible:outline-none";
const submitButtonClass =
  "group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-coral focus-ring-on-brand disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Section 12 — FINAL CTA:
 * Direct contact options + Consultation enquiry form with caesarean count and topic selections.
 */
export function VbacEnquiry() {
  const nameId = useId();
  const phoneId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [caesareanCount, setCaesareanCount] = useState<string>(vbacEnquiry.caesareanOptions[0]);
  const [discussionTopic, setDiscussionTopic] = useState<string>(vbacEnquiry.discussionOptions[0]);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [touched, setTouched] = useState(false);

  const isValid = name.trim().length > 0 && phone.trim().length > 0;

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
    setStatus("submitted");
  }

  return (
    <section id="vbac-enquiry" aria-labelledby="vbac-enquiry-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-[#e8cec2] section-pad">
      <VbacReveal className="container-birthwave grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{vbacEnquiry.eyebrow}</p>
          <h2 id="vbac-enquiry-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacEnquiry.heading}
          </h2>

          <div className="mt-5 space-y-3.5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {vbacEnquiry.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[var(--color-border)] pt-6">
            <a
              href="#vbac-form"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold tracking-[0.08em] text-terracotta-deep uppercase transition-colors hover:text-terracotta"
            >
              <span>{vbacEnquiry.primaryCta}</span>
            </a>
            <a
              href={vbacEnquiry.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-body text-base font-semibold text-ink transition-colors hover:text-terracotta-deep"
            >
              <MessageCircle className="size-5 text-[#25D366]" />
              <span>{vbacEnquiry.whatsappCta}</span>
            </a>
            <a
              href={`tel:${vbacEnquiry.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-3 font-body text-base font-semibold text-ink transition-colors hover:text-terracotta-deep"
            >
              <Phone className="size-5 text-terracotta-deep" />
              <span>Call: {vbacEnquiry.phone}</span>
            </a>
          </div>
        </div>

        <div id="vbac-form" className="w-full max-w-md rounded-sm bg-paper p-7 sm:p-8">
          <h3 className="mb-6 text-xl font-semibold text-ink">Enquiry Form</h3>

          {status === "submitted" ? (
            <div role="status" className="space-y-4">
              <h4 className="text-lg font-semibold text-ink">Thank you for your enquiry</h4>
              <p className="text-base leading-[var(--leading-relaxed)] text-ink-soft">
                Our clinic team has received your information and will be in touch shortly to assist with consultation arrangements.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={nameId} className={labelClass}>
                  {vbacEnquiry.fields.name} <span className="text-terracotta">*</span>
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={touched && name.trim().length === 0}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor={phoneId} className={labelClass}>
                  {vbacEnquiry.fields.phone} <span className="text-terracotta">*</span>
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  aria-invalid={touched && phone.trim().length === 0}
                  className={inputClass}
                />
              </div>

              {/* How many previous caesarean births have you had? */}
              <fieldset className="flex flex-col gap-2">
                <legend className={cx(labelClass, "mb-1")}>
                  {vbacEnquiry.fields.caesareanCount}
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {vbacEnquiry.caesareanOptions.map((option) => (
                    <label
                      key={option}
                      className={cx(
                        "flex cursor-pointer items-center justify-center rounded-xs border p-3 text-center font-body text-xs transition-colors duration-[var(--duration-fast)]",
                        caesareanCount === option
                          ? "border-terracotta-deep bg-[color-mix(in_srgb,var(--color-terracotta)_14%,transparent)] font-semibold text-ink"
                          : "border-[var(--color-border-strong)] text-ink-soft hover:border-terracotta-deep",
                      )}
                    >
                      <input
                        type="radio"
                        name="caesareanCount"
                        value={option}
                        checked={caesareanCount === option}
                        onChange={() => setCaesareanCount(option)}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* What would you like to discuss? */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="discussionTopic" className={labelClass}>
                  {vbacEnquiry.fields.discussionTopic}
                </label>
                <select
                  id="discussionTopic"
                  name="discussionTopic"
                  value={discussionTopic}
                  onChange={(event) => setDiscussionTopic(event.target.value)}
                  className={inputClass}
                >
                  {vbacEnquiry.discussionOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {touched && !isValid ? (
                <p className="text-sm font-medium text-terracotta-deep" role="alert">
                  Please enter your name and phone number so we can reach you.
                </p>
              ) : null}

              <button type="submit" className={submitButtonClass}>
                {vbacEnquiry.submitLabel}
              </button>
            </form>
          )}
        </div>
      </VbacReveal>
    </section>
  );
}

/**
 * Mobile compact enquiry CTA
 */
export function VbacMobileEnquiryBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("vbac-hero");
    const form = document.getElementById("vbac-enquiry");
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
        href={vbacMobileCta.href}
        className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] hover:bg-coral"
      >
        {vbacMobileCta.label}
      </a>
    </div>
  );
}
