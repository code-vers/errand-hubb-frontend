"use client";

import React, { useState } from "react";

import {
  UserProfile,
  PersonalInfo,
  AccountOverview,
  NotificationPreferences,
} from "@/types/profile";
import ProfileHeader from "./ProfileHeader";
import NotificationPreferencesCard from "./Notificationpreferencescard";
import QuickActionsCard from "./QuickActionsCard";
import AccountOverviewCard from "./Accountoverviewcard";
import PersonalInfoCard from "./Personalinfocard";

// Mock data (replace with API later)
const mockProfile: UserProfile = {
  name: "Alex Johnson",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  location: "Austin, Texas, USA",
  email: "alex.monroe@email.com",
  phone: "+1 (512) 867-5309",
  memberSince: "March 2023",
  isActive: true,
};

const mockPersonalInfo: PersonalInfo = {
  fullName: "Alexandra Monroe",
  location: "Austin, Texas, USA",
  email: "alex.monroe@email.com",
  phone: "+1 (512) 867-5309",
  preferredContact: "alex.monroe@email.com",
  timeZone: "Central Time (CT) — UTC-6",
};

const mockAccountOverview: AccountOverview = {
  totalPosts: 24,
  activePosts: 6,
  completedJobs: 18,
  totalHires: 12,
  memberSince: "Mar 2026",
};

const mockNotifications: NotificationPreferences = {
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
};

export default function ProfilePage() {
  const [profile] = useState(mockProfile);
  const [personalInfo] = useState(mockPersonalInfo);
  const [accountOverview] = useState(mockAccountOverview);
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleToggle = (key: keyof NotificationPreferences, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    // TODO: PATCH /api/profile/notifications
  };

  return (
    <div className=' min-h-screen  py-5 px-12 font-sans'>
      <div className=' mx-auto flex flex-col gap-3.5'>
        <ProfileHeader
          profile={profile}
          onEditProfile={() => alert("Edit Profile")}
        />

        <div className='grid grid-cols-2 gap-3.5 max-sm:grid-cols-1 items-stretch'>
          <PersonalInfoCard info={personalInfo} />
          <AccountOverviewCard overview={accountOverview} />
          <NotificationPreferencesCard
            preferences={notifications}
            onToggle={handleToggle}
          />
          <QuickActionsCard
            onPostOnBoard={() => alert("Post on Board")}
            onViewMyPosts={() => alert("View My Posts")}
          />
        </div>
      </div>
    </div>
  );
}
