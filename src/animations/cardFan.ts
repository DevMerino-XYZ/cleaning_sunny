import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type CardFanOptions = {
  trigger: HTMLElement | null;
  cardSelector: string;
  spread?: number;
  radius?: number;
};

export function cardFanAnimation({
  trigger,
  cardSelector,
  spread = 60,
  radius = 260,
}: CardFanOptions) {
  if (!trigger) return;

  const cards = gsap.utils.toArray<HTMLElement>(cardSelector);

  // Estado inicial
  gsap.set(cards, {
    xPercent: -50,
    yPercent: -50,
    left: "50%",
    top: "50%",
    position: "absolute",
    scale: 0.9,
    transformPerspective: 1000,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 75%",
      once: true,
    },
  });

  cards.forEach((card, i) => {
    const angle = (i - cards.length / 2) * spread;

    tl.to(
      card,
      {
        rotation: angle * 0.15,
        x: Math.sin(angle * (Math.PI / 180)) * radius,
        y: -Math.abs(Math.cos(angle * (Math.PI / 180)) * radius),
        scale: 1,
        duration: 1,
        ease: "power3.out",
      },
      0
    );

    // 🎯 HOVER INTERACTION
    const rotateX = gsap.quickTo(card, "rotateX", {
      duration: 0.4,
      ease: "power3.out",
    });

    const rotateY = gsap.quickTo(card, "rotateY", {
      duration: 0.4,
      ease: "power3.out",
    });

    card.addEventListener("mousemove", (e) => {
      const bounds = card.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const percentX = (e.clientX - centerX) / (bounds.width / 2);
      const percentY = (e.clientY - centerY) / (bounds.height / 2);

      rotateY(percentX * 10);
      rotateX(-percentY * 10);
    });

    card.addEventListener("mouseleave", () => {
      rotateX(0);
      rotateY(0);
    });
  });

  return tl;
}