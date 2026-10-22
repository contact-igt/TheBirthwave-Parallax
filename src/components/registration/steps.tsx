"use client";

import Link from "next/link";
import {
  CONCERNS,
  GENDERS,
  INDIAN_STATES,
  SOURCES,
  calculateAge,
  collapse,
  dobToISO,
  formatDateIN,
  normaliseIndianMobile,
  toggleConcern,
  toggleSource,
  validateDob,
  type Answers,
  type FieldErrors,
  type StepId,
} from "@/lib/registration/rules";
import { FieldError, FieldGroup, OptionCard, RequirementTag, TextField } from "./fields";
import { PRIVACY_SUMMARY } from "./registration-content";
import { SignaturePad, type Stroke } from "./signature-pad";
import { SourceIcon } from "./source-icon";
import s from "./registration.module.css";

interface StepProps {
  answers: Answers;
  update: (patch: Partial<Answers>) => void;
  errors: FieldErrors;
}

const digitsOnly = (value: string, max: number) => value.replace(/\D/g, "").slice(0, max);
const phoneChars = (value: string) => value.replace(/[^\d\s+\-]/g, "").slice(0, 18);

export function NameStep({ answers, update, errors }: StepProps) {
  return (
    <TextField
      fieldKey="fullName"
      label="Full name"
      value={answers.fullName}
      onValue={(fullName) => update({ fullName })}
      error={errors.fullName}
      autoComplete="name"
      autoCapitalize="words"
      spellCheck={false}
      maxLength={100}
      enterKeyHint="next"
    />
  );
}

export function BirthStep({ answers, update, errors }: StepProps) {
  const focusNext = (id: string) => document.getElementById(id)?.focus();
  const dobValid = !validateDob(answers.dobDay, answers.dobMonth, answers.dobYear);
  const minor = dobValid && calculateAge(dobToISO(answers.dobDay, answers.dobMonth, answers.dobYear)) < 18;

  return (
    <>
      <FieldGroup fieldKey="dob" legend="Date of birth" hint="Day, month and year — for example 14 / 03 / 1993." error={errors.dob}>
        <div className={s.dobRow}>
          <div className={s.dobPart}>
            <label htmlFor="field-dobDay" className={s.subLabel}>
              Day
            </label>
            <input
              id="field-dobDay"
              className={s.input}
              inputMode="numeric"
              autoComplete="bday-day"
              maxLength={2}
              placeholder="DD"
              value={answers.dobDay}
              aria-invalid={errors.dob ? true : undefined}
              onChange={(event) => {
                const dobDay = digitsOnly(event.target.value, 2);
                update({ dobDay });
                if (dobDay.length === 2) focusNext("field-dobMonth");
              }}
            />
          </div>
          <div className={s.dobPart}>
            <label htmlFor="field-dobMonth" className={s.subLabel}>
              Month
            </label>
            <input
              id="field-dobMonth"
              className={s.input}
              inputMode="numeric"
              autoComplete="bday-month"
              maxLength={2}
              placeholder="MM"
              value={answers.dobMonth}
              aria-invalid={errors.dob ? true : undefined}
              onChange={(event) => {
                const dobMonth = digitsOnly(event.target.value, 2);
                update({ dobMonth });
                if (dobMonth.length === 2) focusNext("field-dobYear");
              }}
            />
          </div>
          <div className={`${s.dobPart} ${s.dobYear}`}>
            <label htmlFor="field-dobYear" className={s.subLabel}>
              Year
            </label>
            <input
              id="field-dobYear"
              className={s.input}
              inputMode="numeric"
              autoComplete="bday-year"
              maxLength={4}
              placeholder="YYYY"
              value={answers.dobYear}
              aria-invalid={errors.dob ? true : undefined}
              onChange={(event) => update({ dobYear: digitsOnly(event.target.value, 4) })}
            />
          </div>
        </div>
      </FieldGroup>

      {minor ? (
        <p className={s.note} role="status">
          Registering someone under 18? That’s fine. Our reception team will confirm guardian details with you.
        </p>
      ) : null}

      <FieldGroup fieldKey="gender" legend="Gender" error={errors.gender}>
        <div className={s.optionGrid2}>
          {GENDERS.map((g, index) => (
            <OptionCard
              key={g.id}
              id={index === 0 ? "gender-first" : undefined}
              type="radio"
              name="gender"
              value={g.id}
              checked={answers.gender === g.id}
              onChange={() => update({ gender: g.id })}
              title={g.label}
              compact
            />
          ))}
        </div>
      </FieldGroup>
    </>
  );
}

