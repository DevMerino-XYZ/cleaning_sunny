import type { Metadata } from "next"
import { Montserrat, Inter } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SmoothScroll from "@/components/providers/SmoothScroll"
import ThemeProvider from "@/components/providers/ThemeProvider"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sunny’s Cleaning Service LLC",
  description: "Professional residential and commercial cleaning services across Arizona.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable}`}
      // Importante: No pongas scroll-behavior: smooth en el HTML si usas Lenis
    >
      <body className="font-body antialiased">
      <ThemeProvider>
        <SmoothScroll>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </ThemeProvider>
    </body>
    </html>
  )
}