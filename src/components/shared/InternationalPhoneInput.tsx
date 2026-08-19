"use client";

import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface InternationalPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  required?: boolean;
  onBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
  hasError?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

export const InternationalPhoneInput: React.FC<InternationalPhoneInputProps> = ({
  value,
  onChange,
  name = "phone",
  required = false,
  onBlur,
  id = "phone",
  className = "",
  hasError = false,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}) => {
  const formattedValue = value ? value.replace(/[^\d+]/g, '') : value;

  return (
    <div className="relative w-full">
      <PhoneInput
        id={id}
        international
        defaultCountry="US"
        value={formattedValue}
        onChange={(val) => onChange(val || "")}
        onBlur={onBlur}
        name={name}
        required={required}
        style={{
          "--PhoneInputCountryFlag-height": "1.2em",
          "--PhoneInputCountryFlag-borderColor": "transparent",
        } as React.CSSProperties}
        className={`w-full px-4 py-3 border rounded-xl text-sm text-[var(--color-foreground)] transition-all bg-[var(--color-background)] focus-within:ring-2 flex items-center ${
          hasError
            ? "border-red-500 focus-within:ring-red-500/20 focus-within:border-red-500"
            : "border-[var(--color-border)] focus-within:ring-[var(--color-primary)]/20 focus-within:border-[var(--color-primary)]"
        } ${className}`}
        numberInputProps={{
          className: "flex-1 bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm placeholder-[var(--color-text-placeholder)]",
          onBlur: onBlur,
          id: id,
          "aria-invalid": ariaInvalid,
          "aria-describedby": ariaDescribedBy,
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .PhoneInputCountry {
          margin-right: 12px;
          padding-right: 12px;
          border-right: 1px solid var(--color-border);
        }
        .PhoneInputCountrySelect {
          outline: none;
        }
      `}} />
    </div>
  );
};
