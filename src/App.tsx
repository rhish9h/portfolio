import { useEffect, useRef, useState } from 'react'
import './styles/globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Navbar } from './components/ui/Navbar'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { WorldScene } from './components/ui/WorldScene'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// Import sections for popups
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { JourneyTimeline } from './components/sections/JourneyTimeline'
import { EducationJourney } from './components/sections/EducationJourney'
import { SkillsSection } from './components/sections/SkillsSection'
import { CertificationsSection } from './components/sections/CertificationsSection'
import { AwardsSection } from './components/sections/AwardsSection'
import { PublicationsSection } from './components/sections/PublicationsSection'
import { ContactSection } from './components/sections/ContactSection'

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const renderPopupContent = () => {
    switch (activeSection) {
      case 'hero': return <HeroSection />;
      case 'about': return <AboutSection />;
      case 'education': return <EducationJourney />;
      case 'experience': return <JourneyTimeline />;
      case 'skills': return <SkillsSection />;
      case 'achievements': return (
        <div className="space-y-12">
          <CertificationsSection />
          <AwardsSection />
          <PublicationsSection />
        </div>
      );
      case 'contact': return <ContactSection />;
      default: return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
        <ScrollProgress />
        
        <header className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
          <Navbar />
        </header>

        {/* The tall container to allow scrolling */}
        <div className="h-[500vh] w-full" />

        <main ref={mainRef} className="fixed inset-0 z-10 flex w-full flex-1 flex-col items-center justify-center pointer-events-none">
          {/* 3D World with interactive elements */}
          <div className="pointer-events-auto w-full h-full relative z-20">
            <WorldScene onOpenSection={setActiveSection} />
          </div>
        </main>

        <AnimatePresence>
          {activeSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4 md:p-12 overflow-y-auto"
              onClick={() => setActiveSection(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl rounded-2xl border border-border bg-card p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setActiveSection(null)}
                  className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted transition-colors z-50"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="mt-4">
                  {renderPopupContent()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}

export default App
