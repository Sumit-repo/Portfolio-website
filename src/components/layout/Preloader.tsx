"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const letterRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
  }, []);

  useEffect(() => {
    const seen = sessionStorage.getItem("preloader-seen");
    if (seen) {
      const t = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 0);
      return () => clearTimeout(t);
    }

    const finish = () => {
      sessionStorage.setItem("preloader-seen", "1");
      setVisible(false);
      onComplete();
    };

    if (prefersReducedMotion()) {
      const t = setTimeout(finish, 300);
      return () => clearTimeout(t);
    }

    const letter = letterRef.current;
    const bg = bgRef.current;
    if (!letter || !bg) return;

    /* Phase 2 is built lazily so the hero "S" position is measured after
       fonts and layout have settled, not at mount. */
    const handoff = () => {
      const target = document.querySelector<HTMLElement>("[data-hero-s] .hero-letter");
      if (!target) {
        finish();
        return;
      }

      // Hero letters are parked at yPercent 115 inside their masks — undo
      // that offset to get where the S will actually land.
      const tr = target.getBoundingClientRect();
      const finalTop = tr.top - 1.15 * tr.height;
      const sr = letter.getBoundingClientRect();
      const dx = tr.left + tr.width / 2 - (sr.left + sr.width / 2);
      const dy = finalTop + tr.height / 2 - (sr.top + sr.height / 2);
      const scale = tr.width / sr.width;

      const tl = gsap.timeline({
        onComplete: () => {
          // Reveal the real hero S before unmounting so there is no empty frame.
          gsap.set(target, { yPercent: 0 });
          finish();
        },
      });
      tl.to(letter, {
        x: dx,
        y: dy,
        scale,
        transformOrigin: "50% 50%",
        duration: 0.8,
        ease: "power3.inOut",
      }).to(
        bg,
        { clipPath: "inset(0 0 100% 0)", duration: 0.65, ease: "power2.inOut" },
        0.15
      );
    };

    const tl = gsap.timeline({ onComplete: handoff });
    tl.from(letter, {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    }).to(letter, { duration: 0.35 }); // hold

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: "var(--z-mobile-nav)" }}
      aria-hidden
    >
      {/* Background layer wipes away while the S keeps flying above it */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ background: "#080808", clipPath: "inset(0 0 0% 0)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          ref={letterRef}
          className="font-display hero-letter select-none"
          style={{ fontSize: "clamp(80px, 14vw, 150px)", fontWeight: 900 }}
        >
          S
        </span>
      </div>
    </div>
  );
}
