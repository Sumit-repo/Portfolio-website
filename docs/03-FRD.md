# 03 — Functional Requirements Document (FRD)

Written 2026-07-18. Section-by-section interaction and behaviour specs.

---

## Global

### Smooth Scroll
- `scroll-behavior: smooth` in `globals.css`
- Navbar anchor links use `document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Offset: `–80px` to account for sticky navbar height

### Scroll Progress Indicator
- Fixed thin bar at top of viewport (`position: fixed; top: 0; z-index: 200`)
- Width driven by `useScrollProgress` hook: `scrollY / (documentHeight - viewportHeight) * 100`
- Background: `linear-gradient(to right, var(--accent-violet), var(--accent-pink))`
- Does not interfere with navbar or other fixed elements

### Custom Cursor (Desktop Only)
- Hidden on `pointer: coarse` devices (touch)
- Two elements: outer ring (40px, border, slow lag) + inner dot (8px, instant follow)
- `useMousePosition` hook tracks `mousemove` with `requestAnimationFrame`
- Framer Motion `useSpring` with `stiffness: 100, damping: 20` for ring lag
- States:
  - Default: ring normal, dot normal
  - Hover link/button: ring scales to 60px, dot disappears
  - Hover project card: ring scales to 80px, opacity 0.6, `mix-blend-mode: difference`
  - Clicking: ring briefly scale-down (0.8) spring release

### `prefers-reduced-motion`
- GSAP: wrap all animations in `if (!prefersReducedMotion) { ... }` check using `window.matchMedia('(prefers-reduced-motion: reduce)')`
- Framer Motion: use `useReducedMotion()` hook; replace animated variants with instant opacity-only
- CSS: `@media (prefers-reduced-motion: reduce)` removes `transition` from global utilities

---

## Preloader

**Trigger:** Fires on first mount. Hidden after 1.2s or when fonts are loaded (whichever is later, max 1.5s).

**Sequence (GSAP):**
1. Full-screen overlay `#080808`, centered "S" in Syne font, 0 opacity
2. `gsap.to` "S" → opacity 1, scale 1 (from 0.8), duration 0.4s
3. Hold 0.3s
4. `gsap.to` overlay → `clipPath: 'inset(0 0 100% 0)'` → sweeps upward, duration 0.5s, ease `power2.inOut`
5. Overlay `display: none` after exit

**Framer Motion `AnimatePresence`:** wraps the overlay for React unmount cleanup.

**Skip:** If `sessionStorage.getItem('preloader-seen')` is set, skip immediately. Set it after first show.

---

## Navbar

**Default state:** `background: transparent`, `border-bottom: none`

**Scrolled state** (triggered at `scrollY > 60`):
- `background: rgba(8, 8, 8, 0.8)`
- `backdrop-filter: blur(16px)`
- `border-bottom: 1px solid rgba(255,255,255,0.06)`
- Transition: CSS `transition: all 0.3s ease`

**Links:** `['About', 'Projects', 'Stack', 'Experience', 'Contact']` — each scrolls to `#section-id`

**Active state:** Link matching current section in viewport gets `color: var(--accent-violet)` underline. Tracked via `IntersectionObserver` on each section.

**Resume button:** Opens `public/resume.pdf` in new tab. `download` attribute for PDF download.

**Mobile (`< 768px`):**
- Hamburger icon (Lucide `Menu` / `X` toggle)
- Full-screen slide-in overlay: `position: fixed; inset: 0; z-index: 500`
- Framer Motion `AnimatePresence` → `x: '100%'` → `x: 0` with spring
- Links stagger in from right with 60ms delay each
- Closes on link click or outside click

---

## Hero

**Layout:** Full viewport (`100dvh`), flex column centered.

**Animation sequence (GSAP, fires after preloader exits):**

1. Split name into individual `<span>` elements per character (manual, no plugin)
2. `gsap.from` chars: `{ y: 60, opacity: 0, stagger: 0.04, duration: 0.6, ease: 'power3.out' }`
3. Greeting line fades in (opacity 0 → 1, duration 0.4s, delay 0.2s)
4. Role ticker starts cycling after 0.8s
5. Tagline fades + translates up (duration 0.4s, delay 1s)
6. CTA buttons scale in (from 0.9, duration 0.3s, delay 1.2s)
7. Scroll indicator bounces in (Framer Motion `animate: { y: [0, 8, 0] }`, infinite loop)

**Role ticker:**
- Array of 3 roles: `['Full-Stack Engineer', 'SRE L3', 'Side-Project Builder']`
- Every 2.8s: current role fades out (Framer `exit: { y: -20, opacity: 0 }`) → next fades in (`initial: { y: 20, opacity: 0 }`)
- `AnimatePresence mode="wait"` wraps the role text

**Background:**
- Noise texture overlay: SVG `feTurbulence` filter or CSS `background-image: url('/noise.svg')`, opacity 0.03
- Two gradient blobs: `position: absolute`, `border-radius: 50%`, violet and pink, `filter: blur(80px)`, opacity 0.12, slow CSS `@keyframes` drift (30s loop)
- Blobs never obstruct text (z-index below content)

