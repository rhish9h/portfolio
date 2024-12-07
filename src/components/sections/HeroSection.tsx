import { profileData } from '../../data/profileData';
import { Github, Linkedin, Mail } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
      {/* Avatar placeholder - replace src with actual image */}
      <div className="mb-8">
        <div className="relative h-40 w-40 overflow-hidden rounded-full bg-muted">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=rhishabh"
            alt={profileData.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{profileData.name}</h1>
      <p className="mb-8 max-w-2xl text-xl text-muted-foreground md:text-2xl">{profileData.tagline}</p>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={`mailto:${profileData.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Mail className="h-4 w-4" />
          Email Me
        </a>
        <a
          href={profileData.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent/90"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href="https://github.com/rhish9h"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent/90"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </div>
  );
}
