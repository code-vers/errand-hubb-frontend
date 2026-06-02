"use client";

import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useRegisterClient } from "@/hooks/useAuth";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { mutate: register, isPending } = useRegisterClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
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
              className='relative w-24 h-24 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors bg-gray-50 overflow-hidden'
            >
              {profileImage ? (
                <img src={URL.createObjectURL(profileImage)} alt="profile" className='w-full h-full object-cover' />
              ) : (
                <Upload className='w-8 h-8 text-gray-400' />
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className='hidden' 
                accept="image/*"
              />
            </div>
            <p className='text-[10px] font-bold text-muted uppercase mt-2 tracking-widest'>Profile Photo (Optional)</p>
            {profileImage && (
              <button 
                type="button" 
                onClick={() => setProfileImage(null)}
                className='text-[10px] text-red-500 font-bold uppercase mt-1'
              >
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
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Create a password'
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col space-y-1 mb-6'>
            <label htmlFor='confirmPassword' className={labelClass}>
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='Confirm your password'
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClass}
              autoComplete="new-password"
            />
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
                !isPending && ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--color-primary-dark)")
              }
              onMouseLeave={(e) =>
                !isPending && ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
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
