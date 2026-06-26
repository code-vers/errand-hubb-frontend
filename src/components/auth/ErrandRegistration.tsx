"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRegisterErrand } from "@/hooks/useAuth";
import { useAuth } from "@/context/AuthContext";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { getImageUrl } from "@/configs/api.config";
import { toast } from "sonner";
import { Upload, PlayCircle, X, Eye, EyeOff } from "lucide-react";
import { InternationalPhoneInput } from "@/components/shared/InternationalPhoneInput";

const ErrandRegistrationPage = () => {
  const { user, setUser } = useAuth();
  const { data: profileData } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: register, isPending } = useRegisterErrand();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    bio: "",
    services: "",
    youtubeLink: "",
    rate: "",
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
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

  // Clean up preview URL
  useEffect(() => {
    let url: string | null = null;
    if (profileImage) {
      url = URL.createObjectURL(profileImage);
      setPreviewUrl(url);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [profileImage]);

  // Pre-fill if logged in
  useEffect(() => {
    if (user && profileData) {
      setFormData({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        email: profileData.email || "",
        phone: profileData.profile?.phone || "",
        city: profileData.profile?.city || "",
        state: profileData.profile?.state || "",
        bio: profileData.profile?.bio || "",
        services: profileData.profile?.services || "",
        youtubeLink: profileData.profile?.youtubeLink || "",
        rate: profileData.profile?.ratePerHour
          ? String(profileData.profile.ratePerHour)
          : "",
        password: "",
        confirmPassword: "",
      });
      if (profileData.profileImage) {
        setPreviewUrl(getImageUrl(profileData.profileImage));
      }
      if (profileData.profile?.gallery) {
        setExistingGallery(profileData.profile.gallery);
      }
    }
  }, [profileData, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      setPasswordStrength(evaluatePassword(value));
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.size <= 25 * 1024 * 1024);
    setImages((prev) => {
      const combined = [...prev, ...valid];
      if (existingGallery.length + combined.length > 5) {
        toast.error("You can upload up to 5 gallery images in total.");
        return combined.slice(0, 5 - existingGallery.length);
      }
      return combined;
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check strength if it's new registration, or if the user is changing their password
    const shouldCheckStrength = !user || formData.password;
    if (shouldCheckStrength) {
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
    }

    if (!user && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (
      user &&
      formData.password &&
      formData.password !== formData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword" && value !== "") {
        if (user && key === "password") {
          // Skip password field on update unless it has a value
          return;
        }
        submitData.append(key, value);
      }
    });

    if (profileImage) {
      submitData.append("profileImage", profileImage);
    }

    images.forEach((image) => {
      submitData.append("gallery", image);
    });

    if (user) {
      submitData.append("retainedGallery", JSON.stringify(existingGallery));
      updateProfile(submitData, {
        onSuccess: (response: any) => {
          if (response?.data) {
            setUser({
              ...user,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              profileImage: response.data.profileImage,
            });
            localStorage.setItem(
              "errand_user",
              JSON.stringify({
                ...user,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                profileImage: response.data.profileImage,
              }),
            );
          }
        },
      });
    } else {
      register(submitData);
    }
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
          {/* Profile Photo Upload */}
          <div className='flex flex-col items-center mb-6'>
            <div
              onClick={() => profileInputRef.current?.click()}
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
                ref={profileInputRef}
                onChange={handleProfileChange}
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
                required
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
            <InternationalPhoneInput
              name='phone'
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
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

          {/* Upload Images (Gallery) */}
          <div className='flex flex-col space-y-1'>
            <label className={labelClass}>
              Portfolio Gallery (Add Up to 5 Photo)
            </label>
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
              <Upload className='mb-2 text-gray-400 w-8 h-8' />
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
              {(images.length > 0 || existingGallery.length > 0) && (
                <p
                  className='text-xs mt-2'
                  style={{ color: "var(--color-primary)" }}>
                  {existingGallery.length + images.length} of 5 images
                  loaded/selected
                </p>
              )}
            </div>

            {/* Gallery Previews */}
            {(existingGallery.length > 0 || images.length > 0) && (
              <div className='grid grid-cols-5 gap-2 mt-3'>
                {existingGallery.map((url, idx) => (
                  <div
                    key={`existing-${idx}`}
                    className='relative aspect-square rounded-md overflow-hidden border border-[var(--color-border)]'>
                    <img
                      src={getImageUrl(url)}
                      alt={`gallery-${idx}`}
                      className='w-full h-full object-cover'
                    />
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        setExistingGallery((prev) =>
                          prev.filter((_, i) => i !== idx),
                        );
                      }}
                      className='absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors flex items-center justify-center'>
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {images.map((file, idx) => {
                  const objectUrl = URL.createObjectURL(file);
                  return (
                    <div
                      key={`new-${idx}`}
                      className='relative aspect-square rounded-md overflow-hidden border border-[var(--color-border)]'>
                      <img
                        src={objectUrl}
                        alt={`new-gallery-${idx}`}
                        className='w-full h-full object-cover'
                      />
                      <button
                        type='button'
                        onClick={(e) => {
                          e.stopPropagation();
                          setImages((prev) => prev.filter((_, i) => i !== idx));
                        }}
                        className='absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors flex items-center justify-center'>
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
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

          {/* YouTube Link */}
          <div className='flex flex-col space-y-1'>
            <label
              htmlFor='youtubeLink'
              className={labelClass + " flex items-center gap-1.5"}>
              <PlayCircle size={12} className='text-red-500' /> YouTube Video
              Link (Optional)
            </label>
            <input
              id='youtubeLink'
              name='youtubeLink'
              type='url'
              placeholder='https://www.youtube.com/watch?v=...'
              value={formData.youtubeLink}
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
              Password{" "}
              {user && (
                <span className='text-xs text-gray-500 font-normal'>
                  (Leave blank to keep current)
                </span>
              )}
            </label>
            <div className='relative'>
              <input
                id='password'
                name='password'
                type={showPassword ? "text" : "password"}
                placeholder='Create a password'
                required={!user}
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
          <div className='flex flex-col space-y-1'>
            <label htmlFor='confirmPassword' className={labelClass}>
              Confirm Password{" "}
              {user && (
                <span className='text-xs text-gray-500 font-normal'>
                  (Leave blank to keep current)
                </span>
              )}
            </label>
            <div className='relative'>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirm your password'
                required={!user}
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
          <div className='pt-3'>
            <button
              type='submit'
              disabled={isPending || isUpdating}
              className='w-full text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors text-sm tracking-wide uppercase disabled:opacity-50'
              style={{ backgroundColor: "var(--color-primary)" }}
              onMouseEnter={(e) =>
                !(isPending || isUpdating) &&
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--color-primary-dark)")
              }
              onMouseLeave={(e) =>
                !(isPending || isUpdating) &&
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "var(--color-primary)")
              }>
              {user
                ? isUpdating
                  ? "Saving..."
                  : "Save Profile"
                : isPending
                  ? "Creating Profile..."
                  : "Create ErrandR Profile — $5/Mo"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ErrandRegistrationPage;
