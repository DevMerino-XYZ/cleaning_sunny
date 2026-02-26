"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarDays,
  CalendarRange,
  CalendarClock,
  Sparkles,
} from "lucide-react";

type Plan = {
  title: string;
  icon: React.ElementType;
  featured?: boolean;
};

const plans: Plan[] = [
  { title: "Weekly Cleaning", icon: CalendarDays },
  { title: "Bi-Weekly Cleaning", icon: CalendarRange, featured: true },
  { title: "Monthly Cleaning", icon: CalendarClock },
  { title: "One-Time Service", icon: Sparkles },
];

export default function ServicePlans() {
  const sectionRef = useRef<HTMLDivElement>(null);


  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-bg transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="plans-title text-3xl lg:text-4xl font-heading font-bold text-text mb-6">
          Flexible Cleaning Plans Designed for Your Schedule
        </h2>

        <p className="text-text/70 max-w-2xl mx-auto mb-20">
          Choose the frequency that fits your lifestyle. Reliable service,
          transparent scheduling, and consistent quality every time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {plans.map((plan, i) => {
            const Icon = plan.icon;

            return (
              <div
                key={i}
                className={`plan-card relative p-10 rounded-3xl transition-all duration-500 group
                ${
                  plan.featured
                    ? "bg-primary text-on-primary shadow-xl scale-105"
                    : "bg-bg text-text border border-text/10 hover:-translate-y-3 hover:shadow-xl"
                }`}
              >
                {plan.featured && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 
                    bg-secondary text-on-secondary text-xs font-semibold 
                    px-4 py-1 rounded-full shadow-md"
                  >
                    MOST POPULAR
                  </div>
                )}

                <div
                  className={`w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500
                  ${
                    plan.featured
                      ? "bg-white/20"
                      : "bg-primary/10 group-hover:bg-primary"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 transition-colors duration-300
                    ${
                      plan.featured
                        ? "text-on-primary"
                        : "text-primary group-hover:text-on-primary"
                    }`}
                  />
                </div>

                <h3 className="text-lg font-semibold tracking-wide">
                  {plan.title}
                </h3>

                <div
                  className={`w-10 h-[2px] mx-auto mt-4 transition-colors duration-300
                  ${
                    plan.featured
                      ? "bg-secondary"
                      : "bg-text/20 group-hover:bg-primary"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}