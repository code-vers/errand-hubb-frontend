"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../../public/logo2.svg";
import TermsOfService from "./TermsOfService";

type TabType = "privacy" | "terms" | "refund";

function LegalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("privacy");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "privacy" || tab === "terms" || tab === "refund") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    router.push(`/legal?${params.toString()}`, { scroll: false });
  };

  const SupportWidget = ({ className = "" }: { className?: string }) => (
    <div className={`bg-secondary rounded-xl p-6 text-white shadow-sm ${className}`}>
      <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary mb-2">
        Need Support?
      </h3>
      <p className="text-xs text-white/90 leading-relaxed mb-4">
        If you have any questions regarding our terms, policies, or account details, feel free to get in touch.
      </p>
      <div className="space-y-2 text-xs">
        <p className="flex items-center gap-2">
          <span className="font-bold text-primary">Email:</span>
          <a href="mailto:support@errandhubb.com" className="hover:underline text-white/95">
            support@errandhubb.com
          </a>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-bold text-primary">Phone:</span>
          <a href="tel:4255008314" className="hover:underline text-white/95">
            425-500-8314
          </a>
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-center">
        <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
          <Image src={logo} alt="ErrandHubb Logo" className="h-5 w-auto" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-surface-dim min-h-screen pb-16 pt-6 sm:pt-10">
      <div className="mx-auto w-full max-w-310 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8 items-start">
          
          {/* Tabs Container */}
          <aside className="lg:sticky lg:top-28 z-30 flex flex-col gap-6">
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-slate-200/60">
              <h2 className="hidden lg:block text-secondary text-[14px] font-extrabold uppercase tracking-wider mb-4 px-3 border-b pb-2 border-slate-100">
                Legal Documents
              </h2>
              {/* Horizontal scrollable nav on mobile, vertical on desktop */}
              <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 lg:gap-1.5 scrollbar-none pb-1 lg:pb-0">
                <button
                  onClick={() => handleTabChange("privacy")}
                  className={`flex-1 lg:flex-initial text-center lg:text-left px-4 py-2.5 lg:py-3 rounded-lg text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    activeTab === "privacy"
                      ? "bg-primary text-white font-bold lg:bg-primary/5 lg:text-primary lg:border-l-4 lg:border-primary lg:rounded-l-none lg:rounded-r-lg"
                      : "bg-slate-50 text-text-secondary border border-slate-200/60 lg:bg-transparent lg:border-none lg:border-l-4 lg:border-transparent lg:text-text-secondary hover:bg-slate-50 hover:text-secondary font-semibold"
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleTabChange("terms")}
                  className={`flex-1 lg:flex-initial text-center lg:text-left px-4 py-2.5 lg:py-3 rounded-lg text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    activeTab === "terms"
                      ? "bg-primary text-white font-bold lg:bg-primary/5 lg:text-primary lg:border-l-4 lg:border-primary lg:rounded-l-none lg:rounded-r-lg"
                      : "bg-slate-50 text-text-secondary border border-slate-200/60 lg:bg-transparent lg:border-none lg:border-l-4 lg:border-transparent lg:text-text-secondary hover:bg-slate-50 hover:text-secondary font-semibold"
                  }`}
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => handleTabChange("refund")}
                  className={`flex-1 lg:flex-initial text-center lg:text-left px-4 py-2.5 lg:py-3 rounded-lg text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    activeTab === "refund"
                      ? "bg-primary text-white font-bold lg:bg-primary/5 lg:text-primary lg:border-l-4 lg:border-primary lg:rounded-l-none lg:rounded-r-lg"
                      : "bg-slate-50 text-text-secondary border border-slate-200/60 lg:bg-transparent lg:border-none lg:border-l-4 lg:border-transparent lg:text-text-secondary hover:bg-slate-50 hover:text-secondary font-semibold"
                  }`}
                >
                  Refund Policy
                </button>
              </nav>
            </div>

            {/* Support Widget - Desktop Only */}
            <SupportWidget className="hidden lg:block" />
          </aside>

          {/* Policy Text Content Panel */}
          <div className="flex flex-col">
            <main className="rounded-xl bg-white p-5 sm:p-8 md:p-10 shadow-md border border-slate-200/60 transition-all duration-300">
              {activeTab === "privacy" && (
                <article className="prose max-w-none text-foreground font-sans">
                  <div className="border-b pb-5 mb-6 border-slate-100">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">
                      Privacy Policy
                    </h1>
                    <p className="text-xs sm:text-sm text-text-secondary mt-2 font-medium">
                      Last Updated: <span className="text-primary font-semibold">November 18, 2025</span>
                    </p>
                  </div>

                  <div className="space-y-4 text-xs sm:text-[15px] leading-relaxed text-foreground">
                    <p>
                      Welcome to ErrandHubb (“ErrandHubb,” “we,” “our,” or “us”). This Privacy Policy governs your access to and use of our website, mobile application, and services (collectively, the “Services”). By accessing or using our Services, you agree to the terms outlined in this Privacy Policy.
                    </p>
                    <p className="bg-red-50 text-red-700 px-4 py-3 rounded-lg border border-red-100 text-xs sm:text-sm font-semibold">
                      If you do not agree to this Privacy Policy, do not use our Services.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      1. Information We Collect
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-secondary mt-3">
                          A. Personal Information You Provide
                        </h3>
                        <p className="mt-1">
                          We may collect the following information when you register, place an order, or communicate with us:
                        </p>
                        <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                          <li>Full name</li>
                          <li>Email address</li>
                          <li>Phone number</li>
                          <li>Delivery address(es)</li>
                          <li>Billing information (processed through secure third-party payment processors)</li>
                          <li>Order details and instructions</li>
                          <li>Identification details for high-value or restricted deliveries (if required)</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-secondary mt-4">
                          B. Automatically Collected Information
                        </h3>
                        <p className="mt-1">
                          When you use our website or app, we may automatically collect:
                        </p>
                        <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                          <li>IP address</li>
                          <li>Device type, operating system, and browser type</li>
                          <li>Usage data (pages visited, buttons clicked, time spent)</li>
                          <li>Location information (with your permission) for delivery purposes</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-secondary mt-4">
                          C. Driver/Contractor Information
                        </h3>
                        <p className="mt-1">
                          For drivers and couriers, we may also collect:
                        </p>
                        <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                          <li>Driver’s license details</li>
                          <li>Vehicle information</li>
                          <li>Background check results</li>
                          <li>Insurance information</li>
                          <li>GPS location while actively performing deliveries</li>
                        </ul>
                      </div>
                    </div>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      2. How We Use Your Information
                    </h2>
                    <p>We use your information to:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Provide and manage the ErrandHubb Services</li>
                      <li>Process payments and complete deliveries</li>
                      <li>Communicate with you regarding orders, updates, and customer support</li>
                      <li>Verify your identity when necessary</li>
                      <li>Improve our website, app, and service offerings</li>
                      <li>Protect against fraud and maintain system security</li>
                      <li>Comply with legal requirements</li>
                    </ul>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      3. How We Share Your Information
                    </h2>
                    <p>We may share your information only as follows:</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-secondary mt-3">
                          A. With Drivers and Contractors
                        </h3>
                        <p className="mt-1">
                          Customer details (name, order information, pickup/drop-off address, and any necessary instructions) are shared with ErrandHubb drivers who fulfill your delivery.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-secondary mt-3">
                          B. Service Providers
                        </h3>
                        <p className="mt-1">
                          We use trusted third parties to help operate ErrandHubb, such as:
                        </p>
                        <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                          <li>Payment processors</li>
                          <li>Background check companies</li>
                          <li>Cloud hosting services</li>
                          <li>Customer support platforms</li>
                        </ul>
                        <p className="mt-2 text-xs sm:text-sm text-text-secondary italic">
                          These partners are required to protect your information.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-secondary mt-3">
                          C. Legal Requirements
                        </h3>
                        <p className="mt-1">
                          We may disclose information if required by law, subpoena, or to prevent illegal activities or fraud.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-secondary mt-3">
                          D. Business Transfers
                        </h3>
                        <p className="mt-1">
                          If ErrandHubb is involved in a merger, acquisition, investment, or asset sale, your information may be transferred as part of that transaction.
                        </p>
                      </div>
                    </div>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      4. Cookies and Tracking Technologies
                    </h2>
                    <p>We use cookies, analytics tools, and similar technologies to:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Improve your user experience</li>
                      <li>Track website and app performance</li>
                      <li>Remember your settings</li>
                      <li>Deliver relevant content</li>
                    </ul>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      5. Data Security
                    </h2>
                    <p>
                      We use physical, administrative, and technical safeguards to protect your data. However, no online service is 100% secure, and we cannot guarantee absolute protection.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      6. Your Choices and Rights
                    </h2>
                    <p>You may have the right to:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Access the information we store about you</li>
                      <li>Request corrections</li>
                      <li>Request deletion of your data</li>
                      <li>Opt out of marketing communications</li>
                      <li>Limit certain types of data processing</li>
                    </ul>
                    <p className="mt-3">
                      To exercise these rights, contact us at:{" "}
                      <a href="mailto:support@errandhubb.com" className="text-primary font-bold hover:underline">
                        support@errandhubb.com
                      </a>
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      7. Children’s Policy
                    </h2>
                    <p>
                      ErrandHubb does not knowingly collect information from children under 13. If we learn that a child’s personal data has been collected, we will delete it immediately.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      8. Location Information
                    </h2>
                    <p>If you grant location access, we may use your location to:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Assign the closest driver</li>
                      <li>Track delivery progress</li>
                      <li>Ensure accurate pickup/drop-off</li>
                    </ul>
                    <p className="mt-2 text-xs sm:text-sm text-text-secondary italic">
                      You can disable location access at any time in your device settings.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      9. Data Retention
                    </h2>
                    <p>We retain data only as long as necessary for:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Completing services</li>
                      <li>Fulfilling legal or tax obligations</li>
                      <li>Resolving disputes</li>
                      <li>Maintaining accurate business records</li>
                    </ul>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      10. Updates to This Privacy Policy
                    </h2>
                    <p>
                      We may update this Privacy Policy from time to time. The “Last Updated” date above will reflect the latest changes. Continued use of our Services means you accept the updated terms.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      11. Contact Us
                    </h2>
                    <p>For questions about this policy or your data, contact us:</p>
                    <div className="bg-slate-50 border-l-4 border-primary p-3 sm:p-4 rounded-r-lg mt-3">
                      <p className="font-extrabold text-secondary">ErrandHubb Privacy Department</p>
                      <p className="text-xs sm:text-sm mt-1">
                        Email:{" "}
                        <a href="mailto:support@errandhubb.com" className="text-primary font-bold hover:underline">
                          support@errandhubb.com
                        </a>
                      </p>
                      <p className="text-xs sm:text-sm">
                        Phone: <span className="text-secondary font-semibold">425-500-8314</span>
                      </p>
                    </div>
                  </div>
                </article>
              )}

              {activeTab === "terms" && <TermsOfService />}

              {false && (
                <article className="prose max-w-none text-foreground font-sans">
                  <div className="border-b pb-5 mb-6 border-slate-100">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">
                      Terms of Service
                    </h1>
                    <p className="text-xs sm:text-sm text-text-secondary mt-2 font-medium">
                      Last Updated: <span className="text-primary font-semibold">June 22, 2026</span>
                    </p>
                  </div>

                  <div className="space-y-4 text-xs sm:text-[15px] leading-relaxed text-foreground">
                    <p>
                      Welcome to ErrandHubb (“ErrandHubb,” “we,” “our,” or “us”). These Terms of Service (“Terms”) govern your access to and use of our website, mobile application, and services (collectively, the “Services”). By accessing or using our Services, you agree to be bound by these Terms.
                    </p>
                    <p className="bg-red-50 text-red-700 px-4 py-3 rounded-lg border border-red-100 text-xs sm:text-sm font-semibold">
                      If you do not agree to these Terms, do not use our Services.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      1. Information We Collect
                    </h2>
                    <p>
                      ErrandHubb provides premium errand and delivery services for customers, including—but not limited to—food delivery, package delivery, personal errands, shopping, and other on-demand tasks (“Jobs”). Jobs are performed by independent contractors (“Drivers”) who are not employees of ErrandHubb.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      2. Eligibility
                    </h2>
                    <p>To use the Services, you must:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Be at least 18 years old</li>
                      <li>Create an account with accurate information</li>
                      <li>Have the legal authority to agree to these Terms</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-text-secondary italic">
                      ErrandHubb may refuse service to anyone for any reason at any time.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      3. User Accounts
                    </h2>
                    <p>
                      You are responsible for maintaining the confidentiality of your login information and for all activities conducted through your account.
                    </p>
                    <p>You agree to:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Provide true and accurate information</li>
                      <li>Not use someone else’s account</li>
                      <li>Notify us of unauthorized access immediately</li>
                    </ul>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      4. Service Fees & Payment
                    </h2>
                    <p>Customers agree to pay all fees associated with their orders and errands, including:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Service fees</li>
                      <li>Premium or rush fees</li>
                      <li>Tips (optional but encouraged)</li>
                    </ul>
                    <p className="mt-3">
                      Payments are processed through third-party payment processors. ErrandHubb does not store credit card information.
                  </p>
                    <p className="bg-amber-50 text-amber-800 px-4 py-3 rounded-lg border border-amber-100 text-xs sm:text-sm font-semibold">
                      All sales are final. No refunds will be issued once a Job has been assigned to a Driver.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      5. Cancellation Policy
                    </h2>
                    <p>
                      Customers may cancel a Job before a Driver is assigned for no fee. If a Driver has already accepted the Job, cancellation fees may apply.
                    </p>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      ErrandHubb reserves the right to cancel any Job for safety, fraud prevention, or operational reasons.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      6. Driver Relationship
                    </h2>
                    <p>
                      Drivers are independent contractors, not employees. They:
                    </p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Provide their own vehicles and equipment</li>
                      <li>Control how Jobs are completed</li>
                      <li>Are responsible for maintaining insurance and legal compliance</li>
                    </ul>
                    <p className="mt-3 text-xs sm:text-sm text-text-secondary bg-slate-50 p-3 rounded-lg border">
                      ErrandHubb is not liable for Driver actions, conduct, or negligence.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      7. Prohibited Uses
                    </h2>
                    <p>You agree not to use ErrandHubb to:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Transport illegal substances or weapons</li>
                      <li>Send hazardous or unsafe materials</li>
                      <li>Engage in fraud</li>
                      <li>Harass, harm, or threaten Drivers</li>
                      <li>Violate any law or regulation</li>
                    </ul>
                    <p className="text-red-600 text-xs sm:text-sm font-semibold italic">
                      Violation may result in account termination.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      8. Limitation of Liability
                    </h2>
                    <p>To the fullest extent permitted by law, ErrandHubb is not liable for:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Delays, cancellations, or service interruptions</li>
                      <li>Loss, theft, or damage to packages or items</li>
                      <li>Actions or negligence of independent Drivers</li>
                      <li>Indirect, incidental, or punitive damages</li>
                    </ul>
                    <p className="font-semibold text-secondary">
                      Your sole remedy is to discontinue use of the Services.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      9. No Guarantees
                    </h2>
                    <p>ErrandHubb makes no guarantee regarding:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Delivery times</li>
                      <li>Driver availability</li>
                      <li>Service quality</li>
                      <li>Perfect accuracy of information</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-text-secondary italic">
                      All use is “as-is” and “as available.”
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      10. Intellectual Property
                    </h2>
                    <p>
                      All content, logos, branding, text, and materials on the Services belong to ErrandHubb unless otherwise stated. You may not copy, reproduce, or exploit any part of the Services.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      11. Privacy Policy
                    </h2>
                    <p>
                      Use of our Services is also governed by our Privacy Policy. We recommend reviewing it to understand how your information is collected and used.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      12. Termination
                    </h2>
                    <p>ErrandHubb may suspend or delete your account at any time for:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Safety concerns</li>
                      <li>Fraud or misuse</li>
                      <li>Violating these Terms</li>
                      <li>Failure to pay fees</li>
                    </ul>
                    <p className="mt-2">You may also cancel your account at any time.</p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      13. Governing Law
                    </h2>
                    <p>
                      These Terms are governed by the laws of the State of California, without regard to conflict-of-law principles. Any disputes shall be resolved in Los Angeles County, California.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      14. Changes to These Terms
                    </h2>
                    <p>
                      ErrandHubb may update these Terms at any time. Changes will be posted with an updated date. Continued use of the Services means you accept the new Terms.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      15. Contact Information
                    </h2>
                    <p>For questions or legal notices:</p>
                    <div className="bg-slate-50 border-l-4 border-primary p-3 sm:p-4 rounded-r-lg mt-3">
                      <p className="font-extrabold text-secondary">ErrandHubb Support Team</p>
                      <p className="text-xs sm:text-sm mt-1">
                        Email:{" "}
                        <a href="mailto:info@errandhubb.com" className="text-primary font-bold hover:underline">
                          info@errandhubb.com
                        </a>
                      </p>
                      <p className="text-xs sm:text-sm">
                        Phone: <span className="text-secondary font-semibold">425-500-8314</span>
                      </p>
                      <p className="text-xs sm:text-sm mt-1">
                        Address: <span className="text-foreground">23679 Calabasas Rd., Calabasas, CA 90034</span>
                      </p>
                    </div>
                  </div>
                </article>
              )}

              {activeTab === "refund" && (
                <article className="prose max-w-none text-foreground font-sans">
                  <div className="border-b pb-5 mb-6 border-slate-100">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">
                      Refund Policy
                    </h1>
                    <p className="text-xs sm:text-sm text-text-secondary mt-2 font-medium">
                      Effective Date: <span className="text-primary font-semibold">May 4th, 2026</span>
                    </p>
                  </div>

                  <div className="space-y-4 text-xs sm:text-[15px] leading-relaxed text-foreground">
                    <p>
                      At ErrandHubb, we are committed to providing reliable and efficient errand services. This Refund Policy outlines the circumstances under which refunds may be issued.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      1. Eligibility for Refunds
                    </h2>
                    <p>
                      Customers may be eligible for a refund <span className="font-bold underline text-secondary">only within one (1) hour</span> of placing an order on the ErrandHubb platform under the following conditions:
                    </p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>The errand was not completed due to an issue caused by ErrandHubb or the assigned Errand Runner.</li>
                      <li>The service provided was materially different from what was requested.</li>
                      <li>The Errand Runner failed to follow clear instructions.</li>
                    </ul>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      2. No Refund Policy After One Hour
                    </h2>
                    <p className="bg-red-50 text-red-700 px-4 py-3 rounded-lg border border-red-100 text-xs sm:text-sm font-semibold">
                      ErrandHubb does not offer refunds of any kind after one (1) hour from the time an errand request is placed on the platform. By using the platform, customers acknowledge and agree to this policy.
                    </p>
                    <p>No exceptions will be made for:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Change of mind</li>
                      <li>Delays caused by traffic, weather, store closures, or circumstances outside of our control</li>
                      <li>Dissatisfaction after an errand has already begun or been completed</li>
                      <li>Incorrect or incomplete instructions provided by the customer</li>
                    </ul>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      3. Cancellation Policy
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                      <div className="bg-emerald-50 border border-emerald-100 p-3 sm:p-4 rounded-xl">
                        <h4 className="font-extrabold text-emerald-800 text-xs sm:text-sm">Within One Hour</h4>
                        <p className="text-[11px] sm:text-xs text-emerald-700 mt-1">Refund requests may be reviewed for eligibility.</p>
                      </div>
                      <div className="bg-red-50 border border-red-100 p-3 sm:p-4 rounded-xl">
                        <h4 className="font-extrabold text-red-800 text-xs sm:text-sm">After One Hour</h4>
                        <p className="text-[11px] sm:text-xs text-red-700 mt-1">No refunds of any kind will be issued.</p>
                      </div>
                      <div className="bg-amber-50 border border-amber-100 p-3 sm:p-4 rounded-xl">
                        <h4 className="font-extrabold text-amber-800 text-xs sm:text-sm">Errand Has Started</h4>
                        <p className="text-[11px] sm:text-xs text-amber-700 mt-1">No refund under any circumstances.</p>
                      </div>
                    </div>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      4. Refund Request Process
                    </h2>
                    <p>To request a refund, customers must:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>Submit a request within one (1) hour of placing the errand request on the platform.</li>
                      <li>Provide relevant details, including order number and description of the issue.</li>
                    </ul>
                    <p className="mt-3">Refund requests can be submitted via:</p>
                    <ul className="list-disc pl-4 sm:pl-6 mt-2 space-y-1.5 marker:text-primary">
                      <li>App support</li>
                      <li>
                        Email:{" "}
                        <a href="mailto:support@errandhubb.com" className="text-primary font-bold hover:underline">
                          support@errandhubb.com
                        </a>
                      </li>
                    </ul>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      5. Processing Time
                    </h2>
                    <p>
                      If approved, refunds will be processed within 5–10 business days, depending on the original payment method.
                    </p>

                    <h2 className="text-base sm:text-[20px] font-extrabold text-secondary pt-3 mt-6 border-t border-slate-100">
                      6. Disputes
                    </h2>
                    <p>
                      ErrandHubb reserves the right to investigate all claims. Decisions are made at our sole discretion based on available evidence, including communication logs and Errand Runner reports.
                    </p>
                  </div>
                </article>
              )}
            </main>

            {/* Support Widget - Mobile/Tablet Only (shown below content card) */}
            <SupportWidget className="block lg:hidden mt-6" />
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default function LegalPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh] text-secondary font-bold">
        Loading Policies...
      </div>
    }>
      <LegalContent />
    </Suspense>
  );
}
