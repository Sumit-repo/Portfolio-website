# 05 — Screen & Feature Matrix

Written 2026-07-18. Navigation architecture, section inventory, component tree, and responsive breakpoints.

---

## Architecture: Single Page, 7 Sections

No multi-page routing. The app is a single `page.tsx` with 7 section components rendered in order. The navbar provides anchor-based navigation (`href="#section-id"`) with smooth scroll.

```
/                    ← page.tsx (single route)
├── <Preloader />    (fixed overlay, unmounts after 1.2s)
├── <CustomCursor /> (fixed, desktop only)
├── <ScrollProgress /> (fixed top bar)
├── <Navbar />       (fixed top, z-50)
├── <Hero id="hero" />
├── <About id="about" />
├── <Projects id="projects" />
├── <Stack id="stack" />
├── <Experience id="experience" />
├── <Contact id="contact" />
└── <Footer />
```

---

## Navigation Map

| Nav Link | Anchor | Section Component |
|---|---|---|
| About | `#about` | `<About />` |
| Projects | `#projects` | `<Projects />` |
| Stack | `#stack` | `<Stack />` |
| Experience | `#experience` | `<Experience />` |
| Contact | `#contact` | `<Contact />` |
| Resume | `/resume.pdf` | Opens new tab / download |

---

## Section Feature Matrix

| Section | Desktop Layout | Mobile Layout | Animation Library | Key Interaction |
|---|---|---|---|---|
| Preloader | Full-screen overlay | Full-screen overlay | GSAP + Framer | Sweep-out exit |
| Navbar | Horizontal flex | Hamburger + fullscreen | Framer | Glassmorphism on scroll |
| Hero | Full viewport, centered | Full viewport, centered | GSAP (text) + Framer | Char stagger, role ticker |
| About | 2-col grid (55/45) | Single column | Framer useInView | Count-up stats, photo hover |
| Projects | GSAP horizontal scroll (pinned) | Vertical card grid | GSAP ScrollTrigger | Horizontal pin + card hover |
| Stack | Marquee + 5-tab category grid | Marquee + tab grid | GSAP ticker | Marquee speed on hover |
| Experience | Vertical timeline | Vertical timeline | Framer + GSAP line | Card expand/collapse |
| Contact | Centered card, max 640px | Centered card | Framer | Clipboard copy feedback |
| Footer | Single row | Stacked | Framer | Scroll-to-top button |

---

## Component Tree

```
src/
├── app/
│   ├── layout.tsx               ← html, body, font vars, metadata
│   └── page.tsx                 ← assembles all sections
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Preloader.tsx
│   │   ├── CustomCursor.tsx
│   │   └── ScrollProgress.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Stack.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   │
│   └── ui/
│       ├── BentoCard.tsx        ← generic bento grid card
│       ├── ProjectCard.tsx      ← project-specific card with hover overlay
│       ├── TechBadge.tsx        ← tech chip/pill
│       ├── SectionHeading.tsx   ← consistent section title + subtitle
│       ├── GradientText.tsx     ← span with gradient fill
│       ├── MagneticButton.tsx   ← button with magnetic mouse tracking
│       └── StatCard.tsx         ← about section stat bento card
│
├── data/
│   ├── projects.ts
│   ├── experience.ts
│   ├── stack.ts
│   └── config.ts               ← site-wide config (name, email, openToWork, etc.)
│
├── hooks/
│   ├── useMousePosition.ts
│   ├── useScrollProgress.ts
│   └── useIsomorphicLayoutEffect.ts   ← SSR-safe useLayoutEffect
│
└── lib/
    ├── motion.ts               ← Framer Motion shared variants
    └── gsap.ts                 ← GSAP + ScrollTrigger registration, prefersReducedMotion check
```

---

## Responsive Breakpoints

Tailwind's default breakpoints, used as follows:

| Breakpoint | Width | Key Changes |
|---|---|---|
| default (mobile) | 0px+ | Single column, hamburger nav, cursor disabled, projects vertical grid, 1-col stack grid |
| `sm` | 640px+ | 2-col stack grid, slightly larger hero text |
| `md` | 768px+ | 2-col about layout, 2-col projects grid, hamburger → full nav |
| `lg` | 1024px+ | GSAP horizontal projects scroll enabled, full bento layout |
| `xl` | 1280px+ | Max content widths apply, more whitespace |
| `2xl` | 1536px+ | Hero text scale increases for large monitors |

---

## Z-Index Scale

| Value | Layer |
|---|---|
| 0 | Normal content |
| 10 | Floating cards on hover |
| 20 | Scroll progress bar |
| 30 | Section overlays (project card hover) |
| 50 | Navbar |
| 100 | Preloader |
| 200 | Custom cursor |
| 500 | Mobile nav fullscreen overlay |

---

## Section Load Order & Performance

Sections are rendered in DOM order. Below-the-fold sections are lazy-initialized with Framer `useInView` — animations only register when the section enters the viewport. GSAP `ScrollTrigger` instances are created inside `useIsomorphicLayoutEffect` (client-only) and cleaned up on component unmount (`return () => ctx.revert()`).

No sections use dynamic `import()` (page is a single SPA — code splitting by route doesn't apply). The single JS bundle is kept under 150KB gzipped through:
- `LazyMotion` + `domAnimation` subset (Framer Motion)
- GSAP tree-shaking (only import `gsap`, `ScrollTrigger`, `Observer`)
- `lucide-react` individual icon imports (not `import * from 'lucide-react'`)
