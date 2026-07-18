# 12 — User Action Items

Written 2026-07-18. Everything Sumit needs to do manually before the portfolio goes live.

---

## Blocking (Must Do Before Launch)

These items cannot be substituted or faked. Portfolio will have placeholder/broken content until these are done.

### Content

- [ ] **Hero bio copy** — Write 2–3 lines of first-person intro. Casual, confident, specific. Example format:
  > "I'm a full-stack engineer and SRE working on enterprise logistics systems by day and shipping AI-powered side projects by night. I build in TypeScript and Java, and I care equally about the experience and the reliability."
  
  Put this in `src/data/config.ts` as the `bio` field (add if not yet there), or directly in `About.tsx`.

- [ ] **Hero tagline** — One punchy line under the role ticker. Already has a default (`"I build products that ship, scale, and feel good to use."`) — review and adjust.

- [ ] **Experience entries** — Fill `src/data/experience.ts` with real role history:
  - Company name, role title, date range, 3–5 bullet points per role
  - At minimum: current OTM role + 1 previous entry
  - Keep bullets outcome-focused ("Reduced alert noise by 40%" beats "Worked on alerts")

- [ ] **Project summaries** — Update `src/data/projects.ts`:
  - `shortDesc`: 1 sentence, shown on card by default
  - `fullDesc`: 2–3 sentences, shown on hover overlay
  - `liveUrl`: paste if project is live
  - `githubUrl`: paste GitHub repo URL if public

- [ ] **Wellitica details** — This project is in the featured slot. It currently has no description, URL, or screenshot. At minimum:
  - Write `shortDesc` and `fullDesc`
  - Either provide a live URL or a GitHub URL
  - Provide a screenshot (or placeholder image)

- [ ] **Social handle URLs** — Update `src/data/config.ts`:
  - `socials.github`: your GitHub profile URL
  - `socials.linkedin`: your LinkedIn profile URL
  - `socials.twitter`: your X/Twitter URL (or remove the key if unused)

---

### Assets

- [ ] **Resume PDF** — Export your latest resume as PDF, name it `resume.pdf`, place at `public/resume.pdf`.

- [ ] **Project screenshots** — For each project, create a screenshot or mockup:
  - Preferred: actual app screenshot (use a nice OS light/dark state)
  - Acceptable: Figma mockup, or a gradient placeholder with project name text
  - Format: WebP (preferred) or PNG
  - Filename convention: `public/assets/projects/[project-id].webp`
  - Max size: 200KB each
  - Dimensions: 1200×750px (16:10 ratio) recommended

- [ ] **Tech stack icons** — Source SVG icons for all items in `src/data/stack.ts`:
  - Good sources: [Simple Icons](https://simpleicons.org/), [Devicons](https://devicon.dev/)
  - Place at: `public/assets/icons/[name].svg`
  - Size: 48×48px or viewBox scalable SVG
  - Color: monochrome white preferred (icon will be tinted by CSS)

---

### Configuration

- [ ] **Domain** — Decide on a domain name (options: `sumit.dev`, `sumitk.dev`, `iamsumit.dev`, etc.) and purchase via Namecheap, Porkbun, or similar. ~$10–15/year.

- [ ] **Vercel account** — Sign up at vercel.com if not already. Connect GitHub account. Import the `sumit-portfolio-v2` project with root directory set to `sumit-portfolio-v2/`.

- [ ] **Update config domain** — After domain is set, update `config.domain` in `src/data/config.ts` and `sitemap.xml`.

---

## Non-Blocking (Can Launch Without, Add Later)

- [ ] **Profile photo** — If you want the About section photo variant:
  - Provide a headshot: 800×800px minimum, 1:1 ratio
  - Place at `public/assets/photo.jpg` (or `.webp`)
  - The About component will use initials avatar fallback if absent

- [ ] **Open Graph image** — Create a 1200×630px branded image for social shares:
  - Dark background + your name + role text
  - Can be created in Figma, Canva, or any graphics tool
  - Place at `public/og-image.png`

- [ ] **"Open to work" flag** — Update `config.openToWork: false` if you're not actively looking.

- [ ] **Twitter/X card test** — After launch, use [Twitter Card Validator](https://cards-dev.twitter.com/validator) to preview how links look when shared.

- [ ] **LinkedIn "Featured" link** — Add portfolio URL to the Featured section of your LinkedIn profile.

- [ ] **GitHub README** — Add portfolio link to your GitHub profile README (`github.com/YOUR_HANDLE`).

---

## Content Quality Checklist (Review Before Launch)

- [ ] Hero section: role + stack is scannable in 5 seconds without scrolling
- [ ] About section: bio doesn't sound like a resume bullet list
- [ ] All 5 project cards have real descriptions (not "placeholder — fill")
- [ ] Wellitica featured card has a real image (not broken `<img>` or blank)
- [ ] Experience: at least 2 entries, bullets are outcome-focused
- [ ] Stack: all 5 categories have at least 4 items each
- [ ] Contact: email is correct, social links all open to the right profiles
- [ ] Resume PDF: opens correctly, is the latest version
- [ ] No "YOUR COMPANY", "YOUR_HANDLE", or placeholder text visible in production
