export type PostStatus =
  | "Pending Pickup"
  | "ASAP"
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "Cancelled";

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
  type: PostType;
  description: string;
  reward: number;
  status: PostStatus;
  date: string;
  time: string;
  location: string;
  serviceType: ServiceType;
  assignedTo: string | null;
  icon: string;
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
