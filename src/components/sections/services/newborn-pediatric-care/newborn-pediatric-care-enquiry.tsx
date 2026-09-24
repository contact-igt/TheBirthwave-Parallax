"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { newbornEnquiry, newbornMobileCta } from "@/content/newborn-pediatric-care-landing-content";
import { NewbornReveal } from "./newborn-pediatric-care-reveal";
import { cx } from "@/lib/cx";

const labelClass = "font-body text-sm font-semibold text-ink-soft";
const inputClass =
  "w-full rounded-xs border border-[var(--color-border-strong)] bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors duration-[var(--duration-fast)] focus:border-terracotta-deep focus-visible:outline-none";
const submitButtonClass =
  "group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-coral focus-ring-on-brand disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Section 10 — Final Enquiry. Carries the bare `enquiry` id every CTA on
 * this page targets. TODO(infra): exactly like the other ten landing
 * pages' own forms, no backend endpoint or verified enquiry inbox exists
 * anywhere in this project — a persistent "Preview" notice stays visible
 * above the form at all times, and submitting shows an honest "this is a
 * design preview, no enquiry has been sent" message, never a fake
 * success/confirmation. Deliberately short: full name, a single
 * phone-or-email contact field, and an optional message. Nothing here is
 * written to browser storage.
 */
export function NewbornEnquiry() {
  const nameId = useId();
  const contactId = useId();
  const messageId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "previewed">("idle");
  const [touched, setTouched] = useState(false);

  const isValid = name.trim().length > 0 && contact.trim().length > 0;

  // Broadcasts focus state on the form so `NewbornMobileEnquiryBar` can
  // hide itself while a field is actively being edited — mirrors
  // `PostpartumEnquiry`'s own effect.
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
    // route and never claims an enquiry was actually sent.
    setStatus("previewed");
  }

  return (
    <section id="enquiry" aria-labelledby="newborn-enquiry-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-[#e8cec2] section-pad">
      <NewbornReveal className="container-birthwave grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{newbornEnquiry.eyebrow}</p>
          <h2 id="newborn-enquiry-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {newbornEnquiry.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{newbornEnquiry.body}</p>
          <p className="mt-8 border-t border-[var(--color-border)] pt-4 text-sm leading-relaxed text-ink-soft">{newbornEnquiry.urgentNote}</p>
        </div>

        <div className="w-full max-w-md rounded-sm bg-paper p-7 sm:p-8">
          <p className="mb-5 font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">{newbornEnquiry.previewNotice}</p>

          {status === "previewed" ? (
            <p role="status" className="text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {newbornEnquiry.previewResult}
            </p>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={nameId} className={labelClass}>
                  {newbornEnquiry.fields.name}
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
                  {newbornEnquiry.fields.contact}
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
                  {newbornEnquiry.fields.message}
                </label>
                <textarea id={messageId} name="message" rows={3} value={message} onChange={(event) => setMessage(event.target.value)} className={cx(inputClass, "resize-none")} />
              </div>

              <p className="text-xs leading-relaxed text-ink-soft">{newbornEnquiry.formNote}</p>

              {touched && !isValid ? (
                <p className="text-sm font-medium text-terracotta-deep" role="alert">
                  Enter your name and a phone number or email so we can reach you.
                </p>
              ) : null}

              <button type="submit" className={submitButtonClass}>
                {newbornEnquiry.submitLabel}
              </button>
            </form>
          )}
        </div>
      </NewbornReveal>
    </section>
  );
}

/**
 * Mobile sticky CTA — appears once the hero has scrolled past, hides while
 * the enquiry form is in view OR while any of its fields has focus. Mirrors
 * `PostpartumMobileEnquiryBar` exactly, retargeted at this page's own
 * `#newborn-hero`/`#enquiry` ids.
 */
export function NewbornMobileEnquiryBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("newborn-hero");
    const form = document.getElementById("enquiry");
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
        href={newbornMobileCta.href}
        className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs bg-terracotta px-6 py-3 font-body text-sm font-semibold tracking-[0.08em] text-[var(--color-on-brand)] uppercase transition-colors duration-[var(--duration-fast)] hover:bg-coral"
      >
        {newbornMobileCta.label}
      </a>
    </div>
  );
}
