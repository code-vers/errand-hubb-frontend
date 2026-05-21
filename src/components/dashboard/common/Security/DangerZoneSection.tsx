"use client";

import { Trash2 } from "lucide-react";
import { FC, useState } from "react";

interface DangerZoneSectionProps {
  onDeleteAccount: () => Promise<void>;
  isLoading?: boolean;
}

const DangerZoneSection: FC<DangerZoneSectionProps> = ({
  onDeleteAccount,
  isLoading = false,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    try {
      await onDeleteAccount();
    } catch (error) {
      console.error("Account deletion failed:", error);
      setShowConfirmation(false);
    }
  };

  return (
    <section className='bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex flex-col'>
      <header className='flex items-start gap-4 p-6 border-b border-[#f5ebd8]'>
        <div className='bg-red-50 p-3 rounded-lg shrink-0'>
          <Trash2 className='w-6 h-6 text-[var(--color-error)]' />
        </div>
        <div>
          <h2 className='text-[16px] font-semibold text-[var(--color-error)]'>
            Danger Zone
          </h2>
          <p className='text-[14px] text-[#4B5563] mt-1'>
            Irreversible actions — proceed with caution.
          </p>
        </div>
      </header>

      <div className='p-6'>
        <h3 className='text-[15px] font-bold text-foreground'>
          Delete Account
        </h3>
        <p className='text-xs text-[var(--color-text-secondary)] mt-1 mb-4'>
          {showConfirmation
            ? "Are you sure? This action cannot be undone. All your data will be permanently removed."
            : "Permanently remove your account and all associated data. This cannot be undone."}
        </p>

        <div className='flex gap-3'>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors w-full sm:w-auto
              ${
                showConfirmation
                  ? "bg-[var(--color-error)] hover:bg-red-700 text-white"
                  : "bg-[var(--color-error)] hover:bg-red-600 text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}>
            {isLoading
              ? "DELETING..."
              : showConfirmation
                ? "CONFIRM DELETE"
                : "DELETE ACCOUNT"}
          </button>

          {showConfirmation && (
            <button
              onClick={() => setShowConfirmation(false)}
              className='bg-[var(--color-surface-dim)] hover:bg-[var(--color-hover)] text-[var(--color-foreground)] font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors'>
              CANCEL
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DangerZoneSection;
