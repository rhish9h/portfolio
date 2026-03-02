import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { profileData } from '../../data/profileData';
import { Award, Shield, CheckCircle2 } from 'lucide-react';

const certificationIcons = [Shield, CheckCircle2, Award, Shield];

export function CertificationsSection() {
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
          Professional Credentials
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Validated expertise and continuous learning milestones
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Certifications grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {profileData.certifications.map((cert, index) => {
          const Icon = certificationIcons[index % certificationIcons.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="journey-card group relative overflow-hidden flex items-start gap-4 rounded-xl border bg-card/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="rounded-xl bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight mb-1">{cert.name}</h3>
                  {cert.issuer && (
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  )}
                  {cert.date && (
                    <p className="text-sm text-muted-foreground">{cert.date}</p>
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
