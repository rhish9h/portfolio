// Maps trusted response display types to predefined portfolio presentations.
import { portfolioData } from '../data/portfolio'
import type { ChatResponse, DisplayType } from '../types'

type DisplayProps = {
  itemIds?: string[]
  onPrompt?: (prompt: string) => void
}

const iconPaths = {
  route: 'M5 6.5a2.5 2.5 0 1 0 0 .1M19 17.5a2.5 2.5 0 1 0 0 .1M7.5 6.5h3.25a3 3 0 0 1 3 3v5a3 3 0 0 0 3 3h.75M10 12h3.5',
  layers: 'm12 3-8.5 4.5L12 12l8.5-4.5L12 3Zm-8.5 9L12 16.5l8.5-4.5M3.5 16.5 12 21l8.5-4.5',
  sparkles: 'm12 3 1.1 3.4L16.5 7.5l-3.4 1.1L12 12l-1.1-3.4-3.4-1.1 3.4-1.1L12 3ZM6 14l.8 2.2L9 17l-2.2.8L6 20l-.8-2.2L3 17l2.2-.8L6 14Zm12-2 .8 2.2L21 15l-2.2.8L18 18l-.8-2.2L15 15l2.2-.8L18 12Z',
  server: 'M4 5h16v5H4V5Zm0 9h16v5H4v-5Zm3-6h.01M7 17h.01',
  database: 'M19 5c0 1.1-3.1 2-7 2s-7-.9-7-2 3.1-2 7-2 7 .9 7 2Zm0 0v7c0 1.1-3.1 2-7 2s-7-.9-7-2V5m14 7v7c0 1.1-3.1 2-7 2s-7-.9-7-2v-7',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z',
  briefcase: 'M9 6V4h6v2m-11 0h16v13H4V6Zm0 5h16M9.5 11v2h5v-2',
  school: 'm3 9 9-5 9 5-9 5-9-5Zm3 2.5V17c3.5 2.7 8.5 2.7 12 0v-5.5M21 9v6',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.5-.6L7 21l5-2 5 2-1.5-6.6',
  mail: 'M3 5h18v14H3V5Zm0 1 9 7 9-7',
  code: 'm9 8-4 4 4 4m6-8 4 4-4 4m-2-10-2 12',
  network: 'M7 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm10 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.8 8l6.4 8M7 9v7m0 0h7',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
} as const

type IconName = keyof typeof iconPaths

function DisplayIcon({ name }: { name: IconName }) {
  return (
    <svg className="display-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  )
}

function IntroDisplay({ onPrompt }: DisplayProps) {
  return (
    <div className="intro-display">
      <div className="orbital-system">
        <span className="orbit-path" aria-hidden="true" />
        <div className="profile-core" aria-label="Rhishabh">R</div>
        {portfolioData.metrics.map((metric, index) => (
          <div className={`planet-track planet-track--${index + 1}`} key={metric.label}>
            <button
              className="orbit-planet"
              type="button"
              onClick={() => onPrompt?.(metric.prompt)}
              aria-label={`${metric.value}: ${metric.label}. Ask Halo for details.`}
            >
              <span className="planet-body">
                <span className="planet-surface"><strong>{metric.value}</strong></span>
                <span className="planet-label">{metric.label}</span>
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const projectIcons: Record<string, IconName> = {
  'cycle-safe': 'route',
  'configuration-service': 'layers',
  halo: 'sparkles',
}

function ProjectsDisplay({ itemIds }: DisplayProps) {
  const projects = portfolioData.projects.filter((project) => !itemIds || itemIds.includes(project.id))
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <article className="project-card" style={{ '--card-index': index } as React.CSSProperties} key={project.id}>
          <div className="project-card__top">
            <span className="icon-tile"><DisplayIcon name={projectIcons[project.id] ?? 'sparkles'} /></span>
            <span className="project-number">0{index + 1}</span>
          </div>
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

const skillIcons: IconName[] = ['server', 'database', 'compass']

function SkillsDisplay() {
  return (
    <div className="skills-display">
      <div className="skill-groups">
        {portfolioData.skillGroups.map((group, index) => (
          <article style={{ '--card-index': index } as React.CSSProperties} key={group.title}>
            <div className="skill-card__top">
              <span className="icon-tile"><DisplayIcon name={skillIcons[index] ?? 'sparkles'} /></span>
              <span>0{index + 1}</span>
            </div>
            <h3>{group.title}</h3>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </div>
      <div className="credentials-strip">
        <span className="credentials-icon"><DisplayIcon name="award" /></span>
        <div><strong>{portfolioData.certifications.length} certifications</strong><span>AWS, Azure, and identity orchestration</span></div>
      </div>
    </div>
  )
}

function ExperienceDisplay() {
  return (
    <div className="experience-display">
      {portfolioData.experience.map((item, index) => (
        <article style={{ '--card-index': index } as React.CSSProperties} key={`${item.company}-${item.role}`}>
          <div className="experience-node"><DisplayIcon name="briefcase" /></div>
          <div className="experience-card">
            <div className="experience-meta"><span>{item.company}</span><time>{item.period}</time></div>
            <h3>{item.role}</h3>
            <p>{item.detail}</p>
            <ul aria-label={`${item.role} technologies`}>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </div>
        </article>
      ))}
    </div>
  )
}

function EducationDisplay() {
  return (
    <div className="education-display">
      {portfolioData.education.map((item, index) => (
        <article className="education-card" style={{ '--card-index': index } as React.CSSProperties} key={item.degree}>
          <div className="education-mark"><DisplayIcon name="school" /><strong>{item.shortName}</strong></div>
          <div className="education-copy">
            <div className="education-meta"><span>{item.level}</span><time>{item.dates}</time></div>
            <h3>{item.degree}</h3>
            <p>{item.school}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function ContactDisplay() {
  const links = [
    { label: 'Email', detail: 'rhish9h@gmail.com', href: portfolioData.links.email, icon: 'mail' as const },
    { label: 'GitHub', detail: '@rhish9h', href: portfolioData.links.github, icon: 'code' as const },
    { label: 'LinkedIn', detail: 'Professional profile', href: portfolioData.links.linkedin, icon: 'network' as const },
  ]
  return (
    <div className="contact-display">
      {links.map((link, index) => (
        <a
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          style={{ '--card-index': index } as React.CSSProperties}
          key={link.label}
        >
          <span className="icon-tile"><DisplayIcon name={link.icon} /></span>
          <span><strong>{link.label}</strong><small>{link.detail}</small></span>
          <DisplayIcon name="arrow" />
        </a>
      ))}
    </div>
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
  contact: ContactDisplay,
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
