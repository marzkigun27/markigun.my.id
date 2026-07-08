"use server";

import { validateSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import {
  getProjects,
  getResearchPublications,
  getBlogPosts,
  getSkills,
  getExperienceTimeline,
  getTeachingExperience,
  getHeroData,
  getContactData,
  getAboutMilestones,
  saveJSON,
} from "@/content/server";
import type {
  Project,
  ResearchPublication,
  BlogPost,
  Skill,
  ExperienceItem,
  TeachingExperience,
} from "@/types";
import type { HeroData, ContactData, AboutMilestone } from "@/content/server";

// ─── Auth Guard ───
async function requireAuth(): Promise<void> {
  const valid = await validateSession();
  if (!valid) {
    throw new Error("Unauthorized");
  }
}

// ─── Input Validation Helpers ───
function sanitizeString(input: unknown, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength);
}

function sanitizeArray(input: unknown): string[] {
  if (typeof input !== "string") return [];
  return input
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length <= 200);
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

function generateId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`;
}

function revalidateAll(): void {
  revalidatePath("/", "layout");
}

// ─── Hero Actions ───
export async function updateHero(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const heroData: HeroData = {
      name: sanitizeString(formData.get("name"), 100),
      tagline: sanitizeString(formData.get("tagline"), 200),
      highlightedName: sanitizeString(formData.get("highlightedName"), 100),
      bio: sanitizeString(formData.get("bio"), 1000),
      bioTerminal: sanitizeString(formData.get("bioTerminal"), 500),
      statusBadge: sanitizeString(formData.get("statusBadge"), 200),
      badges: JSON.parse(sanitizeString(formData.get("badges"), 2000) || "[]"),
      profilePhotos: JSON.parse(sanitizeString(formData.get("profilePhotos"), 2000) || "[]"),
      ctaButtons: JSON.parse(sanitizeString(formData.get("ctaButtons"), 2000) || "[]"),
      stats: JSON.parse(sanitizeString(formData.get("stats"), 2000) || "[]"),
    };
    saveJSON("hero.json", heroData);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to save" };
  }
}

// ─── About Actions ───
export async function updateAbout(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const milestonesJson = sanitizeString(formData.get("milestones"), 20000);
    const milestones: AboutMilestone[] = JSON.parse(milestonesJson || "[]");
    saveJSON("about.json", milestones);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to save" };
  }
}

// ─── Contact Actions ───
export async function updateContact(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const contactData: ContactData = {
      sectionTitle: sanitizeString(formData.get("sectionTitle"), 200),
      sectionDescription: sanitizeString(formData.get("sectionDescription"), 1000),
      email: sanitizeString(formData.get("email"), 150),
      location: sanitizeString(formData.get("location"), 200),
      availabilityStatus: sanitizeString(formData.get("availabilityStatus"), 500),
      socialLinks: JSON.parse(sanitizeString(formData.get("socialLinks"), 2000) || "[]"),
      formSubjects: sanitizeArray(formData.get("formSubjects")),
      bottomBanner: sanitizeString(formData.get("bottomBanner"), 200),
    };
    saveJSON("contact.json", contactData);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to save" };
  }
}

// ─── Project Actions ───
export async function saveProject(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const projects = getProjects();
    const existingId = sanitizeString(formData.get("id"), 100);
    const title = sanitizeString(formData.get("title"), 200);

    if (!title) return { success: false, error: "Title is required" };

    const project: Project = {
      id: existingId || generateId("proj"),
      slug: sanitizeString(formData.get("slug"), 100) || generateSlug(title),
      title,
      tagline: sanitizeString(formData.get("tagline"), 300),
      description: sanitizeString(formData.get("description"), 2000),
      category: sanitizeString(formData.get("category"), 100) as Project["category"],
      date: sanitizeString(formData.get("date"), 20),
      technologies: sanitizeArray(formData.get("technologies")),
      githubUrl: sanitizeString(formData.get("githubUrl"), 300) || undefined,
      liveUrl: sanitizeString(formData.get("liveUrl"), 300) || undefined,
      featured: formData.get("featured") === "true",
      problem: sanitizeString(formData.get("problem"), 2000),
      solution: sanitizeString(formData.get("solution"), 2000),
      architecture: sanitizeString(formData.get("architecture"), 2000),
      challenges: sanitizeArray(formData.get("challenges")),
      results: sanitizeArray(formData.get("results")),
      lessonsLearned: sanitizeArray(formData.get("lessonsLearned")),
      metrics: JSON.parse(sanitizeString(formData.get("metrics"), 2000) || "[]"),
    };

    const idx = projects.findIndex((p) => p.id === existingId);
    if (idx >= 0) {
      projects[idx] = project;
    } else {
      projects.push(project);
    }
    saveJSON("projects.json", projects);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to save" };
  }
}

export async function deleteProject(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const id = sanitizeString(formData.get("id"), 100);
    const projects = getProjects().filter((p) => p.id !== id);
    saveJSON("projects.json", projects);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to delete" };
  }
}

// ─── Research Actions ───
export async function saveResearch(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const items = getResearchPublications();
    const existingId = sanitizeString(formData.get("id"), 100);
    const title = sanitizeString(formData.get("title"), 500);

    if (!title) return { success: false, error: "Title is required" };

    const pub: ResearchPublication = {
      id: existingId || generateId("pub"),
      slug: sanitizeString(formData.get("slug"), 100) || generateSlug(title),
      title,
      authors: sanitizeArray(formData.get("authors")),
      venue: sanitizeString(formData.get("venue"), 300),
      year: parseInt(sanitizeString(formData.get("year"), 4)) || new Date().getFullYear(),
      status: sanitizeString(formData.get("status"), 30) as ResearchPublication["status"],
      abstract: sanitizeString(formData.get("abstract"), 5000),
      keywords: sanitizeArray(formData.get("keywords")),
      pdfUrl: sanitizeString(formData.get("pdfUrl"), 300) || undefined,
      doiUrl: sanitizeString(formData.get("doiUrl"), 300) || undefined,
      equations: JSON.parse(sanitizeString(formData.get("equations"), 5000) || "[]"),
      methods: sanitizeArray(formData.get("methods")),
      keyFindings: sanitizeArray(formData.get("keyFindings")),
    };

    const idx = items.findIndex((p) => p.id === existingId);
    if (idx >= 0) {
      items[idx] = pub;
    } else {
      items.push(pub);
    }
    saveJSON("research.json", items);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to save" };
  }
}

export async function deleteResearch(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const id = sanitizeString(formData.get("id"), 100);
    const items = getResearchPublications().filter((p) => p.id !== id);
    saveJSON("research.json", items);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to delete" };
  }
}

// ─── Blog Actions ───
export async function saveBlogPost(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const items = getBlogPosts();
    const existingId = sanitizeString(formData.get("id"), 100);
    const title = sanitizeString(formData.get("title"), 300);

    if (!title) return { success: false, error: "Title is required" };

    const post: BlogPost = {
      id: existingId || generateId("post"),
      slug: sanitizeString(formData.get("slug"), 100) || generateSlug(title),
      title,
      excerpt: sanitizeString(formData.get("excerpt"), 1000),
      content: sanitizeString(formData.get("content"), 50000),
      category: sanitizeString(formData.get("category"), 50) as BlogPost["category"],
      date: sanitizeString(formData.get("date"), 30),
      readTime: sanitizeString(formData.get("readTime"), 20),
      tags: sanitizeArray(formData.get("tags")),
    };

    const idx = items.findIndex((p) => p.id === existingId);
    if (idx >= 0) {
      items[idx] = post;
    } else {
      items.push(post);
    }
    saveJSON("blog.json", items);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to save" };
  }
}

export async function deleteBlogPost(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const id = sanitizeString(formData.get("id"), 100);
    const items = getBlogPosts().filter((p) => p.id !== id);
    saveJSON("blog.json", items);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to delete" };
  }
}

// ─── Skill Actions ───
export async function saveSkill(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const items = getSkills();
    const existingName = sanitizeString(formData.get("originalName"), 200);
    const name = sanitizeString(formData.get("name"), 200);

    if (!name) return { success: false, error: "Name is required" };

    const skill: Skill = {
      name,
      category: sanitizeString(formData.get("category"), 100) as Skill["category"],
      yearsOfExperience: parseInt(sanitizeString(formData.get("yearsOfExperience"), 2)) || 1,
      proficiency: sanitizeString(formData.get("proficiency"), 30) as Skill["proficiency"],
      projectsUsedIn: sanitizeArray(formData.get("projectsUsedIn")),
      relatedTech: sanitizeArray(formData.get("relatedTech")),
      description: sanitizeString(formData.get("description"), 1000),
    };

    const idx = items.findIndex((s) => s.name === existingName);
    if (idx >= 0) {
      items[idx] = skill;
    } else {
      items.push(skill);
    }
    saveJSON("skills.json", items);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to save" };
  }
}

export async function deleteSkill(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const name = sanitizeString(formData.get("name"), 200);
    const items = getSkills().filter((s) => s.name !== name);
    saveJSON("skills.json", items);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to delete" };
  }
}

// ─── Experience Actions ───
export async function saveExperience(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const items = getExperienceTimeline();
    const existingId = sanitizeString(formData.get("id"), 100);

    const item: ExperienceItem = {
      id: existingId || generateId("exp"),
      role: sanitizeString(formData.get("role"), 200),
      organization: sanitizeString(formData.get("organization"), 200),
      period: sanitizeString(formData.get("period"), 100),
      type: sanitizeString(formData.get("type"), 50) as ExperienceItem["type"],
      location: sanitizeString(formData.get("location"), 200),
      description: sanitizeString(formData.get("description"), 2000),
      highlights: sanitizeArray(formData.get("highlights")),
    };

    if (!item.role) return { success: false, error: "Role is required" };

    const idx = items.findIndex((e) => e.id === existingId);
    if (idx >= 0) {
      items[idx] = item;
    } else {
      items.push(item);
    }
    saveJSON("experience.json", items);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to save" };
  }
}

export async function deleteExperience(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const id = sanitizeString(formData.get("id"), 100);
    const items = getExperienceTimeline().filter((e) => e.id !== id);
    saveJSON("experience.json", items);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to delete" };
  }
}

// ─── Teaching Actions ───
export async function saveTeaching(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const items = getTeachingExperience();
    const existingId = sanitizeString(formData.get("id"), 100);

    const item: TeachingExperience = {
      id: existingId || generateId("ta"),
      course: sanitizeString(formData.get("course"), 200),
      code: sanitizeString(formData.get("code"), 20),
      semester: sanitizeString(formData.get("semester"), 50),
      role: sanitizeString(formData.get("role"), 200),
      description: sanitizeString(formData.get("description"), 2000),
      responsibilities: sanitizeArray(formData.get("responsibilities")),
      topics: sanitizeArray(formData.get("topics")),
      studentCount: parseInt(sanitizeString(formData.get("studentCount"), 5)) || 0,
      feedbackQuote: sanitizeString(formData.get("feedbackQuote"), 1000) || undefined,
    };

    if (!item.course) return { success: false, error: "Course is required" };

    const idx = items.findIndex((t) => t.id === existingId);
    if (idx >= 0) {
      items[idx] = item;
    } else {
      items.push(item);
    }
    saveJSON("teaching.json", items);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to save" };
  }
}

export async function deleteTeaching(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const id = sanitizeString(formData.get("id"), 100);
    const items = getTeachingExperience().filter((t) => t.id !== id);
    saveJSON("teaching.json", items);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to delete" };
  }
}
