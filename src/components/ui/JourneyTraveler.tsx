import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export function JourneyTraveler() {
  const { scrollYProgress } = useScroll();
  const [isMoving, setIsMoving] = useState(false);
  
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let lastScroll = window.scrollY;
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (Math.abs(currentScroll - lastScroll) > 2) {
        setIsMoving(true);
        lastScroll = currentScroll;
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 200);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(timeout); };
  }, []);

  return (
    <motion.div className="fixed bottom-4 left-6 z-40 px-4 py-2.5 rounded-full bg-card/90 backdrop-blur-md border-2 border-primary/20 shadow-xl"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, type: "spring" }}>
      <div className="flex items-center gap-3">
        <motion.div className="w-3 h-3 rounded-full bg-primary"
          animate={isMoving ? { scale: [1, 1.4, 1], opacity: [1, 0.7, 1] } : { scale: 1 }}
          transition={{ duration: 0.8, repeat: isMoving ? Infinity : 0 }} />
        <span className="text-sm font-semibold text-foreground">Journey</span>
        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: progressWidth }} />
        </div>
      </div>
    </motion.div>
  );
}
