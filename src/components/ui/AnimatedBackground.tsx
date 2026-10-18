import { motion, useReducedMotion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function AnimatedBackground() {
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Subtle architectural grid with radial fade */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-45 dark:opacity-30"
        style={{
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, black 20%, transparent 100%)',
        }}
      />

      {/* Subtle neutral top light */}
      <div className="absolute -top-48 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-foreground/[0.03] blur-3xl dark:bg-white/[0.03]" />

      {/* Restrained cursor spotlight */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-60 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%, rgba(161, 161, 170, 0.07), transparent 45%)`,
          }}
        />
      )}
    </div>
  );
}
