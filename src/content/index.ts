import {
  Project,
  ResearchPublication,
  TeachingExperience,
  BlogPost,
  Skill,
  ExperienceItem,
} from "@/types";

import projectsData from "./data/projects.json";
import researchData from "./data/research.json";
import teachingData from "./data/teaching.json";
import blogData from "./data/blog.json";
import skillsData from "./data/skills.json";
import experienceData from "./data/experience.json";

export const PROJECTS: Project[] = projectsData as Project[];

export const RESEARCH_PUBLICATIONS: ResearchPublication[] =
  researchData as ResearchPublication[];

export const TEACHING_EXPERIENCE: TeachingExperience[] =
  teachingData as TeachingExperience[];

export const BLOG_POSTS: BlogPost[] = blogData as BlogPost[];

export const SKILLS: Skill[] = skillsData as Skill[];

export const EXPERIENCE_TIMELINE: ExperienceItem[] =
  experienceData as ExperienceItem[];
