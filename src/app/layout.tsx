import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ThemeProvider from "@/components/providers/ThemeProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sunnys-cleaning-services.com"),

  title: {
    default: "Sunny’s Cleaning Services LLC",
    template: "%s | Sunny’s Cleaning Services LLC",
  },

  description:
    "Professional residential and commercial cleaning services. Reliable, affordable, and high-quality cleaning solutions.",

  keywords: [
    "cleaning services",
    "house cleaning",
    "commercial cleaning",
    "home cleaning services",
    "professional cleaning",
    "Sunny's Cleaning Services",
  ],

  authors: [{ name: "Sunny’s Cleaning Services LLC" }],

  creator: "Sunny’s Cleaning Services LLC",

  openGraph: {
    title: "Sunny’s Cleaning Services LLC",
    description:
      "Professional residential and commercial cleaning services. Reliable and affordable cleaning solutions.",
    url: "https://sunnys-cleaning-services.com",
    siteName: "Sunny’s Cleaning Services LLC",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sunny’s Cleaning Services LLC",
    description:
      "Professional residential and commercial cleaning services.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://sunnys-cleaning-services.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <Navbar />

            <main className="pt-20 min-h-screen">
              {children}
            </main>

            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}