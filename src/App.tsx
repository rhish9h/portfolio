import { useEffect, useRef } from 'react'
import './styles/globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Navbar } from './components/ui/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { JourneyTimeline } from './components/sections/JourneyTimeline'
import { EducationJourney } from './components/sections/EducationJourney'
import { SkillsSection } from './components/sections/SkillsSection'
import { CertificationsSection } from './components/sections/CertificationsSection'
import { AwardsSection } from './components/sections/AwardsSection'
import { PublicationsSection } from './components/sections/PublicationsSection'
import { ContactSection } from './components/sections/ContactSection'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { WaveDivider } from './components/ui/WaveDivider'
import { WorldScene } from './components/ui/WorldScene'
import { motion } from 'framer-motion'

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
        <ScrollProgress />
        
        
        <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
          <Navbar />
        </header>

        <main ref={mainRef} className="relative z-10 flex w-full flex-1 flex-col items-center justify-center pb-16">
          {/* 3D World with winding road, cyclist, trees, huts */}
          <WorldScene />
          {/* Content sections float above the 3D world */}

          {/* Hero Section - Full height introduction */}
          <section id="hero" className="relative w-full">
            <HeroSection />
          </section>

          {/* Wave divider */}
          <div className="relative w-full h-20 overflow-hidden">
            <WaveDivider />
          </div>

          {/* About Section - The story begins */}
          <section id="about" className="journey-gradient-1 relative w-full py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="container mx-auto max-w-6xl px-6 md:px-8"
            >
              <div className="journey-shell p-8 md:p-12">
                <AboutSection />
              </div>
            </motion.div>
          </section>

          {/* Education Journey Section */}
          <section id="education" className="journey-gradient-2 relative w-full py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="container mx-auto max-w-6xl px-6 md:px-8"
            >
              <div className="journey-shell p-8 md:p-12">
                <EducationJourney />
              </div>
            </motion.div>
          </section>

          {/* Career Journey Timeline */}
          <section id="experience" className="journey-gradient-3 relative w-full py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="container mx-auto max-w-6xl px-6 md:px-8"
            >
              <div className="journey-shell p-8 md:p-12">
                <JourneyTimeline />
              </div>
            </motion.div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="relative w-full py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="container mx-auto max-w-6xl px-6 md:px-8"
            >
              <div className="journey-shell p-8 md:p-12">
                <SkillsSection />
              </div>
            </motion.div>
          </section>

          {/* Achievements Section - Combining Awards, Publications, Certifications */}
          <section id="achievements" className="relative w-full bg-gradient-to-b from-background via-muted/20 to-background py-24 md:py-32">
            <div className="container mx-auto max-w-6xl space-y-12 px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="journey-shell p-8 md:p-10">
                  <CertificationsSection />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="journey-shell p-8 md:p-10">
                  <AwardsSection />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="journey-shell p-8 md:p-10">
                  <PublicationsSection />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Section - The journey continues */}
          <section id="contact" className="relative w-full py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="container mx-auto max-w-6xl px-6 md:px-8"
            >
              <div className="journey-shell p-8 md:p-12">
                <ContactSection />
              </div>
            </motion.div>
          </section>
        </main>

        <motion.footer
          className="w-full border-t relative z-10 bg-background/85 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto max-w-6xl px-6 py-8 text-center md:px-8">
            <p className="mb-4 text-muted-foreground">
              Let's continue the journey together
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
