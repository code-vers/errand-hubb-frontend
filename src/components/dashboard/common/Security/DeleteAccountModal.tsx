"use client";

import { FC, useState, useEffect } from "react";
import { X, AlertTriangle, ShieldAlert, KeyRound, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { profileService } from "@/services/profile.service";
import { toast } from "sonner";

interface DeleteAccountModalProps {
  onClose: () => void;
  onConfirm: (password: string, code: string) => Promise<void>;
  isDeleting: boolean;
}

const DeleteAccountModal: FC<DeleteAccountModalProps> = ({
  onClose,
  onConfirm,
  isDeleting,
}) => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");
  const [isRequestingCode, setIsRequestingCode] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleRequestCode = async () => {
    setIsRequestingCode(true);
    setError("");
    try {
      await profileService.requestDeleteAccount();
      toast.success("Verification code sent to your email!");
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send verification code");
      toast.error("Failed to send code");
    } finally {
      setIsRequestingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmText !== "DELETE") {
      setError("Please type DELETE to confirm");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (code.length !== 6) {
      setError("Enter the 6-digit code from your email");
      return;
    }
    setError("");
    await onConfirm(password, code);
  };

  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role='dialog'
      aria-modal='true'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-red-100'>
        {/* Modal Header */}
        <div className='bg-red-50 px-6 py-5 flex items-center justify-between border-b border-red-100'>
          <div className='flex items-center gap-3 text-red-600'>
            <ShieldAlert className='h-6 w-6' />
            <h2 className='font-bold text-lg uppercase tracking-tight'>
              Security Check
            </h2>
          </div>
          <button
            aria-label='Close modal'
            onClick={onClose}
            className='bg-white/50 hover:bg-white text-red-500 rounded-full p-1.5 transition-colors'>
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-6 flex flex-col gap-6'>
          {step === 1 ? (
            <>
              <div className='bg-red-50/50 border border-red-100 p-4 rounded-xl flex gap-3 items-start'>
                <AlertTriangle className='h-5 w-5 text-red-600 shrink-0 mt-0.5' />
                <div className='text-sm text-red-800 leading-relaxed'>
                  <p className='font-bold mb-1'>Important Security Step</p>
                  <p>To protect your account, we require email verification before permanent deletion. This ensures that you are the one performing this action.</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleRequestCode}
                  disabled={isRequestingCode}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-3 uppercase tracking-wider text-sm disabled:opacity-50">
                  {isRequestingCode ? "SENDING CODE..." : (
                    <>
                      <Mail size={18} />
                      Send Verification Code
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors">
                  Cancel and Go Back
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='bg-green-50 border border-green-100 p-4 rounded-xl flex gap-3 items-center text-green-700'>
                <CheckCircle2 className='h-5 w-5' />
                <p className='text-xs font-bold uppercase tracking-wider'>Check your email for the code</p>
              </div>

              <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2'>
                    <Mail size={14} className='text-red-500' /> Email Verification Code
                  </label>
                  <input
                    type='text'
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    placeholder='000 000'
                    className='w-full px-4 py-3 bg-gray-50 border border-red-100 rounded-xl text-center text-xl font-bold tracking-[0.3em] focus:outline-none focus:ring-1 focus:ring-red-500 transition-all'
                    required
                  />
                </div>

                <div className='flex flex-col gap-1.5'>
                  <label className='text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2'>
                    <KeyRound size={14} className='text-red-500' /> Account Password
                  </label>
                  <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Confirm your password'
                    className='w-full px-4 py-3 bg-gray-50 border border-red-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-all'
                    required
                  />
                </div>

                <div className='flex flex-col gap-1.5'>
                  <label className='text-[11px] font-bold text-gray-500 uppercase tracking-wider'>
                    Type <span className='text-red-600 font-black px-1'>DELETE</span> to confirm
                  </label>
                  <input
                    type='text'
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder='DELETE'
                    className='w-full px-4 py-3 bg-gray-50 border border-red-100 rounded-xl text-sm font-bold text-center tracking-widest focus:outline-none focus:ring-1 focus:ring-red-500 transition-all'
                    required
                  />
                </div>

                {error && (
                  <p className='text-xs font-bold text-red-600 text-center bg-red-50 py-2 rounded-lg'>
                    {error}
                  </p>
                )}

                <div className='flex gap-3 mt-2'>
                  <button
                    type='button'
                    onClick={() => setStep(1)}
                    className='flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-colors text-xs uppercase tracking-widest'>
                    Back
                  </button>
                  <button
                    type='submit'
                    disabled={isDeleting || confirmText !== "DELETE" || !password || code.length !== 6}
                    className='flex-[2] bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-red-100 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'>
                    {isDeleting ? "PURGING..." : "FINAL DELETE"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
