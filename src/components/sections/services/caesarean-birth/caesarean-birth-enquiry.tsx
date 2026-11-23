"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Phone } from "lucide-react";
import {
  EnquirySubmissionNotice,
  EnquirySubmitError,
  useEnquirySubmission,
} from "@/lib/use-enquiry-submission";
import { cx } from "@/lib/cx";
import conversion from "../shared/service-conversion.module.css";
import { caesareanBirthEnquiry, caesareanBirthMobileCta } from "@/content/pages/caesarean-birth";
import { CaesareanBirthReveal } from "./caesarean-birth-reveal";

const labelClass = "font-body text-sm font-semibold text-ink-soft";
const inputClass = "w-full rounded-xs border border-[var(--color-border-strong)] bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors duration-[var(--duration-fast)] focus:border-terracotta-deep focus-visible:outline-none";
const submitButtonClass = "group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-coral focus-ring-on-brand disabled:cursor-not-allowed disabled:opacity-60";

export function CaesareanBirthEnquiry() {
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const messageId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const { error, status, submit } = useEnquirySubmission("caesarean-birth");
  const isValid = name.trim().length > 0 && phone.trim().length > 0;

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const onFocus = () => { form.dataset.editing = "true"; };
    const onBlur = () => { form.dataset.editing = "false"; };
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
    <section id="caesarean-enquiry" aria-labelledby="caesarean-enquiry-heading" data-service-enquiry className={`${conversion.enquiry} relative isolate scroll-mt-[var(--header-height)] bg-[#e8cec2] section-pad`}>
      <CaesareanBirthReveal className="container-birthwave grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{caesareanBirthEnquiry.eyebrow}</p>
          <h2 id="caesarean-enquiry-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">{caesareanBirthEnquiry.heading}</h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{caesareanBirthEnquiry.body}</p>
          <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">{caesareanBirthEnquiry.contactNote}</p>
          <a href={caesareanBirthEnquiry.phoneHref} className="mt-7 inline-flex min-h-11 items-center gap-3 font-body text-base font-semibold text-ink transition-colors hover:text-terracotta-deep">
            <Phone aria-hidden="true" className="size-5 text-terracotta-deep" />
            {caesareanBirthEnquiry.phone}
          </a>
        </div>

        <div className="w-full max-w-md rounded-sm bg-paper p-7 sm:p-8">
          {status === "submitted" ? (
            <div role="status" className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Thank you for your enquiry</h3>
              <p className="text-base leading-[var(--leading-relaxed)] text-ink-soft">Our maternity team has received your information and will be in touch shortly to assist with consultation arrangements.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {error ? <EnquirySubmitError message={error} /> : null}
              <EnquirySubmissionNotice />
              <div className="flex flex-col gap-1.5">
                <label htmlFor={nameId} className={labelClass}>{caesareanBirthEnquiry.fields.name} <span className="text-terracotta">*</span></label>
                <input id={nameId} name="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={touched && name.trim().length === 0} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor={phoneId} className={labelClass}>{caesareanBirthEnquiry.fields.phone} <span className="text-terracotta">*</span></label>
                <input id={phoneId} name="phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} aria-invalid={touched && phone.trim().length === 0} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor={emailId} className={labelClass}>{caesareanBirthEnquiry.fields.email}</label>
                <input id={emailId} name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor={messageId} className={labelClass}>{caesareanBirthEnquiry.fields.message}</label>
                <textarea id={messageId} name="message" rows={4} placeholder={caesareanBirthEnquiry.fields.messagePlaceholder} value={message} onChange={(event) => setMessage(event.target.value)} className={cx(inputClass, "resize-y")} />
              </div>
              {touched && !isValid ? <p className="text-sm font-medium text-terracotta-deep" role="alert">Please enter your full name and phone number.</p> : null}
              <p className="text-xs leading-relaxed text-ink-soft">{caesareanBirthEnquiry.formNote}</p>
              <button type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"} className={submitButtonClass}>{caesareanBirthEnquiry.submitLabel}</button>
            </form>
          )}
        </div>
      </CaesareanBirthReveal>
    </section>
  );
}

export function CaesareanBirthMobileEnquiryBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("caesarean-birth-hero");
    const form = document.getElementById("caesarean-enquiry");
    if (!hero || !form) return;
    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { threshold: 0 });
    const formObserver = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.05 });
    heroObserver.observe(hero);
    formObserver.observe(form);
    const formEl = form.querySelector("form");
    const syncEditing = () => setFormEditing(formEl?.dataset.editing === "true");
    const editingObserver = formEl ? new MutationObserver(syncEditing) : null;
    if (editingObserver && formEl) editingObserver.observe(formEl, { attributes: true, attributeFilter: ["data-editing"] });
    return () => { heroObserver.disconnect(); formObserver.disconnect(); editingObserver?.disconnect(); };
  }, []);

  const visible = pastHero && !formVisible && !formEditing;

  return (
    <div className={cx("fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-border)] bg-paper px-4 py-3 transition-transform duration-[var(--duration-base)] ease-[var(--ease-signature)] sm:hidden", visible ? "translate-y-0" : "translate-y-full")} style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }} inert={!visible}>
      <a href={caesareanBirthMobileCta.href} className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] hover:bg-coral">{caesareanBirthMobileCta.label}</a>
    </div>
  );
}
