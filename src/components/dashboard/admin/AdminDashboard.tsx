"use client";

import React from "react";
import {
  StatCardData,
  ActivityItem,
  GrowthData,
  WeeklyActivity,
} from "@/types/dashboard";
import StatCard from "./StatCard";
import UserJobGrowthChart from "./UserJobGrowthChart";
import WeeklyErrandActivity from "./WeeklyErrandActivity";
import RecentActivity from "./RecentActivity";

const AdminDashboard: React.FC = () => {
  // Mock data - Replace with API calls later
  const statsData: StatCardData[] = [
    {
      id: "1",
      icon: "users",
      label: "Total Users",
      value: 12480,
      trend: {
        direction: "up",
        percentage: 8.2,
        comparisonText: "vs last mo.",
      },
      iconBgColor: "bg-orange-50",
      iconColor: "text-primary",
      valueColor: "text-primary",
    },
    {
      id: "2",
      icon: "briefcase",
      label: "Total Errands",
      value: 6920,
      trend: {
        direction: "up",
        percentage: 5.1,
        comparisonText: "vs last mo.",
      },
      iconBgColor: "bg-blue-50",
      iconColor: "text-status-blue",
      valueColor: "text-primary",
    },
    {
      id: "3",
      icon: "trending-up",
      label: "Active Errands",
      value: 1834,
      trend: {
        direction: "up",
        percentage: 12.4,
        comparisonText: "vs last mo.",
      },
      iconBgColor: "bg-green-50",
      iconColor: "text-success",
      valueColor: "text-primary",
    },
    {
      id: "4",
      icon: "pause",
      label: "Paused Errands",
      value: 312,
      trend: {
        direction: "down",
        percentage: 3.6,
        comparisonText: "vs last mo.",
      },
      iconBgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      valueColor: "text-primary",
    },
    {
      id: "5",
      icon: "file-lines",
      label: "Total Open Posts",
      value: 4108,
      trend: {
        direction: "up",
        percentage: 2.9,
        comparisonText: "vs last mo.",
      },
      iconBgColor: "bg-purple-50",
      iconColor: "text-status-purple",
      valueColor: "text-primary",
    },
    {
      id: "6",
      icon: "circle-check",
      label: "Completed Jobs",
      value: 9654,
      trend: {
        direction: "up",
        percentage: 18.7,
        comparisonText: "vs last mo.",
      },
      iconBgColor: "bg-green-50",
      iconColor: "text-success",
      valueColor: "text-primary",
    },
  ];

  const growthData: GrowthData[] = [
    { month: "Jan", value: 800 },
    { month: "Feb", value: 960 },
    { month: "Mar", value: 1120 },
    { month: "Apr", value: 1040 },
    { month: "May", value: 1360 },
    { month: "Jun", value: 1520 },
  ];

  const weeklyActivity: WeeklyActivity[] = [
    { day: "Mon", value: 224 },
    { day: "Tue", value: 176 },
    { day: "Wed", value: 192 },
    { day: "Thu", value: 144 },
    { day: "Fri", value: 64 },
    { day: "Sat", value: 96 },
    { day: "Sun", value: 192 },
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: "1",
      user: { initials: "AT", name: "Alice Tan", avatarColor: "#f97316" },
      action: "New Client Registered",
      status: { label: "New", type: "new" },
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      timeAgo: "2m ago",
    },
    {
      id: "2",
      user: { initials: "BC", name: "Ben Cruz", avatarColor: "#22c55e" },
      action: "Job Completed #3087",
      status: { label: "Completed", type: "completed" },
      timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
      timeAgo: "8m ago",
    },
    {
      id: "3",
      user: { initials: "CR", name: "Chris Reyes", avatarColor: "#ef4444" },
      action: "Suspicious Activity Detected",
      status: { label: "Flagged", type: "flagged" },
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      timeAgo: "15m ago",
    },
    {
      id: "4",
      user: { initials: "DL", name: "Dan Lim", avatarColor: "#3b82f6" },
      action: "Errandr Approved",
      status: { label: "Approved", type: "approved" },
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      timeAgo: "30m ago",
    },
    {
      id: "5",
      user: { initials: "ES", name: "Eva Santos", avatarColor: "#eab308" },
      action: "Report Submitted",
      status: { label: "Report", type: "report" },
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      timeAgo: "1h ago",
    },
    {
      id: "6",
      user: { initials: "FG", name: "Frank Go", avatarColor: "#6b7280" },
      action: "Errandr Paused",
      status: { label: "Paused", type: "paused" },
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      timeAgo: "2h ago",
    },
  ];

  const handleViewAll = () => {
    // Navigate to full activity page or open modal
    console.log("View all activities clicked");
  };

  return (
    <div className='bg-amber-100 p-6 font-sans text-foreground'>
      <div className=' mx-auto space-y-6'>
        {/* Stats Grid */}
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
          {statsData.map((stat) => (
            <StatCard key={stat.id} data={stat} />
          ))}
        </section>

        {/* Charts Section */}
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <UserJobGrowthChart data={growthData} />
          <WeeklyErrandActivity data={weeklyActivity} />
        </section>

        {/* Recent Activity Section */}
        <RecentActivity
          activities={recentActivities}
          onViewAll={handleViewAll}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
