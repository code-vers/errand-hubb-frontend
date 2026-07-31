"use client";

import { authService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { 
  ShieldCheck, 
  Key, 
  UserPlus, 
  RefreshCw, 
  ChevronRight, 
  History, 
  MailWarning, 
  Lock,
  Unlock,
  AlertOctagon
} from "lucide-react";
import { FC } from "react";
import { formatDistanceToNow } from "date-fns";

const eventConfig: Record<string, { icon: any, color: string, label: string }> = {
  ACCOUNT_CREATED: { icon: UserPlus, color: "text-green-600", label: "Account Created" },
  PASSWORD_CHANGED: { icon: Key, color: "text-blue-600", label: "Password Changed" },
  TWO_FACTOR_ENABLED: { icon: Lock, color: "text-indigo-600", label: "2FA Enabled" },
  TWO_FACTOR_DISABLED: { icon: Unlock, color: "text-orange-600", label: "2FA Disabled" },
  PASSWORD_RESET_REQUESTED: { icon: MailWarning, color: "text-amber-600", label: "Password Reset Requested" },
  PASSWORD_RESET_COMPLETED: { icon: ShieldCheck, color: "text-emerald-600", label: "Password Reset Completed" },
  RECOVERY_CODE_USED: { icon: AlertOctagon, color: "text-red-600", label: "Recovery Code Used" },
};

const SecurityLogsSection: FC = () => {
  const { data: logs = [], isLoading, refetch } = useQuery({
    queryKey: ["security-logs"],
    queryFn: async () => {
      const response = await authService.getSecurityLogs();
      return response.data;
    },
  });

  return (
    <section className='bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#f5ebd8] flex flex-col overflow-hidden'>
      <header className='flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border-b border-[#f5ebd8]'>
        <div className='bg-blue-50 p-2.5 sm:p-3 rounded-lg shrink-0'>
          <History className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600' />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
            <h2 className='text-sm sm:text-[18px] font-bold text-foreground truncate'>
              Security Audit Logs
            </h2>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className='text-xs text-blue-600 font-bold flex items-center gap-1.5 hover:bg-blue-50 px-2.5 py-1 rounded-lg transition-all border border-transparent hover:border-blue-100 uppercase self-start sm:self-auto cursor-pointer shrink-0'>
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              Sync Logs
            </button>
          </div>
          <p className='text-xs sm:text-sm text-[#4B5563] mt-0.5 sm:mt-1'>
            Track important security changes to your account.
          </p>
        </div>
      </header>

      <div className='flex flex-col'>
        {isLoading ? (
          <div className="p-6 text-center text-sm text-gray-500 italic">Syncing security events...</div>
        ) : logs.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">No security events recorded yet.</div>
        ) : (
          logs.map((log: any) => {
            const config = eventConfig[log.event] || { icon: ShieldCheck, color: "text-gray-500", label: log.event };
            const Icon = config.icon;

            return (
              <div
                key={log.id}
                className='flex items-center justify-between py-4 sm:py-5 border-b border-[#f5ebd8] last:border-0 px-4 sm:px-6 hover:bg-gray-50/30 transition-colors gap-2'>
                <div className='flex items-center gap-3 sm:gap-4 min-w-0 flex-1'>
                  <div className={`p-2 sm:p-2.5 rounded-xl bg-gray-50 border border-gray-100 shrink-0`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${config.color}`} />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-xs sm:text-sm font-bold text-foreground uppercase tracking-tight truncate'>
                      {config.label}
                    </p>
                    <p className='text-[10px] sm:text-[11px] text-[#6B7280] mt-0.5 sm:mt-1 flex flex-wrap items-center gap-1 sm:gap-1.5 font-medium min-w-0'>
                      <span className='truncate'>{log.device}</span>
                      <span className="text-gray-300">•</span>
                      <span className='truncate'>{log.ipAddress}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-primary font-bold truncate">{formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}</span>
                    </p>
                  </div>
                </div>

                <ChevronRight className='w-4 h-4 text-gray-300 shrink-0' />
              </div>
            );
          })
        )}
      </div>

      <footer className='flex p-4 justify-center items-center bg-gray-50/50 rounded-b-lg border-t border-[#f5ebd8]'>
        <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
          Security monitoring enabled · Immutable history
        </p>
      </footer>
    </section>
  );
};

export default SecurityLogsSection;
