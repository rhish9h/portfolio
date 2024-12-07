import { profileData } from '../../data/profileData';
import { Mail, Linkedin, Github } from 'lucide-react';

export function ContactSection() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="mb-6 text-3xl font-bold">Get in Touch</h2>
      <p className="mb-8 text-lg text-muted-foreground">
        Feel free to reach out for collaborations or just a friendly hello
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href={`mailto:${profileData.email}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent sm:w-auto"
        >
          <Mail className="h-5 w-5" />
          <span>{profileData.email}</span>
        </a>
        <a
          href={profileData.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent sm:w-auto"
        >
          <Linkedin className="h-5 w-5" />
          <span>LinkedIn Profile</span>
        </a>
        <a
          href="https://github.com/rhish9h"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent sm:w-auto"
        >
          <Github className="h-5 w-5" />
          <span>GitHub Profile</span>
        </a>
      </div>
    </div>
  );
}
