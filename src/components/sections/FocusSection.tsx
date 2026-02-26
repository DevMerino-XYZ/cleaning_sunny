"use client";

import Image from "next/image";
import { useRef } from "react";

export default function FocusSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-bg transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Title */}
        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text text-center mb-20">
          Residential & Commercial Cleaning Solutions
        </h2>

        {/* Grid principal con división clara */}
        <div className="grid lg:grid-cols-2 gap-20 relative">
          
          {/* Línea divisora vertical en desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-text/10" />

          {/* ================= RESIDENTIAL ================= */}
          <div className="pr-0 lg:pr-10">
            
            <h3 className="text-2xl font-semibold text-text mb-8 text-center lg:text-left">
              Residential Cleaning
            </h3>

            {/* Collage 2x2 */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "/images/residential/residential-1.webp",
                "/images/residential/residential-2.webp",
                "/images/residential/residential-3.webp",
                "/images/residential/residential-4.webp",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative h-[160px] rounded-2xl overflow-hidden group"
                >
                  <Image
                    src={src}
                    alt="Residential cleaning"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <p className="text-text/70 leading-relaxed text-center lg:text-left">
              We help families maintain clean, organized, and healthy living
              spaces through reliable recurring or deep cleaning services.
            </p>
          </div>

          {/* ================= COMMERCIAL ================= */}
          <div className="pl-0 lg:pl-10">
            
            <h3 className="text-2xl font-semibold text-text mb-8 text-center lg:text-left">
              Commercial Cleaning
            </h3>

            {/* Collage 2x2 */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "/images/commercial/commercial-1.webp",
                "/images/commercial/commercial-2.webp",
                "/images/commercial/commercial-3.webp",
                "/images/commercial/commercial-4.webp",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative h-[160px] rounded-2xl overflow-hidden group"
                >
                  <Image
                    src={src}
                    alt="Commercial cleaning"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <p className="text-text/70 leading-relaxed text-center lg:text-left">
              We support offices and businesses by maintaining professional
              environments that reflect your company’s standards.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}