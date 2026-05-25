"use client";

import React from "react";
import PageHeader from "../../common/PageHeader";
import { CreditCard, Users, DollarSign, ArrowUpRight, Search, Filter } from "lucide-react";
import StatCard from "../StatCard";

const SubscriptionManagementPage = () => {
  const subscribers = [
    { id: "1", name: "Rakib Ahmed", email: "rakib@example.com", plan: "Pro Plan", amount: "$5", status: "Active", date: "May 20, 2026" },
    { id: "2", name: "Junaid Islam", email: "junaid@example.com", plan: "Pro Plan", amount: "$5", status: "Active", date: "May 18, 2026" },
    { id: "3", name: "Sarah Khan", email: "sarah@example.com", plan: "Pro Plan", amount: "$5", status: "Expired", date: "April 15, 2026" },
    { id: "4", name: "Alex Johnson", email: "alex@example.com", plan: "Pro Plan", amount: "$5", status: "Active", date: "May 22, 2026" },
    { id: "5", name: "Maria Garcia", email: "maria@example.com", plan: "Pro Plan", amount: "$5", status: "Active", date: "May 10, 2026" },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-50 text-green-600 border-green-100";
      case "Expired": return "bg-red-50 text-red-600 border-red-100";
      case "Pending": return "bg-yellow-50 text-yellow-600 border-yellow-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

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
              12%
            </span>
          </div>
          <p className='text-muted text-[10px] font-black uppercase tracking-widest'>Total Subscribers</p>
          <h3 className='text-2xl font-black text-secondary mt-1'>1,284</h3>
        </div>

        <div className='bg-white p-6 rounded-2xl border border-border shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600'>
              <DollarSign className='w-5 h-5' />
            </div>
            <span className='flex items-center text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg'>
              <ArrowUpRight className='w-3 h-3 mr-1' />
              8%
            </span>
          </div>
          <p className='text-muted text-[10px] font-black uppercase tracking-widest'>Monthly Revenue</p>
          <h3 className='text-2xl font-black text-secondary mt-1'>$6,420</h3>
        </div>

        <div className='bg-white p-6 rounded-2xl border border-border shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#EC6F27]'>
              <CreditCard className='w-5 h-5' />
            </div>
          </div>
          <p className='text-muted text-[10px] font-black uppercase tracking-widest'>Avg. Order Value</p>
          <h3 className='text-2xl font-black text-secondary mt-1'>$5.00</h3>
        </div>

        <div className='bg-white p-6 rounded-2xl border border-border shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600'>
              <ArrowUpRight className='w-5 h-5' />
            </div>
          </div>
          <p className='text-muted text-[10px] font-black uppercase tracking-widest'>Churn Rate</p>
          <h3 className='text-2xl font-black text-secondary mt-1'>2.4%</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className='bg-white rounded-2xl border border-border shadow-sm overflow-hidden'>
        <div className='p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <h3 className='text-lg font-bold text-secondary flex items-center gap-2'>
            Subscribers List
            <span className='text-sm text-muted font-normal'>(5)</span>
          </h3>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted' />
              <input 
                type="text" 
                placeholder="Search subscribers..." 
                className='pl-9 pr-4 py-2 bg-gray-50/50 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full md:w-64'
              />
            </div>
            <button className='p-2 bg-gray-50/50 border border-border rounded-xl hover:bg-gray-100 transition-colors'>
              <Filter className='w-4 h-4 text-muted' />
            </button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-50/50 text-left'>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>ErrandR</th>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>Plan</th>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>Amount</th>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>Status</th>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>Next Billing</th>
                <th className='px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border'>
              {subscribers.map((sub) => (
                <tr key={sub.id} className='hover:bg-gray-50/30 transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs'>
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <p className='text-sm font-bold text-secondary'>{sub.name}</p>
                        <p className='text-[10px] text-muted'>{sub.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-xs font-bold text-secondary'>{sub.plan}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-xs font-bold text-[#EC6F27]'>{sub.amount}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${getStatusStyle(sub.status)}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-xs text-secondary font-medium'>
                    {sub.date}
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
