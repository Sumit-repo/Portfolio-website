"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroBackground from "@/components/sections/HeroBackground";
import { gsap, registerGSAP, prefersReducedMotion } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { config } from "@/data/config";
import { roleSwap } from "@/lib/motion";

interface HeroProps {
  animReady: boolean;
}

const NAME_LETTERS = config.name.toUpperCase().split("");

export default function Hero({ animReady }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Park the letters below their masks before first paint of the reveal.
  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    if (!nameRef.current) return;
    const letters = nameRef.current.querySelectorAll<HTMLElement>(".hero-letter");
    gsap.set(letters, { yPercent: 115 });
  }, []);

  // Reveal: the "S" lands instantly (the preloader S arrives on its exact
  // spot), the rest cascade up behind it.
  useEffect(() => {
    if (!animReady || !nameRef.current) return;
    const letters = nameRef.current.querySelectorAll<HTMLElement>(".hero-letter");
    if (prefersReducedMotion()) {
      gsap.set(letters, { yPercent: 0 });
      return;
    }
    const tl = gsap.timeline();
    tl.set(letters[0], { yPercent: 0 }).to(
      Array.from(letters).slice(1),
      { yPercent: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 },
      0.05
    );
    return () => {
      tl.kill();
    };
  }, [animReady]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % config.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Aurora + cursor grid + spotlight */}
      <HeroBackground />

      <div className="container relative z-10">
        {/* Top status bar */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-10 md:mb-14"
          initial={{ opacity: 0, y: -8 }}
          animate={animReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {config.openToWork && (
            <span
              className="inline-flex items-center gap-2 text-micro px-4 py-1.5 rounded-full leading-none"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)",
                color: "#10B981",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available
            </span>
          )}
          <span className="text-micro" style={{ color: "var(--text-muted)" }}>—</span>
          <span className="text-micro font-mono" style={{ color: "var(--text-muted)" }}>
            Full-Stack · SRE · Builder
          </span>
        </motion.div>

        {/* Main name — per-letter gradient reveal; first letter is the
            landing target for the preloader "S" */}
        <h1 ref={nameRef} className="hero-name mb-5" aria-label={config.name}>
          {NAME_LETTERS.map((letter, i) => (
            <span
              key={i}
              className="hero-letter-mask"
              data-hero-s={i === 0 ? "" : undefined}
              aria-hidden
            >
              <span
                className="hero-letter"
                style={{ animationDelay: `${-i * 0.9}s` }}
              >
                {letter}
              </span>
            </span>
          ))}
        </h1>

        {/* Horizontal divider */}
        <motion.div
          className="mb-8 md:mb-10"
          style={{ height: "1px", background: "var(--surface-border)" }}
          initial={{ scaleX: 0, originX: "0%" }}
          animate={animReady ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        />

        {/* Bottom row: left content + right meta */}
        <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
          {/* Left */}
          <div>
            {/* Role ticker */}
            <div
              className="flex items-center gap-2 mb-5"
              style={{ height: "clamp(30px, 4vw, 48px)" }}
              aria-live="polite"
            >
              <span
                className="font-mono text-small font-bold"
                style={{ color: "var(--text-muted)", userSelect: "none" }}
              >
                /
              </span>
              <AnimatePresence mode="wait">
                {/* Jakarta, not Syne: Syne's j/g/y are designed without real
                    descenders and read as clipped at this size */}
                <motion.span
                  key={roleIndex}
                  className="gradient-text font-semibold"
                  style={{
                    fontSize: "clamp(18px, 3vw, 32px)",
                    lineHeight: 1.25,
                    // Descenders must stay inside the background-clip paint
                    // area or the gradient text gets cut off
                    paddingBottom: "0.1em",
                    fontVariantNumeric: "lining-nums",
                  }}
                  variants={roleSwap}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {config.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Tagline */}
            <motion.p
              className="text-lead max-w-md mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={animReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              {config.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={animReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              <MagneticButton className="btn-primary" onClick={scrollToProjects}>
                View Work <ArrowDown size={15} />
              </MagneticButton>
              <MagneticButton
                className="btn-secondary"
                href={config.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume <Download size={15} />
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — editorial meta */}
          <motion.div
            className="hidden md:flex flex-col items-end gap-4 pb-1"
            initial={{ opacity: 0 }}
            animate={animReady ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col items-end gap-1">
              <p className="text-micro" style={{ color: "var(--text-muted)" }}>Location</p>
              <p className="text-small font-medium flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                <MapPin size={12} style={{ color: "var(--text-muted)" }} />
                India
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mouse scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={animReady ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.7 }}
        aria-hidden
      >
        <div
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: "var(--text-muted)" }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ background: "var(--text-muted)" }}
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
