'use client';

import { Montserrat } from "next/font/google";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function RootLayoutContent({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/login');

  return (
    <body className={`min-h-screen flex flex-col font-sans ${montserrat.variable}`}>
      {!isDashboard && <Header />}
      <main className={!isDashboard ? '' : 'free'}>{children}</main>
      {!isDashboard && <Footer />}
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className="h-full antialiased">
      <AuthProvider>
        <RootLayoutContent>{children}</RootLayoutContent>
      </AuthProvider>
    </html>
  );
}
