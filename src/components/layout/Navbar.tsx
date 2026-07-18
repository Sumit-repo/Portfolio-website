"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { config } from "@/data/config";
import { mobileMenuSlide, staggerContainer, fadeIn } from "@/lib/motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const rafRef = useRef<number>(0);

  /* Glassmorphism on scroll */
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracking */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? {
                background: "var(--glass-bg)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid var(--glass-border)",
              }
            : undefined
        }
      >
        <nav className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl font-bold gradient-text py-2"
            aria-label="Scroll to top"
          >
            {config.name}
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-small font-medium transition-colors duration-150 relative"
                  style={{
                    color: activeSection === link.href.slice(1)
                      ? "var(--accent-violet)"
                      : "var(--text-secondary)",
                  }}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "var(--accent-gradient)" }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Resume CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={config.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-2 px-4"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-secondary"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{ color: "var(--text-secondary)" }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 flex flex-col justify-center items-center gap-8 md:hidden"
            style={{
              background: "var(--bg)",
              zIndex: "var(--z-mobile-nav)",
            }}
            variants={mobileMenuSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Mirrors the header row so the X stays exactly where the hamburger was */}
            <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-end container">
              <button
                className="p-2"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{ color: "var(--text-secondary)" }}
              >
                <X size={22} />
              </button>
            </div>

            <motion.ul
              className="flex flex-col items-center gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={fadeIn}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-display text-3xl font-semibold transition-colors duration-150"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href={config.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4"
              variants={fadeIn}
            >
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
