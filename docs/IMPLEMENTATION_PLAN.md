# Implementation Plan (Draft)

## 1. High-level design

```text
Browser
  React portfolio
  ├── Halo 3D character
  ├── question input
  ├── current response
  └── predefined animated displays
          │ HTTPS
          ▼
Serverless chat API
  ├── input validation and rate limiting
  ├── curated portfolio context
  ├── LLM request
  └── validated structured response
          │
          ▼
LLM provider
```

### Frontend

Keep the existing React + TypeScript + Vite app. The frontend owns presentation, animation, transient interaction state, and rendering Halo. It sends a question to one backend endpoint and receives a small structured response.

### Backend

Use one serverless API route rather than a full long-running service. It keeps the model API key private, supplies trusted portfolio facts, asks the model for structured output, validates that output, and streams or returns it to the browser.

Start with curated Markdown or JSON as the knowledge source. The content is small enough that a database, embeddings, and a vector store are unnecessary at first.

### Response contract

The model must not generate JSX or arbitrary HTML. It selects from frontend-owned display types:

```ts
type ChatResponse = {
  answer: string
  emotion: 'neutral' | 'happy' | 'thinking' | 'surprised' | 'confused'
  display: {
    type: 'none' | 'intro' | 'projects' | 'experience' | 'skills' | 'education' | 'contact'
    itemIds?: string[]
  }
  suggestions?: string[]
}
```

The frontend maps `display.type` to a trusted React component and uses IDs to load curated data. This keeps the experience creative without executing model-produced code.

## 2. Frontend components

### `PortfolioShell`

- Responsive page frame, header links, theme, and global layout.
- Places Halo and response content side by side on desktop and stacked on mobile.

### `HaloStage`

- Port the reusable files and `halo.glb` from the prototype.
- Preserve gaze, blink, hover, head spring, expression interpolation, and propeller behavior.
- Add interaction states such as idle, listening, thinking, answering, success, and error.
- Improve mobile sizing, loading fallback, reduced-motion behavior, and WebGL failure fallback.

### `QuestionComposer`

- Single input and submit action with example prompts.
- Prevent empty or oversized requests and disable duplicate submits.
- Remains visible while the current response changes.

### `ResponseStage`

- Shows only the latest answer and display.
- Animates out the previous response and animates in the next.
- Shows clear loading, error, retry, and unsupported-question states.
- Keeps a short in-memory context if follow-up questions are needed, without displaying a transcript.

### `DisplayRegistry`

A fixed mapping from safe response types to React components:

```text
intro       -> IntroDisplay
projects    -> ProjectsDisplay
experience  -> ExperienceTimeline
skills      -> SkillsMap
education   -> EducationDisplay
contact     -> ContactDisplay
none        -> TextResponse
```

Each display receives only curated portfolio data. Motion should be consistent, subtle, and disabled or reduced when the visitor prefers reduced motion.

### `portfolioData`

- Public structured data for projects, roles, skills, education, links, and short personal facts.
- Stable IDs shared by the backend response and frontend display registry.
- One source of truth for both direct UI rendering and chat context generation.

## 3. Backend components

### `POST /api/chat`

Request:

```json
{
  "message": "What did Rhishabh build?",
  "context": []
}
```

Responsibilities:

1. Validate origin, method, content type, message length, and bounded context.
2. Apply per-IP/session rate limits and a total usage budget.
3. Combine system instructions with curated public portfolio facts.
4. Request structured output from the LLM provider.
5. Validate the result against the response schema.
6. Return safe structured data; never return raw model HTML or code.

### Knowledge source

- Begin with version-controlled Markdown or JSON.
- Include only facts approved for public display.
- Tell the model to answer only from this source and admit uncertainty.
- Add retrieval later only if the content becomes too large for a single prompt.

### Optional usage storage

Avoid storing chat transcripts initially. If analytics are added, record only coarse events such as request count, latency, selected display type, and errors. Do not log full questions by default.

## 4. Hosting and security

### Simple deployment

Deploy the static Vite frontend and serverless API together on a platform such as Vercel or Cloudflare. Use its CDN, HTTPS, environment secrets, function logs, rate limiting, and preview deployments. Keep the architecture portable by limiting the backend to a small standards-based HTTP handler.

### Required safeguards

- Keep the LLM API key server-side in environment secrets; never expose it through Vite variables or client code.
- Restrict CORS/origin checks to the production domain and approved previews.
- Enforce request size, message length, context length, timeout, and output-token limits.
- Rate-limit by IP/session and add platform-level bot protection if abuse appears.
- Set provider spending alerts and a hard monthly budget where supported.
- Validate model output against a strict allowlist of emotions, display types, and item IDs.
- Treat visitor text as untrusted and keep it separate from system instructions and portfolio facts.
- Give the model no tools, filesystem access, secrets, or ability to fetch arbitrary URLs.
- Render answer text as text, not raw HTML; keep links sourced from curated data.
- Redact sensitive data from errors and logs; show generic errors to visitors.
- Add standard security headers, including a restrictive Content Security Policy.
- Keep dependencies updated and run lint/build checks in CI.

## 5. Delivery phases

### Phase 1 — Static experience

- Build the responsive shell from the visual references.
- Port Halo and verify desktop/mobile performance.
- Add the input and several hard-coded responses/displays.
- Finalize public portfolio data and direct navigation links.

**Result:** the complete interaction can be evaluated without an LLM or backend cost.

### Phase 2 — Character and display system

- Connect UI states to Halo expressions and movement.
- Build the display registry and initial animated displays.
- Add transitions, accessibility, reduced motion, and fallbacks.

**Result:** Halo feels expressive and can present all core portfolio topics.

### Phase 3 — Secure chat service

- Add the serverless endpoint and model provider.
- Add structured output validation, curated context, rate limits, and budgets.
- Connect loading, streaming, retry, and error states.

**Result:** visitors can ask flexible questions while the frontend remains deterministic and safe.

### Phase 4 — Production hardening

- Test prompt injection, abusive input, mobile performance, keyboard use, and WebGL failure.
- Add privacy-conscious analytics and operational alerts if useful.
- Deploy previews, review content, then attach the production domain.

## 6. Initial scope boundaries

To keep version one simple, do not add accounts, persistent chat history, a CMS, a vector database, model-generated UI code, voice input, or autonomous tools. Add them only after real usage demonstrates a need.

## 7. First implementation milestone

Create one polished vertical slice:

1. Landing state with Halo and the question composer.
2. Ask “What has Rhishabh worked on?”
3. Halo moves from listening to thinking to happy.
4. The response stage replaces the landing copy with a short answer and animated projects display.
5. A follow-up question replaces that display without creating a transcript.

This validates the product idea, visual system, response contract, and Halo integration before backend work begins.
