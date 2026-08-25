'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import Link from 'next/link';
import { useFormValidation } from "@/hooks/useFormValidation";
import { validatePassword } from "@/lib/validation";
import { Eye, EyeOff } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { errors, touched, handleBlur, validateForm } = useFormValidation({
    newPassword: (v) => validatePassword(v),
  });

  useEffect(() => {
    const t = searchParams.get('token');
    if (t) {
      setToken(t);
    } else {
      setError('This password reset link has already been used or has expired. Please request a new reset link.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm({ newPassword })) return;
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await authService.resetPassword({ token, newPassword });
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      const serverMessage = err?.message || err?.response?.data?.message;
      if (serverMessage && (serverMessage.includes('token') || serverMessage.includes('expired') || serverMessage.includes('used') || serverMessage.includes('Invalid'))) {
        setError('This password reset link has already been used or has expired. Please request a new reset link.');
      } else {
        setError(serverMessage || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-surface-dim)] px-4">
      <div className="w-full max-w-md bg-[var(--color-background)] p-8 rounded-xl border border-[var(--color-border)] shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-secondary)]">Reset Password</h1>
          <p className="text-[var(--color-muted)] mt-2">
            Enter your new password below to regain access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wide mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  required
                  maxLength={128}
                  placeholder="Minimum 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={(e) => handleBlur('newPassword', e.target.value)}
                  aria-invalid={touched.newPassword && !!errors.newPassword}
                  aria-describedby={touched.newPassword && errors.newPassword ? "newPassword-error" : undefined}
                  className={`w-full px-3 py-2 pr-10 border rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 transition-colors bg-[var(--color-background)] ${
                    touched.newPassword && errors.newPassword 
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                      : "border-[var(--color-border)] focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {touched.newPassword && errors.newPassword && (
                <p id="newPassword-error" className="text-red-500 text-xs mt-1 font-medium">{errors.newPassword}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wide mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  maxLength={128}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-[var(--color-border)] rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-colors bg-[var(--color-background)]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {message && (
            <div className="text-green-600 text-sm text-center font-medium bg-green-50 p-3 rounded-md border border-green-100">
              {message}
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm text-center font-medium bg-red-50 p-4 rounded-md border border-red-100 space-y-2">
              <p>{error}</p>
              {(error.includes('expired') || error.includes('used') || error.includes('token') || error.includes('Invalid')) && (
                <div className="pt-1">
                  <Link
                    href="/forgot-password"
                    className="inline-block text-xs font-bold text-[var(--color-primary)] hover:underline uppercase tracking-wide"
                  >
                    Request a new reset link
                  </Link>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (!!error && !token)}
            className="w-full py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors uppercase tracking-wide text-sm disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="text-sm font-bold text-[var(--color-secondary)] hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-[var(--color-secondary)]">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
