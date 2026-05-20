import { SidebarMenuItem, UserRole } from "@/types/dashboard";
import {
  Briefcase,
  CreditCard,
  History,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
} from "lucide-react";

export const sidebarConfig: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["client", "errand", "admin"],
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: Briefcase,
    roles: ["client"],
  },
  {
    title: "Search Errandrs",
    path: "/dashboard/search-errands",
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
    title: "Security",
    path: "/dashboard/Security",
    icon: Briefcase,
    roles: ["client"],
  },
  {
    title: "User Management",
    path: "/dashboard/users",
    icon: Users,
    roles: ["admin"],
    children: [
      {
        title: "Clients",
        path: "/dashboard/users/clients",
        icon: User,
        roles: ["admin"],
      },
      {
        title: "Errands",
        path: "/dashboard/users/errands",
        icon: User,
        roles: ["admin"],
      },
    ],
  },
  {
    title: "System Logs",
    path: "/dashboard/logs",
    icon: ShieldAlert,
    roles: ["admin"],
  },
  {
    title: "Messages",
    path: "/dashboard/messages",
    icon: MessageSquare,
    roles: ["errand", "admin"],
  },
  {
    title: "Payments",
    path: "/dashboard/payments",
    icon: CreditCard,
    roles: ["errand", "admin"],
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: User,
    roles: ["errand", "admin"],
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
    roles: ["errand", "admin"],
  },
];

export const getSidebarItemsByRole = (role: UserRole): SidebarMenuItem[] => {
  return sidebarConfig.filter((item) => item.roles.includes(role));
};
