import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

type CursorDotGlowProps = {
  className?: string;
};

const SPACING = 28;
const FALL_OFF = 160;
const DOT_R = 1.1;
const BASE_ALPHA_LIGHT = 0.1;
const BASE_ALPHA_DARK = 0.13;
const PEAK_ALPHA = 0.92;
const HALO_SCALE = 11;
const ACCENT_LIGHT = "220 75% 50%";
const ACCENT_DARK = "220 88% 62%";

function readTriplet(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function CursorDotGlow({ className }: CursorDotGlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDark = () => document.documentElement.classList.contains("dark");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dark = isDark();
      const bg = readTriplet("--background");
      const fg = readTriplet("--foreground");
      const accent = dark ? ACCENT_DARK : ACCENT_LIGHT;
      const baseA = dark ? BASE_ALPHA_DARK : BASE_ALPHA_LIGHT;
      const { x: px, y: py } = pointerRef.current;

      ctx.fillStyle = `hsl(${bg})`;
      ctx.fillRect(0, 0, w, h);

      for (let gx = 0; gx < w + SPACING; gx += SPACING) {
        for (let gy = 0; gy < h + SPACING; gy += SPACING) {
          const d = Math.hypot(gx - px, gy - py);
          let glow = 0;
          if (!reduced) {
            glow = Math.max(0, 1 - d / FALL_OFF);
            glow = glow * glow * (3 - 2 * glow);
          }

          const alpha = baseA + glow * (PEAK_ALPHA - baseA);
          const r = DOT_R + glow * 2.4;

          if (!reduced && glow > 0.03) {
            const haloR = r + glow * HALO_SCALE;
            const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, haloR);
            g.addColorStop(0, `hsla(${accent} / ${glow * 0.5})`);
            g.addColorStop(0.35, `hsla(${accent} / ${glow * 0.15})`);
            g.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(gx, gy, haloR, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = `hsl(${fg} / ${alpha})`;
          ctx.beginPath();
          ctx.arc(gx, gy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const queueDraw = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        draw();
      });
    };

    resize();
    if (!reduced) {
      pointerRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.35,
      };
    }
    draw();

    const onResize = () => {
      resize();
      draw();
    };

    const onMove = (e: PointerEvent) => {
      if (reduced) return;
      pointerRef.current = { x: e.clientX, y: e.clientY };
      queueDraw();
    };

    window.addEventListener("resize", onResize);
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    const mo = new MutationObserver(() => queueDraw());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      mo.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
    />
  );
}
