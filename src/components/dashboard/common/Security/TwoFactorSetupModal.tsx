"use client";

import { FC, useState, useEffect } from "react";
import { X, Shield, Copy, CheckCircle2 } from "lucide-react";
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
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col'>
        <div className='bg-[#f5ebd8] px-6 py-4 flex items-center justify-between'>
          <h2 className='text-[#1A1A1A] font-bold text-lg uppercase tracking-tight flex items-center gap-2'>
            <Shield className='w-5 h-5 text-indigo-600' />
            Setup 2FA
          </h2>
          <button
            onClick={onClose}
            className='bg-white/50 hover:bg-white text-orange-500 rounded-full p-1.5 transition-colors'>
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='p-6 overflow-y-auto max-h-[80vh] flex flex-col items-center text-center'>
          <p className='text-sm text-gray-600 mb-6'>
            Scan this QR code with your authenticator app (like Google Authenticator or Authy) to enable Two-Factor Authentication.
          </p>

          <div className='bg-white p-4 border-2 border-dashed border-indigo-100 rounded-xl mb-6'>
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

          <div className='w-full bg-gray-50 p-3 rounded-lg flex items-center justify-between mb-8 border border-gray-100'>
            <div className='text-left'>
              <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5'>
                Secret Key
              </span>
              <code className='text-xs font-mono text-indigo-600 font-bold tracking-wider'>
                {secret}
              </code>
            </div>
            <button 
              onClick={handleCopySecret}
              className='p-2 hover:bg-white rounded-md transition-colors text-indigo-500'
              title="Copy Secret">
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className='w-4 h-4' />}
            </button>
          </div>

          <form onSubmit={handleSubmit} className='w-full'>
            <label className='text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 text-left'>
              Enter Verification Code
            </label>
            <input
              type='text'
              maxLength={6}
              placeholder='000000'
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className='w-full px-4 py-3 bg-white border-2 border-indigo-50 rounded-xl text-center text-2xl font-bold tracking-[0.5em] focus:outline-none focus:border-indigo-500 transition-all mb-6'
            />
            
            <div className='flex gap-3'>
              <button
                type='button'
                onClick={onClose}
                className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors text-sm uppercase'>
                Cancel
              </button>
              <button
                type='submit'
                disabled={isVerifying || code.length !== 6}
                className='flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200 text-sm uppercase disabled:opacity-50'>
                {isVerifying ? "Verifying..." : "Verify & Enable"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorSetupModal;
