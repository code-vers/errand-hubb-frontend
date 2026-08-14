"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  CalendarDays,
  Check,
  CircleDollarSign,
  CreditCard,
  Gift,
  Headphones,
  Megaphone,
  MessageCircle,
  Newspaper,
  Printer,
  Search,
  ShieldCheck,
  Star,
  UserRound,
  UsersRound,
  Video,
  XCircle,
} from "lucide-react";

type Audience = "clients" | "erranders";

type FaqItem = {
  question: string;
  answer: ReactNode;
  icon: typeof UserRound;
  audience: Audience | "both";
};

const faqItems: FaqItem[] = [
  {
    question: "What is ErrandHubb?",
    answer: "ErrandHubb is an online marketplace that connects Clients who need help with everyday errands and tasks with local Erranders who are ready to get the job done.",
    icon: UserRound,
    audience: "both",
  },
  {
    question: "How do I get started as a Client?",
    answer: "Create an account, describe the errand or task you need help with, choose or connect with an Errander, agree on the details, and get it done.",
    icon: Search,
    audience: "clients",
  },
  {
    question: "How do I get started as an Errander?",
    answer: "Create an account, choose a membership plan, complete your profile, and start browsing or responding to Jobs that match your skills and services.",
    icon: UserRound,
    audience: "erranders",
  },
  {
    question: "How much does it cost to use ErrandHubb?",
    answer: (
      <ul className='list-disc space-y-1 pl-4 marker:text-[#0b3d68]'>
        <li>Clients pay service fees when posting a Job. Fees vary based on the type of service and urgency.</li>
        <li>Erranders pay a low membership fee of $5/month or $50/year.</li>
        <li>Erranders keep 100% of what they earn from Clients.</li>
        <li className='font-extrabold text-[#f15a24]'>We do not take a percentage of your Jobs.</li>
      </ul>
    ),
    icon: CircleDollarSign,
    audience: "both",
  },
  {
    question: "How do Clients and Erranders communicate?",
    answer: "Clients and Erranders can message each other directly through the ErrandHubb platform to discuss details before agreeing to a Job.",
    icon: MessageCircle,
    audience: "both",
  },
  {
    question: "How are payments handled?",
    answer: "Clients pay Erranders either in cash, Zelle, Cash App, or personal or business check.",
    icon: CreditCard,
    audience: "both",
  },
  {
    question: "Can I cancel a Job?",
    answer: "Clients and Erranders should agree on cancellation expectations before the Job begins. Any cancellation terms for an individual Job are between the Client and Errander unless ErrandHubb expressly provides a separate cancellation feature.",
    icon: XCircle,
    audience: "both",
  },
  {
    question: "How do I know an Errander is reliable?",
    answer: "Erranders have profiles with available information about their experience and services so Clients can choose someone they feel comfortable working with. Where available, ratings and reviews may also help Clients make a decision.",
    icon: Star,
    audience: "clients",
  },
  {
    question: "Is ErrandHubb insured?",
    answer: "Yes. ErrandHubb maintains a General Liability Insurance policy for the company. However, ErrandHubb's insurance does not provide insurance coverage to Erranders for individual Jobs or services they perform for Clients. Erranders are independent service providers and are responsible for obtaining and maintaining any insurance coverage that may be necessary or appropriate for the services they choose to provide.",
    icon: ShieldCheck,
    audience: "both",
  },
  {
    question: "What if I need help?",
    answer: "Our support team is here for you. Contact us anytime through the website and we'll be happy to assist.",
    icon: Headphones,
    audience: "both",
  },
];

