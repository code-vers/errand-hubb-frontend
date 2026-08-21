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
  type: "text" | "image" | "video" | "voice" | "file" | "location" | "calendar" | string;
  metadata?: any;
  isRead: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  deletedFor?: string[];
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

export interface PriorityMessage {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    onlineStatus: "online" | "offline";
    initials?: string;
  };
  status: string;
  regarding: string;
  message: string;
  timeAgo: string;
  timestamp: string;
  isHired?: boolean;
}

export interface RecentMessage {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    onlineStatus: "online" | "offline";
    initials?: string;
  };
  regarding: string;
  message: string;
  timeAgo: string;
  timestamp: string;
}

export interface ReplyMessage {
  id: string;
  recipient: {
    id: string;
    name: string;
    avatar: string;
    initials?: string;
  };
  timestamp: string;
  category: string;
}
