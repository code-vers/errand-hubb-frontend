"use client";

import React, { useState, useEffect } from "react";
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
import { dashboardService } from "@/services/dashboardService";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState<StatCardData[]>([]);
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity[]>([]);
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await dashboardService.getAdminStats();
      
      const newStats: StatCardData[] = [
        {
          id: "1",
          icon: "users",
          label: "Total Users",
          value: data.stats.totalUsers,
          trend: { direction: "up", percentage: 0, comparisonText: "live data" },
          iconBgColor: "bg-orange-50",
          iconColor: "text-primary",
          valueColor: "text-primary",
        },
        {
          id: "2",
          icon: "briefcase",
          label: "Merchandise Orders",
          value: data.stats.totalMerchandiseOrders,
          trend: { direction: "up", percentage: 0, comparisonText: "live data" },
          iconBgColor: "bg-blue-50",
          iconColor: "text-status-blue",
          valueColor: "text-primary",
        },
        {
          id: "3",
          icon: "trending-up",
          label: "Active Errands",
          value: data.stats.activeErrands,
          trend: { direction: "up", percentage: 0, comparisonText: "live data" },
          iconBgColor: "bg-green-50",
          iconColor: "text-success",
          valueColor: "text-primary",
        },
        {
          id: "4",
          icon: "pause",
          label: "Total Revenue",
          value: data.stats.totalRevenue,
          trend: { direction: "up", percentage: 0, comparisonText: "live data" },
          iconBgColor: "bg-yellow-50",
          iconColor: "text-yellow-600",
          valueColor: "text-primary",
        },
        {
          id: "5",
          icon: "file-lines",
          label: "Total Open Posts",
          value: data.stats.totalOpenPosts,
          trend: { direction: "up", percentage: 0, comparisonText: "live data" },
          iconBgColor: "bg-purple-50",
          iconColor: "text-status-purple",
          valueColor: "text-primary",
        },
        {
          id: "6",
          icon: "circle-check",
          label: "Completed Jobs",
          value: data.stats.completedJobs,
          trend: { direction: "up", percentage: 0, comparisonText: "live data" },
          iconBgColor: "bg-green-50",
          iconColor: "text-success",
          valueColor: "text-primary",
        },
      ];

      setStatsData(newStats);
      setGrowthData(data.growthData);
      setWeeklyActivity(data.weeklyActivity);
      setRecentActivities(data.recentActivities);
      
    } catch (error) {
      console.error("Failed to fetch admin stats", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewAll = () => {
    console.log("View all activities clicked");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full">
        <Loader2 className="w-12 h-12 text-[#EC6F27] animate-spin" />
        <p className="mt-4 text-gray-500 font-bold">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className='bg-amber-100 p-6 font-sans text-foreground'>
      <div className=' mx-auto space-y-6'>
        {/* Stats Grid */}
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
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
