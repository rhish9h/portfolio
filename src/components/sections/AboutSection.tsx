import { profileData } from '../../data/profileData';

export function AboutSection() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 text-3xl font-bold">About Me</h2>
      <div className="prose prose-slate dark:prose-invert">
        <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
          {profileData.summary}
        </p>
      </div>
    </div>
  );
}
