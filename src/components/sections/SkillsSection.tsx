import { profileData } from '../../data/profileData';
import {
  Code2,
  Database,
  Globe,
  Layers,
  Server,
} from 'lucide-react';

const categoryIcons = [Code2, Server, Database, Layers];

export function SkillsSection() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Section Header */}
      <div className="mb-10">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
          04 / Technical Stack
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Skills &amp; Technologies
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          Production experience across backend engineering, data pipelines,
          enterprise integrations, cloud platforms, and full-stack development.
        </p>
      </div>

      {/* 2x2 Category Bento Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {profileData.skills.categories.map((category, index) => {
          const Icon = categoryIcons[index % categoryIcons.length];
          return (
            <div
              key={category.name}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/25 sm:p-7"
            >
              <div className="flex items-start gap-3.5">
                <div className="rounded-lg border border-border bg-secondary/70 p-2.5 text-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:border-foreground/30 hover:bg-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Spoken Languages Bar */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-6 sm:p-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-border bg-secondary/70 p-2.5 text-foreground">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">
                Spoken Languages
              </h3>
              <p className="text-xs text-muted-foreground">
                Multilingual communication across global engineering teams
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {profileData.skills.languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs"
              >
                <span className="font-semibold text-foreground">
                  {lang.name}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
