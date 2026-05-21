// types/settings.ts
export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
}

export interface LoginActivity {
  id: string;
  device: string;
  browser: string;
  location: string;
  timestamp: string;
  status: "current" | "active" | "ended" | "suspicious";
  deviceIcon: "laptop" | "smartphone" | "monitor" | "tablet" | "globe";
}

export interface TwoFactorAuthState {
  enabled: boolean;
}
