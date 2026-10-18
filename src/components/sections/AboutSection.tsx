import { profileData } from '../../data/profileData';
import { Bot, Cpu, Database, Server } from 'lucide-react';

const focusPillars = [
  {
    icon: Server,
    title: 'Backend & Distributed Systems',
    description:
      'Designing resilient microservices and REST/SCIM/ODBC integrations using Python (FastAPI), C#/.NET, and Java (Spring Boot).',
  },
  {
    icon: Database,
    title: 'Data Pipelines & SQL Optimization',
    description:
      'Architecting multi-stage ingestion, deduplication, and HASHBYTES change-detection pipelines operating on 1M+ row tables.',
  },
  {
    icon: Cpu,
    title: 'Robotics & Real-World Software',
    description:
      'Building software for autonomous industrial robotics at Path Robotics and IoT/computer-vision safety systems like CycleSafe.',
  },
  {
    icon: Bot,
    title: 'AI-Native Engineering & Security',
    description:
      'Orchestrating multi-agent AI workflows and hardening enterprise identity, authentication, and governance platforms.',
  },
];

export function AboutSection() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Section Header */}
      <div className="mb-10">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
          01 / About
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Systems thinking from database internals to real-world hardware
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Narrative Bio */}
        <div className="space-y-5 rounded-2xl border border-border bg-card p-7 sm:p-8 lg:col-span-7">
          {profileData.bioParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-border pt-5 text-xs font-medium">
            <span className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-foreground">
              Software Engineer @ Path Robotics
            </span>
            <span className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-foreground">
              {profileData.location}
            </span>
            <span className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-foreground">
              M.S. Software Engineering · ASU
            </span>
          </div>
        </div>

        {/* 4 Engineering Pillars */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {focusPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/25"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg border border-border bg-secondary/70 p-2.5 text-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
