# Sumit · Portfolio

Personal portfolio of Sumit Kumar, full-stack engineer and SRE. Enterprise logistics by day, my own products after hours.

**Live:** [sumit.vercel.app](https://sumit.vercel.app)

## What's on it

- Five shipped products with real screenshots: [Wellitica](https://www.wellitica.com/), [DictaGlide](https://dictaglide.vercel.app/), [OTM AI Copilot](https://otm-copilot.vercel.app/), [Artnessa](https://artnessa.vercel.app/), and [Bhagat's One Stop](https://bhagats.vercel.app/)
- Experience, background, and a Cal.com link if you want to talk

## How it's built

Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4, GSAP, and Framer Motion.

Some details worth a look if you're poking around the code:

- The preloader "S" flies into the S of SUMIT on load (measured FLIP transition, `Preloader.tsx`)
- Cursor-revealed grid and spotlight in the hero (`HeroBackground.tsx`)
- Project screenshots sit in tilting browser frames with scroll parallax (`Projects.tsx`)
- GSAP SplitText masked reveals on section headings, and an ambient layer that never stops moving (`AmbientBackground.tsx`)
- All content lives as typed data in `src/data/` — no CMS

Design and planning docs are in [`docs/`](docs/).
