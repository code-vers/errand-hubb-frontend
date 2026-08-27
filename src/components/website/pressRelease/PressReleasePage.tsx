"use client";

import Link from "next/link";
import SectionHeroBanner from "@/components/website/SectionHeroBanner";
import { Download, FileText, ArrowLeft, Mail, MapPin, Globe } from "lucide-react";

const PressReleasePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SectionHeroBanner
        title="Press Release"
        subtitle="Official News & Announcements from ErrandHubb"
      />

      <main className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Contact
          </Link>

          {/* <a
            href="/ErrandHubb Press Release MAIN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-extrabold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Original PDF
          </a> */}
        </div>

        {/* PDF Content Document Card */}
        <article className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-14 text-slate-800 leading-relaxed font-sans">

          {/* Header Section */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <span className="inline-block text-xs font-black tracking-widest text-[#1a365d] uppercase bg-slate-100 px-3 py-1 rounded-md mb-5">
              FOR IMMEDIATE RELEASE
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a4971] leading-tight mb-4">
              ErrandHubb Launches a New, Affordable Way to Get Everyday Errands Done
            </h1>

            <h2 className="text-lg sm:text-xl font-medium text-[#2b5375] leading-relaxed">
              New online marketplace connects people who need help with everyday tasks directly with independent “Erranders,” offering a simpler and more affordable alternative to traditional service platforms.
            </h2>
          </div>

          {/* Document Body */}
          <div className="space-y-6 text-[16px] md:text-[17px] text-slate-700 leading-relaxed">

            {/* Dateline & Introduction */}
            <p>
              <strong className="text-slate-900 font-extrabold">LOS ANGELES, Calif. — August 25, 2026 — </strong>
              <strong className="text-slate-900 font-bold">ErrandHubb</strong>, an innovative online marketplace designed to connect people who need everyday errands and services completed with independent workers ready to earn money, is preparing to introduce a new approach to the rapidly growing gig and local-services economy.
            </p>

            <p>
              Built around the idea of making it easier and more affordable for people to find help,{" "}
              <a href="https://www.errandhubb.com" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1a4971] hover:underline">
                ErrandHubb.com
              </a>{" "}
              allows customers to connect with local independent service providers, known on the platform as{" "}
              <strong className="text-slate-900 font-bold">Erranders</strong>, for a wide variety of everyday needs.
            </p>

            <p>
              From shopping, deliveries and transportation assistance to cleaning, moving help, senior assistance and other everyday services, ErrandHubb is designed to bring multiple categories of local help together in one easy-to-use marketplace.
            </p>

            {/* Section 1: A Simpler Alternative */}
            <div className="pt-6">
              <h3 className="text-2xl font-extrabold text-[#1a4971] mb-4">
                A Simpler Alternative
              </h3>

              <p className="mb-4">
                Consumers today have access to numerous apps and websites for hiring people to perform individual services. However, the costs associated with service fees, memberships, commissions and other charges can add up quickly for both customers and workers.
              </p>

              <p className="mb-4 bg-orange-50/60 border-l-4 border-primary p-4 rounded-r-xl font-medium text-slate-800">
                ErrandHubb was created with a different philosophy:{" "}
                <strong className="font-extrabold text-slate-900">
                  keep the platform simple, keep costs low, and give customers and Erranders more control over who they work with.
                </strong>
              </p>

              <p className="mb-4">
                Rather than limiting users to a single type of service, ErrandHubb is designed as a broad marketplace where customers can search for workers or post errands based on the type of help they need.
              </p>

              <p>
                Customers can review available Erranders, learn about the services they provide and communicate before making a hiring decision.
              </p>
            </div>

            {/* Section 2: Giving Independent Workers Another Way to Earn */}
            <div className="pt-6">
              <h3 className="text-2xl font-extrabold text-[#1a4971] mb-4">
                Giving Independent Workers Another Way to Earn
              </h3>

              <p className="mb-4">
                ErrandHubb is also being developed with the independent worker in mind.
              </p>

              <p className="mb-4">
                Millions of Americans earn additional income through gig work, delivery services, freelance work and local service platforms. ErrandHubb gives these workers another marketplace where they can advertise their skills and connect with people who need their services.
              </p>

              <p className="mb-4">
                Erranders can create detailed profiles describing the services they provide, their experience, availability and other information that can help customers decide who they would like to hire.
              </p>

              <p className="mb-4">
                One of ErrandHubb’s distinctive profile features is the ability for Erranders to include{" "}
                <strong className="font-bold text-slate-900">YouTube video presentations</strong> alongside photos. These videos give potential clients an opportunity to see and hear from an Errander before making a hiring decision. Erranders can introduce themselves, discuss their experience, explain the types of services they offer, or even provide videos showing themselves actually performing various types of errands and services.
              </p>

              <p className="mb-4">
                By combining traditional profiles with video, ErrandHubb allows Erranders to showcase their personality, professionalism and abilities while giving clients additional information and confidence when deciding who they want to hire.
              </p>

              <p>
                The company’s goal is to create a marketplace where independent workers have greater flexibility while customers have greater choice.
              </p>
            </div>

            {/* Section 3: "Getting Your Errands Done ASAP" */}
            <div className="pt-6">
              <h3 className="text-2xl font-extrabold text-[#1a4971] mb-4">
                “Getting Your Errands Done ASAP”
              </h3>

              <p className="mb-3">
                ErrandHubb’s mission can be summarized by its slogan:
              </p>

              <blockquote className="text-xl font-extrabold text-primary italic border-l-4 border-primary pl-4 py-1 mb-4">
                “Getting Your Errands Done ASAP.”
              </blockquote>

              <p className="mb-4">
                The company believes that many everyday tasks do not require a specialized company—they simply require finding a reliable person who is available and willing to get the job done.
              </p>

              <p>
                Whether someone needs groceries picked up, an item delivered across town, assistance around the house, help moving something, or another everyday task completed, ErrandHubb intends to make finding that person easier.
              </p>
            </div>

            {/* Section 4: Building a National Marketplace */}
            <div className="pt-6">
              <h3 className="text-2xl font-extrabold text-[#1a4971] mb-4">
                Building a National Marketplace
              </h3>

              <p className="mb-4">
                The company’s vision is to develop a nationwide community consisting of hundreds of thousands—and eventually millions—of customers and independent Erranders.
              </p>

              <p>
                As the platform grows, ErrandHubb plans to continue adding features designed to make finding, communicating with and hiring local service providers easier.
              </p>
            </div>

            {/* Section 5: About ErrandHubb */}
            <div className="pt-6">
              <h3 className="text-2xl font-extrabold text-[#1a4971] mb-4">
                About ErrandHubb
              </h3>

              <p className="mb-4">
                ErrandHubb is an online marketplace connecting customers who need errands and everyday services completed with independent workers who want to earn money providing those services.
              </p>

              <p className="mb-4">
                The platform is designed around affordability, simplicity, worker flexibility and customer choice.
              </p>

              <p className="mb-4">
                From everyday errands to local services, ErrandHubb’s objective is simple:
              </p>

              <p className="font-extrabold text-slate-900 text-lg mb-4">
                You have something that needs to get done. Find someone who can get it done.
              </p>

              <p>
                For additional information, visit:{" "}
                <a href="https://www.errandhubb.com" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1a4971] underline hover:text-primary">
                  www.errandhubb.com
                </a>
              </p>
            </div>

            {/* Section 6: Media & Business Inquiries */}
            <div className="pt-8 border-t border-gray-200 mt-10">
              <h3 className="text-xl font-extrabold text-[#1a4971] mb-4">
                Media & Business Inquiries
              </h3>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-3 text-slate-800 font-medium">
                <div className="font-extrabold text-lg text-slate-900">
                  ErrandHubb
                </div>
                <div className="flex items-start gap-2 text-slate-600">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>9461 Charleville Blvd., Box 293<br />Beverly Hills, CA 90212</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:info@errandhubb.com" className="text-[#1a4971] hover:underline font-bold">
                    info@errandhubb.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Globe className="w-5 h-5 text-primary shrink-0" />
                  <span>
                    Website:{" "}
                    <a href="https://www.errandhubb.com" target="_blank" rel="noopener noreferrer" className="text-[#1a4971] hover:underline font-bold">
                      www.errandhubb.com
                    </a>
                  </span>
                </div>
              </div>

              <div className="text-center font-extrabold text-slate-400 tracking-widest text-lg mt-8">
                ###
              </div>
            </div>

          </div>
        </article>
      </main>
    </div>
  );
};

export default PressReleasePage;
