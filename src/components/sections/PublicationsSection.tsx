import { profileData } from '../../data/profileData';
import { BookOpen } from 'lucide-react';

export function PublicationsSection() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-3xl font-bold">Publications</h2>
      <div className="space-y-4">
        {profileData.publications.map((pub, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="rounded-full bg-primary/10 p-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{pub.title}</h3>
              {pub.conference && (
                <p className="text-sm text-muted-foreground">
                  {pub.conference}
                </p>
              )}
              {pub.date && (
                <p className="text-sm text-muted-foreground">{pub.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
