import React from "react";
import { SettingsFieldProps } from "@/types/settings";

const SettingsField: React.FC<SettingsFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  required = false,
  rows = 3,
}) => {
  const inputClasses = `
    block w-full px-4 py-2.5 bg-gray-50 border rounded-md text-sm
    focus:ring-2 focus:ring-primary focus:border-primary
    transition-colors duration-200
    ${
      error
        ? "border-error text-error placeholder-error/50"
        : "border-border text-foreground placeholder-muted"
    }
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-medium text-foreground mb-1'>
        {label}
        {required && (
          <span className='text-error ml-1' aria-hidden='true'>
            *
          </span>
        )}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}

      {error && (
        <p id={`${id}-error`} className='mt-1 text-xs text-error' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
};

export default SettingsField;
