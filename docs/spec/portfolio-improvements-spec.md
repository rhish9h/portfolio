# Portfolio Improvement Specification

**Status:** Draft — not started
**Audience:** Autonomous coding agent (and human reviewer)
**Source:** Cascade code review + live Playwright audit of `npm run dev` (http://localhost:5173)
**Repo:** `rhish9h/portfolio`

---

## 0. Purpose

This document breaks down all recommended improvements to the portfolio site into
**Epics → Stories → Tasks**. Every Task is small enough to be implemented in one sitting
and ends in an **observable, screenshot-verifiable state**. Do not batch multiple tasks
together without verifying each one — this app is highly visual/animated (React Three
Fiber + Framer Motion), and regressions are easy to introduce and easy to miss without
looking at the rendered result.

**Rule for the coding agent:** Work one Task at a time, top to bottom within a Story.
After implementing a Task, run its Acceptance Criteria in full, including the
screenshot step. Only mark a Task complete and move to the next one after you have
visually inspected the screenshot yourself and confirmed it matches the expected
result described in the AC. If it does not match, fix the implementation and re-verify
before moving on.

---

## 1. System Context

### 1.1 Tech stack (from `package.json`)

- React 19 + TypeScript, built with Vite 7 (`npm run dev` → `http://localhost:5173`)
- Styling: Tailwind CSS 4 (`src/styles/globals.css`, CSS-variable based theme, light/dark via `next-themes` + `.dark` class)
- Animation: `framer-motion` 12
- 3D: `three` 0.183, `@react-three/fiber` 9, `@react-three/drei` 10
- Icons: `lucide-react`
- No test framework is currently configured. Verification is manual/visual via the dev server.

### 1.2 Key files map

| Path | Purpose |
|---|---|
| `src/App.tsx` | Page shell, scroll container, modal host, `SECTION_POSITIONS`, `renderPopupContent` switch |
| `src/components/ui/WorldScene.tsx` | The entire 3D scene: road, camera rig, cyclist, landmark buildings/signs, hotspot icons |
| `src/components/ui/Navbar.tsx` | Top nav (desktop primary links + "Menu" dropdown + mobile menu) |
| `src/components/sections/*.tsx` | Modal content per section (About, JourneyTimeline = Experience, EducationJourney, Skills, Certifications, Awards, Publications, Contact). `HeroSection.tsx`, `ExperienceSection.tsx`, `EducationSection.tsx` are currently **dead code** (see Epic D). |
| `src/data/profileData.ts` | Single source of truth for resume content (`profileData` object + TS interfaces) |
| `src/styles/globals.css` | Theme CSS variables, global styles, `prefers-reduced-motion` block |

### 1.3 How the site works today (context for the agent)

- The page has a `500vh` tall spacer (`App.tsx`) so the user can scroll; a `position: fixed`
  `<WorldScene>` canvas reads `scrollYProgress` and drives a virtual camera + cyclist along a
  curvy road (`createRoadCurve` in `WorldScene.tsx`).
- Six 3D "landmarks" sit along the road at fixed `t` values (`Environment` component,
  `WorldScene.tsx`): About (billboard, t=0.05), Education (school building, t=0.2),
  Experience (office building, t=0.4), Skills (workshop, t=0.6), Achievements (trophy
  monument, t=0.8), Contact (mailbox, t=0.95). These match `SECTION_POSITIONS` in `App.tsx`.
- Each landmark has a small round "magnifying glass" button (`MagnifyingGlassIcon`,
  rendered via drei's `<Html>`) that calls `onOpenSection(sectionId)`, which sets
  `activeSection` in `App.tsx` and opens a centered modal rendering the matching section
  component.
- Clicking a Navbar link currently only **scrolls** the page to the landmark's position
  (`scrollToSection` in `App.tsx`) — it does **not** open the modal. The user must then
  find and click the tiny 3D hotspot.

### 1.4 Standard Verification Protocol (referenced by every Task below)

Unless a Task says otherwise, verify it like this:

1. Ensure the dev server is running (`npm run dev`, default `http://localhost:5173`). If
   you don't have a running instance, ask the user, since one may already be running on
   this port.
2. Open/navigate the browser tool to `http://localhost:5173`.
3. Perform the **Scene state** steps listed in the Task's AC (e.g. "click Menu → Experience,
   then click the Experience hotspot").
4. Take a screenshot of the current viewport (not full-page — this site uses fixed-position
   layout, so full-page screenshots of the 3D canvas are misleading).
5. **View the screenshot image yourself.** Compare it against the "Expected visual result"
   in the Task's AC.
6. Also check the browser console for new errors/warnings introduced by your change.
7. Only check the Task off when the screenshot visibly matches the expected result and
   there are no new console errors.

When a Task requires reaching a specific landmark/section, prefer using the app's own
navigation (Navbar primary links, or "Menu" dropdown items) rather than hand-computing
scroll offsets — it's more representative of a real user and more robust to future layout
changes.

---

## Epic A — Visual & 3D Rendering Fixes

Goal: fix things that currently look like bugs rather than intentional design, especially
on the **Experience** landmark since it's the most important one for this portfolio.

### Story A1 — Fix broken/incomplete 3D materials

#### Task A1.1: Fix missing material on the Education building's pediment

- **Why:** In `SchoolBuilding` (`WorldScene.tsx`), the pediment mesh has no
  `meshStandardMaterial` child, so it renders in Three.js's default white/undefined
  material, producing a pale triangular shape that visually clashes with the roof and
  overlaps the "EDUCATION" text.
- **Files:** `src/components/ui/WorldScene.tsx` (`SchoolBuilding` function, the
  `<mesh position={[0, 3.5, 1.6]} rotation={[0, 0, Math.PI/4]} castShadow>` pediment mesh).
- **Implementation notes:**
  - Add a `<meshStandardMaterial>` child to that mesh with a color that matches the
    building's roof/trim palette (e.g. reuse `#1e3a8a` from the roof, or a complementary
    white/cream that doesn't fight with the "EDUCATION" text mesh in front of it).
  - Do not change the mesh's position/rotation/geometry — this is a material-only fix.
- **Acceptance Criteria:**
  - [ ] Pediment mesh has an explicit material/color.
  - [ ] Scene state: click Navbar "Menu" → "Education" to scroll the camera to the school
    building.
  - [ ] Screenshot the viewport.
  - [ ] Expected visual result: no stray pale/white triangle floating over the roof; the
    pediment reads as an intentional part of the building; "EDUCATION" text is legible
    and not visually broken up by the pediment shape.

#### Task A1.2: Replace the glitchy wireframe "windows" on the Experience (Career Journey) skyscraper

- **Why:** In `OfficeBuilding` (`WorldScene.tsx`), the "windows" are a single large
  `meshBasicMaterial color="#38bdf8" wireframe` plane. From most camera angles (confirmed
  via screenshot at ~40% scroll) this reads as a rendering glitch/hologram, not windows —
  and this is the **Experience** landmark, the most important one on the site.
- **Files:** `src/components/ui/WorldScene.tsx` (`OfficeBuilding` function).
- **Implementation notes:**
  - Replace the single wireframe plane with a believable low-poly window pattern, e.g. a
    grid of small emissive/lit rectangular meshes (a few rows × columns of thin boxes or
    planes with a solid `meshStandardMaterial`, not `wireframe`), consistent with the
    low-poly aesthetic used elsewhere (flat-shaded `meshStandardMaterial`, no
    wireframe/hologram effects anywhere else in the scene).
  - Keep it performant — this can be one instanced/grouped mesh or a handful of meshes,
    not dozens of draw calls.
- **Acceptance Criteria:**
  - [ ] Wireframe plane is removed/replaced; no `wireframe` materials remain on this
    building.
  - [ ] Scene state: click Navbar "Menu" → "Experience".
  - [ ] Screenshot the viewport from the default approach angle (as the cyclist passes).
  - [ ] Expected visual result: the building reads clearly as an office/skyscraper with
    windows, with no glitch-looking wireframe/hologram artifacts.

#### Task A1.3: Improve legibility of landmark signage while passing

- **Why:** `getPosAndRot` in `Environment` (`WorldScene.tsx`) orients landmarks using a
  blended facing direction, but at several `t` values (confirmed for Experience at t=0.4)
  the sign is seen nearly edge-on from the default camera path, making text hard to read.
- **Files:** `src/components/ui/WorldScene.tsx` (`Environment.getPosAndRot`, and the
  `rotOffset` arguments passed for `l1`..`l6`).
- **Implementation notes:**
  - Tune the `sideOffset`/`rotOffset` parameters per landmark (they're already
    per-landmark arguments) so each sign/building front faces more toward the road at the
    point where the cyclist is nearest it. This is a numeric tuning task — iterate by
    screenshotting each landmark at its scroll position and adjusting.
  - Do not redesign the geometry; this is a positioning/rotation tuning task only.
- **Acceptance Criteria:**
  - [ ] Scene state: for each of the 6 nav destinations (About, Education, Experience,
    Skills, Achievements, Contact), navigate via Navbar/Menu and screenshot.
  - [ ] Expected visual result: in each of the 6 screenshots, the landmark's main
    label/sign text is legible (not viewed edge-on) from the camera's default position at
    that scroll point.

### Story A2 — Fix floating/disconnected hotspot icons

#### Task A2.1: Prevent "View Details" icons from appearing disconnected in empty space

- **Why:** The `<Html>`-based hotspot icons (`MagnifyingGlassIcon`, `WorldScene.tsx`)
  aren't depth-occluded or distance-faded. Screenshots show stray search-icon chips
  floating in the sky, unattached to any visible landmark, when a landmark is far from
  the camera.
- **Files:** `src/components/ui/WorldScene.tsx` (`MagnifyingGlassIcon`, and each call site
  that wraps it in `<Html position={[0,0,0]} center zIndexRange={[100,0]}>`).
- **Implementation notes:**
  - Use drei's `<Html occlude>` (or `distanceFactor`) so icons shrink/fade or hide when
    far from the camera or blocked by geometry, OR compute distance-to-camera in the
    parent and conditionally render/opacity-fade the icon when the landmark is beyond a
    reasonable interaction distance.
  - Keep the currently-near landmark's icon fully visible/interactive — this is about
    hiding/fading the ones that are far away or off to the side, not making anything
    harder to click when it's actually the "current" landmark.
- **Acceptance Criteria:**
  - [ ] At the top of the page (scroll = 0) and at ~20% scroll, take a screenshot.
  - [ ] Expected visual result: no search-icon chip appears floating in open sky/unattached
    to a visible landmark in either screenshot; only icons for landmarks that are
    plausibly nearby/visible appear.
  - [ ] The currently-nearest landmark's icon is still clearly visible and clickable
    (click it and confirm its modal still opens).

### Story A3 — Fix duplicated content

#### Task A3.1: Remove the duplicated quote in the About modal

- **Why:** The pull-quote block and the first line of the summary paragraph render the
  same sentence twice in the same modal.
- **Files:** `src/components/sections/AboutSection.tsx` (blockquote JSX), and/or
  `src/data/profileData.ts` (`summary` field, first paragraph).
- **Implementation notes:**
  - Keep the styled `<blockquote>` pull-quote as-is.
  - Remove the redundant leading sentence from `profileData.summary` so the prose section
    starts directly with the "At EmpowerID..." paragraph, OR keep the data as one full
    quote/bio and remove the separate hardcoded blockquote JSX — pick whichever keeps
    `profileData.ts` as the single source of truth (preferred: edit `profileData.summary`
    to drop the now-redundant first line, keep the JSX blockquote pulling a short excerpt
    dynamically, or hardcode the blockquote text as before but delete it from `summary`).
- **Acceptance Criteria:**
  - [ ] The quote sentence appears exactly once when the About modal is fully read
    top-to-bottom.
  - [ ] Scene state: open the About modal (Navbar "About" → click the billboard's "View
    Details" hotspot).
  - [ ] Screenshot the full modal (scroll the modal if needed to capture both the
    blockquote area and the summary paragraphs in one or two screenshots).
  - [ ] Expected visual result: quote text is not repeated verbatim in two places.

### Story A4 — Add a loading state for the 3D scene

#### Task A4.1: Show a lightweight loading indicator until the Canvas/scene is ready

- **Why:** There's currently no loading state; on a slow connection or low-end device the
  user sees a blank flash before the WebGL scene appears.
- **Files:** `src/components/ui/WorldScene.tsx` (exported `WorldScene` component), possibly
  wrap with drei's `<Suspense>`/`useProgress`, or a simple CSS skeleton shown until first
  frame.
- **Implementation notes:**
  - Simplest viable approach: render a full-screen skeleton (matching sky color per theme)
    with a subtle spinner/pulse, shown until the `Canvas`'s `onCreated` fires or a short
    mount-based delay, then cross-fade it out.
  - Keep this lightweight — no need for a full asset-preloading system since this scene
    has no external GLTF/texture assets.
- **Acceptance Criteria:**
  - [ ] Throttle network/CPU in devtools (or simply hard-reload) and confirm a loading
    indicator is visible momentarily instead of a blank white/blank canvas flash.
  - [ ] Screenshot the loading state (you may need to slow down CPU via
    `page.emulateCPUThrottling` equivalent or add a temporary artificial delay to verify,
    then remove the artificial delay).
  - [ ] Expected visual result: a clean, on-brand loading indicator, not a blank flash or
    layout shift.

---

## Epic B — Experience Content Upgrade

Goal: make the Experience section actually useful for a recruiter skimming the site — this
is the core purpose of the portfolio.

> **Dependency note:** Do Epic D · Story D1 (delete dead `ExperienceSection.tsx` /
> `EducationSection.tsx`) **before** Task B2.1, since that task changes the shape of the
> `Experience` TypeScript interface those dead files import and would otherwise fail to
> compile.

### Story B1 — Show tech-stack tags per role

#### Task B1.1: Add a `skills` field to Experience data and render it as tags

- **Why:** Bullets alone aren't scannable for "what tech did they use here?" — a common
  thing recruiters look for.
- **Files:** `src/data/profileData.ts` (`Experience` interface + each entry in
  `experiences`), `src/components/sections/JourneyTimeline.tsx` (`TimelineItem` rendering).
- **Implementation notes:**
  - Add `skills?: string[]` to the `Experience` interface.
  - Populate it for every entry in `profileData.experiences` based on the existing bullet
    text (e.g. EmpowerID → `["Python", "FastAPI", "IAM", "ODBC"]`; Persistent Systems →
    `["Spring Boot", "Java", "REST APIs"]`; Apace → `["Vue.js", "PHP", "MySQL"]`; etc. —
    infer reasonably from the bullets already present, don't invent unrelated tech).
  - In `TimelineItem`, render `experience.skills` as small pill/badge chips (reuse the
    existing `rounded-full bg-primary/10 ... text-primary` chip style used in
    `SkillsSection.tsx` for visual consistency), placed below the bullet list.
- **Acceptance Criteria:**
  - [ ] `Experience` interface has the new optional field; at least the EmpowerID entry has
    2+ skills populated.
  - [ ] Scene state: open the Experience modal (Navbar/Menu → Experience → click hotspot).
  - [ ] Screenshot the modal.
  - [ ] Expected visual result: each experience card shows a row of small skill/tech tag
    chips, styled consistently with the rest of the site (not a raw unstyled list).

### Story B2 — Consolidate repetitive employer entries

#### Task B2.1: Merge multi-role employers into a single card with sub-roles

- **Why:** Arizona State University appears 3 times back-to-back (Instructional Assistant,
  Grader, Parking Assistant) and Mithi Software Technologies appears twice
  (Intern → Trainee) — this reads as cluttered/repetitive on a timeline.
- **Files:** `src/data/profileData.ts` (data shape + content), `src/components/sections/JourneyTimeline.tsx`
  (`TimelineItem`/`Experience` type usage).
- **Implementation notes (target shape):**
  ```ts
  export interface ExperienceRole {
    title: string;
    startDate: string;
    endDate: string;
    bullets: string[];
    skills?: string[];
  }

  export interface Experience {
    company: string;
    location?: string;
    roles: ExperienceRole[]; // one entry = one or more roles at this company
  }
  ```
  - Migrate every existing flat entry into `{ company, location, roles: [ { ...one role } ] }`.
  - Combine the 3 ASU entries into **one** `Experience` with a 3-item `roles` array
    (ordered chronologically within the card), and the 2 Mithi entries into one
    `Experience` with a 2-item `roles` array.
  - Update `JourneyTimeline.tsx`'s `TimelineItem` to render the company/location once in
    the card header, then loop over `roles` rendering each role's title, dates, bullets,
    and skill tags within that single card (e.g. stacked with a small divider or
    sub-heading per role).
  - Update the "01/08"-style index counter logic if needed since the total card count will
    now be lower (one card per employer, not per role).
- **Acceptance Criteria:**
  - [ ] `profileData.ts` compiles with the new shape; total number of top-level
    `experiences` entries is reduced (ASU: 3→1, Mithi: 2→1).
  - [ ] Scene state: open the Experience modal.
  - [ ] Screenshot the modal (scrolled to show the ASU card and the Mithi card).
  - [ ] Expected visual result: ASU appears as a single card containing all 3 roles
    clearly delineated; Mithi appears as a single card containing both roles; no
    information from the original bullets is lost.

### Story B3 — Wire up the profile photo

#### Task B3.1: Display the profile photo somewhere it will actually be seen

- **Why:** `/public/profile.jpeg` is only referenced by the unreachable `HeroSection`
  (see Epic D) — visitors currently never see a photo of the person.
- **Files:** `src/components/sections/AboutSection.tsx` (recommended placement, since it's
  the modal every visitor is most likely to open first), `public/profile.jpeg`.
- **Implementation notes:**
  - Add a circular profile photo (reuse the `h-40 w-40 rounded-full` treatment from the
    unused `HeroSection.tsx` as a starting point) to the top of `AboutSection`, above or
    beside the "About Me" heading.
  - See Task D2.1 for compressing the source image — do that first if convenient, so this
    task references the optimized asset.
- **Acceptance Criteria:**
  - [ ] Scene state: open the About modal.
  - [ ] Screenshot the modal.
  - [ ] Expected visual result: the profile photo is visible, properly cropped/circular,
    not distorted, and doesn't break the modal's layout on a normal desktop width.

### Story B4 — Add resume download

#### Task B4.1: Add a "Download Resume" action

- **Why:** No PDF/downloadable resume exists anywhere on the site — a near-universal
  expectation for a portfolio.
- **Files:** `public/` (add resume file), `src/components/sections/ContactSection.tsx`
  and/or `src/components/ui/Navbar.tsx`.
- **Implementation notes:**
  - You will need an actual resume PDF from the user — if one isn't available in the repo,
    flag this to the user rather than fabricating resume content into a PDF yourself.
  - Add a clearly-labeled "Download Resume" button/link (e.g. in `ContactSection`'s cards
    row, matching the existing card style, and/or as a persistent Navbar action) with
    `download` attribute pointing at the PDF in `public/`.
- **Acceptance Criteria:**
  - [ ] A resume PDF exists in `public/` and is linked with a working `download` link.
  - [ ] Scene state: open the Contact modal (and/or view the Navbar if added there).
  - [ ] Screenshot showing the new "Download Resume" affordance.
  - [ ] Click it and confirm (via network/download behavior) the correct file downloads.
  - [ ] Expected visual result: button is visually consistent with existing card/button
    styles, not an out-of-place default link.

### Story B5 — Fix naming consistency for the Experience section

#### Task B5.1: Use one consistent label across nav, 3D sign, and modal heading

- **Why:** The same section is currently called "Experience" (nav), "CAREER JOURNEY" (3D
  sign), and "My Journey" (modal `<h2>`).
- **Files:** `src/components/ui/WorldScene.tsx` (`OfficeBuilding`'s `<Text>`),
  `src/components/sections/JourneyTimeline.tsx` (`<h2>` heading).
- **Implementation notes:**
  - Standardize on **"Experience"** everywhere (simplest, matches nav and is
    recruiter-friendly), updating the 3D sign text and the modal `<h2>` to match. Keep the
    supporting subtitle/description text in `JourneyTimeline` if it still reads naturally
    (e.g. "Experience" as heading, existing paragraph as subheading).
- **Acceptance Criteria:**
  - [ ] All 3 surfaces use the same label.
  - [ ] Scene state: (a) scroll to the Experience landmark, (b) open its modal.
  - [ ] Screenshot both states.
  - [ ] Expected visual result: label reads "Experience" (or your chosen single term) on
    the 3D sign and as the modal heading, matching the Navbar text exactly.

### Story B6 — Fix Achievements/Certifications/Awards/Publications nav mismatch

#### Task B6.1: Make the nav accurately reflect what clicking it does

- **Why:** `Navbar`'s secondary menu lists "Certifications", "Awards", and "Publications"
  as 3 separate items, but all 3 map to the same `SECTION_POSITIONS` value and open the
  exact same combined modal (`App.tsx`, `case 'achievements'`) — misleading.
- **Files:** `src/components/ui/Navbar.tsx` (`secondaryNavItems`).
- **Implementation notes (recommended low-risk fix):**
  - Collapse the 3 separate nav entries into a single **"Achievements"** entry (id:
    `achievements`) in both `secondaryNavItems` (desktop dropdown) — this matches reality:
    one landmark, one modal containing all three subsections.
  - (Optional/stretch, not required for this task's AC): if you'd prefer to keep them
    separate, that would require 3 distinct landmarks/positions and 3 distinct modals —
    out of scope here; do the collapse-to-one-item fix unless the user asks for the
    stretch version.
- **Acceptance Criteria:**
  - [ ] Navbar's Menu dropdown (desktop) and mobile menu show a single "Achievements" item
    instead of 3 redundant ones.
  - [ ] Scene state: open the Menu dropdown.
  - [ ] Screenshot the open dropdown.
  - [ ] Expected visual result: dropdown lists Experience, Education, Skills,
    Achievements, Contact (5 items, no duplicated destinations), and clicking
    "Achievements" still scrolls to and (after Story C3) opens the combined modal showing
    Certifications, Awards, and Publications.

### Story B7 — Unify skills data source

#### Task B7.1: Move hardcoded `additionalSkills` into `profileData.ts`

- **Why:** `SkillsSection.tsx` hardcodes a 12-item `additionalSkills` array disconnected
  from `profileData.ts`, creating two sources of truth for the same kind of content.
- **Files:** `src/data/profileData.ts`, `src/components/sections/SkillsSection.tsx`.
- **Implementation notes:**
  - Add an `additional: string[]` (or similar) array to `profileData.skills` containing the
    same values currently hardcoded in `SkillsSection.tsx`.
  - Update `SkillsSection.tsx` to read from `profileData.skills.additional` instead of a
    local constant.
- **Acceptance Criteria:**
  - [ ] No skills content is hardcoded directly in `SkillsSection.tsx`; all of it reads
    from `profileData`.
  - [ ] Scene state: open the Skills modal.
  - [ ] Screenshot the modal.
  - [ ] Expected visual result: identical visual output to before this change (this is a
    refactor, not a content change) — "Additional Technologies" section still shows the
    same chips.

---

## Epic C — Navigation & Accessibility

### Story C1 — Promote Experience to primary desktop nav

#### Task C1.1: Move "Experience" into the primary nav links

- **Why:** Desktop nav currently only surfaces "About" and "Contact" as primary links;
  "Experience" (the point of the site) is hidden inside the secondary "Menu" dropdown.
- **Files:** `src/components/ui/Navbar.tsx` (`primaryNavItems`, `secondaryNavItems`).
- **Implementation notes:**
  - Move the `{ label: 'Experience', id: 'experience' }` entry from `secondaryNavItems`
    into `primaryNavItems`, positioned between "About" and "Contact" (so order reads
    About → Experience → Contact).
  - No changes needed to the mobile menu (it already lists everything flat).
- **Acceptance Criteria:**
  - [ ] "Experience" is a top-level link in the desktop navbar, not just inside "Menu".
  - [ ] Screenshot the desktop navbar at the top of the page.
  - [ ] Expected visual result: navbar shows "About", "Experience", "Contact" as direct
    links, plus a "Menu" dropdown for the rest, with no layout overflow/wrapping issues at
    a standard desktop width (~1280px).

### Story C2 — Fix duplicate/non-descriptive aria-labels

#### Task C2.1: Give each landmark hotspot a distinct, descriptive aria-label

- **Why:** All 6 landmark hotspots share the exact literal `aria-label="View Details"`
  (confirmed via accessibility snapshot) — screen reader users can't distinguish them.
- **Files:** `src/components/ui/WorldScene.tsx` (`MagnifyingGlassIcon` — add a `label`
  prop; update all 6 call sites: `InteractiveBillboard`, `SchoolBuilding`, `OfficeBuilding`,
  `TechWorkshop`, `TrophyMonument`, `PostOffice`).
- **Implementation notes:**
  - Add a required `label: string` prop to `MagnifyingGlassIcon` and use it as the
    `aria-label` (e.g. `"View About section"`, `"View Experience section"`, `"View
    Education section"`, `"View Skills section"`, `"View Achievements section"`, `"View
    Contact section"`).
- **Acceptance Criteria:**
  - [ ] No two hotspot buttons share the same `aria-label`.
  - [ ] Take an accessibility snapshot (e.g. via the Playwright MCP `browser_snapshot`
    tool) of the homepage and confirm all 6 buttons have distinct, descriptive names.
  - [ ] Screenshot not required for this task (it's a non-visual attribute change), but
    confirm no visual regression by screenshotting the homepage once and comparing to
    before.

### Story C3 — Make content reachable without depending on 3D camera position

#### Task C3.1: Have nav links open the section's modal directly

- **Why:** This is the highest-value fix in this epic. Today, Navbar links only scroll the
  page; the user must then locate and click a tiny 3D hotspot whose on-screen position is
  driven entirely by continuous camera projection. This was confirmed directly: attempting
  to script-click the Experience hotspot before scrolling failed with Playwright reporting
  the element as outside the viewport, because it lives inside a `position: fixed` canvas
  overlay. Keyboard-only and screen-reader users face the same practical problem.
- **Files:** `src/App.tsx` (`scrollToSection`, and how `Navbar`'s `onNavigate` is wired),
  `src/components/ui/Navbar.tsx` (id values already mostly match section ids).
- **Implementation notes:**
  - In `App.tsx`, when a nav item is activated, in addition to (or instead of) smooth
    scrolling, directly call `setActiveSection(...)` with the mapped id so the modal opens
    immediately — no 3D interaction required.
  - Id mapping needed: `about→about`, `experience→experience`, `education→education`,
    `skills→skills`, `contact→contact`, and (after Story B6) `achievements→achievements`.
    If Story B6 hasn't been done yet, map `certifications`/`awards`/`publications` all to
    `achievements` here too.
  - Recommended UX: still smooth-scroll the background scene for visual continuity (so the
    3D world updates behind the modal), but don't make the scroll a prerequisite for
    opening the modal — open it right away rather than waiting for scroll completion.
  - The 3D hotspots should continue to work exactly as before for users who prefer to
    scroll/explore manually — this task is additive, not a replacement.
- **Acceptance Criteria:**
  - [ ] From a fresh page load (scroll position 0, no prior interaction), clicking the
    "Experience" nav link opens the Experience modal immediately.
  - [ ] Scene state: reload the page, then click "Experience" in the navbar without
    scrolling or clicking anything else first.
  - [ ] Screenshot the result.
  - [ ] Expected visual result: the Experience modal is open and showing real content
    (not blank), without any manual scrolling or 3D hotspot click having occurred.
  - [ ] Repeat for at least one more nav item (e.g. "Contact") to confirm the mapping is
    generalized, not special-cased to one id.

### Story C4 — Respect `prefers-reduced-motion` for the 3D scene

#### Task C4.1: Reduce/disable camera and cyclist animation for reduced-motion users

- **Why:** The existing `prefers-reduced-motion` CSS block (`globals.css`) only silences
  CSS transitions/animations — it has no effect on the continuous `useFrame`-driven camera
  movement and cyclist pedaling loop in `WorldScene.tsx`, which can be uncomfortable for
  motion-sensitive users.
- **Files:** `src/components/ui/WorldScene.tsx` (`CameraRig`, `Cyclist` — their `useFrame`
  callbacks).
- **Implementation notes:**
  - Detect the media query in JS (e.g. `window.matchMedia('(prefers-reduced-motion:
    reduce)')`) and, when true: snap the camera to the target position/lookAt instead of
    lerping every frame, and/or stop the continuous wheel/pedal spin animation (e.g. hold
    a static pose) while still allowing scroll-driven position changes.
  - Don't remove the 3D scene entirely for these users — just remove the continuous
    unprompted motion.
- **Acceptance Criteria:**
  - [ ] Enable "reduce motion" in the OS/browser (or emulate via devtools/Playwright's
    `page.emulateMedia({ reducedMotion: 'reduce' })`), reload the page.
  - [ ] Screenshot the homepage in this mode.
  - [ ] Manually scroll and confirm the camera still moves with scroll (content is still
    reachable) but the cyclist's legs/wheels are not continuously spinning and camera
    motion isn't using springy lerp-induced extra motion beyond what scrolling causes.

### Story C5 — Add a plain-content fallback for SEO/assistive tech

#### Task C5.1: Add hidden semantic summary content mirroring key resume info

- **Why:** All resume content currently lives inside a WebGL canvas + JS-triggered modals;
  search engine crawlers and some assistive tools can't read canvas content, and there's
  no static fallback.
- **Files:** `src/App.tsx` or a new small component rendered once near the top of the DOM.
- **Implementation notes:**
  - Add a visually-hidden (`sr-only` utility — add one to `globals.css`/Tailwind if not
    already present) but real, semantic block containing: name, title/tagline, a
    plain-text list of experience entries (company/title/dates), education, and contact
    email/LinkedIn — sourced from `profileData` (no new content to write, just render
    existing data as plain semantic HTML).
  - This block should be present in the initial HTML/DOM at all times, not gated behind
    any modal state.
- **Acceptance Criteria:**
  - [ ] View page source / DOM (not the rendered visual) and confirm the sr-only block is
    present with real resume text on initial load, before any interaction.
  - [ ] Screenshot: not the visual page (it should look unchanged), but capture/paste the
    relevant DOM snippet (e.g. via an accessibility snapshot) showing the hidden content
    exists and contains real experience data.
  - [ ] Expected result: no visible layout change to the site, but resume content is now
    present in the raw DOM for crawlers/assistive tech.

---

## Epic D — Code Cleanup & Asset Optimization

### Story D1 — Remove dead components

#### Task D1.1: Delete unused `ExperienceSection.tsx`, `EducationSection.tsx`, and unreachable `HeroSection.tsx` usage

- **Why:** `ExperienceSection.tsx` and `EducationSection.tsx` are simpler, unused
  duplicates never imported by `App.tsx` (only `JourneyTimeline`/`EducationJourney` are
  used). `HeroSection.tsx` is imported and has a `case 'hero':` in `App.tsx`'s
  `renderPopupContent`, but nothing ever calls `onOpenSection('hero')`, so it's
  unreachable dead code too.
- **Files:** `src/components/sections/ExperienceSection.tsx`,
  `src/components/sections/EducationSection.tsx`, `src/components/sections/HeroSection.tsx`,
  `src/App.tsx` (imports + the `case 'hero'` branch).
- **Implementation notes:**
  - Confirm via search that nothing else imports these three files before deleting (they
    should not, based on this audit, but re-verify since the codebase may have changed).
  - Delete `ExperienceSection.tsx` and `EducationSection.tsx` entirely.
  - For `HeroSection.tsx`: if Task B3.1 (profile photo) and any other useful bits (social
    links, typewriter roles) haven't been repurposed elsewhere, consider salvaging ideas
    from it before deleting; otherwise remove the file, its import, and the `case 'hero'`
    branch in `App.tsx`.
  - Run `npm run build` (or at least `tsc -b`) to confirm no compile errors result from the
    removal.
- **Acceptance Criteria:**
  - [ ] The three files are deleted (or `HeroSection.tsx` deleted along with its dead
    import/case branch).
  - [ ] `npm run build` completes with no TypeScript errors.
  - [ ] Scene state: reload the running homepage.
  - [ ] Screenshot the homepage.
  - [ ] Expected visual result: homepage renders identically to before this change (this
    is pure dead-code removal with zero intended visual impact).

### Story D2 — Optimize assets

#### Task D2.1: Compress/resize the profile photo

- **Why:** `public/profile.jpeg` is ~682 KB for what renders as a small circular avatar —
  unnecessary payload.
- **Files:** `public/profile.jpeg`.
- **Implementation notes:**
  - Resize to a reasonable max dimension for its largest rendered use (e.g. 500×500px is
    plenty for a ~160px display size at typical device pixel ratios) and re-export as an
    optimized JPEG/WebP, replacing the file in `public/`.
- **Acceptance Criteria:**
  - [ ] File size is reduced meaningfully (target: under ~100 KB) with no visible quality
    loss at display size.
  - [ ] Scene state: open the About modal (after Task B3.1 wires the photo in).
  - [ ] Screenshot the modal.
  - [ ] Expected visual result: photo still looks sharp/undistorted at its display size.

---

## 2. Suggested Execution Order

This order minimizes rework (e.g., deleting dead files before changing the types they
depend on) and front-loads the highest-visibility fixes:

1. **Epic A** (A1 → A2 → A3 → A4) — quick, high-visibility bug fixes.
2. **Epic D · Story D1** (delete dead components) — do this before touching the
   `Experience` type shape.
3. **Epic D · Story D2** (compress profile photo) — quick, unblocks B3.
4. **Epic B** (B1 → B2 → B3 → B4 → B5 → B6 → B7) — the core content upgrade.
5. **Epic C** (C1 → C2 → C3 → C4 → C5) — nav/accessibility improvements, including the
   high-value "nav opens modal directly" fix in C3.

Re-confirm this order with the user before starting if priorities have changed since this
document was written.
