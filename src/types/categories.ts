export type CategoryStatus = "active" | "inactive";

export interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
  postsCount: number;
  status: CategoryStatus;
  iconBgColor: string;
  cardBgColor?: string;
}

export interface CategoryAction {
  type: "toggle_status" | "delete";
  label: string;
  ariaLabel: string;
}
