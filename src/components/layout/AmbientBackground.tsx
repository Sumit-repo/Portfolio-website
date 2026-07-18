"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

/* Fixed positions/sizes (not Math.random) so SSR and hydration agree */
const DOTS = [
  { left: "8%", top: "18%", size: 2, delay: 0.0, dur: 6.5 },
  { left: "21%", top: "64%", size: 1.5, delay: 1.2, dur: 8.0 },
  { left: "33%", top: "32%", size: 2.5, delay: 2.4, dur: 7.2 },
  { left: "44%", top: "78%", size: 1.5, delay: 0.6, dur: 9.0 },
  { left: "52%", top: "12%", size: 2, delay: 3.1, dur: 6.8 },
  { left: "61%", top: "48%", size: 1.5, delay: 1.8, dur: 8.6 },
  { left: "70%", top: "82%", size: 2, delay: 0.3, dur: 7.6 },
  { left: "78%", top: "26%", size: 2.5, delay: 2.0, dur: 6.2 },
  { left: "86%", top: "58%", size: 1.5, delay: 1.5, dur: 9.4 },
  { left: "93%", top: "38%", size: 2, delay: 0.9, dur: 7.0 },
  { left: "15%", top: "88%", size: 2, delay: 2.7, dur: 8.2 },
  { left: "67%", top: "8%", size: 1.5, delay: 3.5, dur: 7.8 },
];

/**
 * Site-wide ambient layer behind everything (z-index -1): two gradient orbs
 * wander on slow GSAP loops, dust particles drift and twinkle, and Framer
 * Motion adds a slight scroll parallax so the backdrop answers scrolling too.
 */
export default function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 4000], [0, -160]);

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".ambient-orb-1", {
        x: 90,
        y: -70,
        scale: 1.15,
        duration: 26,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".ambient-orb-2", {
        x: -110,
        y: 80,
        scale: 0.9,
        duration: 21,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.utils.toArray<HTMLElement>(".ambient-dot").forEach((dot, i) => {
        const d = DOTS[i % DOTS.length];
        gsap.to(dot, {
          y: -28,
          x: i % 2 === 0 ? 14 : -14,
          duration: d.dur,
          delay: d.delay,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to(dot, {
          opacity: 0.45,
          duration: d.dur / 2.4,
          delay: d.delay,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div ref={rootRef} className="ambient-layer" style={{ y: parallaxY }} aria-hidden>
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="ambient-dot"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            opacity: 0.12,
          }}
        />
      ))}
    </motion.div>
  );
}
