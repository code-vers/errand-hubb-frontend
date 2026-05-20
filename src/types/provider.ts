export interface ServiceProvider {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  category: string;
  title: string;
  description: string;
  skills: string[];
  jobCount: number;
  responseTime: string;
  startingPrice: number;
  isVerified: boolean;
}

export interface ProviderFilters {
  search: string;
  category: string;
  sortBy: "highest_rated" | "lowest_price" | "highest_price" | "most_jobs";
  page: number;
}

export interface ProviderResponse {
  providers: ServiceProvider[];
  total: number;
  page: number;
  totalPages: number;
}
