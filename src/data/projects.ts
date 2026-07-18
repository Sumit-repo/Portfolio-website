export type ProjectCategory = "AI" | "Web" | "Mobile" | "Desktop" | "Enterprise";

export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  stack: string[];
  category: ProjectCategory;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  accentColor?: string;
}

export const projects: Project[] = [
  {
    id: "wellitica",
    title: "Wellitica",
    shortDesc: "A free fitness app that finally understands Indian food.",
    fullDesc:
      "Wellitica is a free Android fitness app built for Indian diets. Calorie tracking runs on an Indian food database, so dal and dosa aren't guesses. It also tracks habits, sleep, water, and mood, and an AI coach works from what you actually log.",
    stack: ["Next.js", "TypeScript", "Supabase", "AI"],
    category: "AI",
    featured: true,
    liveUrl: "https://www.wellitica.com/",
    githubUrl: undefined,
    image: "/assets/projects/wellitica.webp",
    accentColor: "#8B5CF6",
  },
  {
    id: "dictaglide",
    title: "DictaGlide",
    shortDesc: "Speak anywhere on your desktop, get clean ready-to-paste text.",
    fullDesc:
      "DictaGlide turns speech into clean text in any desktop app. Hit a shortcut, talk, paste. Your audio goes from your machine to your own API key, so nobody else's server ever hears you. Three modes (Polished, Raw, Verbatim) decide how much the AI tidies up.",
    stack: ["Electron", "React", "TypeScript", "Groq", "Supabase"],
    category: "Desktop",
    featured: false,
    liveUrl: "https://dictaglide.vercel.app/",
    githubUrl: undefined,
    image: "/assets/projects/dictaglide.webp",
    accentColor: "#06B6D4",
  },
  {
    id: "otm-copilot",
    title: "OTM AI Copilot",
    shortDesc: "Ask OTM questions in plain English, get answers in seconds instead of hours.",
    fullDesc:
      "OTM consultants normally juggle SQL clients, XML editors, docs portals, and whatever lives in a senior colleague's head. OTM AI Copilot puts that in one workbench: describe the data you need in plain English and it writes the SQL, look up any table in the schema dictionary, and debug XML transmissions in place. Investigations that used to take an afternoon take minutes.",
    stack: ["Next.js", "TypeScript", "Groq", "Supabase", "Tailwind"],
    category: "Enterprise",
    featured: false,
    liveUrl: "https://otm-copilot.vercel.app/",
    githubUrl: undefined,
    image: "/assets/projects/otm-copilot.webp",
    accentColor: "#F59E0B",
  },
  {
    id: "art-gallery",
    title: "Art Gallery",
    shortDesc: "An online gallery that feels like walking through a real exhibition.",
    fullDesc:
      "Artnessa is an online art gallery built like an exhibition. As you scroll, pieces arrive with the pacing of a walk through a physical gallery, instead of a grid of thumbnails fighting for your attention.",
    stack: ["Next.js", "React 19", "GSAP", "Framer Motion", "Tailwind"],
    category: "Web",
    featured: false,
    liveUrl: "https://artnessa.vercel.app/",
    githubUrl: undefined,
    image: "/assets/projects/art-gallery.webp",
    accentColor: "#EC4899",
  },
  {
    id: "bhagats",
    title: "Bhagat's - One Stop",
    shortDesc: "A real neighborhood store in Kishanganj, taken online.",
    fullDesc:
      "The web home of Bhagat's One-Stop Point, a family store in Kishanganj that sells Sudha and Amul dairy, daily groceries, Xerox, and AEPS banking. Behind the storefront sits a working back office for inventory, orders, customers, and the family's tea and supari farm records.",
    stack: ["Next.js", "TypeScript", "Supabase", "shadcn/ui", "Tailwind"],
    category: "Web",
    featured: false,
    liveUrl: "https://bhagats.vercel.app/",
    githubUrl: undefined,
    image: "/assets/projects/bhagats.webp",
    accentColor: "#10B981",
  },
];
