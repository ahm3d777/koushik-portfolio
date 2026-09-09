
import { Project, Skill, Experience, Testimonial, Article, Snippet, GearCategory, OtherWorkItem } from './types';

// Single source of truth for contact/social details, so updating them for
// real doesn't mean hunting through every component that references them.
export const SITE_CONFIG = {
  name: 'Koushik',
  fullName: 'MD Abdulla Al Rahil Choyon',
  role: 'React & React Native Developer',
  location: 'Savar, Bangladesh',
  email: 'mdabdullaalrahilchoyon@gmail.com',
  phone: '+8801715959403',
  // wa.me link built from the phone number above, minus the leading '+'.
  whatsapp: 'https://wa.me/8801715959403',
  github: 'https://github.com/ahm3d777',
  linkedin: 'https://www.linkedin.com/in/md-abdulla-al-rahil-choyon-5ba451426/',
  // No public X/Twitter yet — components check for this before rendering
  // the icon, so leave unset rather than linking a dead '#'.
  twitter: '',
  resumeUrl: '/resume.pdf',
  availability: 'Available for freelance & contract work',
  responseTime: 'Replies within 24 hours',
};

// What shows up on the Contact/"Hire Me" page as the pitch — kept separate
// from SKILLS (used on About/Work) since this is deliberately a shorter,
// client-facing framing of the same capabilities.
export const HIRE_ME_SERVICES = [
  {
    title: 'React & React Native Apps',
    description: 'Cross-platform mobile and web apps built with React, React Native, and Expo.',
  },
  {
    title: 'Animation-Heavy Frontends',
    description: 'Interactive, motion-rich UIs with Framer Motion, Three.js, and modern CSS.',
  },
  {
    title: 'Landing & Portfolio Sites',
    description: 'Fast, responsive marketing and portfolio sites styled with Tailwind CSS.',
  },
  {
    title: 'Deployment & Edge Delivery',
    description: 'Shipping and hosting on Cloudflare Workers/Pages via Wrangler.',
  },
];

export const NAVIGATION_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'Writing', path: '/articles' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'TechScale SaaS Platform',
    shortDescription: 'Enterprise-grade microservices architecture.',
    description: 'A scalable multi-tenant SaaS platform serving over 50k business users. Migrated from a monolith to microservices to improve reliability.',
    image: 'https://picsum.photos/seed/techscale/800/600',
    tech: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
    category: 'Enterprise',
    stats: [
      { label: 'Users', value: '50K+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    featured: true,
  },
  {
    id: '2',
    title: 'FinFlow Analytics',
    shortDescription: 'Real-time financial data visualization.',
    description: 'High-performance dashboard for financial traders, processing thousands of websocket events per second with D3.js and WebGL.',
    image: 'https://picsum.photos/seed/finflow/800/600',
    tech: ['TypeScript', 'D3.js', 'WebSockets', 'Redis'],
    category: 'Web',
    stats: [
      { label: 'Transactions', value: '10K/sec' },
      { label: 'Latency', value: '<50ms' },
    ],
    featured: true,
  },
  {
    id: '3',
    title: 'HealthConnect Mobile',
    shortDescription: 'HIPAA compliant telemedicine app.',
    description: 'Secure video consultation app for patients and doctors. Features encrypted messaging and real-time scheduling.',
    image: 'https://picsum.photos/seed/health/800/600',
    tech: ['React Native', 'WebRTC', 'Firebase'],
    category: 'Mobile',
    stats: [
      { label: 'Downloads', value: '100K+' },
      { label: 'Rating', value: '4.8' },
    ],
    featured: true,
  },
  {
    id: '4',
    title: 'CloudOps Commander',
    shortDescription: 'Infrastructure as Code management tool.',
    description: 'A CLI and visual tool for managing complex AWS infrastructure with visual topology graphs.',
    image: 'https://picsum.photos/seed/cloud/800/600',
    tech: ['Go', 'React', 'AWS SDK', 'Docker'],
    category: 'Backend',
    stats: [
      { label: 'Stars', value: '2.5K' },
      { label: 'Forks', value: '340' },
    ],
    featured: false,
  },
  {
    id: '5',
    title: 'ShopHub E-commerce',
    shortDescription: 'Headless commerce solution.',
    description: 'A blazing fast headless e-commerce storefront built with Next.js and Shopify API.',
    image: 'https://picsum.photos/seed/shop/800/600',
    tech: ['Next.js', 'GraphQL', 'Shopify'],
    category: 'Web',
    stats: [
      { label: 'Sales', value: '$2M+' },
      { label: 'Page Speed', value: '98' },
    ],
    featured: false,
  }
];

