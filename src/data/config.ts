export interface SiteConfig {
  name: string;
  roles: string[];
  tagline: string;
  bio: string[];
  email: string;
  domain: string;
  openToWork: boolean;
  resumeUrl: string;
  /** Cal.com / Calendly link — the booking CTA in Contact renders only when set */
  bookingUrl?: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
}

export const config: SiteConfig = {
  name: "Sumit",
  roles: ["Full-Stack Engineer", "SRE L3", "Side-Project Builder"],
  tagline: "I build enterprise systems for a living and my own products for fun.",
  bio: [
    "I'm a full-stack engineer and SRE at an enterprise logistics shop. Most of my day is spent inside Oracle Transportation Management, keeping freight systems healthy for people who notice within minutes when they aren't.",
    "The rest of my time goes into my own products: DictaGlide, a voice dictation app; OTM AI Copilot, a workbench for the same OTM consultants I work with; and Wellitica, a fitness app built around Indian food.",
    "I write TypeScript and Java. I care about how software feels to use, not just whether it passes tests. If you're building something interesting, I want to hear about it.",
  ],
  email: "1020sumit@gmail.com",
  domain: "https://sumit.vercel.app",
  openToWork: true,
  resumeUrl: "/resume.pdf",
  bookingUrl: "https://cal.com/sumit-kumar-mhy8fo/15min",
  socials: {
    github: "https://github.com/Sumit-repo",
    linkedin: "https://linkedin.com/in/sumit1020",
    twitter: "https://x.com/i_Sumit_kumar",
  },
};
