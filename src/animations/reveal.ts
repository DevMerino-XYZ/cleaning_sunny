import { gsap, ScrollTrigger } from "@/lib/gsap";

export const reveal = (element: string | Element) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });
};