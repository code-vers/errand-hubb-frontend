'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [mfaData, setMfaData] = useState({
    required: false,
    userId: '',
    code: '',
  });

  const { login: authLogin } = useAuth();
  const queryClient = useQueryClient();

  // Login Mutation
  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: (credentials: any) => authService.login(credentials),
    onSuccess: (response: any) => {
      if (response.data.mfaRequired) {
        setMfaData({
          required: true,
          userId: response.data.userId,
          code: '',
        });
        toast.info('Two-Factor Authentication required');
      } else {
        const userData = response.data.user;
        toast.success('Login successful!');
        queryClient.setQueryData(['user'], userData);
        authLogin(userData);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  // MFA Verify Mutation
  const { mutate: verifyMFA, isPending: isVerifyPending } = useMutation({
    mutationFn: (data: { userId: string; code: string }) => authService.verify2FALogin(data),
    onSuccess: (response: any) => {
      const userData = response.data.user;
      toast.success('Authentication successful!');
      queryClient.setQueryData(['user'], userData);
      authLogin(userData);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Invalid verification code');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMfaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMfaData({ ...mfaData, code: e.target.value.replace(/\D/g, '') });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaData.code.length === 6) {
      verifyMFA({ userId: mfaData.userId, code: mfaData.code });
    }
  };

  if (mfaData.required) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--color-surface-dim)] px-4">
        <div className="w-full max-w-md bg-[var(--color-background)] p-8 rounded-xl border border-[var(--color-border)] shadow-lg">
          <button 
            onClick={() => setMfaData({ ...mfaData, required: false })}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors mb-6 uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> Back to Login
          </button>

          <div className="text-center mb-8">
            <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-secondary)]">Verification Code</h1>
            <p className="text-[var(--color-muted)] mt-2">Enter the 6-digit code from your authenticator app.</p>
          </div>

          <form onSubmit={handleMfaSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                maxLength={6}
                autoFocus
                placeholder="000000"
                value={mfaData.code}
                onChange={handleMfaChange}
                className="w-full px-4 py-4 border-2 border-[var(--color-border)] rounded-xl text-center text-3xl font-bold tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-[var(--color-background)]"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifyPending || mfaData.code.length !== 6}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors uppercase tracking-widest text-sm shadow-lg shadow-indigo-100 disabled:opacity-50"
            >
              {isVerifyPending ? 'Verifying...' : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-surface-dim)] px-4">
      <div className="w-full max-w-md bg-[var(--color-background)] p-8 rounded-xl border border-[var(--color-border)] shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-secondary)]">Login</h1>
          <p className="text-[var(--color-muted)] mt-2">Welcome back to Errand Hubb</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wide mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-colors bg-[var(--color-background)]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wide">
                Password
              </label>
              <Link 
                href="/forgot-password" 
                className="text-xs font-bold text-[var(--color-primary)] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-colors bg-[var(--color-background)]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoginPending}
            className="w-full py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors uppercase tracking-wide text-sm disabled:opacity-50"
          >
            {isLoginPending ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-[var(--color-muted)]">
            Don&apos;t have an account?
          </p>
          <div className="flex flex-col gap-2">
            <Link 
              href="/client-registration" 
              className="text-sm font-bold text-[var(--color-primary)] hover:underline"
            >
              Register as Client
            </Link>
            <Link 
              href="/errand-registration" 
              className="text-sm font-bold text-[var(--color-secondary)] hover:underline"
            >
              Become an ErrandR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
