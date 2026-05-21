"use client";

import { FC } from "react";
import { Bell, Mail, MessageSquare, Smartphone, Megaphone } from "lucide-react";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import type { NotificationPreferences } from "@/types/settings";

interface NotificationsSectionProps {
  preferences: NotificationPreferences;
  onSave: (preferences: NotificationPreferences) => Promise<void>;
  isLoading?: boolean;
}

const NotificationsSection: FC<NotificationsSectionProps> = ({
  preferences,
  onSave,
  isLoading = false,
}) => {
  const handleToggle = (key: keyof NotificationPreferences) => {
    // This would typically update local state and then save
  };

  const notificationItems = [
    {
      key: "email" as const,
      icon: Mail,
      iconColor: "text-blue-400",
      label: "Email Notifications",
      description:
        "Updates, confirmations, and account alerts sent to your email.",
    },
    {
      key: "sms" as const,
      icon: MessageSquare,
      iconColor: "text-teal-400",
      label: "SMS Notifications",
      description:
        "Text message alerts for task assignments and urgent updates.",
    },
    {
      key: "push" as const,
      icon: Smartphone,
      iconColor: "text-blue-500",
      label: "Push Notifications",
      description: "Real-time alerts on your browser or mobile app.",
    },
    {
      key: "marketing" as const,
      icon: Megaphone,
      iconColor: "text-blue-300",
      label: "Marketing & Promotions",
      description: "Receive news, offers, and featured Errand Hubb spotlights.",
    },
  ];

  const handleSave = async () => {
    try {
      await onSave(preferences);
    } catch (error) {
      console.error("Failed to save notification preferences:", error);
    }
  };

  return (
    <section className='bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex flex-col'>
      <header className='flex items-start gap-4 p-6 border-b border-[#f5ebd8]'>
        <div className='bg-cyan-50 p-3 rounded-lg shrink-0'>
          <Bell className='w-6 h-6 text-cyan-500' />
        </div>
        <div>
          <h2 className='text-[16px] font-semibold text-(--color-foreground)]'>
            Notification Preferences
          </h2>
          <p className='text-sm text-[#6B6B6B] mt-1'>
            Control how Errand Hubb contacts you.
          </p>
        </div>
      </header>

      <div className='flex flex-col gap-4 p-6'>
        {notificationItems.map((item) => (
          <div
            key={item.key}
            className='flex items-center justify-between py-2'>
            <div className='flex items-start gap-3'>
              <div className={`${item.iconColor} mt-0.5`}>
                <item.icon className='w-5 h-5' />
              </div>
              <div>
                <h3 className='text-sm font-semibold text-[var(--color-foreground)]'>
                  {item.label}
                </h3>
                <p className='text-xs text-[var(--color-text-secondary)] mt-0.5'>
                  {item.description}
                </p>
              </div>
            </div>

            <ToggleSwitch
              checked={preferences[item.key]}
              onChange={(checked) => handleToggle(item.key)}
              id={`toggle_${item.key}`}
              name={`toggle_${item.key}`}
            />
          </div>
        ))}
      </div>

      <footer className='flex justify-end p-6 border-t border-[#f5ebd8]'>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className='bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed'>
          {isLoading ? "SAVING..." : "SAVE PREFERENCES"}
        </button>
      </footer>
    </section>
  );
};

export default NotificationsSection;
