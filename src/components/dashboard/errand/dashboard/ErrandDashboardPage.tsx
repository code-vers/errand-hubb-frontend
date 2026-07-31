"use client";

import React, { useState } from "react";
import PageHeader from "../../common/PageHeader";
import TaskDashboard from "./TaskDashboard";
import { useRouter } from "next/navigation";
import ViewDetailsModal from "../../message/ViewDetailsModal";
import { TaskDetails } from "@/types/messages";
import { toast } from "sonner";

const ErrandDashboardPage = () => {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<TaskDetails | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleReply = (clientId: string) => {
    if (!clientId) {
      toast.error("User ID not found");
      return;
    }
    router.push(`/dashboard/messages?errandId=${clientId}`);
  };

  const handleViewDetails = (task: any) => {
    setSelectedTask({
      id: task.id,
      client: {
        id: task.client.id,
        name: task.client.name,
        avatar: task.client.avatar,
        onlineStatus: "online",
      },
      category: task.category || "Task",
      status: task.status,
      title: task.title,
      description: task.description,
      location: task.location || "Location not specified",
      budget: task.budget || 0,
      timestamp: task.createdAt ? new Date(task.createdAt).toLocaleString() : "N/A",
    });
    setShowDetails(true);
  };

  return (
    <div className='w-full py-4 sm:py-5 px-3 sm:px-6 md:px-8 font-sans'>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 mb-2">
        <PageHeader title='Overview' />
        <div className="bg-[#E23F36] text-white px-3 sm:px-4 py-1.5 font-bold shadow-sm text-xs sm:text-sm rounded-md w-fit">
          TO POST YOUR TALENT AND SKILLS CLICK SUBSCRIPTION
        </div>
      </div>
      <TaskDashboard 
        onReplyToClient={(clientId) => handleReply(clientId)}
        onTaskReply={(task) => handleReply(task.client.id)}
        onTaskViewDetails={(task) => handleViewDetails(task)}
      />

      {showDetails && selectedTask && (
        <ViewDetailsModal 
          task={selectedTask}
          onClose={() => setShowDetails(false)}
          onReply={() => {
            setShowDetails(false);
            handleReply(selectedTask.client.id);
          }}
        />
      )}
    </div>
  );
};

export default ErrandDashboardPage;
