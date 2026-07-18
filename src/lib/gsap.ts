"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";

/* Register plugins once — called in client components via useIsomorphicLayoutEffect */
export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger, Observer, SplitText);
}

export { gsap, ScrollTrigger, Observer, SplitText };

export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/* Standard GSAP ease tokens */
export const ease = {
  smooth: "power2.out",
  snappy: "power3.out",
  bounce: "back.out(1.2)",
  linear: "none",
  inOut: "power2.inOut",
} as const;
