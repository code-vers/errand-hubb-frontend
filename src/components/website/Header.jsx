"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../public/logo.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Search For ErrandR", href: "/search" },
    { name: "Post An Errand", href: "/post-errand" },
    { name: "Errand Gallery", href: "/gallery" },
    { name: "Client Registration", href: "/client-registration" },
    { name: "ErrandR Registration", href: "/errand-registration" },
    { name: "Contact", href: "/contact" },
    { name: "Errand", href: "/errand" },
    { name: "Errand's", href: "/errand's" },
    { name: "Legal", href: "/legal" },
  ];

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
              <Image src={logo} alt='logo' />
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
            className={`bg-primary flex-1 items-center transition-all duration-500 ease-in-out overflow-hidden md:overflow-visible whitespace-nowrap
              absolute md:static top-full left-0 w-full md:w-auto z-40
              ${
                isMenuOpen
                  ? "max-h-[90vh] opacity-100 translate-y-0 visible shadow-lg"
                  : "max-h-0 opacity-0 -translate-y-4 invisible md:max-h-none md:opacity-100 md:translate-y-0 md:visible"
              } md:flex`}
            data-purpose='main-navigation'>
            <ul className='flex flex-col md:flex-row w-full items-start md:items-center px-4 py-3 md:py-0 md:min-h-15'>
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
                  <Link
                    href={link.href}
                    className='text-white text-[13px] font-semibold hover:text-gray-200 transition-colors block'
                    onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
