"use client";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import ErrandDashboardPage from "@/components/dashboard/errand/dashboard/ErrandDashboardPage";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className='bg-white p-6 rounded-xl border border-border shadow-sm'>
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-sm font-medium text-muted'>{title}</p>
        <h3 className='text-2xl font-bold text-foreground mt-1'>{value}</h3>
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
    if (user?.role === "client") {
      router.push("/dashboard/profile");
    }
  }, [user, router]);

  if (!user || user.role === "client") return null;

  return <ErrandDashboardPage />;
};

export default DashboardPage;
