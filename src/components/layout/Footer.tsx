"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { scaleIn } from "@/lib/motion";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer
      className="relative py-8 text-center"
      style={{ borderTop: "1px solid var(--surface-border)" }}
    >
      <p className="text-small" style={{ color: "var(--text-tertiary)" }}>
        Designed & built by{" "}
        <span className="gradient-text font-semibold">Sumit</span>
        {" · "}
        {new Date().getFullYear()}
      </p>

      <AnimatePresence>
        {showTop && (
          <motion.button
            className="fixed bottom-8 right-8 w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--surface-border-hover)",
              zIndex: "var(--z-float)",
              color: "var(--text-secondary)",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.1 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
