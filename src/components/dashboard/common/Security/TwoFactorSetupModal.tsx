"use client";

import { FC, useState, useEffect } from "react";
import { X, Shield, Copy, CheckCircle2, QrCode } from "lucide-react";
import Image from "next/image";

interface TwoFactorSetupModalProps {
  qrCode: string;
  secret: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  isVerifying: boolean;
}

const TwoFactorSetupModal: FC<TwoFactorSetupModalProps> = ({
  qrCode,
  secret,
  onClose,
  onVerify,
  isVerifying,
}) => {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

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

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    }
  };

  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role='dialog'
      aria-modal='true'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col'>
        {/* Modal Header */}
        <div className='bg-[#f5ebd8] px-6 py-5 flex items-center justify-between'>
          <h2 className='text-[#1A1A1A] font-bold text-lg'>
            Two-Factor Authentication Setup
          </h2>
          <button
            aria-label='Close modal'
            onClick={onClose}
            className='bg-white/50 hover:bg-white text-orange-500 rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary'>
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-6 flex flex-col gap-6 overflow-y-auto max-h-[75vh]'>
          <div className='flex flex-col items-center text-center gap-2'>
            <div className='bg-indigo-50 p-3 rounded-xl'>
              <QrCode className='w-8 h-8 text-indigo-600' />
            </div>
            <p className='text-sm text-[#4B5563] px-4'>
              Enhance your account security by scanning this QR code with your authenticator app.
            </p>
          </div>

          <div className='flex flex-col items-center gap-6'>
            <div className='bg-white p-4 border border-[#f5ebd8] rounded-2xl shadow-sm'>
              {qrCode && (
                <Image 
                  src={qrCode} 
                  alt="2FA QR Code" 
                  width={200} 
                  height={200}
                  className="mx-auto"
                />
              )}
            </div>

            <div className='w-full'>
              <label className='text-xs font-bold text-foreground uppercase tracking-wider mb-2 block'>
                Manual Entry Key
              </label>
              <div className='flex items-center gap-2 bg-[#f9f9f9] border border-[#f5ebd8] rounded-xl p-3'>
                <code className='flex-1 text-xs font-mono font-bold text-indigo-600 break-all'>
                  {secret}
                </code>
                <button 
                  onClick={handleCopySecret}
                  className='p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-indigo-500 shrink-0 border border-transparent hover:border-[#f5ebd8]'
                  title="Copy Secret">
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className='w-4 h-4' />}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
              <div>
                <label className='text-xs font-bold text-foreground uppercase tracking-wider mb-2 block'>
                  Enter 6-Digit Verification Code
                </label>
                <input
                  type='text'
                  maxLength={6}
                  placeholder='000 000'
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className='w-full px-4 py-4 bg-white border border-[#f5ebd8] rounded-xl text-center text-2xl font-bold tracking-[0.2em] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
                />
              </div>

              <button
                type='submit'
                disabled={isVerifying || code.length !== 6}
                className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-all shadow-sm tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase'>
                {isVerifying ? "Verifying..." : "Enable 2FA Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorSetupModal;
