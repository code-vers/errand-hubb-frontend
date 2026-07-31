"use client";

import { statuses } from "./post";

interface StatusFilterTabsProps {
  selectedStatus: string;
  statusCounts: Record<string, number>;
  onStatusChange: (status: string) => void;
}

const statusStyles: Record<
  string,
  { active: string; badge: string; dot: string }
> = {
  "Pending Pickup": {
    active: "bg-orange-500 text-white",
    badge: "bg-orange-100 text-orange-600",
    dot: "bg-status-orange",
  },
  ASAP: {
    active: "bg-red-500 text-white",
    badge: "bg-red-100 text-red-600",
    dot: "bg-status-red",
  },
  Scheduled: {
    active: "bg-blue-500 text-white",
    badge: "bg-blue-100 text-blue-600",
    dot: "bg-status-blue",
  },
  "In Progress": {
    active: "bg-purple-500 text-white",
    badge: "bg-green-100 text-green-600",
    dot: "bg-status-purple",
  },
  Completed: {
    active: "bg-green-500 text-white",
    badge: "bg-green-100 text-green-600",
    dot: "bg-status-green",
  },
  Cancelled: {
    active: "bg-red-400 text-white",
    badge: "bg-red-100 text-red-600",
    dot: "bg-status-pink",
  },
};

export default function StatusFilterTabs({
  selectedStatus,
  statusCounts,
  onStatusChange,
}: StatusFilterTabsProps) {
  return (
    <nav
      className='flex flex-nowrap sm:flex-wrap items-center gap-2 overflow-x-auto pb-1 scrollbar-hide w-full max-w-full'
      data-purpose='filter-navigation'>
      {statuses.map((status) => {
        const isActive = selectedStatus === status;
        const style =
          status === "All"
            ? {
                active: "bg-[#EC6F27] text-white",
                badge: "bg-orange-400/50",
                dot: "",
              }
            : statusStyles[status] || {
                active: "bg-orange-500 text-white",
                badge: "bg-orange-100 text-orange-600",
                dot: "",
              };

        const count = statusCounts[status] || 0;
        const badgeClass =
          status === "All"
            ? "bg-[#EC6F27] "
            : statusStyles[status]?.badge || "bg-orange-100 text-orange-600";

        return (
          <button
            key={status}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all duration-200 shrink-0 whitespace-nowrap cursor-pointer ${
              isActive
                ? style.active + " shadow-md"
                : "bg-white font-normal text-text-placeholder border border-[#e5e7eb] hover:border-orange-200 hover:text-orange-500"
            }`}
            onClick={() => onStatusChange(status)}>
            {status}
            <span
              className={`py-0.5 px-2 rounded-full text-[10px] ${isActive ? style.badge : badgeClass}`}>
              {count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
