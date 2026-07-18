# 13 — Design System

Written 2026-07-18. Single source of truth for the portfolio's visual language.
All tokens live in `src/app/globals.css`. Components use semantic CSS variables — never raw hex or hardcoded Tailwind palette colors directly in JSX.

---

## Direction

**"Precision in Motion"** — a dark premium interface that moves like a product, not a demo reel.

References: Linear (fast, intentional), Vercel (dark, typographic), Superhuman (premium, detail-obsessed).

The portfolio is dark-first because:
- Dark mode allows the violet→pink gradient accent to pop without washing out
- Most developer tooling the visitor uses is dark (GitHub, VS Code, Vercel dashboard) — the portfolio feels native in that context
- Dark backgrounds hide image edge artifacts better for project screenshots

---

## Color Tokens

Defined in `src/app/globals.css` as CSS custom properties:

```css
:root {
  /* ── Surfaces ──────────────────────────────── */
  --bg:              #080808;   /* Page background */
  --surface:         #111111;   /* Card / component backgrounds */
  --surface-hover:   #161616;   /* Card hover elevated state */
  --surface-border:  rgba(255, 255, 255, 0.06);   /* Subtle borders */
  --surface-border-hover: rgba(255, 255, 255, 0.12);

  /* ── Accent (Violet → Pink) ────────────────── */
  --accent-violet:   #8B5CF6;   /* Violet-500 */
  --accent-pink:     #EC4899;   /* Pink-500 */
  --accent-gradient: linear-gradient(135deg, #8B5CF6, #EC4899);

  /* Gradient text utility */
  --accent-gradient-text: linear-gradient(90deg, #8B5CF6, #EC4899);

  /* ── Text ──────────────────────────────────── */
  --text-primary:    #F2F2F2;   /* Headings, important labels */
  --text-secondary:  #A3A3A3;   /* Body text, descriptions */
  --text-tertiary:   #6B6B6B;   /* Timestamps, minor labels */
  --text-muted:      #3D3D3D;   /* Placeholder / disabled */

  /* ── Status ────────────────────────────────── */
  --success:         #10B981;   /* Emerald-500: copy success, active */
  --error:           #EF4444;   /* Red-500 */
  --warning:         #F59E0B;   /* Amber-500 */

  /* ── Shadow / Glow ─────────────────────────── */
  --glow-violet:     0 0 30px rgba(139, 92, 246, 0.25);
  --glow-pink:       0 0 30px rgba(236, 72, 153, 0.25);
  --glow-card:       0 8px 32px rgba(0, 0, 0, 0.4);
  --glow-card-hover: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(139, 92, 246, 0.2);

  /* ── Glassmorphism (Navbar scrolled) ────────── */
  --glass-bg:        rgba(8, 8, 8, 0.8);
  --glass-border:    rgba(255, 255, 255, 0.06);
  --glass-blur:      blur(16px);
}
```

### Color Usage Rules

