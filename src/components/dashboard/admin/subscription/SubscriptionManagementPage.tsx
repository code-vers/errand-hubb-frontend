"use client";

import React, { useState } from "react";
import PageHeader from "../../common/PageHeader";
import { CreditCard, Users, DollarSign, ArrowUpRight, Search, Filter, Loader2, AlertCircle } from "lucide-react";
import { useAdminSubscriptions } from "./useAdminSubscriptions";
import { format } from "date-fns";

const SubscriptionManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { subscriptions, loading, error, meta } = useAdminSubscriptions({ search: searchTerm });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active": 
      case "trialing":
        return "bg-green-50 text-green-600 border-green-100";
      case "canceled": 
      case "past_due":
      case "unpaid":
        return "bg-red-50 text-red-600 border-red-100";
      case "incomplete":
      case "incomplete_expired":
        return "bg-yellow-50 text-yellow-600 border-yellow-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const activeCount = subscriptions.filter((s: any) => s.status === "active").length;
  const totalRevenue = subscriptions.reduce((sum: number, s: any) => sum + (s.status === "active" ? Number(s.amount) : 0), 0);
  const avgOrderValue = activeCount > 0 ? (totalRevenue / activeCount).toFixed(2) : "0.00";

  if (error) {
    return (
      <div className='w-full p-6 flex justify-center items-center h-64'>
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-6 h-6" />
          <p>Failed to load subscriptions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full p-6 space-y-8'>
      <PageHeader title='Subscription Management' />

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white p-6 rounded-2xl border border-border shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600'>
              <Users className='w-5 h-5' />
            </div>
            <span className='flex items-center text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg'>
              <ArrowUpRight className='w-3 h-3 mr-1' />
              Active
            </span>
          </div>
          <p className='text-muted text-[10px] font-black uppercase tracking-widest'>Total Subscribers</p>
          <h3 className='text-2xl font-black text-secondary mt-1'>{meta.total}</h3>
        </div>

        <div className='bg-white p-6 rounded-2xl border border-border shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600'>
              <DollarSign className='w-5 h-5' />
            </div>
          </div>
          <p className='text-muted text-[10px] font-black uppercase tracking-widest'>Monthly Revenue</p>
          <h3 className='text-2xl font-black text-secondary mt-1'>${totalRevenue}</h3>
        </div>

        <div className='bg-white p-6 rounded-2xl border border-border shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#EC6F27]'>
              <CreditCard className='w-5 h-5' />
            </div>
          </div>
          <p className='text-muted text-[10px] font-black uppercase tracking-widest'>Avg. Order Value</p>
          <h3 className='text-2xl font-black text-secondary mt-1'>${avgOrderValue}</h3>
        </div>

        <div className='bg-white p-6 rounded-2xl border border-border shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600'>
              <ArrowUpRight className='w-5 h-5' />
            </div>
          </div>
          <p className='text-muted text-[10px] font-black uppercase tracking-widest'>Status</p>
          <h3 className='text-2xl font-black text-secondary mt-1'>Live</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className='bg-white rounded-2xl border border-border shadow-sm overflow-hidden'>
        <div className='p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <h3 className='text-lg font-bold text-secondary flex items-center gap-2'>
            Subscribers List
            <span className='text-sm text-muted font-normal'>({meta.total})</span>
          </h3>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted' />
              <input 
                type="text" 
                placeholder="Search subscribers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-9 pr-4 py-2 bg-gray-50/50 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full md:w-64'
              />
            </div>
            <button className='p-2 bg-gray-50/50 border border-border rounded-xl hover:bg-gray-100 transition-colors'>
              <Filter className='w-4 h-4 text-muted' />
            </button>
          </div>
        </div>

        <div className='overflow-x-auto relative'>
          {loading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-50/50 text-left'>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>ErrandR</th>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>Plan</th>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>Amount</th>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>Status</th>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>Next Billing / End Date</th>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border'>
              {subscriptions.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted text-sm font-medium">
                    No subscriptions found.
                  </td>
                </tr>
              )}
              {subscriptions.map((sub: any) => (
                <tr key={sub.id} className='hover:bg-gray-50/30 transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs'>
                        {sub.user?.firstName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className='text-sm font-bold text-secondary'>{sub.user?.firstName} {sub.user?.lastName}</p>
                        <p className='text-[10px] text-muted'>{sub.user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-xs font-bold text-secondary'>{sub.planName}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-xs font-bold text-[#EC6F27]'>${Number(sub.amount)}/{sub.interval}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${getStatusStyle(sub.status)}`}>
                      {sub.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-xs text-secondary font-medium'>
                    {sub.currentPeriodEnd ? format(new Date(sub.currentPeriodEnd), "MMM dd, yyyy") : "N/A"}
                    {sub.cancelAtPeriodEnd && <span className="block text-[9px] text-red-500 font-bold uppercase mt-1">Canceling</span>}
                  </td>
                  <td className='px-6 py-4'>
                    <button className='text-primary text-[10px] font-black uppercase tracking-widest hover:underline'>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagementPage;
