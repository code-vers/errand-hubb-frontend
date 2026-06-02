'use client';

import React, { useState } from 'react';
import { useLogin } from '@/hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { mutate: login, isPending } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

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
            disabled={isPending}
            className="w-full py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors uppercase tracking-wide text-sm disabled:opacity-50"
          >
            {isPending ? 'Logging in...' : 'Login'}
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
