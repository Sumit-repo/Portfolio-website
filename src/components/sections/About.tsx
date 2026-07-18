"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap, registerGSAP, prefersReducedMotion, ease } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import SectionHeading from "@/components/ui/SectionHeading";
import { config } from "@/data/config";
import { fadeUp, staggerContainer, slideInLeft } from "@/lib/motion";

const stats = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "", label: "Products Shipped" },
  { value: 3, suffix: "", label: "AI Tools Built" },
  { value: 8, suffix: "+", label: "Core Technologies" },
];

function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
  }, []);

  useEffect(() => {
    if (!inView || !numRef.current) return;
    if (prefersReducedMotion()) {
      numRef.current.textContent = String(value);
      return;
    }
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 1.5,
      delay,
      ease: ease.smooth,
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = Math.round(obj.val).toString();
      },
    });
    return () => { tween.kill(); };
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="card p-6 flex flex-col gap-1"
      variants={fadeUp}
      whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.3)" }}
      transition={{ duration: 0.2 }}
    >
      <p className="font-display font-bold gradient-text" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
        <span ref={numRef}>0</span>
        {suffix}
      </p>
      <p className="text-small" style={{ color: "var(--text-tertiary)" }}>{label}</p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left: Text */}
          <div ref={ref}>
            <SectionHeading label="About Me" title="Big systems at work. My own products after." />

            <motion.div
              className="flex flex-col gap-5"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {config.bio.map((para, i) => (
                <motion.p key={i} className="text-body" variants={slideInLeft}>
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {config.openToWork && (
              <motion.div
                className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-small font-medium" style={{ color: "#10B981" }}>
                  Open to opportunities
                </span>
              </motion.div>
            )}
          </div>

          {/* Right: Stat bento */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.15} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
