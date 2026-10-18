import { profileData } from '../../data/profileData';
import {
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
} from 'lucide-react';

export function ExperienceSection() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Section Header */}
      <div className="mb-12">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
          02 / Experience
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Professional Experience
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          4+ years building backend microservices, enterprise integrations, data
          pipelines, and robotics software across production environments.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative space-y-6 before:absolute before:top-4 before:bottom-4 before:left-3 before:w-px before:bg-border md:before:left-5">
        {profileData.experiences.map((experience, index) => {
          const roles =
            experience.roles && experience.roles.length > 0
              ? experience.roles
              : [
                  {
                    title: experience.title,
                    startDate: experience.startDate,
                    endDate: experience.endDate,
                    location: experience.location,
                    bullets: experience.bullets,
                    skills: experience.skills,
                  },
                ];

          return (
            <div
              key={`${experience.company}-${index}`}
              className="relative pl-10 md:pl-14"
            >
              {/* Timeline Node */}
              <div
                className={`absolute top-7 left-3 flex h-2.5 w-2.5 -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-background md:left-5 ${
                  experience.current
                    ? 'bg-emerald-500'
                    : 'bg-muted-foreground/60'
                }`}
              />

              {/* Company Card */}
              <div
                className={`rounded-2xl border bg-card p-6 transition-colors sm:p-8 ${
                  experience.current
                    ? 'border-foreground/30'
                    : 'border-border hover:border-foreground/25'
                }`}
              >
                {/* Company Header */}
                <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                        {experience.companyUrl ? (
                          <a
                            href={experience.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:underline"
                          >
                            <span>{experience.company}</span>
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                          </a>
                        ) : (
                          experience.company
                        )}
                      </h3>

                      {experience.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Current
                        </span>
                      )}
                    </div>

                    {experience.industry && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" />
                        {experience.industry}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-1 text-xs text-muted-foreground sm:items-end">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-foreground">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {experience.startDate} – {experience.endDate}
                    </span>
                    {experience.location && (
                      <span className="inline-flex items-center gap-1 px-1">
                        <MapPin className="h-3 w-3" />
                        {experience.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Roles within Company */}
                <div className="mt-6 space-y-6">
                  {roles.map((role, roleIdx) => (
                    <div
                      key={`${role.title}-${roleIdx}`}
                      className={roleIdx > 0 ? 'border-t border-border pt-6' : ''}
                    >
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <h4 className="font-display text-base font-semibold text-foreground sm:text-lg">
                          {role.title}
                        </h4>
                        {roles.length > 1 && (
                          <span className="font-mono text-xs text-muted-foreground">
                            {role.startDate} – {role.endDate}
                            {role.location ? ` · ${role.location}` : ''}
                          </span>
                        )}
                      </div>

                      <ul className="mt-3.5 space-y-2.5">
                        {role.bullets.map((bullet, bulletIndex) => (
                          <li
                            key={bulletIndex}
                            className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {role.skills && role.skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {role.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-foreground/85"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
