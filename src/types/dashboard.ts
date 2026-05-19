import { LucideIcon } from 'lucide-react';

export type UserRole = 'client' | 'errand' | 'admin';

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
