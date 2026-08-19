import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/Providers";
import RootLayoutContent from "./RootLayoutContent";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "Errand Hub",
    template: "%s | Errand Hub",
  },
  description: "Errand Hub is a platform that connects client requests with local service providers and merchandise.",
  keywords: ["errand", "service provider", "local services", "errand runner"],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className="h-full antialiased" suppressHydrationWarning>
      <body className={`min-h-screen flex flex-col font-sans ${montserrat.variable}`} suppressHydrationWarning>
        <Providers>
          <RootLayoutContent>{children}</RootLayoutContent>
        </Providers>
      </body>
    </html>
  );
}

RootLayout.displayName = 'RootLayout';
