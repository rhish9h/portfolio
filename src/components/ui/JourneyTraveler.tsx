import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

// SVG Component for the cyclist
const CyclistSVG = ({ isMoving }: { isMoving: boolean }) => (
  <svg viewBox="0 0 100 60" className="w-24 h-16">
    <motion.g animate={isMoving ? { y: [0, -1, 0] } : {}} transition={{ duration: 0.5, repeat: Infinity }}>
      <motion.circle
        cx="15" cy="45" r="12" fill="none" stroke="currentColor" strokeWidth="2"
        animate={isMoving ? { rotate: 360 } : {}}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "15px 45px" }}
      />
      <motion.circle
        cx="75" cy="45" r="12" fill="none" stroke="currentColor" strokeWidth="2"
        animate={isMoving ? { rotate: 360 } : {}}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "75px 45px" }}
      />
      <path d="M15 45 L35 25 L65 25 L75 45 M35 25 L30 45 M35 25 L55 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 20 L40 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M55 20 L65 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </motion.g>
    <motion.g animate={isMoving ? { y: [0, -0.5, 0] } : {}} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}>
      <circle cx="50" cy="18" r="6" fill="currentColor" />
      <path d="M50 24 L45 35 L40 40 M50 24 L55 35 L60 40 M50 24 L50 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </motion.g>
  </svg>
);

// Environment elements
const Cloud = ({ delay = 0, scale = 1 }: { delay?: number; scale?: number }) => (
  <motion.div className="absolute text-white/40" style={{ scale }}
    animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}>
    <svg viewBox="0 0 100 40" className="w-20 h-8">
      <path d="M10 30 Q10 15 25 15 Q30 5 45 10 Q55 0 70 10 Q85 5 90 20 Q95 20 95 30 Z" fill="currentColor" />
    </svg>
  </motion.div>
);

const Star = ({ size = 4, delay = 0 }: { size?: number; delay?: number }) => (
  <motion.div className="absolute rounded-full bg-white" style={{ width: size, height: size }}
    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
    transition={{ duration: 3, repeat: Infinity, delay }} />
);

const Tree = ({ type = 'normal' }: { type?: 'normal' | 'pine' }) => {
  if (type === 'pine') {
    return (
      <svg viewBox="0 0 40 80" className="w-10 h-20 text-emerald-600">
        <path d="M20 0 L5 25 L15 25 L3 45 L13 45 L0 70 L40 70 L27 45 L37 45 L25 25 L35 25 Z" fill="currentColor" />
        <rect x="15" y="70" width="10" height="10" fill="#5D4037" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 50 80" className="w-12 h-20 text-emerald-600">
      <circle cx="25" cy="25" r="20" fill="currentColor" />
      <circle cx="15" cy="35" r="15" fill="currentColor" />
      <circle cx="35" cy="35" r="15" fill="currentColor" />
      <rect x="22" y="50" width="6" height="30" fill="#5D4037" />
    </svg>
  );
};

const Mountain = ({ height = 100, color = "#6B7280" }: { height?: number; color?: string }) => (
  <svg viewBox="0 0 100 100" className="w-32" style={{ height }}>
    <path d="M0 100 L50 10 L100 100 Z" fill={color} />
    <path d="M30 100 L50 40 L70 100 Z" fill="rgba(255,255,255,0.3)" />
  </svg>
);

export function JourneyTraveler() {
  const { scrollYProgress } = useScroll();
  const [isMoving, setIsMoving] = useState(false);
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const x = useTransform(smoothProgress, [0, 1], ["5vw", "85vw"]);
  const y = useTransform(smoothProgress, [0, 1], ["85vh", "90vh"]);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsMoving(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(timeout); };
  }, []);

  return (
    <>
      <motion.div className="fixed z-50 pointer-events-none" style={{ x, y }}>
        <div className="relative">
          <div className="text-primary drop-shadow-lg">
            <CyclistSVG isMoving={isMoving} />
          </div>
          {isMoving && (
            <>
              <motion.div className="absolute -left-4 bottom-2 w-2 h-2 rounded-full bg-muted"
                initial={{ opacity: 1, x: 0 }} animate={{ opacity: 0, x: -20, y: -10 }} transition={{ duration: 0.5, repeat: Infinity }} />
              <motion.div className="absolute -left-6 bottom-1 w-1.5 h-1.5 rounded-full bg-muted"
                initial={{ opacity: 1, x: 0 }} animate={{ opacity: 0, x: -25, y: -5 }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} />
            </>
          )}
        </div>
      </motion.div>

      <motion.div className="fixed bottom-8 left-8 z-40 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border shadow-lg"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <span>Following your journey</span>
        </div>
      </motion.div>
    </>
  );
}

export function JourneyScenery() {
  const { scrollYProgress } = useScroll();
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const treeY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div className="absolute bottom-0 w-full flex justify-around opacity-20" style={{ y: mountainY }}>
        <Mountain height={150} color="#9CA3AF" />
        <Mountain height={200} color="#6B7280" />
        <Mountain height={120} color="#9CA3AF" />
        <Mountain height={180} color="#6B7280" />
      </motion.div>
      
      <motion.div className="absolute top-20 w-full" style={{ y: cloudY }}>
        <Cloud delay={0} scale={1.2} />
        <div className="absolute left-1/4 top-10"><Cloud delay={2} scale={0.8} /></div>
        <div className="absolute right-1/3 top-5"><Cloud delay={4} scale={1} /></div>
        <div className="absolute left-2/3 top-16"><Cloud delay={1} scale={0.9} /></div>
      </motion.div>
      
      <motion.div className="absolute bottom-0 w-full flex justify-between px-8" style={{ y: treeY }}>
        <div className="opacity-30"><Tree type="pine" /></div>
        <div className="opacity-20 mt-8"><Tree type="normal" /></div>
        <div className="opacity-25"><Tree type="pine" /></div>
        <div className="opacity-20 mt-4"><Tree type="normal" /></div>
        <div className="opacity-30"><Tree type="pine" /></div>
      </motion.div>

      <motion.div className="absolute top-0 w-full h-full"
        style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]), y: useTransform(scrollYProgress, [0.4, 1], [50, -100]) }}>
        <div className="absolute top-10 left-10"><Star size={3} delay={0} /></div>
        <div className="absolute top-20 left-1/4"><Star size={2} delay={0.5} /></div>
        <div className="absolute top-8 left-1/2"><Star size={4} delay={1} /></div>
        <div className="absolute top-16 right-1/3"><Star size={2} delay={1.5} /></div>
        <div className="absolute top-12 right-10"><Star size={3} delay={2} /></div>
        <div className="absolute top-24 left-1/3"><Star size={2} delay={0.3} /></div>
        <div className="absolute top-6 right-1/4"><Star size={3} delay={0.8} /></div>
      </motion.div>
    </div>
  );
}
