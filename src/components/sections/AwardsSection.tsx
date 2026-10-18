import { profileData } from '../../data/profileData';
import { Trophy } from 'lucide-react';

export function AwardsSection() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2.5">
        <div className="rounded-lg border border-border bg-secondary/70 p-2 text-foreground">
          <Trophy className="h-4 w-4" />
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Honors &amp; Awards
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {profileData.awards.map((award, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/25"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="rounded-lg border border-border bg-secondary/70 p-2 text-foreground">
                  <Trophy className="h-4 w-4" />
                </div>
                {award.date && (
                  <span className="rounded-md border border-border bg-secondary/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {award.date}
                  </span>
                )}
              </div>
              <h4 className="font-display text-base font-semibold text-foreground">
                {award.title}
              </h4>
              {award.issuer && (
                <p className="mt-1 text-xs font-medium text-foreground/80">
                  {award.issuer}
                </p>
              )}
              {award.description && (
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {award.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
