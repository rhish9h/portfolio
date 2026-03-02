import { motion, useScroll, useTransform } from 'framer-motion';

export function JourneyPath() {
  const { scrollYProgress } = useScroll();
  
  // The path draws as you scroll
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Main journey road at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32"
        preserveAspectRatio="none"
        viewBox="0 0 1000 100"
      >
        {/* Road background */}
        <motion.path
          d="M0 70 Q250 70 500 70 Q750 70 1000 70"
          stroke="hsl(var(--muted))"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
        
        {/* Animated road line */}
        <motion.path
          d="M0 70 Q250 70 500 70 Q750 70 1000 70"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          style={{
            pathLength,
            strokeDasharray: 1,
            strokeDashoffset: 0,
          }}
          opacity="0.6"
        />
        
        {/* Road markers */}
        {[0, 0.25, 0.5, 0.75, 1].map((pos, index) => {
          const markerScale = useTransform(scrollYProgress, [pos - 0.1, pos], [0, 1]);
          const markerOpacity = useTransform(scrollYProgress, [pos - 0.1, pos], [0, 1]);
          return (
            <motion.circle
              key={index}
              cx={pos * 1000}
              cy="70"
              r="6"
              fill="hsl(var(--primary))"
              initial={{ scale: 0, opacity: 0 }}
              style={{
                scale: markerScale,
                opacity: markerOpacity,
              }}
            />
          );
        })}
      </svg>

      {/* Milestone markers with labels */}
      <div className="absolute bottom-20 w-full flex justify-between px-[5vw] text-xs text-muted-foreground">
        <motion.span 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1]) }}
          className="font-medium"
        >
          Start
        </motion.span>
        <motion.span 
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.15, 0.25], [0, 0, 1]) }}
        >
          Education
        </motion.span>
        <motion.span 
          style={{ opacity: useTransform(scrollYProgress, [0.25, 0.3, 0.5], [0, 0, 1]) }}
        >
          Experience
        </motion.span>
        <motion.span 
          style={{ opacity: useTransform(scrollYProgress, [0.5, 0.55, 0.7], [0, 0, 1]) }}
        >
          Skills
        </motion.span>
        <motion.span 
          style={{ opacity: useTransform(scrollYProgress, [0.7, 0.75, 0.9], [0, 0, 1]) }}
        >
          Achievements
        </motion.span>
        <motion.span 
          style={{ opacity: useTransform(scrollYProgress, [0.9, 0.95, 1], [0, 0, 1]) }}
          className="font-medium text-primary"
        >
          Destination
        </motion.span>
      </div>
    </div>
  );
}
