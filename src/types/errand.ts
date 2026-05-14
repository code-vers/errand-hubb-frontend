export interface Errand {
  title: string;
  description: string;
  city: string;
  state: string;
  budget: string;
  dateNeeded: string;
  contactInfo: string;
  photoUrl: string;
  type: string;
}

export interface ErrandType {
  label: string;
  icon: string;
}
