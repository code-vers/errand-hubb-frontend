export interface User {
  id: string;
  initials: string;
  name: string;
  email: string;
  postsCount: number;
  status: UserStatus;
  joinedDate: string;
  avatarColor: string;
  role?: "client" | "errand" | "errandr";
  avatarUrl?: string;
  rating?: number;
  services?: string[];
  totalEarnings?: number;
  jobsCompleted?: number;
  visibility?: "public" | "private";
}

export type UserStatus = "active" | "deactivated" | "pending";

export interface UserAction {
  type: "edit" | "deactivate" | "activate" | "remove_profile" | "pause" | "mark_unpaid" | "approve";
  label: string;
  className: string;
}

export interface TableColumn {
  key: keyof User | "actions";
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  activeFilters?: number;
}

export interface NavigationTab {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
}
