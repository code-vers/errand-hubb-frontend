"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import logo from "../../../public/logo2.svg";
import { Bell, Plus } from "lucide-react";
import Link from "next/link";

const DashboardNavbar = () => {
  const { user } = useAuth();

  return (
    <header className='sticky top-0 z-45 w-full bg-white '>
      <div className='flex items-center justify-between h-18 px-6 lg:px-10'>
        {/* Left — Logo */}
        <div className='flex flex-col justify-center'>
          <div className='flex items-baseline gap-0'>
            <Image src={logo} alt='logo' />
          </div>
        </div>

        {/* Right — notification icon + avatar */}
        <div className='flex items-center gap-4'>
          {/* Green action icon */}
          <button
            className='w-12 h-12 flex bg-warning-bg items-center justify-center rounded-lg hover:bg-hover transition-colors'
            aria-label='Notifications'>
            <Bell className='text-[#EC6F27]' />
          </button>

          {/* User avatar */}
          <div className='w-9 h-9 rounded-full overflow-hidden border-2 border-border shrink-0'>
            {user?.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.name ?? user.email ?? "User"}
                width={36}
                height={36}
                className='w-full h-full object-cover'
              />
            ) : (
              /* Fallback: initials circle */
              <div className='w-full h-full bg-primary flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>
                  {(user?.name ?? user?.email ?? "User")[0]?.toUpperCase() ?? "U"}
                </span>
              </div>
            )}
          </div>

          {/* Post an Errand Button — Only for Clients */}
          {user?.role === "client" && (
            <Link
              href='/post-errand'
              className='hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e66a10] transition-colors'>
              <span>Post an Errand</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
