"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Users,
  PawPrint,
  Building2,
  BadgeCheck,
  Briefcase,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  title: string;
  desc: string;
  icon: React.ElementType;
};

const items: Item[] = [
  {
    title: "Licensed & Insured",
    desc: "We operate with full compliance and professional coverage, giving our clients complete peace of mind.",
    icon: ShieldCheck,
  },
  {
    title: "Structured & Reliable Team",
    desc: "Our staff follows organized cleaning protocols to ensure consistency, safety, and attention to detail.",
    icon: Users,
  },
  {
    title: "Pet-Friendly Service",
    desc: "We use safe practices and products suitable for homes with pets, ensuring a healthy environment for every member of your family.",
    icon: PawPrint,
  },
  {
    title: "Commercial-Grade Standards",
    desc: "We maintain professional cleaning standards suitable for offices, retail spaces, and growing businesses.",
    icon: Building2,
  },
  {
    title: "Satisfaction Guaranteed",
    desc: "If something is not right, we address it. Your satisfaction is our priority.",
    icon: BadgeCheck,
  },
  {
    title: "Professional Image & Discipline",
    desc: "Uniformed staff, punctual service, and clear communication define our operational structure.",
    icon: Briefcase,
  },
];

export default function WhyChooseUs() {

  return (
    <section
      ref={null}
      className="bg-bg py-24 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="why-title text-3xl lg:text-4xl font-heading font-bold text-text text-center mb-16 max-w-4xl mx-auto">
          Why Businesses and Homeowners Trust Sunny’s Cleaning Service LLC
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="why-card p-8 rounded-2xl 
                  bg-bg 
                  border border-text/10 
                  hover:border-secondary 
                  transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 mb-6 bg-secondary/10 rounded-xl flex items-center justify-center transition-colors duration-300">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>

                <h3 className="font-semibold text-lg text-text mb-3">
                  {item.title}
                </h3>

                <p className="text-text/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}