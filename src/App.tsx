import { useState } from 'react'
import './styles/globals.css'
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

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </header>

      <main className="flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section id="hero" className="w-full py-20">
          <div className="container px-4">
            <HeroSection />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full bg-accent/10 py-20">
          <div className="container px-4">
            <AboutSection />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="w-full py-20">
          <div className="container px-4">
            <ExperienceSection />
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="w-full bg-accent/10 py-20">
          <div className="container px-4">
            <EducationSection />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-20">
          <div className="container px-4">
            <SkillsSection />
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="w-full bg-accent/10 py-20">
          <div className="container px-4">
            <CertificationsSection />
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards" className="w-full py-20">
          <div className="container px-4">
            <AwardsSection />
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="w-full bg-accent/10 py-20">
          <div className="container px-4">
            <PublicationsSection />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-20">
          <div className="container px-4">
            <ContactSection />
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          {new Date().getFullYear()} Rhishabh Hattarki. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
