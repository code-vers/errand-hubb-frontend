import { PersonalInfo } from "@/types/profile";
import React from "react";

interface PersonalInfoCardProps {
  info: PersonalInfo;
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLast?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, isLast }) => (
  <div
    className={`flex items-start gap-3 px-3.5 sm:px-4.5 py-2.75 ${!isLast ? "border-b border-[#F5E9D3]" : ""}`}>
    <div className='shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-[#FFF3CD99] flex items-center font-bold justify-center text-[#EC6F27] rounded-lg'>
      {icon}
    </div>
    <div className='flex flex-col gap-0.5 min-w-0 flex-1 overflow-hidden'>
      <span className='text-[11px] sm:text-[12px] font-medium text-text-secondary'>
        {label}
      </span>
      <span className='text-xs sm:text-[14px] font-medium text-foreground break-all sm:break-words'>
        {value}
      </span>
    </div>
  </div>
);

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ info }) => {
  const rows = [
    {
      label: "Full Name",
      value: info.fullName,
      icon: (
        <svg
          width='15'
          height='15'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'>
          <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
          <circle cx='12' cy='7' r='4' />
        </svg>
      ),
    },
    {
      label: "Location",
      value: info.location,
      icon: (
        <svg
          width='15'
          height='15'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'>
          <path d='M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z' />
          <circle cx='12' cy='10' r='3' />
        </svg>
      ),
    },
    {
      label: "Email",
      value: info.email,
      icon: (
        <svg
          width='15'
          height='15'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'>
          <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
          <polyline points='22,6 12,13 2,6' />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: info.phone,
      icon: (
        <svg
          width='15'
          height='15'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'>
          <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.55a16 16 0 0 0 6.29 6.29l.95-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' />
        </svg>
      ),
    },
    {
      label: "Preferred Contact",
      value: info.preferredContact,
      icon: (
        <svg
          width='15'
          height='15'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'>
          <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
        </svg>
      ),
    },
    {
      label: "Time Zone",
      value: info.timeZone,
      icon: (
        <svg
          width='15'
          height='15'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'>
          <circle cx='12' cy='12' r='10' />
          <polyline points='12 6 12 12 16 14' />
        </svg>
      ),
    },
  ];

  return (
    <div className='bg-white h-full  rounded-lg overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)]'>
      <div className='text-[18px] font-semibold text-[var(--color-foreground)] px-4.5 pt-4 pb-3 border-b border-[#F5E9D3] tracking-tight'>
        Personal Information
      </div>
      {rows.map((row, i) => (
        <InfoRow key={row.label} {...row} isLast={i === rows.length - 1} />
      ))}
    </div>
  );
};

export default PersonalInfoCard;
