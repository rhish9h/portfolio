import { useState, useEffect } from 'react'
import './styles/globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Navbar } from './components/ui/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { EducationSection } from './components/sections/EducationSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { CertificationsSection } from './components/sections/CertificationsSection'
import { AwardsSection } from './components/sections/AwardsSection'
import { PublicationsSection } from './components/sections/PublicationsSection'
import { ContactSection } from './components/sections/ContactSection'
import { motion } from 'framer-motion'

// Fade in animation for sections
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

function App() {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Navbar />
        </header>

        <main className="flex w-full flex-1 flex-col items-center justify-center">
          {/* Hero Section */}
          <motion.section
            id="hero"
            className="w-full py-12 md:py-20"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <HeroSection />
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section
            id="about"
            className="w-full py-12 md:py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <AboutSection />
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            id="experience"
            className="w-full py-12 md:py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <ExperienceSection />
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            id="education"
            className="w-full py-12 md:py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <EducationSection />
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            id="skills"
            className="w-full py-12 md:py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <SkillsSection />
            </div>
          </motion.section>

          {/* Certifications Section */}
          <motion.section
            id="certifications"
            className="w-full py-12 md:py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <CertificationsSection />
            </div>
          </motion.section>

          {/* Awards Section */}
          <motion.section
            id="awards"
            className="w-full py-12 md:py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <AwardsSection />
            </div>
          </motion.section>

          {/* Publications Section */}
          <motion.section
            id="publications"
            className="w-full py-12 md:py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <PublicationsSection />
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            id="contact"
            className="w-full py-12 md:py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <ContactSection />
            </div>
          </motion.section>
        </main>

        <motion.footer
          className="w-full border-t"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="container mx-auto max-w-5xl px-6 py-8 text-center md:px-8">
            <p className="mb-4 text-muted-foreground">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} Rhishabh Hattarki. All rights reserved.
            </p>
          </div>
        </motion.footer>
      </div>
    </ThemeProvider>
  )
}

export default App
