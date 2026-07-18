# 08 — API & Data Models

Written 2026-07-18. TypeScript interfaces and data schemas for all content. No external API — all data is typed static files in `src/data/`.

---

## Design Principle

Content lives in TypeScript, not a CMS or API. This means:
- Zero network requests for content at runtime
- Type-checked at build time — missing required field = compile error
- Updating a project means editing one file and pushing
- No vendor lock-in, no API key management

---

## `src/data/config.ts`

Site-wide settings and personal info. Single source of truth for anything reused across sections.

```typescript
export interface SiteConfig {
  name: string;
  role: string;              // displayed in hero ticker (first entry)
  roles: string[];           // all role ticker entries
  tagline: string;
  email: string;
  domain: string;
  openToWork: boolean;       // controls "Open to opportunities" badge in Contact
  resumeUrl: string;         // path to resume PDF in /public
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
}

export const config: SiteConfig = {
  name: 'Sumit',
  role: 'Full-Stack Engineer',
  roles: ['Full-Stack Engineer', 'SRE L3', 'Side-Project Builder'],
  tagline: 'I build products that ship, scale, and feel good to use.',
  email: '1020sumit@gmail.com',
  domain: 'https://sumit.dev',       // update after domain setup
  openToWork: true,
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/YOUR_HANDLE',
    linkedin: 'https://linkedin.com/in/YOUR_HANDLE',
    twitter: 'https://x.com/YOUR_HANDLE',
  },
};
```

---

## `src/data/projects.ts`

```typescript
export type ProjectCategory = 'AI' | 'Web' | 'Mobile' | 'Desktop' | 'Enterprise';

export interface Project {
  id: string;                        // slug, used as key
  title: string;
  shortDesc: string;                 // 1 sentence, shown on card default state
  fullDesc: string;                  // 2–3 sentences, shown on hover overlay
  stack: string[];                   // tech names, max 6 (truncated to 3 + "+N" on card)
  category: ProjectCategory;
  featured: boolean;                 // true = Wellitica card (gets hero treatment)
  liveUrl?: string;                  // optional — only shown if set
  githubUrl?: string;                // optional — only shown if set
  image: string;                     // path to /public/assets/projects/*.webp
  accentColor?: string;              // optional per-card gradient accent override (hex)
}

export const projects: Project[] = [
  {
    id: 'wellitica',
    title: 'Wellitica',
    shortDesc: 'AI-powered health and wellness platform.',
    fullDesc: 'Placeholder — fill with real description. Describe what problem it solves, who uses it, and what makes it technically interesting.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'AI'],
    category: 'AI',
    featured: true,
    liveUrl: undefined,
    githubUrl: undefined,
    image: '/assets/projects/wellitica.webp',
  },
  {
    id: 'dictaglide',
    title: 'DictaGlide',
    shortDesc: 'AI voice dictation desktop app — Wispr Flow alternative with BYOK privacy.',
    fullDesc: 'Electron + Groq Whisper desktop app for macOS/Windows/Linux. BYOK model: audio goes directly to user\'s Groq API, never through DictaGlide servers. 3 voice modes, global shortcuts, AI text cleanup.',
    stack: ['Electron', 'React', 'TypeScript', 'Groq', 'Supabase'],
    category: 'Desktop',
    featured: false,
    liveUrl: undefined,
    githubUrl: undefined,
    image: '/assets/projects/dictaglide.webp',
  },
  {
    id: 'otm-copilot',
    title: 'OTM AI Copilot',
    shortDesc: 'AI workbench for Oracle Transportation Management professionals.',
    fullDesc: 'Next.js 14 + Groq SDK + Supabase. Turns OTM domain expertise into AI-assisted SQL generation, schema lookup, XML debugger, and issue analysis — cutting hours of manual OTM work to seconds.',
    stack: ['Next.js', 'TypeScript', 'Groq', 'Supabase', 'Tailwind'],
    category: 'Enterprise',
    featured: false,
    liveUrl: undefined,
    githubUrl: undefined,
    image: '/assets/projects/otm-copilot.webp',
  },
  {
    id: 'art-gallery',
    title: 'Art Gallery',
    shortDesc: 'Immersive art gallery with GSAP-driven scroll animations.',
    fullDesc: 'Next.js 15 + React 19 + GSAP + Framer Motion. Showcases high-fidelity scroll storytelling with parallax panels, image reveal sequences, and smooth page transitions.',
    stack: ['Next.js', 'React 19', 'GSAP', 'Framer Motion', 'Tailwind'],
    category: 'Web',
    featured: false,
    liveUrl: undefined,
    githubUrl: undefined,
    image: '/assets/projects/art-gallery.webp',
  },
  {
    id: 'bhagats',
    title: "Bhagat's One Stop",
    shortDesc: 'Full-stack Next.js app with shadcn/ui and Supabase SSR auth.',
    fullDesc: 'Next.js 13 App Router + Radix UI + Supabase SSR. Demonstrates authentication flow, protected routes, and a polished component library on a real-world use case.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'shadcn/ui', 'Tailwind'],
    category: 'Web',
    featured: false,
    liveUrl: undefined,
    githubUrl: undefined,
    image: '/assets/projects/bhagats.webp',
  },
];
```

