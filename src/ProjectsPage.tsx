import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CursorDotGlow } from "./components/cursor-dot-glow";
import { ThemeToggle } from "./components/theme-toggle";
import { Button } from "./components/ui/button";
import { fetchAllProjects, PROJECTS_PAGE_SIZE, projectImageUrls, type Project } from "./data/projects";
import { ProjectRowCard } from "./components/project-row-card";
import { ProjectGalleryModal } from "./components/project-gallery-modal";
import { SiteFooter } from "./components/site-footer";
import { FadeUpViewport } from "./components/fade-up-viewport";

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PAGE_SIZE);
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);

  useEffect(() => {
    void fetchAllProjects().then(setProjects);
  }, []);

  const displayed = useMemo(() => projects.slice(0, visibleCount), [projects, visibleCount]);
  const hasMore = visibleCount < projects.length;

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + PROJECTS_PAGE_SIZE, projects.length));
  }, [projects.length]);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(0);

  useEffect(() => {
    if (!hasMore || projects.length === 0) return;
    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const now = Date.now();
        if (now - cooldownRef.current < 750) return;
        cooldownRef.current = now;
        setVisibleCount((c) => Math.min(c + PROJECTS_PAGE_SIZE, projects.length));
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [hasMore, projects.length]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <CursorDotGlow />
      <div className="relative z-10">
        <header className="border-b border-border bg-background/75 font-heading backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={15} strokeWidth={1.75} /> Home
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="px-5 py-16 md:py-20">
          <div className="mx-auto max-w-6xl space-y-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Archive</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">All projects</h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                One project per row — click a cover for the image carousel. Five projects load first; scroll near the
                bottom or use See more for the next batch.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              {displayed.map((project, i) => (
                <FadeUpViewport key={project.id} delay={(i % PROJECTS_PAGE_SIZE) * 0.05}>
                  <ProjectRowCard
                    project={project}
                    showStack
                    titleElement="h2"
                    onOpenGallery={() => setGalleryProject(project)}
                  />
                </FadeUpViewport>
              ))}
            </div>

            {hasMore ? <div ref={sentinelRef} className="h-8 w-full shrink-0" aria-hidden /> : null}

            {hasMore ? (
              <div className="flex justify-center pt-4">
                <Button type="button" variant="outline" size="lg" onClick={loadMore}>
                  See more
                </Button>
              </div>
            ) : null}
          </div>
        </main>

        <SiteFooter />

        <ProjectGalleryModal
          open={galleryProject !== null}
          onClose={() => setGalleryProject(null)}
          title={galleryProject?.title ?? ""}
          images={galleryProject ? projectImageUrls(galleryProject) : []}
        />
      </div>
    </div>
  );
}