const marketingStrategies = [
  ["Social Media & Influencers", "ErrandHubb plans to work with social media influencers and content creators to introduce ErrandHubb to their audiences. We also plan advertising and promotional campaigns across Facebook, Instagram, TikTok, Reels, YouTube Shorts, and other social platforms.", UsersRound],
  ["Commercials & Video Advertising", "We plan to produce professional ErrandHubb commercials and promotional videos explaining how easy it is to find someone to help with everyday errands and services. Campaigns may include online video advertising, cable television advertising, and traditional TV advertising.", Video],
  ["Google & Search Engine Marketing", "Through SEO (Search Engine Optimization) and Google Search Advertising, our goal is to reach people actively searching online for services that Erranders provide—from running errands and deliveries to household help and other local services.", Search],
  ["Free Errand Promotions", "Periodically, ErrandHubb plans to run special promotion offering Clients a free or company-sponsored errand. When such a promotion is offered, ErrandHubb pays the participating Errander for the qualifying service, subject to the promotion's terms.", Gift],
  ["Craigslist & Online Classified Advertising", "We plan to use Craigslist and other appropriate online advertising channels to introduce both Clients and potential Erranders to the marketplace.", Newspaper],
  ["Regional & National Public Relations", "ErrandHubb plans to pursue regional and national PR opportunities, including media coverage, interviews, news stories, business publications, podcasts, and other publicity opportunities that can increase awareness of the ErrandHubb brand.", Megaphone],
  ["Billboards & Outdoor Advertising", "As ErrandHubb expands into different markets, our marketing may include billboards and other outdoor advertising designed to make ErrandHubb a recognizable local and national brand.", CalendarDays],
  ["Print & Local Advertising", "Our strategy also includes print publications, business cards, promotional cards, flyers, door hangers, posters, and other printed materials distributed in targeted communities. Many of these materials will feature one large, easy-to-scan QR code taking potential Clients directly to the ErrandHubb website.", Printer],
] as const;

