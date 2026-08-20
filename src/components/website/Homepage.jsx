"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowRight,
  BadgeCheck,
  BadgeDollarSign,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  DollarSign,
  Image as ImageIcon,
  Menu,
  MessageCircle,
  PackageCheck,
  PawPrint,
  PhoneCall,
  Play,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  TrendingUp,
  Trophy,
  X,
} from "lucide-react";
import styles from "./Homepage.module.css";

const moreMenuItems = [
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

const popularErrands = [
  ["Grocery Shopping", ShoppingCart, styles.green],
  ["Package Pickup", PackageCheck, styles.blue],
  ["Pharmacy Run", Plus, styles.purple],
  ["Dog Walking", PawPrint, styles.orange],
];

const trustItems = [
  ["Vetted & Trusted", "All Erranders are background checked.", ShieldCheck],
  ["Message First", "Chat with your Errander before you hire.", MessageCircle],
  ["Transparent Pricing", "No surprise fees. Ever.", DollarSign],
  ["Get It Done", "Fast, reliable help when you need it most.", Clock3],
];

function Header({ onHowItWorksClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef(null);
  const { user, logout } = useAuth();

  // Close MORE dropdown when clicking outside on desktop
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target)
      ) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.siteHeader}>
      <Link className={styles.brand} href="/" aria-label="ErrandHubb home">
        <Image src="/errandhubb-logo.png" alt="ErrandHubb" width={857} height={196} priority />
      </Link>

      <nav className={styles.nav} aria-label="Main navigation">
        <Link
          href="#how-it-works"
          onClick={(e) => {
            e.preventDefault();
            onHowItWorksClick();
          }}
        >
          How It Works
        </Link>

        {/* MORE Dropdown Button & Popover Card */}
        <div className="relative" ref={moreDropdownRef}>
          <button
            type="button"
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className="inline-flex items-center gap-2.5 bg-[#e57d38] hover:bg-[#d66f2b] text-white font-black text-[15px] tracking-wider uppercase px-4 py-2 rounded-xl border border-white/40 shadow-inner hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 outline-none"
            aria-label="More options menu"
            aria-expanded={isMoreOpen}
          >
            <Menu className="w-5 h-5 stroke-[2.5]" />
            <span className="font-extrabold tracking-wide">MORE</span>
            <ChevronDown className={`w-4 h-4 stroke-[3] transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Popover Card */}
          {isMoreOpen && (
            <div className="absolute left-0 sm:left-auto sm:right-0 md:left-0 top-full mt-2.5 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-gray-900">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 px-3 py-1.5 border-b border-gray-100 mb-1">
                More Services & Info
              </div>
              <div className="flex flex-col gap-0.5 max-h-[70vh] overflow-y-auto">
                {moreMenuItems.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group text-left whitespace-normal no-underline"
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${item.badgeColor} transition-transform group-hover:scale-110 shadow-sm flex items-center justify-center`}>
                        <IconComp className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-bold text-gray-900 group-hover:text-[#ff6900] transition-colors truncate">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium truncate">
                          {item.subtitle}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className={styles.headerActions}>
        {user ? (
          <>
            <Link className={`${styles.headerButton} ${styles.outlineButton}`} href="/dashboard">Dashboard</Link>
            <button type="button" className={`${styles.headerButton} ${styles.orangeButton} cursor-pointer`} onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link className={`${styles.headerButton} ${styles.outlineButton}`} href="/login">Log In</Link>
            <Link className={`${styles.headerButton} ${styles.orangeButton}`} href="/signup">Sign Up</Link>
          </>
        )}
      </div>

      <button type="button" className={styles.menuButton} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation" aria-expanded={isOpen}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          <Link
            href="#how-it-works"
            onClick={(e) => {
              setIsOpen(false);
              e.preventDefault();
              onHowItWorksClick();
            }}
          >
            How It Works
          </Link>

          <div className="w-full border-t border-gray-100 my-1 pt-2">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 px-2 mb-2">
              More Services & Info
            </div>
            <div className="flex flex-col gap-1 max-h-[50vh] overflow-y-auto pr-1">
              {moreMenuItems.map((item) => {
                const IconComp = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-orange-50 transition-colors no-underline"
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${item.badgeColor} flex items-center justify-center`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-[13px] font-bold text-gray-800 truncate">{item.name}</span>
                      <span className="text-[11px] text-gray-500 font-medium truncate">{item.subtitle}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={styles.mobileActions}>
            {user ? (
              <>
                <Link className={`${styles.headerButton} ${styles.outlineButton}`} href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <button type="button" className={`${styles.headerButton} ${styles.orangeButton} cursor-pointer`} onClick={() => { setIsOpen(false); logout(); }}>Logout</button>
              </>
            ) : (
              <>
                <Link className={`${styles.headerButton} ${styles.outlineButton}`} href="/login" onClick={() => setIsOpen(false)}>Log In</Link>
                <Link className={`${styles.headerButton} ${styles.orangeButton}`} href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

function HeroVisual() {
  return (
    <div className={styles.heroVisual}>
      <div className={styles.dotPattern} aria-hidden="true">
        {Array.from({ length: 30 }, (_, index) => <i key={index} />)}
      </div>
      <div className={styles.visualCircle} />
      <div className={styles.heroSubject}>
        <Image src="/hero-runner-cutout.png" alt="Errand runner ready to help" fill sizes="(max-width: 900px) 92vw, 53vw" className={styles.heroRunner} priority />
      </div>

      <aside className={`${styles.floatingCard} ${styles.errandsCard}`}>
        <h2>Popular Errands</h2>
        {popularErrands.map(([label, Icon, color]) => (
          <div className={styles.errandRow} key={label}>
            <span className={`${styles.errandIcon} ${color}`}><Icon size={18} strokeWidth={2.4} /></span>
            <span>{label}</span>
          </div>
        ))}
        <p>And more!</p>
      </aside>

      <aside className={`${styles.floatingCard} ${styles.profileCard}`}>
        <div className={styles.avatar}><Image src="/marlon-avatar.png" alt="Marlon B." fill sizes="62px" /></div>
        <div>
          <strong>Marlon B. <BadgeCheck size={16} /></strong>
          <div className={styles.rating}><Star size={15} fill="currentColor" /> 4.9 (128)</div>
          <small>Los Angeles, CA</small>
          <em>Available Now</em>
        </div>
      </aside>

      <aside className={`${styles.floatingCard} ${styles.completedCard}`}>
        <span className={styles.completedIcon}><Check size={26} strokeWidth={3} /></span>
        <div><strong>Errand Completed!</strong><span>Enjoy your free time.</span></div>
      </aside>
    </div>
  );
}

function VideoSection({ onOpen }) {
  return (
    <section id="how-it-works" className={styles.videoSection}>
      <button type="button" className={styles.videoTrigger} onClick={onOpen} aria-label="Watch how ErrandHubb works">
        <Image src="/video-thumbnail-v2.jpg" alt="Watch how ErrandHubb works" width={1280} height={720} sizes="(max-width: 1200px) 100vw, 1080px" />
        <span className={styles.videoOverlay}><span className={styles.playButton}><Play fill="currentColor" /></span><b>Watch how it works</b></span>
      </button>
    </section>
  );
}

export default function Homepage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Header onHowItWorksClick={() => setIsVideoOpen(true)} />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>Life&apos;s busy.<br />We&apos;ve got your<br /><span>errands.</span></h1>
            <p className={styles.heroDescription}><strong>ErrandHubb</strong> connects you with reliable, background-checked Erranders to get things done—fast, easy, and stress-free.</p>
            <div className={styles.benefits}>
              {["No hidden fees", "Choose your Errander", "Message before hiring", "Cancel anytime"].map((benefit) => <span key={benefit}><i><Check size={13} strokeWidth={3} /></i>{benefit}</span>)}
            </div>
            <div className={styles.heroActions}>
              <Link className={`${styles.heroButton} ${styles.primaryHeroButton}`} href="/post-errand"><strong>Post an Errand</strong><small>It&apos;s free!</small><ArrowRight /></Link>
              <Link className={`${styles.heroButton} ${styles.secondaryHeroButton}`} href="/errand"><strong>Become an Errander</strong><small>Start earning today</small><ArrowRight /></Link>
            </div>
          </div>
          <HeroVisual />
        </section>

        <section className={styles.trustSection}>
          <div className={styles.trustStrip}>
            {trustItems.map(([title, detail, Icon]) => <div className={styles.trustItem} key={title}><Icon /><div><strong>{title}</strong><small>{detail}</small></div></div>)}
          </div>
          <div className={styles.ratingSection}><p>Trusted by thousands across the U.S.</p><div><span>★★★★★</span><b>4.8/5</b></div></div>
        </section>

        <VideoSection onOpen={() => setIsVideoOpen(true)} />
      </main>

      {isVideoOpen && <div className={styles.videoModal} role="dialog" aria-modal="true" aria-label="ErrandHubb introduction video" onClick={() => setIsVideoOpen(false)}><div onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setIsVideoOpen(false)} aria-label="Close video"><X /></button><iframe src="https://www.youtube.com/embed/KL1mL5e3mSo?autoplay=1&rel=0" title="How ErrandHubb works" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div></div>}
    </div>
  );
}
