import { useState } from 'react'
import './styles/globals.css'
import { Navbar } from './components/ui/Navbar'
import { HeroSection } from './components/sections/HeroSection'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section id="hero" className="py-12">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about" className="py-12">
          {/* About content will go here */}
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12">
          {/* Experience content will go here */}
        </section>

        {/* Education Section */}
        <section id="education" className="py-12">
          {/* Education content will go here */}
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12">
          {/* Skills content will go here */}
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-12">
          {/* Certifications content will go here */}
        </section>

        {/* Awards Section */}
        <section id="awards" className="py-12">
          {/* Awards content will go here */}
        </section>

        {/* Publications Section */}
        <section id="publications" className="py-12">
          {/* Publications content will go here */}
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12">
          {/* Contact content will go here */}
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
