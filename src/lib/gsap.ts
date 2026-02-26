"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar solo una vez en entorno cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export { gsap, ScrollTrigger };