"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Search For ErrandR", href: "/search" },
    { name: "Post An Errand", href: "/post" },
    { name: "Errand Gallery", href: "/gallery" },
    { name: "Client Registration", href: "/client-reg" },
    { name: "ErrandR Registration", href: "/errandr-reg" },
    { name: "Legal", href: "/legal" },
  ];

  return (
    <header
      className='w-full shadow-sm bg-white font-sans'
      data-purpose='main-header'>
      {/* Main Navigation Area */}
      <div
        className='flex flex-col md:flex-row w-full '
        data-purpose='logo-nav-container'>
        {/* Logo Section */}
        <div
          className='bg-white flex items-center justify-between py-4 px-6 md:w-[250px] shrink-0'
          data-purpose='logo-section'>
          <Link href='/' className='flex flex-col items-center no-underline'>
            <div className='flex font-bold text-2xl tracking-tight'>
              <span className='text-secondary uppercase'>Errand</span>
              <span className='text-primary uppercase relative ml-1'>
                Hubb
                <span className='absolute -left-[14px] top-[2px] opacity-20'>
                  <svg
                    fill='none'
                    height='24'
                    stroke='var(--color-primary)'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    width='24'>
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
                  </svg>
                </span>
              </span>
            </div>
            <span className='text-[0.6rem] text-gray-500 italic mt-1 font-serif tracking-tighter'>
              &quot;Getting your errands done ASAP!&quot;
            </span>
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
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex bg-primary flex-1 items-center overflow-x-auto whitespace-nowrap transition-all duration-300 ease-in-out`}
          data-purpose='main-navigation'>
          <ul className='flex flex-col md:flex-row w-full items-start md:items-center px-4 py-3 md:py-0 md:min-h-[60px]'>
            {navLinks.map((link, index) => (
              <li
                key={link.name}
                className={`w-full md:w-auto px-3 md:px-4 py-2 md:py-0 border-b md:border-b-0 md:border-r border-[#E8670A]/30 last:border-0`}>
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
    </header>
  );
}