export function ContactStep({ answers, update, errors }: StepProps) {
  return (
    <>
      <TextField
        fieldKey="phone"
        label="Mobile number"
        value={answers.phone}
        onValue={(phone) => update({ phone: phoneChars(phone) })}
        error={errors.phone}
        prefix="+91"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="98765 43210"
        enterKeyHint="next"
      />
      <TextField
        fieldKey="altPhone"
        label="Alternate mobile number"
        optional
        value={answers.altPhone}
        onValue={(altPhone) => update({ altPhone: phoneChars(altPhone) })}
        error={errors.altPhone}
        prefix="+91"
        type="tel"
        inputMode="numeric"
        autoComplete="off"
        placeholder="98765 43210"
        enterKeyHint="next"
      />
      <TextField
        fieldKey="email"
        label="Email"
        optional
        value={answers.email}
        onValue={(email) => update({ email })}
        error={errors.email}
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        spellCheck={false}
        placeholder="name@example.com"
        enterKeyHint="next"
      />
    </>
  );
}

export function AddressStep({ answers, update, errors }: StepProps) {
  return (
    <>
      <TextField
        fieldKey="addressLine1"
        label="Address line 1"
        value={answers.addressLine1}
        onValue={(addressLine1) => update({ addressLine1 })}
        error={errors.addressLine1}
        autoComplete="address-line1"
        placeholder="House / flat number, street"
        maxLength={120}
        enterKeyHint="next"
      />
      <TextField
        fieldKey="addressLine2"
        label="Address line 2"
        optional
        value={answers.addressLine2}
        onValue={(addressLine2) => update({ addressLine2 })}
        error={errors.addressLine2}
        autoComplete="address-line2"
        placeholder="Area, landmark"
        maxLength={120}
        enterKeyHint="next"
      />
      <div className={s.twoCol}>
        <TextField
          fieldKey="city"
          label="City"
          value={answers.city}
          onValue={(city) => update({ city })}
          error={errors.city}
          autoComplete="address-level2"
          maxLength={60}
          enterKeyHint="next"
        />
        <TextField
          fieldKey="pin"
          label="PIN code"
          value={answers.pin}
          onValue={(pin) => update({ pin: digitsOnly(pin, 6) })}
          error={errors.pin}
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          placeholder="600001"
          enterKeyHint="next"
        />
      </div>
      <div className={s.field}>
        <label htmlFor="field-state" className={s.label}>
          State <RequirementTag />
        </label>
        <div className={s.inputWrap} data-invalid={errors.state ? "true" : undefined}>
          <select
            id="field-state"
            className={`${s.input} ${s.select}`}
            value={answers.state}
            onChange={(event) => update({ state: event.target.value })}
            autoComplete="address-level1"
            aria-invalid={errors.state ? true : undefined}
            aria-describedby={errors.state ? "state-error" : undefined}
          >
            <option value="">Choose your state</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <FieldError id="state-error" message={errors.state} />
      </div>
    </>
  );
}

export function ConcernsStep({ answers, update, errors }: StepProps) {
  return (
    <FieldGroup fieldKey="concerns" legend="Areas of care" hint="Choose at least one." error={errors.concerns}>
      <div className={s.optionStack}>
        {CONCERNS.map((concern, index) => (
          <OptionCard
            key={concern.id}
            id={index === 0 ? "concern-first" : undefined}
            type="checkbox"
            name="concerns"
            value={concern.id}
            checked={answers.concerns.includes(concern.id)}
            onChange={() => update({ concerns: toggleConcern(answers.concerns, concern.id) })}
            title={concern.label}
            description={concern.description}
          />
        ))}
      </div>
    </FieldGroup>
  );
}

export function SourcesStep({ answers, update, errors }: StepProps) {
  return (
    <>
      <FieldGroup fieldKey="sources" legend="Referred by" hint="Choose at least one." error={errors.sources}>
        <div className={s.optionGrid3}>
          {SOURCES.map((source, index) => (
            <OptionCard
              key={source.id}
              id={index === 0 ? "source-first" : undefined}
              type="checkbox"
              name="sources"
              value={source.id}
              checked={answers.sources.includes(source.id)}
              onChange={() => update({ sources: toggleSource(answers.sources, source.id) })}
              title={source.label}
              icon={<SourceIcon id={source.id} />}
              compact
            />
          ))}
        </div>
      </FieldGroup>
      {answers.sources.includes("other") ? (
        <TextField
          fieldKey="sourceOther"
          label="Please tell us more"
          value={answers.sourceOther}
          onValue={(sourceOther) => update({ sourceOther })}
          error={errors.sourceOther}
          maxLength={80}
          autoComplete="off"
          enterKeyHint="done"
        />
      ) : null}
    </>
  );
}

interface ReviewProps extends StepProps {
  registrationDate: string;
  strokes: Stroke[];
  onStrokes: (strokes: Stroke[], dataUrl: string) => void;
  onEdit: (step: StepId) => void;
  guardianReview: boolean;
}

