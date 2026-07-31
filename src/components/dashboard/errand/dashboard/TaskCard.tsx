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
    <article className='bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] p-4 sm:p-6 flex flex-col hover:shadow-md transition-shadow overflow-hidden'>
      {/* Header - Client Info & Status */}
      <div className='flex justify-between items-start mb-4 gap-2'>
        <div className='flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1'>
          <Avatar src={task.client.avatar} alt={task.client.name} />
          <div className='min-w-0 flex-1'>
            <h3 className='font-semibold text-xs sm:text-[14px] text-foreground truncate'>
              {task.client.name}
            </h3>
            <div className='flex items-center gap-1 text-[11px] sm:text-xs text-[#6B7280] mt-0.5 truncate'>
              <Clock className='w-3 h-3 shrink-0' />
              <span className='truncate'>{task.timeAgo}</span>
            </div>
          </div>
        </div>

        <div className='shrink-0'>
          <Badge variant={getBadgeVariant(task.status)}>{task.status}</Badge>
        </div>
      </div>

      {/* Task Title */}
      <h4 className='font-bold text-foreground mb-2 sm:mb-3 text-sm sm:text-[15px] truncate'>
        {task.title}
      </h4>

      {/* Task Description */}
      <p className='text-[#4B5563] text-xs sm:text-[15px] mb-4 sm:mb-6 grow leading-relaxed line-clamp-3'>
        {task.description}
      </p>

      {/* Actions */}
      <div className='grid grid-cols-2 gap-2 sm:gap-3 mt-auto'>
        <Button variant='primary' size='md' onClick={() => onReply?.(task.id)} className='w-full justify-center text-xs sm:text-sm px-2 cursor-pointer'>
          <MessageSquare className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
          REPLY
        </Button>

        <Button
          variant='outline'
          size='md'
          onClick={() => onViewDetails?.(task.id)}
          className='w-full justify-center text-xs sm:text-sm px-2 cursor-pointer'>
          VIEW DETAILS
        </Button>
      </div>
    </article>
  );
};

export default TaskCard;
