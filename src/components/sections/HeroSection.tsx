import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { TypewriterEffect } from '../ui/TypewriterEffect';

export function HeroSection() {
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'Problem Solver',
    'Tech Enthusiast',
    'Lifelong Learner'
  ];

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-background/50 backdrop-blur-[2px]">
      {/* Background */}
      <AnimatedBackground />

      {/* Content Container */}
      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 flex flex-col items-center justify-center px-4 text-center"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="mb-8 group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-primary/10 shadow-xl transition-transform duration-300 group-hover:border-primary/30">
            <img
              src="/avatar.jpg"
              alt="Rhishabh Hattarki"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
        >
          <span className="relative">
            Rhishabh Hattarki
            <motion.span
              className="absolute -inset-1 -z-10 rounded-lg bg-primary/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            />
          </span>
        </motion.h1>

        {/* Roles */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8 text-lg text-muted-foreground"
        >
          <TypewriterEffect words={roles} className="font-mono" />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex space-x-4"
        >
          <motion.a
            href="mailto:rhish9h@gmail.com"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg transition-all hover:bg-primary/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="sr-only">Email</span>
          </motion.a>
          <motion.a
            href="https://github.com/rhish9h"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg transition-all hover:bg-primary/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="sr-only">GitHub</span>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/rhishabh-hattarki"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg transition-all hover:bg-primary/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="sr-only">LinkedIn</span>
          </motion.a>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12"
        >
          <motion.a
            href="#about"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Learn More</span>
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"
              style={{
                maskImage: 'linear-gradient(to right, transparent, white, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, white, transparent)',
              }}
              animate={{
                x: ['100%', '-100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'linear',
              }}
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
