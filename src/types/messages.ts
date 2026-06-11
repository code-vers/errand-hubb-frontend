// types/messages.ts
export type MessageStatus = "hired" | "active" | "completed" | "pending";
export type OnlineStatus = "online" | "offline";

export interface MessageUser {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  onlineStatus: OnlineStatus;
}

export interface PriorityMessage {
  id: string;
  user: MessageUser;
  status: MessageStatus;
  regarding: string;
  message: string;
  timeAgo: string;
  timestamp: string;
  isHired?: boolean;
}

export interface RecentMessage {
  id: string;
  user: MessageUser;
  regarding: string;
  message: string;
  timeAgo: string;
  timestamp: string;
}

export interface TaskDetails {
  id: string;
  client: MessageUser;
  category: string;
  status: "ASAP" | "Pending" | "Scheduled" | "Completed";
  title: string;
  description: string;
  location: string;
  budget: number;
  timestamp: string;
}

export interface ReplyMessage {
  id: string;
  recipient: MessageUser;
  category: string;
  timestamp: string;
}

// Real models from database
export interface ChatUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  role?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender: ChatUser;
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
