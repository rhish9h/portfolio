import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { profileData } from '../../data/profileData';
import { Code2, Languages, Sparkles, Wrench } from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    title: "Technical Expertise",
    description: "Technologies and frameworks I've mastered along the way",
    skills: profileData.skills.technical,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  },
  {
    icon: Languages,
    title: "Languages",
    description: "Communication skills that connect across cultures",
    skills: profileData.skills.languages,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  }
];

const additionalSkills = [
  "Spring Boot", "React", "TypeScript", "Python", "FastAPI", 
  "Identity & Access Management", "Cybersecurity", "Cloud Computing",
  "AWS", "Azure", "Docker", "Kubernetes"
];

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mx-auto max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
          <Sparkles className="w-4 h-4" />
          Tools of the Trade
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Technologies and capabilities I've developed throughout my journey
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Skill categories */}
      <div className="grid gap-8 md:grid-cols-2 mb-16">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            className="journey-card group relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm p-8 shadow-lg"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-muted group-hover:bg-white/50 transition-colors`}>
                  <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + categoryIndex * 0.1 + index * 0.05 }}
                    className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Wrench className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Additional Technologies</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {additionalSkills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.03 }}
              className="rounded-lg bg-background/80 border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
