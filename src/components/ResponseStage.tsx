// Shows only Halo's current answer, loading state, and selected visual display.
import { DisplayRegistry } from './DisplayRegistry'
import { portfolioData } from '../data/portfolio'
import type { ChatResponse, InteractionState } from '../types'

const initialDisplay: ChatResponse['display'] = { type: 'intro' }

type ResponseStageProps = {
  response: ChatResponse | null
  state: InteractionState
}

export function ResponseStage({ response, state }: ResponseStageProps) {
  const thinking = state === 'thinking'

  return (
    <section className="response-column" aria-live="polite" aria-busy={thinking}>
      <div className="response-heading">
        <p className="eyebrow">{response ? 'HALO SAYS' : 'MEET RHISHABH'}</p>
        <h2>{response ? 'Here’s what I found.' : portfolioData.role}</h2>
        <span>{thinking ? 'Thinking about the best way to show you…' : response?.answer ?? portfolioData.intro}</span>
      </div>
      <div className="response-content" key={thinking ? 'thinking' : response?.answer ?? 'intro'}>
        {thinking ? (
          <div className="thinking-display" aria-label="Halo is thinking">
            <span /><span /><span />
          </div>
        ) : (
          <DisplayRegistry display={response?.display ?? initialDisplay} />
        )}
      </div>
    </section>
  )
}
