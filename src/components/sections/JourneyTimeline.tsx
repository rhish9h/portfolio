import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { profileData, Experience } from '../../data/profileData';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLeft: boolean;
  totalItems: number;
}

function TimelineItem({ experience, index, isLeft, totalItems }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className={`relative flex items-center justify-center w-full mb-12 md:mb-0 ${
        isLeft ? 'md:justify-start' : 'md:justify-end'
      }`}
    >
      {/* Timeline node */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-4 h-4 rounded-full bg-primary border-3 border-background shadow-lg shadow-primary/30"
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full md:w-[45%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
      >
        <div className="journey-card group relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur-sm p-6 shadow-lg">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight">{experience.title}</h3>
                  <p className="text-sm text-muted-foreground">{experience.company}</p>
                </div>
              </div>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted/50">
                <Calendar className="w-3 h-3" />
                {experience.startDate} – {experience.endDate}
              </span>
              {experience.location && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted/50">
                  <MapPin className="w-3 h-3" />
                  {experience.location}
                </span>
              )}
            </div>

            {/* Bullets */}
            <ul className="space-y-2">
              {experience.bullets.map((bullet, bulletIndex) => (
                <motion.li
                  key={bulletIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.4 + bulletIndex * 0.1 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Index indicator */}
          <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/30">
            {String(index + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Reverse to show chronological order (oldest to newest)
  const chronologicalExperience = [...profileData.experiences].reverse();

  return (
    <div ref={containerRef} className="relative">
      {/* Section header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From intern to software engineer, follow my path through roles that shaped my expertise 
            in software development, identity management, and innovation.
          </p>
        </motion.div>
      </div>

      {/* Timeline container */}
      <div className="relative">
        {/* Center line - hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/20 to-transparent">
          <motion.div
            className="w-full bg-gradient-to-b from-primary via-primary to-primary rounded-full"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Mobile line - on left side */}
        <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

        {/* Timeline items */}
        <div className="space-y-8 md:space-y-16">
          {chronologicalExperience.map((experience, index) => (
            <TimelineItem
              key={`${experience.company}-${index}`}
              experience={experience}
              index={index}
              isLeft={index % 2 === 0}
              totalItems={chronologicalExperience.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