**Magnetic CTA buttons:**
- On `mousemove` within button bounding box: translate button slightly toward cursor (max ±12px)
- On `mouseleave`: spring back to origin (Framer Motion `whileHover` + `onMouseMove` handler)

---

## About

**Layout:** 2-column grid on desktop (55/45 split), stacked on mobile.

**Left column (text):**
- 3 paragraphs of bio
- Scroll-triggered fade+translateY reveal (Framer `useInView`, threshold 0.3)

**Right column (mini bento):**
- 2×2 grid of stat cards
- Each card: large number + label (e.g., "2+ Years / Experience")
- Numbers animate count-up via GSAP when section enters viewport:
  `gsap.from(el, { textContent: 0, duration: 1.5, snap: { textContent: 1 }, ease: 'power2.out' })`
- Photo card (if photo provided): grayscale CSS filter, hover removes filter (transition 0.4s)

---

## Projects

**Layout:** GSAP ScrollTrigger horizontal scroll panel.

**Desktop behaviour:**
- Section is pinned (`pin: true`) while scroll advances horizontally
- Cards translate left: `gsap.to(container, { x: -(totalWidth - viewportWidth), ease: 'none', scrollTrigger: { trigger: section, pin: true, scrub: 1 } })`
- Horizontal scrollbar hidden (`overflow: hidden` on outer container)
- Total horizontal distance = sum of card widths + gaps

**Mobile fallback (`< 768px`):**
- GSAP horizontal scroll disabled
- Cards render as vertical grid (2-col on tablet, 1-col on phone)
- Standard scroll behaviour

**Project cards:**
- Base state: card bg `#111111`, subtle border `rgba(255,255,255,0.06)`, project name + tech chips + short desc
- Hover state:
  - Border transitions to gradient (violet→pink) via CSS `border-image` or pseudo-element technique
  - Card lifts: `transform: translateY(-6px)`, `box-shadow` glow
  - Overlay fades in (opacity 0 → 1, `backdrop-filter: blur(2px)`) showing full description + CTA buttons

**Featured card (Wellitica):**
- Larger card (spans 2 rows in bento or is first + widest in horizontal scroll)
- "Featured" badge: gradient pill in top-right corner
- Gradient border always visible (not just on hover) — subtle, 1px

**Tech chips:**
- Small pill badges with tech name
- Truncated to 3 visible + "+N" overflow pill if more than 3 stack items

**CTA buttons on hover overlay:**
- [Live ↗] → `liveUrl` (opens new tab) — shown only if `liveUrl` is set
- [Code ↗] → `githubUrl` (opens new tab) — shown only if `githubUrl` is set
- [Details] → future case study page; disabled for v1 with tooltip "Coming soon"

---

## Stack

**Marquee:**
- Container: `overflow: hidden`, single row of tech icons
- Inner track: width `200%`, `display: flex`
- Two copies of icon list side by side (seamless loop)
- GSAP `ticker`: `gsap.to(track, { x: '-50%', duration: 30, ease: 'none', repeat: -1 })`
- On hover: `gsap.to` duration extends to slow down (pause-like feel)
- On leave: resumes normal speed

**Category grid (below marquee):**
- 5 tabs: Frontend / Backend / Mobile / Tools / Cloud
- Tab click → filters grid (Framer Motion `AnimatePresence` for item exit/enter)
- Each item: SVG icon (32×32) + name label, arranged in 4-col grid
- Icons: inline SVG or `next/image` for external SVGs

---

## Experience

**Layout:** Vertical timeline. Left: thin line + dot. Right: content card.

**Card behaviour:**
- Default: shows company, role, period, type badge, first bullet only
- Expand: click card → Framer Motion `AnimatePresence` reveals remaining bullets
- Expand icon: Lucide `ChevronDown` rotates 180° on expand

**Scroll reveal:** Each card fades + translates from left (`x: -30`) using Framer `useInView`.

**Timeline line animation:** GSAP `ScrollTrigger` draws the vertical line from top as user scrolls (`scaleY: 0 → 1`, `transformOrigin: 'top'`).

---

## Contact

**Layout:** Centered card, max-width 640px.

**Email display:**
- `1020sumit@gmail.com` shown in monospace font
- [Copy] button: Lucide `Copy` icon → `navigator.clipboard.writeText(email)`
- On copy success: button flips to Lucide `Check` for 2s then reverts
- No server-side form — mailto href as fallback

**Social links:**
- GitHub, LinkedIn, Twitter/X
- Each: SVG icon link, opens new tab, hover lifts + gradient tint

**Open to work badge (optional):**
- Pulsing green dot + "Open to opportunities" pill above headline
- Can be toggled via `src/data/config.ts: openToWork: boolean`

---

## Footer

**Content:** "Designed & built by Sumit · 2025" | Scroll-to-top button (Lucide `ArrowUp`)

**Scroll-to-top:** Appears when `scrollY > 500`. Framer `AnimatePresence` fade+scale. Clicks → `window.scrollTo({ top: 0, behavior: 'smooth' })`.
