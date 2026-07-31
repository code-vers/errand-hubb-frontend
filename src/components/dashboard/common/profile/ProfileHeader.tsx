"use client";

import { UserProfile } from "@/types/profile";
import { Mail, MapPin, Pencil, Phone, Camera } from "lucide-react";
import React, { useRef } from "react";
import { getImageUrl } from "@/configs/api.config";

interface Props {
  profile: UserProfile;
  onEditProfile?: () => void;
  onImageUpload?: (file: File) => void;
  isUpdating?: boolean;
}

const ProfileHeader: React.FC<Props> = ({ profile, onEditProfile, onImageUpload, isUpdating }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileImageUrl = getImageUrl(profile.avatar);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onImageUpload) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className='bg-background rounded-xl px-4 sm:px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[var(--color-border)] shadow-sm w-full overflow-hidden'>
      <div className='flex flex-col sm:flex-row items-start gap-3.5 min-w-0 flex-1 w-full'>
        <div className='relative shrink-0'>
          <div className='w-20 h-20 sm:w-24 sm:h-24 rounded overflow-hidden border-2 border-white ring-1 ring-gray-200 relative group'>
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={profile.name}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-primary flex items-center justify-center'>
                <span className='text-white text-xl sm:text-2xl font-bold'>
                  {profile.name[0]?.toUpperCase() ?? "U"}
                </span>
              </div>
            )}
            
            {/* Overlay for image upload */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
            >
              <Camera className='text-white w-5 h-5 sm:w-6 sm:h-6' />
            </div>
            
            {isUpdating && (
              <div className='absolute inset-0 bg-white/60 flex items-center justify-center'>
                <div className='w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin' />
              </div>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className='hidden' 
            accept="image/*"
          />
          <div className='absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white' />
        </div>

        <div className='min-w-0 flex-1 w-full'>
          <h1 className='text-lg sm:text-[20px] font-bold text-foreground tracking-tight truncate'>
            {profile.name}
          </h1>

          <div className='flex flex-wrap gap-x-3 gap-y-1.5 text-xs sm:text-[14px] text-text-secondary mt-2 max-w-full min-w-0'>
            {[
              { icon: <MapPin size={14} className='shrink-0' />, text: profile.location },
              { icon: <Mail size={14} className='shrink-0' />, text: profile.email },
              { icon: <Phone size={14} className='shrink-0' />, text: profile.phone },
            ].map((item, i) => (
              <span key={i} className='flex items-center gap-1.5 max-w-full min-w-0 truncate'>
                <span className='text-primary shrink-0'>{item.icon}</span>
                <span className='truncate'>{item.text || 'Not provided'}</span>
              </span>
            ))}
          </div>

          <div className='flex flex-wrap gap-2 mt-3 sm:mt-4 max-w-full'>
            <span className='inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-medium px-2.5 py-0.5 bg-[#fdf3e8] text-[#c47a3a] border border-[#f0dfc8] rounded-full max-w-full truncate'>
              Member since {profile.memberSince}
            </span>
            {profile.isActive && (
              <span className='inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-medium px-2.5 py-0.5 bg-[#ECFDF3] text-green-700 border border-green-200 rounded-full shrink-0'>
                <span className='w-1.5 h-1.5 rounded-full bg-green-500' />
                Active
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onEditProfile}
        className='w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 border border-[#EC6F27] text-[#EC6F27] rounded-md bg-white text-xs sm:text-sm font-bold hover:bg-[#fff8f3] transition-colors cursor-pointer shrink-0'>
        <Pencil size={14} />
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
