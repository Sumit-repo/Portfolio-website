# 02 — Product Requirements Document (PRD)

Written 2026-07-18.

---

## Product Vision

A single-page portfolio that functions like a polished product, not a resume PDF rendered in HTML. Every section has a clear job to do. Animations serve communication, not performance. Content is typed and maintainable — updating a project means editing one TypeScript file.

---

## Section Inventory

### 1. Preloader
**Job:** Buy 800ms to load fonts and register GSAP. Give a premium first impression.
**Content:** Sumit's initials "S" animates in, then sweeps off-screen to reveal the page.
**Exit:** `AnimatePresence` with scale-out, fade. Max 1.2s. Auto-skipped if page already cached.

### 2. Navbar
**Job:** Persistent navigation + quick access to resume + contact.
**Content:** Logo/initials left | Section links center | "Resume" CTA + contact icon right
**Behavior:** Transparent on load → glassmorphism background on scroll (backdrop-blur + border-bottom). Smooth scroll to anchors. Mobile: hamburger → full-screen slide-in menu.

### 3. Hero
**Job:** Land the who, what, and why in 5 seconds. Make the visitor curious.
**Content:**
- Greeting line: "Hey, I'm Sumit —"
- Name: Large display text (GSAP char stagger reveal)
- Role ticker: animated swap between 3 roles (Full-Stack Engineer / SRE L3 / Side-Project Builder)
- Tagline: 1-line subheading (e.g., "I build products that ship, scale, and feel good to use.")
- CTAs: [View Work ↓] [Download Resume]
- Background: subtle noise texture + animated gradient blob (violet/pink, opacity 0.15, slow drift)
- Scroll indicator: animated chevron pointing down

### 4. About
**Job:** Human connection + credibility. 30-second read.
**Content:**
- Left column: 2–3 paragraph bio (casual first-person, honest about current role + ambitions)
- Right column: Bento mini-grid with 4 stat cards:
  - Years of experience
  - Projects shipped
  - Tech stack depth (e.g., "8 core technologies")
  - Current role/company
- Profile photo: grayscale → color on hover (if photo available; fallback: initials avatar)

### 5. Projects
**Job:** Show shipping velocity and project diversity in one glance.
**Content:** 5 projects in bento grid layout:

| Card | Size | Project |
|---|---|---|
| Featured (hero) | 2×2 (large) | Wellitica |
| Large | 2×1 | DictaGlide / Verbx |
| Medium | 1×1 | OTM AI Copilot |
| Medium | 1×1 | Art Gallery |
| Medium | 1×1 | Bhagats One Stop |

Each card: project name, 1-sentence description, tech stack chips, [Live →] [Code →] buttons.
Hover state: gradient border glow, card lift, overlay with full description.
Section interaction: GSAP ScrollTrigger horizontal scroll (pinned section, cards scroll left-to-right).

### 6. Stack
**Job:** Quick scan of technical capabilities.
**Content:**
- Infinite horizontal marquee (GSAP ticker): all tech logos, continuously looping, pause on hover
- Below marquee: categorized grid (Frontend / Backend / Mobile / Tools / Cloud)
- Each category shows 4–6 items with SVG icon + name

### 7. Experience
**Job:** Show career trajectory without making the visitor read a resume.
**Content:** Vertical timeline (left line, right content cards):
- OTM SRE L3 / Functional Consultant (current)
- Previous roles / internships
- Each entry: company, role, period, 2–3 bullet points, type badge (Full-Time / Freelance / Project)
- Cards start collapsed (3 bullets hidden), expand on click

### 8. Contact
**Job:** Zero friction to reach out.
**Content:**
- Headline: "Let's build something."
- Subtext: 1-line invitation (e.g., "Open to roles, freelance projects, and interesting conversations.")
- Email display with [Copy Email] button (clipboard API)
- Social links: GitHub, LinkedIn, Twitter/X
- No form — mailto link on email avoids server complexity for v1

---

## Feature List

| Feature | Priority | Notes |
|---|---|---|
| Preloader with animation | Must | AnimatePresence exit |
| Sticky glassmorphism navbar | Must | Transition on scroll |
| GSAP hero text reveal | Must | Char stagger on load |
| Role text swap animation | Must | 3 roles cycling |
| Custom magnetic cursor | Must | Desktop only |
| Scroll progress bar | Should | Top of viewport, thin line |
| Projects bento grid | Must | 5 cards, GSAP horizontal scroll |
| Project card hover reveal | Must | Overlay with full desc |
| Tech stack marquee | Must | GSAP infinite loop |
| Experience timeline | Must | Expand/collapse |
| Copy-to-clipboard email | Must | Clipboard API |
| Resume PDF download | Must | `/public/resume.pdf` |
| Scroll-to-top button | Should | Appears after 500px scroll |
| Smooth anchor scroll | Must | CSS scroll-behavior + JS offset |
| `prefers-reduced-motion` | Must | All GSAP/Framer fallbacks |
| Open Graph meta tags | Must | For LinkedIn/Twitter share previews |
| `robots.txt` + `sitemap.xml` | Should | SEO basics |
| Dark/light toggle | Won't (v1) | v2 candidate |
| Blog section | Won't (v1) | v2 candidate |
| Contact form (server) | Won't (v1) | v2 with email API |

---

## Out of Scope (v1)

- CMS integration (all content in TypeScript files)
- Authentication
- Analytics (privacy-first; add Vercel Analytics in v2 if desired)
- Case study detail pages (projects link out only)
- Testimonials (no confirmed testimonials)
- Internationalization
- PWA/offline support

---

## Mobile Requirements

- Minimum supported width: 375px (iPhone SE)
- Hamburger nav on mobile (`<768px`)
- Custom cursor disabled on touch devices (pointer media query)
- GSAP horizontal scroll falls back to vertical scroll grid on mobile
- All font sizes legible at 375px with Tailwind responsive classes
- Touch targets minimum 44×44px (WCAG 2.5.5)

---

## Content Dependencies

All content lives in `src/data/`. Sumit provides:
- `projects.ts` — filled with real project data
- `experience.ts` — filled with real role history
- `stack.ts` — tech categories + items
- `public/resume.pdf` — exported PDF
- Hero copy (bio text, tagline)
- Profile photo (optional, `public/assets/photo.jpg`)
- Project screenshots (WebP, `public/assets/projects/`)
