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
    <section className='bg-white mb-6 sm:mb-8 rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex flex-col overflow-hidden'>
      <header className='flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border-b border-[#f5ebd8]'>
        <div className='bg-indigo-50 p-2.5 sm:p-3 rounded-lg shrink-0'>
          <Shield className='w-5 h-5 sm:w-6 sm:h-6 text-indigo-500' />
        </div>
        <div>
          <h2 className='text-sm sm:text-[16px] font-bold text-foreground'>
            Two-Factor Authentication
          </h2>
          <p className='text-xs sm:text-sm text-[#4B5563] mt-0.5 sm:mt-1'>
            Add an extra layer of security to your account.
          </p>
        </div>
      </header>

      <div className='flex items-center justify-between p-4 sm:p-6 gap-3'>
        <div className='pr-2 sm:pr-4 min-w-0 flex-1'>
          <h3 className='text-xs sm:text-sm font-semibold text-[var(--color-foreground)]'>
            Enable Two-Factor Authentication
          </h3>
          <p className='text-xs sm:text-[13px] text-[#6B6B6B] mt-1 leading-relaxed'>
            Receive a one-time passcode via email or SMS to verify your identity
            on login.
          </p>
        </div>

        <div className='shrink-0'>
          <ToggleSwitch
            checked={enabled}
            onChange={onToggle}
            id='toggle_2fa'
            name='toggle_2fa'
            disabled={isLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default TwoFactorSection;
