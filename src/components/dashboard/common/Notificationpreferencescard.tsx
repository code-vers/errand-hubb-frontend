import { NotificationPreferences } from "@/types/profile";
import { Bell, Mail, MessageSquare } from "lucide-react";
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
    className={`flex items-center gap-3 px-4.5 py-3 ${!isLast ? "border-b border-[#F5E9D3] text-(--color-muted)" : ""}`}>
    <div
      className={`shrink-0 w-10 h-10 flex items-center justify-center font-bold transition-colors duration-200 ${
        checked ? "bg-[#FFF3CD99] text-[#EC6F27]" : "bg-[#F1F5F9] text-[#94A3B8]"
      }`}>
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
    <div className='bg-white border border-[#F5E9D3] rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)]'>
      <div className='text-[18px] font-semibold text-foreground px-4.5 pt-4 pb-3 border-b border-[#F5E9D3] tracking-tight'>
        Notification Preferences
      </div>
      <ToggleRow
        label='Email Notifications'
        description='Receive updates via email'
        checked={preferences.emailNotifications}
        onToggle={() => toggle("emailNotifications")}
        icon={<Mail size={16} strokeWidth={2} />}
      />
      <ToggleRow
        label='SMS Notifications'
        description='Receive text message alerts'
        checked={preferences.smsNotifications}
        onToggle={() => toggle("smsNotifications")}
        icon={<MessageSquare size={16} strokeWidth={2} />}
      />
      <ToggleRow
        label='Push Notifications'
        description='Browser push notifications'
        checked={preferences.pushNotifications}
        onToggle={() => toggle("pushNotifications")}
        isLast
        icon={<Bell size={16} strokeWidth={2} />}
      />
    </div>
  );
};

export default NotificationPreferencesCard;
