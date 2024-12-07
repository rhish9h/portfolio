import { profileData } from '../../data/profileData';
import { Award } from 'lucide-react';

export function CertificationsSection() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-3xl font-bold">Certifications</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {profileData.certifications.map((cert, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="rounded-full bg-primary/10 p-2">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{cert.name}</h3>
              {cert.issuer && (
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              )}
              {cert.date && (
                <p className="text-sm text-muted-foreground">{cert.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
