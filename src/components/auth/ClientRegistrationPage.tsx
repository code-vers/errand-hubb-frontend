"use client";

import { useRegisterClient } from "@/hooks/useAuth";
import { Upload, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ClientRegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
  });

  const evaluatePassword = (pass: string) => {
    const hasMinLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);

    let score = 0;
    if (hasMinLength) score++;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNumber) score++;

    return {
      score,
      hasMinLength,
      hasUpper,
      hasLower,
      hasNumber,
    };
  };

  const { mutate: register, isPending } = useRegisterClient();

  // Clean up preview URL to prevent memory leaks
  useEffect(() => {
    let url: string | null = null;
    if (profileImage) {
      url = URL.createObjectURL(profileImage);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [profileImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      setPasswordStrength(evaluatePassword(value));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const strength = evaluatePassword(formData.password);
    if (!strength.hasMinLength) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (!strength.hasUpper || !strength.hasLower) {
      toast.error("Password must contain both uppercase and lowercase letters");
      return;
    }
    if (!strength.hasNumber) {
      toast.error("Password must contain at least one number");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword" && value !== "") {
        submitData.append(key, value);
      }
    });

    if (profileImage) {
      submitData.append("profileImage", profileImage);
    }

    register(submitData);
  };

  const inputClass =
    "w-full px-3 py-2 border border-[var(--color-border)] rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-colors bg-[var(--color-background)]";

  const labelClass =
    "text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wide";

  return (
    <div
      className=' flex items-center justify-center p-4 py-12'
      style={{ backgroundColor: "var(--color-surface-dim)" }}>
      <main
        className='w-full max-w-230 rounded-lg p-8'
        style={{
          backgroundColor: "var(--color-background)",
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
        }}>
        {/* Header */}
        <header className='mb-6'>
          <h1
            className='text-[22px] font-bold tracking-tight'
            style={{ color: "var(--color-secondary)" }}>
            Create Your Account
          </h1>
        </header>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Profile Photo Upload */}
          <div className='flex flex-col items-center mb-6'>
            <div
              onClick={() => fileInputRef.current?.click()}
              className='relative w-24 h-24 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors bg-gray-50 overflow-hidden'>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt='profile'
                  className='w-full h-full object-cover'
                />
              ) : (
                <Upload className='w-8 h-8 text-gray-400' />
              )}
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                accept='image/*'
              />
            </div>
            <p className='text-[10px] font-bold text-muted uppercase mt-2 tracking-widest'>
              Profile Photo
            </p>
            {profileImage && (
              <button
                type='button'
                onClick={() => setProfileImage(null)}
                className='text-[10px] text-red-500 font-bold uppercase mt-1'>
                Remove
              </button>
            )}
          </div>

          {/* Name Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* First Name */}
            <div className='flex flex-col space-y-1'>
              <label htmlFor='firstName' className={labelClass}>
                First Name
              </label>
              <input
                id='firstName'
                name='firstName'
                type='text'
                placeholder='First name'
                required
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Last Name */}
            <div className='flex flex-col space-y-1'>
              <label htmlFor='lastName' className={labelClass}>
                Last Name
              </label>
              <input
                id='lastName'
                name='lastName'
                type='text'
                placeholder='Last name'
                required
                value={formData.lastName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Email */}
          <div className='flex flex-col space-y-1'>
            <label htmlFor='email' className={labelClass}>
              Email Address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='your@email.com'
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div className='flex flex-col space-y-1'>
            <label htmlFor='phone' className={labelClass}>
              Phone Number
            </label>
            <input
              id='phone'
              name='phone'
              type='tel'
              placeholder='(555) 000-0000'
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* City & State Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* City */}
            <div className='flex flex-col space-y-1'>
              <label htmlFor='city' className={labelClass}>
                City
              </label>
              <input
                id='city'
                name='city'
                type='text'
                placeholder='City'
                value={formData.city}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* State */}
            <div className='flex flex-col space-y-1'>
              <label htmlFor='state' className={labelClass}>
                State
              </label>
              <input
                id='state'
                name='state'
                type='text'
                placeholder='State'
                value={formData.state}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Password */}
          <div className='flex flex-col space-y-1'>
            <label htmlFor='password' className={labelClass}>
              Password
            </label>
            <div className='relative'>
              <input
                id='password'
                name='password'
                type={showPassword ? "text" : "password"}
                placeholder='Create a password'
                required
                value={formData.password}
                onChange={handleChange}
                className={`${inputClass} pr-10`}
                autoComplete='new-password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className='mt-2 space-y-2 bg-[var(--color-surface-dim)] p-3 rounded-lg border border-[var(--color-border)]'>
                {/* Progress bar */}
                <div className='flex gap-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden'>
                  {[...Array(4)].map((_, i) => {
                    let barColor = 'bg-gray-300';
                    if (i < passwordStrength.score) {
                      if (passwordStrength.score <= 1) barColor = 'bg-red-500';
                      else if (passwordStrength.score <= 3) barColor = 'bg-amber-500';
                      else barColor = 'bg-emerald-500';
                    }
                    return (
                      <div
                        key={i}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${barColor}`}
                      />
                    );
                  })}
                </div>
                {/* Labels */}
                <div className='flex justify-between items-center text-[10px] uppercase font-bold tracking-wider'>
                  <span className={
                    passwordStrength.score <= 1 ? 'text-red-500' :
                    passwordStrength.score <= 3 ? 'text-amber-500' : 'text-emerald-500'
                  }>
                    Password Strength: {
                      passwordStrength.score <= 1 ? 'Weak' :
                      passwordStrength.score <= 3 ? 'Medium' : 'Strong'
                    }
                  </span>
                </div>
                {/* Checklist */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-[var(--color-foreground)] pt-1'>
                  <div className='flex items-center gap-1.5'>
                    <span className={passwordStrength.hasMinLength ? 'text-emerald-500' : 'text-gray-400'}>
                      {passwordStrength.hasMinLength ? '●' : '○'}
                    </span>
                    <span className={passwordStrength.hasMinLength ? 'text-[var(--color-foreground)] font-medium' : 'text-[var(--color-muted)]'}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <span className={passwordStrength.hasUpper ? 'text-emerald-500' : 'text-gray-400'}>
                      {passwordStrength.hasUpper ? '●' : '○'}
                    </span>
                    <span className={passwordStrength.hasUpper ? 'text-[var(--color-foreground)] font-medium' : 'text-[var(--color-muted)]'}>
                      Uppercase letter (A-Z)
                    </span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <span className={passwordStrength.hasLower ? 'text-emerald-500' : 'text-gray-400'}>
                      {passwordStrength.hasLower ? '●' : '○'}
                    </span>
                    <span className={passwordStrength.hasLower ? 'text-[var(--color-foreground)] font-medium' : 'text-[var(--color-muted)]'}>
                      Lowercase letter (a-z)
                    </span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <span className={passwordStrength.hasNumber ? 'text-emerald-500' : 'text-gray-400'}>
                      {passwordStrength.hasNumber ? '●' : '○'}
                    </span>
                    <span className={passwordStrength.hasNumber ? 'text-[var(--color-foreground)] font-medium' : 'text-[var(--color-muted)]'}>
                      Number (0-9)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col space-y-1 mb-6'>
            <label htmlFor='confirmPassword' className={labelClass}>
              Confirm Password
            </label>
            <div className='relative'>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirm your password'
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${inputClass} pr-10`}
                autoComplete='new-password'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              disabled={isPending}
              className='w-full text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed'
              style={{
                backgroundColor: "var(--color-primary)",
              }}
              onMouseEnter={(e) =>
                !isPending &&
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--color-primary-dark)")
              }
              onMouseLeave={(e) =>
                !isPending &&
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--color-primary)")
              }>
              {isPending ? "Creating Account..." : "Create Client Account"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ClientRegistrationPage;
