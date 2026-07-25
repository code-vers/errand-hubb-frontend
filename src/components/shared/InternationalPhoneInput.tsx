"use client";

import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface InternationalPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  required?: boolean;
}

export const InternationalPhoneInput: React.FC<InternationalPhoneInputProps> = ({
  value,
  onChange,
  name = "phone",
  required = false,
}) => {
  const formattedValue = value ? value.replace(/[^\d+]/g, '') : value;

  return (
    <div className="relative">
      <PhoneInput
        international
        defaultCountry="US"
        value={formattedValue}
        onChange={(val) => onChange(val || "")}
        name={name}
        required={required}
        style={{
          "--PhoneInputCountryFlag-height": "1.2em",
          "--PhoneInputCountryFlag-borderColor": "transparent",
        } as React.CSSProperties}
        className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-foreground)] transition-all bg-[var(--color-background)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 focus-within:border-[var(--color-primary)] flex items-center"
        numberInputProps={{
          className: "flex-1 bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm placeholder-[var(--color-text-placeholder)]",
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
