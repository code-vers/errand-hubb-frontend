'use client';

import { useAuth } from '@/context/AuthContext';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <div className="flex items-center justify-center h-screen bg-white font-medium text-secondary">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-surface-dim overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
