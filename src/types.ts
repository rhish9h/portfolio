// Defines shared interaction and structured chat response types.
import type { Expression } from './halo'

export type InteractionState = 'idle' | 'listening' | 'thinking' | 'answering' | 'error'
export type DisplayType = 'intro' | 'projects' | 'experience' | 'skills' | 'education' | 'contact' | 'none'

export type ChatResponse = {
  answer: string
  emotion: Expression
  display: {
    type: DisplayType
    itemIds?: string[]
  }
  suggestions?: string[]
}
