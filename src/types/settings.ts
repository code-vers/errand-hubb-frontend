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

// admin

export interface WebsiteSettings {
  siteName: string;
  siteUrl: string;
  supportEmail: string;
  siteDescription: string;
  maintenanceMode: boolean;
}

export interface SettingsFormData extends WebsiteSettings {
  id?: string;
  updatedAt?: string;
}

export interface SettingsFieldProps {
  id: string;
  label: string;
  type: "text" | "url" | "email" | "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

export interface SettingsToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";
