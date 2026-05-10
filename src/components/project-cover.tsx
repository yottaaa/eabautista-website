import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "../lib/utils";

type ProjectCoverButtonProps = {
  src?: string;
  /** Decorative — cover is paired with visible title below */
  alt: string;
  onClick: () => void;
  className?: string;
  /** Left column beside text — shorter height, fills column on desktop */
  sideColumn?: boolean;
};

export function ProjectCoverButton({ src, alt, onClick, className, sideColumn }: ProjectCoverButtonProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative block w-full overflow-hidden bg-muted/30 text-left outline-none ring-offset-background transition-opacity hover:opacity-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        sideColumn
          ? "h-full min-h-[140px] rounded-none border-b border-border/60 md:flex md:min-h-0 md:flex-col md:border-b-0 md:border-r md:border-border/60"
          : "rounded-none border-b border-border/60",
        className
      )}
      aria-label={`Open image gallery for ${alt}`}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          sideColumn
            ? "aspect-[5/3] max-h-[200px] sm:aspect-video md:aspect-auto md:max-h-none md:min-h-0 md:flex-1"
            : "aspect-[21/9] sm:aspect-[2/1] md:aspect-video"
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            className="flex h-full min-h-[inherit] w-full flex-col items-center justify-center gap-2 bg-neutral-300/90 dark:bg-neutral-600/90"
            aria-hidden
          >
            <ImageIcon className="size-8 text-neutral-600/80 dark:text-neutral-400/90" strokeWidth={1.5} />
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Image coming soon</span>
          </div>
        )}
      </div>
    </button>
  );
}
