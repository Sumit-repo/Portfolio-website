# 10 — Roadmap & Release Plan

Written 2026-07-18.

---

## v1 Goal

A production-deployed portfolio on a custom domain, passing all quality gates in doc 09, within 7 working days of starting.

---

## Phase 0 — Foundation (Day 1)
**Status:** ✅ Complete (scaffold + docs + deps done)

- [x] Next.js 15 project scaffolded (`sumit-portfolio-v2`)
- [x] Dependencies installed (`framer-motion`, `gsap`, `lucide-react`)
- [x] All 13 planning documents written
- [ ] Design tokens configured (`globals.css` + Tailwind v4 theme)
- [ ] `src/data/config.ts` populated with Sumit's real info
- [ ] `src/lib/motion.ts` — Framer Motion variants
- [ ] `src/lib/gsap.ts` — GSAP plugin registration

---

## Phase 1 — Layout Shell (Day 2)

Core layout components that appear on every page:

- [ ] `app/layout.tsx` — fonts, metadata, `LazyMotion` provider
- [ ] `app/globals.css` — CSS custom properties, base reset, utility classes
- [ ] `<Navbar />` — transparent default, glassmorphism on scroll, mobile hamburger
- [ ] `<Footer />` — minimal, scroll-to-top button
- [ ] `<Preloader />` — initials sweep, `AnimatePresence` exit, sessionStorage skip
- [ ] `<CustomCursor />` — magnetic dot + ring, desktop-only
- [ ] `<ScrollProgress />` — gradient bar at viewport top

**Gate:** `npm run dev` shows a dark page with preloader → navbar → blank sections. No console errors.

---

## Phase 2 — Hero + About (Day 3)

- [ ] `<Hero />` — GSAP char stagger, role ticker, CTA buttons, gradient blobs
- [ ] `<MagneticButton />` — mouse-tracking offset on CTAs
- [ ] `<GradientText />` — violet-to-pink gradient span
- [ ] `<About />` — 2-col layout, bio paragraphs, stat cards with count-up
- [ ] `<StatCard />` — bento stat card with GSAP count-up
- [ ] `<SectionHeading />` — reusable section title + subtitle

**Gate:** Hero animation fires correctly on load. Role text cycles. About section reveals on scroll.

---

## Phase 3 — Projects (Day 4)

- [ ] `<Projects />` — GSAP horizontal scroll (desktop), vertical grid fallback (mobile)
- [ ] `<ProjectCard />` — hover overlay, gradient border, tech chips, CTA buttons
- [ ] `<BentoCard />` — generic wrapper used by Projects bento layout
- [ ] `<TechBadge />` — tech chip pill, overflow "+N" handling
- [ ] Populate `src/data/projects.ts` with real project data
- [ ] Add project WebP screenshots to `public/assets/projects/`

**Gate:** All 5 project cards render. Horizontal scroll works on desktop (pinned). Hover overlays show full description + buttons.

---

## Phase 4 — Stack + Experience (Day 5)

- [ ] `<Stack />` — GSAP marquee + 5-tab category grid with Framer filter
- [ ] `<Experience />` — GSAP timeline line draw + Framer card reveal + expand/collapse
- [ ] Populate `src/data/stack.ts` with tech items + SVG icons
- [ ] Populate `src/data/experience.ts` with real role history
- [ ] Source or create SVG icons for all stack items (`/public/assets/icons/`)

**Gate:** Marquee runs continuously, pauses on hover. Experience cards expand/collapse. Timeline line draws on scroll.

---

## Phase 5 — Contact + Polish (Day 6)

- [ ] `<Contact />` — email display, clipboard copy, social links, "open to work" badge
- [ ] Scroll-to-top button in footer
- [ ] OG image (`public/og-image.png`) — 1200×630, dark card design
- [ ] `public/robots.txt` and `public/sitemap.xml`
- [ ] JSON-LD structured data in `layout.tsx`
- [ ] Final `prefers-reduced-motion` pass — test all animations with setting enabled
- [ ] Final keyboard navigation pass — tab through all interactive elements
- [ ] Final 375px viewport pass — no overflow, no text clipping

**Gate:** `npm run build` exits 0. `npm run lint` passes. Lighthouse ≥ 95 on local build.

---

## Phase 6 — Deploy (Day 7)

- [ ] Create GitHub repo (`sumit-portfolio`) and push `sumit-portfolio-v2/` as root
- [ ] Import project in Vercel, set root directory
- [ ] Verify production build deploys correctly
- [ ] Run Lighthouse on Vercel preview URL — verify scores
- [ ] Configure custom domain (if available)
- [ ] Update `config.ts` `domain` field with live URL
- [ ] Update `sitemap.xml` with live URL
- [ ] Redeploy with correct domain

**Gate:** Live URL returns 200. Lighthouse scores pass. Share URL, confirm it works on mobile.

---

## v2 Candidate Features (Post-Launch)

| Feature | Priority | Notes |
|---|---|---|
| Blog / writing section | Medium | MDX files, listed on portfolio |
| Dark/light mode toggle | Low | Design dark-first, add light in v2 |
| Case study detail pages | Medium | `/projects/dictaglide` etc. |
| Contact form (server) | Low | Resend or Formspree API |
| Analytics | Low | Vercel Analytics (privacy-friendly) |
| Testimonials section | Low | Add when testimonials exist |
| Internationalization | Very low | English-only for target market |
| PWA / offline | Very low | No offline use case for portfolio |

---

## Content Dependency Timeline

These items block deployment and must come from Sumit:

| Item | Needed by | Status |
|---|---|---|
| Resume PDF | Phase 5 | Pending |
| Profile photo | Phase 2 | Optional (fallback exists) |
| Hero bio copy (final) | Phase 2 | Pending |
| Project summaries (real) | Phase 3 | Pending |
| Project screenshots (WebP) | Phase 3 | Pending |
| Live / GitHub URLs for projects | Phase 3 | Pending |
| Real experience entries | Phase 4 | Pending |
| Domain name decision | Phase 6 | Pending |
| Social handle URLs | Phase 0 | Pending |
