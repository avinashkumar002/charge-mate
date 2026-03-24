import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/store/StoreProvider";
import RealtimeProvider from "@/components/RealtimeProvider/RealtimeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "EvSetu - Find Smart, Secure Charging | Verified Chargers & Hosting",
    template: "%s | EvSetu",
  },
  description: "Find verified charging stations or list your spot to earn. Smart, secure charging with real-time availability and instant booking.",
  keywords: [
    "charging app",
    "find charging near me",
    "private charging",
    "charging spaces",
    "driveway rental",
    "secure charging",
    "smart charging",
    "verified charging",
    "charging platform",
    "event charging",
    "host charging space",
    "earn from charging",
  ],
  authors: [{ name: "EvSetu Team" }],
  creator: "EvSetu",
  metadataBase: new URL("https://EvSetu.com"),
  alternates: {
    canonical: "https://EvSetu.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "EvSetu",
    title: "EvSetu - Find Smart, Secure Charging",
    description: "Connect with verified charging stations. Stop circling. Save time and money.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EvSetu - Smart Charging Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@EvSetu",
    title: "EvSetu - Find Smart, Secure Charging",
    description: "Connect with verified charging stations nearby.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <StoreProvider>
          <RealtimeProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '16px',
                },
                success: {
                  style: {
                    background: '#2C7FFF',
                    color: '#FFFFFF',
                  },
                  iconTheme: {
                    primary: '#FFFFFF',
                    secondary: '#2C7FFF',
                  },
                },
                error: {
                  style: {
                    background: '#ff4b4b',
                    color: '#FFFFFF',
                  },
                  iconTheme: {
                    primary: '#FFFFFF',
                    secondary: '#ff4b4b',
                  },
                },
              }}
            />
            <Header />
            <div className="h-18 lg:h-18.5 w-full"></div>
            {children}
            <Footer />
          </RealtimeProvider>
        </StoreProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}