'use client';

import { usePathname } from "next/navigation";
import Header from "../components/website/Header";
import Footer from "../components/website/Footer";
import GlobalReviewModalManager from "../components/common/GlobalReviewModalManager";

export default function RootLayoutContent({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/login') || pathname.startsWith('/merchandise');
  const isHomePage = pathname === '/';

  return (
    <>
      {!isDashboard && !isHomePage && <Header />}
      <main className={!isDashboard ? '' : 'free'}>{children}</main>
      {!isDashboard && <Footer />}
      <GlobalReviewModalManager />
    </>
  );
}

RootLayoutContent.displayName = 'RootLayoutContent';
