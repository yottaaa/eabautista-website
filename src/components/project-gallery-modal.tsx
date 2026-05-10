import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

type ProjectGalleryModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  images: string[];
};

export function ProjectGalleryModal({ open, onClose, title, images }: ProjectGalleryModalProps) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (open) {
      setIndex(0);
      setFailed({});
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const len = images.length;
  const safeIndex = len === 0 ? 0 : ((index % len) + len) % len;
  const src = images[safeIndex];
  const slideFailed = failed[safeIndex];

  const go = useCallback(
    (delta: number) => {
      if (len === 0) return;
      setIndex((i) => (i + delta + len) % len);
    },
    [len]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go]);

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-gallery-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex max-h-[min(92vh,880px)] w-full max-w-5xl flex-col overflow-hidden rounded-none border border-border/80 bg-card shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3 md:px-5">
          <p id="project-gallery-title" className="truncate text-sm font-medium text-foreground md:text-base">
            {title}
          </p>
          <Button type="button" variant="outline" size="default" className="h-9 w-9 shrink-0 px-0" onClick={onClose}>
            <X size={18} strokeWidth={1.75} />
            <span className="sr-only">Close gallery</span>
          </Button>
        </div>

        <div className="relative flex min-h-[200px] flex-1 items-center justify-center bg-muted/30 px-2 py-6 md:px-8">
          {len === 0 ? (
            <div className="flex h-48 w-full max-w-2xl flex-col items-center justify-center rounded-none border border-border/40 bg-neutral-300/90 dark:bg-neutral-600/90">
              <span className="text-sm text-muted-foreground">No images for this project yet.</span>
            </div>
          ) : slideFailed ? (
            <div className="flex h-[min(55vh,420px)] w-full max-w-4xl flex-col items-center justify-center rounded-none border border-border/40 bg-neutral-300/90 dark:bg-neutral-600/90">
              <span className="text-sm text-muted-foreground">Could not load this image.</span>
            </div>
          ) : (
            <img
              src={src}
              alt=""
              className="max-h-[min(70vh,720px)] w-auto max-w-full object-contain"
              decoding="async"
              onError={() => setFailed((f) => ({ ...f, [safeIndex]: true }))}
            />
          )}

          {len > 1 ? (
            <>
              <button
                type="button"
                className={cn(
                  "absolute left-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-none border border-border/80 bg-background/90 transition-colors hover:bg-muted md:left-4",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
                aria-label="Previous image"
                onClick={() => go(-1)}
              >
                <ChevronLeft size={22} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                className={cn(
                  "absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-none border border-border/80 bg-background/90 transition-colors hover:bg-muted md:right-4",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
                aria-label="Next image"
                onClick={() => go(1)}
              >
                <ChevronRight size={22} strokeWidth={1.75} />
              </button>
            </>
          ) : null}
        </div>

        {len > 1 ? (
          <div className="flex justify-center gap-2 border-t border-border/60 px-4 py-3">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  "h-2.5 w-2.5 rounded-none border border-transparent transition-colors",
                  i === safeIndex
                    ? "border-foreground bg-foreground"
                    : "border-border/60 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}
