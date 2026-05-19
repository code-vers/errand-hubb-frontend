'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight, LogOut } from 'lucide-react';
import { getSidebarItemsByRole } from '@/configs/sidebar.config';
import { useAuth } from '@/context/AuthContext';
import { SidebarMenuItem } from '@/types/dashboard';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  if (!user) return null;

  const menuItems = getSidebarItemsByRole(user.role);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) ? prev.filter(i => i !== title) : [...prev, title]
    );
  };

  const MenuItem = ({ item, depth = 0 }: { item: SidebarMenuItem; depth?: number }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const isActive = pathname === item.path;

    return (
      <div className="w-full">
        {hasChildren ? (
          <button
            onClick={() => toggleExpand(item.title)}
            className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors hover:bg-hover rounded-lg mb-1 ${
              depth > 0 ? 'pl-10' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className="text-muted" />
              <span>{item.title}</span>
            </div>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <Link
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg mb-1 ${
              isActive ? 'bg-primary text-white hover:bg-primary-dark' : 'hover:bg-hover'
            } ${depth > 0 ? 'pl-10' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            <item.icon size={20} className={isActive ? 'text-white' : 'text-muted'} />
            <span>{item.title}</span>
          </Link>
        )}

        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children?.map((child) => (
              <MenuItem key={child.path} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white border border-border rounded-md lg:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white border-r border-border ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full px-3 py-4">
          <div className="flex items-center gap-2 px-4 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">EH</div>
            <span className="text-xl font-bold text-secondary">ErrandHubb</span>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto">
            <p className="px-4 mb-2 text-xs font-semibold text-muted uppercase tracking-wider">
              {user.role} Menu
            </p>
            {menuItems.map((item) => (
              <MenuItem key={item.path} item={item} />
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-border">
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-error hover:bg-error-light rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
