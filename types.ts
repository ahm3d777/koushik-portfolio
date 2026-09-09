
export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  tech: string[];
  category: 'Web' | 'Mobile' | 'Backend' | 'Enterprise';
  stats: { label: string; value: string }[];
  featured?: boolean;
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Cloud' | 'Tools';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

export interface GearItem {
  name: string;
  description: string;
  link?: string;
}

export interface GearCategory {
  category: string;
  items: GearItem[];
}

export interface OtherWorkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  tag: string;
  accent: string; // Tailwind gradient classes for the placeholder visual
  /** Optional real screenshot path (e.g. '/highlights/foo.png'). Falls back
   *  to a designed placeholder when not provided. */
  screenshot?: string;
}
