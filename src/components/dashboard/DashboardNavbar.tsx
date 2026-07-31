"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo2.svg";
import { getImageUrl } from "@/configs/api.config";
import NotificationDropdown from "./common/NotificationDropdown";
import { Menu, X } from "lucide-react";

interface DashboardNavbarProps {
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

const DashboardNavbar = ({
  isSidebarOpen,
  onToggleSidebar,
}: DashboardNavbarProps) => {
  const { user } = useAuth();

  const profileImageUrl = getImageUrl(user?.profileImage);

  return (
    <header className='sticky top-0 z-45 w-full bg-white border-b border-gray-100'>
      <div className='flex items-center justify-between h-18 px-4 sm:px-6 lg:px-10'>
        {/* Left — Mobile Menu Toggle + Logo */}
        <div className='flex items-center gap-3'>
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className='p-2 rounded-md lg:hidden flex items-center justify-center shrink-0 cursor-pointer transition-all active:scale-95'
              style={{ background: "#FFE6B3", border: "1px solid #E8C98A" }}
              aria-label='Toggle menu'
            >
              {isSidebarOpen ? (
                <X size={20} className='text-[#5C4A2A]' />
              ) : (
                <Menu size={20} className='text-[#5C4A2A]' />
              )}
            </button>
          )}
          <Link href='/' className='flex items-center gap-0 shrink-0'>
            <Image src={logo} alt='logo' className='h-10 sm:h-12 w-auto object-contain' priority />
          </Link>
        </div>

        {/* Right — notification icon + avatar */}
        <div className='flex items-center gap-4'>
          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* User avatar */}
          <Link
            href='/dashboard/profile'
            className='w-9 h-9 rounded-full overflow-hidden border-2 border-border shrink-0'>
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={user?.firstName ?? user?.email ?? "User"}
                className='w-full h-full object-cover'
              />
            ) : (
              /* Fallback: initials circle */
              <div className='w-full h-full bg-primary flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>
                  {(user?.firstName ??
                    user?.email ??
                    "User")[0]?.toUpperCase() ?? "U"}
                </span>
              </div>
            )}
          </Link>

          {/* Role-based action button */}
          {user?.role === "client" ? (
            <Link
              href='/post-errand'
              className='hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e66a10] transition-colors'>
              <span>Post an Errand</span>
            </Link>
          ) : user?.role === "errand" ? (
            <Link
              href='/dashboard/profile'
              className='hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e66a10] transition-colors'>
              <span>Update Profile</span>
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
