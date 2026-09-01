// Supplies deterministic draft responses until the backend chat service is connected.
import type { ChatResponse } from '../types'

const responses: Record<string, ChatResponse> = {
  projects: {
    answer: 'His work spans secure backend platforms and interactive products. CycleSafe, a configuration platform at Persistent Systems, and Halo show that range.',
    emotion: 'happy',
    display: { type: 'projects', itemIds: ['cycle-safe', 'configuration-service', 'halo'] },
    suggestions: ['What are his strongest skills?', 'Tell me about his experience'],
  },
  skills: {
    answer: 'Rhishabh works across Python and FastAPI, Java and Spring Boot, PostgreSQL, cloud fundamentals, React, and TypeScript—with security and reliability running through it all.',
    emotion: 'happy',
    display: { type: 'skills' },
    suggestions: ['What has he worked on?', 'Where has he worked?'],
  },
  experience: {
    answer: 'He has more than five years of experience spanning secure backend systems, identity platforms, product interfaces, and technical mentorship.',
    emotion: 'neutral',
    display: { type: 'experience' },
    suggestions: ['Show me his projects', 'What are his skills?'],
  },
  education: {
    answer: 'He earned an M.S. in Software Engineering from Arizona State University and a B.E. in Computer Engineering from Savitribai Phule Pune University.',
    emotion: 'happy',
    display: { type: 'education' },
    suggestions: ['Tell me about CycleSafe', 'Show me his experience'],
  },
  contact: {
    answer: 'The best ways to connect with Rhishabh are email, LinkedIn, and GitHub.',
    emotion: 'happy',
    display: { type: 'contact' },
    suggestions: ['Show me his experience', 'What has he worked on?'],
  },
  halo: {
    answer: 'That is me. Halo is an expressive 3D portfolio guide built to make learning about Rhishabh feel less like reading a résumé and more like meeting a character.',
    emotion: 'surprised',
    display: { type: 'projects', itemIds: ['halo'] },
    suggestions: ['What has Rhishabh worked on?', 'What are his skills?'],
  },
  default: {
    answer: 'I can introduce you to Rhishabh’s backend work, projects, experience, skills, or education.',
    emotion: 'confused',
    display: { type: 'intro' },
    suggestions: ['What has he worked on?', 'Tell me about his recent role'],
  },
}

export function getMockResponse(message: string): ChatResponse {
  const question = message.toLowerCase()
  if (question.includes('halo') || question.includes('robot')) return responses.halo
  if (question.includes('contact') || question.includes('email') || question.includes('reach')) return responses.contact
  if (question.includes('skill') || question.includes('technology') || question.includes('tech')) return responses.skills
  if (question.includes('educat') || question.includes('school') || question.includes('asu')) return responses.education
  if (question.includes('experience') || question.includes('career') || question.includes('year') || question.includes('recent role')) return responses.experience
  if (question.includes('project') || question.includes('work') || question.includes('build') || question.includes('cycle')) return responses.projects
  return responses.default
}
