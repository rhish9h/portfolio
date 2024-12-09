import { Experience, Education } from '../../../data/profileData';
import { TimelineEvent } from './types';

const parseDate = (dateStr: string): Date => {
  if (dateStr.toLowerCase() === 'present') {
    return new Date(); // Current date for 'Present'
  }
  
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date;
  }
  
  throw new Error(`Unable to parse date: ${dateStr}`);
};

const getEndDate = (date: Date | null): number => {
  if (!date) {
    // If endDate is null (meaning 'Present'), use future date to ensure it appears first
    return new Date('2100-01-01').getTime();
  }
  return date.getTime();
};

export const mergeAndSortEvents = (
  experiences: Experience[],
  education: Education[]
): TimelineEvent[] => {
  const events: TimelineEvent[] = [
    ...experiences.map((exp): TimelineEvent => ({
      id: `exp-${exp.company}-${exp.startDate}`,
      type: 'experience',
      title: exp.title,
      subtitle: exp.company,
      startDate: parseDate(exp.startDate),
      endDate: exp.endDate.toLowerCase() === 'present' ? null : parseDate(exp.endDate),
      location: exp.location,
      bullets: exp.bullets,
    })),
    ...education.map((edu): TimelineEvent => ({
      id: `edu-${edu.school}-${edu.startDate}`,
      type: 'education',
      title: edu.degree,
      subtitle: edu.school,
      startDate: parseDate(edu.startDate),
      endDate: edu.endDate.toLowerCase() === 'present' ? null : parseDate(edu.endDate),
      bullets: edu.bullets,
    })),
  ];

  // Sort events by end date (most recent first)
  // If end dates are equal, sort by start date (most recent first)
  return events.sort((a, b) => {
    const endDateA = getEndDate(a.endDate);
    const endDateB = getEndDate(b.endDate);
    
    if (endDateA === endDateB) {
      return b.startDate.getTime() - a.startDate.getTime();
    }
    return endDateB - endDateA;
  });
};

export const calculatePosition = (
  index: number,
  totalEvents: number,
  containerWidth: number,
  containerHeight: number,
  isHorizontal: boolean
): { x: number; y: number } => {
  if (isHorizontal) {
    const x = (containerWidth * index) / (totalEvents - 1);
    return { x, y: containerHeight / 2 };
  } else {
    const y = (containerHeight * index) / (totalEvents - 1);
    return { x: containerWidth / 2, y };
  }
};
