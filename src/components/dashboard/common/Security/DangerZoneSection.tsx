"use client";

import { Trash2 } from "lucide-react";
import { FC, useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";

interface DangerZoneSectionProps {
  onDeleteAccount: (password: string, code: string) => Promise<void>;
  isLoading?: boolean;
}

const DangerZoneSection: FC<DangerZoneSectionProps> = ({
  onDeleteAccount,
  isLoading = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className='bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex flex-col overflow-hidden'>
      <header className='flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border-b border-[#f5ebd8]'>
        <div className='bg-red-50 p-2.5 sm:p-3 rounded-lg shrink-0'>
          <Trash2 className='w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-error)]' />
        </div>
        <div>
          <h2 className='text-sm sm:text-[16px] font-semibold text-[var(--color-error)]'>
            Danger Zone
          </h2>
          <p className='text-xs sm:text-[14px] text-[#4B5563] mt-0.5 sm:mt-1'>
            Irreversible actions — proceed with caution.
          </p>
        </div>
      </header>

      <div className='p-4 sm:p-6'>
        <h3 className='text-sm sm:text-[15px] font-bold text-foreground'>
          Delete Account
        </h3>
        <p className='text-xs text-[var(--color-text-secondary)] mt-1 mb-4 leading-relaxed'>
          Permanently remove your account and all associated data. This action cannot be reversed, and all your records will be purged from our systems.
        </p>

        <div className='flex gap-3'>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={isLoading}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 sm:px-6 rounded-lg text-xs sm:text-sm transition-all shadow-sm hover:shadow-md uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            {isLoading ? "PURGING DATA..." : "PERMANENTLY DELETE ACCOUNT"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <DeleteAccountModal 
          onClose={() => setIsModalOpen(false)}
          onConfirm={async (password, code) => {
            await onDeleteAccount(password, code);
            setIsModalOpen(false);
          }}
          isDeleting={isLoading}
        />
      )}
    </section>
  );
};

export default DangerZoneSection;
