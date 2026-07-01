"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FieldErrorIcon } from "@/components/FieldErrorIcon";

type Variant = "pill" | "box" | "mobile";

interface Props {
  value: string;
  onChange: (val: string) => void;
  variant?: Variant;
  placeholder?: string;
  id?: string;
  error?: string;
  onBlur?: () => void;
}

export function PhoneInputField({
  value,
  onChange,
  variant = "pill",
  placeholder = "000 000 0000",
  id,
  error,
  onBlur,
}: Props) {
  return (
    <div className={`phone-field phone-field--${variant}${error ? " phone-field--error" : ""} relative`}>
      <PhoneInput
        id={id}
        defaultCountry="US"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value={(value || undefined) as any}
        onChange={(val) => onChange(val ?? "")}
        onBlur={onBlur}
        international
        limitMaxLength
        countryCallingCodeEditable={false}
        placeholder={placeholder}
      />
      {error && (
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-10">
          <FieldErrorIcon message={error} />
        </div>
      )}
    </div>
  );
}
