import { AccountOverview } from "@/types/profile";
import React from "react";

interface AccountOverviewCardProps {
  overview: AccountOverview;
}

interface StatRowProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
  isPill?: boolean;
  isLast?: boolean;
}

const StatRow: React.FC<StatRowProps> = ({
  icon,
  iconBg,
  label,
  value,
  isPill,
  isLast,
}) => (
  <div
    className={`flex items-center justify-between px-[18px] py-3 ${!isLast ? "border-b border-[var(--color-border)]" : ""}`}>
    <div className='flex items-center gap-2.5'>
      <div
        className='w-7 h-7 rounded-lg flex items-center justify-center shrink-0'
        style={{ background: iconBg }}>
        {icon}
      </div>
      <span className='text-[12.5px] font-medium text-[var(--color-text-secondary)]'>
        {label}
      </span>
    </div>
    {isPill ? (
      <span className='text-[12px] font-semibold text-[#c47a3a] bg-[#fdf3e8] rounded-full px-3 py-0.5 border border-[1.5px] border-[#e8d8c0]'>
        {value}
      </span>
    ) : (
      <span className='text-[12.5px] font-semibold text-[var(--color-foreground)]'>
        {value}
      </span>
    )}
  </div>
);

const AccountOverviewCard: React.FC<AccountOverviewCardProps> = ({
  overview,
}) => {
  const stats: StatRowProps[] = [
    {
      label: "Total Posts",
      value: overview.totalPosts,
      iconBg: "#fdf0e8",
      icon: (
        <svg
          width='13'
          height='13'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#e07b3c'
          strokeWidth='2'>
          <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
          <polyline points='14 2 14 8 20 8' />
        </svg>
      ),
    },
    {
      label: "Active Posts",
      value: overview.activePosts,
      iconBg: "#fff8e8",
      icon: (
        <svg
          width='13'
          height='13'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#f0b429'
          strokeWidth='2'>
          <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
        </svg>
      ),
    },
    {
      label: "Completed Jobs",
      value: overview.completedJobs,
      iconBg: "#edfaf4",
      icon: (
        <svg
          width='13'
          height='13'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#27ae60'
          strokeWidth='2'>
          <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
          <polyline points='22 4 12 14.01 9 11.01' />
        </svg>
      ),
    },
    {
      label: "Total Hires",
      value: overview.totalHires,
      iconBg: "#f0f4ff",
      icon: (
        <svg
          width='13'
          height='13'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#5b7fff'
          strokeWidth='2'>
          <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
          <circle cx='9' cy='7' r='4' />
          <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
          <path d='M16 3.13a4 4 0 0 1 0 7.75' />
        </svg>
      ),
    },
    {
      label: "Member Since",
      value: overview.memberSince,
      iconBg: "#fff0f5",
      isPill: true,
      icon: (
        <svg
          width='13'
          height='13'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#e07b9c'
          strokeWidth='2'>
          <rect x='3' y='4' width='18' height='18' rx='2' />
          <line x1='16' y1='2' x2='16' y2='6' />
          <line x1='8' y1='2' x2='8' y2='6' />
          <line x1='3' y1='10' x2='21' y2='10' />
        </svg>
      ),
    },
  ];

  return (
    <div className='bg-white border border-[var(--color-border)] rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)]'>
      <div className='text-[13.5px] font-bold text-[var(--color-foreground)] px-[18px] pt-4 pb-3 border-b border-[var(--color-border)] tracking-tight'>
        Account Overview
      </div>
      {stats.map((stat, i) => (
        <StatRow key={stat.label} {...stat} isLast={i === stats.length - 1} />
      ))}
    </div>
  );
};

export default AccountOverviewCard;
