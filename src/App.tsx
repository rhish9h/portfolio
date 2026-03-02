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
import { FloatingParticles } from './components/ui/FloatingParticles'
import { WaveDivider } from './components/ui/WaveDivider'
import { JourneyTraveler, JourneyScenery } from './components/ui/JourneyTraveler'
import { JourneyPath } from './components/ui/JourneyPath'
import { JourneyLandmarks } from './components/ui/JourneyLandmarks'
import { motion, useScroll, useTransform } from 'framer-motion'

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-background text-foreground relative overflow-x-hidden">
        <ScrollProgress />
        <FloatingParticles />
        
        {/* Journey Visual Elements */}
        <JourneyScenery />
        <JourneyLandmarks />
        <JourneyPath />
        <JourneyTraveler />
        
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Navbar />
        </header>

        <main ref={mainRef} className="relative flex w-full flex-1 flex-col items-center justify-center">
          {/* Parallax background layer */}
          <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ y: backgroundY }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background opacity-50" />
          </motion.div>

          {/* Hero Section - Full height introduction */}
          <section id="hero" className="relative w-full">
            <HeroSection />
          </section>

          {/* Wave divider */}
          <div className="relative w-full h-20 overflow-hidden">
            <WaveDivider />
          </div>

          {/* About Section - The story begins */}
          <section id="about" className="relative w-full py-24 md:py-32 journey-gradient-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="container mx-auto max-w-5xl px-6 md:px-8"
            >
              <AboutSection />
            </motion.div>
          </section>

          {/* Education Journey Section */}
          <section id="education" className="relative w-full py-24 md:py-32 journey-gradient-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="container mx-auto max-w-5xl px-6 md:px-8"
            >
              <EducationJourney />
            </motion.div>
          </section>

          {/* Career Journey Timeline */}
          <section id="experience" className="relative w-full py-24 md:py-32 journey-gradient-3">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="container mx-auto max-w-5xl px-6 md:px-8"
            >
              <JourneyTimeline />
            </motion.div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="relative w-full py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="container mx-auto max-w-5xl px-6 md:px-8"
            >
              <SkillsSection />
            </motion.div>
          </section>

          {/* Achievements Section - Combining Awards, Publications, Certifications */}
          <section id="achievements" className="relative w-full py-24 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background">
            <div className="container mx-auto max-w-5xl px-6 md:px-8 space-y-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <CertificationsSection />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <AwardsSection />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <PublicationsSection />
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
              className="container mx-auto max-w-5xl px-6 md:px-8"
            >
              <ContactSection />
            </motion.div>
          </section>
        </main>

        <motion.footer
          className="w-full border-t relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto max-w-5xl px-6 py-8 text-center md:px-8">
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
