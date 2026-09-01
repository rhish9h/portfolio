export interface ExperienceRole {
    title: string;
    startDate: string;
    endDate: string;
    bullets: string[];
    skills?: string[];
}
export interface Experience {
    company: string;
    location?: string;
    roles: ExperienceRole[];
}
export interface Education {
    school: string;
    degree: string;
    duration: string;
}
export interface Certification {
    name: string;
    issuer?: string;
    date?: string;
}
export interface Publication {
    title: string;
    conference?: string;
    date?: string;
}
export interface Award {
    title: string;
    issuer?: string;
    date?: string;
}
export interface ProfileData {
    name: string;
    title: string;
    tagline: string;
    email: string;
    linkedIn: string;
    summary: string;
    experiences: Experience[];
    education: Education[];
    skills: {
        technical: string[];
        languages: string[];
    };
    certifications: Certification[];
    awards: Award[];
    publications: Publication[];
}
export declare const profileData: ProfileData;
