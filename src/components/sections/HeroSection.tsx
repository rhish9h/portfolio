import { profileData } from '../../data/profileData';
import { Github, Linkedin, Mail } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Avatar placeholder - replace src with actual image */}
      <div className="mb-8">
        <div className="h-40 w-40 overflow-hidden rounded-full bg-muted">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=rhishabh"
            alt={profileData.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <h1 className="mb-4 text-4xl font-bold">{profileData.name}</h1>
      <p className="mb-6 text-xl text-muted-foreground">{profileData.tagline}</p>

      <div className="flex gap-4">
        <a
          href={`mailto:${profileData.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Mail className="h-4 w-4" />
          Email Me
        </a>
        <a
          href={profileData.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold hover:bg-accent/90"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href="https://github.com/rhish9h"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold hover:bg-accent/90"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </div>
  );
}
