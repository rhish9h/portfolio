// Maps trusted response display types to predefined portfolio presentations.
import { portfolioData } from '../data/portfolio'
import type { ChatResponse, DisplayType } from '../types'

type DisplayProps = {
  itemIds?: string[]
}

function IntroDisplay() {
  return (
    <div className="intro-display">
      <div className="profile-orbit" aria-hidden="true">
        <span className="orbit-ring orbit-ring--one" />
        <span className="orbit-ring orbit-ring--two" />
        <span className="profile-core">R</span>
      </div>
      <div className="metric-grid">
        {portfolioData.metrics.map((metric, index) => (
          <article className={`metric-card metric-card--${index + 1}`} key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </div>
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

export function DisplayRegistry({ display }: { display: ChatResponse['display'] }) {
  const Display = displays[display.type]
  return <Display itemIds={display.itemIds} />
}
