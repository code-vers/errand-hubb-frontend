"use client";

import { FC, useState, useEffect } from "react";
import { X, User, Phone, MapPin, Globe, MessageSquare, AlignLeft, PlayCircle } from "lucide-react";

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
                className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
              />
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
                className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
              />
            </div>

            {/* Phone */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <Phone size={14} className="text-primary" /> Phone Number
              </label>
              <input
                type='text'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='e.g. +1 234 567 890'
                className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
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

            {/* City */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <MapPin size={14} className="text-primary" /> City
              </label>
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleChange}
                placeholder='Enter city'
                className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
              />
            </div>

            {/* State */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2'>
                <MapPin size={14} className="text-primary" /> State / Province
              </label>
              <input
                type='text'
                name='state'
                value={formData.state}
                onChange={handleChange}
                placeholder='Enter state'
                className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
              />
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
                  onChange={handleChange}
                  placeholder='e.g. 25.00'
                  className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
                />
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
                className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm min-h-[100px] resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
              />
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
                  className='w-full px-4 py-2.5 bg-background border border-[#f5ebd8] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all'
                />
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
