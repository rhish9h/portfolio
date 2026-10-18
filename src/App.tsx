import './styles/globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { AwardsSection } from './components/sections/AwardsSection';
import { PublicationsSection } from './components/sections/PublicationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { profileData } from './data/profileData';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

function ProjectsSection() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
          03 / Selected Work
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Featured Projects &amp; Systems
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          End-to-end systems spanning IoT &amp; computer-vision safety hardware,
          million-row enterprise data pipelines, multi-agent AI tooling, and
          real-time ML network security.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {profileData.projects.map((project) => (
          <div
            key={project.title}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-colors hover:border-foreground/25"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {project.period}
                </span>
                {project.badge && (
                  <span className="rounded-md border border-border bg-secondary/70 px-2.5 py-0.5 font-mono text-xs font-medium text-foreground">
                    {project.badge}
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                {project.title}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-foreground/80">
                {project.subtitle}
              </p>
              {project.association && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {project.association}
                </p>
              )}

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <ul className="mt-4 space-y-2">
                {project.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-foreground/85"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    <span>{project.linkLabel || 'View Project'}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full">
          <Navbar />
        </header>

        <main className="flex w-full flex-1 flex-col items-center">
          {/* Hero Section */}
          <div id="hero" className="w-full">
            <HeroSection />
          </div>

          {/* About Section */}
          <motion.section
            id="about"
            className="w-full scroll-mt-20 border-t border-border/70 py-16 md:py-24"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
          >
            <div className="mx-auto max-w-6xl px-6">
              <AboutSection />
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            id="experience"
            className="w-full scroll-mt-20 border-t border-border/70 py-16 md:py-24"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
          >
            <div className="mx-auto max-w-6xl px-6">
              <ExperienceSection />
            </div>
          </motion.section>

          {/* Featured Projects Section */}
          <motion.section
            id="projects"
            className="w-full scroll-mt-20 border-t border-border/70 py-16 md:py-24"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
          >
            <div className="mx-auto max-w-6xl px-6">
              <ProjectsSection />
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            id="skills"
            className="w-full scroll-mt-20 border-t border-border/70 py-16 md:py-24"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
          >
            <div className="mx-auto max-w-6xl px-6">
              <SkillsSection />
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            id="education"
            className="w-full scroll-mt-20 border-t border-border/70 py-16 md:py-24"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
          >
            <div className="mx-auto max-w-6xl px-6">
              <EducationSection />
            </div>
          </motion.section>

          {/* Credentials, Publications & Awards Section */}
          <motion.section
            id="credentials"
            className="w-full scroll-mt-20 border-t border-border/70 py-16 md:py-24"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
          >
            <div className="mx-auto max-w-6xl space-y-16 px-6">
              <div>
                <p className="mb-8 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  06 / Credentials &amp; Recognition
                </p>
                <div id="certifications" className="scroll-mt-24">
                  <CertificationsSection />
                </div>
              </div>
              <div id="publications" className="scroll-mt-24">
                <PublicationsSection />
              </div>
              <div id="awards" className="scroll-mt-24">
                <AwardsSection />
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            id="contact"
            className="w-full scroll-mt-20 border-t border-border/70 py-16 md:py-24"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
          >
            <div className="mx-auto max-w-6xl px-6">
              <ContactSection />
            </div>
          </motion.section>
        </main>

        <footer className="w-full border-t border-border/70">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="font-display font-semibold text-foreground">
                {profileData.name}
              </span>
              <span>·</span>
              <span>
                {profileData.title} at {profileData.currentCompany}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {profileData.name}. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
