// Coordinates the portfolio layout, Halo state, and mock conversational flow.
import { useState } from 'react'

import { HaloStage } from './components/HaloStage'
import { Header } from './components/Header'
import { QuestionComposer } from './components/QuestionComposer'
import { ResponseStage } from './components/ResponseStage'
import { getMockResponse } from './data/mockChat'
import type { ChatResponse, InteractionState } from './types'
import type { Expression } from './halo'

const initialSuggestions = ['What has he worked on?', 'What are his strongest skills?']

function expressionFor(state: InteractionState, response: ChatResponse | null): Expression {
  if (state === 'thinking') return 'thinking'
  if (state === 'listening') return 'surprised'
  if (state === 'error') return 'confused'
  return response?.emotion ?? 'happy'
}

function App() {
  const [state, setState] = useState<InteractionState>('idle')
  const [response, setResponse] = useState<ChatResponse | null>(null)

  const askHalo = async (message: string) => {
    if (state === 'thinking') return
    setState('thinking')
    await new Promise((resolve) => window.setTimeout(resolve, 850))
    setResponse(getMockResponse(message))
    setState('answering')
  }

  const reset = () => {
    setResponse(null)
    setState('idle')
  }

  return (
    <main className="portfolio-shell">
      <Header onReset={reset} />
      <div className="ambient ambient--one" aria-hidden="true" />
      <div className="ambient ambient--two" aria-hidden="true" />
      <div className="experience-stage">
        <HaloStage expression={expressionFor(state, response)} status={state} />
        <ResponseStage response={response} state={state} onPrompt={askHalo} />
      </div>
      <QuestionComposer
        busy={state === 'thinking'}
        suggestions={response?.suggestions ?? initialSuggestions}
        onFocus={() => state === 'idle' && setState('listening')}
        onSubmit={askHalo}
      />
    </main>
  )
}

export default App
