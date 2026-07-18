"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Link from "next/link";
import { Shield, ArrowLeft, RefreshCw, Eye, EyeOff } from "lucide-react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validateEmail, validateGenericString } from "@/lib/validation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [mfaData, setMfaData] = useState({
    required: false,
    userId: "",
    code: "",
  });

  const { errors, touched, handleBlur, validateForm } = useFormValidation({
    email: (v) => validateEmail(v),
    password: (v) => validateGenericString(v, 128, "Password"),
  });

  const { login: authLogin } = useAuth();
  const queryClient = useQueryClient();

  const handleApiError = (error: any, fallback: string) => {
    if (error.errors && Array.isArray(error.errors)) {
      error.errors.forEach((err: any) => {
        toast.error(`${err.property}: ${err.message}`);
      });
      return;
    }

    if (Array.isArray(error.message)) {
      error.message.forEach((msg: string) => {
        toast.error(msg);
      });
      return;
    }

    if (typeof error.message === "string") {
      if (error.message === "Please verify your email before logging in.") {
        toast.error(error.message, {
          action: {
            label: "Resend Email",
            onClick: () => {
              authService.resendVerification(formData.email)
                .then(() => toast.success("Verification email resent! Please check your inbox. If you do not see it, please check your spam folder."))
                .catch((err) => toast.error(err.message || "Failed to resend email"));
            }
          },
          duration: 10000,
        });
        return;
      }
      toast.error(error.message);
      return;
    }

    toast.error(fallback);
  };

  // Login Mutation
  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: (credentials: any) => authService.login(credentials),
    onSuccess: (response: any) => {
      if (response.data.mfaRequired) {
        setMfaData({
          required: true,
          userId: response.data.userId,
          code: "",
        });
        toast.info("Two-Factor Authentication required");
      } else {
        const userData = response.data.user;
        const accessToken = response.data.accessToken;

        // SAVE TOKEN FOR CHAT
        localStorage.setItem("errand_token", accessToken);

        toast.success("Login successful!");
        queryClient.setQueryData(["user"], userData);
        
        const searchParams = new URLSearchParams(window.location.search);
        const returnTo = searchParams.get('returnTo');
        authLogin(userData, returnTo || undefined);
      }
    },
    onError: (error: any) => handleApiError(error, "Login failed"),
  });

  // MFA Verify Mutation
  const { mutate: verifyMFA, isPending: isVerifyPending } = useMutation({
    mutationFn: (data: { userId: string; code: string }) =>
      authService.verify2FALogin(data),
    onSuccess: (response: any) => {
      const userData = response.data.user;
      const accessToken = response.data.accessToken;
      toast.success("Authentication successful!");
      queryClient.setQueryData(["user"], userData);
      
      const searchParams = new URLSearchParams(window.location.search);
      const returnTo = searchParams.get('returnTo');
      authLogin(userData, returnTo || undefined);
    },
    onError: (error: any) => handleApiError(error, "Verification failed"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMfaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow both digits (TOTP) and alphanumeric (Recovery Codes)
    setMfaData({ ...mfaData, code: e.target.value.toUpperCase() });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    login(formData);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaData.code.length >= 6) {
      verifyMFA({ userId: mfaData.userId, code: mfaData.code });
    }
  };

  if (mfaData.required) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#fcf9f4] px-4'>
        <div className='w-full max-w-md bg-white rounded-2xl border border-[#f5ebd8] shadow-2xl overflow-hidden'>
          <div className='bg-[#f5ebd8] px-8 py-6 flex items-center justify-between border-b border-[#e2d5c3]'>
            <h2 className='text-[#1A1A1A] font-bold text-xl uppercase tracking-tight'>
              Two-Step Verification
            </h2>
            <div className='bg-white/50 p-2 rounded-full'>
              <Shield className='w-6 h-6 text-indigo-600' />
            </div>
          </div>

          <div className='p-8'>
            <button
              onClick={() => setMfaData({ ...mfaData, required: false })}
              className='flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-primary transition-colors mb-8 uppercase tracking-widest group'>
              <ArrowLeft
                size={14}
                className='group-hover:-translate-x-1 transition-transform'
              />{" "}
              Back to Login
            </button>

            <div className='text-center mb-8'>
              <p className='text-sm text-[#4B5563] leading-relaxed'>
                Enter the 6-digit code from your app or use a **Backup Recovery
                Code**.
              </p>
            </div>

            <form onSubmit={handleMfaSubmit} className='space-y-8'>
              <div className='relative'>
                <input
                  type='text'
                  autoFocus
                  placeholder='000 000'
                  value={mfaData.code}
                  onChange={handleMfaChange}
                  className='w-full px-6 py-5 bg-[#fcf9f4] border border-[#f5ebd8] rounded-xl text-center text-3xl font-bold tracking-[0.2em] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-indigo-600 placeholder-gray-300 shadow-inner uppercase'
                />
              </div>

              <button
                type='submit'
                disabled={isVerifyPending || mfaData.code.length < 6}
                className='w-full py-4 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase flex items-center justify-center gap-3'>
                {isVerifyPending ? (
                  <>
                    <RefreshCw size={18} className='animate-spin' />
                    VERIFYING...
                  </>
                ) : (
                  "AUTHENTICATE & LOGIN"
                )}
              </button>
            </form>

            <div className='mt-8 text-center'>
              <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                Protected by Errand Hubb Security
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-[var(--color-surface-dim)] px-4'>
      <div className='w-full max-w-md bg-[var(--color-background)] p-8 rounded-xl border border-[var(--color-border)] shadow-lg'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-[var(--color-secondary)]'>
            Login
          </h1>
          <p className='text-[var(--color-muted)] mt-2'>
            Welcome back to Errand Hubb
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wide mb-2'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              required
              maxLength={254}
              placeholder='your@email.com'
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => handleBlur('email', e.target.value)}
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={touched.email && errors.email ? "email-error" : undefined}
              className={`w-full px-3 py-2 border rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 transition-colors bg-[var(--color-background)] ${
                touched.email && errors.email 
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                  : "border-[var(--color-border)] focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
              }`}
            />
            {touched.email && errors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          <div>
            <div className='flex justify-between items-center mb-2'>
              <label className='block text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wide'>
                Password
              </label>
              <Link
                href='/forgot-password'
                className='text-xs font-bold text-[var(--color-primary)] hover:underline'>
                Forgot Password?
              </Link>
            </div>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                required
                maxLength={128}
                placeholder='Your password'
                value={formData.password}
                onChange={handleChange}
                onBlur={(e) => handleBlur('password', e.target.value)}
                aria-invalid={touched.password && !!errors.password}
                aria-describedby={touched.password && errors.password ? "password-error" : undefined}
                className={`w-full pl-3 pr-10 py-2 border rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 transition-colors bg-[var(--color-background)] ${
                  touched.password && errors.password 
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                    : "border-[var(--color-border)] focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>
            )}
          </div>

          <button
            type='submit'
            disabled={isLoginPending}
            className='w-full py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors uppercase tracking-wide text-sm disabled:opacity-50'>
            {isLoginPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className='mt-6 text-center space-y-2'>
          <p className='text-sm text-[var(--color-muted)]'>
            Don&apos;t have an account?
          </p>
          <div className='flex flex-col gap-2'>
            <Link
              href='/client-registration'
              className='text-sm font-bold text-[var(--color-primary)] hover:underline'>
              Register as Client
            </Link>
            <Link
              href='/errand-registration'
              className='text-sm font-bold text-[var(--color-secondary)] hover:underline'>
              Become an ErrandR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