export default function FaqPage() {
  const [activeAudience, setActiveAudience] = useState<Audience>("clients");
  const visibleFaqs = faqItems.filter((item) => item.audience === "both" || item.audience === activeAudience);

  return (
    <section className='w-full bg-white text-[#082e5d]'>
      <div className='mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-7 lg:px-10'>
        <div className='grid items-center gap-8 lg:grid-cols-[1fr_360px]'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <h1 className='text-[68px] font-black leading-[0.85] tracking-[-0.07em] sm:text-[82px]'>FAQ</h1>
              <h2 className='mt-2 border-b-4 border-[#f15a24] pb-3 text-[20px] font-extrabold uppercase text-[#f15a24] sm:text-[24px]'>
                Frequently Asked Questions
              </h2>
              <p className='mt-4 text-[15px] font-medium leading-relaxed text-[#142852] sm:text-[17px]'>
                Everything you need to know about ErrandHubb.<br />
                Find quick answers to the most common questions from Clients and Erranders.
              </p>
            </div>
            <div className='relative hidden h-42 w-68 shrink-0 lg:block' aria-hidden='true'>
              <span className='absolute left-0 top-1 flex h-29 w-31 items-center justify-center rounded-[28px] bg-[#f15a24] text-[78px] font-black leading-none text-white shadow-lg'>?</span>
              <span className='absolute bottom-0 right-0 flex h-25 w-30 items-center justify-center rounded-[24px] bg-[#072d62] text-[37px] font-black tracking-[0.1em] text-white shadow-lg'>•••</span>
              <i className='absolute left-2 top-3 h-4 w-4 rounded-full border-2 border-sky-500' />
              <i className='absolute right-5 top-2 h-2.5 w-2.5 rounded-full border-2 border-sky-500' />
              <i className='absolute bottom-2 left-0 h-px w-10 rotate-[-6deg] bg-[#f15a24]' />
              <i className='absolute right-0 top-9 h-px w-9 rotate-[-55deg] bg-sky-500' />
            </div>
          </div>
          <div className='hidden lg:block' />
        </div>

        <div className='mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]'>
          <div>
            <div className='mb-5 flex justify-center'>
              <div className='flex w-full max-w-[440px] overflow-hidden rounded-md border border-[#082e5d]'>
                <button type='button' onClick={() => setActiveAudience("clients")} className={`flex-1 px-4 py-2.5 text-sm font-extrabold transition-colors ${activeAudience === "clients" ? "bg-[#082e5d] text-white" : "bg-white text-[#082e5d] hover:bg-slate-50"}`}>FOR CLIENTS</button>
                <button type='button' onClick={() => setActiveAudience("erranders")} className={`flex-1 border-l border-[#082e5d] px-4 py-2.5 text-sm font-extrabold transition-colors ${activeAudience === "erranders" ? "bg-[#082e5d] text-white" : "bg-white text-[#082e5d] hover:bg-slate-50"}`}>FOR ERRANDERS</button>
              </div>
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              {visibleFaqs.map((faq) => {
                const Icon = faq.icon;
                return (
                  <article key={faq.question} className='rounded-lg border border-[#d5e0ec] bg-white p-4 shadow-[0_3px_12px_rgba(11,49,84,0.04)]'>
                    <div className='flex items-center gap-3'>
                      <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#092e62] text-white ring-2 ring-[#f15a24] ring-offset-2'>
                        <Icon className='h-5 w-5' strokeWidth={2.3} />
                      </span>
                      <h3 className='text-[15px] font-extrabold leading-tight text-[#082e5d]'>{faq.question}</h3>
                    </div>
                    <div className='mt-4 text-[13px] leading-relaxed text-[#18283e]'>{faq.answer}</div>
                  </article>
                );
              })}
            </div>

            <article className='mt-3 rounded-lg border border-[#d5e0ec] bg-white p-4 shadow-[0_3px_12px_rgba(11,49,84,0.04)]'>
              <div className='flex items-center gap-3'>
                <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#092e62] text-white ring-2 ring-[#f15a24] ring-offset-2'><Megaphone className='h-5 w-5' /></span>
                <h3 className='text-[15px] font-extrabold text-[#082e5d]'>How ErrandHubb Plans to Bring You Clients</h3>
              </div>
              <p className='mt-4 text-[13px] leading-relaxed text-[#18283e]'>ErrandHubb actively markets and promotes the platform using multiple channels to attract Clients and increase demand for services. See the detailed marketing strategy to the right.</p>
              <Link href='/contact' className='mt-4 block rounded-md bg-[#082e5d] px-5 py-3 text-center text-sm font-extrabold text-white transition-colors hover:bg-[#061f46]'>CONTACT SUPPORT</Link>
            </article>
          </div>

          <aside className='rounded-xl border border-[#d5e0ec] bg-[#f5faff] p-4 text-[#152b4e] shadow-sm'>
            <h2 className='text-center text-[17px] font-black leading-[1.05]'>HOW ERRANDHUBB<br />PLANS TO BRING YOU CLIENTS</h2>
            <p className='mt-3 text-center text-[12px] font-extrabold leading-snug text-[#f15a24]'>You focus on providing great service.<br />We focus on bringing people to ErrandHubb.</p>
            <p className='mt-3 text-[12px] leading-[1.35]'>At ErrandHubb, we understand that joining a platform only makes sense if people know it exists. That&apos;s why our goal is to continuously market and promote ErrandHubb to help introduce potential Clients to the Erranders offering services on our platform.</p>
            <p className='mt-3 text-[12px] leading-[1.35]'>We plan to use a <strong>multi-channel marketing strategy</strong> designed to build awareness, drive traffic to ErrandHubb, and encourage Clients to search for and hire Erranders.</p>
            <h3 className='mt-4 border-b-2 border-[#f15a24] pb-1.5 text-[13px] font-extrabold'>OUR MARKETING STRATEGY</h3>
            <div className='mt-3 space-y-3'>
              {marketingStrategies.map(([title, copy, Icon]) => (
                <div key={title} className='flex gap-3'>
                  <Icon className='mt-0.5 h-6 w-6 shrink-0 text-[#082e5d]' strokeWidth={2.1} />
                  <div>
                    <h4 className='text-[12px] font-extrabold leading-tight'>{title}</h4>
                    <p className='mt-1 text-[11px] leading-[1.3]'>{copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-4 rounded-lg border border-[#69a9e9] bg-white p-3 text-center'>
              <h3 className='text-[13px] font-black leading-tight'>MORE CLIENTS.<br />MORE OPPORTUNITIES.<br />MORE EARNING POTENTIAL.</h3>
              <p className='mt-2 text-[11px] leading-[1.3]'>Our objective is simple: get the ErrandHubb name in front of as many potential Clients as possible and give them a reason to visit the platform and find an Errander.</p>
              <strong className='mt-2 block text-[12px] text-[#f15a24]'>DRIVE CLIENTS TO ERRANDHUBB.</strong>
              <p className='mt-1 text-[11px] leading-[1.3]'>Once they arrive, you have the opportunity to turn them into your Clients.</p>
              <p className='mt-3 text-[10px] leading-[1.3]'>ErrandHubb does not guarantee that any individual Errander will receive a particular number of Clients, Jobs, or amount of income. Marketing campaigns, channels, timing, and availability may vary by market. But our business objective is to actively promote the marketplace and continually work to increase Client awareness of ErrandHubb.</p>
              <p className='mt-3 text-[11px] font-extrabold leading-[1.3]'>You provide the service. We promote the marketplace. Together, we grow ErrandHubb.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
