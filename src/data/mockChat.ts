// Supplies deterministic draft responses until the backend chat service is connected.
import type { ChatResponse } from '../types'

const responses: Record<string, ChatResponse> = {
  projects: {
    answer: 'Rhishabh enjoys working where dependable engineering meets thoughtful interaction. Here are three areas that represent that work.',
    emotion: 'happy',
    display: { type: 'projects', itemIds: ['halo', 'scalable-systems', 'interactive-products'] },
    suggestions: ['What are his strongest skills?', 'Tell me about his education'],
  },
  skills: {
    answer: 'His strengths span backend systems, cloud and data workflows, plus the product thinking needed to make them useful.',
    emotion: 'happy',
    display: { type: 'skills' },
    suggestions: ['What has he worked on?', 'What is Halo?'],
  },
  experience: {
    answer: 'Rhishabh has more than three years of software engineering experience, with an emphasis on reliable systems and engaging products.',
    emotion: 'neutral',
    display: { type: 'experience' },
    suggestions: ['Show me his projects', 'What are his skills?'],
  },
  education: {
    answer: 'He earned an M.S. in Software Engineering from Arizona State University.',
    emotion: 'happy',
    display: { type: 'education' },
    suggestions: ['Tell me about his experience', 'Show me what he builds'],
  },
  halo: {
    answer: 'That is me. Halo is an expressive 3D portfolio guide built to make learning about Rhishabh feel less like reading a résumé and more like meeting a character.',
    emotion: 'surprised',
    display: { type: 'projects', itemIds: ['halo'] },
    suggestions: ['How does Halo work?', 'Show me more projects'],
  },
  default: {
    answer: 'I can introduce you to Rhishabh’s projects, experience, skills, or education. Pick a direction and I’ll make it visual.',
    emotion: 'confused',
    display: { type: 'intro' },
    suggestions: ['What has he worked on?', 'What are his strongest skills?'],
  },
}

export function getMockResponse(message: string): ChatResponse {
  const question = message.toLowerCase()
  if (question.includes('halo') || question.includes('robot')) return responses.halo
  if (question.includes('skill') || question.includes('technology') || question.includes('tech')) return responses.skills
  if (question.includes('educat') || question.includes('school') || question.includes('asu')) return responses.education
  if (question.includes('experience') || question.includes('career') || question.includes('year')) return responses.experience
  if (question.includes('project') || question.includes('work') || question.includes('build')) return responses.projects
  return responses.default
}
