import { profileData } from '../../data/profileData';

export function ExperienceSection() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-3xl font-bold">Experience</h2>
      <div className="space-y-8">
        {profileData.experiences.map((experience, index) => (
          <div
            key={`${experience.company}-${index}`}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h3 className="text-xl font-semibold">{experience.title}</h3>
                <p className="text-lg text-muted-foreground">
                  {experience.company}
                </p>
                {experience.location && (
                  <p className="text-sm text-muted-foreground">
                    {experience.location}
                  </p>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {experience.startDate} – {experience.endDate}
              </div>
            </div>
            <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
              {experience.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
