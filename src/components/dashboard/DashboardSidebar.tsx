"use client";

import { getSidebarItemsByRole } from "@/configs/sidebar.config";
import { useAuth } from "@/context/AuthContext";
import { SidebarMenuItem } from "@/types/dashboard";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DashboardSidebar = ({ isOpen: externalIsOpen, onClose }: DashboardSidebarProps = {}) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  if (!user) return null;

  const menuItems = getSidebarItemsByRole(user.role);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title],
    );
  };

  const MenuItem = ({
    item,
    depth = 0,
  }: {
    item: SidebarMenuItem;
    depth?: number;
  }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const isActive = pathname === item.path;

    const baseClass = `
      flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium
      transition-colors rounded-md group
      ${depth > 0 ? "pl-10" : ""}
    `;

    const activeClass = "text-[#F47A22] bg-[#FFF3CD] font-semibold";
    const inactiveClass =
      "text-[#111111] font-normal hover:text-[#F47A22] hover:bg-[#FFF3CD] hover:font-semibold";

    if (hasChildren) {
      return (
        <div className='w-full'>
          <button
            onClick={() => toggleExpand(item.title)}
            className={`${baseClass} ${isActive ? activeClass : inactiveClass} justify-between`}>
            <div className='flex items-center gap-3'>
              <item.icon
                size={18}
                className={isActive ? "text-primary" : "text-[#5C4A2A] group-hover:text-primary"}
                strokeWidth={1.6}
              />
              <span className='text-[14px]'>{item.title}</span>
            </div>
            {isExpanded ? (
              <ChevronDown size={14} strokeWidth={2} />
            ) : (
              <ChevronRight size={14} strokeWidth={2} />
            )}
          </button>

          {isExpanded && (
            <div className='space-y-2 mt-1'>
              {item.children?.map((child) => (
                <MenuItem key={child.path} item={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        href={item.path}
        className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
        onClick={handleClose}>
        <item.icon
          size={18}
          className={isActive ? "text-primary" : "text-[#5C4A2A] group-hover:text-primary"}
          strokeWidth={1.6}
        />
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/30 lg:hidden'
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-18 left-0 z-40 w-56 h-[calc(100vh-56px)]
          transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ background: "#FFE6B3" }}>
        <div className='flex flex-col h-full px-3 py-8'>
          {/* Nav items */}
          <nav className='flex-1 flex flex-col gap-3.5 overflow-y-auto'>
            {menuItems.map((item) => (
              <MenuItem key={item.path ?? item.title} item={item} />
            ))}
          </nav>

          {/* Logout — same style as nav items */}
          <div className='pt-4 mt-2'>
            <button
              onClick={logout}
              className='flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-[#111111] hover:text-[#F47A22] hover:bg-[#FFF3CD] hover:font-semibold transition-colors rounded-md group'>
              {/* Log Out icon inline — reuse lucide LogOut */}
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.6'
                className='text-[#5C4A2A] group-hover:text-primary'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
                <polyline points='16 17 21 12 16 7' />
                <line x1='21' y1='12' x2='9' y2='12' />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
