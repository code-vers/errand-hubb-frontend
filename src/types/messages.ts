export interface ChatUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  role: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: "text" | "image" | "voice" | "location" | "calendar";
  metadata?: any;
  isRead: boolean;
  createdAt: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string | null;
  };
}

export interface ChatConversation {
  id: string;
  clientId: string;
  errandId: string;
  createdAt: string;
  updatedAt: string;
  client: ChatUser;
  errand: ChatUser;
  messages: ChatMessage[];
  unreadCount?: number;
}

export interface TaskDetails {
  id: string;
  client: {
    id: string;
    name: string;
    avatar: string;
    onlineStatus: string;
  };
  category: string;
  status: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  timestamp: string;
}

}
