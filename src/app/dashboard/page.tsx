'use client';
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import { Briefcase, Users, CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted">{title}</p>
        <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === 'client') {
      router.push('/dashboard/profile');
    }
  }, [user, router]);

  if (!user || user.role === 'client') return null;

  return (
    <DashboardContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary">
          Welcome back, <span className="text-primary capitalize">{user.role}</span>
        </h1>
        <p className="text-muted">Here is what&apos;s happening with your account today.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {user.role === 'errand' && (
          <>
            <StatCard title="Active Tasks" value="2" icon={Briefcase} color="bg-blue-50 text-blue-600" />
            <StatCard title="Earnings (Month)" value="$850" icon={Clock} color="bg-green-50 text-green-600" />
            <StatCard title="Rating" value="4.9/5" icon={CheckCircle} color="bg-yellow-50 text-yellow-600" />
            <StatCard title="Completed Jobs" value="128" icon={Briefcase} color="bg-purple-50 text-purple-600" />
          </>
        )}

        {user.role === 'admin' && (
          <>
            <StatCard title="Total Users" value="1,234" icon={Users} color="bg-blue-50 text-blue-600" />
            <StatCard title="Pending Verifications" value="42" icon={Clock} color="bg-orange-50 text-orange-600" />
            <StatCard title="Total Revenue" value="$15,670" icon={Briefcase} color="bg-green-50 text-green-600" />
            <StatCard title="System Health" value="100%" icon={CheckCircle} color="bg-teal-50 text-teal-600" />
          </>
        )}
      </div>

      <div className="mt-12 bg-white p-6 rounded-xl border border-border shadow-sm">
        <h2 className="text-lg font-bold text-secondary mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
              <div className="w-10 h-10 rounded-full bg-surface-dim flex items-center justify-center">
                <Clock size={18} className="text-muted" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Sample activity title {i}</p>
                <p className="text-xs text-muted">2 hours ago</p>
              </div>
              <div className="text-sm font-semibold text-primary">+45.00</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardContainer>
  );
};

export default DashboardPage;
