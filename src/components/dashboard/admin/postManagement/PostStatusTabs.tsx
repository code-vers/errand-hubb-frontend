import React from "react";
import { PostStatus, StatusTab } from "@/types/post";

interface PostStatusTabsProps {
  tabs: StatusTab[];
  activeTab: PostStatus;
  onTabChange: (status: PostStatus) => void;
}

const PostStatusTabs: React.FC<PostStatusTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div
      aria-label='Status Filters'
      className='flex flex-wrap gap-3'
      role='tablist'>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            role='tab'
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-5 py-2 rounded-xl text-xs transition-colors
              focus:outline-none focus:ring-2  
              flex items-center font-normal gap-2 uppercase tracking-tight
              ${
                isActive
                  ? "bg-primary text-white focus:ring-primary"
                  : "bg-white text-[#6B7280] hover:bg-hover  border border-border"
              }
            `}>
            {tab.label}
            {tab.count >= 0 && (
              <span
                className={`
                px-2 py-0.5 rounded-full text-[10px] font-bold
                ${
                  isActive
                    ? "bg-white/20 text-white"
                    : tab.id === "open" || tab.id === "completed"
                      ? "bg-green-100 text-success"
                      : tab.id === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : tab.id === "flagged"
                          ? "bg-red-100 text-error"
                          : "bg-gray-100 text-text-secondary"
                }
              `}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PostStatusTabs;
