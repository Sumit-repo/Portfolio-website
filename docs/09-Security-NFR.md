# 09 — Security & Non-Functional Requirements

Written 2026-07-18.

---

## Performance Targets

| Metric | Target | Measurement Tool |
|---|---|---|
| Lighthouse Performance | ≥ 95 | Lighthouse CI (Vercel) |
| Lighthouse Accessibility | 100 | Lighthouse CI |
| Lighthouse Best Practices | 100 | Lighthouse CI |
| Lighthouse SEO | ≥ 95 | Lighthouse CI |
| LCP (Largest Contentful Paint) | < 2.5s | CrUX / PageSpeed Insights |
| CLS (Cumulative Layout Shift) | < 0.1 | CrUX / PageSpeed Insights |
| INP (Interaction to Next Paint) | < 200ms | CrUX / PageSpeed Insights |
| FCP (First Contentful Paint) | < 1.5s | Lighthouse |
| Total JS (gzipped, initial) | < 150KB | `next build` output |
| Total CSS (gzipped) | < 30KB | `next build` output |
| Largest image | < 200KB (WebP) | Manual check |

---

## Animation Performance

- **Only animate `transform` and `opacity`** — these are GPU-composited and don't trigger layout or paint.
- Never animate: `width`, `height`, `top`, `left`, `margin`, `padding` (causes layout reflow).
- GSAP and Framer Motion both respect this by default; do not use CSS `transition` on layout properties.
- Use `will-change: transform` on elements that animate frequently (cursor rings, marquee track).
- Remove `will-change` after animation completes (`will-change: auto`).
- Target: **60fps** on a mid-range laptop (e.g., Intel i5, integrated GPU). Test in Chrome DevTools Performance tab.

---

## Bundle Size Strategy

| Library | Strategy | Expected size |
|---|---|---|
| `framer-motion` | `LazyMotion` + `domAnimation` subset | ~18KB gzipped |
| `gsap` | Tree-shaken imports (gsap, ScrollTrigger, Observer only) | ~30KB gzipped |
| `lucide-react` | Named imports per icon (not `import *`) | ~0.5KB per icon |
| `next/font` | Self-hosted Google Fonts, no external request | 0 extra JS |
| Total estimate | — | ~80–100KB gzipped |

Run `next build` and check the output for any chunk > 40KB — investigate before shipping.

---

## Security

### No Secrets
- Zero environment variables needed for v1 (no API keys, no backend)
- Never add `NEXT_PUBLIC_` prefixed keys to `.env` unless explicitly required
- `.env` file in `.gitignore` from day 1 (already included by `create-next-app`)

### HTTP Security Headers (set in `next.config.ts` + Vercel)
| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'` |

> `unsafe-eval` is required by Next.js runtime. `unsafe-inline` is required by Tailwind v4's CSS injection. Both are acceptable for a static marketing site with no user-generated content.

### No User Data Collection (v1)
- No contact form → no user input storage
- No analytics → no tracking
- No cookies → no cookie consent banner needed
- Clipboard API (`navigator.clipboard.writeText`) is permission-safe (no prompt for write)

### External Link Safety
- All external links use `target="_blank" rel="noopener noreferrer"` to prevent tab-napping

---

## Accessibility (NFR)

- **WCAG 2.1 AA** minimum across all interactive elements
- All images have descriptive `alt` text (project screenshots: `alt="DictaGlide app screenshot"`)
- `next/image` enforces `alt` as a required prop
- Focus visible on all interactive elements (not removed via `outline: none` without replacement)
- Keyboard navigation for: navbar, project card links, copy button, social links, scroll-to-top
- Mobile touch targets: minimum 44×44px CSS pixels
- Color not the only differentiator of information (tech chips use both color + name text)
- `prefers-reduced-motion` respected globally (see doc 06)
- `prefers-color-scheme`: dark-only for v1 — no media query override needed

---

## SEO Requirements

- `<title>` and `<meta name="description">` set in `layout.tsx`
- Open Graph tags: title, description, image (1200×630 PNG), url, type
- Twitter Card: `summary_large_image`
- Canonical URL in `<link rel="canonical">`
- `robots.txt`: allow all, include sitemap URL
- `sitemap.xml`: homepage URL only (single page)
- Structured data: `Person` JSON-LD schema in `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sumit",
  "url": "https://sumit.dev",
  "sameAs": [
    "https://github.com/YOUR_HANDLE",
    "https://linkedin.com/in/YOUR_HANDLE"
  ],
  "jobTitle": "Full-Stack Engineer"
}
```

---

## Reliability

- Static export (`output: 'export'`) → zero runtime server to fail
- Deployed on Vercel CDN → global edge, 99.99% uptime SLA
- No external API calls at runtime → no dependency on third-party uptime
- All fonts self-hosted via `next/font` → no Google Fonts CDN dependency at render time
- Fallback fonts in CSS stack: `--font-syne: Syne, system-ui, sans-serif`

---

## Build Quality Gates

Before any deployment, the following must pass:

1. `npm run build` exits with code 0 (zero TypeScript errors, zero Next.js build errors)
2. `npm run lint` passes (no ESLint errors)
3. Lighthouse score ≥ 95 Performance on Vercel preview URL
4. Manual check: 375px viewport (iPhone SE) — no horizontal overflow, no layout breakage
5. Manual check: tab through all interactive elements — all focusable, all visible focus ring
6. Manual check: open `about:blank`, navigate to portfolio — preloader fires, doesn't hang