- Use `--bg` only for `body` and full-screen overlays (preloader, mobile nav)
- Use `--surface` for all cards, sections with visual grouping
- Use `--accent-gradient` sparingly: max 3 gradient instances per viewport (CTA button, gradient text, card border on featured card)
- Never use raw hex colors in component JSX — always reference via `var(--token-name)` or the Tailwind class that maps to it
- Text on `--surface` must meet 4.5:1 contrast (verified: `--text-secondary` #A3A3A3 on #111111 = 5.2:1 ✓)

---

## Typography

### Font Stack

```css
:root {
  --font-display: var(--font-syne), system-ui, sans-serif;
  --font-body:    var(--font-jakarta), system-ui, sans-serif;
  --font-mono:    var(--font-mono-jb), 'Courier New', monospace;
}

body {
  font-family: var(--font-body);
  color: var(--text-secondary);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Syne** — headings, hero text, section titles. Geometric and editorial. Weights: 400–800.  
**Plus Jakarta Sans** — body text, descriptions, labels. Modern and readable. Weights: 400–700.  
**JetBrains Mono** — tech stack labels, code snippets, email display, copy-to-clipboard field.

### Type Scale

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `text-hero` | 80–120px (clamp) | 800 | 0.95 | Hero name |
| `text-display` | 48–64px (clamp) | 700 | 1.05 | Section headings |
| `text-title` | 28–36px | 600 | 1.2 | Card titles, subsection heads |
| `text-lead` | 20–22px | 400 | 1.5 | Hero tagline, intro paragraphs |
| `text-body` | 16–17px | 400 | 1.65 | Body text, descriptions |
| `text-small` | 14px | 400 | 1.5 | Tech chips, timestamps, meta |
| `text-micro` | 11–12px | 500 | 1 | Badges, keyboard shortcuts |

Hero name uses `clamp(64px, 10vw, 120px)` to scale gracefully from mobile to 4K.

```css
.font-display { font-family: var(--font-display); }
.font-mono    { font-family: var(--font-mono); }

.text-hero    { font-size: clamp(64px, 10vw, 120px); font-weight: 800; line-height: 0.95; letter-spacing: -0.02em; }
.text-display { font-size: clamp(40px, 5vw, 64px);  font-weight: 700; line-height: 1.05; letter-spacing: -0.01em; }
.text-title   { font-size: clamp(24px, 3vw, 36px);  font-weight: 600; line-height: 1.2; }
.text-lead    { font-size: clamp(18px, 2vw, 22px);  font-weight: 400; line-height: 1.5; color: var(--text-secondary); }
.text-body    { font-size: 16px;  font-weight: 400; line-height: 1.65; }
.text-small   { font-size: 14px;  font-weight: 400; line-height: 1.5; }
.text-micro   { font-size: 11px;  font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
```

### Gradient Text Utility

```css
.gradient-text {
  background: var(--accent-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Usage: wrap key words in hero tagline or section headings.

---

## Spacing System

Base unit: **4px**. All spacing values are multiples.

| Token | Value | Tailwind |
|---|---|---|
| `--space-1` | 4px | `p-1`, `m-1` |
| `--space-2` | 8px | `p-2`, `m-2` |
| `--space-3` | 12px | `p-3` |
| `--space-4` | 16px | `p-4` |
| `--space-6` | 24px | `p-6` |
| `--space-8` | 32px | `p-8` |
| `--space-12` | 48px | `p-12` |
| `--space-16` | 64px | `p-16` |
| `--space-24` | 96px | `py-24` (section padding) |

Section vertical padding: `py-24` (96px top + bottom) on desktop, `py-16` on mobile.  
Max content width: `max-w-6xl mx-auto px-6` (1152px + 24px side padding).

---

## Border Radius

| Element | Radius | Tailwind |
|---|---|---|
| Cards | 16px | `rounded-2xl` |
| Buttons | 8px | `rounded-lg` |
| Tech chips / badges | 9999px | `rounded-full` |
| Input / copybox | 8px | `rounded-lg` |
| Images | 12px | `rounded-xl` |
| Nav container | 12px | `rounded-xl` |
| Scroll-to-top button | 9999px | `rounded-full` |

---

## Shadow & Glow Scale

```css
/* Base card shadow */
.elevation-1 { box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
.elevation-2 { box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
.elevation-3 { box-shadow: var(--glow-card); }          /* 0 8px 32px rgba(0,0,0,0.4) */

/* Hover / active states */
.elevation-hover { box-shadow: var(--glow-card-hover); }

/* Gradient glow on featured card */
.glow-accent {
  box-shadow: 0 0 0 1px rgba(139,92,246,0.3),
              0 8px 32px rgba(139,92,246,0.15),
              0 16px 48px rgba(0,0,0,0.5);
}
```

---

## Component Patterns

### Button (Primary CTA)

```css
.btn-primary {
  background: var(--accent-gradient);
  color: white;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 15px;
  padding: 12px 28px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.btn-primary:hover { opacity: 0.9; }
.btn-primary:active { transform: scale(0.97); }
```

### Button (Secondary / Ghost)

```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 15px;
  padding: 11px 27px;
  border-radius: 8px;
  border: 1px solid var(--surface-border-hover);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.btn-secondary:hover {
  border-color: rgba(139,92,246,0.4);
  background: rgba(139,92,246,0.06);
}
```

### Card (Base)

```css
.card {
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  padding: 24px;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}
.card:hover {
  border-color: rgba(139,92,246,0.25);
  box-shadow: var(--glow-card-hover);
  transform: translateY(-4px);
}
```

### Tech Badge / Chip

```css
.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(139,92,246,0.1);
  color: rgba(139,92,246,0.9);
  border: 1px solid rgba(139,92,246,0.2);
  font-family: var(--font-mono);
}
```

### Glassmorphism Navbar

```css
.navbar-glass {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--glass-border);
}
```

### Gradient Border (Featured Card)

Gradient borders via pseudo-element (CSS `border-image` doesn't support `border-radius`):

```css
.gradient-border {
  position: relative;
}
.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: var(--accent-gradient);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

---

## Motion System

See doc 06 for full animation inventory. Tokens here for quick reference:

```css
/* CSS transition defaults */
:root {
  --transition-fast:     0.15s ease;
  --transition-standard: 0.25s ease;
  --transition-slow:     0.4s ease;
}
```

GSAP eases: `power2.out` (standard), `power3.out` (snappy), `none` (scrub/linear).  
Framer springs: `{ stiffness: 300, damping: 25 }` standard, `{ stiffness: 100, damping: 20 }` cursor.

---

## Anti-Patterns (Do Not Introduce)

- Raw hex values in component JSX — use `var(--token)` or Tailwind class
- White or light backgrounds — dark-only for v1
- Font weight 900 or `font-black` — max is 800 (hero name only)
- `border-image` for gradient borders (breaks `border-radius`) — use pseudo-element technique above
- Gradient accent on more than 3 instances per viewport — restraint is the point
- Animated backgrounds with high opacity (> 0.15) — blobs must be subtle
- Glassmorphism on anything except navbar and mobile menu overlay
- Text smaller than 11px
- `cursor: none` on the entire page without providing a `CustomCursor` replacement
- `overflow: hidden` on `body` except during preloader / mobile menu
- Multiple competing animations on the same element at the same time (one GSAP OR one Framer, not both)
- Emoji as icons — use Lucide React icons only
- Hardcoded z-index values — use the scale defined in doc 05
