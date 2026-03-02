import { motion, useScroll, useTransform } from 'framer-motion';

// Landmark components for different sections
const SchoolBuilding = () => (
  <svg viewBox="0 0 100 80" className="w-20 h-16 text-primary/40">
    <path d="M50 5 L10 25 L10 70 L40 70 L40 50 L60 50 L60 70 L90 70 L90 25 Z" fill="currentColor" />
    <path d="M45 55 L55 55 L55 65 L45 65 Z" fill="hsl(var(--background))" />
    <path d="M20 35 L30 35 L30 45 L20 45 Z" fill="hsl(var(--background))" />
    <path d="M70 35 L80 35 L80 45 L70 45 Z" fill="hsl(var(--background))" />
    <path d="M50 5 L50 0" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="-2" r="3" fill="hsl(var(--primary))" />
  </svg>
);

const OfficeBuilding = () => (
  <svg viewBox="0 0 80 100" className="w-16 h-20 text-primary/40">
    <rect x="10" y="20" width="60" height="80" fill="currentColor" />
    <rect x="15" y="25" width="15" height="10" fill="hsl(var(--background))" />
    <rect x="35" y="25" width="15" height="10" fill="hsl(var(--background))" />
    <rect x="55" y="25" width="15" height="10" fill="hsl(var(--background))" />
    <rect x="15" y="40" width="15" height="10" fill="hsl(var(--background))" />
    <rect x="35" y="40" width="15" height="10" fill="hsl(var(--background))" />
    <rect x="55" y="40" width="15" height="10" fill="hsl(var(--background))" />
    <rect x="30" y="60" width="20" height="35" fill="hsl(var(--background))" />
    <rect x="35" y="10" width="10" height="15" fill="currentColor" />
  </svg>
);

const Trophy = () => (
  <svg viewBox="0 0 60 60" className="w-14 h-14 text-amber-500/50">
    <path d="M15 10 L15 20 Q15 30 25 35 L25 40 L20 45 L20 50 L40 50 L40 45 L35 40 L35 35 Q45 30 45 20 L45 10 Z" fill="currentColor" />
    <rect x="12" y="8" width="5" height="10" rx="2" fill="currentColor" />
    <rect x="43" y="8" width="5" height="10" rx="2" fill="currentColor" />
  </svg>
);

const Book = () => (
  <svg viewBox="0 0 50 60" className="w-12 h-14 text-blue-500/40">
    <path d="M5 10 Q25 5 45 10 L45 50 Q25 45 5 50 Z" fill="currentColor" />
    <path d="M5 10 Q25 15 45 10" fill="none" stroke="hsl(var(--background))" strokeWidth="2" />
  </svg>
);

const Code = () => (
  <svg viewBox="0 0 60 40" className="w-14 h-10 text-purple-500/40">
    <path d="M15 20 L5 20 L10 15 M5 20 L10 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M45 20 L55 20 L50 15 M55 20 L50 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="30" cy="20" r="4" fill="currentColor" />
  </svg>
);

const Sun = () => (
  <motion.svg 
    viewBox="0 0 60 60" 
    className="w-20 h-20 text-amber-400/30"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <circle cx="30" cy="30" r="15" fill="currentColor" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line
        key={i}
        x1="30"
        y1="30"
        x2={30 + 25 * Math.cos((angle * Math.PI) / 180)}
        y2={30 + 25 * Math.sin((angle * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    ))}
  </motion.svg>
);

const Moon = () => (
  <svg viewBox="0 0 40 40" className="w-16 h-16 text-slate-400/30">
    <path d="M25 5 Q10 5 10 20 Q10 35 25 35 Q20 30 20 20 Q20 10 25 5" fill="currentColor" />
  </svg>
);

interface SectionLandmarkProps {
  children: React.ReactNode;
  scrollStart: number;
  scrollEnd: number;
  position: 'left' | 'right';
  offset?: number;
}

function SectionLandmark({ children, scrollStart, scrollEnd, position, offset = 0 }: SectionLandmarkProps) {
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [scrollStart, scrollStart + 0.05, scrollEnd - 0.05, scrollEnd], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [scrollStart, scrollStart + 0.05, scrollEnd - 0.05, scrollEnd], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [scrollStart, scrollEnd], [100 + offset, -100]);
  
  return (
    <motion.div
      className={`fixed bottom-32 ${position === 'left' ? 'left-[10%]' : 'right-[10%]'} z-20 pointer-events-none`}
      style={{ opacity, scale, y }}
    >
      {children}
    </motion.div>
  );
}

export function JourneyLandmarks() {
  return (
    <>
      {/* Education section - School buildings */}
      <SectionLandmark scrollStart={0.15} scrollEnd={0.35} position="left" offset={0}>
        <div className="flex flex-col items-center gap-2">
          <SchoolBuilding />
          <span className="text-xs text-muted-foreground/60">Education Valley</span>
        </div>
      </SectionLandmark>
      
      <SectionLandmark scrollStart={0.15} scrollEnd={0.35} position="right" offset={20}>
        <div className="flex flex-col items-center gap-2">
          <Book />
          <span className="text-xs text-muted-foreground/60">Knowledge</span>
        </div>
      </SectionLandmark>

      {/* Experience section - Office buildings */}
      <SectionLandmark scrollStart={0.3} scrollEnd={0.55} position="left" offset={40}>
        <div className="flex flex-col items-center gap-2">
          <OfficeBuilding />
          <span className="text-xs text-muted-foreground/60">Career Mountains</span>
        </div>
      </SectionLandmark>
      
      <SectionLandmark scrollStart={0.35} scrollEnd={0.55} position="right" offset={0}>
        <div className="flex flex-col items-center gap-2">
          <Code />
          <span className="text-xs text-muted-foreground/60">Development</span>
        </div>
      </SectionLandmark>

      {/* Skills section - Sun (peaks during skills) */}
      <SectionLandmark scrollStart={0.5} scrollEnd={0.7} position="left" offset={60}>
        <div className="flex flex-col items-center gap-2">
          <Sun />
          <span className="text-xs text-muted-foreground/60">Skills Peak</span>
        </div>
      </SectionLandmark>

      {/* Achievements section - Trophies */}
      <SectionLandmark scrollStart={0.7} scrollEnd={0.9} position="right" offset={20}>
        <div className="flex flex-col items-center gap-2">
          <Trophy />
          <span className="text-xs text-muted-foreground/60">Achievement Summit</span>
        </div>
      </SectionLandmark>
      
      <SectionLandmark scrollStart={0.75} scrollEnd={0.9} position="left" offset={0}>
        <div className="flex flex-col items-center gap-2">
          <Moon />
          <span className="text-xs text-muted-foreground/60">Reflection</span>
        </div>
      </SectionLandmark>
    </>
  );
}
