import { Category } from "./categories";

export interface PostUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  city: string;
  state: string;
  budget: string | null;
  dateNeeded: string | null;
  time: string | null;
  contactInfo: string | null;
  photoUrl: string | null;
  youtubeLink: string | null;
  status: string;
  createdAt: string;
  category: Category;
  user: PostUser;
}

export interface SearchFilters {
  search: string;
  categoryId: string;
  location: string;
  minBudget: string;
  maxBudget: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
