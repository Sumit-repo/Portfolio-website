# 07 — Architecture & Tech Stack

Written 2026-07-18.

---

## Framework Choice: Next.js 15 (App Router)

**Why Next.js over Vite+React:**
- Static generation (SSG) ships optimized HTML + zero-JS fallback — critical for SEO and LCP
- `next/font` eliminates CLS from font loading (Google Fonts served locally)
- `next/image` handles WebP/AVIF conversion, lazy loading, blur placeholders automatically
- Vercel deployment is zero-config — push to GitHub → live in 60 seconds
- App Router's `layout.tsx` keeps global providers and metadata in one place

**Rendering strategy:** `output: 'export'` (static HTML) — no server at runtime. Portfolio has no dynamic server-side data needs. Deployed as static files on Vercel's CDN edge.

---

## Directory Structure

```
sumit-portfolio-v2/
├── public/
│   ├── resume.pdf                  ← Sumit's resume (provided manually)
│   ├── noise.svg                   ← hero noise texture
│   ├── favicon.ico
│   ├── og-image.png                ← 1200×630 Open Graph image
│   └── assets/
│       ├── photo.jpg               ← profile photo (optional)
│       └── projects/
│           ├── wellitica.webp
│           ├── dictaglide.webp
│           ├── otm-copilot.webp
│           ├── art-gallery.webp
│           └── bhagats.webp
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← Root layout: fonts, metadata, providers
│   │   ├── page.tsx                ← Single page: assembles all sections
│   │   └── globals.css             ← CSS custom properties, base resets, utility classes
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Preloader.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   └── ScrollProgress.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Stack.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── BentoCard.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── TechBadge.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── GradientText.tsx
│   │       ├── MagneticButton.tsx
│   │       └── StatCard.tsx
│   │
│   ├── data/
│   │   ├── config.ts               ← name, email, socials, openToWork flag
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── stack.ts
│   │
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   ├── useScrollProgress.ts
│   │   └── useIsomorphicLayoutEffect.ts
│   │
│   └── lib/
│       ├── motion.ts               ← Framer Motion variants + transitions
│       └── gsap.ts                 ← GSAP + plugin registration
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Tech Stack

### Core
| Package | Version | Role |
|---|---|---|
| `next` | 15.x | Framework (App Router + SSG) |
| `react` | 19.x | UI layer |
| `typescript` | 5.x | Type safety |

### Styling
| Package | Version | Role |
|---|---|---|
| `tailwindcss` | 4.x | Utility-first CSS |
| `@tailwindcss/postcss` | 4.x | PostCSS integration |

Tailwind v4 uses CSS-first config (`globals.css` `@theme` block) — no `tailwind.config.ts` needed for tokens (tokens go in CSS variables).

### Animation
| Package | Version | Role |
|---|---|---|
| `framer-motion` | 11.x | React-level animations, gestures, layout |
| `gsap` | 3.x | Timeline sequences, scroll triggers, marquee |

**GSAP SSR pattern:** All `gsap.*` calls inside `useIsomorphicLayoutEffect` (= `useLayoutEffect` on client, `useEffect` on server). Cleanup with `return () => ctx.revert()`.

**Framer Motion bundle size:** Use `LazyMotion` + `domAnimation` feature set to avoid importing the full 40KB bundle:
```tsx
// app/layout.tsx
import { LazyMotion, domAnimation } from 'framer-motion';
<LazyMotion features={domAnimation}>{children}</LazyMotion>
```

### Icons & Fonts
| Package | Role |
|---|---|
| `lucide-react` | Icons (tree-shaken per import) |
| `next/font/google` | Syne, Plus Jakarta Sans, JetBrains Mono — zero CLS |

### Utilities
| Package | Role |
|---|---|
| `clsx` | Conditional className merging |
| `tailwind-merge` | Resolves Tailwind class conflicts |

---

## next.config.ts

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',              // Static HTML export
  images: {
    unoptimized: true,           // Required for static export (no image server)
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",   // Next.js requires
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "font-src 'self'",
            "connect-src 'self'",
          ].join('; '),
        },
      ],
    },
  ],
};

export default nextConfig;
```

> Note: `output: 'export'` means `headers()` applies only when served via a server (e.g., Vercel's serverless wrapper). For pure static hosts, security headers must be set at CDN/hosting level.

---

## Font Loading (app/layout.tsx)

```typescript
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});
```

Applied via: `className={`${syne.variable} ${jakarta.variable} ${mono.variable}`}` on `<html>`.

---

## Deployment: Vercel

1. Push `sumit-portfolio-v2/` to a GitHub repo
2. Import project in Vercel dashboard (root directory: `sumit-portfolio-v2`)
3. Framework preset: Next.js (auto-detected)
4. Build command: `next build` (Vercel auto-sets)
5. Output: `out/` directory (static export)
6. Custom domain: configure in Vercel settings after deploy

**No environment variables needed for v1** (no API keys, no external services).

---

## SEO & Meta

### Static metadata (layout.tsx)
```typescript
export const metadata: Metadata = {
  title: 'Sumit — Full-Stack Engineer & SRE',
  description: 'Portfolio of Sumit, a full-stack engineer building TypeScript products, AI tools, and enterprise systems.',
  openGraph: {
    title: 'Sumit — Full-Stack Engineer & SRE',
    description: 'Building products that ship, scale, and feel good to use.',
    url: 'https://sumit.dev',         // update with actual domain
    siteName: 'Sumit Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumit — Full-Stack Engineer & SRE',
    description: 'Building products that ship, scale, and feel good to use.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};
```

### `robots.txt` (public/robots.txt)
```
User-agent: *
Allow: /
Sitemap: https://sumit.dev/sitemap.xml
```

### `sitemap.xml` (public/sitemap.xml)
Single URL — the homepage. Static file, no dynamic generation needed.
