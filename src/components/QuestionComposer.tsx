// Provides the question input and suggested prompts used to talk to Halo.
import { useState, type FormEvent } from 'react'

type QuestionComposerProps = {
  busy: boolean
  suggestions: string[]
  onFocus: () => void
  onSubmit: (message: string) => void
}

export function QuestionComposer({ busy, suggestions, onFocus, onSubmit }: QuestionComposerProps) {
  const [message, setMessage] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const question = message.trim()
    if (!question || busy) return
    onSubmit(question)
    setMessage('')
  }

  return (
    <div className="composer-wrap">
      <form className="question-composer" onSubmit={submit}>
        <label className="sr-only" htmlFor="portfolio-question">Ask Halo about Rhishabh</label>
        <input
          id="portfolio-question"
          type="text"
          value={message}
          maxLength={160}
          disabled={busy}
          autoComplete="off"
          placeholder={busy ? 'Halo is thinking…' : 'Ask me anything about Rhishabh…'}
          onChange={(event) => setMessage(event.target.value)}
          onFocus={onFocus}
        />
        <button type="submit" disabled={busy || !message.trim()} aria-label="Ask Halo">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 4 15 8-15 8 3-8-3-8Zm3.2 7h7.2L7.7 6.9 9.2 11Zm0 2-1.5 4.1 8.7-4.1H8.2Z" />
          </svg>
        </button>
      </form>
      <div className="suggestions" aria-label="Suggested questions">
        <span className="spark" aria-hidden="true" />
        {suggestions.slice(0, 2).map((suggestion) => (
          <button key={suggestion} type="button" disabled={busy} onClick={() => onSubmit(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