---

## `src/data/experience.ts`

```typescript
export type ExperienceType = 'full-time' | 'freelance' | 'contract' | 'internship';

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;          // e.g., "Jan 2024 – Present"
  type: ExperienceType;
  bullets: string[];       // 3–5 points; first shown by default, rest on expand
  location?: string;       // e.g., "Remote" or "Pune, India"
  companyUrl?: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: 'current',
    company: 'YOUR COMPANY',                // Sumit to fill
    role: 'SRE L3 / OTM Functional Consultant',
    period: 'YYYY – Present',
    type: 'full-time',
    location: 'India',
    companyUrl: undefined,
    bullets: [
      'Fill with real responsibilities',
      'Include scale/impact where possible',
      'Mention specific technologies used',
    ],
  },
  // Add additional entries...
];
```

---

## `src/data/stack.ts`

```typescript
export type StackCategory = 'Frontend' | 'Backend' | 'Mobile' | 'Tools' | 'Cloud';

export interface StackItem {
  name: string;
  icon: string;            // path to SVG in /public/assets/icons/ OR inline SVG component name
  proficiency: 'primary' | 'secondary';   // primary = core stack; secondary = familiar
}

export interface StackCategory_ {
  category: StackCategory;
  items: StackItem[];
}

export const stack: StackCategory_[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: '/assets/icons/react.svg', proficiency: 'primary' },
      { name: 'Next.js', icon: '/assets/icons/nextjs.svg', proficiency: 'primary' },
      { name: 'TypeScript', icon: '/assets/icons/typescript.svg', proficiency: 'primary' },
      { name: 'Tailwind CSS', icon: '/assets/icons/tailwind.svg', proficiency: 'primary' },
      { name: 'Framer Motion', icon: '/assets/icons/framer.svg', proficiency: 'secondary' },
      { name: 'GSAP', icon: '/assets/icons/gsap.svg', proficiency: 'secondary' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Java', icon: '/assets/icons/java.svg', proficiency: 'primary' },
      { name: 'Spring Boot', icon: '/assets/icons/spring.svg', proficiency: 'primary' },
      { name: 'Node.js', icon: '/assets/icons/nodejs.svg', proficiency: 'primary' },
      { name: 'Express', icon: '/assets/icons/express.svg', proficiency: 'secondary' },
      { name: 'Supabase', icon: '/assets/icons/supabase.svg', proficiency: 'primary' },
      { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg', proficiency: 'secondary' },
    ],
  },
  {
    category: 'Mobile',
    items: [
      { name: 'React Native', icon: '/assets/icons/react.svg', proficiency: 'primary' },
      { name: 'Expo', icon: '/assets/icons/expo.svg', proficiency: 'primary' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', icon: '/assets/icons/git.svg', proficiency: 'primary' },
      { name: 'n8n', icon: '/assets/icons/n8n.svg', proficiency: 'secondary' },
      { name: 'Ollama', icon: '/assets/icons/ollama.svg', proficiency: 'secondary' },
      { name: 'Electron', icon: '/assets/icons/electron.svg', proficiency: 'secondary' },
    ],
  },
  {
    category: 'Cloud',
    items: [
      { name: 'Vercel', icon: '/assets/icons/vercel.svg', proficiency: 'primary' },
      { name: 'OTM', icon: '/assets/icons/oracle.svg', proficiency: 'primary' },
    ],
  },
];
```

---

## About Section Stats

Defined inline in `About.tsx` (simple enough to not need a data file):

```typescript
const stats = [
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 5, suffix: '', label: 'Products Shipped' },
  { value: 8, suffix: '+', label: 'Core Technologies' },
  { value: 100, suffix: '%', label: 'Remote-Ready' },
];
```

---

## Data Update Workflow

When adding a new project:
1. Add an entry to `projects` array in `src/data/projects.ts`
2. Add a WebP screenshot at `public/assets/projects/[id].webp` (max 200KB)
3. `npm run build` to verify types pass
4. Push to GitHub → Vercel redeploys automatically
