import { SidebarMenuItem, UserRole } from "@/types/dashboard";
import {
  Briefcase,
  CreditCard,
  History,
  LayoutDashboard,
  MessageSquare,
  MessageSquareText,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  Megaphone,
  MonitorPlay
} from "lucide-react";

export const sidebarConfig: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["errand", "admin"],
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: Briefcase,
    roles: ["client"],
  },
  {
    title: "Search Errandrs",
    path: "/dashboard/client-search-errands",
    icon: History,
    roles: ["client"],
  },
  {
    title: "My Posts",
    path: "/dashboard/my-posts",
    icon: Search,
    roles: ["client"],
  },
  {
    title: "Available Errands",
    path: "/dashboard/available-errands",
    icon: Briefcase,
    roles: ["errand"],
  },
  {
    title: "Service Requests",
    path: "/dashboard/service-requests",
    icon: Briefcase,
    roles: ["client"],
  },
  {
    title: "Client Requests",
    path: "/dashboard/client-requests",
    icon: Search,
    roles: ["errand"],
  },
  {
    title: "Security",
    path: "/dashboard/security",
    icon: Briefcase,
    roles: ["client", "errand"],
  },
  {
    title: "User Management",
    path: "/dashboard/users",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Post Management",
    path: "/dashboard/post-management",
    icon: MessageSquareText,
    roles: ["admin"],
  },
  {
    title: "Service Request Management",
    path: "/dashboard/service-request-management",
    icon: ShieldAlert,
    roles: ["admin"],
  },
  {
    title: "Category",
    path: "/dashboard/category",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    title: "Subscription Management",
    path: "/dashboard/subscription-management",
    icon: CreditCard,
    roles: ["admin"],
  },
  {
    title: "System Settings",
    path: "/dashboard/system-settings",
    icon: ShieldAlert,
    roles: ["admin"],
  },
  {
    title: "Subscription",
    path: "/dashboard/subscription",
    icon: CreditCard,
    roles: ["errand"],
  },
  {
    title: "Ads Subscription",
    path: "/dashboard/ads-subscription",
    icon: Megaphone,
    roles: ["client", "errand"],
  },
  {
    title: "My Ads",
    path: "/dashboard/my-ads",
    icon: MonitorPlay,
    roles: ["client", "errand"],
  },
  {
    title: "Global Messages",
    path: "/dashboard/admin-messages",
    icon: MessageSquareText,
    roles: ["admin"],
  },
  {
    title: "Messages",
    path: "/dashboard/messages",
    icon: MessageSquare,
    roles: ["client", "errand", "admin"],
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: User,
    roles: ["errand", "admin"],
  },
];

export const getSidebarItemsByRole = (role: UserRole): SidebarMenuItem[] => {
  return sidebarConfig.filter((item) => item.roles.includes(role));
};
