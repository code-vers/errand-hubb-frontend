"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import ProfileHeader from "./ProfileHeader";
import NotificationPreferencesCard from "./Notificationpreferencescard";
import QuickActionsCard from "./QuickActionsCard";
import AccountOverviewCard from "./Accountoverviewcard";
import PersonalInfoCard from "./Personalinfocard";
import PageHeader from "../PageHeader";
import { NotificationPreferences } from "@/types/profile";
import EditProfileModal from "./EditProfileModal";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const { data: profileData, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  if (isLoading) {
    return <div className="p-12 text-center">Loading profile...</div>;
  }

  const userData = profileData || user;

  const profileHeaderData = {
    name: `${userData?.firstName} ${userData?.lastName}`,
    avatar: userData?.profileImage || "",
    location: userData?.profile?.city ? `${userData.profile.city}, ${userData.profile.state}` : "Not set",
    email: userData?.email || "",
    phone: userData?.profile?.phone || "",
    memberSince: userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
    isActive: true,
  };

  const personalInfoData = {
    fullName: `${userData?.firstName} ${userData?.lastName}`,
    location: userData?.profile?.city ? `${userData.profile.city}, ${userData.profile.state}` : "Not set",
    email: userData?.email || "",
    phone: userData?.profile?.phone || "",
    preferredContact: userData?.profile?.preferredContact || userData?.email || "",
    timeZone: userData?.profile?.timeZone || "Not set",
  };

  const accountOverviewData = {
    totalPosts: 0, // Should come from actual stats API
    activePosts: 0,
    completedJobs: userData?.profile?.jobsCompleted || 0,
    totalHires: 0,
    memberSince: userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "New",
  };

  const handleImageUpload = (file: File) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    updateProfile(formData, {
      onSuccess: (response: any) => {
        // Update local auth context too
        if (user) {
          const updatedUser = { ...user, profileImage: response.data.profileImage };
          setUser(updatedUser);
          localStorage.setItem("errand_user", JSON.stringify(updatedUser));
        }
      }
    });
  };

  const handleUpdateProfile = async (data: any) => {
    updateProfile(data, {
      onSuccess: (response: any) => {
        // Update local auth context if needed
        if (user) {
          const updatedUser = { 
            ...user, 
            firstName: response.data.firstName, 
            lastName: response.data.lastName,
            profile: response.data.profile 
          };
          setUser(updatedUser);
          localStorage.setItem("errand_user", JSON.stringify(updatedUser));
        }
        setIsEditModalOpen(false);
      }
    });
  };

  const handleToggle = (key: keyof NotificationPreferences, value: boolean) => {
    // This would ideally be a separate setting in the DB
    console.log("Toggle notification", key, value);
  };

  return (
    <div className=' min-h-screen  py-5 px-12 font-sans'>
      <div className=' mx-auto flex flex-col gap-3.5'>
        <PageHeader title='Profile' />

        <ProfileHeader
          profile={profileHeaderData}
          onEditProfile={() => setIsEditModalOpen(true)}
          onImageUpload={handleImageUpload}
          isUpdating={isPending}
        />

        <div className='grid grid-cols-2 gap-3.5 max-sm:grid-cols-1 items-stretch'>
          <PersonalInfoCard info={personalInfoData} />
          <AccountOverviewCard overview={accountOverviewData} />
          <NotificationPreferencesCard
            preferences={{
              emailNotifications: true,
              smsNotifications: false,
              pushNotifications: true,
            }}
            onToggle={handleToggle}
          />
          <QuickActionsCard
            onPostOnBoard={() => router.push('/post-errand')}
            onViewMyPosts={() => router.push('/dashboard/my-posts')}
          />
        </div>
      </div>

      {isEditModalOpen && (
        <EditProfileModal
          user={userData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateProfile}
          isUpdating={isPending}
        />
      )}
    </div>
  );
}
