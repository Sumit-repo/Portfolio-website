export type ExperienceType = "full-time" | "freelance" | "contract" | "internship";

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  type: ExperienceType;
  bullets: string[];
  location?: string;
  companyUrl?: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: "current",
    company: "EPAM Systems",
    role: "SRE L3 / OTM Functional Consultant",
    period: "March 2024 - Present",
    type: "full-time",
    location: "Remote",
    companyUrl: "https://www.epam.com/",
    bullets: [
      "Act as the primary point of contact for Tier 1/2 escalation for Oracle Transportation Management (OTM) application",
      "Liaise between L1 team, offshore OTM developers, onshore consulting team, and L4 developers",
      "Manage incidents, escalations, and service requests via Jira and ServiceNow",
      "Ensure strict adherence to SLAs for response and resolution times",
    ],
  }
];
