import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { BrandLogo } from "./brand-logo";

/** Time logo stays readable after entrance, before the curtain lifts */
const DISPLAY_MS = 900;
/**
 * Full-screen panel slides up (BAT-style “reveal”) — longer = more editorial.
 * Easing similar to premium studio sites: smooth start, confident finish.
 */
const SLIDE_UP_EXIT_S = 1.15;
const LOGO_ENTER_DURATION_S = 1;
const easeOut = [0.22, 1, 0.36, 1] as const;
/** Curtain lift — ease-in-out, slightly weighted end */
const easeCurtain = [0.65, 0, 0.35, 1] as const;

const holdBeforeExitMs = LOGO_ENTER_DURATION_S * 1000 + DISPLAY_MS;

type Phase = "enter" | "exit" | "gone";

export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    if (phase !== "enter") return;
    const id = window.setTimeout(() => setPhase("exit"), holdBeforeExitMs);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const id = window.setTimeout(() => setPhase("gone"), SLIDE_UP_EXIT_S * 1000);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "gone") return null;

  const isExit = phase === "exit";

  return (
    <motion.div
      role="presentation"
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background shadow-[0_12px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_48px_rgba(0,0,0,0.35)]",
        isExit && "pointer-events-none"
      )}
      initial={false}
      animate={isExit ? { y: "-100%" } : { y: 0 }}
      transition={
        isExit
          ? { duration: SLIDE_UP_EXIT_S, ease: easeCurtain }
          : { duration: 0 }
      }
      style={{ willChange: isExit ? "transform" : "auto" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: LOGO_ENTER_DURATION_S,
          ease: easeOut,
          opacity: { duration: LOGO_ENTER_DURATION_S * 0.95, ease: easeOut },
        }}
      >
        <BrandLogo imgClassName="h-16 w-auto md:h-20" alt="" />
      </motion.div>
    </motion.div>
  );
}
