import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { profileData } from '../../data/profileData';
import { Trophy, Star, Medal, Award as AwardIcon } from 'lucide-react';

const awardIcons = [Trophy, Star, Medal, AwardIcon];

export function AwardsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mx-auto max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
          Recognition
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Honors & Awards</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Milestones of excellence and impactful contributions
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Awards grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {profileData.awards.map((award, index) => {
          const Icon = awardIcons[index % awardIcons.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="journey-card group relative overflow-hidden flex items-start gap-4 rounded-xl border bg-card/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-3 group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-colors">
                  <Icon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight mb-1">{award.title}</h3>
                  {award.issuer && (
                    <p className="text-sm text-muted-foreground">{award.issuer}</p>
                  )}
                  {award.date && (
                    <p className="text-sm text-muted-foreground">{award.date}</p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
