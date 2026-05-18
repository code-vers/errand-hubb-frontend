"use client";

import React, { useRef, useState } from "react";

const ErrandRegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    bio: "",
    services: "",
    rate: "",
    password: "",
    confirmPassword: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.size <= 25 * 1024 * 1024);
    setImages((prev) => [...prev, ...valid]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ formData, images });
  };

  const inputClass =
    "w-full px-3 py-2  border border-[var(--color-border)] rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-colors bg-[var(--color-background)]";

  const labelClass =
    "text-[10px] font-bold text-[var(--color-secondary)] uppercase tracking-wide";

  return (
    <div
      className='min-h-screen py-8 flex items-center justify-center p-4'
      style={{ backgroundColor: "var(--color-surface-dim)" }}>
      <main
        className='w-full max-w-240 rounded-lg p-6'
        style={{
          backgroundColor: "var(--color-background)",
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
        }}>
        {/* Promo Banner */}
        <div
          className='mb-5 px-4 py-3 rounded-md border'
          style={{
            backgroundColor: "var(--color-warning-light)",
            borderColor: "var(--color-warning-border)",
          }}>
          <p
            className='text-xs font-bold uppercase tracking-wide'
            style={{ color: "var(--color-primary)" }}>
            Just $5 / Month
          </p>
          <p className='text-xs mt-0.5' style={{ color: "var(--color-muted)" }}>
            Create your ErrandR profile and start getting hired
          </p>
        </div>

        {/* Page Title */}
        <h1
          className='text-lg font-bold mb-4 tracking-tight'
          style={{ color: "var(--color-secondary)" }}>
          ErrandR Profile
        </h1>

        <form onSubmit={handleSubmit} className='space-y-3'>
          {/* Name Row */}
          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='firstName' className={labelClass}>
                First Name
              </label>
              <input
                id='firstName'
                name='firstName'
                type='text'
                placeholder='First name'
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='lastName' className={labelClass}>
                Last Name
              </label>
              <input
                id='lastName'
                name='lastName'
                type='text'
                placeholder='Last name'
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
          <div className='grid grid-cols-2 gap-3'>
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

          {/* Bio */}
          <div className='flex flex-col space-y-1'>
            <label htmlFor='bio' className={labelClass}>
              Bio / About Me
            </label>
            <textarea
              id='bio'
              name='bio'
              rows={3}
              placeholder='Tell clients about yourself and your experience...'
              value={formData.bio}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-[var(--color-border)] rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-colors bg-[var(--color-background)] resize-none'
            />
          </div>

          {/* Upload Images */}
          <div className='flex flex-col space-y-1'>
            <label className={labelClass}>Upload Images</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              className='w-full border border-[var(--color-border)] rounded-md flex flex-col items-center justify-center py-6 cursor-pointer transition-colors'
              style={{
                backgroundColor: dragOver
                  ? "var(--color-hover)"
                  : "var(--color-background)",
              }}>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                multiple
                className='hidden'
                onChange={(e) => handleFiles(e.target.files)}
              />
              {/* Upload Icon */}
              <svg
                className='mb-2'
                width='32'
                height='32'
                viewBox='0 0 24 24'
                fill='none'
                stroke='var(--color-muted)'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                <polyline points='17 8 12 3 7 8' />
                <line x1='12' y1='3' x2='12' y2='15' />
              </svg>
              <p className='text-sm'>
                <span
                  className='font-bold'
                  style={{ color: "var(--color-secondary)" }}>
                  Click to Upload
                </span>{" "}
                <span style={{ color: "var(--color-muted)" }}>
                  or drag and drop
                </span>
              </p>
              <p
                className='text-xs mt-0.5'
                style={{ color: "var(--color-muted)" }}>
                (Max. File Size: 25 MB)
              </p>
              {images.length > 0 && (
                <p
                  className='text-xs mt-2'
                  style={{ color: "var(--color-primary)" }}>
                  {images.length} file{images.length > 1 ? "s" : ""} selected
                </p>
              )}
            </div>
          </div>

          {/* Services Offered */}
          <div className='flex flex-col space-y-1'>
            <label htmlFor='services' className={labelClass}>
              Services Offered
            </label>
            <input
              id='services'
              name='services'
              type='text'
              placeholder='e.g. Grocery, Delivery, Pharmacy...'
              value={formData.services}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Rate */}
          <div className='flex flex-col space-y-1'>
            <label htmlFor='rate' className={labelClass}>
              Your Rate ($/HR)
            </label>
            <input
              id='rate'
              name='rate'
              type='text'
              placeholder='e.g. 15'
              value={formData.rate}
              onChange={handleChange}
              className={inputClass}
            />
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
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col space-y-1'>
            <label htmlFor='confirmPassword' className={labelClass}>
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='Confirm your password'
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Submit Button */}
          <div className='pt-3'>
            <button
              type='submit'
              className='w-full text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors text-sm tracking-wide uppercase'
              style={{ backgroundColor: "var(--color-primary)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--color-primary-dark)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--color-primary)")
              }>
              Create ErrandR Profile — $10/Mo
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ErrandRegistrationPage;
