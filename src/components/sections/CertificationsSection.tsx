import { profileData } from '../../data/profileData';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export function CertificationsSection() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2.5">
        <div className="rounded-lg border border-border bg-secondary/70 p-2 text-foreground">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Licenses &amp; Certifications
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {profileData.certifications.map((cert, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/25"
          >
            <div className="flex items-start gap-3.5">
              <div className="rounded-lg border border-border bg-secondary/70 p-2 text-foreground">
                <Award className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-base font-semibold text-foreground">
                  {cert.name}
                </h4>
                {cert.issuer && (
                  <p className="mt-0.5 text-xs font-medium text-foreground/80">
                    {cert.issuer}
                  </p>
                )}
                {cert.date && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {cert.date}
                  </p>
                )}
                {cert.credentialId && (
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>
            </div>

            {cert.url && (
              <div className="mt-4 border-t border-border pt-3">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
