export type ServiceRequestStatus =
  | "draft"
  | "active"
  | "in_discussion"
  | "assigned"
  | "completed"
  | "cancelled"
  | "expired";

export type UrgencyLevel = "low" | "normal" | "urgent" | "emergency";

export interface ServiceRequestCategory {
  id: string;
  name: string;
  icon?: string;
  iconType?: "emoji" | "url";
  color?: string;
}

export interface ServiceRequestUser {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  profileImage?: string | null;
  profile?: any;
}

export interface ServiceRequestConversation {
  id: string;
  errand: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string | null;
  };
  messages: Array<{
    id: string;
    content: string;
    createdAt: string;
  }>;
  _count?: {
    messages: number;
  };
  updatedAt: string;
}

export interface ServiceRequest {
  id: string;
  userId: string;
  title: string;
  description: string;
  categoryId: string;
  budget: string | null;
  city: string;
  state: string | null;
  dateNeeded: string | null;
  time: string | null;
  urgencyLevel: string;
  imageUrl: string | null;
  status: ServiceRequestStatus;
  createdAt: string;
  updatedAt: string;
  category: ServiceRequestCategory;
  user?: ServiceRequestUser;
  conversations?: ServiceRequestConversation[];
  _count?: {
    conversations: number;
  };
}

export interface ServiceRequestFilters {
  search: string;
  status: string;
  categoryId: string;
  city: string;
  page: number;
}

export const SERVICE_REQUEST_STATUSES: {
  value: ServiceRequestStatus;
  label: string;
  color: string;
  bg: string;
}[] = [
  { value: "draft", label: "Draft", color: "#6B7280", bg: "#F3F4F6" },
  { value: "active", label: "Active", color: "#22C55E", bg: "#F0FDF4" },
  {
    value: "in_discussion",
    label: "In Discussion",
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  { value: "assigned", label: "Assigned", color: "#A855F7", bg: "#FAF5FF" },
  { value: "completed", label: "Completed", color: "#16A34A", bg: "#DCFCE7" },
  { value: "cancelled", label: "Cancelled", color: "#EF4444", bg: "#FEF2F2" },
  { value: "expired", label: "Expired", color: "#F97316", bg: "#FFF7ED" },
];

export const URGENCY_LEVELS: {
  value: UrgencyLevel;
  label: string;
  color: string;
}[] = [
  { value: "low", label: "Low", color: "#6B7280" },
  { value: "normal", label: "Normal", color: "#3B82F6" },
  { value: "urgent", label: "Urgent", color: "#F97316" },
  { value: "emergency", label: "Emergency", color: "#EF4444" },
];
