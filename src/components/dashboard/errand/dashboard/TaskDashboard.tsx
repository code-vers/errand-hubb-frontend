"use client";

import { FC, useState, useEffect } from "react";
import HiredBanner from "./HiredBanner";
import TaskCard from "./TaskCard";
import type { DashboardData, Task } from "@/types/dashboard";

interface TaskDashboardProps {
  initialData?: DashboardData;
  onReplyToClient?: () => void;
  onTaskReply?: (taskId: string) => void;
  onTaskViewDetails?: (taskId: string) => void;
  isLoading?: boolean;
}

const defaultData: DashboardData = {
  hiredBanner: {
    clientName: "Sarah Jenkins",
    hiredDate: "Oct 24, 2023 - 09:15 AM",
    message:
      "Contact your client immediately. Discuss scheduling, payment amount clarification, and payment type (Cash, Credit Card, PayPal, CashApp, Zelle). Recommended: 50% upfront, 50% on completion.",
  },
  tasks: [
    {
      id: "1",
      client: {
        id: "client-1",
        name: "Susan Smith",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAK4pd8YiEHpwqietKDwUBDFNGer1NCDtRIbeKp0K09s8ax0fW1vDxXYIqblvpBlvOiM-Jblb74Xt8xh3Ehq24dWy9vQNomkBfqemUEFkMsWnzeA3btPyrlvMg6HdEqX-dXEvlR19g65vHH2CPBGqHv-f1LvIb8Zubs-qiUIocywujvCa8AS0k3YXJVjoQr_Q_nb1wYK0GcM67Qyge9wANF09eVCpIgW7D002p7tajom8hn-N4ccaH2Y7yZ1hWmubGQD-hFrcbgfrc",
      },
      status: "ASAP",
      title: "Emergency Plumbing Fix",
      description:
        "Hello this is Susan Smith... Can you come clean my house this Sunday at 8am? It's a 3-bedroom and I'll need the kitchen and bathrooms deep-cleaned.",
      createdAt: "2024-05-21T10:00:00Z",
      timeAgo: "2 min ago",
    },
    {
      id: "2",
      client: {
        id: "client-2",
        name: "Marcus Lee",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBNyOahlzSLAQNG93XjIDJiXxJlopk3YhJyLvoPj1wBtrLs9leTfkqC-QwIUNoXncIz-vTT4Apw9bxwwuA97Yug69A0LLZMhUtzFN2ChN4IIoRaxq8X3oTrivfzh9aAbdOb0HOUn_vtw19kMu1JI9xAYZWOUfymESwN9d20c76kOBQDZCeN5tqVkKQvGcY9SxFhVHWOJQpGi-FitEaKrSg0G8Ti5bNkYxWH7VXUWerT_RfhNYTZpgFndP6yu6BJdhaaWHVdxkVU8AQ",
      },
      status: "Pending",
      title: "Garden Landscaping",
      description:
        "Hi! Marcus here... Need help picking up groceries from Whole Foods and dropping them off at my apartment on Tuesday afternoon.",
      createdAt: "2024-05-21T09:00:00Z",
      timeAgo: "1 hr ago",
    },
    {
      id: "3",
      client: {
        id: "client-3",
        name: "Priya Anand",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAtu3jnaJbbR_3N0kYgxGrYqbEGgtVxapqheq4cBCAWPfIIZumSpsnNsFKtCHrJN7S9OyawEdi2oyk8o4jjSDjqjKHN3z2jWhM_IDl-Mgm9HzUf1GNWsENIqXamHtGBFj3TNyKlpQ6HEpu7DfjtjLUm-yM8Rfytu8kqfj84OU7dzQJ-mflvGeHK7B2t98sWo8VYW_t7d-YFv7M4b6rMuu1ZBU_kLM3zwSaLd1zTj8KCVIQmBCS5iJGkJ_IEoUhLtRMXEVr5thA1w4s",
      },
      status: "Scheduled",
      title: "Furniture Assembly",
      description:
        "Hey, Priya here... Looking for someone to assemble a desk and bookshelf from IKEA this Saturday morning.",
      createdAt: "2024-05-20T10:00:00Z",
      timeAgo: "Yesterday",
    },
    {
      id: "4",
      client: {
        id: "client-4",
        name: "Devon Carter",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBp9oAWB9RV1pxPtjVSyas2fE2o49LVk71GfinghsVT25p6RbxHXYNXF7rvjy4OrhLcPOqqnB1FwPYDMA0u9JSAGVTHjoQvf6wOvwNdiWfTpNBrw7sPvzdSzewH4entLw80p8VPZZzSBphPnPYlqhmBpaphbQLqJhdkGgDntoladHtUVlri5z2cDau-jF9yIGPvFMWpml32uTglic0h_HRRHElHHB7wlXu8SKri_QoPqQrs7VMvbM7zr8zEa-S6ypgoPIXm1jhIS_8",
      },
      status: "Completed",
      title: "Emergency Plumbing Fix",
      description:
        "Hi Jordan, Dog walking — 30 min daily for two weeks starting next Monday. Friendly golden retriever.",
      createdAt: "2024-05-21T08:00:00Z",
      timeAgo: "2 min ago",
    },
  ],
  totalPosts: 4,
};

const TaskDashboard: FC<TaskDashboardProps> = ({
  initialData,
  onReplyToClient,
  onTaskReply,
  onTaskViewDetails,
  isLoading = false,
}) => {
  const [data, setData] = useState<DashboardData>(initialData || defaultData);

  // You can fetch data from backend here
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
    // Or fetch from API
    // const fetchDashboard = async () => {
    //   const response = await api.getDashboard();
    //   setData(response);
    // };
    // fetchDashboard();
  }, [initialData]);

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
        <HiredBanner data={data.hiredBanner} onReplyClick={onReplyToClient} />

        {/* Task Updates Section */}
        <main>
          {/* Section Header */}
          <div className='flex justify-between items-end mb-6 px-2'>
            <h2 className='text-[18px] font-semibold text-foreground'>
              Recent task updates
            </h2>
            <span className='text-[#6B7280] font-medium text-sm'>
              {data.totalPosts} posts
            </span>
          </div>

          {/* Task Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {data.tasks.map((task) => (
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
    {/* Banner Skeleton */}
    <div className='bg-white rounded-xl p-6 space-y-4'>
      <div className='h-8 bg-gray-200 rounded w-3/4' />
      <div className='h-4 bg-gray-200 rounded w-1/2' />
      <div className='h-4 bg-gray-200 rounded w-full' />
    </div>

    {/* Cards Grid Skeleton */}
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
