import { gsap } from "@/lib/gsap";

export const fadeUp = (element: string | Element) => {
  return gsap.from(element, {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
};