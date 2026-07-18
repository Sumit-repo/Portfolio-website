# 11 — Redesign Plan

Written 2026-07-18. Current state vs. target state analysis and migration strategy.

---

## Current State

### portfolio-sumit/ (CRA skeleton)

**Tech:** Create React App (React 18), plain CSS, Swiper.js, no TypeScript.

**Problems:**
- Not deployable — no real content, no build optimization
- CRA is officially deprecated by the React team
- No TypeScript — inconsistent with every other project in Sumit's stack
- Uses Swiper.js for carousel — heavy, unnecessary dependency
- CSS is split across `website.css` (likely from a template) + inline App.css
- Single component (`nav.js`) with hardcoded HTML in App.js
- Bundle has no code splitting, no image optimization, no OG tags

**Decision:** Keep for reference only. Do not delete (might have content snippets worth reusing). Do not iterate on it — it's a dead end.

### sumit's-premium-portfolio/ (Vite AI Studio template)

**Tech:** Vite 5, React 18, TypeScript, Tailwind CSS v4.

**Structure:** AI Studio-generated scaffold with components: `Hero.tsx`, `Navbar.tsx`, `Projects.tsx`, `Skills.tsx`, `Experience.tsx`, `Contact.tsx`, `Preloader.tsx`, `CustomCursor.tsx`, `Testimonials.tsx`.

**Problems:**
- AI Studio template — visual design is generic, not differentiated
- No data layer (content hardcoded inline in components)
- No planning docs — no content strategy, no design system
- Animations are likely basic (CSS transitions, no GSAP)
- No SEO metadata, no OG tags, no sitemap
- Not deployed — `metadata.json` suggests it was generated but never iterated

**What's salvageable:**
- The component naming convention (`Hero.tsx`, `Projects.tsx`, etc.) — good mental model, reused in new project
- The idea of `CustomCursor.tsx` and `Preloader.tsx` — both carry over as concepts
- The section structure (same 7 sections in new design)

**Decision:** Keep for reference. Do not delete. The new project (`sumit-portfolio-v2/`) is a fresh build, not a migration — no code is ported directly.

---

## Target State: `sumit-portfolio-v2/`

**Tech:** Next.js 15, TypeScript strict, Tailwind CSS v4, Framer Motion 11, GSAP 3.

**Key improvements over old attempts:**

| Dimension | Old (Vite template) | New |
|---|---|---|
| Framework | Vite + React | Next.js 15 (SSG) |
| SEO | None | Full OG, Twitter Card, JSON-LD |
| Data layer | Hardcoded in components | `src/data/*.ts` typed files |
| Animations | Basic CSS | GSAP sequences + Framer Motion |
| Design system | None | Full token system in `globals.css` |
| Planning | None | 13 documents |
| Deployment | Never deployed | Vercel (zero-config) |
| Performance | Unknown | Lighthouse ≥ 95 (target) |
| Accessibility | Unknown | WCAG AA (verified) |
| Mobile | Unknown | Mobile-first, tested at 375px |

---

## Migration Strategy

**Approach: Greenfield alongside, not migration.**

Reason: The old projects have zero reusable code worth porting. The value of the old projects is as content reference (what projects to feature, bio text ideas) — not code.

**Folder coexistence:**

```
portfolio-sumit/
├── src/                        ← old CRA skeleton (ignore)
├── public/                     ← old CRA public (ignore)
├── sumit's-premium-portfolio/  ← old Vite template (reference only)
└── sumit-portfolio-v2/         ← NEW — this is what gets built and deployed
    ├── docs/
    └── src/
```

The git repository at `portfolio-sumit/` will track both. `sumit-portfolio-v2/` is pushed as the root for Vercel (Vercel "Root Directory" set to `sumit-portfolio-v2`).

**Old folder deletion:** After `sumit-portfolio-v2` is live and verified for 2+ weeks, the old `src/` and `sumit's-premium-portfolio/` folders can be deleted and committed. Not done upfront to avoid accidental content loss.

---

## Content Extraction from Old Projects

The only value to extract from old files is textual content Sumit may have started:

- Check `sumit's-premium-portfolio/src/components/Hero.tsx` for any bio copy or taglines
- Check `sumit's-premium-portfolio/src/components/Projects.tsx` for project descriptions
- Check `sumit's-premium-portfolio/src/components/Experience.tsx` for role history

If content exists: copy text into `src/data/` files in the new project.  
If content is placeholder: skip.

---

## Design Differentiators vs. Vite Template

The Vite AI Studio template would have produced:
- Light or generic dark background
- Simple fade-in animations
- Static project cards in a grid
- Cookie-cutter layout indistinguishable from 1000 other portfolios

The new design produces:
- `#080808` dark base with violet→pink gradient accent system
- GSAP-powered hero text split + pinned horizontal scroll for projects
- Bento grid with Wellitica as a featured card
- Magnetic cursor with ring states
- Glassmorphism navbar on scroll
- Animated timeline for experience
- Infinite GSAP marquee for tech stack
- Full design system documented in doc 13
