"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../public/logo2.svg";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Errand", href: "/errand" },
    { name: "Errand Gallery", href: "/gallery" },
    { name: "Investor Relations", href: "/investor-relations" },
    { name: "Contact", href: "/contact" },
    { name: "Legal", href: "/legal" },
    { name: "Ads", href: "/ads" },
  ];

  const getNavLinks = () => {
    let links = [...publicLinks];

    // Role-based links
    if (user?.role === "errand") {
      // Errand professionals see "Post An Errand"
      links.splice(2, 0, { name: "Post An Errand", href: "/post-errand" });
    } else {
      // Clients and Logged-out users see "Search For ErrandR"
      links.splice(2, 0, { name: "Search For ErrandR", href: "/search" });
      
      // ONLY Clients see "Errand's Board"
      if (user?.role === "client") {
        links.splice(3, 0, { name: "Errand's Board", href: "/errand-board" });
      }
    }

    // Add Dashboard if user is logged in
    if (user) {
      // Find index of "Ads" to place Dashboard before it
      const adsIndex = links.findIndex(l => l.name === "Ads");
      if (adsIndex !== -1) {
        links.splice(adsIndex, 0, { name: "Dashboard", href: "/dashboard" });
      } else {
        links.push({ name: "Dashboard", href: "/dashboard" });
      }
    }

    // Now insert Login / Logout right AFTER Ads
    const adsIndexAfterDashboard = links.findIndex(l => l.name === "Ads");
    if (adsIndexAfterDashboard !== -1) {
      if (user) {
        // Logged in: Add Logout after Ads
        links.splice(adsIndexAfterDashboard + 1, 0, {
          name: "Logout",
          href: "#",
          onClick: logout,
          isLogout: true,
        });
      } else {
        // Logged out: Add Login and Sign Up after Ads
        links.splice(adsIndexAfterDashboard + 1, 0, {
          name: "Login",
          href: "/login",
          isLogin: true,
        });
        links.splice(adsIndexAfterDashboard + 2, 0, {
          name: "Sign Up",
          href: "/signup",
          isSignup: true,
        });
      }
    } else {
      // Fallback
      if (user) {
        links.push({ name: "Logout", href: "#", onClick: logout, isLogout: true });
      } else {
        links.push({ name: "Login", href: "/login", isLogin: true });
        links.push({ name: "Sign Up", href: "/signup", isSignup: true });
      }
    }

    return links;
  };

  const navLinks = getNavLinks();

  return (
    <header
      className='w-full sticky top-0 z-50 bg-white font-sans'
      data-purpose='main-header'>
      {/* Background split layer for desktop */}
      <div className='absolute inset-0 hidden md:flex pointer-events-none'>
        <div className='flex-1 bg-white'></div>
        <div className='w-full max-w-385 mx-auto flex'>
          <div className='w-62.5 bg-white'></div>
          <div className='flex-1 bg-primary'></div>
        </div>
        <div className='flex-1 bg-primary'></div>
      </div>

      {/* Main Content Area */}
      <div className='mx-auto w-full relative z-10'>
        <div className='flex flex-col md:flex-row w-full relative'>
          {/* Logo Section */}
          <div
            className='bg-white flex items-center justify-between py-4 px-6 md:w-62.5 shrink-0 z-50'
            data-purpose='logo-section'>
            <Link href='/' className='flex flex-col items-center no-underline'>
              <Image src={logo} alt='logo' className='h-12' />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='md:hidden p-2 text-primary focus:outline-none'
              aria-label='Toggle menu'>
              {isMenuOpen ? (
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'></path>
                </svg>
              ) : (
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16m-7 6h7'></path>
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav
            className={`bg-primary flex-1 items-center transition-all duration-500 ease-in-out overflow-hidden md:overflow-x-auto md:overflow-y-hidden whitespace-nowrap
              absolute md:static top-full left-0 w-full md:w-auto z-40
              [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/50
              ${
                isMenuOpen
                  ? "max-h-[90vh] overflow-y-auto opacity-100 translate-y-0 visible shadow-lg"
                  : "max-h-0 opacity-0 -translate-y-4 invisible md:max-h-none md:opacity-100 md:translate-y-0 md:visible"
              } md:flex`}
            data-purpose='main-navigation'>
            <ul className='flex flex-col md:flex-row w-full md:w-max md:min-w-max items-start md:items-center px-4 py-3 md:py-0 md:min-h-15'>
              {navLinks.map((link, index) => (
                <li
                  key={link.name}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 40}ms` : "0ms",
                  }}
                  className={`w-full md:w-auto px-3 md:px-4 py-2 md:py-0 border-b md:border-b-0 md:border-r border-[#E8670A]/30 last:border-0 transition-all duration-500 ${
                    isMenuOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4 md:opacity-100 md:translate-x-0"
                  }`}>
                  {link.onClick ? (
                    <button
                      onClick={() => {
                        link.onClick();
                        setIsMenuOpen(false);
                      }}
                      className={`text-[13px] font-bold transition-all px-4 py-1.5 rounded-md uppercase tracking-wider cursor-pointer ${
                        link.isLogout 
                          ? "bg-red-500 hover:bg-red-600 text-white shadow-sm active:scale-95" 
                          : "text-white hover:text-white/80"
                      }`}>
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`text-[13px] font-semibold transition-colors block ${
                        link.name === "Ads"
                          ? "inline-block bg-[#1a3a7a] uppercase text-white font-extrabold italic tracking-wide px-4 py-[5px] rounded-sm text-[22px]"
                          : link.isLogin
                            ? "inline-block bg-[#1a3a7a] hover:bg-[#122856] text-white font-bold px-4 py-1.5 rounded-md uppercase tracking-wider active:scale-95 transition-all text-center"
                            : link.isSignup
                              ? "inline-block bg-white hover:bg-gray-100 text-primary font-bold px-4 py-1.5 rounded-md uppercase tracking-wider active:scale-95 transition-all text-center md:ml-2 mt-2 md:mt-0"
                              : "text-white hover:text-white/80"
                      }`}
                      onClick={() => setIsMenuOpen(false)}>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
