"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { pregnancyLandingAppointment, pregnancyLandingMobileCta } from "@/content/pregnancy-antenatal-landing-content";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";
import { cx } from "@/lib/cx";

const labelClass = "font-body text-sm font-semibold text-ink-soft";
const inputClass =
  "w-full rounded-xs border border-[var(--color-border-strong)] bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors duration-[var(--duration-fast)] focus:border-terracotta-deep focus-visible:outline-none";
const submitButtonClass =
  "group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-coral focus-ring-on-brand disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Section 9 — Appointment Request. TODO(infra): no backend endpoint or
 * verified enquiry inbox exists anywhere in this project (confirmed —
 * there is no `src/app/api` route, and `doctors-enquiry-form.tsx`'s own
 * identical situation is the closest precedent). This page's own brief
 * is explicit that a form built ahead of that integration must not
 * pretend otherwise: a persistent "Preview" notice stays visible above
 * the form at all times (not just after a failed submit), and submitting
 * shows an honest "this is a design preview, no request has been sent"
 * message — never the "thank you, we've received your details" wording
 * `doctors-enquiry-form.tsx` uses for its own, differently-scoped
 * confirmation. Real, controlled fields and real keyboard/focus
 * behaviour throughout regardless — the PREVIEW is the destination, not
 * the interactivity.
 *
 * Deliberately short: name, contact number, preferred contact method,
 * and contact consent — no medical history, symptoms, pregnancy stage or
 * document upload, per the brief's own explicit exclusion for this
 * initial enquiry.
 */
export function PregnancyAntenatalAppointment() {
  const nameId = useId();
  const contactId = useId();
  const consentId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [method, setMethod] = useState<string>(pregnancyLandingAppointment.contactMethods[0]);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "previewed">("idle");
  const [touched, setTouched] = useState(false);

  const isValid = name.trim().length > 0 && contact.trim().length > 0 && consent;

  // Broadcasts focus state on the form so `PregnancyMobileAppointmentBar`
  // can hide itself while a field is actively being edited — see that
  // component's own comment for why a plain "is the form in view" check
  // alone isn't enough.
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
    // No backend endpoint exists yet — this never calls `fetch`/an API
    // route and never claims a request was actually sent. See this
    // component's own top comment.
    setStatus("previewed");
  }

  return (
    <section id="appointment" aria-labelledby="appointment-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-[#e8cec2] section-pad">
      <PregnancyReveal className="container-birthwave grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{pregnancyLandingAppointment.eyebrow}</p>
          <h2 id="appointment-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {pregnancyLandingAppointment.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{pregnancyLandingAppointment.body}</p>
        </div>

        <div className="w-full max-w-md rounded-sm bg-paper p-7 sm:p-8">
          <p className="mb-5 font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
            {pregnancyLandingAppointment.previewNotice}
          </p>

          {status === "previewed" ? (
            <p role="status" className="text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {pregnancyLandingAppointment.previewResult}
            </p>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={nameId} className={labelClass}>
                  {pregnancyLandingAppointment.fields.name}
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
                  {pregnancyLandingAppointment.fields.contact}
                </label>
                <input
                  id={contactId}
                  name="contact"
                  type="tel"
                  autoComplete="tel"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  aria-invalid={touched && contact.trim().length === 0}
                  className={inputClass}
                />
              </div>

              <fieldset className="flex flex-col gap-2">
                <legend className={cx(labelClass, "mb-1")}>{pregnancyLandingAppointment.fields.contactMethod}</legend>
                <div className="flex flex-wrap gap-2">
                  {pregnancyLandingAppointment.contactMethods.map((option) => (
                    <label
                      key={option}
                      className={cx(
                        "cursor-pointer rounded-xs border px-3.5 py-2 font-body text-sm transition-colors duration-[var(--duration-fast)]",
                        method === option
                          ? "border-terracotta-deep bg-[color-mix(in_srgb,var(--color-terracotta)_14%,transparent)] text-ink"
                          : "border-[var(--color-border-strong)] text-ink-soft hover:border-terracotta-deep",
                      )}
                    >
                      <input
                        type="radio"
                        name="contactMethod"
                        value={option}
                        checked={method === option}
                        onChange={() => setMethod(option)}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex items-start gap-2.5">
                <input
                  id={consentId}
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-0.5 size-4 shrink-0"
                />
                <label htmlFor={consentId} className="text-sm leading-relaxed text-ink-soft">
                  {pregnancyLandingAppointment.fields.consent}
                </label>
              </div>

              {touched && !isValid ? (
                <p className="text-sm font-medium text-terracotta-deep" role="alert">
                  Enter your name, a contact number, and confirm you&rsquo;re happy to be contacted.
                </p>
              ) : null}

              <button type="submit" className={submitButtonClass}>
                {pregnancyLandingAppointment.submitLabel}
              </button>
            </form>
          )}
        </div>
      </PregnancyReveal>
    </section>
  );
}

/**
 * Mobile compact appointment CTA — appears once the hero has scrolled
 * past, hides while the appointment form (`#appointment`) is in view OR
 * while any of its fields has focus (the form's own `data-editing`
 * attribute, set by `PregnancyAntenatalAppointment`'s own effect — a
 * plain "is the section visible" check alone would still let this bar
 * cover a focused field/keyboard-opened viewport on a short mobile
 * screen where the form is only partly in view while being filled in).
 * `sm:hidden` — desktop never shows it.
 */
export function PregnancyMobileAppointmentBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("pregnancy-hero");
    const form = document.getElementById("appointment");
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
      // Inert (not just visually hidden) when tucked away, so its own
      // link is never keyboard-focusable while off-screen.
      inert={!visible}
    >
      <a
        href={pregnancyLandingMobileCta.href}
        className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] hover:bg-coral"
      >
        {pregnancyLandingMobileCta.label}
      </a>
    </div>
  );
}
