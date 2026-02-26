"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null)
  const [openSection, setOpenSection] = useState<string | null>(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
        },
      }
    )
  }, [])

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-[#1C2A39] text-white pt-14 pb-10">
      <div
        ref={footerRef}
        className="max-w-7xl mx-auto px-5 lg:px-8"
      >
        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-12">
          <Image
            src="/logo-white.png"
            alt="Sunny's Cleaning Service LLC"
            width={160}
            height={45}
          />
          <p className="text-gray-300 text-sm mt-5 leading-relaxed max-w-md">
            Sunny’s Cleaning Service LLC provides professional residential and
            commercial cleaning services across Arizona with structured
            standards and reliable execution.
          </p>
        </div>

        {/* Mobile Accordion Layout */}
        <div className="space-y-6 md:grid md:grid-cols-3 md:gap-10 md:space-y-0">
          
          {/* Services */}
          <div>
            <button
              onClick={() => toggleSection("services")}
              className="w-full flex justify-between items-center font-semibold mb-3 md:cursor-default"
            >
              Services
              <span className="md:hidden">
                {openSection === "services" ? "−" : "+"}
              </span>
            </button>

            <ul
              className={`space-y-3 text-sm text-gray-300 transition-all duration-300 ${
                openSection === "services" || typeof window !== "undefined" && window.innerWidth >= 768
                  ? "block"
                  : "hidden"
              } md:block`}
            >
              <li className="hover:text-white transition">General Cleaning</li>
              <li className="hover:text-white transition">Deep Cleaning</li>
              <li className="hover:text-white transition">Commercial Cleaning</li>
              <li className="hover:text-white transition">Residential Cleaning</li>
              <li className="hover:text-white transition">Specialty Services</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <button
              onClick={() => toggleSection("company")}
              className="w-full flex justify-between items-center font-semibold mb-3 md:cursor-default"
            >
              Company
              <span className="md:hidden">
                {openSection === "company" ? "−" : "+"}
              </span>
            </button>

            <ul
              className={`space-y-3 text-sm text-gray-300 ${
                openSection === "company"
                  ? "block"
                  : "hidden"
              } md:block`}
            >
              <li className="hover:text-white transition">About Us</li>
              <li className="hover:text-white transition">Contact</li>
              <li className="hover:text-white transition">Gallery</li>
              <li className="hover:text-white transition">Service Areas</li>
              <li className="hover:text-white transition">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <button
              onClick={() => toggleSection("contact")}
              className="w-full flex justify-between items-center font-semibold mb-3 md:cursor-default"
            >
              Contact
              <span className="md:hidden">
                {openSection === "contact" ? "−" : "+"}
              </span>
            </button>

            <div
              className={`space-y-3 text-sm text-gray-300 ${
                openSection === "contact"
                  ? "block"
                  : "hidden"
              } md:block`}
            >
              <p>Phone: +1 602-690-0183</p>
              <p>Email: sunnyscleaningservices6@gmail.com</p>
              <p>Service Area: Arizona</p>
              <p className="mt-4 text-gray-400">
                Licensed & Insured<br />
                Pet-Friendly Service
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm px-5">
        © 2026 Sunny’s Cleaning Service LLC. All rights reserved.
      </div>
    </footer>
  )
}