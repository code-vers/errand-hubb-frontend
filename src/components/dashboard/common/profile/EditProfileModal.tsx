"use client";

import { FC, useState, useEffect } from "react";
import { X, User, Phone, MapPin, Globe, MessageSquare, AlignLeft, PlayCircle } from "lucide-react";
import { InternationalPhoneInput } from "@/components/shared/InternationalPhoneInput";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validateName, validateEmail, validateCityState, validateTextarea, validateGenericString, validateRate } from "@/lib/validation";
import { StateDropdown, CityDropdown } from "@/components/shared/StateCityDropdown";

interface EditProfileModalProps {
  user: any;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  isUpdating: boolean;
}

const EditProfileModal: FC<EditProfileModalProps> = ({
  user,
  onClose,
  onSave,
  isUpdating,
}) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.profile?.phone || "",
    city: user?.profile?.city || "",
    state: user?.profile?.state || "",
    bio: user?.profile?.bio || "",
    timeZone: user?.profile?.timeZone || "",
    preferredContact: user?.profile?.preferredContact || "",
    services: user?.profile?.services || "",
    ratePerHour: user?.profile?.ratePerHour || "",
    youtubeLink: user?.profile?.youtubeLink || "",
  });

  const { errors, touched, handleBlur, validateForm } = useFormValidation({
    firstName: (v) => validateName(v),
    lastName: (v) => validateName(v),
    city: (v) => validateCityState(v, "City"),
    state: (v) => validateCityState(v, "State"),
    bio: (v) => validateTextarea(v, 2000, "Bio", false),
    services: (v) => validateGenericString(v, 150, "Services", false),
    ratePerHour: (v) => validateRate(v, false),
  });

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    await onSave(formData);
    onClose();
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role='dialog'
      aria-modal='true'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]'>
        {/* Modal Header */}
        <div className='bg-[#f5ebd8] px-6 py-5 flex items-center justify-between shrink-0'>
          <h2 className='text-[#1A1A1A] font-bold text-lg uppercase tracking-tight'>
            Edit Profile Information
          </h2>
          <button
            aria-label='Close modal'
            onClick={onClose}
            className='bg-white/50 hover:bg-white text-orange-500 rounded-full p-1.5 transition-colors'>
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-6 overflow-y-auto'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {/* First Name */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <User size={14} className="text-primary" /> First Name
              </label>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder='Enter first name'
                className={`w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${touched.firstName && errors.firstName ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                maxLength={50}
                onBlur={(e) => handleBlur('firstName', e.target.value)}
                aria-invalid={touched.firstName && !!errors.firstName}
                aria-describedby={touched.firstName && errors.firstName ? "firstName-error" : undefined}
              />
              {touched.firstName && errors.firstName && (
                <p id="firstName-error" className="text-red-500 text-xs mt-1 font-medium">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <User size={14} className="text-primary" /> Last Name
              </label>
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                placeholder='Enter last name'
                className={`w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${touched.lastName && errors.lastName ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                maxLength={50}
                onBlur={(e) => handleBlur('lastName', e.target.value)}
                aria-invalid={touched.lastName && !!errors.lastName}
                aria-describedby={touched.lastName && errors.lastName ? "lastName-error" : undefined}
              />
              {touched.lastName && errors.lastName && (
                <p id="lastName-error" className="text-red-500 text-xs mt-1 font-medium">{errors.lastName}</p>
              )}
            </div>

            {/* Phone */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <Phone size={14} className="text-primary" /> Phone Number
              </label>
              <InternationalPhoneInput
                name='phone'
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
              />
            </div>

            {/* Preferred Contact */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <MessageSquare size={14} className="text-primary" /> Preferred Contact
              </label>
              <select
                name='preferredContact'
                value={formData.preferredContact}
                onChange={handleChange}
                className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none'>
                <option value=''>Select method</option>
                <option value='email'>Email</option>
                <option value='phone'>Phone</option>
                <option value='whatsapp'>WhatsApp</option>
              </select>
            </div>

            {/* State */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <MapPin size={14} className="text-primary" /> State / Province
              </label>
              <StateDropdown
                name='state'
                value={formData.state}
                onChange={(e) => {
                  handleChange(e as any);
                  setFormData(prev => ({ ...prev, city: "" }));
                }}
                className={`w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${touched.state && errors.state ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                onBlur={(e) => handleBlur('state', e.target.value)}
                aria-invalid={touched.state && !!errors.state}
                aria-describedby={touched.state && errors.state ? "state-error" : undefined}
              />
              {touched.state && errors.state && (
                <p id="state-error" className="text-red-500 text-xs mt-1 font-medium">{errors.state}</p>
              )}
            </div>

            {/* City */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <MapPin size={14} className="text-primary" /> City
              </label>
              <CityDropdown
                name='city'
                stateName={formData.state}
                value={formData.city}
                onChange={handleChange as any}
                className={`w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${touched.city && errors.city ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                onBlur={(e) => handleBlur('city', e.target.value)}
                aria-invalid={touched.city && !!errors.city}
                aria-describedby={touched.city && errors.city ? "city-error" : undefined}
              />
              {touched.city && errors.city && (
                <p id="city-error" className="text-red-500 text-xs mt-1 font-medium">{errors.city}</p>
              )}
            </div>

            {/* Time Zone */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <Globe size={14} className="text-primary" /> Time Zone
              </label>
              <input
                type='text'
                name='timeZone'
                value={formData.timeZone}
                onChange={handleChange}
                placeholder='e.g. GMT+6'
                className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
              />
            </div>

            {/* Rate Per Hour (Conditional or for Errand role) */}
            {user?.role === 'errand' && (
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                  <span className="text-primary font-bold">$</span> Rate Per Hour
                </label>
                <input
                  type='number'
                  name='ratePerHour'
                  value={formData.ratePerHour}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.]/g, '');
                    const parts = val.split('.');
                    const sanitized = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
                    setFormData(prev => ({ ...prev, ratePerHour: sanitized }));
                  }}
                  placeholder='e.g. 25.00'
                  className={`w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${touched.ratePerHour && errors.ratePerHour ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                  maxLength={10}
                onBlur={(e) => handleBlur('ratePerHour', e.target.value)}
                aria-invalid={touched.ratePerHour && !!errors.ratePerHour}
                aria-describedby={touched.ratePerHour && errors.ratePerHour ? "ratePerHour-error" : undefined}
              />
              {touched.ratePerHour && errors.ratePerHour && (
                <p id="ratePerHour-error" className="text-red-500 text-xs mt-1 font-medium">{errors.ratePerHour}</p>
              )}
              </div>
            )}

            {/* Bio */}
            <div className='flex flex-col gap-1.5 md:col-span-2'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <AlignLeft size={14} className="text-primary" /> Bio / Description
              </label>
              <textarea
                name='bio'
                value={formData.bio}
                onChange={handleChange}
                placeholder='Tell us about yourself...'
                className={`w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm min-h-[100px] resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${touched.bio && errors.bio ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                maxLength={2000}
                onBlur={(e) => handleBlur('bio', e.target.value)}
                aria-invalid={touched.bio && !!errors.bio}
                aria-describedby={touched.bio && errors.bio ? "bio-error" : undefined}
              />
              {touched.bio && errors.bio && (
                <p id="bio-error" className="text-red-500 text-xs mt-1 font-medium">{errors.bio}</p>
              )}
            </div>

            {/* Services (For Errand role) */}
            {user?.role === 'errand' && (
              <div className='flex flex-col gap-1.5 md:col-span-2'>
                <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                  <span className="text-primary font-bold">★</span> Services (comma separated)
                </label>
                <input
                  type='text'
                  name='services'
                  value={formData.services}
                  onChange={handleChange}
                  placeholder='e.g. Cleaning, Delivery, Moving'
                  className={`w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all ${touched.services && errors.services ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                  maxLength={150}
                onBlur={(e) => handleBlur('services', e.target.value)}
                aria-invalid={touched.services && !!errors.services}
                aria-describedby={touched.services && errors.services ? "services-error" : undefined}
              />
              {touched.services && errors.services && (
                <p id="services-error" className="text-red-500 text-xs mt-1 font-medium">{errors.services}</p>
              )}
              </div>
            )}

            {/* YouTube Link (For Errand role) */}
            {user?.role === 'errand' && (
              <div className='flex flex-col gap-1.5 md:col-span-2'>
                <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                  <PlayCircle size={14} className="text-red-500" /> YouTube Video Link (Optional)
                </label>
                <input
                  type='url'
                  name='youtubeLink'
                  value={formData.youtubeLink}
                  onChange={handleChange}
                  placeholder='https://www.youtube.com/watch?v=...'
                  className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className='md:col-span-2 flex items-center gap-3 mt-4 shrink-0'>
              <button
                type='button'
                onClick={onClose}
                className='flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors text-sm uppercase tracking-wider'>
                Cancel
              </button>
              <button
                type='submit'
                disabled={isUpdating}
                className='flex-[2] bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed'>
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
