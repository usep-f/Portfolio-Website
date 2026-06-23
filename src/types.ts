export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "frontend" | "fullstack" | "creative" | "all";
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  image: string;
  highlights: string[];
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: "frontend" | "backend" | "languages" | "misc";
  icon?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
}

export interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  type: "work" | "education";
}
