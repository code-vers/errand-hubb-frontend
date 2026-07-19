'use client';

import { usePathname } from "next/navigation";
import Header from "../components/website/Header";
import Footer from "../components/website/Footer";

export default function RootLayoutContent({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/login') || pathname.startsWith('/merchandise');

  return (
    <>
      {!isDashboard && <Header />}
      <main className={!isDashboard ? '' : 'free'}>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}

RootLayoutContent.displayName = 'RootLayoutContent';
