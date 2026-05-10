import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Layers, Mail, Menu, Server, X } from "lucide-react";
import { motion } from "framer-motion";
import { BrandLogo } from "./components/brand-logo";
import { CursorDotGlow } from "./components/cursor-dot-glow";
import { SplashScreen } from "./components/splash-screen";
import { ThemeToggle } from "./components/theme-toggle";
import {
  FadeUpViewport,
  fadeUpTransition,
  FADE_UP_Y,
} from "./components/fade-up-viewport";
import { Button, buttonVariants } from "./components/ui/button";
import { cn, publicAssetUrl } from "./lib/utils";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { fetchLatestProjects, projectImageUrls, projects, type Project } from "./data/projects";
import { ProjectGalleryModal } from "./components/project-gallery-modal";
import { ProjectRowCard } from "./components/project-row-card";
import { SiteFooter } from "./components/site-footer";
import mePhoto from "./assets/me.webp";

/** `src` — path under `public/` (e.g. `/experience/logo.png`), same rules as project covers. */
function ExperienceLogoSlot({ src }: { src?: string }) {
  const logoSrc = publicAssetUrl(src);
  const [imageFailed, setImageFailed] = useState(false);

  if (!src) return null;

  const showImage = Boolean(logoSrc) && !imageFailed;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-none border border-border bg-muted/40 p-2"
      )}
    >
      {showImage ? (
        <img
          src={logoSrc}
          alt=""
          className="h-7 w-auto max-w-[6.5rem] object-contain object-center md:h-8 md:max-w-[7.5rem]"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className="h-7 w-[6.5rem] border border-border/40 bg-neutral-300 dark:bg-neutral-600 md:h-8 md:w-[7.5rem]"
          aria-hidden
          title="Logo placeholder (add image or fix filename)"
        />
      )}
    </div>
  );
}

const navItems = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
];

const experience: {
  period: string;
  role: string;
  company: string;
  summary: string;
  /** Path under `public/experience/` — `/experience/logo.png` or `experience/logo.png`. */
  logo?: string;
}[] = [
    {
      period: "FEB 2025 — Present",
      role: "Mid-Level Automation Consultant",
      company: "Third Pillar Business Applications Inc.",
      summary: "Developed and maintained web application for an AI-powered business process automation solution combining claims automation and invoice processing to improve efficiency across insurance claims and invoice worflows.",
      logo: "/experience/3rd-pillar-logo.png",
    },
    {
      period: "AUG 2022 — MAR 2024",
      role: "Automation Consultant",
      company: "Third Pillar Business Applications Inc.",
      summary: "Developed Proof of Concept (POC) solutions leveraging Robotic Process Automation (RPA) and Intelligent Process Automation (IPA) platforms to demonstrate automation capabilities for client business processes.",
      logo: "/experience/3rd-pillar-logo.png",
    },
    {
      period: "MAR 2022 — JUN 2022",
      role: "Web and App Developer",
      company: "Euodoo Technologies Inc.",
      summary: "Provided end-to-end IT support while developing internal web based solutions to improve operational efficiency. Managed hardware, software, and system deployments.",
      logo: "/experience/euodoo-logo.png",
    },
  ];

