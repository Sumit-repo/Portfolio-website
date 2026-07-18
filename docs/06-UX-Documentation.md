# 06 — UX Documentation

Written 2026-07-18. Animation specs, motion language, accessibility, and interaction patterns.

---

## Motion Philosophy

Animations in this portfolio serve three roles:
1. **Guide attention** — direct the visitor's eye to what matters next
2. **Signal quality** — smooth, physics-based motion implies careful engineering
3. **Communicate personality** — the portfolio should feel alive, not static

Rule: if removing an animation makes the content clearer or faster to parse, remove the animation.

---

## Dual-Library Motion Strategy

### GSAP + ScrollTrigger → Macro sequences
Used for: complex timelines, scroll-pinning, horizontal panels, text splits, count-up.
Why GSAP: imperative timeline control, best-in-class ScrollTrigger, native RAF loop.

### Framer Motion → React component interactions
Used for: mount/unmount, hover states, layout animations, `AnimatePresence`, cursor.
Why Framer: declarative JSX syntax, `AnimatePresence` for React lifecycle, `useSpring` for physics.

Never mix both libraries on the same element — pick one per animation unit.

---

## Shared Motion Tokens (`src/lib/motion.ts`)

```typescript
// Framer Motion transitions
export const spring = { type: 'spring', stiffness: 300, damping: 25 } as const;
export const softSpring = { type: 'spring', stiffness: 150, damping: 20 } as const;
export const fastFade = { duration: 0.15, ease: 'easeOut' } as const;
export const standardFade = { duration: 0.3, ease: 'easeOut' } as const;
export const slowFade = { duration: 0.5, ease: 'easeInOut' } as const;

// Framer Motion variants
export const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: standardFade },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: standardFade },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.01, transition: spring },
};
```

---

## GSAP Configuration (`src/lib/gsap.ts`)

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

// Register plugins once at app init
gsap.registerPlugin(ScrollTrigger, Observer);

// Respect prefers-reduced-motion globally
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Standardized ease tokens
export const gsapEases = {
  smooth: 'power2.out',
  snappy: 'power3.out',
  bounce: 'back.out(1.2)',
  linear: 'none',
} as const;
```

---

## Animation Inventory

### Preloader
| Step | Duration | Library | Technique |
|---|---|---|---|
| "S" fade in + scale | 0.4s | GSAP | `gsap.from`, power2.out |
| Hold | 0.3s | — | delay |
| Sweep up exit | 0.5s | GSAP | clipPath inset |
| React unmount | — | Framer `AnimatePresence` | opacity 0 |

### Navbar
| State | Duration | Library | Technique |
|---|---|---|---|
| Glass BG on scroll | 0.3s | CSS transition | background + backdrop-filter |
| Mobile menu open | 0.35s | Framer | `x: '100%' → 0`, spring |
| Mobile link stagger | 60ms each | Framer | `staggerChildren` |

### Hero
| Element | Duration | Library | Technique |
|---|---|---|---|
| Name chars | 0.6s, stagger 0.04s | GSAP | `gsap.from`, y: 60, power3.out |
| Greeting line | 0.4s delay 0.2s | GSAP | opacity |
| Role ticker swap | 0.25s each way | Framer | `AnimatePresence`, y: ±20, opacity |
| Tagline | 0.4s delay 1s | GSAP | opacity + y: 20 |
| CTA buttons | 0.3s delay 1.2s | GSAP | scale from 0.9, opacity |
| Scroll indicator | infinite | Framer | `animate: { y: [0, 8, 0] }`, repeat |
| Gradient blobs | 30s loop | CSS `@keyframes` | translate drift |

### About
| Element | Duration | Library | Technique |
|---|---|---|---|
| Section reveal | 0.5s | Framer `useInView` | fadeUp variant |
| Stat count-up | 1.5s | GSAP | textContent tween, snap integers |
| Photo desaturate | 0.4s | CSS transition | filter grayscale |

### Projects
| Element | Duration | Library | Technique |
|---|---|---|---|
| Horizontal panel | scrub: 1 | GSAP ScrollTrigger | pin + x translate |
| Card hover lift | spring | Framer | `whileHover: cardHover.hover` |
| Gradient border | 0.3s | CSS transition | pseudo-element opacity |
| Overlay reveal | 0.25s | Framer `AnimatePresence` | opacity + backdropBlur |

### Stack
| Element | Duration | Library | Technique |
|---|---|---|---|
| Marquee | 30s loop, infinite | GSAP ticker | x: '-50%', repeat: -1 |
| Marquee hover slow | 0.5s | GSAP | timeScale tween |
| Tab switch | 0.2s | Framer | `AnimatePresence`, opacity |
| Grid item enter | 0.3s, stagger | Framer | `staggerContainer + fadeUp` |

### Experience
| Element | Duration | Library | Technique |
|---|---|---|---|
| Timeline line draw | scroll-scrubbed | GSAP ScrollTrigger | scaleY 0→1, transformOrigin top |
| Card slide in | 0.4s | Framer `useInView` | x: -30, opacity |
| Card expand | 0.3s | Framer | height auto, AnimatePresence |
| Chevron rotate | 0.2s | CSS transition | rotate 180deg |

### Contact
| Element | Duration | Library | Technique |
|---|---|---|---|
| Section reveal | 0.5s | Framer `useInView` | fadeUp |
| Copy button flip | instant + 2s timeout | React state | icon swap |
| Social link hover | 0.15s | CSS transition | translateY(-2px) |

---

## Custom Cursor Spec

Only active on `pointer: fine` devices (mouse). Hidden on touch.

```
Outer ring:   40×40px, border 1.5px solid rgba(139,92,246,0.6), border-radius 50%
              Framer useSpring: stiffness 100, damping 20, mass 0.5
