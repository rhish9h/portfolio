import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Gradient background that follows mouse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%, rgba(14, 165, 233, 0.15), transparent 40%)`,
        }}
      />

      {/* Animated shapes */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: i * 0.2 }}
            className="absolute h-[500px] w-[500px] rounded-full border border-sky-500/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          >
            <motion.div
              className="h-full w-full rounded-full border border-sky-500/20"
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

      {/* Code symbols */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-lg text-sky-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 20],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'linear',
              repeatDelay: Math.random() * 2,
            }}
          >
            {'{'}
          </motion.div>
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-lg text-emerald-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 20],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'linear',
              repeatDelay: Math.random() * 2,
            }}
          >
            {'>'}
          </motion.div>
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(14 165 233 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(14 165 233 / 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </motion.div>
  );
}
