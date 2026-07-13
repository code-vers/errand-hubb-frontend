"use client";

import React, { useState } from "react";
import PageHeader from "../../common/PageHeader";
import { useAdminChatSchedules } from "./useAdminChatSchedules";
import { format } from "date-fns";
import {
  Search,
  Loader2,
  Calendar,
  User,
  MessageSquare,
} from "lucide-react";
import { getImageUrl } from "@/configs/api.config";

export default function ServiceRequestManagement() {
  const {
    schedules,
    isLoading: loadingSchedules,
  } = useAdminChatSchedules();

  const [scheduleSearchInput, setScheduleSearchInput] = useState("");

  const renderAvatar = (user: any) => {
    if (user?.profileImage) {
      return (
        <img 
          src={getImageUrl(user.profileImage)} 
          alt={user.firstName}
          className="w-full h-full object-cover"
        />
      );
    }
    return <User size={14} className="text-gray-400" />;
  };

  const filteredSchedules = schedules.filter((msg: any) => {
    const search = scheduleSearchInput.toLowerCase();
    const c = msg.conversation;
    if (!c) return false;
    const clientName = `${c.client?.firstName} ${c.client?.lastName}`.toLowerCase();
    const errandName = `${c.errand?.firstName} ${c.errand?.lastName}`.toLowerCase();
    return clientName.includes(search) || errandName.includes(search);
  });

  return (
    <div className="w-full p-6 pt-8 font-sans bg-surface-dim min-h-[calc(100vh-64px)] flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <PageHeader title="Service Request Management" />
      </div>

      <main className="flex-1 flex flex-col space-y-6 animate-in fade-in duration-200">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative flex items-center">
            <span className="absolute left-4 text-orange-500">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={scheduleSearchInput}
              onChange={(e) => setScheduleSearchInput(e.target.value)}
              placeholder="Search schedules by Client or Errandr name..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {loadingSchedules ? (
          <div className="py-16 text-center">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted">Loading chat schedules...</p>
          </div>
        ) : filteredSchedules.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center shadow-sm border border-gray-100">
            <MessageSquare size={32} className="mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-bold text-gray-800 font-sans">No schedules found</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto text-sm">
              No calendar invites have been sent in any chats yet, or none match your search.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase text-[10px] font-extrabold tracking-wider">
                    <th className="py-4 px-6">Scheduled Date & Time</th>
                    <th className="py-4 px-6">Client</th>
                    <th className="py-4 px-6">Errandr</th>
                    <th className="py-4 px-6">Sender</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredSchedules.map((msg: any) => {
                    const c = msg.conversation;
                    if (!c) return null;
                    
                    const scheduleDate = msg.metadata?.date ? new Date(msg.metadata.date) : null;
                    const status = msg.metadata?.status || 'pending';
                    const isClientSender = msg.senderId === c.client?.id;

                    return (
                      <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                              <Calendar size={16} />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">
                                {scheduleDate ? format(scheduleDate, 'MMM dd, yyyy') : 'Unknown'}
                              </div>
                              <div className="text-xs text-gray-500 font-semibold mt-0.5">
                                {scheduleDate ? format(scheduleDate, 'h:mm a') : 'Unknown'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center">
                              {renderAvatar(c.client)}
                            </div>
                            <span className="font-semibold text-gray-800 text-xs">
                              {c.client?.firstName} {c.client?.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center">
                              {renderAvatar(c.errand)}
                            </div>
                            <span className="font-semibold text-gray-800 text-xs">
                              {c.errand?.firstName} {c.errand?.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                            isClientSender ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {isClientSender ? 'Client' : 'Errandr'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                            status === 'accepted' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
