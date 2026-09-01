// Stores the public portfolio facts consumed by responses and visual displays.
export const portfolioData = {
  name: 'Rhishabh Hattarki',
  role: 'Software Engineer',
  intro: 'Rhishabh builds reliable backend systems, APIs, and developer-focused products.',
  links: {
    resume: 'https://google.com',
    linkedin: 'https://www.linkedin.com/in/rhishabh-hattarki/',
    github: 'https://github.com/rhish9h',
    email: 'mailto:rhish9h@gmail.com',
  },
  metrics: [
    { value: '4+', label: 'Years of experience', prompt: 'Tell me about his experience' },
    { value: 'Backend', label: 'APIs and systems', prompt: 'What are his backend skills?' },
    { value: 'ASU', label: 'M.S. Software Engineering', prompt: 'Tell me about his education' },
  ],
  projects: [
    {
      id: 'cycle-safe',
      name: 'CycleSafe',
      eyebrow: 'Cyclist safety',
      description: 'A cross-platform companion app for a handlebar device that detects close-passing vehicles and captures license plate images.',
      tags: ['Mobile', 'Computer vision', 'IoT'],
    },
    {
      id: 'configuration-service',
      name: 'Configuration platform',
      eyebrow: 'Persistent Systems',
      description: 'A scalable configuration microservice with 13 REST APIs, paired with a clearer interactive frontend.',
      tags: ['Spring Boot', 'PostgreSQL', 'React'],
    },
    {
      id: 'halo',
      name: 'Halo',
      eyebrow: 'Interactive portfolio',
      description: 'An expressive 3D guide that turns a portfolio into a playful conversation.',
      tags: ['React', 'Three.js', 'Interaction design'],
    },
  ],
  skillGroups: [
    { title: 'Backend', skills: ['Python and FastAPI', 'Java and Spring Boot', 'REST APIs and microservices'] },
    { title: 'Data and cloud', skills: ['PostgreSQL and Hibernate', 'AWS and Azure fundamentals', 'Secure system integration'] },
    { title: 'Product', skills: ['React and TypeScript', 'Interactive interfaces', 'Technical leadership'] },
  ],
  experience: [
    {
      period: '2025 — Present',
      company: 'EmpowerID',
      role: 'Software Engineer',
      detail: 'Building FastAPI microservices, external-system connectors, inventory operations, and graph-based workflows for identity platforms.',
      tags: ['Python', 'FastAPI', 'IAM'],
    },
    {
      period: 'Jul — Dec 2024',
      company: 'EmpowerID',
      role: 'IAM Engineer',
      detail: 'Improved enterprise connector integrations and strengthened an ODBC connector against SQL injection.',
      tags: ['Security', 'Integrations', 'Python'],
    },
    {
      period: '2023 — 2024',
      company: 'Arizona State University',
      role: 'Graduate Services Assistant',
      detail: 'Supported systems and software engineering courses through instruction, grading, and consistent student feedback.',
      tags: ['Instruction', 'Systems', 'Mentorship'],
    },
    {
      period: '2021 — 2022',
      company: 'Persistent Systems',
      role: 'Software Engineer',
      detail: 'Built Spring Boot services and React interfaces, led five interns, and conducted technical interviews.',
      tags: ['Spring Boot', 'PostgreSQL', 'React'],
    },
    {
      period: '2020 — 2021',
      company: 'Mithi Software Technologies',
      role: 'Trainee Software Engineer',
      detail: 'Built secure authentication flows and remediated security issues across production web systems.',
      tags: ['Security', 'PHP', 'Linux'],
    },
  ],
  education: [
    {
      level: 'Graduate degree',
      school: 'Arizona State University',
      degree: 'M.S. in Software Engineering',
      dates: 'August 2022 — April 2024',
      shortName: 'ASU',
    },
    {
      level: 'Undergraduate degree',
      school: 'Savitribai Phule Pune University',
      degree: 'B.E. in Computer Engineering',
      dates: '2016 — 2020',
      shortName: 'SPPU',
    },
  ],
  certifications: [
    'AWS Certified Cloud Practitioner',
    'Microsoft Certified: Azure Fundamentals',
    'Certified EmpowerID Identity Orchestration Developer',
    'Certified EmpowerID Operator',
  ],
} as const
