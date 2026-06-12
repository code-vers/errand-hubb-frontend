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
    if (!user) {
      console.log("CHAT: No user found, skipping fetch");
      return;
    }
    
    console.log("CHAT: Fetching conversations for user:", user.id);
    setIsRefreshing(true);
    
    try {
      const response = await messageService.getConversations();
      console.log("CHAT: Fetch response:", response);
      
      if (response && response.success) {
        const fetchedConversations = response.data || [];
        console.log(`CHAT: Found ${fetchedConversations.length} conversations`);
        setConversations(fetchedConversations);
        
        // Only handle URL params on initial load or if they just changed
        if (isInitial || errandIdFromUrl || convIdFromUrl) {
          if (convIdFromUrl) {
            console.log("CHAT: Selecting from URL convId:", convIdFromUrl);
            setSelectedId(convIdFromUrl);
          } else if (errandIdFromUrl) {
            console.log("CHAT: Handling URL errandId:", errandIdFromUrl);
            // Check if conversation already exists with this person
            const existing = fetchedConversations.find(
              (c: any) => c.errandId === errandIdFromUrl || c.clientId === errandIdFromUrl
            );
            
            if (existing) {
              console.log("CHAT: Found existing conversation:", existing.id);
              setSelectedId(existing.id);
            } else {
              // Start new one
              console.log("CHAT: No existing conversation. Starting new one with:", errandIdFromUrl);
              try {
                const startResp = await messageService.startConversation(errandIdFromUrl);
                console.log("CHAT: startConversation response:", startResp);
                
                if (startResp && startResp.success) {
                  const newConv = startResp.data;
                  setConversations(prev => {
                    if (prev.find(c => c.id === newConv.id)) return prev;
                    return [newConv, ...prev];
                  });
                  setSelectedId(newConv.id);
                  setActiveConversation(newConv);
                  toast.success("Conversation started");
                }
              } catch (startErr: any) {
                console.error("CHAT: Failed to start conversation:", startErr);
                toast.error(startErr.message || "Failed to start conversation");
              }
            }
          }
        }
      }
    } catch (error: any) {
      console.error("CHAT: Failed to fetch conversations:", error);
      toast.error("Failed to load inbox");
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

  // Sync activeConversation when selectedConvId changes or conversations list updates
  useEffect(() => {
    if (selectedConvId) {
      const found = conversations.find(c => c.id === selectedConvId);
      if (found) {
        setActiveConversation(found);
      } else {
        console.warn("CHAT: Selected conversation not found in list:", selectedConvId);
      }
    }
  }, [selectedConvId, conversations]);

  // Fetch messages when selected conversation changes
  useEffect(() => {
    if (selectedConvId && isConnected) {
      const fetchMessages = async () => {
        console.log("CHAT: Fetching messages for conversation:", selectedConvId);
        setIsLoadingMessages(true);
        try {
          const response = await messageService.getMessages(selectedConvId);
          if (response && response.success) {
            setMessages(response.data);
            // Join the socket room for this conversation
            emit("join_conversation", { conversationId: selectedConvId });
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

  // Listen for real-time events
  useEffect(() => {
    if (!isConnected) return;

    const handleNewMessage = (message: ChatMessage) => {
      console.log("CHAT: New message received via socket:", message);
      
      // If message belongs to current conversation, add it to list
      if (message.conversationId === selectedConvId) {
        setMessages((prev) => {
          if (prev.find(m => m.id === message.id)) return prev;
          return [...prev, message];
        });
      }
      
      // Update conversations list (move to top, update last message)
      setConversations((prev) => {
        const index = prev.findIndex((c) => c.id === message.conversationId);
        if (index !== -1) {
          const updated = [...prev];
          const conv = { ...updated[index] };
          conv.messages = [message];
          conv.updatedAt = message.createdAt;
          
          // Move to top
          updated.splice(index, 1);
          return [conv, ...updated];
        } else {
          // If conversation not in list, refresh list
          console.log("CHAT: Conversation not in list, refreshing...");
          fetchConversations();
          return prev;
        }
      });
    };

    const handleUserTyping = (data: { userId: string; isTyping: boolean }) => {
      setIsTyping(prev => ({
        ...prev,
        [data.userId]: data.isTyping
      }));
    };

    on("new_message", handleNewMessage);
    on("user_typing", handleUserTyping);

    return () => {
      off("new_message", handleNewMessage);
      off("user_typing", handleUserTyping);
    };
  }, [selectedConvId, isConnected, on, off, fetchConversations]);

  const handleSendMessage = (content: string) => {
    if (selectedConvId && isConnected) {
      emit("send_message", {
        conversationId: selectedConvId,
        content,
      });
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
          onTyping={handleTyping}
          otherUserTyping={activeConversation ? (activeConversation.clientId === user?.id ? isTyping[activeConversation.errandId] : isTyping[activeConversation.clientId]) : false}
          isLoading={isLoadingMessages}
          isConnected={isConnected}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
