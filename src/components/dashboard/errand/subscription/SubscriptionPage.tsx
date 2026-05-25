"use client";

import React from "react";
import PageHeader from "../../common/PageHeader";
import { CreditCard, CheckCircle, Clock, Zap } from "lucide-react";

const SubscriptionPage = () => {
  const benefits = [
    "Unlimited errand applications",
    "Priority listing in search results",
    "Early access to high-reward tasks",
    "Premium support 24/7",
    "Professional ErrandR badge",
  ];

  return (
    <div className='w-full p-6 space-y-8'>
      <PageHeader title='Subscription' />

      {/* Subscription Status Banner */}
      <div className='bg-white rounded-2xl p-6 border border-[#EC6F27]/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm'>
        <div className='flex items-center gap-4'>
          <div className='w-14 h-14 rounded-full bg-[#FFF3CD] flex items-center justify-center'>
            <CheckCircle className='w-8 h-8 text-[#EC6F27]' />
          </div>
          <div>
            <h3 className='text-lg font-bold text-secondary'>Active Status</h3>
            <p className='text-sm text-muted'>Your subscription is currently active</p>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <span className='text-xs font-bold text-muted uppercase tracking-wider mb-1'>Next Billing</span>
          <p className='text-md font-bold text-secondary flex items-center gap-2'>
            <Clock className='w-4 h-4 text-[#EC6F27]' />
            June 25, 2026
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Pricing Card */}
        <div className='bg-white rounded-3xl overflow-hidden border border-[#EC6F27]/20 shadow-xl relative'>
          <div className='absolute top-0 right-0'>
            <div className='bg-[#EC6F27] text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest'>
              Best Value
            </div>
          </div>
          
          <div className='p-8'>
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-10 h-10 rounded-xl bg-[#FFF3CD] flex items-center justify-center'>
                <Zap className='w-6 h-6 text-[#EC6F27]' />
              </div>
              <h2 className='text-2xl font-black text-secondary uppercase tracking-tight'>Pro Plan</h2>
            </div>

            <div className='flex items-baseline gap-1 mb-8'>
              <span className='text-4xl font-black text-secondary'>$5</span>
              <span className='text-muted font-bold'>/Month</span>
            </div>

            <ul className='space-y-4 mb-8'>
              {benefits.map((benefit, index) => (
                <li key={index} className='flex items-center gap-3 text-sm font-medium text-secondary/80'>
                  <div className='w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0'>
                    <CheckCircle className='w-3.5 h-3.5 text-green-500' />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <button className='w-full py-4 bg-[#EC6F27] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#d85e1b] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-lg shadow-[#EC6F27]/20'>
              <CreditCard className='w-4 h-4' />
              Manage with Stripe
            </button>
          </div>
        </div>

        {/* Info & Stats */}
        <div className='space-y-6'>
          <div className='bg-[#FFF3CD]/50 rounded-2xl p-6 border border-[#EC6F27]/10'>
            <h3 className='text-md font-bold text-secondary uppercase tracking-wider mb-4'>Why Subscribe?</h3>
            <p className='text-sm text-secondary/70 leading-relaxed mb-4'>
              The ErrandR Pro plan is designed to help you maximize your earnings on Errand Hub. By becoming a pro member, you gain visibility and tools that help you secure more errands every month.
            </p>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-white rounded-xl p-4 border border-[#EC6F27]/5'>
                <p className='text-2xl font-black text-[#EC6F27]'>+45%</p>
                <p className='text-[10px] font-bold text-muted uppercase'>Profile Views</p>
              </div>
              <div className='bg-white rounded-xl p-4 border border-[#EC6F27]/5'>
                <p className='text-2xl font-black text-[#EC6F27]'>2x</p>
                <p className='text-[10px] font-bold text-muted uppercase'>Hire Rate</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl p-6 border border-[#EC6F27]/10'>
            <h3 className='text-md font-bold text-secondary uppercase tracking-wider mb-4'>Payment Method</h3>
            <div className='flex items-center justify-between p-4 border border-dashed border-[#EC6F27]/30 rounded-xl bg-gray-50/50'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-8 bg-secondary rounded flex items-center justify-center'>
                  <span className='text-[10px] text-white font-bold'>VISA</span>
                </div>
                <div>
                  <p className='text-sm font-bold text-secondary'>•••• •••• •••• 4242</p>
                  <p className='text-[10px] text-muted font-bold uppercase'>Expires 12/28</p>
                </div>
              </div>
              <button className='text-[#EC6F27] text-xs font-bold uppercase tracking-widest hover:underline'>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
