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
  categoryId: string;
  status?: string;
}

export interface ErrandType {
  label: string;
  icon: string;
}
