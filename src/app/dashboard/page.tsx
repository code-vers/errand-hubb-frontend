"use client";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import ErrandDashboardPage from "@/components/dashboard/errand/dashboard/ErrandDashboardPage";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === "client") {
      router.push("/dashboard/profile");
    }
  }, [user, router]);

  if (!user || user.role === "client") return null;

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <ErrandDashboardPage />;
};

export default DashboardPage;
