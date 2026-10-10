"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, HeartHandshake, Sparkles, Stethoscope } from "lucide-react";
import { pregnancyLandingAppointment, pregnancyLandingMobileCta } from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";
import { cx } from "@/lib/cx";

const labelClass = "font-body text-xs font-semibold tracking-wide text-ink uppercase";
const inputClass =
  "w-full rounded-xs border border-[var(--color-border-strong)] bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors duration-[var(--duration-fast)] focus:border-terracotta-deep focus-visible:outline-none";
const submitButtonClass =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase shadow-xs transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-coral focus-ring-on-brand disabled:cursor-not-allowed disabled:opacity-60";

const consultationBenefits = [
  {
    icon: Sparkles,
    title: "Dedicated, unhurried time",
    description: "Ample space for every question, symptom, and expectation without being rushed.",
  },
  {
    icon: Stethoscope,
    title: "Attentive clinical guidance",
    description: "Clear explanation of routine checks, tests, scans, and next steps.",
  },
  {
    icon: HeartHandshake,
    title: "Supportive care planning",
    description: "Individualized guidance aligned with your preferences and family needs.",
  },
];

/**
 * Section 9 — Consultation / Appointment Request.
 *
 * Split layout:
 * - Left: Reassurance copy, consultation benefits with soft icons, and transfer care note.
 * - Right: Clean form card with warm ivory styling and honest design preview handling.
 * - Background: Sanctuary visual blended smoothly at the right edge with a warm ivory gradient.
 */
export function PregnancyAntenatalAppointment() {
  const bgImage = servicesImagery["pregnancy-antenatal-appointment-bg"];
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
    <section
      id="appointment"
      aria-labelledby="appointment-heading"
      className="relative isolate overflow-hidden scroll-mt-[var(--header-height)] bg-[#FAF6F2] section-pad"
    >
      {/* Background visual blended at right edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-20 hidden w-1/2 opacity-35 lg:block">
        <Image
          src={bgImage.src}
          alt={bgImage.alt}
          fill
          sizes="50vw"
          className="object-cover"
          style={{ objectPosition: bgImage.objectPosition }}
        />
      </div>

      {/* Warm Ivory gradient overlay into text area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FAF6F2_0%,#FAF6F2_60%,rgba(250,246,242,0.88)_85%,transparent_100%)] lg:bg-[linear-gradient(90deg,#FAF6F2_0%,#FAF6F2_48%,color-mix(in_srgb,#FAF6F2_85%,transparent)_72%,transparent_100%)]"
      />

      <PregnancyReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
        {/* Left Column: Reassurance & Benefits */}
        <div className="max-w-xl">
          <p className="eyebrow text-terracotta-deep font-semibold">{pregnancyLandingAppointment.eyebrow}</p>
          <h2
            id="appointment-heading"
            className="mt-4 text-[clamp(2.2rem,1.6rem+2.8vw,3.6rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {pregnancyLandingAppointment.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {pregnancyLandingAppointment.body}
          </p>

          {/* Consultation Benefits List */}
          <div className="mt-8 flex flex-col gap-5 border-t border-[color-mix(in_srgb,var(--color-ink)_12%,transparent)] pt-6">
            {consultationBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-soft-rose/70 border border-terracotta/30 text-terracotta-deep">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-body text-base font-semibold text-ink">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-sm border-l-2 border-terracotta bg-[#F3E8E2]/50 p-4 text-xs leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Transferring care? </span>
            Bring existing prescriptions, ultrasound scans, and records. Your clinician will review your complete history with care.
          </div>
        </div>

        {/* Right Column: Clean Warm Form Card */}
        <div className="w-full max-w-lg rounded-tl-[40px] rounded-br-[40px] rounded-tr-md rounded-bl-md border border-[color-mix(in_srgb,var(--color-terracotta)_26%,transparent)] bg-[#FAF6F2]/95 backdrop-blur-sm p-8 sm:p-10 shadow-[0_24px_60px_-16px_rgba(53,43,41,0.12)]">
          <p className="mb-5 font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
            {pregnancyLandingAppointment.previewNotice}
          </p>

          {status === "previewed" ? (
            <div role="status" className="rounded-sm bg-white p-6 border border-terracotta/30">
              <CheckCircle2 className="size-8 text-terracotta-deep mb-3" />
              <p className="text-base leading-[var(--leading-relaxed)] text-ink">
                {pregnancyLandingAppointment.previewResult}
              </p>
            </div>
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
                        "cursor-pointer rounded-xs border px-3.5 py-2 font-body text-xs font-medium transition-colors duration-[var(--duration-fast)]",
                        method === option
                          ? "border-terracotta-deep bg-[color-mix(in_srgb,var(--color-terracotta)_18%,transparent)] text-ink font-semibold"
                          : "border-[var(--color-border-strong)] bg-white text-ink-soft hover:border-terracotta-deep",
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
                  className="mt-0.5 size-4 shrink-0 accent-terracotta"
                />
                <label htmlFor={consentId} className="text-xs leading-relaxed text-ink-soft">
                  {pregnancyLandingAppointment.fields.consent}
                </label>
              </div>

              {touched && !isValid ? (
                <p className="text-xs font-semibold text-terracotta-deep" role="alert">
                  Enter your name, contact number, and confirm you&rsquo;re happy to be contacted.
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
 * Mobile compact appointment CTA — appears once hero has scrolled past.
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
        "fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-border)] bg-[#FAF6F2] px-4 py-3 transition-transform duration-[var(--duration-base)] ease-[var(--ease-signature)] sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      inert={!visible}
    >
      <a
        href={pregnancyLandingMobileCta.href}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase shadow-xs transition-colors duration-[var(--duration-fast)] hover:bg-coral"
      >
        {pregnancyLandingMobileCta.label}
      </a>
    </div>
  );
}
