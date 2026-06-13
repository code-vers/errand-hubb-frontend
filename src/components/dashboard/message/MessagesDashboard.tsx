"use client";

import { FC, useState, useEffect } from "react";
import PriorityMessageCard from "./PriorityMessageCard";
import RecentMessageItem from "./RecentMessageItem";
import ViewDetailsModal from "./ViewDetailsModal";
import { useRouter } from "next/navigation";
import type {
  PriorityMessage,
  RecentMessage,
  TaskDetails,
} from "@/types/messages";

interface MessagesDashboardProps {
  priorityMessages?: PriorityMessage[];
  recentMessages?: RecentMessage[];
  onReplyToMessage?: (userId: string) => void;
  onViewTaskDetails?: (taskId: string) => Promise<TaskDetails>;
  isLoading?: boolean;
}

// Default mock data
const defaultPriorityMessages: PriorityMessage[] = [
  {
    id: "priority-1",
    user: {
      id: "97ab9ebb-7686-4355-8c6e-143207f27149",
      name: "Michael Chen",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAywMc-is1vjq0cdJCYIttxau91tQe4kueAzZJGWpFgVcbTCUeQ22qxIYKU1iQsbrG53_73-T6ZzVuhkkYVU2yYjlvZKVrrRNza6lRepcJMHLxoXxrs5SBs0uIWzDt1ZuFDi7aQjLZiDL63VW-IS9G1dGVVf6gwnyAP-fTsuD0MEiJ2TpLUoDWta7uefLS7APkFh3LxPnQTfBHtcepnqoSBZU80wBK-QFPnpc4uGtxnT4F4xCOtg5NdxJG_0XlyUVGlCH9sOLlLbGE",
      onlineStatus: "online",
    },
    status: "hired",
    regarding: "Assembly of Office Furniture",
    message:
      "Hi there! I've officially accepted your proposal for the office setup. We are looking forward to getting this started on Tuesday. Please let me know what time works best...",
    timeAgo: "10 mins ago",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    isHired: true,
  },
];

const defaultRecentMessages: RecentMessage[] = [
  {
    id: "recent-1",
    user: {
      id: "user-2",
      name: "Sarah Jenkins",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBY_lTS-BhTDCLI1JG_xflYkXtu09b9zGotfVJliqjLIULJB7e1jHdY7XfHc1dGUqRapznBFm1ALUXaFNfaC3BpAPDjT9MEdsorO4xu5GUlGTo6jANmEpq5mJaa1iY9nfZt0O9mz8D-S4MbrZ_HMB7xmGUJSGpKqFQXzVLf-rl1gQD3LsQT60JiDQgdE7yHrht6qcK-ISrjK9wluLHOUFvoz9F9kzrEZttsbq4N0TtYBl09Hket9h9q-cK8-lgDgl0wB4CFhrf_tbg",
      onlineStatus: "online",
    },
    regarding: "Grocery Delivery Inquiry",
    message:
      "Could you confirm if you are able to pick up from two different stores for this order? I need items...",
    timeAgo: "2 hours ago",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

const MessagesDashboard: FC<MessagesDashboardProps> = ({
  priorityMessages = defaultPriorityMessages,
  recentMessages = defaultRecentMessages,
  onReplyToMessage,
  onViewTaskDetails,
  isLoading = false,
}) => {
  const router = useRouter();
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);

  const handleViewDetails = async (messageId: string) => {
    try {
      if (onViewTaskDetails) {
        const details = await onViewTaskDetails(messageId);
        setTaskDetails(details);
      } else {
        // Find message
        const msg = [...priorityMessages, ...recentMessages].find(m => m.id === messageId);
        
        // Mock data for demo
        setTaskDetails({
          id: messageId,
          client: {
            id: msg?.user.id || "user-2",
            name: msg?.user.name || "Sarah Jenkins",
            avatar: msg?.user.avatar || "",
            onlineStatus: "online",
          },
          category: msg?.regarding || "Plumbing",
          status: "ASAP",
          title: msg?.regarding || "Task Update",
          description: msg?.message || "Details about the errand update will appear here.",
          location: "123 Errand Way, Suite 100",
          budget: 150.0,
          timestamp: msg?.timeAgo || "Just now",
        });
      }
      setShowViewDetails(true);
    } catch (error) {
      console.error("Failed to fetch task details:", error);
    }
  };

  const handleReply = (messageId: string) => {
    // Find the message to get recipient info
    const priorityMsg = priorityMessages.find((m) => m.id === messageId);
    const recentMsg = recentMessages.find((m) => m.id === messageId);
    const msg = priorityMsg || recentMsg;

    if (msg) {
      if (onReplyToMessage) {
        onReplyToMessage(msg.user.id);
      } else {
        router.push(`/dashboard/messages?errandId=${msg.user.id}`);
      }
    }
  };

  if (isLoading) {
    return <MessagesDashboardSkeleton />;
  }

  return (
    <>
      <main className=' mx-auto py-5 px-12 space-y-8'>
        {/* Priority Updates Section */}
        <section aria-labelledby='priority-updates-heading'>
          <h2
            id='priority-updates-heading'
            className='text-[16px]  font-bold text-foreground mb-4'>
            Priority Updates
          </h2>

          {priorityMessages.map((message) => (
            <PriorityMessageCard
              key={message.id}
              message={message}
              onReply={handleReply}
              onViewDetails={handleViewDetails}
            />
          ))}
        </section>

        {/* Recent Messages Section */}
        <section aria-labelledby='recent-messages-heading'>
          <h2
            id='recent-messages-heading'
            className='text-[16px] font-bold text-foreground mb-4'>
            Recent Messages
          </h2>

          <div className='space-y-4'>
            {recentMessages.map((message) => (
              <RecentMessageItem
                key={message.id}
                message={message}
                onReply={handleReply}
                onMoreOptions={(id) => console.log("More options for:", id)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* View Details Modal */}
      {showViewDetails && taskDetails && (
        <ViewDetailsModal
          task={taskDetails}
          onClose={() => setShowViewDetails(false)}
          onReply={() => {
            setShowViewDetails(false);
            handleReply(taskDetails.id);
          }}
        />
      )}
    </>
  );
};

// Loading Skeleton
const MessagesDashboardSkeleton: FC = () => (
  <div className='max-w-4xl mx-auto py-5 px-12 space-y-8 animate-pulse'>
    {/* Priority Section Skeleton */}
    <div className='space-y-4'>
      <div className='h-4 bg-gray-200 rounded w-32' />
      <div className='bg-gray-100 rounded-xl p-5 space-y-4'>
        <div className='flex gap-4'>
          <div className='w-12 h-12 bg-gray-200 rounded-lg' />
          <div className='flex-1 space-y-2'>
            <div className='h-5 bg-gray-200 rounded w-48' />
            <div className='h-4 bg-gray-200 rounded w-full' />
            <div className='h-4 bg-gray-200 rounded w-3/4' />
          </div>
        </div>
      </div>
    </div>

    {/* Recent Messages Skeleton */}
    <div className='space-y-4'>
      <div className='h-4 bg-gray-200 rounded w-32' />
      {[1, 2].map((i) => (
        <div key={i} className='bg-white rounded-xl p-4 space-y-3'>
          <div className='flex gap-4'>
            <div className='w-12 h-12 bg-gray-200 rounded-lg' />
            <div className='flex-1 space-y-2'>
              <div className='h-4 bg-gray-200 rounded w-32' />
              <div className='h-3 bg-gray-200 rounded w-48' />
              <div className='h-3 bg-gray-200 rounded w-full' />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MessagesDashboard;
