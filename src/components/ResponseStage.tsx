// Shows only Halo's current answer, loading state, and selected visual display.
import { DisplayRegistry } from './DisplayRegistry'
import { portfolioData } from '../data/portfolio'
import type { ChatResponse, DisplayType, InteractionState } from '../types'

const initialDisplay: ChatResponse['display'] = { type: 'intro' }
const responseHeadings: Record<DisplayType, { eyebrow: string; title: string }> = {
  intro: { eyebrow: 'HALO SAYS', title: 'Here’s what I found.' },
  projects: { eyebrow: 'SELECTED WORK', title: 'Projects with purpose.' },
  experience: { eyebrow: 'CAREER JOURNEY', title: 'Experience in motion.' },
  skills: { eyebrow: 'TECHNICAL TOOLKIT', title: 'Built across the stack.' },
  education: { eyebrow: 'ACADEMIC FOUNDATION', title: 'Where it started.' },
  contact: { eyebrow: 'OPEN TO CONNECT', title: 'Let’s start a conversation.' },
  none: { eyebrow: 'HALO SAYS', title: 'Here’s what I found.' },
}

type ResponseStageProps = {
  response: ChatResponse | null
  state: InteractionState
  onPrompt: (prompt: string) => void
}

export function ResponseStage({ response, state, onPrompt }: ResponseStageProps) {
  const thinking = state === 'thinking'
  const heading = response ? responseHeadings[response.display.type] : null

  return (
    <section className="response-column" aria-live="polite" aria-busy={thinking}>
      <div className="response-heading">
        <p className="eyebrow">{heading?.eyebrow ?? 'MEET RHISHABH'}</p>
        <h2>{heading?.title ?? portfolioData.role}</h2>
        <span>{thinking ? 'Thinking about the best way to show you…' : response?.answer ?? portfolioData.intro}</span>
      </div>
      <div className="response-content" key={thinking ? 'thinking' : response?.answer ?? 'intro'}>
        {thinking ? (
          <div className="thinking-display" aria-label="Halo is thinking">
            <span /><span /><span />
          </div>
        ) : (
          <DisplayRegistry display={response?.display ?? initialDisplay} onPrompt={onPrompt} />
        )}
      </div>
    </section>
  )
}
