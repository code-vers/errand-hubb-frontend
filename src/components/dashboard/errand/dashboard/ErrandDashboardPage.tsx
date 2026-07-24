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
    <div className='w-full p-6'>
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-2">
        <PageHeader title='Overview' />
        <div className="bg-[#E23F36] text-white px-4 py-1.5 font-bold shadow-sm whitespace-nowrap text-sm md:text-base md:-mt-4">
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
