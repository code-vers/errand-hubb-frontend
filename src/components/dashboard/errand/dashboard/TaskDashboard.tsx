"use client";

import { FC, useMemo } from "react";
import HiredBanner from "./HiredBanner";
import TaskCard from "./TaskCard";
import { useQuery } from "@tanstack/react-query";
import { messageService } from "@/services/message.service";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface TaskDashboardProps {
  onReplyToClient?: (clientId: string) => void;
  onTaskReply?: (task: any) => void;
  onTaskViewDetails?: (task: any) => void;
}

const TaskDashboard: FC<TaskDashboardProps> = ({
  onReplyToClient,
  onTaskReply,
  onTaskViewDetails,
}) => {
  const { user } = useAuth();
  
  const { data: convResponse, isLoading } = useQuery({
    queryKey: ["recent-connections"],
    queryFn: () => messageService.getConversations(),
  });

  const dashboardData = useMemo(() => {
    if (!convResponse?.data || !Array.isArray(convResponse.data)) {
      return {
        hiredBanner: {
          clientName: "System",
          hiredDate: "N/A",
          message: "Welcome to Errand Hub. Your recent connections will appear here.",
          clientId: "",
        },
        connections: [],
        totalConnections: 0,
      };
    }

    // Get latest 6 conversations
    const latestConvs = convResponse.data.slice(0, 6);
    
    const connections = latestConvs.map((conv: any) => {
      const otherUser = conv.clientId === user?.id ? conv.errand : conv.client;
      const lastMessage = conv.messages && conv.messages[0] ? conv.messages[0].content : "No messages yet";
      
      return {
        id: conv.id,
        client: {
          id: otherUser.id,
          name: `${otherUser.firstName} ${otherUser.lastName}`,
          avatar: otherUser.profileImage || "",
        },
        status: conv.unreadCount > 0 ? "Pending" : "Completed",
        title: `Connection with ${otherUser.firstName}`,
        description: lastMessage,
        createdAt: conv.updatedAt,
        budget: 0,
        location: "Direct Message",
        category: otherUser.role === "client" ? "Client" : "Errand Professional",
        timeAgo: formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true }),
      };
    });

    return {
      hiredBanner: {
        clientName: connections[0]?.client.name || "",
        hiredDate: connections[0] ? new Date(connections[0].createdAt).toLocaleString() : "",
        message: connections[0]
          ? "You have new activity in your connections. Click view messages to continue the conversation."
          : "Welcome to your Errand Hub dashboard! Browse available tasks, complete your profile, and connect with clients to start earning.",
        clientId: connections[0]?.client.id || "",
      },
      connections,
      totalConnections: convResponse.data.length,
    };
  }, [convResponse, user]);

  if (isLoading) {
    return (
      <div className=' mx-auto'>
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className='min-h-screen py-5 font-sans'>
      <div className=' mx-auto'>
        {/* Hired Banner */}
        <HiredBanner 
          data={dashboardData.hiredBanner} 
          onReplyClick={() => onReplyToClient?.(dashboardData.hiredBanner.clientId)} 
        />

        {/* Recent Connections Section */}
        <main>
          {/* Section Header */}
          <div className='flex justify-between items-end mb-6 px-2'>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h2 className='text-[18px] font-semibold text-foreground'>
                Recent connections
              </h2>
            </div>
            <span className='text-[#6B7280] font-medium text-sm'>
              {dashboardData.totalConnections} connections
            </span>
          </div>

          {/* Connections Grid */}
          {dashboardData.connections.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {dashboardData.connections.map((conn: any) => (
                <TaskCard
                  key={conn.id}
                  task={conn}
                  onReply={() => onTaskReply?.(conn)}
                  onViewDetails={() => onTaskViewDetails?.(conn)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800">No connections yet</h3>
              <p className="text-gray-500 max-w-xs mx-auto mt-2">
                When you start chatting with others, they will appear here as recent connections.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Loading Skeleton
const DashboardSkeleton: FC = () => (
  <div className='animate-pulse space-y-8'>
    <div className='bg-white rounded-xl p-6 space-y-4'>
      <div className='h-8 bg-gray-200 rounded w-3/4' />
      <div className='h-4 bg-gray-200 rounded w-1/2' />
      <div className='h-4 bg-gray-200 rounded w-full' />
    </div>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='bg-white rounded-xl p-6 space-y-4'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-gray-200 rounded-full' />
            <div className='space-y-2 flex-1'>
              <div className='h-4 bg-gray-200 rounded w-3/4' />
              <div className='h-3 bg-gray-200 rounded w-1/2' />
            </div>
          </div>
          <div className='h-16 bg-gray-200 rounded' />
          <div className='flex gap-3'>
            <div className='h-10 bg-gray-200 rounded flex-1' />
            <div className='h-10 bg-gray-200 rounded flex-1' />
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default TaskDashboard;
