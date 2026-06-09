"use client";

import { FC, useMemo } from "react";
import HiredBanner from "./HiredBanner";
import TaskCard from "./TaskCard";
import type { DashboardData } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";

interface TaskDashboardProps {
  onReplyToClient?: () => void;
  onTaskReply?: (taskId: string) => void;
  onTaskViewDetails?: (taskId: string) => void;
}

const TaskDashboard: FC<TaskDashboardProps> = ({
  onReplyToClient,
  onTaskReply,
  onTaskViewDetails,
}) => {
  const { data: postsResponse, isLoading } = useQuery({
    queryKey: ["all-posts"],
    queryFn: () => postService.findAll({ limit: 6 }),
  });

  const dashboardData = useMemo(() => {
    if (!postsResponse?.data) {
      return {
        hiredBanner: {
          clientName: "System",
          hiredDate: "N/A",
          message: "Welcome to Errand Hub. Browse recent task updates below.",
        },
        tasks: [],
        totalPosts: 0,
      };
    }

    const tasks = postsResponse.data.data.map((post: any) => ({
      id: post.id,
      client: {
        id: post.userId,
        name: `${post.user.firstName} ${post.user.lastName}`,
        avatar: post.user.profileImage || "",
      },
      status: post.status === "active" ? "Pending" : post.status,
      title: post.title,
      description: post.description,
      createdAt: post.createdAt,
      timeAgo: formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
    }));

    return {
      hiredBanner: {
        clientName: tasks[0]?.client.name || "System",
        hiredDate: tasks[0] ? new Date(tasks[0].createdAt).toLocaleString() : "N/A",
        message: "Check out the latest errands posted by clients. Reply to start earning!",
      },
      tasks,
      totalPosts: postsResponse.data.meta.total,
    };
  }, [postsResponse]);

  if (isLoading) {
    return (
      <div className=' mx-auto'>
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className='min-h-screen py-5  font-sans'>
      <div className=' mx-auto'>
        {/* Hired Banner */}
        <HiredBanner data={dashboardData.hiredBanner} onReplyClick={onReplyToClient} />

        {/* Task Updates Section */}
        <main>
          {/* Section Header */}
          <div className='flex justify-between items-end mb-6 px-2'>
            <h2 className='text-[18px] font-semibold text-foreground'>
              Recent task updates
            </h2>
            <span className='text-[#6B7280] font-medium text-sm'>
              {dashboardData.totalPosts} posts
            </span>
          </div>

          {/* Task Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {dashboardData.tasks.map((task: any) => (
              <TaskCard
                key={task.id}
                task={task}
                onReply={onTaskReply}
                onViewDetails={onTaskViewDetails}
              />
            ))}
          </div>
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
