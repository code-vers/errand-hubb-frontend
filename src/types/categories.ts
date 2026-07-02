export type CategoryStatus = "active" | "inactive";
export type IconType = "emoji" | "url";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  iconType?: IconType;
  color?: string;
  emoji?: string;
  postsCount?: number;
  status: CategoryStatus;
  iconBgColor?: string;
  cardBgColor?: string;
}

export interface CategoryAction {
  type: "toggle_status" | "delete";
  label: string;
  ariaLabel: string;
}
