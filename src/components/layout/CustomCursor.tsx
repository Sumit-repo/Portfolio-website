"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { cursorSpring } from "@/lib/motion";

export type CursorState = "default" | "link" | "project";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const ringX = useSpring(x, cursorSpring);
  const ringY = useSpring(y, cursorSpring);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsPointerDevice(mq.matches);
    const raf = requestAnimationFrame(update);
    mq.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!isPointerDevice) return;

    const onEnterLink = () => setCursorState("link");
    const onEnterProject = () => setCursorState("project");
    const onLeave = () => setCursorState("default");

    const links = document.querySelectorAll("a, button, [data-cursor='link']");
    const projects = document.querySelectorAll("[data-cursor='project']");

    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeave);
    });
    projects.forEach((el) => {
      el.addEventListener("mouseenter", onEnterProject);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeave);
      });
      projects.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterProject);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [isPointerDevice]);

  if (!isPointerDevice) return null;

  const ringSize = cursorState === "project" ? 64 : cursorState === "link" ? 48 : 36;
  const showDot = cursorState === "default";

  return (
    <>
      {/* Outer ring — spring follow */}
      <motion.div
        className="fixed pointer-events-none rounded-full border border-violet-500/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: "var(--z-cursor)",
          mixBlendMode: cursorState === "project" ? "difference" : "normal",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: cursorState === "project" ? 0.7 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Inner dot — instant follow */}
      <motion.div
        className="fixed pointer-events-none rounded-full bg-violet-500"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: "var(--z-cursor)",
          width: 8,
          height: 8,
        }}
        animate={{ opacity: showDot ? 1 : 0, scale: showDot ? 1 : 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
}
