import {
  Project,
  ResearchPublication,
  TeachingExperience,
  BlogPost,
  Skill,
  ExperienceItem,
} from "@/types";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Server-only content loader. Must only be used in Server Components,
 * Server Actions, or Route Handlers — never in client components directly.
 */

const DATA_DIR = join(process.cwd(), "src", "content", "data");

function loadJSON<T>(filename: string): T {
  const filePath = join(DATA_DIR, filename);
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getProjects(): Project[] {
  return loadJSON<Project[]>("projects.json");
}

export function getResearchPublications(): ResearchPublication[] {
  return loadJSON<ResearchPublication[]>("research.json");
}

export function getTeachingExperience(): TeachingExperience[] {
  return loadJSON<TeachingExperience[]>("teaching.json");
}

export function getBlogPosts(): BlogPost[] {
  return loadJSON<BlogPost[]>("blog.json");
}

export function getSkills(): Skill[] {
  return loadJSON<Skill[]>("skills.json");
}

export function getExperienceTimeline(): ExperienceItem[] {
  return loadJSON<ExperienceItem[]>("experience.json");
}

export interface HeroData {
  name: string;
  tagline: string;
  highlightedName: string;
  bio: string;
  bioTerminal: string;
  statusBadge: string;
  badges: Array<{ label: string; icon: string; color: string }>;
  profilePhotos: Array<{ src: string; alt: string; label: string }>;
  ctaButtons: Array<{
    label: string;
    href: string;
    variant: string;
    external?: boolean;
  }>;
  stats: Array<{ value: string; suffix: string; label: string }>;
}

export function getHeroData(): HeroData {
  return loadJSON<HeroData>("hero.json");
}

export interface ContactData {
  sectionTitle: string;
  sectionDescription: string;
  email: string;
  location: string;
  availabilityStatus: string;
  socialLinks: Array<{ label: string; url: string; icon: string }>;
  formSubjects: string[];
  bottomBanner: string;
}

export function getContactData(): ContactData {
  return loadJSON<ContactData>("contact.json");
}

export interface AboutMilestone {
  year: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  skills: string[];
}

export function getAboutMilestones(): AboutMilestone[] {
  return loadJSON<AboutMilestone[]>("about.json");
}

/**
 * Generic save function for writing data back to JSON files.
 * Used by admin CMS actions.
 */
export function saveJSON<T>(filename: string, data: T): void {
  const filePath = join(DATA_DIR, filename);
  const json = JSON.stringify(data, null, 2);
  const { writeFileSync } = require("fs");
  writeFileSync(filePath, json, "utf-8");
}
