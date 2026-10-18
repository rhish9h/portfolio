import { useState } from 'react';
import { profileData } from '../../data/profileData';
import {
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profileData.email}`;
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
        <div className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {profileData.location} · Open to Connect
        </div>

        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Let’s build something impactful together
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          Whether you want to discuss backend architecture, distributed data
          systems, robotics software, or engineering collaborations, feel free
          to reach out.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profileData.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            <span>{profileData.email}</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Copied Email</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-muted-foreground" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <a
            href={profileData.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </a>

          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </a>
        </div>
      </div>
    </div>
  );
}
