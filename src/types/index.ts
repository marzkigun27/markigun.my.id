export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category:
    | "IoT & Sensor Analytics"
    | "Scientific Computing"
    | "Full-Stack Systems"
    | "Semiconductor & RTL"
    | "Materials Simulation";
  date: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string[];
  results: string[];
  lessonsLearned: string[];
  metrics?: ProjectMetric[];
  coverImage?: string;
}

export interface ResearchEquation {
  label: string;
  latex: string;
  description: string;
}

export interface ResearchPublication {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  status: "Published" | "Under Review" | "In Preparation";
  abstract: string;
  keywords: string[];
  pdfUrl?: string;
  doiUrl?: string;
  equations?: ResearchEquation[];
  methods: string[];
  keyFindings: string[];
}

export interface TeachingExperience {
  id: string;
  course: string;
  code: string;
  semester: string;
  role: string;
  description: string;
  responsibilities: string[];
  topics: string[];
  studentCount: number;
  feedbackQuote?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category:
    | "Physics"
    | "Programming"
    | "Linux"
    | "Embedded Systems"
    | "Semiconductor"
    | "Quantum Computing"
    | "Numerical Methods";
  date: string;
  readTime: string;
  tags: string[];
}

export interface Skill {
  name: string;
  category:
    | "Programming"
    | "Scientific Computing"
    | "Frontend"
    | "Backend"
    | "Engineering & Tools";
  yearsOfExperience: number;
  proficiency: "Expert" | "Advanced" | "Proficient" | "Familiar";
  projectsUsedIn: string[];
  relatedTech: string[];
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type:
    | "Education"
    | "Teaching Assistant"
    | "Leadership & Org"
    | "Project & Research"
    | "Internship";
  location: string;
  description: string;
  highlights: string[];
}
