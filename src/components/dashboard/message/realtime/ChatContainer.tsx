"use client";

import { FC, useState, useEffect, useCallback, useRef } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { messageService } from "@/services/message.service";
import { ChatConversation, ChatMessage } from "@/types/messages";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ChatContainer: FC = () => {
  const { user } = useAuth();
  const { on, off, emit, isConnected } = useSocket();
  const searchParams = useSearchParams();
  const convIdFromUrl = searchParams.get("convId");
  const errandIdFromUrl = searchParams.get("errandId");

  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConvId, setSelectedId] = useState<string | null>(null);
  const [activeConversation, setActiveConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [isTyping, setIsTyping] = useState<Record<string, boolean>>({});

  const initialLoadDone = useRef(false);

  // Fetch all conversations
  const fetchConversations = useCallback(async (isInitial = false) => {
    if (!user) return;
    
    setIsRefreshing(true);
    
    try {
      const response = await messageService.getConversations();
      
      if (response && response.success) {
        const fetchedConversations = response.data || [];
        setConversations(fetchedConversations);
        
        if (isInitial || errandIdFromUrl || convIdFromUrl) {
          if (convIdFromUrl) {
            setSelectedId(convIdFromUrl);
          } else if (errandIdFromUrl) {
            const existing = fetchedConversations.find(
              (c: any) => c.errandId === errandIdFromUrl || c.clientId === errandIdFromUrl
            );
            
            if (existing) {
              setSelectedId(existing.id);
            } else {
              try {
                const startResp = await messageService.startConversation(errandIdFromUrl);
                if (startResp && startResp.success) {
                  const newConv = startResp.data;
                  setConversations(prev => {
                    if (prev.find(c => c.id === newConv.id)) return prev;
                    return [newConv, ...prev];
                  });
                  setSelectedId(newConv.id);
                  setActiveConversation(newConv);
                }
              } catch (startErr: any) {
                console.error("CHAT: Failed to start conversation:", startErr);
              }
            }
          }
        }
      }
    } catch (error: any) {
      console.error("CHAT: Failed to fetch conversations:", error);
    } finally {
      setIsRefreshing(false);
      initialLoadDone.current = true;
    }
  }, [user, convIdFromUrl, errandIdFromUrl]);

  useEffect(() => {
    if (user && !initialLoadDone.current) {
      fetchConversations(true);
    }
  }, [user, fetchConversations]);

  useEffect(() => {
    if (selectedConvId) {
      const found = conversations.find(c => c.id === selectedConvId);
      if (found) {
        setActiveConversation(found);
      }
    }
  }, [selectedConvId, conversations]);

  useEffect(() => {
    if (selectedConvId && isConnected) {
      const fetchMessages = async () => {
        setIsLoadingMessages(true);
        try {
          const response = await messageService.getMessages(selectedConvId);
          if (response && response.success) {
            setMessages(response.data);
            emit("join_conversation", { conversationId: selectedConvId });
            // Emit mark_read when we open a conversation to notify the sender
            emit("mark_read", { conversationId: selectedConvId });
          }
        } catch (error: any) {
          console.error("CHAT: Failed to fetch messages:", error);
        } finally {
          setIsLoadingMessages(false);
        }
      };

      fetchMessages();

      return () => {
        emit("leave_conversation", { conversationId: selectedConvId });
      };
    }
  }, [selectedConvId, emit, isConnected]);

  useEffect(() => {
    if (!isConnected) return;

    const handleNewMessage = (message: ChatMessage) => {
      if (message.conversationId === selectedConvId) {
        setMessages((prev) => {
          if (prev.find(m => m.id === message.id)) return prev;
          return [...prev, message];
        });
        
        // If it's a message from someone else in the current active chat, mark it as read immediately
        if (message.senderId !== user?.id) {
          emit("mark_read", { conversationId: selectedConvId });
        }
      }
      
      setConversations((prev) => {
        const index = prev.findIndex((c) => c.id === message.conversationId);
        if (index !== -1) {
          const updated = [...prev];
          const conv = { ...updated[index] };
          conv.messages = [message];
          conv.updatedAt = message.createdAt;
          // If we are not currently viewing this conversation, increment unread count
          if (message.conversationId !== selectedConvId && message.senderId !== user?.id) {
             conv.unreadCount = (conv.unreadCount || 0) + 1;
          }
          updated.splice(index, 1);
          return [conv, ...updated];
        } else {
          fetchConversations();
          return prev;
        }
      });
    };

    const handleMessageUpdated = (updatedMessage: ChatMessage) => {
      if (updatedMessage.conversationId === selectedConvId) {
        setMessages((prev) => prev.map(m => m.id === updatedMessage.id ? updatedMessage : m));
      }
    };

    const handleMessageDeleted = (data: { messageId: string }) => {
      setMessages((prev) => prev.filter(m => m.id !== data.messageId));
    };

    const handleUserTyping = (data: { userId: string; isTyping: boolean }) => {
      setIsTyping(prev => ({
        ...prev,
        [data.userId]: data.isTyping
      }));
    };

    const handleMessagesRead = (data: { conversationId: string; readBy: string }) => {
      if (data.conversationId === selectedConvId) {
        setMessages(prev => prev.map(m => (m.senderId !== data.readBy && !m.isRead) ? { ...m, isRead: true } : m));
      }
      
      setConversations(prev => prev.map(c => {
         if (c.id === data.conversationId) {
            return { ...c, unreadCount: 0 };
         }
         return c;
      }));
    };

    on("new_message", handleNewMessage);
    on("message_updated", handleMessageUpdated);
    on("message_deleted", handleMessageDeleted);
    on("user_typing", handleUserTyping);
    on("messages_read", handleMessagesRead);

    return () => {
      off("new_message", handleNewMessage);
      off("message_updated", handleMessageUpdated);
      off("message_deleted", handleMessageDeleted);
      off("user_typing", handleUserTyping);
      off("messages_read", handleMessagesRead);
    };
  }, [selectedConvId, isConnected, on, off, fetchConversations, emit, user]);

  const handleSendMessage = (content: string, type: string = "text", metadata?: any) => {
    if (selectedConvId && isConnected) {
      emit("send_message", {
        conversationId: selectedConvId,
        content,
        type,
        metadata
      });
    } else {
      toast.error("Not connected to chat server");
    }
  };

  const handleMessageAction = (action: 'pin' | 'unsend' | 'delete_for_me', messageId: string) => {
    if (isConnected) {
      emit("message_action", { action, messageId });
    } else {
      toast.error("Not connected to chat server");
    }
  };

  const handleTyping = (isTypingStatus: boolean) => {
    if (selectedConvId && isConnected) {
      emit("typing", {
        conversationId: selectedConvId,
        isTyping: isTypingStatus
      });
    }
  };

  const handleUploadFile = async (file: File) => {
    try {
      const response = await messageService.uploadFile(file);
      if (response && response.data) {
        const type = file.type.startsWith('image/') ? 'image' : 'voice';
        handleSendMessage(file.name, type, { 
          url: response.data.url,
          mimetype: file.type,
          size: file.size
        });
        return response.data.url;
      }
    } catch (error: any) {
      toast.error("Failed to upload file");
      throw error;
    }
  };

  if (isRefreshing && !initialLoadDone.current) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-2xl border border-gray-100 shadow-sm">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-gray-500 font-medium">Loading your conversations...</p>
      </div>
    );
  }

  return (
    <div className='flex h-[calc(100vh-140px)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
      <div className='w-1/3 lg:w-1/4 h-full'>
        <ChatList
          conversations={conversations}
          selectedId={selectedConvId}
          onSelect={setSelectedId}
          currentUserId={user?.id || ""}
        />
      </div>
      <div className='flex-1 h-full'>
        <ChatWindow
          conversation={activeConversation}
          messages={messages}
          currentUserId={user?.id || ""}
          onSendMessage={handleSendMessage}
          onMessageAction={handleMessageAction}
          onTyping={handleTyping}
          onUploadFile={handleUploadFile}
          otherUserTyping={activeConversation ? (activeConversation.clientId === user?.id ? isTyping[activeConversation.errandId] : isTyping[activeConversation.clientId]) : false}
          isLoading={isLoadingMessages}
          isConnected={isConnected}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
