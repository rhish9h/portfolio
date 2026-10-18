import { motion } from 'framer-motion';
import {
  ArrowRight,
  Cpu,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { TypewriterEffect } from '../ui/TypewriterEffect';
import { profileData } from '../../data/profileData';

export function HeroSection() {
  const roles = [
    'Software Engineer @ Path Robotics',
    'Backend & Distributed Systems',
    'Data Pipelines & Integrations',
    'AI-Native Workflow Engineering',
    'M.S. Software Engineering @ ASU',
  ];

  const heroTechStack = [
    'Python',
    'C# / .NET',
    'TypeScript',
    'T-SQL & PostgreSQL',
    'FastAPI',
    'Spring Boot',
    'React',
    'Distributed Systems',
  ];

  return (
    <section className="relative isolate w-full overflow-hidden pt-10 pb-16 md:pt-20 md:pb-24">
      <AnimatedBackground />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Primary Narrative & CTAs */}
          <div className="flex flex-col items-start text-left lg:col-span-7">
            {/* Current Status Pill */}
            <motion.a
              href={profileData.currentCompanyUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-secondary/70 px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>
                Software Engineer at{' '}
                <span className="font-semibold underline decoration-border underline-offset-4 group-hover:decoration-foreground">
                  {profileData.currentCompany}
                </span>
              </span>
              <span className="hidden items-center gap-1 text-muted-foreground sm:inline-flex">
                · <MapPin className="h-3 w-3" /> {profileData.location}
              </span>
              <ExternalLink className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </motion.a>

            {/* Name */}
            <motion.h1
              data-dot-mask
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {profileData.name}
            </motion.h1>

            {/* Dynamic Subtitle */}
            <motion.div
              data-dot-mask
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-3 flex min-h-[2rem] items-center font-mono text-sm font-medium text-muted-foreground sm:text-base"
            >
              <span className="mr-2 text-foreground/40">/</span>
              <TypewriterEffect words={roles} className="text-foreground/90" />
            </motion.div>

            {/* Value proposition */}
            <motion.p
              data-dot-mask
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {profileData.headline} Currently building software at{' '}
              <span className="font-medium text-foreground">
                {profileData.currentCompany}
              </span>{' '}
              with 4+ years of production experience specializing in backend
              architecture, data pipelines, and complex system integrations.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#experience"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <span>View Experience</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary/70"
              >
                <span>Featured Work</span>
              </a>

              <div className="flex items-center gap-2 pl-1">
                <a
                  href={profileData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${profileData.email}`}
                  aria-label="Send Email"
                  title={`Email ${profileData.email}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Profile Identity Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border sm:h-24 sm:w-24">
                  <img
                    src="/profile.jpeg"
                    alt={profileData.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {profileData.location}
                  </div>
                  <h2 className="mt-1 font-display text-xl font-bold text-foreground">
                    {profileData.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {profileData.title} · {profileData.currentCompany}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3.5 border-t border-border pt-5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg border border-border bg-secondary/70 p-2 text-foreground">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Path Robotics · Autonomous Manufacturing
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Software Engineer building reliable systems for robotic welding platforms
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg border border-border bg-secondary/70 p-2 text-foreground">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      M.S. in Software Engineering
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Arizona State University · Featured Innovation Showcase Winner
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="mt-5 border-t border-border pt-4">
                <p className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {heroTechStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-xs font-medium text-foreground/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Impact Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {profileData.highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/25"
            >
              <div className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {item.value}
              </div>
              <div className="mt-1 text-sm font-medium text-foreground/90">
                {item.label}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
