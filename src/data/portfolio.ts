// Stores the public portfolio facts consumed by responses and visual displays.
export const portfolioData = {
  name: 'Rhishabh Hattarki',
  role: 'Software Engineer',
  intro: 'Rhishabh builds reliable backend systems, APIs, and developer-focused products.',
  links: {
    resume: 'https://google.com',
    linkedin: 'https://www.linkedin.com/in/rhishabh-hattarki/',
    github: 'https://github.com/rhish9h',
  },
  metrics: [
    { value: '4+', label: 'Years of software engineering experience' },
    { value: 'Backend', label: 'APIs, services, and data systems' },
    { value: 'ASU', label: 'M.S. Software Engineering' },
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
    { value: 'Recent', title: 'Software Engineer · EmpowerID', detail: 'Built FastAPI microservices, external-system connectors, inventory operations, and graph-based workflows in the IAM space.' },
    { value: '2024', title: 'IAM Engineer · EmpowerID', detail: 'Improved connector integrations and strengthened an ODBC connector against SQL injection.' },
    { value: '2021–22', title: 'Software Engineer · Persistent Systems', detail: 'Built Spring Boot services and React interfaces, mentored five interns, and conducted technical interviews.' },
    { value: 'ASU', title: 'Graduate Services Assistant', detail: 'Supported instruction and grading while completing a master’s degree.' },
  ],
  education: {
    school: 'Arizona State University',
    degree: 'M.S. Software Engineering',
    dates: 'August 2022 – April 2024',
    shortName: 'ASU',
  },
  certifications: [
    'AWS Certified Cloud Practitioner',
    'Microsoft Certified: Azure Fundamentals',
    'Certified EmpowerID Identity Orchestration Developer',
    'Certified EmpowerID Operator',
  ],
} as const
