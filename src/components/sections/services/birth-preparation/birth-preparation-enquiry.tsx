"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { birthPrepEnquiry, birthPrepMobileCta } from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { cx } from "@/lib/cx";

const labelClass = "font-body text-sm font-semibold text-ink-soft";
const inputClass =
  "w-full rounded-xs border border-[var(--color-border-strong)] bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors duration-[var(--duration-fast)] focus:border-terracotta-deep focus-visible:outline-none";
const submitButtonClass =
  "group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-coral focus-ring-on-brand disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Section 10 — Final Enquiry & Direct Contact.
 */
export function BirthPrepEnquiry() {
  const nameId = useId();
  const phoneId = useId();
  const stageId = useId();
  const messageId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState("");
  const [interest, setInterest] = useState<string>(birthPrepEnquiry.interestOptions[0]);
  const [message, setMessage] = useState("");
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
    <section
      id="birth-prep-enquiry"
      aria-labelledby="birth-prep-enquiry-heading"
      className="relative isolate scroll-mt-[var(--header-height)] bg-[#e8cec2] section-pad"
    >
      <BirthPrepReveal className="container-birthwave grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{birthPrepEnquiry.eyebrow}</p>
          <h2 id="birth-prep-enquiry-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {birthPrepEnquiry.heading}
          </h2>
          {birthPrepEnquiry.body.split("\n\n").map((para) => (
            <p key={para} className="mt-4 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              {para}
            </p>
          ))}

          <div className="mt-8 flex flex-col gap-4 border-t border-[var(--color-border)] pt-6">
            <a
              href={`tel:${birthPrepEnquiry.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-3 font-body text-base font-semibold text-ink transition-colors hover:text-terracotta-deep"
            >
              <Phone className="size-5 text-terracotta-deep" />
              <span>{birthPrepEnquiry.phone}</span>
            </a>
            <a
              href={birthPrepEnquiry.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-body text-base font-semibold text-ink transition-colors hover:text-terracotta-deep"
            >
              <MessageCircle className="size-5 text-[#25D366]" />
              <span>CHAT ON WHATSAPP ↗</span>
            </a>
          </div>
        </div>

        <div className="w-full max-w-md rounded-sm bg-paper p-7 sm:p-8">
          {status === "submitted" ? (
            <div role="status" className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Thank you for your enquiry</h3>
              <p className="text-base leading-[var(--leading-relaxed)] text-ink-soft">
                Our team has received your information and will be in touch shortly to assist with session details and booking.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={nameId} className={labelClass}>
                  {birthPrepEnquiry.fields.name}
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
                <label htmlFor={phoneId} className={labelClass}>
                  {birthPrepEnquiry.fields.phone}
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  aria-invalid={touched && phone.trim().length === 0}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor={stageId} className={labelClass}>
                  {birthPrepEnquiry.fields.stage}
                </label>
                <input
                  id={stageId}
                  name="stage"
                  type="text"
                  placeholder="e.g. 28 weeks / due in November"
                  value={stage}
                  onChange={(event) => setStage(event.target.value)}
                  className={inputClass}
                />
              </div>

              <fieldset className="flex flex-col gap-2">
                <legend className={cx(labelClass, "mb-1")}>{birthPrepEnquiry.fields.interest}</legend>
                <div className="grid grid-cols-2 gap-2">
                  {birthPrepEnquiry.interestOptions.map((option) => (
                    <label
                      key={option}
                      className={cx(
                        "flex cursor-pointer items-center justify-center rounded-xs border p-3 text-center font-body text-xs transition-colors duration-[var(--duration-fast)]",
                        interest === option
                          ? "border-terracotta-deep bg-[color-mix(in_srgb,var(--color-terracotta)_14%,transparent)] font-semibold text-ink"
                          : "border-[var(--color-border-strong)] text-ink-soft hover:border-terracotta-deep",
                      )}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={option}
                        checked={interest === option}
                        onChange={() => setInterest(option)}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-1.5">
                <label htmlFor={messageId} className={labelClass}>
                  {birthPrepEnquiry.fields.message}
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
                  Please enter your name and phone number so we can reach you.
                </p>
              ) : null}

              <button type="submit" className={submitButtonClass}>
                {birthPrepEnquiry.submitLabel}
              </button>
            </form>
          )}
        </div>
      </BirthPrepReveal>
    </section>
  );
}

/**
 * Mobile compact enquiry CTA
 */
export function BirthPrepMobileEnquiryBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("birth-prep-hero");
    const form = document.getElementById("birth-prep-enquiry");
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
        href={birthPrepMobileCta.href}
        className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] hover:bg-coral"
      >
        {birthPrepMobileCta.label}
      </a>
    </div>
  );
}
