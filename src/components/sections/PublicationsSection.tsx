import { profileData } from '../../data/profileData';
import { BookOpen, ExternalLink } from 'lucide-react';

export function PublicationsSection() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2.5">
        <div className="rounded-lg border border-border bg-secondary/70 p-2 text-foreground">
          <BookOpen className="h-4 w-4" />
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Peer-Reviewed Publications
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {profileData.publications.map((pub, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/25"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                {pub.date && (
                  <span className="rounded-md border border-border bg-secondary/60 px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                    {pub.date}
                  </span>
                )}
                {pub.citations && (
                  <span className="rounded-md border border-border bg-secondary/60 px-2.5 py-0.5 font-mono text-xs font-medium text-foreground">
                    {pub.citations}
                  </span>
                )}
              </div>

              <h4 className="mt-3 font-display text-lg font-semibold text-foreground">
                {pub.title}
              </h4>
              {pub.conference && (
                <p className="mt-1 text-xs font-medium text-foreground/80">
                  {pub.conference}
                </p>
              )}
              {pub.summary && (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {pub.summary}
                </p>
              )}
            </div>

            {pub.url && (
              <div className="mt-4 border-t border-border pt-3">
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  <span>View Publication</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
