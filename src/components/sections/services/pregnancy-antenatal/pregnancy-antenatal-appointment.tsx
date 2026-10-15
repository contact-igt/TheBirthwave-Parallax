"use client";

import conversion from "../shared/service-conversion.module.css";


import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Heart,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  pregnancyLandingAppointment,
  pregnancyLandingMobileCta,
} from "@/content/pregnancy-antenatal-landing-content";
import { cx } from "@/lib/cx";

const consultationBenefits = [
  {
    icon: Clock,
    title: "Dedicated, unhurried time",
    description: "A calm space to discuss your concerns and plan without being rushed.",
  },
  {
    icon: Heart,
    title: "Attentive clinical guidance",
    description: "Clear, evidence-informed information to help you make confident next steps.",
  },
  {
    icon: Users,
    title: "Supportive care planning",
    description: "Personalised guidance that considers your medical needs and family goals.",
  },
];

/**
 * Section 9 — Final Conversion Section / Enquiry Form.
 * Matches the reference design:
 * - Fluid organic blush/terracotta wave backdrop
 * - Arched clinic sanctuary decorative visual on the far left
 * - Centered editorial copy with reassurance pillars and privacy badge
 * - Polished white form card with custom radio pills and coral CTA button
 */
export function PregnancyAntenatalAppointment() {
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const helpId = useId();
  const messageId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [helpReason, setHelpReason] = useState<string>(
    pregnancyLandingAppointment.helpOptions[0],
  );
  const [method, setMethod] = useState<string>("Phone Call");
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
      data-service-enquiry className={`${conversion.enquiry} ${conversion.pregnancy} relative isolate overflow-hidden scroll-mt-[calc(var(--header-height)+1rem)] pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 bg-[#FAF3EE]`}
    >
      {/* Decorative organic background curves matching reference screenshot */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft radial blush ambient glow */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-24 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(224,109,83,0.18)_0%,transparent_70%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-24 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(224,109,83,0.16)_0%,transparent_70%)] blur-3xl"
        />

        {/* Smooth organic wave vectors */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-65"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-left sweeping curve */}
          <path
            d="M-50 -50 C 180 70, 280 260, 220 520 C 170 720, 70 820, -50 950 Z"
            fill="url(#blush-wave-1)"
          />
          {/* Bottom swooping curve beneath form */}
          <path
            d="M 340 950 C 600 900, 780 740, 890 590 C 1000 410, 1220 450, 1500 350 L 1500 960 L 300 960 Z"
            fill="url(#blush-wave-2)"
          />
          <defs>
            <linearGradient
              id="blush-wave-1"
              x1="0"
              y1="0"
              x2="240"
              y2="600"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F5DFD5" stopOpacity="0.85" />
              <stop stopColor="#F9ECE5" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient
              id="blush-wave-2"
              x1="450"
              y1="850"
              x2="1400"
              y2="420"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F3DDD2" stopOpacity="0.75" />
              <stop stopColor="#F9ECE5" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container-birthwave max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className={conversion.enquiryGrid}>
          {/* Column 2: Editorial Text + 3 Pillars + Privacy Shield (middle) */}
          <div className="flex flex-col justify-center min-w-0">
            {/* Eyebrow Pill */}
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E5A896]/60 bg-[#FFF3EE] px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-[#B85D45] uppercase mb-3 shadow-2xs">
                <span>•</span>
                <span>{pregnancyLandingAppointment.eyebrow}</span>
                <span>•</span>
              </div>
            </div>

            {/* Main Heading */}
            <h2
              id="appointment-heading"
              className="font-display !text-2xl sm:!text-3xl lg:!text-[36px] font-bold tracking-tight text-[#241A17] !leading-[1.14] mb-3.5 text-balance"
            >
              Start your pregnancy care with a conversation.
            </h2>

            {/* Paragraphs */}
            <div className="space-y-2.5 text-xs sm:text-[13.5px] leading-relaxed text-[#5A4942] mb-5 max-w-xl">
              <p>
                Whether you&apos;re recently discovered you&apos;re pregnant,
                have questions about your current pregnancy or are considering
                continuing your antenatal care at The Birthwave, you can
                contact the team for consultation information.
              </p>
              <p>
                Share what you need help with, and the team can guide you on
                appointment availability and the next steps.
              </p>
            </div>

            {/* 3 Reassurance Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 xl:gap-4 mb-5 pt-1 max-w-xl">
              {consultationBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex flex-col">
                    <div className="size-7.5 rounded-full bg-[#FFF0EB] border border-[#ECC7BC] text-[#C85D3F] flex items-center justify-center mb-2 shadow-2xs">
                      <Icon className="size-3.5" aria-hidden="true" />
                    </div>
                    <p className="font-body text-xs sm:text-[12.5px] font-bold text-[#241A17] leading-snug mb-1">
                      {benefit.title}
                    </p>
                    <p className="text-[11px] leading-relaxed text-[#75645D]">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Privacy Reassurance Line */}
            <div className="flex items-center gap-2.5 pt-2.5 border-t border-[#E8DDD5]/60 text-[11px] sm:text-xs text-[#75645D] max-w-xl">
              <ShieldCheck
                className="size-4 shrink-0 text-[#C85D3F]"
                aria-hidden="true"
              />
              <p className="leading-snug">
                Your information is kept private and used only to respond to
                your enquiry and support your care at The Birthwave.
              </p>
            </div>
          </div>

          {/* Column 3: White Form Card (right) */}
          <div className="w-full">
            <div className="rounded-[28px] bg-white p-6 sm:p-7 md:p-8 shadow-[0_12px_44px_rgba(40,25,20,0.06)] border border-[#F2E8E1]">
              {status === "submitted" ? (
                <div
                  role="status"
                  className="rounded-2xl bg-[#FFF8F6] p-8 border border-[#EADBCE] text-center"
                >
                  <CheckCircle2 className="mx-auto size-12 text-[#E06D53] mb-3" />
                  <h3 className="text-xl font-bold text-[#241A17]">
                    Thank you for your enquiry
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5A4942]">
                    Our team at The Birthwave has received your request and will
                    be in touch shortly to assist with consultation availability
                    and appointment arrangements.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setName("");
                      setPhone("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#E06D53] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#CF5D43] transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-3.5 sm:space-y-4"
                >
                  {/* Row 1: Full name & Phone number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={nameId}
                        className="text-[10.5px] font-bold uppercase tracking-wider text-[#352B29]"
                      >
                        FULL NAME{" "}
                        <span className="text-[#E06D53] font-bold">*</span>
                      </label>
                      <input
                        id={nameId}
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Radhika Sundaram"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={touched && name.trim().length === 0}
                        className={cx(
                          "w-full rounded-xl border bg-[#FAF7F5] px-3.5 py-2.5 text-xs sm:text-sm text-[#241A17] placeholder:text-[#AFA6A0] transition-all focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E06D53]",
                          touched && name.trim().length === 0
                            ? "border-red-400 ring-1 ring-red-400"
                            : "border-[#E8DDD5] focus:border-[#E06D53]",
                        )}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={phoneId}
                        className="text-[10.5px] font-bold uppercase tracking-wider text-[#352B29]"
                      >
                        PHONE NUMBER{" "}
                        <span className="text-[#E06D53] font-bold">*</span>
                      </label>
                      <input
                        id={phoneId}
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 98765 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        aria-invalid={touched && phone.trim().length === 0}
                        className={cx(
                          "w-full rounded-xl border bg-[#FAF7F5] px-3.5 py-2.5 text-xs sm:text-sm text-[#241A17] placeholder:text-[#AFA6A0] transition-all focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E06D53]",
                          touched && phone.trim().length === 0
                            ? "border-red-400 ring-1 ring-red-400"
                            : "border-[#E8DDD5] focus:border-[#E06D53]",
                        )}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email (Optional) & How can we help? */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={emailId}
                        className="text-[10.5px] font-bold uppercase tracking-wider text-[#352B29]"
                      >
                        EMAIL (OPTIONAL)
                      </label>
                      <input
                        id={emailId}
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-[#E8DDD5] bg-[#FAF7F5] px-3.5 py-2.5 text-xs sm:text-sm text-[#241A17] placeholder:text-[#AFA6A0] transition-all focus:border-[#E06D53] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E06D53]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={helpId}
                        className="text-[10.5px] font-bold uppercase tracking-wider text-[#352B29]"
                      >
                        HOW CAN WE HELP?{" "}
                        <span className="text-[#E06D53] font-bold">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id={helpId}
                          name="helpReason"
                          value={helpReason}
                          onChange={(e) => setHelpReason(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-[#E8DDD5] bg-[#FAF7F5] px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-[#241A17] transition-all focus:border-[#E06D53] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E06D53] cursor-pointer"
                        >
                          {pregnancyLandingAppointment.helpOptions.map(
                            (opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ),
                          )}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#8C7E77]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Preferred Contact Method */}
                  <fieldset className="flex flex-col gap-1.5 pt-0.5">
                    <legend className="text-[10.5px] font-bold uppercase tracking-wider text-[#352B29]">
                      PREFERRED CONTACT METHOD
                    </legend>
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      {(["Phone Call", "WhatsApp", "Email"] as const).map(
                        (option) => {
                          const isSelected = method === option;
                          return (
                            <label
                              key={option}
                              className={cx(
                                "flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 rounded-xl border text-xs font-medium cursor-pointer transition-all shadow-2xs select-none",
                                isSelected
                                  ? "border-[#E06D53] bg-[#FFF5F2] text-[#241A17] font-semibold ring-1 ring-[#E06D53]"
                                  : "border-[#E8DDD5] bg-[#FAF7F5] text-[#6E5D53] hover:bg-[#FFF8F6] hover:border-[#E06D53]/60",
                              )}
                            >
                              <input
                                type="radio"
                                name="contactMethod"
                                value={option}
                                checked={isSelected}
                                onChange={() => setMethod(option)}
                                className="sr-only"
                              />
                              {isSelected ? (
                                <span
                                  className="size-3.5 rounded-full border-2 border-[#E06D53] flex items-center justify-center shrink-0"
                                  aria-hidden="true"
                                >
                                  <span className="size-1.5 rounded-full bg-[#E06D53]" />
                                </span>
                              ) : (
                                <span
                                  className="size-3.5 rounded-full border-2 border-[#D5C6BD] shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                              <span>{option}</span>
                            </label>
                          );
                        },
                      )}
                    </div>
                  </fieldset>

                  {/* Row 4: Message (Optional) */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={messageId}
                      className="text-[10.5px] font-bold uppercase tracking-wider text-[#352B29]"
                    >
                      MESSAGE (OPTIONAL)
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      rows={3}
                      placeholder="Any questions or specific notes for your appointment?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none rounded-xl border border-[#E8DDD5] bg-[#FAF7F5] px-3.5 py-2.5 text-xs sm:text-sm text-[#241A17] placeholder:text-[#AFA6A0] transition-all focus:border-[#E06D53] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#E06D53]"
                    />
                  </div>

                  {touched && !isValid && (
                    <p
                      className="text-xs font-semibold text-[#E06D53]"
                      role="alert"
                    >
                      Please enter your full name and phone number so we can
                      reach you.
                    </p>
                  )}

                  {/* Row 5: Submit Button */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#E06D53] hover:bg-[#CF5D43] text-white py-3.5 sm:py-4 px-6 font-bold text-xs sm:text-[13px] tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <span>REQUEST A PREGNANCY CONSULTATION</span>
                    <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                  </button>

                  {/* Row 6: Disclaimer */}
                  <p className="text-center text-[10.5px] leading-relaxed text-[#8C7E77] pt-1 px-1">
                    This form is for appointment enquiries and non-urgent
                    requests. If you are experiencing urgent pregnancy-related
                    symptoms, seek prompt medical attention at an appropriate
                    healthcare facility or emergency service.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
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

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );
    const formObserver = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    heroObserver.observe(hero);
    formObserver.observe(form);

    const formEl = form.querySelector("form");
    const syncEditing = () =>
      setFormEditing(formEl?.dataset.editing === "true");
    const editingObserver = formEl ? new MutationObserver(syncEditing) : null;
    if (formEl && editingObserver) {
      editingObserver.observe(formEl, {
        attributes: true,
        attributeFilter: ["data-editing"],
      });
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
