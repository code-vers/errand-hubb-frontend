export interface ErrandRunner {
  id: number;
  name: string;
  location: string;
  bio: string;
  tags: string[];
  avatar: string;
  videoThumb: string;
}

export interface SearchFilters {
  errandType: string;
  city: string;
  state: string;
}
