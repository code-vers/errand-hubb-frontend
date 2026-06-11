"use client";

import { FC, useState, useEffect, useCallback } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { messageService } from "@/services/message.service";
import { ChatConversation, ChatMessage } from "@/types/messages";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ChatContainer: FC = () => {
  const { user } = useAuth();
  const { on, off, emit } = useSocket();
  const searchParams = useSearchParams();
  const convIdFromUrl = searchParams.get("convId");
  const errandIdFromUrl = searchParams.get("errandId");

  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConvId, setSelectedId] = useState<string | null>(null);
  const [activeConversation, setActiveConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Fetch all conversations
  const fetchConversations = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await messageService.getConversations();
      if (response && response.data) {
        const fetchedConversations = response.data;
        setConversations(fetchedConversations);
        
        // Handle initial selection from URL
        if (convIdFromUrl) {
          setSelectedId(convIdFromUrl);
          const found = fetchedConversations.find((c: any) => c.id === convIdFromUrl);
          if (found) setActiveConversation(found);
        } else if (errandIdFromUrl) {
          // Check if conversation already exists with this person
          const existing = fetchedConversations.find(
            (c: any) => c.errandId === errandIdFromUrl || c.clientId === errandIdFromUrl
          );
          
          if (existing) {
            setSelectedId(existing.id);
            setActiveConversation(existing);
          } else {
            // Start new one
            console.log("Starting new conversation with:", errandIdFromUrl);
            const startResp = await messageService.startConversation(errandIdFromUrl);
            if (startResp && startResp.data) {
              const newConv = startResp.data;
              setConversations(prev => [newConv, ...prev]);
              setSelectedId(newConv.id);
              setActiveConversation(newConv);
            }
          }
        }
      }
    } catch (error: any) {
      console.error("Failed to fetch conversations. Error details:", {
        message: error.message,
        status: error.status,
      });
    }
  }, [user, convIdFromUrl, errandIdFromUrl]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Sync activeConversation when selectedConvId changes manually (e.g. from ChatList)
  useEffect(() => {
    if (selectedConvId) {
      const found = conversations.find(c => c.id === selectedConvId);
      if (found) {
        setActiveConversation(found);
      }
    }
  }, [selectedConvId, conversations]);

  // Fetch messages when selected conversation changes
  useEffect(() => {
    if (selectedConvId) {
      const fetchMessages = async () => {
        setIsLoadingMessages(true);
        try {
          const response = await messageService.getMessages(selectedConvId);
          setMessages(response.data);
          // Join the socket room for this conversation
          emit("join_conversation", { conversationId: selectedConvId });
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        } finally {
          setIsLoadingMessages(false);
        }
      };

      fetchMessages();

      return () => {
        emit("leave_conversation", { conversationId: selectedConvId });
      };
    }
  }, [selectedConvId, emit]);

  // Listen for real-time messages
  useEffect(() => {
    on("new_message", (message: ChatMessage) => {
      if (message.conversationId === selectedConvId) {
        setMessages((prev) => [...prev, message]);
      }
      
      // Update conversations list (move to top, update last message)
      setConversations((prev) => {
        const index = prev.findIndex((c) => c.id === message.conversationId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            messages: [message],
            updatedAt: message.createdAt,
          };
          // Move to top
          const conv = updated.splice(index, 1)[0];
          return [conv, ...updated];
        } else {
          // If conversation not in list, refresh list
          fetchConversations();
          return prev;
        }
      });
    });

    return () => {
      off("new_message");
    };
  }, [selectedConvId, on, off, fetchConversations]);

  const handleSendMessage = (content: string) => {
    if (selectedConvId) {
      emit("send_message", {
        conversationId: selectedConvId,
        content,
      });
    }
  };

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
          isLoading={isLoadingMessages}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
