"use client";

import { useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

/**
 * Layered hero backdrop: moving aurora blobs, a grid that is only visible
 * inside a cursor-following mask, and a smoothed spotlight gradient.
 * Mouse-reactive layers activate on fine pointers only.
 */
export default function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    const root = rootRef.current;
    const spot = spotRef.current;
    const grid = gridRef.current;
    if (!root || !spot || !grid) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    gsap.set(spot, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight * 0.35 });

    const spotX = gsap.quickTo(spot, "x", { duration: 0.7, ease: "power3" });
    const spotY = gsap.quickTo(spot, "y", { duration: 0.7, ease: "power3" });

    // The grid mask lags slightly less than the spotlight so the two layers
    // feel like independent materials rather than one stamped image.
    const maskPos = { x: window.innerWidth / 2, y: window.innerHeight * 0.35 };
    const applyMask = () => {
      grid.style.setProperty("--mx", `${maskPos.x}px`);
      grid.style.setProperty("--my", `${maskPos.y}px`);
    };
    const maskX = gsap.quickTo(maskPos, "x", { duration: 0.35, ease: "power2", onUpdate: applyMask });
    const maskY = gsap.quickTo(maskPos, "y", { duration: 0.35, ease: "power2", onUpdate: applyMask });

    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotX(x);
      spotY(y);
      maskX(x);
      maskY(y);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="aurora-container">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
        <div className="aurora-blob aurora-4" />
      </div>
      <div ref={gridRef} className="hero-grid" />
      <div ref={spotRef} className="hero-spotlight" />
    </div>
  );
}
