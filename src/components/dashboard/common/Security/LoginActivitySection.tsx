"use client";

import type { LoginActivity } from "@/types/settings";
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

interface LoginActivitySectionProps {
  activities: LoginActivity[];
  onRefresh: () => Promise<void>;
  isLoading?: boolean;
}

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

const LoginActivitySection: FC<LoginActivitySectionProps> = ({
  activities,
  onRefresh,
  isLoading = false,
}) => {
  return (
    <section className='bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex flex-col gap-0'>
      <header className='flex items-start gap-4 p-6 border-b border-[#f5ebd8]'>
        <div className='bg-green-50 p-3 rounded-lg shrink-0'>
          <Activity className='w-6 h-6 text-green-600' />
        </div>
        <div>
          <h2 className='text-[18px] font-bold text-foreground'>
            Recent Login Activity
          </h2>
          <p className='text-sm text-[#4B5563] mt-1'>
            Devices and locations that have accessed your account.
          </p>
        </div>
      </header>

      <div className='flex flex-col'>
        {activities.map((activity) => {
          const DeviceIcon =
            deviceIcons[activity.deviceIcon as keyof typeof deviceIcons] ||
            Globe;
          const status =
            statusStyles[activity.status as keyof typeof statusStyles];

          return (
            <div
              key={activity.id}
              className={`flex items-center justify-between py-4 border-b border-[#f5ebd8]
                px-6 ${status.rowBg}`}>
              <div className='flex items-center gap-4'>
                <div
                  className={`p-2 rounded-lg ${
                    activity.status === "suspicious"
                      ? "bg-red-50"
                      : "bg-orange-50"
                  }`}>
                  <DeviceIcon
                    className={`w-5 h-5 ${
                      activity.status === "suspicious"
                        ? "text-red-600"
                        : "text-[var(--color-primary)]"
                    }`}
                  />
                </div>
                <div>
                  <p className='text-sm font-semibold text-foreground'>
                    {activity.device}
                    <span className='font-normal text-[#6B7280] text-xs ml-1'>
                      • {activity.browser}
                    </span>
                  </p>
                  <p className='text-xs text-[#4B5563] mt-0.5'>
                    {activity.location} · {activity.timestamp}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <span
                  className={`${status.bg} ${status.text} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1`}>
                  {activity.status === "suspicious" && (
                    <AlertTriangle className='w-3 h-3' />
                  )}
                  {status.label}
                </span>
                <ChevronRight className='w-4 h-4 text-[#f5ebd8]' />
              </div>
            </div>
          );
        })}
      </div>

      <footer className='flex p-4 justify-between items-center pt-4 border-b border-[#f5ebd8] mt-2'>
        <p className='text-xs text-[#6B7280]'>
          Showing {activities.length} recent sessions
        </p>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className='text-xs text-[var(--color-primary)] font-semibold flex items-center gap-1 hover:text-[var(--color-primary-dark)] transition-colors'>
          <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </footer>
    </section>
  );
};

export default LoginActivitySection;
