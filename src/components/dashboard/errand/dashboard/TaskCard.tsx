"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Task, TaskStatus } from "@/types/dashboard";
import { Clock, MessageSquare } from "lucide-react";
import { FC } from "react";

interface TaskCardProps {
  task: Task;
  onReply?: (taskId: string) => void;
  onViewDetails?: (taskId: string) => void;
}

const getBadgeVariant = (
  status: TaskStatus,
): "asap" | "pending" | "scheduled" | "completed" => {
  const variantMap: Record<
    TaskStatus,
    "asap" | "pending" | "scheduled" | "completed"
  > = {
    ASAP: "asap",
    Pending: "pending",
    Scheduled: "scheduled",
    Completed: "completed",
  };
  return variantMap[status];
};

const TaskCard: FC<TaskCardProps> = ({ task, onReply, onViewDetails }) => {
  return (
    <article className='bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] p-6 flex flex-col hover:shadow-md transition-shadow'>
      {/* Header - Client Info & Status */}
      <div className='flex justify-between items-start mb-4'>
        <div className='flex items-center gap-3'>
          <Avatar src={task.client.avatar} alt={task.client.name} />
          <div>
            <h3 className='font-semibold text-[14px] text-foreground'>
              {task.client.name}
            </h3>
            <div className='flex items-center gap-1 text-xs text-[#6B7280] mt-0.5'>
              <Clock className='w-3 h-3' />
              <span>{task.timeAgo}</span>
            </div>
          </div>
        </div>

        <Badge variant={getBadgeVariant(task.status)}>{task.status}</Badge>
      </div>

      {/* Task Title */}
      <h4 className='font-bold text-foreground mb-3 text-[15px]'>
        {task.title}
      </h4>

      {/* Task Description */}
      <p className='text-[#4B5563] text-[16px] mb-6 grow leading-relaxed line-clamp-4'>
        {task.description}
      </p>

      {/* Actions */}
      <div className='flex items-center gap-3 mt-auto'>
        <Button variant='primary' size='md' onClick={() => onReply?.(task.id)}>
          <MessageSquare className='w-4 h-4' />
          REPLY
        </Button>

        <Button
          variant='outline'
          size='md'
          onClick={() => onViewDetails?.(task.id)}>
          VIEW DETAILS
        </Button>
      </div>
    </article>
  );
};

export default TaskCard;
