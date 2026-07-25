export interface Errand {
  id?: string;
  title: string;
  description: string;
  city: string;
  state: string;
  budget: string;
  dateNeeded: string;
  contactInfo: string;
  photoUrl: string;
  youtubeLink?: string;
  categoryId: string;
  status?: string;
  postState?: string;
}

export interface ErrandType {
  label: string;
  icon: string;
}
