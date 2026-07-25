export type ErrandStatus =
  | "Pending Pickup"
  | "ASAP"
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export type PostStatus = "all" | "open" | "pending" | "completed" | "flagged";

export type PostType =
  | "Grocery Shopping"
  | "Package Delivery"
  | "Home Cleaning"
  | "Pet Care"
  | "Dry Cleaning"
  | "Food Pickup";

export type ServiceType = "Delivery" | "Pickup" | "Both";

export interface ErrandPost {
  id: string;
  title: string;
  type: string;
  description: string;
  reward: number;
  status: ErrandStatus;
  postState?: string;
  date: string;
  time: string;
  location: string;
  serviceType: ServiceType;
  assignedTo: string | null;
  icon: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    icon?: string;
    iconType?: "emoji" | "url";
    color?: string;
  };
}

export interface PostFilters {
  search: string;
  status: string;
  page: number;
}

export interface PostResponse {
  posts: ErrandPost[];
  total: number;
  page: number;
  totalPages: number;
}

export interface PostCategory {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  status: PostStatus;
  postState?: string;
  client: {
    id: string;
    name: string;
    initials: string;
    avatarColor: string;
  };
  category: string;
  date: string;
  budget: number;
  description?: string;
  location?: string;
  isActive: boolean;
}

export interface PostAction {
  type: "edit" | "mark_inactive" | "remove" | "mark_active";
  label: string;
  className: string;
  icon?: string;
}

export interface StatusTab {
  id: PostStatus;
  label: string;
  count: number;
}

export interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  activeFilters?: number;
}
