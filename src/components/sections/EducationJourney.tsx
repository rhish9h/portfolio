import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { profileData } from '../../data/profileData';
import { GraduationCap, Calendar } from 'lucide-react';

interface EducationCardProps {
  edu: typeof profileData.education[0];
  index?: number;
  isLeft: boolean;
}

function EducationCard({ edu, isLeft }: EducationCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`relative flex items-center justify-center w-full mb-12 ${
        isLeft ? 'md:justify-start' : 'md:justify-end'
      }`}
    >
      {/* Timeline node */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent border-3 border-background shadow-lg"
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full md:w-[45%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
      >
        <div className="journey-card relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur-sm p-6 shadow-lg">
          <div className="relative z-10">
            {/* Icon and header */}
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20"
              >
                <GraduationCap className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">{edu.school}</h3>
                <p className="text-muted-foreground">{edu.degree}</p>
              </div>
            </div>

            {/* Duration badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-sm"
            >
              <Calendar className="w-4 h-4 text-primary" />
              <span>{edu.duration}</span>
            </motion.div>
          </div>

          {/* Decorative gradient */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EducationJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Show in chronological order (oldest first)
  const chronologicalEducation = [...profileData.education].reverse();

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Educational Foundation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The academic journey that built the foundation for my career in software engineering.
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center line - hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent/20 to-transparent">
          <motion.div
            className="w-full bg-gradient-to-b from-accent via-accent to-accent rounded-full"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Mobile line */}
        <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

        {/* Education cards */}
        <div className="space-y-8 md:space-y-16">
          {chronologicalEducation.map((edu, index) => (
            <EducationCard
              key={index}
              edu={edu}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
