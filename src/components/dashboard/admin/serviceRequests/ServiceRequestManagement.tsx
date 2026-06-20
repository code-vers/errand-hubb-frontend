"use client";

import React, { useState, useMemo } from "react";
import PageHeader from "../../common/PageHeader";
import Pagination from "@/components/common/Pagination";
import { useAdminServiceRequests } from "./useAdminServiceRequests";
import { format } from "date-fns";
import {
  Search,
  Loader2,
  Trash2,
  AlertTriangle,
  Eye,
  MapPin,
  Calendar,
} from "lucide-react";
import { getImageUrl } from "@/configs/api.config";
import { SERVICE_REQUEST_STATUSES } from "@/types/serviceRequest";

export default function ServiceRequestManagement() {
  const {
    requests,
    meta,
    loading,
    filters,
    updateFilter,
    changeStatus,
    deleteRequest,
  } = useAdminServiceRequests();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter("search", searchInput);
  };

  const activeStatus = filters.status;

  const statusOptions = [
    { value: "all", label: "All Statuses", count: activeStatus === "all" ? meta.total : 0 },
    ...SERVICE_REQUEST_STATUSES.map((s) => ({
      value: s.value,
      label: s.label,
      count: activeStatus === s.value ? meta.total : 0,
    })),
  ];

  return (
    <div className="w-full p-6 pt-8 font-sans bg-surface-dim min-h-screen">
      <div className="mb-8">
        <PageHeader title="Service Request Management" />
      </div>

      <main className="space-y-6">
        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {statusOptions.map((opt) => {
            const isActive = activeStatus === opt.value;
            const statusConfig = SERVICE_REQUEST_STATUSES.find(
              (s) => s.value === opt.value
            );
            const activeBg = opt.value === "all" ? "#EC6F27" : statusConfig?.color || "#EC6F27";

            return (
              <button
                key={opt.value}
                onClick={() => updateFilter("status", opt.value)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "text-white shadow-sm"
                    : "bg-white text-gray-500 border border-gray-100 hover:border-orange-200"
                }`}
                style={isActive ? { backgroundColor: activeBg } : undefined}
              >
                {opt.label}
                {isActive && opt.count > 0 && (
                  <span className="ml-1.5 py-0.5 px-1.5 rounded-full text-[9px] bg-white/20 text-white">
                    {opt.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search & Actions */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative flex items-center">
            <span className="absolute left-4 text-orange-500">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by request title, description, or client name/email..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-sm placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-1.5 rounded-lg font-bold text-xs text-white bg-primary hover:bg-primary/95 transition-all shadow-sm"
            >
              Search
            </button>
          </form>
        </div>

        {/* Table / List View */}
        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted">Loading service requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 font-sans">No service requests</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto text-sm">
              No service requests match the current filters or search criteria.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase text-[10px] font-extrabold tracking-wider">
                    <th className="py-4 px-6">Request Info</th>
                    <th className="py-4 px-6">Client</th>
                    <th className="py-4 px-6">Urgency / Budget</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Date Posted</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {requests.map((req: any) => {
                    const statusConfig = SERVICE_REQUEST_STATUSES.find(
                      (s) => s.value === req.status
                    ) || { label: req.status, color: "#6B7280", bg: "#F3F4F6" };

                    const client = req.user || {};
                    const clientName = `${client.firstName || ""} ${client.lastName || ""}`.trim() || "Client";

                    return (
                      <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-gray-900 line-clamp-1">{req.title}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                            <span
                              className="w-2 h-2 rounded-full inline-block"
                              style={{ backgroundColor: req.category?.color || "#FF7A2F" }}
                            />
                            {req.category?.name}
                            <span className="text-gray-300">|</span>
                            <MapPin size={12} />
                            {req.city}
                            {req.state ? `, ${req.state}` : ""}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 shrink-0">
                              {client.profileImage ? (
                                <img
                                  src={getImageUrl(client.profileImage) || ""}
                                  alt={clientName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-orange-500 text-white font-bold text-xs">
                                  {client.firstName?.[0] || "C"}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{clientName}</div>
                              <div className="text-[10px] text-gray-400">{client.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-800">
                            {req.budget ? `$${req.budget}` : "Open Budget"}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 uppercase font-bold tracking-wider">
                            {req.urgencyLevel}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={req.status}
                            onChange={(e) => changeStatus({ id: req.id, status: e.target.value })}
                            className="px-2 py-1 rounded-lg text-xs font-bold border border-gray-200 bg-white focus:ring-1 focus:ring-orange-400 focus:border-orange-400 outline-none"
                            style={{ color: statusConfig.color }}
                          >
                            {SERVICE_REQUEST_STATUSES.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-500">
                          {format(new Date(req.createdAt), "MMM dd, yyyy")}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => deleteRequest(req.id)}
                              className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete request"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-4 border-t border-gray-100">
              <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                onPageChange={(p) => updateFilter("page", p)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
