"use client";

import { authService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  ChevronRight,
  Globe,
  Laptop,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
} from "lucide-react";
import { FC } from "react";
import { formatDistanceToNow } from "date-fns";

const deviceIcons = {
  laptop: Laptop,
  smartphone: Smartphone,
  monitor: Monitor,
  tablet: Tablet,
  globe: Globe,
};

const statusStyles = {
  current: {
    bg: "bg-[var(--color-badge-pending)]",
    text: "text-[var(--color-status-orange)]",
    label: "Current Session",
    rowBg: "bg-green-50/30",
  },
  active: {
    bg: "bg-[var(--color-badge-scheduled)]",
    text: "text-[var(--color-status-blue)]",
    label: "Active",
    rowBg: "",
  },
  ended: {
    bg: "bg-gray-100",
    text: "text-[var(--color-text-secondary)]",
    label: "Ended",
    rowBg: "",
  },
  suspicious: {
    bg: "bg-red-100",
    text: "text-[var(--color-error)]",
    label: "Suspicious",
    rowBg: "bg-red-50/30",
  },
};

const LoginActivitySection: FC = () => {
  const { data: activities = [], isLoading, refetch } = useQuery({
    queryKey: ["login-activity"],
    queryFn: async () => {
      const response = await authService.getLoginActivity();
      return response.data;
    },
  });

  return (
    <section className='bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex flex-col gap-0 overflow-hidden'>
      <header className='flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border-b border-[#f5ebd8]'>
        <div className='bg-green-50 p-2.5 sm:p-3 rounded-lg shrink-0'>
          <Activity className='w-5 h-5 sm:w-6 sm:h-6 text-green-600' />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
            <h2 className='text-sm sm:text-[18px] font-bold text-foreground truncate'>
              Recent Login Activity
            </h2>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className='text-xs text-[var(--color-primary)] font-bold flex items-center gap-1.5 hover:bg-orange-50 px-2.5 py-1 rounded-lg transition-all border border-transparent hover:border-orange-100 self-start sm:self-auto cursor-pointer shrink-0'>
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              REFRESH
            </button>
          </div>
          <p className='text-xs sm:text-sm text-[#4B5563] mt-0.5 sm:mt-1'>
            Devices and locations that have accessed your account.
          </p>
        </div>
      </header>

      <div className='flex flex-col'>
        {isLoading ? (
          <div className="p-6 text-center text-sm text-gray-500">Loading activity history...</div>
        ) : activities.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">No login activity recorded yet.</div>
        ) : (
          activities.map((activity: any, index: number) => {
            const DeviceIcon =
              deviceIcons[activity.deviceIcon as keyof typeof deviceIcons] ||
              Globe;
            
            const isCurrent = index === 0;
            const statusStyle = isCurrent ? statusStyles.current : statusStyles.active;

            return (
              <div
                key={activity.id}
                className={`flex items-center justify-between py-4 sm:py-5 border-b border-[#f5ebd8] last:border-0
                  px-4 sm:px-6 ${isCurrent ? "bg-orange-50/20" : "hover:bg-gray-50/50"} transition-colors gap-2`}>
                <div className='flex items-center gap-3 sm:gap-4 min-w-0 flex-1'>
                  <div
                    className={`p-2 sm:p-2.5 rounded-xl shrink-0 ${
                      isCurrent ? "bg-orange-100/50" : "bg-gray-100/80"
                    }`}>
                    <DeviceIcon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isCurrent ? "text-primary" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 flex-wrap truncate'>
                      <span className='truncate'>{activity.device}</span>
                      <span className='font-medium text-[#6B7280] text-[10px] sm:text-[11px] bg-gray-100 px-2 py-0.5 rounded-full shrink-0'>
                        {activity.browser}
                      </span>
                    </p>
                    <p className='text-[10px] sm:text-xs text-[#6B7280] mt-0.5 sm:mt-1 flex flex-wrap items-center gap-1 sm:gap-1.5 min-w-0'>
                      <span className="font-semibold text-gray-400 truncate">{activity.ipAddress}</span>
                      <span className="text-gray-300">•</span>
                      <span className='truncate'>{formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}</span>
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2 sm:gap-3 shrink-0'>
                  <span
                    className={`${statusStyle.bg} ${statusStyle.text} text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:py-1 rounded-md uppercase tracking-wider shadow-2xs`}>
                    {statusStyle.label}
                  </span>
                  <ChevronRight className='w-4 h-4 text-gray-300 shrink-0' />
                </div>
              </div>
            );
          })
        )}
      </div>

      <footer className='flex p-4 justify-center items-center bg-gray-50/50 rounded-b-lg border-t border-[#f5ebd8]'>
        <p className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>
          Secure session management active
        </p>
      </footer>
    </section>
  );
};

export default LoginActivitySection;
