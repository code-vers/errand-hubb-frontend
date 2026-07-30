import React from "react";
import { CheckCircle2, User, Search, HandHeart, Users, CheckCircle, Tag, Wallet, MessageCircle, PiggyBank, FileX, CreditCard, Ban, LineChart, BadgeCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'Competition | ErrandHubb',
  description: 'See how ErrandHubb compares to other service marketplaces.',
};

const competitors = [
  {
    name: "TaskRabbit",
    logoColor: "text-[#249653]",
    customerCost: "$20 - $200+ Service Fee",
    workerCost: "Up to 41% Commission",
  },
  {
    name: "Thumbtack",
    logoColor: "text-[#0096d6]",
    customerCost: "15% Fee + $25 Service Fee",
    workerCost: "Pros pay for leads\n$15 - $150+ per lead",
  },
  {
    name: "Handy",
    logoColor: "text-[#008fca]",
    customerCost: "From $79 Service Fee",
    workerCost: "15% - 25% Commission",
  },
  {
    name: "Angi",
    logoColor: "text-[#eb3324]",
    customerCost: "$15 - $85 Service Fee",
    workerCost: "Memberships from\n$85 - $249/year + lead fees",
  },
  {
    name: "bark",
    logoColor: "text-black",
    customerCost: "$20 - $70 Service Fee",
    workerCost: "Pros pay for leads\n$20 - $70 per lead",
  },
  {
    name: "Porch",
    logoColor: "text-[#f27421]",
    customerCost: "$5 - $65 Service Fee",
    workerCost: "Lead fees vary\n$10 - $75 per lead",
  },
  {
    name: "HomeAdvisor",
    logoColor: "text-[#eb5e00]",
    customerCost: "$300 Annual Fee +\n$15 - $100 per lead",
    workerCost: "Pros pay for leads\n$15 - $100+ per lead",
  },
  {
    name: "Care.com",
    logoColor: "text-[#4db8a1]",
    customerCost: "Memberships\n$39/month or $156/year",
    workerCost: "Memberships\n$39/month or $156/year",
  },
  {
    name: "dolly",
    logoColor: "text-[#ee3124]",
    customerCost: "8% - 20%\nof Transaction",
    workerCost: "15% - 20% Commission",
  },
  {
    name: "lugg",
    logoColor: "text-[#1ab269]",
    customerCost: "$32 - $142\nService Fee",
    workerCost: "15% - 20% Commission",
  }
];

const CompetitionPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 pointer-events-none z-0"></div>
      
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-24 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 relative">
          {/* Watermark Icon */}
          <div className="absolute -top-12 -right-32 md:-right-64 opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-[300px] h-[300px] md:w-[450px] md:h-[450px]" fill="currentColor">
              <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z M50,90 C27.9,90 10,72.1 10,50 C10,27.9 27.9,10 50,10 C72.1,10 90,27.9 90,50 C90,72.1 72.1,90 50,90 Z" />
              <path d="M72.2,27.8 L64,36 L52.7,24.7 C50.5,22.5 47,22.5 44.8,24.7 L24.7,44.8 C22.5,47 22.5,50.5 24.7,52.7 L36,64 L27.8,72.2 C25.6,74.4 25.6,77.9 27.8,80.1 C30,82.3 33.5,82.3 35.7,80.1 L43.9,71.9 L55.2,83.2 C57.4,85.4 60.9,85.4 63.1,83.2 L83.2,63.1 C85.4,60.9 85.4,57.4 83.2,55.2 L71.9,43.9 L80.1,35.7 C82.3,33.5 82.3,30 80.1,27.8 C77.9,25.6 74.4,25.6 72.2,27.8 Z" />
            </svg>
          </div>

          <h1 className="text-[#041e42] text-5xl md:text-[64px] font-black tracking-tight leading-none mb-3 font-sans">
            COMPETITION
          </h1>
          <h2 className="text-[#0056b3] text-3xl md:text-4xl font-bold tracking-tight mb-6">
            See How ErrandHubb Compares
          </h2>
          <p className="text-gray-800 text-[17px] leading-relaxed font-medium max-w-lg">
            Many service marketplaces charge hidden fees, booking fees, or take a percentage of every transaction. ErrandHubb keeps it simple, affordable, and transparent for everyone.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200 mb-20 font-sans">
          
          {/* Table Header */}
          <div className="grid grid-cols-4 items-stretch text-center">
            <div className="col-span-1 bg-[#041e42] text-white p-5 flex items-center justify-center border-r border-[#0a2e5c]">
              <span className="font-bold text-[13px] tracking-widest uppercase">Company</span>
            </div>
            <div className="col-span-1 bg-[#041e42] text-white p-5 flex flex-col items-center justify-center border-r border-[#0a2e5c]">
              <span className="font-bold text-[13px] tracking-widest uppercase leading-tight mb-1">Customer Cost</span>
              <span className="text-[11px] text-gray-300 font-medium">(What You Pay)</span>
            </div>
            {/* ErrandHubb Highlighted Column Header */}
            <div className="col-span-1 bg-[#0d52bc] text-white p-5 flex flex-col items-center justify-center relative shadow-lg transform scale-[1.02] z-10 rounded-t-xl border-b border-[#2167d4]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0d52bc]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4l-9 9 9 9M22 13h-1M22 13v-1m0 1v1m0-1l-6-6m6 6l-6 6" /></svg>
                </div>
                <span className="font-bold text-xl tracking-tight">ErrandHubb</span>
              </div>
              <span className="text-[12px] font-bold leading-tight">The Smarter Way<br/>to Get Things Done.</span>
            </div>
            <div className="col-span-1 bg-[#041e42] text-white p-5 flex flex-col items-center justify-center">
              <span className="font-bold text-[13px] tracking-widest uppercase leading-tight mb-1">Membership / Worker Cost</span>
              <span className="text-[11px] text-gray-300 font-medium">(What Workers Pay)</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {competitors.map((comp, idx) => (
              <div key={idx} className={`grid grid-cols-4 items-stretch text-center border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                {/* Logo */}
                <div className="col-span-1 p-4 flex items-center justify-center border-r border-gray-100">
                  <span className={`font-black text-xl tracking-tight ${comp.logoColor}`}>
                    {comp.name}
                  </span>
                </div>
                
                {/* Customer Cost */}
                <div className="col-span-1 p-4 flex items-center justify-center border-r border-gray-100">
                  <span className="text-[14px] font-semibold text-gray-800 whitespace-pre-line leading-snug">
                    {comp.customerCost}
                  </span>
                </div>
                
                {/* ErrandHubb Advantage */}
                <div className="col-span-1 p-4 flex items-center justify-center bg-[#f4f8fe] border-r border-blue-100 relative z-0">
                  <div className="flex items-center gap-2 text-[#0b8e36]">
                    <CheckCircle2 className="w-5 h-5 fill-current text-white shrink-0" strokeWidth={2.5} />
                    <span className="font-bold text-[13px] uppercase tracking-wide">NO CUSTOMER FEES</span>
                  </div>
                </div>

                {/* Worker Cost */}
                <div className="col-span-1 p-4 flex items-center justify-center">
                  <span className="text-[14px] font-semibold text-gray-800 whitespace-pre-line leading-snug">
                    {comp.workerCost}
                  </span>
                </div>
              </div>
            ))}
            
            {/* ErrandHubb Bottom Row Summary */}
            <div className="grid grid-cols-4 items-stretch text-center bg-white">
              <div className="col-span-1 p-5 flex items-center justify-center border-r border-gray-100">
                <span className="font-black text-2xl tracking-tight text-[#041e42] flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#0d52bc] rounded-full flex items-center justify-center text-white">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4l-9 9 9 9M22 13h-1M22 13v-1m0 1v1m0-1l-6-6m6 6l-6 6" /></svg>
                  </div>
                  ErrandHubb
                </span>
              </div>
              
              <div className="col-span-1 p-5 flex flex-col items-center justify-center border-r border-gray-100">
                <span className="font-black text-[#0b8e36] text-xl">$0</span>
                <span className="font-bold text-[#0b8e36] text-[13px] uppercase tracking-wide">NO CUSTOMER FEES!</span>
              </div>
              
              <div className="col-span-1 bg-[#0d52bc] text-white p-5 flex items-center justify-center rounded-b-xl shadow-inner relative z-10 transform scale-[1.02]">
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-full p-1">
                    <svg className="w-6 h-6 text-[#0d52bc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="font-bold text-[14px] uppercase tracking-wide leading-tight text-left">YOU SAVE MORE<br/>WITH ERRANDHUBB!</span>
                </div>
              </div>

              <div className="col-span-1 p-5 flex flex-col items-center justify-center">
                <span className="font-bold text-[#0b8e36] text-[13px] uppercase tracking-wide leading-tight">MEMBERSHIPS ONLY $5/MONTH<br/>NO HIGH COMMISSIONS!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Customers */}
          <div className="bg-[#f8fbff] rounded-2xl p-8 border border-blue-100 flex gap-6">
            <div className="hidden sm:flex flex-col items-center justify-center w-32 shrink-0 bg-blue-50/50 rounded-xl border border-blue-100/50 p-4">
              <User className="w-16 h-16 text-[#0d52bc] mb-2" strokeWidth={1.5} />
              <HandHeart className="w-8 h-8 text-[#0d52bc] -mt-6 ml-10 bg-[#f8fbff] rounded-full p-1" strokeWidth={2} />
            </div>
            
            <div className="grow">
              <h3 className="text-[#0d52bc] font-bold text-xl mb-6 tracking-tight">Why Customers Choose ErrandHubb</h3>
              <ul className="space-y-5">
                {[
                  { title: "Transparent Pricing", desc: "Know exactly what you're paying before you hire." },
                  { title: "No Hidden Fees", desc: "No surprise charges or booking fees." },
                  { title: "Choose Your Own Errander", desc: "Review profiles, ratings, and experience." },
                  { title: "Chat Before Hiring", desc: "Message your Errander directly before booking." },
                  { title: "Memberships Only $5/Month", desc: "Affordable access with no expensive commitments." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#0b8e36] fill-current shrink-0 mt-0.5" strokeWidth={2.5} />
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px] leading-tight mb-0.5">{item.title}</h4>
                      <p className="text-gray-600 text-[13px] leading-snug">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Workers */}
          <div className="bg-[#fffcfaf0] rounded-2xl p-8 border border-orange-100 flex gap-6">
            <div className="grow">
              <h3 className="text-[#0d52bc] font-bold text-xl mb-6 tracking-tight">Why Workers Love ErrandHubb</h3>
              <ul className="space-y-5">
                {[
                  { title: "No Lead Fees", desc: "You never pay for leads." },
                  { title: "No Booking Fees", desc: "Keep more of what you earn." },
                  { title: "No Matching Fees", desc: "Get matched for free." },
                  { title: "No Hidden Commissions", desc: "We believe in fair, transparent payments." },
                  { title: "More Work. More Pay.", desc: "Connect with local customers who need help." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <Ban className="w-5 h-5 text-[#e53e3e] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px] leading-tight mb-0.5">{item.title}</h4>
                      <p className="text-gray-600 text-[13px] leading-snug">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="hidden sm:flex flex-col items-center justify-center w-32 shrink-0 bg-orange-50/50 rounded-xl border border-orange-100/50 p-4">
              <Wallet className="w-16 h-16 text-[#e53e3e] mb-2" strokeWidth={1.5} />
            </div>
          </div>

        </div>

        {/* Feature Banner */}
        <div className="mb-16">
          <h3 className="text-center font-bold text-2xl text-[#041e42] mb-6">ErrandHubb keeps it simple.</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center bg-white py-6 px-4 rounded-xl border border-gray-200 shadow-sm">
            {[
              { icon: Tag, text: "Fair pricing for customers" },
              { icon: LineChart, text: "More earnings for workers" },
              { icon: Users, text: "Trusted local community" },
              { icon: HandHeart, text: "Better for everyone" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 px-3">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#0d52bc] bg-[#f8fbff]">
                  <feature.icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="font-medium text-gray-700 text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-[#041e42] py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-[17px] mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of happy customers and Erranders saving time and money every day.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link 
              href="/search"
              className="bg-white text-[#041e42] rounded-full py-4 px-8 w-full sm:w-auto flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 group font-bold shadow-xl"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0056b3] group-hover:bg-[#0056b3] group-hover:text-white transition-colors">
                <Search className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[15px] uppercase tracking-wider">FIND AN ERRANDER</div>
                <div className="text-[12px] font-semibold text-gray-500 group-hover:text-[#0056b3] transition-colors">Get Help Today</div>
              </div>
            </Link>
            
            <Link 
              href="/errand"
              className="bg-[#2eb85c] text-white rounded-full py-4 px-8 w-full sm:w-auto flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 group font-bold shadow-xl"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#2eb85c] transition-colors">
                <User className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[15px] uppercase tracking-wider">BECOME AN ERRANDER</div>
                <div className="text-[12px] font-semibold text-green-100">Start Earning Today</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CompetitionPage;
