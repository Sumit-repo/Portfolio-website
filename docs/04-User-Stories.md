# 04 — User Stories

Written 2026-07-18. Three primary personas, each with a distinct entry context and goal.

---

## Persona 1 — The Recruiter

**Name:** Priya / Alex  
**Role:** Technical recruiter at a product company (Indian startup or global remote)  
**Entry point:** LinkedIn profile → portfolio link, or shared URL from Sumit's application  
**Time budget:** 60–90 seconds  
**Device:** Laptop / desktop, stable WiFi  

### Goals
- Confirm Sumit's current role and seniority level
- See at least 2 relevant projects with recognizable tech stack
- Get the resume PDF without friction
- Understand how to reach Sumit (email or LinkedIn)

### Stories

**US-R01** — As a recruiter, I want to see Sumit's current role and tech stack within 5 seconds of landing on the page, so I can quickly decide if he matches the job requirements.
> AC: Hero section clearly states role + key technologies without needing to scroll.

**US-R02** — As a recruiter, I want to download the resume PDF in one click without navigating away, so I can forward it to the hiring manager.
> AC: "Download Resume" button visible in hero and navbar. Opens/downloads `resume.pdf`.

**US-R03** — As a recruiter, I want to see project names and a brief description without having to hover or click, so I can skim the portfolio quickly.
> AC: Project cards show title + 1-sentence description in default (non-hover) state.

**US-R04** — As a recruiter, I want to find contact information easily, so I can reach out without searching for a separate contact page.
> AC: Contact section reachable via nav link. Email visible and copyable. LinkedIn icon present.

**US-R05** — As a recruiter on mobile, I want the portfolio to work correctly on my phone, so I can review it while commuting.
> AC: No horizontal overflow, hamburger nav works, text is legible, buttons are tappable at 375px.

---

## Persona 2 — The Startup Founder / Freelance Client

**Name:** Rahul / Sarah  
**Role:** Founder of an early-stage startup evaluating whether to hire Sumit as a contractor or consultant  
**Entry point:** Twitter/X link, direct recommendation, or cold outreach follow-up  
**Time budget:** 3–5 minutes (more engaged)  
**Device:** Laptop, likely desktop  

### Goals
- See that Sumit has shipped real, working products — not just side projects that live in private repos
- Understand the breadth of his stack (they might need full-stack or OTM-specific expertise)
- Evaluate design sense (does his portfolio look like someone who cares about UX?)
- Know what he charges or at least how to start a conversation

### Stories

**US-F01** — As a founder, I want to click through to live projects from the portfolio, so I can see what Sumit actually shipped.
> AC: Every project card with a `liveUrl` shows a working [Live ↗] button opening in a new tab.

**US-F02** — As a founder, I want to see the tech stack for each project, so I can assess whether Sumit's experience matches our current stack.
> AC: Each project card displays tech chips (e.g., "Next.js · Groq · Supabase"). Stack section shows full breadth.

**US-F03** — As a founder, I want to understand Sumit's professional background beyond side projects, so I can gauge if he's worked at scale.
> AC: Experience section shows OTM SRE L3 role with company context and key responsibilities.

**US-F04** — As a founder, I want a quick way to start a conversation without filling out a long form, so low friction to reach out.
> AC: Contact section has a copy-to-clipboard email and direct social links. No form required.

**US-F05** — As a founder, I want the portfolio itself to signal design quality, so I trust Sumit to build something that looks good for our users.
> AC: Portfolio passes a visual quality bar — intentional color system, smooth animations, no visual glitches on desktop Chrome.

---

## Persona 3 — The Fellow Developer

**Name:** Arjun / Maya  
**Role:** Developer who found the portfolio via GitHub, a tweet, or a mutual's recommendation  
**Entry point:** GitHub profile link or direct URL  
**Time budget:** 2–3 minutes  
**Device:** Likely laptop, technical eye  

### Goals
- Check if the code quality matches the portfolio's visual quality
- See what specific technologies Sumit uses (they know the tools and can evaluate depth)
- Possibly connect for collaboration on a SaaS idea

### Stories

**US-D01** — As a developer, I want to see GitHub links for projects, so I can check the actual code and repo structure.
> AC: Project cards with a `githubUrl` show a [Code ↗] button linking to the public repo.

**US-D02** — As a developer, I want the animations to be smooth and not janky, so I can tell Sumit pays attention to performance.
> AC: All animations maintain 60fps. No layout thrash. GSAP/Framer Motion GPU-accelerated only.

**US-D03** — As a developer, I want to see the full technology breakdown (not just "React" — which version, what tools), so I can assess depth.
> AC: Stack section shows categorized list (Frontend / Backend / Mobile / Tools / Cloud) with specific named tools.

**US-D04** — As a developer, I want the portfolio to load fast, so I know Sumit cares about performance in his own work.
> AC: Lighthouse performance ≥ 95. LCP < 2.5s. No blocking render resources.

**US-D05** — As a developer, I want to find Sumit's GitHub profile link, so I can explore his other repos beyond what's featured.
> AC: GitHub icon link in Contact section and/or navbar. Opens in new tab.

---

## Acceptance Criteria Summary

| Story | Definition of Done |
|---|---|
| US-R01 | Hero visible on load, no scroll required for role + stack |
| US-R02 | Resume link in hero CTA + navbar; PDF downloads correctly |
| US-R03 | Project title + description visible without hover interaction |
| US-R04 | Contact section reachable via "Contact" nav link |
| US-R05 | No layout issues at 375px viewport width |
| US-F01 | Live links present and functional for projects with liveUrl |
| US-F02 | Tech chips on all project cards; Stack section populated |
| US-F03 | Experience section shows current role with company + bullets |
| US-F04 | Email visible, clipboard copy works, social links present |
| US-F05 | Portfolio achieves visual quality bar (subjective; run by 1 external reviewer) |
| US-D01 | GitHub links present for all open-source projects |
| US-D02 | 60fps maintained; DevTools performance tab shows no red frames |
| US-D03 | Stack section has 5 categories with ≥ 4 items each |
| US-D04 | Lighthouse performance ≥ 95 on Vercel production URL |
| US-D05 | GitHub profile link present in contact/nav area |
