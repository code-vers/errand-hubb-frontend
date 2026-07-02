import React from "react";
import Link from "next/link";
import { NavigationTab } from "@/types/users";

interface UserNavigationTabsProps {
  tabs: NavigationTab[];
  className?: string;
}

const UserNavigationTabs: React.FC<UserNavigationTabsProps> = ({
  tabs,
  className = "",
}) => {
  return (
    <nav aria-label='Tabs' className={`flex mb-8 ${className}`}>
      <div className='bg-white rounded-t-lg shadow-sm flex overflow-hidden'>
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={tab.isActive ? "page" : undefined}
            className={`
              px-6 py-3 text-sm font-medium transition-colors duration-200
              ${
                tab.isActive
                  ? "text-primary border-b-2 border-primary bg-white font-bold"
                  : "text-muted hover:text-gray-600 hover:bg-hover bg-gray-50/50"
              }
            `}>
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default UserNavigationTabs;
