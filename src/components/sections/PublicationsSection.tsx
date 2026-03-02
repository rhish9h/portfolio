import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { profileData } from '../../data/profileData';
import { BookOpen, FileText, ScrollText } from 'lucide-react';

const publicationIcons = [BookOpen, FileText, ScrollText];

export function PublicationsSection() {
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
          Research & Thought Leadership
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Publications</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Contributing to the field through research and knowledge sharing
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Publications list */}
      <div className="space-y-4">
        {profileData.publications.map((pub, index) => {
          const Icon = publicationIcons[index % publicationIcons.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="journey-card group relative overflow-hidden flex items-start gap-4 rounded-xl border bg-card/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight mb-2">{pub.title}</h3>
                  {pub.conference && (
                    <p className="text-sm text-muted-foreground">
                      {pub.conference}
                    </p>
                  )}
                  {pub.date && (
                    <p className="text-sm text-muted-foreground">{pub.date}</p>
                  )}
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute right-4 top-4 text-xs font-mono text-muted-foreground/30">
                #{String(index + 1).padStart(2, '0')}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