// Other live sites shipped outside the main case-study projects above.
// Real, deployed, working products — shown with a designed placeholder
// visual (not a fabricated screenshot). Drop real screenshots into
// /public/highlights/ and set `screenshot` on an entry to use them instead.
export const OTHER_WORK: OtherWorkItem[] = [
  {
    id: 'premiumkit',
    title: 'Bangladesh Premium Jersey Store',
    description: 'An e-commerce storefront for premium sports jerseys, deployed on Cloudflare Workers.',
    url: 'https://premiumkit.k-ahm3d777.workers.dev/',
    tag: 'E-commerce',
    accent: 'from-rose-600 via-neutral-900 to-neutral-950',
  },
  {
    id: 'apple-resale',
    title: 'Apple Resale Pro',
    description: 'A marketplace for certified refurbished Apple devices — iPhones, MacBooks, and iPads with warranty-backed listings.',
    url: 'https://apple-resale.pages.dev/',
    tag: 'E-commerce',
    accent: 'from-neutral-400 via-neutral-700 to-neutral-950',
  },
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 98, category: 'Frontend' },
  { name: 'TypeScript', level: 95, category: 'Frontend' },
  { name: 'Node.js', level: 92, category: 'Backend' },
  { name: 'AWS Architecture', level: 88, category: 'Cloud' },
  { name: 'PostgreSQL', level: 85, category: 'Backend' },
  { name: 'Docker / K8s', level: 80, category: 'Cloud' },
  { name: 'Python', level: 75, category: 'Backend' },
  { name: 'UI/UX Design', level: 85, category: 'Frontend' },
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    period: '2022 - Present',
    description: 'Leading the core platform team for enterprise SaaS solutions.',
    achievements: [
      'Architected microservices backend handling 1M+ daily requests.',
      'Reduced infrastructure costs by 40% through serverless optimization.',
      'Mentored 5 junior developers to mid-level positions.'
    ]
  },
  {
    id: '2',
    role: 'Lead Full Stack Developer',
    company: 'Innovate Digital',
    period: '2019 - 2022',
    description: 'Spearheaded digital transformation projects for Fortune 500 clients.',
    achievements: [
      'Delivered 12+ successful high-scale web applications.',
      'Implemented CI/CD pipelines reducing deployment time by 60%.',
      'Introduced TypeScript and React testing standards.'
    ]
  },
  {
    id: '3',
    role: 'Software Engineer',
    company: 'StartUp Alpha',
    period: '2016 - 2019',
    description: 'Core developer for a high-growth fintech startup.',
    achievements: [
      'Built the initial payment processing engine processing $10k/day.',
      'Developed the mobile app using React Native.'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'VP of Engineering',
    company: 'TechCorp',
    image: 'https://picsum.photos/seed/sarah/100/100',
    text: "Koushik is one of those rare engineers who combines deep technical expertise with exceptional communication skills. He led our platform migration flawlessly."
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'CTO',
    company: 'Innovate Digital',
    image: 'https://picsum.photos/seed/david/100/100',
    text: "The best problem solver I've worked with. Koushik doesn't just write code; he builds solutions that drive business value."
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Product Manager',
    company: 'StartUp Alpha',
    image: 'https://picsum.photos/seed/elena/100/100',
    text: "Reliable, innovative, and a joy to work with. He consistently delivered complex features ahead of schedule."
  }
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Future of React Rendering Patterns',
    excerpt: 'Exploring Server Components, Streaming, and what they mean for the future of frontend architecture.',
    date: 'Oct 12, 2025',
    readTime: '6 min read',
    category: 'Frontend',
    slug: 'react-future-rendering'
  },
  {
    id: '2',
    title: 'Scalable Microservices with Go and gRPC',
    excerpt: 'A deep dive into building high-performance communication layers for distributed systems.',
    date: 'Sep 28, 2025',
    readTime: '8 min read',
    category: 'Backend',
    slug: 'go-grpc-microservices'
  },
  {
    id: '3',
    title: 'Mastering TypeScript Generics',
    excerpt: 'Practical patterns for building flexible, type-safe utilities in large-scale applications.',
    date: 'Sep 10, 2025',
    readTime: '5 min read',
    category: 'Tutorial',
    slug: 'typescript-generics'
  }
];

export const SNIPPETS: Snippet[] = [
  {
    id: '1',
    title: 'React Custom Hook: useDebounce',
    description: 'A performant hook to delay value updates, perfect for search inputs.',
    language: 'typescript',
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`
  },
  {
    id: '2',
    title: 'Tailwind CSS Gradient Text',
    description: 'Utility classes for beautiful gradient text effects.',
    language: 'css',
    code: `<h1 class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 font-extrabold text-5xl">
  Hello World
</h1>`
  },
  {
    id: '3',
    title: 'Node.js Async Retry Wrapper',
    description: 'Function to retry async operations with exponential backoff.',
    language: 'javascript',
    code: `async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise(r => setTimeout(r, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}`
  }
];

export const GEAR: GearCategory[] = [
  {
    category: 'Hardware',
    items: [
      { name: 'MacBook Pro 16" M3 Max', description: '64GB RAM, 2TB SSD. The powerhouse for everything.' },
      { name: 'Dell UltraSharp 40" Curved', description: '5K2K Monitor. Immersion and screen real estate.' },
      { name: 'Keychron Q1 Pro', description: 'Custom mechanical keyboard with Banana switches.' },
      { name: 'MX Master 3S', description: 'The undisputed king of productivity mice.' }
    ]
  },
  {
    category: 'Software',
    items: [
      { name: 'VS Code', description: 'With GitHub Copilot & Catppuccin Theme.' },
      { name: 'Raycast', description: 'Spotlight replacement. Cannot live without it.' },
      { name: 'Figma', description: 'For all things design and prototyping.' },
      { name: 'Linear', description: 'Project management that feels like magic.' }
    ]
  },
  {
    category: 'Desk',
    items: [
      { name: 'Herman Miller Aeron', description: 'Investing in your back is never a mistake.' },
      { name: 'Fully Jarvis Standing Desk', description: 'Bamboo top, 3-stage legs.' },
      { name: 'BenQ ScreenBar Halo', description: 'Perfect lighting without screen glare.' }
    ]
  }
];
