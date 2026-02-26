"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { CheckCircle, Briefcase, ShieldCheck } from "lucide-react";

const slides = [
  {
    image: "/images/hero/hero-cleaning.webp",
    title:
      "Professional Residential & Commercial Cleaning Services in Arizona",
    subtitle:
      "Reliable, detail-oriented cleaning solutions tailored for homes, offices, and growing businesses.",
  },
  {
    image: "/images/hero/hero-office.webp",
    title: "Expert Office Cleaning for a Productive Workspace",
    subtitle:
      "Keep your business environment spotless and inviting with our reliable services.",
  },
  {
    image: "/images/hero/hero-home.webp",
    title: "Spotless Homes for Happy Families",
    subtitle:
      "Custom cleaning plans to keep your home sparkling clean, every time.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // 🔥 Mejor tipado
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 🎬 Animación
  useLayoutEffect(() => {
    const activeSlide = slideRefs.current[current];
    if (!activeSlide) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        activeSlide,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
      );

      const elements = activeSlide.querySelectorAll(".hero-animate");

      if (elements.length > 0) {
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            delay: 0.4,
            ease: "power3.out",
          }
        );
      }
    }, activeSlide);

    return () => ctx.revert();
  }, [current]);

  // ⏱ Auto Slide
  useLayoutEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => {
            slideRefs.current[index] = el;
          }}
          className={`absolute inset-0 transition-opacity duration-1000 will-change-transform ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
            <h1 className="hero-animate text-4xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              {slide.title}
            </h1>

            <p className="hero-animate text-lg lg:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              {slide.subtitle}
            </p>

            <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="btn-primary">
                Get a Free Estimate
              </button>
              <button className="btn-secondary">
                Call Now
              </button>
            </div>

            <ul className="hero-animate flex flex-col sm:flex-row justify-center gap-6 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Satisfaction Guaranteed</span>
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <span>We Bring Our Own Equipment</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Licensed & Insured</span>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}