import { motion, useReducedMotion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useMemo } from 'react';

interface CodeSymbol {
  x: number;
  y: number;
  delay: number;
}

export function AnimatedBackground() {
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  // Generate stable positions for code symbols
  const codeSymbols = useMemo(() => {
    const generateSymbols = (count: number): CodeSymbol[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: 0.6 + Math.random() * 3,
      }));

    return {
      tags: generateSymbols(12),
      curlies: generateSymbols(12),
    };
  }, []); // Empty dependency array means this only runs once on mount

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/50 via-transparent to-emerald-50/50 dark:from-sky-950/50 dark:to-emerald-950/50" />
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Radial gradient that follows cursor */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-sky-50/50 via-transparent to-emerald-50/50 dark:from-sky-950/50 dark:to-emerald-950/50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%, rgba(14, 165, 233, 0.15), rgba(255, 255, 255, 0) 40%)`,
        }}
      />

      {/* Code symbols with parallax */}
      <div className="absolute inset-0">
        {/* </> symbols */}
        {codeSymbols.tags.map((symbol, i) => (
          <motion.div
            key={`tag-${i}`}
            className="absolute font-mono text-xl font-bold text-sky-600/40 dark:text-sky-400/40"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 30],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: symbol.delay,
              ease: 'easeInOut',
              repeatDelay: Math.random() * 2,
            }}
            style={{
              left: `${symbol.x}%`,
              top: `${symbol.y}%`,
              transform: `translateX(${mousePosition.x * 30}px) translateY(${
                mousePosition.y * 30
              }px)`,
            }}
          >
            {'</>'}
          </motion.div>
        ))}

        {/* {...} symbols */}
        {codeSymbols.curlies.map((symbol, i) => (
          <motion.div
            key={`curly-${i}`}
            className="absolute font-mono text-xl font-bold text-emerald-600/40 dark:text-emerald-400/40"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 30],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: symbol.delay,
              ease: 'easeInOut',
              repeatDelay: Math.random() * 2,
            }}
            style={{
              left: `${symbol.x}%`,
              top: `${symbol.y}%`,
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
