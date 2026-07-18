"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { TechBadgeList } from "@/components/ui/TechBadge";
import { projects, Project } from "@/data/projects";

const CATEGORY_LABELS: Record<string, string> = {
  AI: "AI",
  Web: "Web",
  Desktop: "Desktop",
  Enterprise: "Enterprise",
  Mobile: "Mobile",
};

/* ── Fallback art while a real screenshot is missing ────────────────────── */
function FrameFallback({ project }: { project: Project }) {
  const accent = project.accentColor ?? "#8B5CF6";
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 70% 20%, ${accent}26 0%, transparent 60%), radial-gradient(ellipse at 20% 85%, ${accent}14 0%, transparent 55%), #0D0D0D`,
      }}
    >
      {/* Skeleton UI suggestion */}
      <div className="absolute inset-0 p-8 flex flex-col gap-3 opacity-60">
        <div className="h-3 w-1/3 rounded-full" style={{ background: `${accent}30` }} />
        <div className="h-3 w-2/3 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="h-3 w-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="flex gap-3 mt-4">
          <div className="h-20 flex-1 rounded-lg" style={{ background: `${accent}12`, border: `1px solid ${accent}20` }} />
          <div className="h-20 flex-1 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }} />
          <div className="h-20 flex-1 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }} />
        </div>
      </div>
      <span
        className="font-display select-none relative"
        style={{
          fontSize: "clamp(96px, 12vw, 180px)",
          fontWeight: 800,
          color: `${accent}2E`,
          lineHeight: 1,
        }}
      >
        {project.title.charAt(0)}
      </span>
    </div>
  );
}

/* ── Browser-framed visual with 3D tilt + parallax ──────────────────────── */
function ProjectVisual({ project, parallaxY }: { project: Project; parallaxY: MotionValue<number> }) {
  const accent = project.accentColor ?? "#8B5CF6";
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // The image can finish (or fail) before hydration attaches onLoad/onError —
  // reconcile from the DOM state once mounted.
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !img.complete) return;
    if (img.naturalWidth > 0) setImgLoaded(true);
    else setImgFailed(true);
  }, []);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 6);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div style={{ y: parallaxY, perspective: "1200px" }}>
      <motion.div
        ref={frameRef}
        className="rounded-xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          border: "1px solid var(--surface-border-hover)",
          background: "#0D0D0D",
          boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 48px ${accent}14`,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Chrome bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ background: "#141414", borderBottom: "1px solid var(--surface-border)" }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          <span
            className="ml-3 font-mono truncate px-3 py-0.5 rounded-md"
            style={{
              fontSize: "11px",
              color: "var(--text-tertiary)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            {project.liveUrl?.replace("https://", "").replace(/\/$/, "") ?? project.title}
          </span>
        </div>

        {/* Viewport — 16:10. Fallback art always sits underneath; the real
            screenshot fades in on top once it loads, so a missing or
            still-loading image never shows the browser's broken-image glyph. */}
        <div className="relative" style={{ aspectRatio: "16 / 10" }}>
          <FrameFallback project={project} />
          {!imgFailed && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgRef}
              src={project.image}
              alt={`${project.title} screenshot`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
              style={{ opacity: imgLoaded ? 1 : 0 }}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgFailed(true)}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── One full-width project row ─────────────────────────────────────────── */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: "-12% 0px" });
  const accent = project.accentColor ?? "#8B5CF6";
  const num = String(index + 1).padStart(2, "0");
  const flipped = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <div
      ref={rowRef}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
        flipped ? "lg:[direction:rtl]" : ""
      }`}
    >
      {/* Visual */}
      <motion.div
        style={{ direction: "ltr" }}
        initial={{ opacity: 0, y: 48 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <ProjectVisual project={project} parallaxY={parallaxY} />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ direction: "ltr" }}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="font-mono font-bold"
            style={{ fontSize: "13px", color: accent, letterSpacing: "0.12em" }}
          >
            {num}
          </span>
          <span className="h-px w-10" style={{ background: "var(--surface-border-hover)" }} />
          <span
            className="text-micro px-3 py-1.5 rounded-full leading-none"
            style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}
          >
            {CATEGORY_LABELS[project.category]}
          </span>
          {project.featured && (
            <span
              className="text-micro px-3 py-1.5 rounded-full leading-none"
              style={{
                background: "rgba(16,185,129,0.08)",
                color: "#10B981",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              Featured
            </span>
          )}
        </div>

        <h3
          className="font-display font-bold mb-4"
          style={{
            fontSize: "clamp(26px, 3.2vw, 38px)",
            lineHeight: 1.1,
            color: "var(--text-primary)",
          }}
        >
          {project.title}
        </h3>

        <p className="text-body mb-6" style={{ color: "var(--text-secondary)", maxWidth: "460px" }}>
          {project.fullDesc}
        </p>

        <div className="mb-8">
          <TechBadgeList stack={project.stack} max={5} />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {project.liveUrl && (
            <MagneticButton
              className="btn-primary"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Live <ArrowUpRight size={15} />
            </MagneticButton>
          )}
          {project.githubUrl && (
            <MagneticButton
              className="btn-secondary"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon width={15} height={15} /> Source
            </MagneticButton>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          label="Selected Work"
          title="Things I've shipped."
          subtitle="Five products, all deployed and live right now. The screenshots are from the real apps."
        />

        <div className="flex flex-col" style={{ gap: "var(--flow-2xl)" }}>
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
