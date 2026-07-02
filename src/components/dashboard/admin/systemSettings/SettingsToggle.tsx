import React from "react";
import { SettingsToggleProps } from "@/types/settings";

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  id,
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className='flex items-center justify-between py-4 border-b border-border last:border-0'>
      <div className='flex flex-col'>
        <label
          htmlFor={id}
          className='text-sm font-semibold text-foreground cursor-pointer'>
          {label}
        </label>
        {description && (
          <span id={`${id}-description`} className='text-xs text-muted mt-0.5'>
            {description}
          </span>
        )}
      </div>

      <div className='relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in'>
        <input
          type='checkbox'
          name={id}
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer disabled:cursor-not-allowed'
        />
        <label
          htmlFor={id}
          className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'>
          <span className='toggle-checkbox-btn'></span>
        </label>
      </div>
    </div>
  );
};

export default SettingsToggle;
