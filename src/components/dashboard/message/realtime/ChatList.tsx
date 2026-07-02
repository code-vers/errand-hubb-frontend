"use client";

import { FC } from "react";
import { ChatConversation, ChatUser } from "@/types/messages";
import { formatDistanceToNow } from "date-fns";
import { getImageUrl } from "@/configs/api.config";

interface ChatListProps {
  conversations: ChatConversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  currentUserId: string;
}

const ChatList: FC<ChatListProps> = ({
  conversations,
  selectedId,
  onSelect,
  currentUserId,
}) => {
  return (
    <div className='flex flex-col h-full bg-white border-r border-gray-100'>
      <div className='p-4 border-b border-gray-100'>
        <h2 className='text-lg font-bold text-gray-800'>Messages</h2>
      </div>
      <div className='flex-1 overflow-y-auto'>
        {conversations.length === 0 ? (
          <div className='p-8 text-center text-gray-400'>
            <p className='text-sm'>No conversations yet</p>
          </div>
        ) : (
          conversations.map((conv) => {
            const otherUser = conv.clientId === currentUserId ? conv.errand : conv.client;
            const lastMessage = conv.messages[0];
            const isSelected = selectedId === conv.id;

            return (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`w-full flex items-center gap-3 p-4 transition-colors hover:bg-orange-50 border-b border-gray-50 ${
                  isSelected ? "bg-orange-50 border-l-4 border-l-primary" : ""
                }`}>
                <div className='relative shrink-0'>
                  <div className='w-12 h-12 rounded-full overflow-hidden bg-gray-100'>
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
                </div>
                <div className='flex-1 min-w-0 text-left'>
                  <div className='flex justify-between items-baseline'>
                    <h3 className='text-sm font-bold text-gray-900 truncate'>
                      {otherUser.firstName} {otherUser.lastName}
                    </h3>
                    {conv.updatedAt && (
                      <span className='text-[10px] text-gray-400'>
                        {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: false })}
                      </span>
                    )}
                  </div>
                  <p className='text-xs text-gray-500 truncate mt-1'>
                    {lastMessage ? lastMessage.content : "No messages yet"}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;
