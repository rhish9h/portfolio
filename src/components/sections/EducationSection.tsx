import { profileData } from '../../data/profileData';
import { Calendar, GraduationCap, MapPin } from 'lucide-react';

export function EducationSection() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
          05 / Academic Background
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Education
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {profileData.education.map((edu, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-colors hover:border-foreground/25"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-lg border border-border bg-secondary/70 p-2.5 text-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-foreground">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  {edu.duration}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                {edu.school}
              </h3>
              <p className="mt-1 text-sm font-medium text-foreground/85">
                {edu.degree}
              </p>

              {edu.location && (
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {edu.location}
                </p>
              )}

              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  {edu.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
