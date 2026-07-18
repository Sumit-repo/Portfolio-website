"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left"
      style={{
        scaleX: progress / 100,
        background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
        zIndex: "var(--z-modal)",
        transformOrigin: "left",
      }}
      initial={{ scaleX: 0 }}
    />
  );
}