const skillCategories = [
  {
    name: "Frontend",
    items: ["React", "TypeScript", "Tailwind", "JavaScript", "HTML", "CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "NestJS", "ExpressJS", "Spring Boot", "Java", "Python", "Django", "PostgreSQL", "MySQL", "Supabase"],
  },
  {
    name: "RPA",
    items: ["Power Automate"],
  },
] as const;

const servicesOffered = [
  { label: "Fullstack Development", Icon: Layers },
  { label: "Backend Development", Icon: Server },
  { label: "Web Development", Icon: Globe },
] as const;

const stats = [
  { label: "Work experience", value: "3+" },
  { label: "Porrfolio Projects", value: projects.length },
  { label: "Focus", value: "Fullstack Development" },
];

/** Opens Gmail “Compose” in the browser. For the default mail app instead, use `mailto:yotterick7@gmail.com`. */
const CONTACT_MAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=yotterick7@gmail.com";

const chromeBar =
  "border-border bg-background/75 backdrop-blur-md supports-[backdrop-filter]:bg-background/65";

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-foreground/90">{index}</span>
        <span className="mx-2 text-border">·</span>
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export default function App() {
  const [latestProjects, setLatestProjects] = useState<Project[]>([]);
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    void fetchLatestProjects().then(setLatestProjects);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileNavOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setMobileNavOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNavOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SplashScreen />
      <CursorDotGlow />
      <div className="relative z-10">
        <header className={cn("sticky top-0 z-40 border-b font-heading", chromeBar)}>
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
            <button
              type="button"
              onClick={() => goToSection("hero")}
              className="inline-flex shrink-0 items-center rounded-none outline-none ring-offset-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Back to top"
            >
              <BrandLogo alt="" />
            </button>
            <nav className="hidden flex-1 items-center justify-center gap-8 md:flex" aria-label="Primary">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href={CONTACT_MAIL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "default" }), "hidden sm:inline-flex")}
              >
                Contact
              </a>
              <Button
                type="button"
                variant="outline"
                size="default"
                className="md:hidden"
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-nav"
                aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileNavOpen((o) => !o)}
              >
                {mobileNavOpen ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
              </Button>
            </div>
          </div>
          <div
            id="mobile-nav"
            inert={!mobileNavOpen}
            className={cn(
              "overflow-hidden border-t border-border/60 transition-[max-height,opacity,border-color] duration-200 ease-out md:hidden",
              chromeBar,
              mobileNavOpen ? "max-h-[28rem] opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0"
            )}
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4" aria-label="Mobile primary">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className="rounded-none px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={CONTACT_MAIL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "default", variant: "default" }),
                  "mt-2 w-full justify-center sm:hidden"
                )}
              >
                Contact
              </a>
            </nav>
          </div>
        </header>

        <main>
          <section
            className="relative mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-center px-5 py-20 md:py-28"
            id="hero"
          >
            <motion.div
              initial={{ opacity: 0, y: FADE_UP_Y }}
              animate={{ opacity: 1, y: 0 }}
              transition={fadeUpTransition()}
              className="relative max-w-4xl space-y-8"
            >
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Full-stack developer · APIs · Product-minded
              </p>
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl md:leading-[1.05]">
                Full-stack web development from APIs and data to polished interfaces.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                I ship reliable backends and fast frontends with modern stacks, and keep codebases healthy as products
                scale.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={CONTACT_MAIL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  <Mail size={16} strokeWidth={1.75} /> Get in touch
                </a>
                <Button variant="outline" size="lg" onClick={() => goToSection("projects")}>
                  View selected work <ArrowRight size={16} strokeWidth={1.75} />
                </Button>
              </div>
            </motion.div>
          </section>

          <section
            id="about"
            className="mx-auto w-full max-w-6xl px-5 py-20"
          >
            <FadeUpViewport>
              <SectionHeading
                index="01"
                eyebrow="About Me"
                title="Full-stack development that stays shippable as you grow."
                description="I work across the stack—APIs, data, and UI—so features stay coherent, performant, and easy to extend as requirements change."
              />
            </FadeUpViewport>
            <FadeUpViewport className="mt-8" delay={0.08}>
              <Card className="p-6 md:p-8 md:py-10">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12">
                  <div className="mx-auto w-full max-w-[280px] shrink-0 md:mx-0 md:max-w-[260px]">
                    <img
                      src={mePhoto}
                      alt="Portrait"
                      className="aspect-[4/5] w-full rounded-none border border-border object-cover"
                      decoding="async"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-6">
                    <p className="text-lg font-medium leading-relaxed text-foreground md:text-xl">
                      I have 3+ years combined experience in full-stack development.
                    </p>
                    <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                      Results oriented Software Developer specializing in web applications, with hands-oin experience in implementing basic automation solutions to enhance productivity and efficiency. Skilled in building responsive, user-centric applications and integrating automation where applicable to optimize business processes.
                    </p>
                    <div className="border-t border-border/60 pt-6">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Services I offer
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4">
                        {servicesOffered.map(({ label, Icon }) => (
                          <div
                            key={label}
                            className="flex flex-col items-center justify-center gap-2 border border-border/50 bg-muted/15 px-3 py-4 text-center sm:min-h-[4.5rem] sm:gap-2.5 sm:px-4 sm:py-4"
                          >
                            <Icon className="size-6 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden />
                            <p className="text-sm font-medium leading-snug text-foreground md:text-base">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 grid gap-8 border-t border-border/60 pt-10 sm:grid-cols-3">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-3xl font-semibold tracking-tight tabular-nums">{s.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeUpViewport>
          </section>

          <section
            id="experience"
            className="mx-auto w-full max-w-6xl px-5 py-20"
          >
            <FadeUpViewport>
              <SectionHeading
                index="02"
                eyebrow="Experience"
                title="Chronological highlights."
                description="Roles where ownership, clarity, and craft mattered most."
              />
            </FadeUpViewport>
            <div className="mt-8 space-y-4">
              {experience.map((item, i) => (
                <FadeUpViewport key={item.period} delay={i * 0.07}>
                  <Card className="p-5 md:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm tabular-nums text-muted-foreground">{item.period}</p>
                        <div className="flex flex-row items-center gap-3 mt-4">
                          <ExperienceLogoSlot src={item.logo} />
                          <div className="flex flex-col justify-center">
                            <h3 className="text-xl font-semibold tracking-tight">{item.role}</h3>
                            <p className="mt-0.5 text-sm text-muted-foreground">{item.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{item.summary}</p>
                  </Card>
                </FadeUpViewport>
              ))}
            </div>
          </section>

          <section
            id="skills"
            className="mx-auto w-full max-w-6xl px-5 py-20"
          >
            <FadeUpViewport>
              <SectionHeading
                index="03"
                eyebrow="Skills"
                title="Tools and stacks I reach for most often."
              />
            </FadeUpViewport>
            <FadeUpViewport className="mt-8" delay={0.08}>
              <Card className="p-6 md:p-8">
                <div className="space-y-8">
                  {skillCategories.map((category) => (
                    <div key={category.name}>
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {category.name}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill) => (
                          <Badge key={skill} className="font-normal normal-case tracking-normal">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeUpViewport>
          </section>

          <section
            id="projects"
            className="mx-auto w-full max-w-6xl px-5 py-20 pb-28"
          >
            <FadeUpViewport>
              <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  index="04"
                  eyebrow="Projects"
                  title="Recent work."
                  description="A short list on the homepage; the full archive lives on a separate route."
                />
                <Link
                  className="shrink-0 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                  to="/projects"
                >
                  See all projects
                </Link>
              </div>
            </FadeUpViewport>
            <div className="flex flex-col gap-10">
              {latestProjects.map((project, i) => (
                <FadeUpViewport key={project.id} delay={i * 0.06}>
                  <ProjectRowCard
                    project={project}
                    showStack={false}
                    titleElement="h3"
                    onOpenGallery={() => setGalleryProject(project)}
                  />
                </FadeUpViewport>
              ))}
            </div>
            <ProjectGalleryModal
              open={galleryProject !== null}
              onClose={() => setGalleryProject(null)}
              title={galleryProject?.title ?? ""}
              images={galleryProject ? projectImageUrls(galleryProject) : []}
            />
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
