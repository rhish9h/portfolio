import { profileData } from '../../data/profileData';
import { Trophy } from 'lucide-react';

export function AwardsSection() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-3xl font-bold">Honors & Awards</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {profileData.awards.map((award, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="rounded-full bg-primary/10 p-2">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{award.title}</h3>
              {award.issuer && (
                <p className="text-sm text-muted-foreground">{award.issuer}</p>
              )}
              {award.date && (
                <p className="text-sm text-muted-foreground">{award.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
