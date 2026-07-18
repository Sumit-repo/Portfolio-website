"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap, registerGSAP, prefersReducedMotion, SplitText } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { fadeUp } from "@/lib/motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Masked word-by-word reveal, scrubbed in when the heading enters view.
  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    const el = titleRef.current;
    if (!el || prefersReducedMotion()) return;

    const split = new SplitText(el, { type: "words", mask: "words" });
    gsap.set(split.words, { yPercent: 115 });
    const tween = gsap.to(split.words, {
      yPercent: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [title]);

  return (
    <motion.div
      ref={ref}
      className={`section-heading ${align === "center" ? "text-center" : ""} ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {label && (
        <motion.p
          className="text-micro mb-3"
          style={{ color: "var(--accent-violet)" }}
          variants={fadeUp}
        >
          {label}
        </motion.p>
      )}
      <h2 ref={titleRef} className="text-display">
        {title}
      </h2>
      {subtitle && (
        <motion.p
          className={`text-lead mt-4 max-w-xl ${align === "center" ? "mx-auto" : ""}`}
          style={{ color: "var(--text-secondary)" }}
          variants={fadeUp}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
