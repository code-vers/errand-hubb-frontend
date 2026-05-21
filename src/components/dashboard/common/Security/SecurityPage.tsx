"use client";

import { FC, useState } from "react";
import PasswordSection from "./PasswordSection";
import TwoFactorSection from "./TwoFactorSection";
import NotificationsSection from "./NotificationsSection";
import LoginActivitySection from "./LoginActivitySection";
import DangerZoneSection from "./DangerZoneSection";
import type {
  PasswordFormData,
  NotificationPreferences,
  LoginActivity,
} from "@/types/settings";
import PageHeader from "../PageHeader";

interface SecurityPageProps {
  initialTwoFactorEnabled?: boolean;
  initialNotifications?: NotificationPreferences;
  initialActivities?: LoginActivity[];
}

const SecurityPage: FC<SecurityPageProps> = ({
  initialTwoFactorEnabled = false,
  initialNotifications = {
    email: true,
    sms: false,
    push: true,
    marketing: false,
  },
  initialActivities = [
    {
      id: "1",
      device: "MacBook Pro",
      deviceIcon: "laptop",
      browser: "Chrome on macOS",
      location: "Austin, TX",
      timestamp: "Today at 10:45 AM",
      status: "current",
    },
    {
      id: "2",
      device: "iPhone 15 Pro",
      deviceIcon: "smartphone",
      browser: "Safari on iOS",
      location: "Austin, TX",
      timestamp: "Yesterday at 8:20 PM",
      status: "active",
    },
  ],
}) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    initialTwoFactorEnabled,
  );
  const [notifications, setNotifications] =
    useState<NotificationPreferences>(initialNotifications);
  const [activities] = useState<LoginActivity[]>(initialActivities);
  const [loading, setLoading] = useState({
    password: false,
    twoFactor: false,
    notifications: false,
    activity: false,
    delete: false,
  });

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    setLoading((prev) => ({ ...prev, password: true }));
    try {
      console.log("Password update:", data);
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  };

  const handleTwoFactorToggle = async (enabled: boolean) => {
    setLoading((prev) => ({ ...prev, twoFactor: true }));
    try {
      setTwoFactorEnabled(enabled);
    } finally {
      setLoading((prev) => ({ ...prev, twoFactor: false }));
    }
  };

  const handleNotificationsSave = async (
    preferences: NotificationPreferences,
  ) => {
    setLoading((prev) => ({ ...prev, notifications: true }));
    try {
      setNotifications(preferences);
    } finally {
      setLoading((prev) => ({ ...prev, notifications: false }));
    }
  };

  const handleActivityRefresh = async () => {
    setLoading((prev) => ({ ...prev, activity: true }));
    try {
      // Refresh logic
    } finally {
      setLoading((prev) => ({ ...prev, activity: false }));
    }
  };

  const handleDeleteAccount = async () => {
    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      // Delete logic
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <div className='min-h-screen py-5 px-12 font-sans'>
      <div className='mx-auto flex flex-col gap-3.5'>
        <PageHeader title='Security' />

        <div className=' gap-3.5 items-stretch'>
          <div className='flex flex-col gap-3.5'>
            <PasswordSection
              onSubmit={handlePasswordSubmit}
              isLoading={loading.password}
            />
            <TwoFactorSection
              enabled={twoFactorEnabled}
              onToggle={handleTwoFactorToggle}
              isLoading={loading.twoFactor}
            />
          </div>

          <div className='flex flex-col gap-3.5'>
            <NotificationsSection
              preferences={notifications}
              onSave={handleNotificationsSave}
              isLoading={loading.notifications}
            />
            <LoginActivitySection
              activities={activities}
              onRefresh={handleActivityRefresh}
              isLoading={loading.activity}
            />
            <DangerZoneSection
              onDeleteAccount={handleDeleteAccount}
              isLoading={loading.delete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
