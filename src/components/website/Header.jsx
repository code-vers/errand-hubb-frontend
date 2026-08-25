"use client";

import { getImageUrl } from "@/configs/api.config";
import { useAuth } from "@/context/AuthContext";
import {
  BadgeDollarSign,
  Building2,
  ChevronDown,
  CircleHelp,
  Image as ImageIcon,
  Menu,
  PhoneCall,
  Play,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Trophy,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "../../../public/logo2.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0 });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!isDropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownCoords({
        top: rect.bottom + 8,
        left: Math.max(16, Math.min(rect.left, window.innerWidth - 336)),
      });
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside on desktop & reposition on scroll/resize
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleScrollOrResize() {
      if (isDropdownOpen && dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        setDropdownCoords({
          top: rect.bottom + 8,
          left: Math.max(16, Math.min(rect.left, window.innerWidth - 336)),
        });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    if (isDropdownOpen) {
      window.addEventListener("scroll", handleScrollOrResize, true);
      window.addEventListener("resize", handleScrollOrResize);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isDropdownOpen]);

  // Secondary links inside Desktop MORE Popover Dropdown
  const hamburgerItems = [
    {
      name: "Errand Gallery",
      subtitle: "Browse showcase photos",
      href: "/gallery",
      icon: ImageIcon,
      badgeColor: "bg-purple-100/80 text-purple-600",
    },
    {
      name: "Pricing",
      subtitle: "Simple, transparent membership plans",
      href: "/pricing",
      icon: BadgeDollarSign,
      badgeColor: "bg-emerald-100/80 text-emerald-600",
    },
    {
      name: "Competition",
      subtitle: "See how ErrandHubb compares",
      href: "/competition",
      icon: Trophy,
      badgeColor: "bg-amber-100/80 text-amber-600",
    },
    {
      name: "FAQ",
      subtitle: "Answers for Clients and Erranders",
      href: "/faq",
      icon: CircleHelp,
      badgeColor: "bg-sky-100/80 text-sky-600",
    },
    {
      name: "Merchandise Store",
      subtitle: "Official ErrandHub gear & apparel",
      href: "/merchandise",
      icon: ShoppingBag,
      badgeColor: "bg-orange-100/80 text-orange-600",
    },
    {
      name: "About ErrandHubb",
      subtitle: "Our mission & community story",
      href: "/about",
      icon: Building2,
      badgeColor: "bg-blue-100/80 text-blue-600",
    },
    {
      name: "Investor Relations",
      subtitle: "Financials & company updates",
      href: "/investor-relations",
      icon: TrendingUp,
      badgeColor: "bg-indigo-100/80 text-indigo-600",
    },
    {
      name: "Contact Us",
      subtitle: "Get in touch with support",
      href: "/contact",
      icon: PhoneCall,
      badgeColor: "bg-rose-100/80 text-rose-600",
    },
    {
      name: "Legal & Policies",
      subtitle: "Terms, privacy & refund policies",
      href: "/legal",
      icon: ShieldCheck,
      badgeColor: "bg-teal-100/80 text-teal-600",
    },
  ];

  // Pure serial list for Mobile drawer view
  const getMobileSerialLinks = () => {
    let links = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Errands", href: "/errand" },
      { name: "Errand Gallery", href: "/gallery" },
      { name: "Pricing", href: "/pricing" },
      { name: "Competition", href: "/competition" },
      { name: "FAQ", href: "/faq" },
      { name: "Investor Relations", href: "/investor-relations" },
      { name: "Contact", href: "/contact" },
      { name: "Legal", href: "/legal" },
      { name: "Ads", href: "/ads" },
    ];

    if (user?.role === "errand") {
      links.splice(2, 0, { name: "Search For ErrandR", href: "/search" });
      links.splice(3, 0, { name: "Errand's Board", href: "/errand-board" });
    } else {
      links.splice(2, 0, { name: "Post An Errand", href: "/post-errand" });
    }

    if (user) {
      const adsIndex = links.findIndex((l) => l.name === "Ads");
      if (adsIndex !== -1) {
        links.splice(adsIndex, 0, { name: "Dashboard", href: "/dashboard" });
      } else {
        links.push({ name: "Dashboard", href: "/dashboard" });
      }
    }

    const adsIndexAfterDashboard = links.findIndex((l) => l.name === "Ads");
    if (adsIndexAfterDashboard !== -1) {
      if (user) {
        links.splice(adsIndexAfterDashboard + 1, 0, {
          name: "Profile",
          href: "/dashboard/profile",
          isProfile: true,
        });
        links.splice(adsIndexAfterDashboard + 2, 0, {
          name: "Logout",
          href: "#",
          onClick: logout,
          isLogout: true,
        });
      } else {
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
      if (user) {
        links.push({ name: "Profile", href: "/dashboard/profile", isProfile: true });
        links.push({ name: "Logout", href: "#", onClick: logout, isLogout: true });
      } else {
        links.push({ name: "Login", href: "/login", isLogin: true });
        links.push({ name: "Sign Up", href: "/signup", isSignup: true });
      }
    }

    return links;
  };

  const mobileSerialLinks = getMobileSerialLinks();

  return (
    <header
      className='w-full sticky top-0 z-50 bg-white font-sans shadow-sm max-w-full'
      data-purpose='main-header'>
      {/* Background split layer for desktop */}
      <div className='absolute inset-0 hidden md:flex pointer-events-none'>
        <div className='flex-1 bg-white'></div>
        <div className='w-full max-w-[1540px] mx-auto flex'>
          <div className='w-56 bg-white'></div>
          <div className='flex-1 bg-white'></div>
        </div>
        <div className='flex-1 bg-white'></div>
      </div>

      {/* Main Content Area */}
      <div className='mx-auto w-full max-w-[1540px] relative z-10'>
        <div className='flex flex-col md:flex-row w-full relative'>
          {/* Logo Section */}
          <div
            className='bg-white flex items-center justify-between py-3.5 px-4 lg:px-6 md:w-56 shrink-0 z-50'
            data-purpose='logo-section'>
            <Link href='/' className='flex flex-col items-center no-underline'>
              <Image src={logo} alt='ErrandHubb Logo' className='h-11 w-auto' priority />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='md:hidden p-2 text-primary focus:outline-none rounded-xl hover:bg-gray-100 transition-colors'
              aria-label='Toggle menu'>
              {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </button>
          </div>

          {/* Desktop Navigation Bar (hidden on mobile) */}
          <nav
            className='bg-white flex-1 items-center hidden md:flex min-w-0 overflow-x-auto header-nav-scroll py-1'
            data-purpose='main-navigation'>
            <div className='flex flex-row w-full justify-between items-center px-2 lg:px-6 min-h-15 min-w-max'>

              {/* Left Nav Group */}
              <ul className='flex flex-row items-center gap-1 xl:gap-2 shrink-0'>
                {/* 1. Home */}
                <li className='px-1.5 lg:px-3 border-r border-gray-200'>
                  <Link
                    href='/'
                    className='text-xs lg:text-[13px] font-bold text-slate-800 hover:text-primary transition-colors block uppercase tracking-wider whitespace-nowrap'>
                    Home
                  </Link>
                </li>

                {/* 2. Post An Errand (for client/guests) or Search For ErrandR (for errand runners) */}
                <li className='px-3 border-r border-gray-200'>
                  {user?.role === "errand" ? (
                    <Link
                      href='/search'
                      className='text-[13px] font-bold text-slate-800 hover:text-primary transition-colors block uppercase tracking-wider'>
                      Search For ErrandR
                    </Link>
                  ) : (
                    <Link
                      href='/post-errand'
                      className='text-[13px] font-bold text-slate-800 hover:text-primary transition-colors block uppercase tracking-wider'>
                      Post An Errand
                    </Link>
                  )}
                </li>

                {/* 3. Errands */}
                <li className='px-3 border-r border-gray-200'>
                  <Link
                    href='/errand'
                    className='text-[13px] font-bold text-slate-800 hover:text-primary transition-colors block uppercase tracking-wider'>
                    Errands
                  </Link>
                </li>

                {/* 4. MORE Popover Dropdown Button */}
                <li className='px-3 border-r border-gray-200 relative' ref={dropdownRef}>
                  <button
                    type='button'
                    onClick={toggleDropdown}
                    className='inline-flex items-center gap-2 bg-[#e57d38] hover:bg-[#d66f2b] text-white font-black text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-xl border border-orange-400/30 shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95 outline-none'
                    aria-label='More options menu'
                    aria-expanded={isDropdownOpen}>
                    <Menu className='w-3.5 h-3.5 stroke-[2.5]' />
                    <span className='font-extrabold tracking-wide'>MORE</span>
                    <ChevronDown className={`w-3.5 h-3.5 stroke-[3] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Popover Card */}
                  {isDropdownOpen && (
                    <div
                      style={{
                        position: "fixed",
                        top: `${dropdownCoords.top}px`,
                        left: `${dropdownCoords.left}px`,
                      }}
                      className='w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-gray-900'>
                      <div className='text-[11px] font-extrabold uppercase tracking-widest text-gray-400 px-3 py-1.5 border-b border-gray-100 mb-1'>
                        More Services & Info
                      </div>
                      <div className='flex flex-col gap-0.5 max-h-[70vh] overflow-y-auto'>
                        {hamburgerItems.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsDropdownOpen(false)}
                              className='flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-orange-50/60 transition-colors group text-left whitespace-normal'>
                              <div className={`p-2.5 rounded-xl shrink-0 ${item.badgeColor} transition-transform group-hover:scale-110 shadow-sm`}>
                                <IconComp className='w-4.5 h-4.5' />
                              </div>
                              <div className='flex flex-col min-w-0'>
                                <span className='text-[13px] font-bold text-gray-900 group-hover:text-primary transition-colors truncate'>
                                  {item.name}
                                </span>
                                <span className='text-[11px] text-gray-500 font-medium truncate'>
                                  {item.subtitle}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>

                {/* 5. PLAY VIDEO Commercial Link */}
                <li className='px-3'>
                  <button
                    type='button'
                    onClick={() => setIsVideoOpen(true)}
                    className='text-[13px] font-black text-slate-800 hover:text-primary transition-colors uppercase tracking-widest cursor-pointer flex items-center gap-1.5 bg-transparent border-0 py-1'
                    aria-label='Play commercial video'>
                    <Play className='w-3.5 h-3.5 fill-primary text-primary stroke-[2]' />
                    <span className='font-black'>PLAY VIDEO</span>
                  </button>
                </li>
              </ul>

              {/* Right Nav Group (Pushed to Far Right) */}
              <ul className='flex flex-row items-center gap-3 ml-auto'>
                {/* 5. Dashboard (if logged in) */}
                {user && (
                  <li className='px-3 border-r border-gray-200'>
                    <Link
                      href='/dashboard'
                      className='text-[13px] font-bold text-slate-800 hover:text-primary transition-colors block uppercase tracking-wider'>
                      Dashboard
                    </Link>
                  </li>
                )}

                {/* 6. Ads (EXACT original italic blue badge) */}
                <li className='px-3 border-r border-gray-200'>
                  <Link
                    href='/ads'
                    className='inline-block bg-[#1a3a7a] uppercase text-white font-extrabold italic tracking-wide px-4 py-[5px] rounded-sm text-[20px] shadow-sm hover:bg-[#122856] transition-colors'>
                    Ads
                  </Link>
                </li>

                {/* 7. User Profile / Logout or Login / Sign Up */}
                {user ? (
                  <>
                    <li className='px-3 border-r border-gray-200'>
                      <Link
                        href='/dashboard/profile'
                        className='flex items-center gap-2 hover:bg-gray-100 px-2.5 py-1 rounded-full transition-all border border-gray-200'>
                        <div className='w-7 h-7 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0 shadow-sm border border-primary/20'>
                          {user.profileImage ? (
                            <img src={getImageUrl(user.profileImage)} alt='profile' className='w-full h-full object-cover' />
                          ) : (
                            <span className='text-primary font-bold text-xs uppercase'>
                              {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
                            </span>
                          )}
                        </div>
                        <span className='text-slate-800 text-[13px] font-extrabold hidden md:inline-block max-w-[120px] truncate'>
                          {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email?.split('@')[0]}
                        </span>
                      </Link>
                    </li>

                    <li className='px-3'>
                      <button
                        onClick={logout}
                        className='text-xs font-extrabold transition-all px-4 py-1.5 rounded-md uppercase tracking-wider cursor-pointer bg-red-500 hover:bg-red-600 text-white shadow-sm active:scale-95'>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='px-3 border-r border-gray-200'>
                      <Link
                        href='/login'
                        className='inline-block bg-[#1a3a7a] hover:bg-[#122856] text-white font-bold px-4 py-1.5 rounded-md uppercase tracking-wider active:scale-95 transition-all text-center text-[13px]'>
                        Login
                      </Link>
                    </li>

                    <li className='px-3'>
                      <Link
                        href='/signup'
                        className='inline-block bg-primary hover:bg-primary-dark text-white font-bold px-4 py-1.5 rounded-md uppercase tracking-wider active:scale-95 transition-all text-center text-[13px] shadow-sm'>
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>

            </div>
          </nav>

          {/* Mobile Navigation Drawer (Pure Serial List for Mobile Only) */}
          <nav
            className={`md:hidden bg-white flex-1 items-center transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
              absolute top-full left-0 w-full z-40 border-b border-gray-200
              ${
                isMenuOpen
                  ? "max-h-[85vh] overflow-y-auto opacity-100 translate-y-0 visible shadow-2xl"
                  : "max-h-0 opacity-0 -translate-y-4 invisible"
              }`}
            data-purpose='mobile-navigation'>
            <ul className='flex flex-col w-full items-start px-4 py-3'>
              {mobileSerialLinks.map((link, index) => (
                <li
                  key={link.name}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 25}ms` : "0ms",
                  }}
                  className={`w-full py-2.5 border-b border-gray-100 last:border-0 transition-all duration-300 ${
                    isMenuOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}>
                  {link.isProfile ? (
                    <Link
                      href={link.href}
                      className='flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors'
                      onClick={() => setIsMenuOpen(false)}>
                      <div className='w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0 shadow-sm border border-primary/20'>
                        {user.profileImage ? (
                          <img
                            src={getImageUrl(user.profileImage)}
                            alt='profile'
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <span className='text-primary font-bold text-sm uppercase'>
                            {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
                          </span>
                        )}
                      </div>
                      <span className='text-slate-800 text-[13px] font-bold'>
                        {user.firstName
                          ? `${user.firstName} ${user.lastName || ""}`
                          : user.email?.split("@")[0]}
                      </span>
                    </Link>
                  ) : link.onClick ? (
                    <button
                      onClick={() => {
                        link.onClick();
                        setIsMenuOpen(false);
                      }}
                      className='text-[13px] font-bold transition-all px-4 py-1.5 rounded-md uppercase tracking-wider cursor-pointer bg-red-500 hover:bg-red-600 text-white shadow-sm active:scale-95'>
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
                          ? "inline-block bg-primary hover:bg-primary-dark text-white font-bold px-4 py-1.5 rounded-md uppercase tracking-wider active:scale-95 transition-all text-center md:ml-2 mt-2 md:mt-0 shadow-sm"
                          : "text-slate-800 hover:text-primary"
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

      {/* Commercial Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-100 grid place-items-center p-4 bg-slate-900/85 backdrop-blur-sm animate-in fade-in duration-200 text-left"
          role="dialog"
          aria-modal="true"
          aria-label="ErrandHubb Commercial Video"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/KL1mL5e3mSo?autoplay=1&rel=0"
              title="ErrandHubb Commercial Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </header>
  );
}
