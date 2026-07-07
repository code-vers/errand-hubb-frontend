export interface UserProfile {
  name: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  memberSince: string;
  isActive: boolean;
}

export interface PersonalInfo {
  fullName: string;
  location: string;
  email: string;
  phone: string;
  preferredContact: string;
  timeZone: string;
}

export interface AccountOverview {
  totalPosts: number;
  activePosts: number;
  completedJobs: number;
  totalHires: number;
  memberSince: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  inAppNotifications: boolean;
}
