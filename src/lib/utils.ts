import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Files live under `public/`. Use root paths (`/projects/x.webp`) or segments (`projects/x.webp`). */
export function publicAssetUrl(path: string | undefined): string | undefined {
  const p = path?.trim();
  if (!p) return undefined;
  if (/^https?:\/\//i.test(p)) return p;
  if (p.startsWith("/")) return p;
  return `/${p.replace(/^\/+/, "")}`;
}
