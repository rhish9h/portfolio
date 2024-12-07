import { profileData } from '../../data/profileData';

export function SkillsSection() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-3xl font-bold">Skills</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.technical.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.languages.map((language, index) => (
              <span
                key={index}
                className="rounded-full bg-secondary/50 px-3 py-1 text-sm font-medium"
              >
                {language}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