function SummaryRow({
  label,
  step,
  onEdit,
  children,
}: {
  label: string;
  step: StepId;
  onEdit: (step: StepId) => void;
  children: React.ReactNode;
}) {
  return (
    <li className={s.summaryRow}>
      <span className={s.summaryTerm}>{label}</span>
      <span className={s.summaryDesc}>{children}</span>
      <button type="button" className={s.editButton} onClick={() => onEdit(step)} aria-label={`Edit ${label.toLowerCase()}`}>
        Edit
      </button>
    </li>
  );
}

export function ReviewStep({ answers, update, errors, registrationDate, strokes, onStrokes, onEdit, guardianReview }: ReviewProps) {
  const dob = formatDateIN(dobToISO(answers.dobDay, answers.dobMonth, answers.dobYear));
  const phone = normaliseIndianMobile(answers.phone);
  const alt = normaliseIndianMobile(answers.altPhone);
  const label = (list: ReadonlyArray<{ id: string; label: string }>, id: string) => list.find((o) => o.id === id)?.label ?? id;
  const sources = answers.sources.map((id) =>
    id === "other" && answers.sourceOther.trim() ? `Other (${collapse(answers.sourceOther, 80)})` : label(SOURCES, id),
  );
  const typed = answers.signatureMethod === "typed";

  return (
    <>
      <ul className={s.summary}>
        <li className={s.summaryStatic}>
          <span className={s.summaryTerm}>Date of registration</span>
          <span className={s.summaryDesc}>{registrationDate || "…"}</span>
        </li>
        <SummaryRow label="Name" step="name" onEdit={onEdit}>
          {collapse(answers.fullName, 100)}
        </SummaryRow>
        <SummaryRow label="Date of birth and gender" step="birth" onEdit={onEdit}>
          {dob} · {label(GENDERS, answers.gender)}
        </SummaryRow>
        <SummaryRow label="Contact details" step="contact" onEdit={onEdit}>
          {phone ?? answers.phone}
          {alt ? ` · ${alt}` : ""}
          {answers.email.trim() ? <span className={s.summaryLine}>{answers.email.trim()}</span> : null}
        </SummaryRow>
        <SummaryRow label="Address" step="address" onEdit={onEdit}>
          {collapse(answers.addressLine1, 120)}
          {answers.addressLine2.trim() ? `, ${collapse(answers.addressLine2, 120)}` : ""}
          <span className={s.summaryLine}>
            {collapse(answers.city, 60)}, {answers.state} {answers.pin}
          </span>
        </SummaryRow>
        <SummaryRow label="Care" step="concerns" onEdit={onEdit}>
          {answers.concerns.map((id) => label(CONCERNS, id)).join(", ")}
        </SummaryRow>
        <SummaryRow label="Referred by" step="sources" onEdit={onEdit}>
          {sources.join(", ")}
        </SummaryRow>
      </ul>

      {guardianReview ? (
        <p className={s.note} role="status">
          Our reception team will confirm guardian details with you before your visit.
        </p>
      ) : null}

      <div className={s.privacyBox}>
        <p className={s.privacyTitle}>How we look after your details</p>
        <p>{PRIVACY_SUMMARY}</p>
        <label className={s.consent} data-invalid={errors.consent ? "true" : undefined}>
          <input
            id="field-consent"
            type="checkbox"
            checked={answers.consent}
            onChange={(event) => update({ consent: event.target.checked })}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I’ve checked my details and read the{" "}
            <Link href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Notice<span className="sr-only"> (opens in a new tab)</span>
            </Link>
            . <RequirementTag />
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <FieldGroup fieldKey="signature" legend="Signature" error={errors.signature}>
        <div className={s.segmented} role="radiogroup" aria-label="Signature method">
          <label>
            <input
              type="radio"
              name="signatureMethod"
              value="drawn"
              checked={!typed}
              onChange={() => update({ signatureMethod: "drawn" })}
            />
            <span>Draw signature</span>
          </label>
          <label>
            <input
              type="radio"
              name="signatureMethod"
              value="typed"
              checked={typed}
              onChange={() => update({ signatureMethod: "typed" })}
            />
            <span>Type your name</span>
          </label>
        </div>
        {typed ? (
          <>
            <TextField
              fieldKey="signatureTyped"
              label="Type your full name"
              value={answers.signatureTyped}
              onValue={(signatureTyped) => update({ signatureTyped })}
              autoComplete="off"
              maxLength={100}
              hint="Typed names are reviewed by the clinic team."
            />
          </>
        ) : (
          <SignaturePad
            strokes={strokes}
            invalid={Boolean(errors.signature)}
            onChange={(next, signatureData) => {
              onStrokes(next, signatureData);
            }}
          />
        )}
      </FieldGroup>
    </>
  );
}
