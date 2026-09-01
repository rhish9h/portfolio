// Maps trusted response display types to predefined portfolio presentations.
import { portfolioData } from '../data/portfolio'
import type { ChatResponse, DisplayType } from '../types'

type DisplayProps = {
  itemIds?: string[]
  onPrompt?: (prompt: string) => void
}

function IntroDisplay({ onPrompt }: DisplayProps) {
  return (
    <div className="intro-display">
      <div className="orbital-system">
        <span className="orbit-path orbit-path--outer" aria-hidden="true" />
        <span className="orbit-path orbit-path--inner" aria-hidden="true" />
        <div className="profile-core" aria-label="Rhishabh">
          <span>R</span>
          <i aria-hidden="true" />
        </div>
        {portfolioData.metrics.map((metric, index) => (
          <div className={`planet-track planet-track--${index + 1}`} key={metric.label}>
            <button
              className="orbit-planet"
              type="button"
              onClick={() => onPrompt?.(metric.prompt)}
              aria-label={`${metric.value}: ${metric.label}. Ask Halo for details.`}
            >
              <span className="planet-surface"><strong>{metric.value}</strong></span>
              <span className="planet-label">{metric.label}</span>
            </button>
          </div>
        ))}
      </div>
      <p className="orbit-hint">Choose a planet to ask Halo</p>
    </div>
  )
}

function ProjectsDisplay({ itemIds }: DisplayProps) {
  const projects = portfolioData.projects.filter((project) => !itemIds || itemIds.includes(project.id))
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <article className="project-card" style={{ '--card-index': index } as React.CSSProperties} key={project.id}>
          <div className="project-number">0{index + 1}</div>
          <p>{project.eyebrow}</p>
          <h3>{project.name}</h3>
          <span>{project.description}</span>
          <ul aria-label={`${project.name} topics`}>
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </article>
      ))}
    </div>
  )
}

function SkillsDisplay() {
  return (
    <div className="skill-groups">
      {portfolioData.skillGroups.map((group, index) => (
        <article style={{ '--card-index': index } as React.CSSProperties} key={group.title}>
          <span>0{index + 1}</span>
          <h3>{group.title}</h3>
          <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
        </article>
      ))}
    </div>
  )
}

function ExperienceDisplay() {
  return (
    <div className="experience-display">
      {portfolioData.experience.map((item) => (
        <article key={item.title}>
          <strong>{item.value}</strong>
          <div><h3>{item.title}</h3><p>{item.detail}</p></div>
        </article>
      ))}
    </div>
  )
}

function EducationDisplay() {
  return (
    <article className="education-display">
      <div className="education-mark">{portfolioData.education.shortName}</div>
      <div>
        <p>Education</p>
        <h3>{portfolioData.education.degree}</h3>
        <span>{portfolioData.education.school} · {portfolioData.education.dates}</span>
      </div>
    </article>
  )
}

function EmptyDisplay() {
  return null
}

const displays: Record<DisplayType, (props: DisplayProps) => React.ReactNode> = {
  intro: IntroDisplay,
  projects: ProjectsDisplay,
  experience: ExperienceDisplay,
  skills: SkillsDisplay,
  education: EducationDisplay,
  contact: EmptyDisplay,
  none: EmptyDisplay,
}

type DisplayRegistryProps = {
  display: ChatResponse['display']
  onPrompt?: (prompt: string) => void
}

export function DisplayRegistry({ display, onPrompt }: DisplayRegistryProps) {
  const Display = displays[display.type]
  return <Display itemIds={display.itemIds} onPrompt={onPrompt} />
}
