import { publicAssetUrl } from "../lib/utils";

export type Project = {
  id: number;
  title: string;
  year: string;
  impact: string;
  stack: string[];
  href: string;
  /** Paths under `public/projects/` — site-root URLs (`/projects/x.webp`) or `projects/x.webp` (see `publicAssetUrl`). */
  images: string[];
};

/** Batch size for “See more” / infinite scroll on the projects archive route */
export const PROJECTS_PAGE_SIZE = 5;

export function projectCoverSrc(project: Project): string | undefined {
  return publicAssetUrl(project.images?.[0]);
}

/** Resolved URLs for gallery carousel (handles paths without a leading `/`). */
export function projectImageUrls(project: Project): string[] {
  return project.images.map((u) => publicAssetUrl(u)).filter((u): u is string => Boolean(u));
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Kanban-PHP",
    year: "2020",
    impact: "A todo Web application tool for individuals or teams, made in PHP Core. This is my project in Integrative Programming and Technologies,  also in Database Management System.",
    stack: ["PHP"],
    href: "https://github.com/yottaaa/Kanban-PHP",
    images: ["/projects/kanban_php.webp"],
  },
  {
    id: 2,
    title: "Backend REST API Ordering system for CNSC cafeteria",
    year: "2021",
    impact: "Backend Rest API server for CNSC Canteen Ordering System to be used in Mobile and Desktop Application for client's capstone project made in Django and Django Rest Framework, it also has SMS notification for OTP using Twilio API.",
    stack: ["Django","Django Rest Framework","MySQL"],
    href: "",
    images: ["/projects/cos-api.webp"],
  },
  {
    id: 3,
    title: "Simple Attendace System",
    year: "2022",
    impact: "Simple attendance system using Django and React with time calculation.",
    stack: ["Django","Django Rest Framework","ReactJS"],
    href: "https://gitlab.com/rockyou_yotta/euodoo-hris-backend",
    images: ["/projects/attendance_system1.webp"],
  },
  {
    id: 4,
    title: "Geonode Automated Scraper",
    year: "2024",
    impact: "A web application that scrapes/extracts data from https://geonode.com/free-proxy-list. I used Django for creating web applications, Selenium for web scraping, Celery for task queuing, and Celery Beat for scheduling the extraction every day.",
    stack: ["Django","Selenium","Celery","Docker"],
    href: "https://github.com/yottaaa/assesstment_test_ag/tree/main/problem_1/geonode",
    images: ["/projects/geonode_1.webp","/projects/geonode_2.webp","/projects/geonode_3.webp"],
  },
  {
    id: 5,
    title: "Budyet App",
    year: "2025",
    impact: "A budyet, income, and expense monitoring app with analytics dashboard built in MERN stack. Deployed in AWS EC2 with NGINX as a reverse proxy.",
    stack: ["MERN","AWS","NGINX"],
    href: "https://github.com/yottaaa/budyet-app",
    images: ["/projects/budyet-app.webp"],
  },
  {
    id: 6,
    title: "AI-Powered Mental Health Chatbot",
    year: "2025",
    impact: "This project showcases an AI Chatbot for Mental Health, designed to run on Telegram and Discord using Make.com and ChatGPT. The chatbot provides supportive, empathetic conversations and shares helpful resources, demonstrating my ability to integrate AI with real-world platforms while focusing on human-centered applications.",
    stack: ["Make.com","Telegram","Discord","ChatGPT"],
    href: "",
    images: ["/projects/ai_chatbot_1.webp","/projects/ai_chatbot_2.webp"],
  },
  {
    id: 7,
    title: "Lista Jobs",
    year: "2025",
    impact: "This project demonstrates a no-code full stack application built with AppSheet for managing personal job listings. It highlights my ability to leverage no-code tools to design, build, and deploy scalable applications quickly while maintaining functionality and usability.",
    stack: ["Google AppSheet","Google Sheets"],
    href: "https://www.appsheet.com/start/47023f04-3521-4958-a7d5-b77d240c8a65",
    images: ["/projects/appsheet_1.webp","/projects/appsheet_2.webp"],
  },
  {
    id: 8,
    title: "Super Unemployed Web App",
    year: "2026",
    impact: "Super Unemployed is a focused career management suite built for those navigating the transition between jobs. It moves beyond simple job boards by providing the \"essential tools of the trade\": a single, perfectly crafted ATS-compliant resume and cover letter, a collaborative job listing platform, and community-driven education roadmaps.",
    stack: ["ReactJS","TailwindCSS","Supabase","Vite"],
    href: "https://super-unemployed.vercel.app",
    images: ["/projects/super_unemployed_1.webp","/projects/super_unemployed_2.webp"],
  },
  {
    id: 9,
    title: "Sipat-In App",
    year: "2026",
    impact: "Sipat-In is a privacy-first psychological profiling tool designed to help you navigate the complexities of your own mind.",
    stack: ["React Native","Expo","Supabase","Gluestack"],
    href: "",
    images: ["/projects/sipat_in_0.png","/projects/sipat_in_1.webp","/projects/sipat_in_2.webp","/projects/sipat_in_3.webp","/projects/sipat_in_4.webp"],
  },
];

/** Highest `id` first — treat larger ids as more recently added entries. */
function orderedProjects(): Project[] {
  return [...projects].sort((a, b) => b.id - a.id);
}

export async function fetchAllProjects(): Promise<Project[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(orderedProjects()), 300);
  });
}

export async function fetchLatestProjects(): Promise<Project[]> {
  const all = await fetchAllProjects();
  return all.slice(0, 3);
}
