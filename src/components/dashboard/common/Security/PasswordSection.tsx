"use client";

import { FC, useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import type { PasswordFormData } from "@/types/settings";
import { validatePassword } from "@/lib/validation";

interface PasswordSectionProps {
  onSubmit: (data: PasswordFormData) => Promise<void>;
  isLoading?: boolean;
}

const PasswordInput: FC<{
  id: string;
  label: string;
  value: string;
  placeholder: string;
  show: boolean;
  error?: string;
  onToggleVisibility: () => void;
  onChange: (value: string) => void;
}> = ({
  id,
  label,
  value,
  placeholder,
  show,
  error,
  onToggleVisibility,
  onChange,
}) => (
  <div className='flex flex-col gap-2'>
    <label
      htmlFor={id}
      className='text-xs font-bold text-(--color-foreground) uppercase tracking-wider opacity-70'>
      {label}
    </label>
    <div className='relative'>
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-[#fafaf8] border rounded-lg px-4 py-3 text-sm transition-colors pr-10
          focus:outline-none focus:border-[var(--color-primary)] focus:bg-white
          ${error ? "border-[var(--color-error)]" : "border-[var(--color-border)]"}
          ${!show && value ? "tracking-[0.25em] text-[16px] sm:text-[18px] font-bold text-gray-800" : ""}
        `}
      />
      <button
        type='button'
        onClick={onToggleVisibility}
        className='absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-muted)] hover:text-[var(--color-foreground)]'>
        {show ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
      </button>
    </div>
    {error && <p className='text-xs text-[var(--color-error)]'>{error}</p>}
  </div>
);

const PasswordSection: FC<PasswordSectionProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<Partial<PasswordFormData>>({});

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: keyof PasswordFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<PasswordFormData> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      newErrors.newPassword = passwordError;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await onSubmit(formData);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password update failed:", error);
    }
  };

  return (
    <section className='bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex flex-col overflow-hidden'>
      <header className='flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border-b border-[#f5ebd8]'>
        <div className='bg-orange-50 p-2.5 sm:p-3 rounded-lg shrink-0'>
          <Lock className='w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary)]' />
        </div>
        <div>
          <h2 className='text-sm sm:text-[16px] font-bold text-foreground'>
            Password Management
          </h2>
          <p className='text-xs sm:text-sm text-[#4B5563] mt-0.5 sm:mt-1'>
            Keep your account secure with a strong password.
          </p>
        </div>
      </header>

      <div className='flex flex-col gap-4 sm:gap-5 p-4 sm:p-6'>
        <PasswordInput
          id='current-password'
          label='Current Password'
          value={formData.currentPassword}
          placeholder='Enter current password'
          show={showPasswords.current}
          error={errors.currentPassword}
          onToggleVisibility={() => togglePasswordVisibility("current")}
          onChange={(value) => handleChange("currentPassword", value)}
        />

        <PasswordInput
          id='new-password'
          label='New Password'
          value={formData.newPassword}
          placeholder='Min. 8 chars (uppercase, lowercase & number)'
          show={showPasswords.new}
          error={errors.newPassword}
          onToggleVisibility={() => togglePasswordVisibility("new")}
          onChange={(value) => handleChange("newPassword", value)}
        />

        <PasswordInput
          id='confirm-password'
          label='Confirm New Password'
          value={formData.confirmPassword}
          placeholder='Re-enter new password'
          show={showPasswords.confirm}
          error={errors.confirmPassword}
          onToggleVisibility={() => togglePasswordVisibility("confirm")}
          onChange={(value) => handleChange("confirmPassword", value)}
        />
      </div>

      <footer className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-t border-[#f5ebd8] gap-3 sm:gap-4'>
        <p className='text-xs text-[var(--color-text-secondary)]'>
          Use 8+ characters with uppercase & lowercase letters and at least one number.
        </p>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-2.5 px-6 rounded-lg text-xs sm:text-sm transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0'>
          {isLoading ? "SAVING..." : "SAVE PASSWORD"}
        </button>
      </footer>
    </section>
  );
};

export default PasswordSection;