Inner dot:    8×8px, background #8B5CF6, border-radius 50%
              Follows cursor instantly (no spring)
```

State transitions:
| State | Outer ring | Inner dot |
|---|---|---|
| Default | 40px, 1.5px border | 8px visible |
| Hover link | scale 1.5 (60px), border thicker | opacity 0 |
| Hover project card | scale 2 (80px), mix-blend-mode: difference | opacity 0 |
| Click | brief scale 0.8 spring release | brief scale 1.3 |

Implementation: two `motion.div` elements absolutely positioned, `pointer-events: none`, `z-index: 200`.

---

## Accessibility

### WCAG AA Compliance (minimum)

| Text type | Contrast ratio | Color pair |
|---|---|---|
| Body text on dark bg | 7.2:1 | `#A3A3A3` on `#080808` |
| Heading text | 15:1 | `#F2F2F2` on `#080808` |
| Accent on dark | 4.6:1 | `#8B5CF6` on `#080808` |
| Tech chip text | 4.8:1 | `rgba(139,92,246,0.9)` on `#111111` |

### Focus States
- All interactive elements have visible `:focus-visible` styles: `outline: 2px solid var(--accent-violet); outline-offset: 3px`
- Do not remove `outline` without a visible alternative

### Keyboard Navigation
- Tab order: Navbar links → main content → footer
- All project card links keyboard-accessible
- Mobile nav traps focus while open; escape closes it
- Copy button confirms action via `aria-live="polite"` region (screen reader feedback)

### Semantic HTML
- `<header>` for navbar, `<main>` for page content, `<footer>` for footer
- Each section uses `<section>` with `aria-labelledby` pointing to the section heading `id`
- Project links use descriptive `aria-label`: `aria-label="View DictaGlide live demo"`
- Role ticker uses `aria-live="polite"` region

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
GSAP: wrap all `gsap.to/from` in `if (!prefersReducedMotion())` — fallback shows elements in final state immediately.  
Framer Motion: `useReducedMotion()` → pass `{ duration: 0 }` to all transitions.

---

## UX Anti-Patterns (Do Not Introduce)

- Animations that block content access (no gated reveals that require scrolling to unlock)
- Cursor animations that lag visibly (spring must feel responsive, not floaty)
- Hover-only information (all project info accessible on keyboard/touch too)
- Autoplaying audio or video
- Infinite scroll (this is a portfolio, not a feed)
- More than 3 gradient accent appearances per viewport — restrain the violet/pink gradient
- Font size below 14px for readable content (micro labels: 11px max, uppercase, clearly secondary)
