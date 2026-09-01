# Portfolio End Goal

## Vision

Build a minimal, conversational portfolio hosted by **Halo**, a playful and expressive floating robot. Instead of browsing conventional pages, visitors ask Halo about Rhishabh's work, projects, experience, education, skills, and personality.

The site should feel like an interactive character experience rather than a standard chatbot or résumé.

## Core experience

- A clean, spacious, responsive interface inspired by the designs in `inspiration/`.
- Halo is the visual focus and should feel alive through gaze tracking, blinking, hovering, head movement, propeller motion, and expressive facial transitions.
- The visitor asks a question through one persistent input.
- Only the current answer is presented; the page does not become a scrolling chat transcript.
- Each answer may include a predefined animated React display, such as a project showcase, experience timeline, skills map, education card, or contact panel.
- Halo changes expression and movement to match the answer and interaction state: listening, thinking, excited, surprised, confused, idle, and so on.
- Navigation remains available for direct actions such as opening the résumé, GitHub, LinkedIn, or switching theme.

## Interaction principles

1. **Character first:** Halo communicates through motion and emotion as well as words.
2. **Show, do not only tell:** Answers should use focused visual displays when useful.
3. **One moment at a time:** Replace the current response instead of accumulating chat bubbles.
4. **Fast and simple:** Keep the first load light, stream answers, and avoid unnecessary infrastructure.
5. **Responsive and accessible:** The experience must work on desktop and mobile, support keyboard navigation, respect reduced-motion preferences, and provide a readable non-3D fallback.
6. **Truthful and scoped:** Halo should answer from curated information about Rhishabh and clearly say when it does not know something.

## Visual direction

- Mostly white or softly tinted canvas with dark navy text and violet/blue accents.
- Generous whitespace, subtle glows, soft shadows, and restrained motion.
- Desktop layouts can place Halo beside generated visual content; mobile stacks them vertically.
- Transitions between response displays should feel polished but never compete with the content.

## Content boundaries

Halo discusses only public, intentionally curated portfolio information. Private contact details, secrets, unpublished work, sensitive personal data, and unsupported claims must never be included in its knowledge source or responses.

## Starting point

Reuse and improve the existing prototype in `../../test/robo-face/robo-face` (relative to this document):

- `public/halo.glb` for the lightweight model.
- `src/halo/Halo.tsx` for movement and propeller behavior.
- `src/halo/expressions.ts` for the expression system.
- `src/halo/faceScreen.ts` for the animated canvas-texture face.
- `src/halo/spring.ts` and `src/halo/usePointerLook.ts` for smooth motion and gaze.

The prototype proves the core character approach and should be integrated into the portfolio rather than rewritten from scratch.
