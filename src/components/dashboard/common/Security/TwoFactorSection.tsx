"use client";

import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { Shield } from "lucide-react";
import { FC } from "react";

interface TwoFactorSectionProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => Promise<void>;
  isLoading?: boolean;
}

const TwoFactorSection: FC<TwoFactorSectionProps> = ({
  enabled,
  onToggle,
  isLoading = false,
}) => {
  return (
    <section className='bg-white mb-8 rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex flex-col'>
      <header className='flex items-start gap-4 p-6 border-b border-[#f5ebd8]'>
        <div className='bg-indigo-50 p-3 rounded-lg flex-shrink-0'>
          <Shield className='w-6 h-6 text-indigo-500' />
        </div>
        <div>
          <h2 className='text-[16px] font-bold text-foreground'>
            Two-Factor Authentication
          </h2>
          <p className='text-sm text-[#4B5563] mt-1'>
            Add an extra layer of security to your account.
          </p>
        </div>
      </header>

      <div className='flex items-center justify-between p-6'>
        <div className='pr-4'>
          <h3 className='text-sm font-semibold font-semibold text-[var(--color-foreground)]'>
            Enable Two-Factor Authentication
          </h3>
          <p className='text-[13px] text-[#6B6B6B] mt-1'>
            Receive a one-time passcode via email or SMS to verify your identity
            on login.
          </p>
        </div>

        <ToggleSwitch
          checked={enabled}
          onChange={onToggle}
          id='toggle_2fa'
          name='toggle_2fa'
          disabled={isLoading}
        />
      </div>
    </section>
  );
};

export default TwoFactorSection;
