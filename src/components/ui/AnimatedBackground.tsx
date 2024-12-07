import { motion, useReducedMotion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function AnimatedBackground() {
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/50 via-transparent to-emerald-50/50 dark:from-sky-950/50 dark:to-emerald-950/50" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-transparent to-emerald-50/50 dark:from-sky-950/50 dark:to-emerald-950/50" />

      {/* Interactive gradient that follows mouse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%, rgba(14, 165, 233, 0.15), transparent 40%)`,
        }}
      />

      {/* Code symbols with parallax */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xl font-bold text-sky-600/40 dark:text-sky-400/40"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 30],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0.6 + Math.random() * 3,
              ease: 'easeInOut',
              repeatDelay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateX(${mousePosition.x * 30}px) translateY(${
                mousePosition.y * 30
              }px)`,
            }}
          >
            {'</>'}
          </motion.div>
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xl font-bold text-emerald-600/40 dark:text-emerald-400/40"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 30],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0.6 + Math.random() * 3,
              ease: 'easeInOut',
              repeatDelay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateX(${mousePosition.x * -30}px) translateY(${
                mousePosition.y * -30
              }px)`,
            }}
          >
            {'{...}'}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
