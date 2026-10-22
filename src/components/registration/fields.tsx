import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { Check } from "lucide-react";
import s from "./registration.module.css";

export function RequirementTag({ optional }: { optional?: boolean }) {
  return <span className={optional ? s.tagOptional : s.tagRequired}>{optional ? "Optional" : "Required"}</span>;
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={s.error}>
      <span className="sr-only">Error: </span>
      {message}
    </p>
  );
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "onChange" | "value"> {
  fieldKey: string;
  label: string;
  value: string;
  onValue: (value: string) => void;
  optional?: boolean;
  hint?: string;
  error?: string;
  prefix?: string;
}

export function TextField({
  fieldKey,
  label,
  value,
  onValue,
  optional,
  hint,
  error,
  prefix,
  className,
  ...input
}: TextFieldProps) {
  const base = useId();
  const hintId = `${base}-hint`;
  const errorId = `${base}-error`;
  const describedBy = [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ") || undefined;

  return (
    <div className={s.field}>
      <label htmlFor={`field-${fieldKey}`} className={s.label}>
        {label} <RequirementTag optional={optional} />
      </label>
      {hint ? (
        <p id={hintId} className={s.hint}>
          {hint}
        </p>
      ) : null}
      <div className={s.inputWrap} data-invalid={error ? "true" : undefined}>
        {prefix ? (
          <span className={s.inputPrefix} aria-hidden="true">
            {prefix}
          </span>
        ) : null}
        <input
          {...input}
          id={`field-${fieldKey}`}
          className={`${s.input} ${className ?? ""}`}
          value={value}
          onChange={(event) => onValue(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

interface OptionCardProps {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  compact?: boolean;
  id?: string;
}

/** A large, fully clickable choice. The native input stays in the tab order. */
export function OptionCard({ type, name, value, checked, onChange, title, description, icon, compact, id }: OptionCardProps) {
  return (
    <label className={`${s.option} ${compact ? s.optionCompact : ""}`}>
      <input id={id} className={s.optionInput} type={type} name={name} value={value} checked={checked} onChange={onChange} />
      <span className={s.optionBox} aria-hidden="true">
        {type === "checkbox" || checked ? <Check size={14} strokeWidth={3} /> : null}
      </span>
      {icon ? <span className={s.optionIcon}>{icon}</span> : null}
      <span className={s.optionText}>
        <span className={s.optionTitle}>{title}</span>
        {description ? <span className={s.optionDesc}>{description}</span> : null}
      </span>
    </label>
  );
}

export function FieldGroup({
  fieldKey,
  legend,
  hint,
  optional,
  error,
  children,
}: {
  fieldKey: string;
  legend: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  const base = useId();
  const hintId = `${base}-hint`;
  const errorId = `${base}-error`;
  const describedBy = [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset id={`field-${fieldKey}`} className={s.group} aria-describedby={describedBy}>
      <legend className={s.label}>
        {legend} <RequirementTag optional={optional} />
      </legend>
      {hint ? (
        <p id={hintId} className={s.hint}>
          {hint}
        </p>
      ) : null}
      {children}
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
