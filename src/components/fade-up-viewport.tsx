import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";

/** Same spirit as splash logo: lift from below + fade in */
export const FADE_UP_EASE = [0.22, 1, 0.36, 1] as const;
export const FADE_UP_Y = 28;
export const FADE_UP_DURATION = 0.85;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: FADE_UP_Y },
  visible: { opacity: 1, y: 0 },
};

export const defaultFadeViewport = {
  once: true as const,
  amount: 0.15 as const,
  /** Avoid negative bottom margin — it shrinks the observer root and can hide bottom-of-page blocks (e.g. footer). */
  margin: "0px",
};

export type FadeViewportOptions = {
  once?: boolean;
  amount?: number | "some" | "all";
  margin?: string;
};

export function fadeUpTransition(delay = 0) {
  return {
    duration: FADE_UP_DURATION,
    delay,
    ease: FADE_UP_EASE,
    opacity: { duration: FADE_UP_DURATION * 0.95, ease: FADE_UP_EASE },
  };
}

type FadeUpViewportProps = {
  children: ReactNode;
  className?: string;
  /** Stagger when mapping lists */
  delay?: number;
  /** Override intersection (e.g. footer at bottom of page) */
  viewport?: FadeViewportOptions;
};

export function FadeUpViewport({ children, className, delay = 0, viewport }: FadeUpViewportProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const vp = { ...defaultFadeViewport, ...viewport };

  return (
    <motion.div
      className={cn(className)}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      transition={fadeUpTransition(delay)}
    >
      {children}
    </motion.div>
  );
}
