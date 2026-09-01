"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useMyPosts } from "@/hooks/usePosts";
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
  const { data: myPosts } = useMyPosts();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState({
    emailNotifications: true,
    inAppNotifications: true,
  });
  const router = useRouter();

  React.useEffect(() => {
    const savedPrefs = localStorage.getItem('errand_notif_prefs');
    if (savedPrefs) {
      try {
        setNotifPrefs(JSON.parse(savedPrefs));
      } catch (e) {}
    }
  }, []);

  if (isLoading) {
    return <div className="p-12 text-center">Loading profile...</div>;
  }

  const userData = profileData || user;
  const userPostsArray = Array.isArray(myPosts) ? myPosts : [];

  const realTotalPosts = userPostsArray.length > 0
    ? userPostsArray.length
    : (userData?.stats?.totalPosts ?? 0);

  const realActivePosts = userPostsArray.length > 0
    ? userPostsArray.filter((p: any) => p.status === 'active' || p.postState === 'active').length
    : (userData?.stats?.activePosts ?? 0);

  const realCompletedJobs = userPostsArray.length > 0
    ? userPostsArray.filter((p: any) => p.status === 'completed').length
    : (userData?.stats?.completedJobs ?? (userData?.profile?.jobsCompleted || 0));

  const realTotalHires = userPostsArray.length > 0
    ? userPostsArray.filter((p: any) => !!p.assignedToId || p.status === 'assigned').length
    : (userData?.stats?.totalHires ?? 0);

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
    totalPosts: realTotalPosts,
    activePosts: realActivePosts,
    completedJobs: realCompletedJobs,
    totalHires: realTotalHires,
    rating: userData?.rating || userData?.stats?.rating || 0,
    reviewCount: userData?.reviewCount || userData?.stats?.reviewCount || 0,
    userId: userData?.id,
    userName: `${userData?.firstName || ''} ${userData?.lastName || ''}`.trim(),
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
    const newPrefs = { ...notifPrefs, [key]: value };
    setNotifPrefs(newPrefs);
    localStorage.setItem('errand_notif_prefs', JSON.stringify(newPrefs));
    window.dispatchEvent(new Event('notif_prefs_updated'));
  };

  return (
    <div className='min-h-screen py-4 sm:py-5 px-3 sm:px-6 md:px-12 font-sans'>
      <div className='mx-auto flex flex-col gap-3.5 max-w-7xl'>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1 sm:mb-2">
          <PageHeader title='Profile' />
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold w-fit ${user?.role === 'errand' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
            {user?.role === 'errand' ? 'Welcome to Errand Profile' : 'Welcome to Client Profile'}
          </div>
        </div>

        <ProfileHeader
          profile={profileHeaderData}
          onEditProfile={() => setIsEditModalOpen(true)}
          onImageUpload={handleImageUpload}
          isUpdating={isPending}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-stretch'>
          <PersonalInfoCard info={personalInfoData} />
          <AccountOverviewCard overview={accountOverviewData} />
          <NotificationPreferencesCard
            preferences={notifPrefs}
            onToggle={handleToggle}
          />
          {user?.role === 'client' && (
            <QuickActionsCard
              userRole={user?.role}
              onPostOnBoard={() => router.push('/post-errand')}
              onViewMyPosts={() => router.push('/dashboard/my-posts')}
            />
          )}
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
