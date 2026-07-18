# 01 — Business Requirements Document (BRD)

Written 2026-07-18. Portfolio treated as a product, not a hobby page.

---

## Purpose

This portfolio is Sumit's primary professional presence on the internet. It is the single canonical URL a recruiter, founder, or collaborator lands on to decide whether Sumit is worth a conversation. It must communicate technical depth, shipping velocity, and design taste in under 60 seconds of browsing — without needing a LinkedIn sidebar or a PDF to do the work.

---

## Business Problem

Most developer portfolios fail in one of two ways:

- **The template trap:** Generic CRA/Vite starters with Lorem Ipsum placeholders, stock photos, and no real personality. Indistinguishable from a hundred others in the same job pool.
- **The demo reel trap:** Heavy 3D scenes, particle explosions, and infinite scroll effects that take 8 seconds to load and say nothing concrete about the person's ability to ship product.

Sumit's existing portfolio folders (a CRA skeleton and a Vite AI Studio template) both fall into category one. Neither is deployable, neither has real content, and neither represents what Sumit actually builds.

The gap: there's no URL Sumit can confidently share right now.

---

## Business Objectives

1. Ship a production-grade portfolio that can be shared in job applications, cold outreach, and GitHub profile within 7 days of starting.
2. Communicate three things clearly: enterprise-scale experience (OTM SRE L3), side-project shipping velocity (5 real products), full-stack depth (TypeScript + Java + mobile).
3. Differentiate through design quality — not claiming "I design," but demonstrating it through a portfolio that looks designed.
4. Establish a repeatable content structure so updating projects, experience, or skills takes minutes, not hours.
5. Score Lighthouse 95+ on performance — a fast portfolio is itself a signal of engineering quality.

---

## Stakeholders

- **Owner/builder:** Sumit (sole decision-maker, content author, developer)
- **Primary visitors:** Senior engineering recruiters, startup CTOs/founders, potential freelance clients
- **Secondary visitors:** Fellow developers (GitHub link, Twitter), potential collaborators on SaaS projects

---

## Target Audiences

### Recruiter (Global Remote / Indian Startup)
Comes from LinkedIn or a job application. Has 90 seconds. Wants: current role/stack, 2–3 impressive projects, resume PDF. Will bounce if the page loads slow or the stack isn't clearly visible.

### Startup Founder / Freelance Client
Evaluating whether Sumit can own a full feature or product independently. Wants: evidence of shipping, code quality signals (GitHub links), tech stack match with their needs. Cares less about job history, more about what got built.

### Fellow Developer / Technical Evaluator
Clicks "View Code" on projects. Wants: clean repo structure, real commits, thoughtful README. Will notice if animations are janky or if TypeScript errors exist in the visible repo.

---

## In Scope (v1)

- Single-page portfolio with 7 sections: Hero, About, Projects, Stack, Experience, Contact + Navbar
- 5 featured projects: Wellitica, DictaGlide, OTM AI Copilot, Art Gallery, Bhagats One Stop
- Preloader animation (initials → sweep out)
- Custom magnetic cursor
- Scroll progress indicator
- Resume PDF download
- Copy-to-clipboard email
- Responsive (mobile-first, tablet, desktop)
- Vercel deployment

---

## Out of Scope (v1)

- Blog / writing section
- CMS (Contentful, Sanity, Notion API)
- Light mode toggle (dark-only for v1)
- Case study detail pages (projects link to live/GitHub only)
- Contact form with server-side submission (mailto link only)
- Analytics dashboard (no tracking for v1 — privacy-first)
- Testimonials section (no confirmed testimonials yet)
- Internationalization

---

## Success Criteria

| Metric | Target |
|---|---|
| Page load (LCP) | < 2.5 seconds on 4G |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | ≥ 95 |
| Time-to-resume-download | < 30 seconds from landing |
| Mobile layout breakage | Zero critical issues at 375px |
| TypeScript build errors | Zero |
| Animation framerate | 60fps on mid-range laptop |

---

## Competitive Differentiation

| What most dev portfolios have | What this portfolio does instead |
|---|---|
| "Hi, I'm a developer" hero | Personality-driven copy with specific role + tagline |
| Static project screenshots grid | GSAP horizontal scroll bento with hover reveals |
| Generic skill badges | Animated marquee with proficiency context |
| Timeline as bullet list | Animated vertical timeline with expand-on-click |
| Light/white background | Dark premium (`#080808`) with violet-to-pink gradient accent |
| No animation or heavy WebGL | Dual-library motion (GSAP sequences + Framer Motion interactions) |
| Custom cursor as a gimmick | Magnetic cursor that serves as a UX signal, not distraction |
