import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ProjectCoverButton } from "./project-cover";
import type { Project } from "../data/projects";
import { projectCoverSrc } from "../data/projects";
import { cn } from "../lib/utils";

type ProjectRowCardProps = {
  project: Project;
  showStack?: boolean;
  titleElement?: "h2" | "h3";
  onOpenGallery: () => void;
  className?: string;
};

export function ProjectRowCard({
  project,
  showStack = true,
  titleElement: TitleTag = "h3",
  onOpenGallery,
  className,
}: ProjectRowCardProps) {
  const cover = projectCoverSrc(project);

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden p-0 md:flex-row md:items-stretch md:gap-0",
        className
      )}
    >
      <div className="flex min-h-0 w-full shrink-0 flex-col md:w-[min(42%,300px)] lg:w-[320px] md:self-stretch">
        <ProjectCoverButton
          src={cover}
          alt={project.title}
          onClick={onOpenGallery}
          sideColumn
          className="md:min-h-[220px] md:flex-1"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 border-border/60 p-5 md:border-l md:p-6">
        <p className="text-xs tabular-nums text-muted-foreground">{project.year}</p>
        <TitleTag className="text-xl font-semibold tracking-tight md:text-2xl">{project.title}</TitleTag>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{project.impact}</p>
        {showStack ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.stack.map((tech) => (
              <Badge key={tech} className="font-normal normal-case tracking-normal">
                {tech}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
