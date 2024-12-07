import { profileData } from '../../data/profileData';

export function EducationSection() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-3xl font-bold">Education</h2>
      <div className="space-y-6">
        {profileData.education.map((edu, index) => (
          <div
            key={index}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold">{edu.school}</h3>
            <p className="text-lg text-muted-foreground">{edu.degree}</p>
            <p className="text-sm text-muted-foreground">{edu.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
