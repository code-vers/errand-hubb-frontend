"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../../common/PageHeader";
import { CreditCard, CheckCircle, Clock, Zap, Loader2, AlertCircle } from "lucide-react";
import { useSubscription } from "./useSubscription";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const SubscriptionPage = () => {
  const { subscription, loading, error, subscribe, manageBilling, isSubscribing, isManaging } = useSubscription();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Subscription successful! Welcome to Pro.");
      // Invalidate and refetch to get the latest status from webhook
      queryClient.invalidateQueries({ queryKey: ["my-subscription"] });
    }
    if (searchParams.get("canceled")) {
      toast.error("Subscription checkout was canceled.");
    }
  }, [searchParams, queryClient]);

  const benefits = [
    "Unlimited errand applications",
    "Priority listing in search results",
    "Early access to high-reward tasks",
    "Premium support 24/7",
    "Professional ErrandR badge",
  ];

  if (loading) {
    return (
      <div className='w-full p-6 space-y-8 flex justify-center items-center h-64'>
        <Loader2 className="w-8 h-8 animate-spin text-[#EC6F27]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full p-6 space-y-8 flex justify-center items-center h-64'>
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-6 h-6" />
          <p>Failed to load subscription details.</p>
        </div>
      </div>
    );
  }

  const isSubscribed = subscription?.isSubscribed;
  const isCanceled = subscription?.cancelAtPeriodEnd;
  
  return (
    <div className='w-full p-6 space-y-8'>
      <PageHeader title='Subscription' />

      {/* Subscription Status Banner */}
      <div className={`rounded-2xl p-6 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm ${isSubscribed ? 'bg-white border-[#EC6F27]/10' : 'bg-gray-50 border-gray-200'}`}>
        <div className='flex items-center gap-4'>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isSubscribed ? 'bg-[#FFF3CD]' : 'bg-gray-200'}`}>
            {isSubscribed ? (
              <CheckCircle className='w-8 h-8 text-[#EC6F27]' />
            ) : (
              <AlertCircle className='w-8 h-8 text-gray-500' />
            )}
          </div>
          <div>
            <h3 className='text-lg font-bold text-secondary'>
              {isSubscribed ? (isCanceled ? "Canceling Soon" : "Active Status") : "Not Subscribed"}
            </h3>
            <p className='text-sm text-muted'>
              {isSubscribed 
                ? (isCanceled ? "Your subscription will cancel at the end of the billing period" : "Your subscription is currently active") 
                : "Upgrade to Pro to access all features"}
            </p>
          </div>
        </div>
        
        {isSubscribed && subscription?.currentPeriodEnd && (
          <div className='flex flex-col items-end'>
            <span className='text-xs font-bold text-muted uppercase tracking-wider mb-1'>
              {isCanceled ? "Ends On" : "Next Billing"}
            </span>
            <p className='text-md font-bold text-secondary flex items-center gap-2'>
              <Clock className='w-4 h-4 text-[#EC6F27]' />
              {format(new Date(subscription.currentPeriodEnd), "MMMM dd, yyyy")}
            </p>
          </div>
        )}
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
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
              <div className='flex items-center gap-2'>
                <div className='w-10 h-10 rounded-xl bg-[#FFF3CD] flex items-center justify-center'>
                  <Zap className='w-6 h-6 text-[#EC6F27]' />
                </div>
                <h2 className='text-2xl font-black text-secondary uppercase tracking-tight'>Pro Plan</h2>
              </div>
              
              {!isSubscribed && (
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${billingCycle === 'monthly' ? 'bg-white text-secondary shadow-sm' : 'text-muted hover:text-secondary'}`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${billingCycle === 'yearly' ? 'bg-[#EC6F27] text-white shadow-sm' : 'text-muted hover:text-secondary'}`}
                  >
                    Yearly
                  </button>
                </div>
              )}
            </div>

            <div className='flex items-baseline gap-1 mb-8'>
              <span className='text-4xl font-black text-secondary'>${billingCycle === 'yearly' ? '50' : '5'}</span>
              <span className='text-muted font-bold'>/{billingCycle === 'yearly' ? 'Year' : 'Month'}</span>
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

            {isSubscribed ? (
              <button 
                onClick={() => manageBilling()}
                disabled={isManaging}
                className='w-full py-4 bg-gray-800 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-900 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-lg shadow-gray-800/20 disabled:opacity-70 disabled:cursor-not-allowed'>
                {isManaging ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className='w-4 h-4' />}
                Manage Billing
              </button>
            ) : (
              <button 
                onClick={() => subscribe(billingCycle)}
                disabled={isSubscribing}
                className='w-full py-4 bg-[#EC6F27] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#d85e1b] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-lg shadow-[#EC6F27]/20 disabled:opacity-70 disabled:cursor-not-allowed'>
                {isSubscribing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className='w-4 h-4' />}
                Subscribe Now
              </button>
            )}
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

          {isSubscribed && subscription?.stripeCustomerId && (
            <div className='bg-white rounded-2xl p-6 border border-[#EC6F27]/10'>
              <h3 className='text-md font-bold text-secondary uppercase tracking-wider mb-4'>Payment Method</h3>
              <div className='flex items-center justify-between p-4 border border-dashed border-[#EC6F27]/30 rounded-xl bg-gray-50/50'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-8 bg-secondary rounded flex items-center justify-center'>
                    <span className='text-[10px] text-white font-bold'>STRIPE</span>
                  </div>
                  <div>
                    <p className='text-sm font-bold text-secondary'>Secure Payment</p>
                    <p className='text-[10px] text-muted font-bold uppercase'>Managed via Billing Portal</p>
                  </div>
                </div>
                <button 
                  onClick={() => manageBilling()}
                  className='text-[#EC6F27] text-xs font-bold uppercase tracking-widest hover:underline'>
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
