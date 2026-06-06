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
import { useChangePassword } from "@/hooks/useAuth";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import { profileService } from "@/services/profile.service";
import { toast } from "sonner";
import TwoFactorSetupModal from "./TwoFactorSetupModal";
import { useRouter } from "next/navigation";

interface SecurityPageProps {
  initialNotifications?: NotificationPreferences;
  initialActivities?: LoginActivity[];
}

const SecurityPage: FC<SecurityPageProps> = ({
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
  const { user, setUser, logout } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] =
    useState<NotificationPreferences>(initialNotifications);
  const [activities] = useState<LoginActivity[]>(initialActivities);
  const [loading, setLoading] = useState({
    twoFactor: false,
    notifications: false,
    activity: false,
    delete: false,
  });

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");

  const { mutateAsync: changePassword, isPending: isPasswordUpdating } = useChangePassword();

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
    } catch (error) {
      throw error;
    }
  };

  const handleTwoFactorToggle = async (enabled: boolean) => {
    try {
      setLoading((prev) => ({ ...prev, twoFactor: true }));
      if (enabled) {
        // Start enablement process
        const response = await authService.generate2FA();
        setQrCode(response.data.qrCode);
        setSecret(response.data.secret);
        setShow2FAModal(true);
      } else {
        // Disable process
        await authService.disable2FA();
        if (user) {
          const updatedUser = { ...user, isTwoFactorEnabled: false };
          setUser(updatedUser);
          localStorage.setItem("errand_user", JSON.stringify(updatedUser));
        }
        toast.success("Two-Factor Authentication disabled");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update 2FA status");
    } finally {
      setLoading((prev) => ({ ...prev, twoFactor: false }));
    }
  };

  const handleVerify2FA = async (code: string) => {
    try {
      setLoading((prev) => ({ ...prev, twoFactor: true }));
      await authService.enable2FA(code);
      if (user) {
        const updatedUser = { ...user, isTwoFactorEnabled: true };
        setUser(updatedUser);
        localStorage.setItem("errand_user", JSON.stringify(updatedUser));
      }
      setShow2FAModal(false);
      toast.success("Two-Factor Authentication enabled successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid verification code");
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

  const handleDeleteAccount = async (password: string, code: string) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      await profileService.deleteAccount({ password, code });
      toast.success("Account deleted successfully. We're sad to see you go.");
      logout();
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete account. Please check your password and code.");
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
              isLoading={isPasswordUpdating}
            />
            <TwoFactorSection
              enabled={user?.isTwoFactorEnabled || false}
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
            <LoginActivitySection />
            <DangerZoneSection
              onDeleteAccount={handleDeleteAccount}
              isLoading={loading.delete}
            />
          </div>
        </div>
      </div>

      {show2FAModal && (
        <TwoFactorSetupModal
          qrCode={qrCode}
          secret={secret}
          onClose={() => setShow2FAModal(false)}
          onVerify={handleVerify2FA}
          isVerifying={loading.twoFactor}
        />
      )}
    </div>
  );
};

export default SecurityPage;
