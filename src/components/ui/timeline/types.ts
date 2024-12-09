import { Experience, Education } from '../../../data/profileData';

export interface TimelineEvent {
  id: string;
  type: 'education' | 'experience';
  title: string;
  subtitle: string;
  startDate: Date;
  endDate: Date | null;
  duration?: string;
  location?: string;
  bullets?: string[];
}

export interface TimelineProps {
  experiences: Experience[];
  education: Education[];
}
