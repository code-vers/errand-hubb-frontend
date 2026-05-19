'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('client@gmail.com');
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface-dim px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-border shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary">Login</h1>
          <p className="text-muted mt-2">Access your role-based dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <select
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 text-sm border border-border rounded-lg bg-white focus:ring-primary focus:border-primary"
            >
              <option value="client@gmail.com">Client (client@gmail.com)</option>
              <option value="errand@gmail.com">Errand (errand@gmail.com)</option>
              <option value="admin@gmail.com">Admin (admin@gmail.com)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              value="password"
              readOnly
              className="block w-full p-3 text-sm border border-border rounded-lg bg-surface-dim cursor-not-allowed"
            />
            <p className="text-xs text-muted mt-1">Password is not required for this demo.</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
