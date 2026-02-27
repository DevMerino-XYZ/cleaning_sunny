"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      tl.from(".about-image-main", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(".about-image-secondary", {
        y: 120,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6")
      .from(".about-text", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* Collage */}
        <div className="relative h-[500px]">

          <div className="about-image-main absolute w-[75%] h-[80%] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/team/team-cleaning.webp"
              alt="Cleaning team"
              fill
              className="object-cover"
              priority={false}
            />
          </div>

          <div className="about-image-secondary absolute bottom-0 right-0 w-[55%] h-[55%] rounded-2xl overflow-hidden border-1 border-white shadow-lg">
            <Image
              src="/images/team/team-office.webp"
              alt="Office cleaning"
              fill
              className="object-cover"
            />
          </div>

          <div className="about-image-secondary absolute top-10 right-10 w-[40%] h-[40%] rounded-2xl overflow-hidden border-1 border-white shadow-lg">
            <Image
              src="/images/team/team-home.webp"
              alt="Home cleaning"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="about-text">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text mb-6 leading-tight">
            A Cleaning Company Built on Trust, Discipline, and Excellence
          </h2>

          <p className="text-text/80 mb-4">
            Sunny’s Cleaning Service LLC is a professional cleaning company
            based in Arizona, committed to delivering high-quality residential
            and commercial cleaning services.
          </p>

          <p className="text-text/80">
            We combine strong family values with structured operational
            standards to ensure every client receives consistent, reliable, and
            detail-focused service.
          </p>

          <div className="mt-6 font-semibold text-secondary">
            Our goal is simple:
            <br />
            To create clean, organized, and safe environments where families and
            businesses can thrive.
          </div>
        </div>
      </div>
    </section>
  );
}