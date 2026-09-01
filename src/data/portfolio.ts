// Stores the public portfolio facts consumed by responses and visual displays.
export const portfolioData = {
  name: 'Rhishabh',
  role: 'Software Engineer',
  intro: 'I build reliable backend systems, cloud solutions, and interactive products.',
  metrics: [
    { value: '3+', label: 'Years of experience' },
    { value: '50K+', label: 'Records processed at scale' },
    { value: 'ASU', label: 'M.S. Software Engineering' },
  ],
  projects: [
    {
      id: 'halo',
      name: 'Halo',
      eyebrow: 'Interactive portfolio',
      description: 'An expressive 3D guide that turns a portfolio into a playful conversation.',
      tags: ['React', 'Three.js', 'Interaction design'],
    },
    {
      id: 'scalable-systems',
      name: 'Scalable systems',
      eyebrow: 'Backend and cloud',
      description: 'Reliable services and data workflows designed around clear APIs and operational simplicity.',
      tags: ['System design', 'Cloud', 'Data'],
    },
    {
      id: 'interactive-products',
      name: 'Interactive products',
      eyebrow: 'Frontend and tools',
      description: 'Focused interfaces and developer tools that make complex systems easier to use.',
      tags: ['TypeScript', 'Product engineering', 'UX'],
    },
  ],
  skillGroups: [
    { title: 'Build', skills: ['Backend systems', 'Cloud solutions', 'Data workflows'] },
    { title: 'Create', skills: ['Interactive products', 'Developer tools', 'Responsive interfaces'] },
    { title: 'Think', skills: ['System design', 'Reliability', 'Product engineering'] },
  ],
  experience: [
    { value: '3+', title: 'Years building software', detail: 'Across backend, cloud, data, and product work.' },
    { value: '50K+', title: 'Records processed', detail: 'Designing workflows with scale and reliability in mind.' },
  ],
  education: {
    school: 'Arizona State University',
    degree: 'M.S. Software Engineering',
    shortName: 'ASU',
  },
} as const
