// components/ui/ToggleSwitch.tsx
import { FC } from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  name: string;
  disabled?: boolean;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  id,
  name,
  disabled = false,
}) => {
  return (
    <div className='relative inline-block w-12 align-middle select-none transition duration-200 ease-in flex-shrink-0'>
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer opacity-0'
      />
      <label
        htmlFor={id}
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer flex items-center ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${checked ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"}`}>
        <span className='toggle-checkbox-btn block' />
      </label>
    </div>
  );
};
