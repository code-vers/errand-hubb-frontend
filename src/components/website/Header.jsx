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
    { name: "Client Registration", href: "/client-reg" },
    { name: "ErrandR Registration", href: "/errandr-reg" },
    { name: "Legal", href: "/legal" },
  ];

  return (
    <header
      className='w-full sticky top-0 z-50 bg-white font-sans 
    '
      data-purpose='main-header'>
      {/* Main Navigation Area */}
      <div
        className='flex flex-col md:flex-row w-full '
        data-purpose='logo-nav-container'>
        {/* Logo Section */}
        <div
          className='bg-white flex items-center justify-between py-4 px-6 md:w-62.5 shrink-0'
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
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex bg-primary flex-1 items-center overflow-x-auto whitespace-nowrap transition-all duration-300 ease-in-out`}
          data-purpose='main-navigation'>
          <ul className='flex flex-col md:flex-row w-full items-start md:items-center px-4 py-3 md:py-0 md:min-h-15'>
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
