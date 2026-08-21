import { LucideIcon } from "lucide-react";

export type UserRole = "client" | "errand" | "admin";

export interface SidebarMenuItem {
  title: string;
  path: string;
  icon: LucideIcon;
  roles: UserRole[];
  children?: SidebarMenuItem[];
}

export interface SidebarConfig {
  [key: string]: SidebarMenuItem[];
}

// types/dashboard.ts
export type TaskStatus = "ASAP" | "Pending" | "Scheduled" | "Completed";

export interface Client {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  client: Client;
  status: TaskStatus;
  title: string;
  description: string;
  createdAt: string;
  timeAgo: string;
}

export interface HiredBanner {
  clientName: string;
  hiredDate: string;
  message: string;
  clientId?: string;
}

export interface DashboardData {
  hiredBanner: HiredBanner;
  tasks: Task[];
  totalPosts: number;
}

// admin

export interface StatCardData {
  id: string;
  icon: string;
  label: string;
  value: number;
  trend: {
    direction: "up" | "down";
    percentage: number;
    comparisonText: string;
  };
  iconBgColor: string;
  iconColor: string;
  valueColor: string;
}

export interface ActivityItem {
  id: string;
  user: {
    initials: string;
    name: string;
    avatarColor: string;
  };
  action: string;
  status: {
    label: string;
    type: "new" | "completed" | "flagged" | "approved" | "report" | "paused";
  };
  timestamp: string;
  timeAgo: string;
}

export interface GrowthData {
  month: string;
  value: number;
}

export interface WeeklyActivity {
  day: string;
  value: number;
}


// dsfadsffd
