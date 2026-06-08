'use client';

import React, { useState } from 'react';
import { authService } from '@/services/auth.service';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await authService.forgotPassword(email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-surface-dim)] px-4">
      <div className="w-full max-w-md bg-[var(--color-background)] p-8 rounded-xl border border-[var(--color-border)] shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-secondary)]">Forgot Password</h1>
          <p className="text-[var(--color-muted)] mt-2">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wide mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-colors bg-[var(--color-background)]"
            />
          </div>

          {message && (
            <div className="text-green-600 text-sm text-center font-medium bg-green-50 p-3 rounded-md border border-green-100">
              {message}
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-md border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors uppercase tracking-wide text-sm disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
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
