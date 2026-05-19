import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Briefcase, 
  Search, 
  History, 
  MessageSquare,
  Users,
  ShieldAlert,
  CreditCard
} from 'lucide-react';
import { SidebarMenuItem, UserRole } from '@/types/dashboard';

export const sidebarConfig: SidebarMenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['client', 'errand', 'admin'],
  },
  {
    title: 'Post New Errand',
    path: '/dashboard/post-errand',
    icon: Briefcase,
    roles: ['client'],
  },
  {
    title: 'My Errands',
    path: '/dashboard/my-errands',
    icon: History,
    roles: ['client'],
  },
  {
    title: 'Find Errands',
    path: '/dashboard/find-errands',
    icon: Search,
    roles: ['errand'],
  },
  {
    title: 'Active Tasks',
    path: '/dashboard/active-tasks',
    icon: Briefcase,
    roles: ['errand'],
  },
  {
    title: 'User Management',
    path: '/dashboard/users',
    icon: Users,
    roles: ['admin'],
    children: [
      {
        title: 'Clients',
        path: '/dashboard/users/clients',
        icon: User,
        roles: ['admin'],
      },
      {
        title: 'Errands',
        path: '/dashboard/users/errands',
        icon: User,
        roles: ['admin'],
      }
    ]
  },
  {
    title: 'System Logs',
    path: '/dashboard/logs',
    icon: ShieldAlert,
    roles: ['admin'],
  },
  {
    title: 'Messages',
    path: '/dashboard/messages',
    icon: MessageSquare,
    roles: ['client', 'errand', 'admin'],
  },
  {
    title: 'Payments',
    path: '/dashboard/payments',
    icon: CreditCard,
    roles: ['client', 'errand', 'admin'],
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: User,
    roles: ['client', 'errand', 'admin'],
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
    roles: ['client', 'errand', 'admin'],
  },
];

export const getSidebarItemsByRole = (role: UserRole): SidebarMenuItem[] => {
  return sidebarConfig.filter(item => item.roles.includes(role));
};
