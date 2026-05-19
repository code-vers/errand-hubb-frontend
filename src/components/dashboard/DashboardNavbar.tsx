'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Bell, Search, User } from 'lucide-react';

const DashboardNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 bg-white border-b border-border lg:px-8">
      <div className="flex items-center lg:hidden">
        <div className="w-10" />
      </div>

      <div className="hidden lg:flex flex-1 max-w-md ml-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-muted" />
          </div>
          <input
            type="text"
            className="block w-full px-4 py-2 pl-10 text-sm border border-border rounded-lg bg-surface-dim focus:ring-primary focus:border-primary"
            placeholder="Search errands, tasks..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-muted hover:bg-hover rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 ml-2 border-l border-border pl-4">
          <div className="hidden text-right lg:block">
            <p className="text-sm font-medium text-foreground capitalize">{user?.role}</p>
            <p className="text-xs text-muted truncate max-w-[150px]">{user?.email}</p>
          </div>
          <div className="w-10 h-10 bg-surface-dim rounded-full flex items-center justify-center border border-border overflow-hidden">
            <User size={24} className="text-muted" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
