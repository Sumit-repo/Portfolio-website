"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { gsap, registerGSAP, prefersReducedMotion, ease } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience, ExperienceEntry } from "@/data/experience";
import { slideInLeft } from "@/lib/motion";

const TYPE_LABELS: Record<string, string> = {
  "full-time": "Full-Time",
  freelance: "Freelance",
  contract: "Contract",
  internship: "Internship",
};

function ExperienceCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const hiddenBullets = entry.bullets.slice(1);

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 md:pl-12"
      variants={slideInLeft}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-1 w-3 h-3 rounded-full"
        style={{ background: "var(--accent-gradient)", border: "2px solid var(--bg)" }}
      />

      {/* Card */}
      <button
        className="card p-6 w-full text-left"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-title" style={{ fontSize: "17px" }}>{entry.role}</h3>
              <span
                className="text-micro px-3 py-1.5 rounded-full leading-none"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  color: "var(--accent-violet)",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                {TYPE_LABELS[entry.type]}
              </span>
            </div>
            <p className="text-small font-medium mb-1" style={{ color: "var(--accent-violet)" }}>
              {entry.company}
              {entry.location && (
                <span style={{ color: "var(--text-tertiary)" }}> · {entry.location}</span>
              )}
            </p>
            <p className="text-small font-mono" style={{ color: "var(--text-tertiary)" }}>
              {entry.period}
            </p>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: "var(--text-tertiary)", flexShrink: 0 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>

        {/* First bullet always visible */}
        <ul className="mt-4 space-y-2">
          <li className="text-body flex gap-2">
            <span style={{ color: "var(--accent-violet)", flexShrink: 0 }}>→</span>
            <span>{entry.bullets[0]}</span>
          </li>
        </ul>

        {/* Expandable bullets */}
        <AnimatePresence>
          {expanded && hiddenBullets.length > 0 && (
            <motion.ul
              className="mt-2 space-y-2 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {hiddenBullets.map((bullet, i) => (
                <li key={i} className="text-body flex gap-2">
                  <span style={{ color: "var(--accent-violet)", flexShrink: 0 }}>→</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    if (prefersReducedMotion() || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        ease: ease.smooth,
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading
          label="Career"
          title="Where I've worked."
          subtitle="The day-job side of the story."
        />

        <div className="relative max-w-2xl">
          {/* Vertical timeline line */}
          <div
            ref={lineRef}
            className="absolute left-[5.5px] top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, var(--accent-violet), var(--accent-pink))" }}
          />

          {/* Experience cards */}
          <div className="flex flex-col gap-8">
            {experience.map((entry, i) => (
              <ExperienceCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
