"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, HeartHandshake, Sparkles, Stethoscope } from "lucide-react";
import { pregnancyLandingAppointment, pregnancyLandingMobileCta } from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";
import { cx } from "@/lib/cx";

const labelClass = "font-body text-xs font-semibold tracking-wide text-ink uppercase";

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
 * Section 9 — Final Conversion Section / Enquiry Form.
 */
export function PregnancyAntenatalAppointment() {
  const bgImage = servicesImagery["pregnancy-antenatal-appointment-bg"];
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const helpId = useId();
  const messageId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [helpReason, setHelpReason] = useState<string>(pregnancyLandingAppointment.helpOptions[0]);
  const [method, setMethod] = useState<string>(pregnancyLandingAppointment.contactMethods[0]);
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
      id="appointment"
      aria-labelledby="appointment-heading"
      className="relative isolate overflow-hidden scroll-mt-[var(--header-height)] py-20 sm:py-24 md:py-32"
    >
      {/* Background visual with sanctuary atmosphere */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={bgImage.src}
          alt={bgImage.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Warm atmospheric overlay inspired by reference */}
        <div className="absolute inset-0 bg-[#FAF6F2]/88 sm:bg-[#FAF6F2]/82 backdrop-blur-[2px]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.25)_0%,transparent_70%)] blur-3xl opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(93,174,219,0.2)_0%,transparent_70%)] blur-3xl opacity-60"
        />
      </div>

      <PregnancyReveal className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="rounded-3xl border border-[#CA9585]/35 bg-white/95 p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-md">
          {/* Section Header */}
          <div className="mx-auto max-w-xl text-center mb-8 sm:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#CA9585]/40 bg-[#FFF1EC] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#7A4F44]">
              <span className="size-1.5 rounded-full bg-coral" />
              {pregnancyLandingAppointment.eyebrow}
            </div>
            <h2
              id="appointment-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-[var(--tracking-tight)] text-[#352B29]"
            >
              {pregnancyLandingAppointment.heading}
            </h2>
            <div className="mt-3 space-y-2 text-sm md:text-base leading-relaxed text-[#514440]">
              {pregnancyLandingAppointment.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>

          {/* 3 Consultation Reassurance Pillars */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-[#CA9585]/20 py-4">
            {consultationBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex items-start gap-2.5 p-2">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#FFF1EC] border border-[#CA9585]/30 text-[#7A4F44]">
                    <Icon className="size-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-body text-xs font-semibold text-[#352B29]">{benefit.title}</h3>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#746764]">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {status === "submitted" ? (
            <div role="status" className="rounded-2xl bg-[#FFF8F6] p-8 border border-[#CA9585]/30 text-center">
              <CheckCircle2 className="mx-auto size-10 text-coral mb-3" />
              <h3 className="text-xl font-semibold text-[#352B29]">Thank you for your enquiry</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#514440] max-w-md mx-auto">
                Our team at The Birthwave has received your request and will be in touch shortly to assist with consultation availability and appointment arrangements.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
              {/* Full name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={nameId} className={labelClass}>
                    {pregnancyLandingAppointment.fields.name} <span className="text-coral">*</span>
                  </label>
                  <input
                    id={nameId}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Radhika Sundaram"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    aria-invalid={touched && name.trim().length === 0}
                    className="w-full rounded-xl border border-[#D5C2BD] bg-[#FFF8F6] px-4 py-3 text-sm text-[#352B29] placeholder:text-[#83746F]/60 transition-colors focus:border-[#CA9585] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CA9585]/30"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor={phoneId} className={labelClass}>
                    {pregnancyLandingAppointment.fields.phone} <span className="text-coral">*</span>
                  </label>
                  <input
                    id={phoneId}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 98400 00000"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    aria-invalid={touched && phone.trim().length === 0}
                    className="w-full rounded-xl border border-[#D5C2BD] bg-[#FFF8F6] px-4 py-3 text-sm text-[#352B29] placeholder:text-[#83746F]/60 transition-colors focus:border-[#CA9585] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CA9585]/30"
                  />
                </div>
              </div>

              {/* Email (optional) & Help reason */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={emailId} className={labelClass}>
                    {pregnancyLandingAppointment.fields.email}
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-[#D5C2BD] bg-[#FFF8F6] px-4 py-3 text-sm text-[#352B29] placeholder:text-[#83746F]/60 transition-colors focus:border-[#CA9585] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CA9585]/30"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor={helpId} className={labelClass}>
                    {pregnancyLandingAppointment.fields.helpReason} <span className="text-coral">*</span>
                  </label>
                  <select
                    id={helpId}
                    name="helpReason"
                    value={helpReason}
                    onChange={(event) => setHelpReason(event.target.value)}
                    className="w-full rounded-xl border border-[#D5C2BD] bg-[#FFF8F6] px-4 py-3 text-sm text-[#352B29] transition-colors focus:border-[#CA9585] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CA9585]/30"
                  >
                    {pregnancyLandingAppointment.helpOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred contact method */}
              <fieldset className="flex flex-col gap-2">
                <legend className={cx(labelClass, "mb-1")}>{pregnancyLandingAppointment.fields.contactMethod}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {pregnancyLandingAppointment.contactMethods.map((option) => (
                    <label
                      key={option}
                      className={cx(
                        "flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer text-xs md:text-sm font-medium transition-all shadow-2xs",
                        method === option
                          ? "border-coral bg-[#FFF1EC] text-[#352B29] font-semibold"
                          : "border-[#D5C2BD] bg-[#FFF8F6] text-[#514440] hover:bg-[#FFF1EC] hover:border-coral",
                      )}
                    >
                      <input
                        type="radio"
                        name="contactMethod"
                        value={option}
                        checked={method === option}
                        onChange={() => setMethod(option)}
                        className="text-coral focus:ring-coral"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Message (optional) */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={messageId} className={labelClass}>
                  {pregnancyLandingAppointment.fields.message}
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  rows={3}
                  placeholder="Any questions or specific notes for your appointment?"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full resize-none rounded-xl border border-[#D5C2BD] bg-[#FFF8F6] px-4 py-3 text-sm text-[#352B29] placeholder:text-[#83746F]/60 transition-colors focus:border-[#CA9585] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CA9585]/30"
                />
              </div>

              {/* Transfer care note */}
              <div className="rounded-xl border border-[#CA9585]/30 bg-[#FFF1EC]/60 p-3.5 text-xs text-[#514440]">
                <strong className="font-semibold text-[#352B29]">Transferring care? </strong>
                Bring existing prescriptions, ultrasound scans, and records. Dr. Santoshini and the team will review your complete history.
              </div>

              {touched && !isValid ? (
                <p className="text-xs font-semibold text-coral" role="alert">
                  Please enter your full name and phone number so we can reach you.
                </p>
              ) : null}

              <button
                type="submit"
                className="w-full bg-coral hover:bg-coral-dark text-white py-4 px-6 sm:px-8 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{pregnancyLandingAppointment.submitLabel}</span>
                <span>↗</span>
              </button>

              <div className="flex items-start justify-center gap-2 pt-2 text-xs text-[#83746F] text-center">
                <p>{pregnancyLandingAppointment.formNote}</p>
              </div>
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
        "fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-border)] bg-paper px-4 py-3 transition-transform duration-[var(--duration-base)] ease-[var(--ease-signature)] sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
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
