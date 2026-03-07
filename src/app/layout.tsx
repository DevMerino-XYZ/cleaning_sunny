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

// 1. Metadatos optimizados para SEO Local en Arizona
export const metadata: Metadata = {
  metadataBase: new URL("https://sunnys-cleaning-services.com"),

  title: {
    default: "Sunny’s Cleaning Services LLC | Expert Cleaning in Arizona",
    template: "%s | Sunny’s Cleaning Services LLC",
  },

  description:
    "Professional residential and commercial cleaning services across Arizona. Licensed & Insured. Specialized in deep cleaning, office maintenance, and move-in/out services in Phoenix and surrounding areas.",

  keywords: [
    "cleaning services Arizona",
    "house cleaning Phoenix",
    "commercial cleaning Scottsdale",
    "office cleaning AZ",
    "move out cleaning Arizona",
    "Sunny's Cleaning Services LLC",
    "professional cleaners Arizona",
  ],

  authors: [{ name: "Sunny’s Cleaning Services LLC" }],
  creator: "Sunny’s Cleaning Services LLC",

  openGraph: {
    title: "Sunny’s Cleaning Services LLC | Professional Cleaning in AZ",
    description:
      "Reliable and high-quality cleaning solutions for homes and businesses across Arizona. Get your free estimate today!",
    url: "https://sunnys-cleaning-services.com",
    siteName: "Sunny’s Cleaning Services LLC",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg", // Asegúrate de tener esta imagen en public
        width: 1200,
        height: 630,
        alt: "Sunny's Cleaning Services LLC Arizona",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sunny’s Cleaning Services LLC",
    description: "Expert residential and commercial cleaning across Arizona.",
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

  alternates: {
    canonical: "https://sunnys-cleaning-services.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Objeto JSON-LD para Google Local Business
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Sunny's Cleaning Services LLC",
    "alternateName": "Sunny's Cleaning",
    "description": "Professional residential and commercial cleaning services in Arizona.",
    "url": "https://sunnys-cleaning-services.com",
    "telephone": "+16026900183",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "AZ",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.4484, 
      "longitude": -112.0740
    },
    "areaServed": {
      "@type": "State",
      "name": "Arizona"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Cleaning"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Cleaning"
          }
        }
      ]
    }
  };

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Inyección de Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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