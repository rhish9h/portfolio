import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { profileData } from '../../data/profileData';
import { Quote, Lightbulb, Target, Users } from 'lucide-react';

const journeyHighlights = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Building solutions at the intersection of cybersecurity and software engineering"
  },
  {
    icon: Target,
    title: "Impact",
    description: "Creating systems that safeguard identities and enable organizations to thrive"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Partnering with institutions like ASU and the Rob Dollar Foundation"
  }
];

export function AboutSection() {
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
          The Beginning of a Journey
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mb-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-muted/50 to-accent/5 border shadow-lg"
      >
        <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
        <blockquote className="text-xl md:text-2xl font-medium text-center italic">
          "I'm a builder of solutions, driven by a relentless curiosity to turn complex challenges into impactful innovations."
        </blockquote>
      </motion.div>

      {/* Journey highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {journeyHighlights.map((highlight, index) => (
          <motion.div
            key={highlight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            className="journey-card group p-6 rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all"
          >
            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
              <highlight.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{highlight.title}</h3>
            <p className="text-sm text-muted-foreground">{highlight.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="prose prose-slate dark:prose-invert max-w-none"
      >
        <div className="text-muted-foreground leading-relaxed space-y-4 whitespace-pre-wrap">
          {profileData.summary.split('\n\n').map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.15 }}
              className={index === 0 ? "text-lg font-medium text-foreground" : ""}
            >
              {paragraph.trim()}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Journey CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-muted-foreground mb-4">Continue scrolling to follow my journey</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/30 mx-auto flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
}
