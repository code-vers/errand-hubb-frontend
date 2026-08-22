"use client";

import Link from "next/link";
import { UserPlus, Briefcase } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden max-w-full">
      <div className="mx-auto w-full max-w-md">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-gray-600 font-medium">
          Choose how you want to sign up
        </p>
      </div>

      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow-md rounded-2xl border border-gray-100 space-y-5 sm:space-y-6">
          <Link
            href="/client-registration"
            className="w-full flex items-center justify-center gap-3 px-4 py-4 sm:py-5 border border-gray-300 rounded-xl shadow-xs text-base sm:text-lg font-bold text-gray-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.99]"
          >
            <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
            <span className="truncate">Sign Up as Client</span>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 bg-white text-gray-400 font-semibold uppercase tracking-wider">Or</span>
            </div>
          </div>

          <Link
            href="/errand-registration"
            className="w-full flex items-center justify-center gap-3 px-4 py-4 sm:py-5 border border-transparent rounded-xl shadow-md text-base sm:text-lg font-bold text-white bg-primary hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.99]"
          >
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
            <span className="truncate">Sign Up as ErrandR</span>
          </Link>

          <div className="pt-2 text-center">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-primary hover:text-primary/80 underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
