import React from "react";
import { ActivityItem } from "@/types/dashboard";

interface RecentActivityProps {
  activities: ActivityItem[];
  onViewAll?: () => void;
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  onViewAll,
}) => {
  const getStatusStyles = (type: ActivityItem["status"]["type"]) => {
    const styles = {
      new: {
        bg: "bg-orange-50",
        text: "text-primary",
        border: "border-orange-200",
      },
      completed: {
        bg: "bg-green-50",
        text: "text-success",
        border: "border-green-200",
      },
      flagged: {
        bg: "bg-red-50",
        text: "text-error",
        border: "border-red-200",
      },
      approved: {
        bg: "bg-blue-50",
        text: "text-status-blue",
        border: "border-blue-200",
      },
      report: {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        border: "border-yellow-200",
      },
      paused: {
        bg: "bg-gray-50",
        text: "text-muted",
        border: "border-gray-200",
      },
    };

    return styles[type];
  };

  return (
    <section className='bg-white rounded-xl p-6 shadow-sm '>
      <div className='flex justify-between items-center mb-6  pb-4 '>
        <h2 className='text-lg font-semibold text-foreground'>
          Recent Activity
        </h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className='text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded'>
            View All
          </button>
        )}
      </div>

      <div className='space-y-5'>
        {activities.map((activity) => {
          const statusStyle = getStatusStyles(activity.status.type);

          return (
            <div
              key={activity.id}
              className='flex items-center justify-between hover:bg-hover rounded-lg p-2 -mx-2 transition-colors duration-150'>
              <div className='flex items-center space-x-4'>
                <div
                  className='w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-medium flex-shrink-0'
                  style={{ backgroundColor: activity.user.avatarColor }}>
                  {activity.user.initials}
                </div>
                <div className='min-w-0'>
                  <p className='text-sm font-medium text-foreground truncate'>
                    {activity.user.name}
                  </p>
                  <p className='text-xs text-muted truncate'>
                    {activity.action}
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-4 flex-shrink-0'>
                <span
                  className={`px-3 py-1 ${statusStyle.bg} ${statusStyle.text} text-xs rounded-full font-medium border ${statusStyle.border}`}>
                  {activity.status.label}
                </span>
                <span className='text-xs text-muted w-12 text-right'>
                  {activity.timeAgo}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentActivity;
