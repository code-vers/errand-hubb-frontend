import { UserProfile } from "@/types/profile";
import { Mail, MapPin, Pencil, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  profile: UserProfile;
  onEditProfile?: () => void;
}

const ProfileHeader: React.FC<Props> = ({ profile, onEditProfile }) => {
  return (
    <div className='bg-background  rounded-xl px-5 py-4 flex items-start justify-between gap-4 flex-wrap'>
      <div className='flex items-start gap-3.5'>
        <div className='relative shrink-0'>
          <Image
            src={profile.avatar}
            alt={profile.name}
            height={250}
            width={250}
            className='w-24 h-24 rounded object-cover border-2 border-white ring-1 '
          />
          <div className='absolute bottom-0.5 right-0.5 w-3 h-3 bg-(--color-success) rounded-full border-2 border-white' />
        </div>

        <div>
          <h1 className='text-[20px] font-bold text-foreground tracking-tight'>
            {profile.name}
          </h1>

          <div className='flex flex-wrap gap-x-3 gap-y-1 text-[14px] text-text-secondary mt-2'>
            {[
              { icon: <MapPin size={14} />, text: profile.location },
              { icon: <Mail size={14} />, text: profile.email },
              { icon: <Phone size={14} />, text: profile.phone },
            ].map((item, i) => (
              <span key={i} className='flex items-center gap-1.5'>
                <span className='text-primary'>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>

          <div className='flex gap-2 mt-4'>
            <span className='inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-0.5 bg-[#fdf3e8] text-[#c47a3a] border border-[#f0dfc8] rounded-full'>
              Member since {profile.memberSince}
            </span>
            {profile.isActive && (
              <span className='inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-0.5 bg-[#ECFDF3] text-success border border-success rounded-full'>
                <span className='w-1.5 h-1.5 rounded-full bg-current text-success' />
                Active
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onEditProfile}
        className='inline-flex items-center gap-1.5 px-6 py-2 bg- border border-[#EC6F27] text-[#EC6F27] rounded-md bg-[#ffffff] text-sm  font-bold hover:bg-[#fff8f3] transition-colors'>
        <Pencil size={14} />
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
