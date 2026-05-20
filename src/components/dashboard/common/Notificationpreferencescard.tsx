import { NotificationPreferences } from "@/types/profile";
import React from "react";


interface NotificationPreferencesCardProps {
  preferences: NotificationPreferences;
  onToggle?: (key: keyof NotificationPreferences, value: boolean) => void;
}

interface ToggleProps {
  checked: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onToggle }) => (
  <button
    role='switch'
    aria-checked={checked}
    onClick={onToggle}
    className={`relative w-9.5 h-5.5 rounded-full border-none cursor-pointer shrink-0 transition-colors duration-200 ${
      checked ? "bg-(--color-primary)" : "bg-[#ccc]"
    }`}>
    <span
      className={`absolute top-0.75 w-4 h-4 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.18)] transition-[left] duration-200 ${
        checked ? "left-4.75" : "left-0.75"
      }`}
    />
  </button>
);

interface ToggleRowProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
  isLast?: boolean;
}

const ToggleRow: React.FC<ToggleRowProps> = ({
  icon,
  label,
  description,
  checked,
  onToggle,
  isLast,
}) => (
  <div
    className={`flex items-center gap-3 px-4.5 py-3 ${!isLast ? "border-b text-(--color-muted)" : ""}`}>
    <div className='shrink-0 w-7 h-7 flex items-center justify-center text-(--color-muted) opacity-60'>
      {icon}
    </div>
    <div className='flex-1 flex flex-col gap-0.5 min-w-0'>
      <span className='text-[12.5px] font-semibold text-(--color-foreground)'>
        {label}
      </span>
      <span className='text-[11px] text-(--color-text-placeholder)'>
        {description}
      </span>
    </div>
    <Toggle checked={checked} onToggle={onToggle} />
  </div>
);

const NotificationPreferencesCard: React.FC<
  NotificationPreferencesCardProps
> = ({ preferences, onToggle }) => {
  const toggle = (key: keyof NotificationPreferences) =>
    onToggle?.(key, !preferences[key]);

  return (
    <div className='bg-white border border-(--color-border) rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)]'>
      <div className='text-[13.5px] font-bold text-(--color-foreground) px-4.5 pt-4 pb-3 border-b border-(--color-border) tracking-tight'>
        Notification Preferences
      </div>
      <ToggleRow
        label='Email Notifications'
        description='Receive updates via email'
        checked={preferences.emailNotifications}
        onToggle={() => toggle("emailNotifications")}
        icon={
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
        }
      />
      <ToggleRow
        label='SMS Notifications'
        description='Receive text message alerts'
        checked={preferences.smsNotifications}
        onToggle={() => toggle("smsNotifications")}
        icon={
          <svg
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'>
            <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
          </svg>
        }
      />
      <ToggleRow
        label='Push Notifications'
        description='Browser push notifications'
        checked={preferences.pushNotifications}
        onToggle={() => toggle("pushNotifications")}
        isLast
        icon={
          <svg
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'>
            <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
            <path d='M13.73 21a2 2 0 0 1-3.46 0' />
          </svg>
        }
      />
    </div>
  );
};

export default NotificationPreferencesCard;
