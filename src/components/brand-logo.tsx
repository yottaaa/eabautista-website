import lightLogo from "../assets/light-logo.webp";
import darkLogo from "../assets/dark-logo.webp";
import { cn } from "../lib/utils";

type BrandLogoProps = {
  className?: string;
  imgClassName?: string;
  alt?: string;
};

export function BrandLogo({ className, imgClassName, alt = "Portfolio" }: BrandLogoProps) {
  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <img
        src={lightLogo}
        alt={alt}
        className={cn("h-7 w-auto object-contain object-left dark:hidden md:h-8", imgClassName)}
        decoding="async"
      />
      <img
        src={darkLogo}
        alt=""
        aria-hidden
        className={cn("hidden h-7 w-auto object-contain object-left dark:block md:h-8", imgClassName)}
        decoding="async"
      />
    </span>
  );
}
