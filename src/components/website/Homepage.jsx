"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  DollarSign,
  Menu,
  MessageCircle,
  PackageCheck,
  PawPrint,
  Play,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import styles from "./Homepage.module.css";

const navItems = [
  ["How It Works", "#how-it-works"],
  ["Find Erranders", "/search"],
  ["Become an Errander", "/errand"],
  ["Pricing", "/dashboard/subscription"],
  ["For Business", "/post-ad"],
  ["Help", "/contact"],
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

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.siteHeader}>
      <Link className={styles.brand} href="/" aria-label="ErrandHubb home">
        <Image src="/errandhubb-logo.png" alt="ErrandHubb" width={857} height={196} priority />
      </Link>

      <nav className={styles.nav} aria-label="Main navigation">
        {navItems.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
      </nav>

      <div className={styles.headerActions}>
        <Link className={`${styles.headerButton} ${styles.outlineButton}`} href="/login">Log In</Link>
        <Link className={`${styles.headerButton} ${styles.orangeButton}`} href="/signup">Sign Up</Link>
      </div>

      <button type="button" className={styles.menuButton} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation" aria-expanded={isOpen}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navItems.map(([label, href]) => <Link key={label} href={href} onClick={() => setIsOpen(false)}>{label}</Link>)}
          <div className={styles.mobileActions}>
            <Link className={`${styles.headerButton} ${styles.outlineButton}`} href="/login">Log In</Link>
            <Link className={`${styles.headerButton} ${styles.orangeButton}`} href="/signup">Sign Up</Link>
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
      <Header />
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
