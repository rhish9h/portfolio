import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

      {/* Circuit board pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230EA5E9' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Animated shapes with parallax */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 + i * 0.2 }}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              width: `${500 + i * 100}px`,
              height: `${500 + i * 100}px`,
            }}
          >
            <motion.div
              className="h-full w-full rounded-full border-2 border-sky-500/30 dark:border-sky-400/30"
              style={{
                transform: `translateX(${mousePosition.x * (20 - i * 5)}px) translateY(${
                  mousePosition.y * (20 - i * 5)
                }px)`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 0,
              }}
            />
          </motion.div>
        ))}
      </div>

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
