import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-primary/10">
          <img
            src="/avatar.jpg"
            alt="Rhishabh Hattarki"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
      >
        Rhishabh Hattarki
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8 flex flex-col space-y-2 text-lg text-muted-foreground"
      >
        <span>Software Engineer</span>
        <span>Lifelong Learner</span>
        <span>Technology Enthusiast</span>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex space-x-4"
      >
        <a
          href="mailto:rhishabh@example.com"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail className="h-5 w-5" />
          <span className="sr-only">Email</span>
        </a>
        <a
          href="https://github.com/yourusername"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </a>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12"
      >
        <a
          href="#about"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Learn More
        </a>
      </motion.div>
    </div>
  );
}
