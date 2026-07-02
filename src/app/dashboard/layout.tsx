"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className='flex items-center justify-center h-screen bg-white font-medium text-secondary'>
        Loading...
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen bg-surface-dim overflow-hidden'>
      <DashboardNavbar />
      <div className='flex flex-1 overflow-hidden relative'>
        <DashboardSidebar />
        <main className='flex-1 bg-[#fff3cd] overflow-y-auto lg:ml-56'>
          {children}
        </main>
      </div>
    </div>
  );
}
