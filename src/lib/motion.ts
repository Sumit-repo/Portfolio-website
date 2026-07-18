import type { Variants, Transition } from "framer-motion";

/* ─── Transitions ─────────────────────────────────────────────────────────── */
export const spring: Transition = { type: "spring", stiffness: 300, damping: 25 };
export const softSpring: Transition = { type: "spring", stiffness: 150, damping: 20 };
export const cursorSpring: Transition = { type: "spring", stiffness: 100, damping: 20, mass: 0.5 };
export const fastFade: Transition = { duration: 0.15, ease: "easeOut" };
export const stdFade: Transition = { duration: 0.3, ease: "easeOut" };
export const slowFade: Transition = { duration: 0.5, ease: "easeInOut" };

/* ─── Variants ────────────────────────────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: stdFade },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: stdFade },
};

export const fadeDown: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: stdFade },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.01, transition: spring },
};

export const overlayReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
};

export const slideInLeft: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: stdFade },
};

export const mobileMenuSlide: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { x: "100%", transition: { duration: 0.25, ease: "easeIn" } },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: spring },
  exit: { scale: 0.8, opacity: 0, transition: fastFade },
};

export const roleSwap: Variants = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};
