"use client";

import { FC, useState, useEffect, useRef } from "react";
import { ChatConversation, ChatMessage, ChatUser } from "@/types/messages";
import { Send, MoreVertical, Phone, Video, Loader2 } from "lucide-react";
import { getImageUrl } from "@/configs/api.config";
import { format } from "date-fns";

interface ChatWindowProps {
  conversation: ChatConversation | null;
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

const ChatWindow: FC<ChatWindowProps> = ({
  conversation,
  messages,
  currentUserId,
  onSendMessage,
  isLoading = false,
}) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  if (!conversation) {
    return (
      <div className='flex-1 flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Send className='text-primary w-10 h-10' />
          </div>
          <h3 className='text-xl font-bold text-gray-800'>Your Messages</h3>
          <p className='text-gray-500 max-w-xs mx-auto mt-2'>
            Select a conversation to start chatting with your Errandr or Client.
          </p>
        </div>
      </div>
    );
  }

  const otherUser = conversation.clientId === currentUserId ? conversation.errand : conversation.client;

  return (
    <div className='flex-1 flex flex-col h-full bg-white'>
      {/* Header */}
      <header className='px-6 py-4 border-b border-gray-100 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-100'>
            {otherUser.profileImage ? (
              <img
                src={getImageUrl(otherUser.profileImage) || ""}
                alt={otherUser.firstName}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center bg-primary text-white font-bold'>
                {otherUser.firstName[0]}
              </div>
            )}
          </div>
          <div>
            <h3 className='text-[15px] font-bold text-gray-900'>
              {otherUser.firstName} {otherUser.lastName}
            </h3>
            <div className='flex items-center gap-1.5'>
              <span className='w-2 h-2 rounded-full bg-green-500' />
              <span className='text-[11px] text-gray-400 font-medium'>Online</span>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <button className='p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors'>
            <Phone size={18} />
          </button>
          <button className='p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors'>
            <Video size={18} />
          </button>
          <button className='p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors'>
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-6 space-y-6 bg-[#FDFCFB]'>
        {isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <Loader2 className='w-8 h-8 animate-spin text-primary' />
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.senderId === currentUserId;
            const showDate = idx === 0 || 
              format(new Date(messages[idx-1].createdAt), 'yyyy-MM-dd') !== format(new Date(msg.createdAt), 'yyyy-MM-dd');

            return (
              <div key={msg.id} className='space-y-4'>
                {showDate && (
                  <div className='flex justify-center'>
                    <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm'>
                      {format(new Date(msg.createdAt), 'MMMM dd, yyyy')}
                    </span>
                  </div>
                )}
                <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm shadow-sm ${
                        isMe
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                      }`}>
                      {msg.content}
                    </div>
                    <span className='text-[10px] text-gray-400 mt-1.5 font-medium px-1'>
                      {format(new Date(msg.createdAt), 'HH:mm')}
                      {isMe && msg.isRead && " · Seen"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <footer className='p-4 border-t border-gray-100 bg-white'>
        <form onSubmit={handleSubmit} className='flex items-center gap-3'>
          <div className='flex-1 relative'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type your message...'
              className='w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all pr-12'
            />
            <button
              type='submit'
              disabled={!input.trim()}
              className='absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100'>
              <Send size={18} />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default ChatWindow;
