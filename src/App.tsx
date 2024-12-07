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
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Navbar />
        </header>

        <main className="flex flex-col items-center justify-center">
          {/* Hero Section */}
          <motion.section
            id="hero"
            className="w-full py-20"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="container px-4">
              <HeroSection />
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section
            id="about"
            className="w-full bg-accent/5 py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container px-4">
              <AboutSection />
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            id="experience"
            className="w-full py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container px-4">
              <ExperienceSection />
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            id="education"
            className="w-full bg-accent/5 py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container px-4">
              <EducationSection />
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            id="skills"
            className="w-full py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container px-4">
              <SkillsSection />
            </div>
          </motion.section>

          {/* Certifications Section */}
          <motion.section
            id="certifications"
            className="w-full bg-accent/5 py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container px-4">
              <CertificationsSection />
            </div>
          </motion.section>

          {/* Awards Section */}
          <motion.section
            id="awards"
            className="w-full py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container px-4">
              <AwardsSection />
            </div>
          </motion.section>

          {/* Publications Section */}
          <motion.section
            id="publications"
            className="w-full bg-accent/5 py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container px-4">
              <PublicationsSection />
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            id="contact"
            className="w-full py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="container px-4">
              <ContactSection />
            </div>
          </motion.section>
        </main>

        <motion.footer
          className="border-t"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="container mx-auto px-4 py-8 text-center">
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
