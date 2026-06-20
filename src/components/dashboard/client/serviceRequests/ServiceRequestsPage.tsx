"use client";

import React, { useState } from "react";
import PageHeader from "../../common/PageHeader";
import SearchBar from "../MyPost/SearchBar";
import Pagination from "@/components/common/Pagination";
import { useServiceRequests } from "./useServiceRequests";
import ServiceRequestCard from "./ServiceRequestCard";
import ServiceRequestModal from "./ServiceRequestModal";
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SERVICE_REQUEST_STATUSES } from "@/types/serviceRequest";

export default function ServiceRequestsPage() {
  const router = useRouter();
  const {
    requests,
    total,
    totalPages,
    currentPage,
    filters,
    statusCounts,
    loading,
    error,
    setSearch,
    setStatus,
    setPage,
    createRequest,
    updateRequest,
    deleteRequest,
    isCreating,
    isUpdating,
  } = useServiceRequests();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleCreateOpen = () => {
    setSelectedRequest(null);
    setIsModalOpen(true);
  };

  const handleEditOpen = (req: any) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data: any) => {
    if (selectedRequest) {
      updateRequest(
        { id: selectedRequest.id, data },
        {
          onSuccess: () => setIsModalOpen(false),
        }
      );
    } else {
      createRequest(data, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  // Status Filter Tabs customized for ServiceRequestStatus
  const renderStatusTabs = () => {
    const statusesList = ["All", ...SERVICE_REQUEST_STATUSES.map((s) => s.value)];
    return (
      <nav className="flex flex-wrap items-center gap-3">
        {statusesList.map((status) => {
          const isActive = filters.status === status;
          const statusConfig = SERVICE_REQUEST_STATUSES.find(
            (s) => s.value === status
          );
          
          const label = status === "All" ? "All" : statusConfig?.label || status;
          const count = statusCounts[status] || 0;

          const activeStyle = status === "All"
            ? "bg-[#EC6F27] text-white shadow-md"
            : `text-white shadow-md`;

          const activeBg = status === "All" ? "#EC6F27" : statusConfig?.color || "#EC6F27";

          return (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all duration-200 ${
                isActive
                  ? "text-white"
                  : "bg-white font-normal text-text-placeholder border border-[#e5e7eb] hover:border-orange-200 hover:text-orange-500"
              }`}
              style={isActive ? { backgroundColor: activeBg } : undefined}
              onClick={() => setStatus(status)}
            >
              {label}
              <span
                className={`py-0.5 px-2 rounded-full text-[10px] ${
                  isActive ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="min-h-screen py-5 px-12 font-sans">
      <div className="mx-auto flex flex-col gap-3.5">
        <div className="flex justify-between items-center">
          <PageHeader title="My Service Requests" />
          <button
            onClick={handleCreateOpen}
            className="flex items-center gap-2 bg-status-orange hover:bg-[#D95F1B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-95"
          >
            <Plus size={18} />
            Post Request
          </button>
        </div>

        <div className="mx-auto w-full mt-4">
          {/* Search Section */}
          <div className="mb-6">
            <SearchBar onSearch={setSearch} />
          </div>

          {/* Status Filter Tabs */}
          <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {renderStatusTabs()}
          </div>

          {/* Stats Info */}
          <div className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Showing {requests.length} of {total} requests
          </div>

          {/* Grid View */}
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
              <p className="mt-4 text-muted">Loading your requests...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-500">
              Failed to load service requests
            </div>
          ) : requests.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">No requests found</h3>
              <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                Try adjusting your search filters or post a new request to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {requests.map((req) => (
                <ServiceRequestCard
                  key={req.id}
                  request={req}
                  onEdit={() => handleEditOpen(req)}
                  onDelete={() => deleteRequest(req.id)}
                  onViewDetail={() => router.push(`/dashboard/service-requests/${req.id}`)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={selectedRequest}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
}
